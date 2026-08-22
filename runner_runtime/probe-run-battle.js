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


/*
 * 将一次异步让步推迟到下一轮 Node 事件循环。
 *
 * 原 Evo Tower 每运行约 17 个 update 后会 wait(0)，
 * 避免长时间独占主线程。
 *
 * 这里使用 setTimeout(..., 0) 达到相同目的。
 */
function yieldToEventLoop() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

async function runBattle() {
  console.error(
    "[probe-run] registering " +
    "BattleResult listener"
  );

  let finalResult = null;

  let resultEventCount = 0;

  /*
   * 原客户端在 BattleResult 回调中：
   *
   * 1. 保存 result；
   * 2. 调用 battle.endBattle()。
   */
  battle.BattleResult.add(
    function onBattleResult(result) {
      resultEventCount += 1;

      console.error(
        "[probe-run] " +
        "BattleResult emitted:",
        {
          eventCount:
            resultEventCount,

          constructor:
            result?.constructor?.name,

          keys:
            result
              ? Object.keys(result)
              : null,

          isWin:
            result?.isWin,

          round:
            result?.round,

          winCamp:
            result?.winCamp,
        }
      );

      finalResult = result;

      battle.endBattle();
    }
  );

  /*
   * 原客户端用 Date.now() 作为第一帧时间，
   * 然后每次固定增加 20ms。
   */
  const firstTime =
    Date.now();

  let currentTime =
    firstTime;

  let tickCount = 0;

  let yieldCount = 0;

  /*
   * 防止配置或 shim 错误造成无限循环。
   *
   * 正常战斗不应触及这个上限。
   */
  const MAX_TICKS =
    1_000_000;

  console.error(
    "[probe-run] starting battle:",
    {
      battleId:
        battleData.id,

      mode:
        battleData.mode,

      randomSeed:
        battleData.randomSeed,

      timeScale:
        battle.timeScale,

      syntheticStartTime:
        firstTime,
    }
  );

  battle.startBattle();

  console.error(
    "[probe-run] startBattle returned:",
    {
      isRunning:
        battle.isRunning,

      isQuitting:
        battle.isQuitting,

      isQuitted:
        battle.isQuitted,

      resultAlreadyAvailable:
        finalResult !== null,
    }
  );

  /*
   * 与原客户端相同的核心循环：
   *
   *   battle.update(currentTime)
   *   currentTime += 20
   */
  while (!battle.isQuitted) {
    battle.update(
      currentTime
    );

    currentTime += 20;

    tickCount += 1;

    if (
      tickCount > MAX_TICKS
    ) {
      throw new Error(
        "Battle exceeded " +
        MAX_TICKS +
        " ticks without quitting"
      );
    }

    /*
     * 原客户端：
     *
     *   if (u++ >= 16) {
     *     u = 0;
     *     await wait(0);
     *   }
     *
     * 因此每 17 次 update 让步一次。
     */
    if (
      tickCount % 17 === 0
    ) {
      yieldCount += 1;

      await yieldToEventLoop();
    }

    /*
     * 仅用于观察长时间卡住的情况，
     * 不参与战斗逻辑。
     */
    if (
      tickCount % 10_000 === 0
    ) {
      console.error(
        "[probe-run] progress:",
        {
          tickCount,
          syntheticTime:
            currentTime,
          isRunning:
            battle.isRunning,
          isQuitting:
            battle.isQuitting,
          isQuitted:
            battle.isQuitted,
          hasResult:
            finalResult !== null,
        }
      );
    }
  }

  console.error(
    "[probe-run] battle quitted:",
    {
      tickCount,
      yieldCount,

      syntheticElapsed:
        currentTime -
        firstTime,

      resultEventCount,

      hasResult:
        finalResult !== null,

      isRunning:
        battle.isRunning,

      isQuitting:
        battle.isQuitting,

      isQuitted:
        battle.isQuitted,
    }
  );

  if (!finalResult) {
    throw new Error(
      "Battle quitted without " +
      "emitting BattleResult"
    );
  }

  if (
    typeof finalResult.isWin !==
    "boolean"
  ) {
    throw new Error(
      "BattleResult.isWin is not " +
      "a boolean: " +
      String(
        finalResult.isWin
      )
    );
  }

  /*
   * 不直接 JSON.stringify 整个 result，
   * 因为其中可能含 Map 或循环引用。
   */
  console.error(
    "[probe-run] final result:",
    {
      isWin:
        finalResult.isWin,

      round:
        finalResult.round,

      winCamp:
        finalResult.winCamp,

      keys:
        Object.keys(
          finalResult
        ),
    }
  );

  /*
   * 当前仍是探针，因此结果写 stderr。
   *
   * 正式 original-engine-runner.js
   * 才会只向 stdout 写 JSON。
   */
  console.error(
    "[probe-run] runner protocol preview:",
    JSON.stringify({
      isWin:
        finalResult.isWin,
    })
  );
}

runBattle().catch((error) => {
  console.error(
    "[probe-run] failed:",
    error?.stack || error
  );

  nodeProcess.exitCode = 1;
});