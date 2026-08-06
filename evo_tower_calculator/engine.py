"""A deterministic, data-driven, UI-free single-battle engine.

The original game engine contains hundreds of commands and configuration
tables.  This module deliberately makes all required combat semantics explicit
input data instead of silently inventing values for unknown skill IDs.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from decimal import Decimal, ROUND_CEILING
from typing import Any, Mapping, Sequence


Number = int | float | str | Decimal


def _d(value: Number | None, default: Number = 0) -> Decimal:
    return Decimal(str(default if value is None else value))


class LcgRandom:
    """Small deterministic LCG; constants can be overridden in engineData."""

    def __init__(self, seed: int, multiplier: int, increment: int, modulus: int):
        self.seed = seed % modulus
        self.multiplier = multiplier
        self.increment = increment
        self.modulus = modulus

    def random(self) -> Decimal:
        self.seed = (self.multiplier * self.seed + self.increment) % self.modulus
        return Decimal(self.seed) / Decimal(self.modulus)


@dataclass(slots=True)
class Skill:
    id: int
    multiplier: Decimal = Decimal(1)
    flat_damage: Decimal = Decimal(0)
    target: str = "single"
    rage_cost: Decimal = Decimal(0)
    heal_multiplier: Decimal = Decimal(0)
    crit_chance: Decimal = Decimal(0)
    crit_multiplier: Decimal = Decimal(1.5)

    @classmethod
    def parse(cls, skill_id: int, value: Mapping[str, Any]) -> "Skill":
        return cls(
            id=skill_id,
            multiplier=_d(value.get("multiplier"), 1),
            flat_damage=_d(value.get("flatDamage", value.get("flat_damage"))),
            target=str(value.get("target", "single")),
            rage_cost=_d(value.get("rageCost", value.get("rage_cost"))),
            heal_multiplier=_d(value.get("healMultiplier", value.get("heal_multiplier"))),
            crit_chance=_d(value.get("critChance", value.get("crit_chance"))),
            crit_multiplier=_d(value.get("critMultiplier", value.get("crit_multiplier")), 1.5),
        )


@dataclass(slots=True)
class Fighter:
    id: int
    slot: int
    camp: str
    attack: Decimal
    defense: Decimal
    max_hp: Decimal
    hp: Decimal
    speed: Decimal
    rage: Decimal
    rage_per_attack: Decimal
    skills: list[int] = field(default_factory=list)

    @property
    def alive(self) -> bool:
        return self.hp > 0


@dataclass(frozen=True, slots=True)
class BattleResult:
    is_win: bool
    rounds: int
    seed: int
    left_hp: int
    right_hp: int
    reason: str

    def as_dict(self) -> dict[str, int | bool | str]:
        return {
            "isWin": self.is_win,
            "round": self.rounds,
            "seed": self.seed,
            "leftHp": self.left_hp,
            "rightHp": self.right_hp,
            "reason": self.reason,
        }


def _team_members(team: Any) -> list[tuple[int, Mapping[str, Any]]]:
    if not isinstance(team, Mapping):
        return []
    members = team.get("team", team.get("fighters", []))
    if isinstance(members, Mapping):
        result = []
        for key, member in members.items():
            if isinstance(member, Mapping):
                result.append((int(key), member))
        return sorted(result)
    if isinstance(members, Sequence) and not isinstance(members, (str, bytes)):
        return [(index, member) for index, member in enumerate(members) if isinstance(member, Mapping)]
    return []


def _attribute(data: Mapping[str, Any], *names: str, default: Number = 0) -> Decimal:
    attributes = data.get("attribute", {})
    for name in names:
        if name in data:
            return _d(data[name])
        if isinstance(attributes, Mapping) and name in attributes:
            return _d(attributes[name])
    return _d(default)


def _fighters(team: Any, camp: str, rules: Mapping[str, Any]) -> list[Fighter]:
    output = []
    for slot, data in _team_members(team):
        hp = _attribute(data, "curHp", "currentHp", "hp", "HP_ABS", default=1)
        max_hp = _attribute(data, "hp", "maxHp", "HP_ABS", default=hp)
        skills = data.get("skill", data.get("skills", []))
        output.append(
            Fighter(
                id=int(data.get("id", data.get("heroId", 0))),
                slot=slot,
                camp=camp,
                attack=_attribute(data, "attack", "ATTACK_ABS", default=1),
                defense=_attribute(data, "defense", "DEFENSE_ABS"),
                max_hp=max_hp,
                hp=min(hp, max_hp),
                speed=_attribute(data, "speed", "SPEED_ABS"),
                rage=_attribute(data, "curEnergy", "curRage"),
                rage_per_attack=_d(rules.get("ragePerAttack", 25)),
                skills=[int(item) for item in skills],
            )
        )
    return output


class HeadlessBattleEngine:
    def __init__(self, battle_data: Mapping[str, Any]):
        engine_data = battle_data.get("engineData", {})
        self.rules = engine_data.get("rules", {}) if isinstance(engine_data, Mapping) else {}
        skill_data = engine_data.get("skills", {}) if isinstance(engine_data, Mapping) else {}
        self.skills = {
            int(skill_id): Skill.parse(int(skill_id), value)
            for skill_id, value in skill_data.items()
            if isinstance(value, Mapping)
        }
        unknown = str(self.rules.get("unknownSkill", "error"))
        self.unknown_skill = unknown
        seed = int(battle_data.get("randomSeed", battle_data.get("seed", 1)))
        self.random = LcgRandom(
            seed,
            int(self.rules.get("lcgMultiplier", 1664525)),
            int(self.rules.get("lcgIncrement", 1013904223)),
            int(self.rules.get("lcgModulus", 2**32)),
        )
        self.left = _fighters(battle_data.get("leftTeam", {}), "left", self.rules)
        self.right = _fighters(battle_data.get("rightTeam", {}), "right", self.rules)
        self.max_rounds = int(battle_data.get("maxRound", self.rules.get("maxRounds", 20)))

    def _living(self, camp: str) -> list[Fighter]:
        team = self.left if camp == "left" else self.right
        return [fighter for fighter in team if fighter.alive]

    def _skill(self, fighter: Fighter) -> Skill:
        for skill_id in fighter.skills:
            skill = self.skills.get(skill_id)
            if skill and fighter.rage >= skill.rage_cost:
                return skill
            if skill is None and self.unknown_skill == "error":
                raise ValueError(
                    f"missing skill definition for skill ID {skill_id}; "
                    "provide engineData.skills or set rules.unknownSkill='normal'"
                )
        return Skill(id=0)

    def _targets(self, actor: Fighter, skill: Skill) -> list[Fighter]:
        opponents = self._living("right" if actor.camp == "left" else "left")
        if skill.target == "all":
            return opponents
        if skill.target == "lowest_hp":
            return [min(opponents, key=lambda item: (item.hp, item.slot))] if opponents else []
        return [min(opponents, key=lambda item: item.slot)] if opponents else []

    def _act(self, actor: Fighter) -> None:
        if not actor.alive:
            return
        skill = self._skill(actor)
        targets = self._targets(actor, skill)
        actor.rage = max(Decimal(0), actor.rage - skill.rage_cost)
        for target in targets:
            raw = actor.attack * skill.multiplier + skill.flat_damage - target.defense
            damage = max(_d(self.rules.get("minimumDamage", 1)), raw)
            if self.random.random() < skill.crit_chance:
                damage *= skill.crit_multiplier
            target.hp = max(Decimal(0), target.hp - damage)
        if skill.heal_multiplier > 0:
            actor.hp = min(actor.max_hp, actor.hp + actor.attack * skill.heal_multiplier)
        actor.rage += actor.rage_per_attack

    def run(self) -> BattleResult:
        if not self.left or not self.right:
            raise ValueError("battleData must contain non-empty leftTeam and rightTeam")
        rounds = 0
        reason = "round_limit"
        for rounds in range(1, self.max_rounds + 1):
            order = sorted(
                self._living("left") + self._living("right"),
                key=lambda item: (-item.speed, 0 if item.camp == "left" else 1, item.slot),
            )
            for actor in order:
                self._act(actor)
                if not self._living("right"):
                    reason = "enemy_all_dead"
                    return self._result(True, rounds, reason)
                if not self._living("left"):
                    reason = "friend_all_dead"
                    return self._result(False, rounds, reason)
        return self._result(False, rounds, reason)

    def _result(self, win: bool, rounds: int, reason: str) -> BattleResult:
        ceil = lambda value: int(value.to_integral_value(rounding=ROUND_CEILING))
        return BattleResult(
            is_win=win,
            rounds=rounds,
            seed=self.random.seed,
            left_hp=sum((ceil(item.hp) for item in self.left), 0),
            right_hp=sum((ceil(item.hp) for item in self.right), 0),
            reason=reason,
        )


def simulate_battle(battle_data: Mapping[str, Any]) -> BattleResult:
    return HeadlessBattleEngine(battle_data).run()
