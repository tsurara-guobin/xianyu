"use strict";

/*
 * Headless adapter for the original Evo Tower battle engine.
 *
 * Protocol:
 *   stdin  - one battleData JSON document
 *   stdout - exactly one {"isWin": boolean} JSON document
 *
 * The game bundle replaces global process with a browser polyfill, so retain
 * the real Node objects before loading any game code.  Game/config diagnostics
 * are deliberately sent to stderr so that they cannot corrupt stdout.
 */
const nodeProcess = globalThis.process;
const nodeConsole = globalThis.console;

function stderrLog(...args) {
  nodeConsole.error(...args);
}

globalThis.console = {
  ...nodeConsole,
  log: stderrLog,
  info: stderrLog,
  debug: stderrLog,
  warn: stderrLog,
  error: stderrLog,
};

function readStdin() {
  return new Promise((resolve, reject) => {
    let input = "";

    nodeProcess.stdin.setEncoding("utf8");
    nodeProcess.stdin.on("data", (chunk) => {
      input += chunk;
    });
    nodeProcess.stdin.on("end", () => resolve(input));
    nodeProcess.stdin.on("error", reject);
  });
}

function yieldToEventLoop() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function loadEngine() {
  const { loadConfigCache } = require("./load-config-cache.js");

  require("./shim.js");
  require("../workspace/xianyu/assets/main/index.js");
  require("../workspace/xianyu/subpackages/TEST_REMOTE_MODULE/game.js");

  const gameRequire = globalThis.__require;
  if (typeof gameRequire !== "function") {
    throw new Error("Game bundle did not expose globalThis.__require");
  }

  loadConfigCache(gameRequire);

  const { BattleData } = gameRequire("battle-data");
  const { ServerBattleLauncher } = gameRequire("launcher-server");

  if (typeof BattleData !== "function") {
    throw new Error("BattleData is unavailable");
  }
  if (typeof ServerBattleLauncher !== "function") {
    throw new Error("ServerBattleLauncher is unavailable");
  }

  return { BattleData, ServerBattleLauncher };
}

async function simulate(rawBattleData) {
  const { BattleData, ServerBattleLauncher } = loadEngine();
  const battleData = new BattleData();
  battleData.setValue(rawBattleData);

  const launcher = new ServerBattleLauncher();
  launcher.initialize();

  const battle = launcher.createBattleById({
    battleData,
    timeScale: 100,
    extend: { noRender: true },
  });

  if (!battle) {
    throw new Error(
      `createBattleById returned empty for battle mode ${battleData.mode}`,
    );
  }
  if (!battle.BattleResult || typeof battle.BattleResult.add !== "function") {
    throw new Error("Created battle does not expose BattleResult.add");
  }

  let finalResult = null;
  battle.BattleResult.add((result) => {
    finalResult = result;
    battle.endBattle();
  });

  let currentTime = Date.now();
  let tickCount = 0;
  const maxTicks = 1_000_000;

  battle.startBattle();

  while (!battle.isQuitted) {
    if (tickCount >= maxTicks) {
      throw new Error(`Battle exceeded ${maxTicks} ticks without quitting`);
    }

    battle.update(currentTime);
    currentTime += 20;
    tickCount += 1;

    // The original client evaluates `u++ >= 16`, so it yields after every
    // seventeenth update while the Evo Tower optimization is enabled.
    if (tickCount % 17 === 0) {
      await yieldToEventLoop();
    }
  }

  if (!finalResult) {
    throw new Error("Battle quit without emitting BattleResult");
  }
  if (typeof finalResult.isWin !== "boolean") {
    throw new Error(
      `BattleResult.isWin is not a boolean: ${String(finalResult.isWin)}`,
    );
  }

  return finalResult.isWin;
}

async function main() {
  const input = await readStdin();
  if (!input.trim()) {
    throw new Error("stdin did not contain battleData JSON");
  }

  const rawBattleData = JSON.parse(input);
  const isWin = await simulate(rawBattleData);

  // Do not use console here: stdout is reserved exclusively for the protocol.
  nodeProcess.stdout.write(`${JSON.stringify({ isWin })}\n`);
}

main().catch((error) => {
  nodeConsole.error(error && error.stack ? error.stack : error);
  nodeProcess.exitCode = 1;
});
