"use strict";

/*
 * 第一步：安装已经验证过的 shim。
 */
require("./shim.js");

console.error(
  "[probe-battle] shim loaded"
);

/*
 * 第二步：加载主基础 bundle。
 *
 * 它提供：
 * - @jimu/ecs
 * - @jimu/basis
 * - @o4e/core
 * - 配置类基础结构
 * - 全局 __require
 */
require(
  "../workspace/xianyu/assets/main/index.js"
);

if (
  typeof globalThis.__require !==
  "function"
) {
  throw new Error(
    "Main bundle did not install __require"
  );
}

/*
 * 保存主 bundle 的模块加载器。
 *
 * TEST_REMOTE_MODULE 加载后会替换 globalThis.__require，
 * 但其内部会把当前加载器作为 fallback 保存。
 */
const mainBundleRequire =
  globalThis.__require;

console.error(
  "[probe-battle] main bundle loaded"
);

console.error(
  "[probe-battle] main __require type:",
  typeof mainBundleRequire
);

/*
 * 第三步：加载原战斗 bundle。
 */
require(
  "../workspace/xianyu/subpackages/" +
  "TEST_REMOTE_MODULE/game.js"
);

if (
  typeof globalThis.__require !==
  "function"
) {
  throw new Error(
    "Battle bundle did not install __require"
  );
}

const battleBundleRequire =
  globalThis.__require;

console.error(
  "[probe-battle] battle bundle loaded"
);

console.error(
  "[probe-battle] combined __require type:",
  typeof battleBundleRequire
);

console.error(
  "[probe-battle] require replaced:",
  battleBundleRequire !==
    mainBundleRequire
);

const battleDataExports =
  globalThis.__require("battle-data");

const launcherExports =
  globalThis.__require(
    "launcher-server"
  );

console.error(
  "[probe-battle] battle-data:",
  Object.keys(battleDataExports)
);

console.error(
  "[probe-battle] launcher-server:",
  Object.keys(launcherExports)
);

/*
 * 从模块导出中取得核心类。
 */

const BattleData =
  battleDataExports.BattleData;

const ServerBattleLauncher =
  launcherExports.ServerBattleLauncher;

console.error(
  "[probe-battle] BattleData type:",
  typeof BattleData
);

console.error(
  "[probe-battle] ServerBattleLauncher type:",
  typeof ServerBattleLauncher
);

if (typeof BattleData !== "function") {
  throw new Error(
    "BattleData is not a constructor"
  );
}

if (
  typeof ServerBattleLauncher !==
  "function"
) {
  throw new Error(
    "ServerBattleLauncher is not " +
    "a constructor"
  );
}

/*
 * 输出一个对象自身字段以及完整原型链的方法。
 *
 * 很多 setValue/reset 方法可能来自父类，
 * 只看 Object.keys(instance) 是看不到的。
 */

function describeInstance(
  label,
  instance
) {
  console.error(
    `\n[describe] ${label}`
  );

  console.error(
    "[describe] own keys:",
    Object.keys(instance)
  );

  let prototype =
    Object.getPrototypeOf(instance);

  let level = 0;

  while (
    prototype !== null &&
    level < 10
  ) {
    const names =
      Object.getOwnPropertyNames(
        prototype
      );

    console.error(
      `[describe] prototype ` +
      `level ${level}:`,
      names
    );

    prototype =
      Object.getPrototypeOf(prototype);

    level += 1;
  }
}

/*
 * 当前只测试构造函数。
 *
 * 不调用 initialize、createBattleById，
 * 不读取真实 readyfight。
 */

const emptyBattleData =
  new BattleData();

const emptyLauncher =
  new ServerBattleLauncher();

describeInstance(
  "BattleData",
  emptyBattleData
);

describeInstance(
  "ServerBattleLauncher",
  emptyLauncher
);

console.error(
  "[probe-battle] BattleData.setValue:",
  typeof emptyBattleData.setValue
);

console.error(
  "[probe-battle] BattleData.reset:",
  typeof emptyBattleData.reset
);

console.error(
  "[probe-battle] Launcher.initialize:",
  typeof emptyLauncher.initialize
);

console.error(
  "[probe-battle] " +
  "Launcher.createBattleById:",
  typeof emptyLauncher
    .createBattleById
);