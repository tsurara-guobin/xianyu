"use strict";

/*
 * 必须在加载任何游戏 bundle 之前保存。
 *
 * assets/main/index.js 会安装浏览器 process polyfill，
 * 并将 process.argv 设置为空数组。
 */
const nodeProcess =
  globalThis.process;

const nodeArgv =
  nodeProcess.argv.slice();

console.error(
  "[probe-data] original Node argv:",
  JSON.stringify(
    nodeArgv,
    null,
    2
  )
);

const fs = require("fs");
const path = require("path");

const {
  loadConfigCache,
} = require("./load-config-cache.js");


/*
 * 加载 shim 和原版 bundle。
 */
require("./shim.js");

require(
  "../workspace/xianyu/assets/main/index.js"
);

require(
  "../workspace/xianyu/subpackages/" +
  "TEST_REMOTE_MODULE/game.js"
);

const gameRequire =
  globalThis.__require;

/*
 * 先完成真实配置解码。
 */
const {
  Configs,
} = loadConfigCache(gameRequire);

/*
 * 获取原版 BattleData。
 */
const {
  BattleData,
} = gameRequire("battle-data");

if (typeof BattleData !== "function") {
  throw new Error(
    "BattleData is not a constructor"
  );
}

/*
 * 从命令行取得单场文件路径。
 */
 
console.error(
  "[probe-data] saved nodeArgv:",
  JSON.stringify(
    nodeArgv,
    null,
    2
  )
);

console.error(
  "[probe-data] current polyfilled argv:",
  JSON.stringify(
    globalThis.process?.argv,
    null,
    2
  )
);

const inputArgument =
  nodeArgv[2];



if (!inputArgument) {
  throw new Error(
    "Usage: node " +
    "runner_runtime/probe-battle-data.js " +
    "single-battle.json"
  );
}

const inputPath =
  path.resolve(
    process.cwd(),
    inputArgument
  );

console.error(
  "[probe-data] input:",
  inputPath
);

if (!fs.existsSync(inputPath)) {
  throw new Error(
    "Input file does not exist: " +
    inputPath
  );
}

const rawBattleData =
  JSON.parse(
    fs.readFileSync(
      inputPath,
      "utf8"
    )
  );

console.error(
  "[probe-data] raw keys:",
  Object.keys(rawBattleData)
);

console.error(
  "[probe-data] raw randomSeed:",
  rawBattleData.randomSeed
);

/*
 * 使用原版数据类恢复 JSON。
 */
const battleData =
  new BattleData();

console.error(
  "[probe-data] calling setValue"
);

battleData.setValue(
  rawBattleData
);

console.error(
  "[probe-data] setValue completed"
);

function constructorName(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  return (
    value.constructor?.name ??
    typeof value
  );
}

function collectionSize(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  if (
    typeof value.size === "number"
  ) {
    return value.size;
  }

  if (
    typeof value.length === "number"
  ) {
    return value.length;
  }

  return null;
}

function firstMapEntry(value) {
  if (!(value instanceof Map)) {
    return null;
  }

  const iterator =
    value.entries();

  const first =
    iterator.next();

  if (first.done) {
    return null;
  }

  return first.value;
}

console.error(
  "[probe-data] top-level:",
  {
    constructor:
      constructorName(battleData),

    id:
      battleData.id,

    mode:
      battleData.mode,

    randomSeed:
      battleData.randomSeed,

    version:
      battleData.version,

    maxRound:
      battleData.maxRound,

    leftTeamType:
      constructorName(
        battleData.leftTeam
      ),

    rightTeamType:
      constructorName(
        battleData.rightTeam
      ),

    optionsType:
      constructorName(
        battleData.options
      ),

    optionsIsMap:
      battleData.options
        instanceof Map,

    optionsSize:
      collectionSize(
        battleData.options
      ),
  }
);

function describeTeam(
  label,
  team
) {
  console.error(
    `[probe-data] ${label}:`,
    {
      constructor:
        constructorName(team),

      ownKeys:
        team
          ? Object.keys(team)
          : null,

      teamFieldType:
        constructorName(
          team?.team
        ),

      teamIsMap:
        team?.team
          instanceof Map,

      teamSize:
        collectionSize(
          team?.team
        ),

      firstEntry:
        firstMapEntry(
          team?.team
        )
          ? firstMapEntry(
              team.team
            )[0]
          : null,
    }
  );
}

describeTeam(
  "leftTeam",
  battleData.leftTeam
);

describeTeam(
  "rightTeam",
  battleData.rightTeam
);

function describeFirstFighter(
  label,
  team
) {
  if (!(team?.team instanceof Map)) {
    console.error(
      `[probe-data] ${label}: ` +
      "team is not a Map"
    );

    return;
  }

  const first =
    firstMapEntry(team.team);

  if (!first) {
    console.error(
      `[probe-data] ${label}: ` +
      "team is empty"
    );

    return;
  }

  const [slot, fighter] =
    first;

  console.error(
    `[probe-data] ${label}:`,
    {
      slot,

      constructor:
        constructorName(fighter),

      ownKeys:
        fighter
          ? Object.keys(fighter)
          : null,

      id:
        fighter?.id,

      level:
        fighter?.level,

      attributeType:
        constructorName(
          fighter?.attribute
        ),

      attributeIsMap:
        fighter?.attribute
          instanceof Map,

      attributeSize:
        collectionSize(
          fighter?.attribute
        ),

      enchantMapType:
        constructorName(
          fighter?.enchantMap
        ),

      enchantMapIsMap:
        fighter?.enchantMap
          instanceof Map,

      enchantMapSize:
        collectionSize(
          fighter?.enchantMap
        ),
    }
  );
}

describeFirstFighter(
  "first left fighter",
  battleData.leftTeam
);

describeFirstFighter(
  "first right fighter",
  battleData.rightTeam
);

console.error(
  "[probe-data] options entries:",
  battleData.options instanceof Map
    ? Array.from(
        battleData.options.entries()
      )
    : battleData.options
);

