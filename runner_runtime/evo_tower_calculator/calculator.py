"""Reproduce the code around ``ServerBattleLauncher`` without starting the UI."""

from __future__ import annotations

from copy import deepcopy
from dataclasses import asdict, dataclass
from typing import Any, Callable, Mapping, Sequence

BattleRunner = Callable[[dict[str, Any]], bool]


@dataclass(frozen=True, slots=True)
class FightParams:
    battleNum: int
    winNum: int
    isSkip: bool = False

    def as_dict(self) -> dict[str, int | bool]:
        return asdict(self)


def _payload(response: Mapping[str, Any]) -> Mapping[str, Any]:
    current = response
    # Network dumps are seen both as {data: ...} and {data: {rawData: ...}}.
    for _ in range(3):
        child = next((current.get(k) for k in ("rawData", "data") if isinstance(current.get(k), Mapping)), None)
        if child is None:
            break
        current = child
    return current


def _field(payload: Mapping[str, Any], camel: str, snake: str) -> Any:
    if camel in payload:
        return payload[camel]
    if snake in payload:
        return payload[snake]
    raise KeyError(f"readyfight response is missing {camel!r}")


def _indexed(value: Any, index: int, *, default: Any = ...) -> Any:
    try:
        if isinstance(value, Sequence) and not isinstance(value, (str, bytes, bytearray)):
            return value[index]
        if isinstance(value, Mapping):
            return value[str(index)] if str(index) in value else value[index]
    except (IndexError, KeyError):
        pass
    if default is not ...:
        return default
    raise IndexError(index)


def _members(team: Any) -> list[tuple[Any, dict[str, Any]]]:
    if not isinstance(team, Mapping):
        return []
    members = team.get("team", [])
    if isinstance(members, Mapping):
        return [(key, member) for key, member in members.items() if isinstance(member, dict)]
    if isinstance(members, Sequence) and not isinstance(members, (str, bytes)):
        # JSON dumps commonly represent a JavaScript Map as [[key, value], ...].
        if all(isinstance(item, Sequence) and not isinstance(item, (str, bytes)) and len(item) == 2 for item in members):
            return [(item[0], item[1]) for item in members if isinstance(item[1], dict)]
        return [(index, member) for index, member in enumerate(members) if isinstance(member, dict)]
    return []


def _map_get(mapping: Any, key: Any, default: Any) -> Any:
    candidates = (key, str(key))
    if isinstance(mapping, Mapping):
        for candidate in candidates:
            if candidate in mapping:
                return mapping[candidate]
    elif isinstance(mapping, Sequence) and not isinstance(mapping, (str, bytes)):
        for item in mapping:
            if isinstance(item, Sequence) and not isinstance(item, (str, bytes)) and len(item) == 2:
                if item[0] in candidates or str(item[0]) == str(key):
                    return item[1]
    return default


def _map_items(value: Any) -> list[tuple[Any, Any]]:
    if isinstance(value, Mapping):
        return list(value.items())
    if isinstance(value, Sequence) and not isinstance(value, (str, bytes)):
        return [
            (item[0], item[1])
            for item in value
            if isinstance(item, Sequence) and not isinstance(item, (str, bytes)) and len(item) == 2
        ]
    return []


def _apply_full_buff(battle: dict[str, Any], full_buff: Any) -> None:
    """Port ``resetBattleDataByIndex`` including its slot/key semantics."""
    left = battle.get("leftTeam", battle.get("left_team", {}))
    for slot, fighter in _members(left):
        # resetBattleDataByIndex uses eFullBuffList[index].get(teamMapKey).
        # Do not fall back to iteration position: sparse/non-zero slots would
        # receive another fighter's buff and could invert the battle result.
        enchant = _map_get(full_buff, slot, {})
        enchant_items = _map_items(enchant)
        fighter["enchantMap"] = deepcopy(dict(enchant_items))
        attributes = fighter.setdefault("attribute", {})
        if isinstance(attributes, dict):
            for attribute, value in enchant_items:
                attributes[str(attribute)] = deepcopy(value)
        elif isinstance(attributes, list):
            for attribute, value in enchant_items:
                replaced = False
                for item in attributes:
                    if isinstance(item, list) and len(item) == 2 and str(item[0]) == str(attribute):
                        item[1] = deepcopy(value)
                        replaced = True
                        break
                if not replaced:
                    attributes.append([deepcopy(attribute), deepcopy(value)])


def _set_tower_id(battle: dict[str, Any], stage_id: int) -> None:
    options = battle.setdefault("options", {})
    if isinstance(options, dict):
        options["towerId"] = stage_id
    elif isinstance(options, list):
        # Common JSON representation of a JS Map.
        options[:] = [item for item in options if not (isinstance(item, list) and item and item[0] == "towerId")]
        options.append(["towerId", stage_id])


def prepare_battle(response: Mapping[str, Any], index: int, *, stage_id: int | None = None) -> dict[str, Any]:
    """Create the exact per-index input which the client passes to the launcher."""
    payload = _payload(response)
    battle = deepcopy(_field(payload, "battleData", "battle_data"))
    if not isinstance(battle, dict):
        raise TypeError("battleData must be a JSON object")
    battle["randomSeed"] = deepcopy(_indexed(_field(payload, "randomNumList", "random_num_list"), index))
    battle["rightTeam"] = deepcopy(_indexed(_field(payload, "rightTeamList", "right_team_list"), index))
    buffs = payload.get("eFullBuffList", payload.get("e_full_buff_list", []))
    _apply_full_buff(battle, _indexed(buffs, index, default={}))
    if stage_id is not None:
        _set_tower_id(battle, stage_id)
    return battle


def calculate_fight_params(
    response: Mapping[str, Any],
    run_battle: BattleRunner,
    *,
    battle_num: int,
    stage_ids: Sequence[int] | None = None,
    is_skip: bool = False,
) -> FightParams:
    """Run ``battle_num`` independent battles and count client-side wins."""
    if battle_num < 0:
        raise ValueError("battle_num cannot be negative")
    available = len(_field(_payload(response), "rightTeamList", "right_team_list"))
    if battle_num > available:
        raise ValueError(f"battle_num={battle_num}, but readyfight only contains {available} opponents")
    if stage_ids is not None and len(stage_ids) < battle_num:
        raise ValueError("stage_ids must contain at least battle_num values")
    wins = 0
    for index in range(battle_num):
        battle = prepare_battle(response, index, stage_id=stage_ids[index] if stage_ids else None)
        result = run_battle(battle)
        if type(result) is not bool:
            raise TypeError("battle runner must return a bool")
        wins += int(result)
    return FightParams(battle_num, wins, is_skip)
