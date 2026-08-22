"use strict";

/*
 * 游戏主 bundle 会把 global process 替换为浏览器 polyfill，
 * 因此必须提前保存 Node 运行时。
 */

const nodeProcess =
  globalThis.process;

const nodeArgv =
  nodeProcess.argv.slice();

const fs = require("fs");
const path = require("path");

const {
  loadConfigCache,
} = require("./load-config-cache.js");

require("./shim.js");

require(
  "../workspace/xianyu/assets/main/index.js"
);

console.error(
  "[probe-create] main bundle loaded"
);

require(
  "../workspace/xianyu/subpackages/" +
  "TEST_REMOTE_MODULE/game.js"
);

console.error(
  "[probe-create] battle bundle loaded"
);

const gameRequire =
  globalThis.__require;

const {
  Configs,
} = loadConfigCache(
  gameRequire
);

console.error(
  "[probe-create] config decoded"
);
const inputArgument =
  nodeArgv[2];

if (!inputArgument) {
  throw new Error(
    "Usage: node " +
    "runner_runtime/probe-create-battle.js " +
    "single-battle.json"
  );
}

const inputPath =
  path.resolve(
    nodeProcess.cwd(),
    inputArgument
  );

console.error(
  "[probe-create] input:",
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
  "[probe-create] raw:",
  {
    id: rawBattleData.id,
    mode: rawBattleData.mode,
    randomSeed:
      rawBattleData.randomSeed,
    version:
      rawBattleData.version,
  }
);
const {
  BattleData,
} = gameRequire("battle-data");

const {
  ServerBattleLauncher,
} = gameRequire(
  "launcher-server"
);

if (typeof BattleData !== "function") {
  throw new Error(
    "BattleData is unavailable"
  );
}

if (
  typeof ServerBattleLauncher !==
  "function"
) {
  throw new Error(
    "ServerBattleLauncher is unavailable"
  );
}

const battleData =
  new BattleData();

battleData.setValue(
  rawBattleData
);

console.error(
  "[probe-create] BattleData restored:",
  {
    id: battleData.id,
    mode: battleData.mode,
    randomSeed:
      battleData.randomSeed,

    leftTeamSize:
      battleData.leftTeam
        ?.team
        ?.size,

    rightTeamSize:
      battleData.rightTeam
        ?.team
        ?.size,

    options:
      battleData.options
        instanceof Map
        ? Array.from(
            battleData
              .options
              .entries()
          )
        : null,
  }
);
const launcher =
  new ServerBattleLauncher();

console.error(
  "[probe-create] " +
  "calling launcher.initialize"
);

launcher.initialize();

console.error(
  "[probe-create] " +
  "launcher initialized:",
  {
    prototypeFactory:
      launcher
        .prototypeFactory
        .size,

    battleTypeSystems:
      launcher
        .battleTypeSystems
        .size,
  }
);
console.error(
  "[probe-create] " +
  "calling createBattleById",
  {
    id: battleData.id,
    mode: battleData.mode,
    timeScale: 100,
    noRender: true,
  }
);

const battle =
  launcher.createBattleById({
    battleData,
    timeScale: 100,

    extend: {
      noRender: true,
    },
  });

console.error(
  "[probe-create] " +
  "createBattleById returned:",
  battle
    ? "object"
    : battle
);

if (!battle) {
  throw new Error(
    "createBattleById returned empty; " +
    "battle mode " +
    battleData.mode +
    " may not be registered"
  );
}
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

function describePrototypeChain(
  label,
  value
) {
  console.error(
    `\n[describe] ${label}`
  );

  console.error(
    "[describe] constructor:",
    constructorName(value)
  );

  console.error(
    "[describe] own keys:",
    Object.keys(value)
  );

  let prototype =
    Object.getPrototypeOf(value);

  let level = 0;

  while (
    prototype !== null &&
    level < 10
  ) {
    console.error(
      `[describe] prototype ` +
      `level ${level}:`,
      Object.getOwnPropertyNames(
        prototype
      )
    );

    prototype =
      Object.getPrototypeOf(
        prototype
      );

    level += 1;
  }
}

describePrototypeChain(
  "battle",
  battle
);
console.error(
  "[probe-create] battle API:",
  {
    startBattle:
      typeof battle.startBattle,

    update:
      typeof battle.update,

    endBattle:
      typeof battle.endBattle,

    quitBattle:
      typeof battle.quitBattle,

    quickBattle:
      typeof battle.quickBattle,

    isQuitted:
      battle.isQuitted,

    BattleResultType:
      constructorName(
        battle.BattleResult
      ),

    BattleResultAdd:
      typeof battle
        .BattleResult
        ?.add,
  }
);
console.error(
  "[probe-create] launcher state:",
  {
    battles:
      launcher.battles.size,

    idBattles:
      launcher.idBattles.size,

    idTypes:
      launcher.idTypes.size,

    typeBattles:
      launcher.typeBattles.size,

    getBattleById:
      typeof launcher.getBattleById,

    registeredBattle:
      launcher.getBattleById(
        battleData.id
      ) === battle,
  }
);