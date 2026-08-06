import unittest

from evo_tower_calculator import calculate_fight_params, prepare_battle, simulate_battle


class CalculatorTest(unittest.TestCase):
    def setUp(self):
        self.ready = {
            "battleData": {"leftTeam": {"team": [{"attribute": {"base": 1}}]}},
            "randomNumList": [11, 22, 33],
            "rightTeamList": [{"id": "a"}, {"id": "b"}, {"id": "c"}],
            "eFullBuffList": [{"0": {"attack": 10}}, {"0": {"attack": 20}}, {}],
        }

    def test_prepare_battle(self):
        battle = prepare_battle(self.ready, 1, stage_id=102)
        self.assertEqual(battle["randomSeed"], 22)
        self.assertEqual(battle["rightTeam"]["id"], "b")
        self.assertEqual(battle["leftTeam"]["team"][0]["attribute"]["attack"], 20)
        self.assertEqual(battle["options"]["towerId"], 102)

    def test_stops_at_first_loss(self):
        outcomes = iter([True, True, False])
        result = calculate_fight_params(self.ready, lambda _: next(outcomes))
        self.assertEqual(result.as_dict(), {"battleNum": 3, "winNum": 2, "isSkip": False})

    def test_energy_limits_battles(self):
        result = calculate_fight_params(self.ready, lambda _: True, energy=2)
        self.assertEqual(result.as_dict(), {"battleNum": 2, "winNum": 2, "isSkip": False})

    def test_builtin_headless_engine(self):
        battle = {
            "randomSeed": 7,
            "maxRound": 3,
            "leftTeam": {"team": [{"id": 1, "attack": 30, "defense": 2, "hp": 100, "speed": 10}]},
            "rightTeam": {"team": [{"id": 2, "attack": 5, "defense": 0, "hp": 20, "speed": 1}]},
        }
        result = simulate_battle(battle)
        self.assertTrue(result.is_win)
        self.assertEqual(result.reason, "enemy_all_dead")

    def test_unknown_skill_requires_definition(self):
        battle = {
            "leftTeam": {"team": [{"id": 1, "attack": 10, "hp": 10, "skill": [99]}]},
            "rightTeam": {"team": [{"id": 2, "attack": 1, "hp": 10}]},
        }
        with self.assertRaisesRegex(ValueError, "missing skill definition"):
            simulate_battle(battle)


if __name__ == "__main__":
    unittest.main()
