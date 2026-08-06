# 怪异塔战果参数计算器

这个目录是独立工具，不修改游戏原有代码。它把客户端 `EvoTowerModule` 中
`readyFight -> 本地逐场模拟 -> fight` 的编排过程转换成 Python：

1. 读取 `evotower_readyfight` 的响应 JSON；
2. 每场从原始 `battleData` 重新创建副本；
3. 按索引应用 `eFullBuffList`、`randomNumList` 和 `rightTeamList`；
4. 把准备好的单场 `battleData` 交给外部战斗模拟器；
5. 胜利则继续，首次失败立即停止；
6. 输出 `evotower_fight` 所需的 `battleNum`、`winNum` 和 `isSkip`。

目录现在包含纯 Python、无 UI 的确定性单场引擎。它支持输入双方属性、速度、
怒气、技能倍率、暴击、单体/全体目标和回合上限。`readyFight` 通常只携带技能
ID，不携带完整技能效果，因此要得到可靠结果，必须通过 `--engine-data` 同时
提供该版本的技能定义。遇到未知技能时引擎默认报错，而不是静默猜测战果。

## 使用

```bash
python3 -m evo_tower_calculator \
  readyfight.json \
  --engine-data engine-data.json \
  --energy 10 \
  --stage-ids 101,102,103,104,105,106,107,108,109,110
```

输出示例：

```json
{"battleNum": 10, "winNum": 9, "isSkip": false}
```

如果输入能自行从 `battleData.options` 或其他字段确定塔层，
`--stage-ids` 可以省略。`--energy` 省略时会计算服务器下发的全部敌方阵容。

`engine-data.json` 示例：

```json
{
  "rules": {
    "maxRounds": 20,
    "minimumDamage": 1,
    "ragePerAttack": 25,
    "unknownSkill": "error"
  },
  "skills": {
    "1001": {
      "multiplier": 1.8,
      "flatDamage": 20,
      "target": "single",
      "rageCost": 100,
      "critChance": 0.15,
      "critMultiplier": 1.5
    },
    "1002": {
      "multiplier": 0.8,
      "target": "all",
      "rageCost": 100
    }
  }
}
```

如果仍需调用原 JS 引擎或其他更完整模拟器，`--runner` 仍然可用，并优先于
内置引擎。runner 从 stdin 接收一行战斗 JSON，stdout 返回
`{"isWin": true}`。

### 跳关道具

跳关不运行战斗模拟器，直接执行：

```bash
python3 -m evo_tower_calculator readyfight.json --item-skip
```

输出固定为：

```json
{"battleNum": 1, "winNum": 1, "isSkip": true}
```

## Python API

```python
from evo_tower_calculator import calculate_with_builtin_engine, simulate_battle

single_result = simulate_battle(battle_data)

params = calculate_with_builtin_engine(
    ready_response,
    engine_data=engine_data,
    energy=10,
    stage_ids=[101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
)
```

## 与原客户端的一致性边界

内置引擎完整执行本目录声明的数据驱动规则，但它并不是对游戏中数十万行
ECS/技能命令的逐行翻译。原客户端还会从远程配置包读取技能、Buff、法宝、
鱼灵、淬炼和特殊角色脚本；这些规则如果没有作为 `engineData` 输入，任何
Python 实现都无法只凭 `readyFight` 响应还原。需要服务端逐字节一致的结果时，
应继续使用 `--runner` 接入原始 JS 引擎，或继续把实际涉及的技能效果逐项补入
`engine.py`，不要把缺少配置的简化结果直接当成权威战果。
