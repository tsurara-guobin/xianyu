"""Reproduce the Evo Tower batch orchestration around the battle engine."""

from __future__ import annotations

from copy import deepcopy
from dataclasses import asdict, dataclass
from typing import Any, Callable, Mapping, Sequence

from .engine import simulate_battle


BattleRunner = Callable[[dict[str, Any]], bool]


@dataclass(frozen=True, slots=True)
class FightParams:
    battleNum: int
    winNum: int
    isSkip: bool = False

    def as_dict(self) -> dict[str, int | bool]:
        return asdict(self)


def _payload(response: Mapping[str, Any]) -> Mapping[str, Any]:
    """Accept a raw response, ``data`` wrapper, or ``rawData`` wrapper."""
    for key in ("rawData", "data"):
        value = response.get(key)
        if isinstance(value, Mapping):
            return value
    return response


def _get(payload: Mapping[str, Any], camel: str, snake: str) -> Any:
    if camel in payload:
        return payload[camel]
    if snake in payload:
        return payload[snake]
    raise KeyError(f"readyFight response is missing {camel!r}")


def _indexed(value: Any, index: int) -> Any:
    """Read list-like data or JSON-encoded numeric-key maps."""
    if isinstance(value, Sequence) and not isinstance(value, (str, bytes, bytearray)):
        return value[index]
    if isinstance(value, Mapping):
        for key in (index, str(index)):
            if key in value:
                return value[key]
    raise IndexError(index)


def _set_option(battle: dict[str, Any], key: str, value: Any) -> None:
    options = battle.setdefault("options", {})
    if isinstance(options, dict):
        options[key] = value


def _apply_full_buff(battle: dict[str, Any], full_buff: Any) -> None:
    """Apply the per-stage enchant/attribute map as the game client does."""
    if not isinstance(full_buff, Mapping):
        return
    left_team = battle.get("leftTeam", battle.get("left_team", {}))
    if not isinstance(left_team, Mapping):
        return
    team = left_team.get("team", {})
    members = team.values() if isinstance(team, Mapping) else team
    for slot, member in enumerate(members):
        if not isinstance(member, dict):
            continue
        enchant = full_buff.get(slot, full_buff.get(str(slot), {}))
        if not isinstance(enchant, Mapping):
            enchant = {}
        member["enchantMap"] = deepcopy(dict(enchant))
        attributes = member.setdefault("attribute", {})
        if isinstance(attributes, dict):
            attributes.update(deepcopy(dict(enchant)))


def prepare_battle(
    ready_response: Mapping[str, Any],
    index: int,
    *,
    stage_id: int | None = None,
) -> dict[str, Any]:
    """Build one deterministic battle input from a readyFight response."""
    payload = _payload(ready_response)
    battle = deepcopy(_get(payload, "battleData", "battle_data"))
    seeds = _get(payload, "randomNumList", "random_num_list")
    opponents = _get(payload, "rightTeamList", "right_team_list")
    battle["randomSeed"] = deepcopy(_indexed(seeds, index))
    battle["rightTeam"] = deepcopy(_indexed(opponents, index))

    buffs = payload.get("eFullBuffList", payload.get("e_full_buff_list", []))
    try:
        full_buff = _indexed(buffs, index)
    except IndexError:
        full_buff = None
    _apply_full_buff(battle, full_buff)
    if stage_id is not None:
        _set_option(battle, "towerId", stage_id)
    return battle


def calculate_fight_params(
    ready_response: Mapping[str, Any],
    run_battle: BattleRunner,
    *,
    energy: int | None = None,
    stage_ids: Sequence[int] | None = None,
) -> FightParams:
    """Simulate in order and stop on the first loss, matching EvoTowerModule."""
    payload = _payload(ready_response)
    opponents = _get(payload, "rightTeamList", "right_team_list")
    total_available = len(opponents)
    limit = total_available if energy is None else min(total_available, max(energy, 0))

    battles = wins = 0
    for index in range(limit):
        stage_id = stage_ids[index] if stage_ids is not None else None
        battle = prepare_battle(ready_response, index, stage_id=stage_id)
        is_win = run_battle(battle)
        if not isinstance(is_win, bool):
            raise TypeError("battle runner must return bool")
        battles += 1
        if not is_win:
            break
        wins += 1
    return FightParams(battleNum=battles, winNum=wins, isSkip=False)


def calculate_with_builtin_engine(
    ready_response: Mapping[str, Any],
    *,
    engine_data: Mapping[str, Any] | None = None,
    energy: int | None = None,
    stage_ids: Sequence[int] | None = None,
) -> FightParams:
    """Calculate parameters with the bundled deterministic headless engine.

    ``engine_data`` supplies skill definitions and rule overrides which are not
    present in every ``readyFight`` payload.
    """

    def run(battle: dict[str, Any]) -> bool:
        merged = deepcopy(battle)
        if engine_data:
            merged["engineData"] = deepcopy(dict(engine_data))
        return simulate_battle(merged).is_win

    return calculate_fight_params(
        ready_response, run, energy=energy, stage_ids=stage_ids
    )
