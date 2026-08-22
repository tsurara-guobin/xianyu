"use strict";

const {
  loadConfigCache,
} = require("./load-config-cache.js");

/*
 * 安装 Node/Cocos 兼容层。
 */
require("./shim.js");

console.error(
  "[probe-init] shim loaded"
);

/*
 * 加载基础 bundle。
 */
require(
  "../workspace/xianyu/assets/main/index.js"
);

console.error(
  "[probe-init] main bundle loaded"
);

/*
 * 加载底层战斗 bundle。
 */
require(
  "../workspace/xianyu/subpackages/" +
  "TEST_REMOTE_MODULE/game.js"
);

console.error(
  "[probe-init] battle bundle loaded"
);

if (
  typeof globalThis.__require !==
  "function"
) {
  throw new Error(
    "Combined __require is unavailable"
  );
}

const battleBundleRequire =
  globalThis.__require;


/*
 * 必须在第一次 launcher.initialize()
 * 之前完成配置解码。
 */

const configState =
  loadConfigCache(
    globalThis.__require
  );

const Configs =
  configState.Configs;


/*
 * 获取原版 launcher。
 */
const launcherExports =
  battleBundleRequire(
    "launcher-server"
  );

const ServerBattleLauncher =
  launcherExports.ServerBattleLauncher;

if (
  typeof ServerBattleLauncher !==
  "function"
) {
  throw new Error(
    "ServerBattleLauncher is not " +
    "a constructor"
  );
}

console.error(
  "[probe-init] creating launcher"
);

const launcher =
  new ServerBattleLauncher();

console.error(
  "[probe-init] launcher created"
);

console.error(
  "[probe-init] before initialize:",
  {
    prototypeFactory:
      launcher.prototypeFactory.size,
    battleTypeSystems:
      launcher.battleTypeSystems.size,
    battles:
      launcher.battles.size,
    idBattles:
      launcher.idBattles.size,
    idTypes:
      launcher.idTypes.size,
    typeBattles:
      launcher.typeBattles.size,
  }
);

console.error(
  "[probe-init] calling initialize"
);


function assertValue(
  condition,
  message
) {
  if (!condition) {
    throw new Error(message);
  }
}

console.error(
  "[config-check] " +
  "ConstantConf.config type:",
  typeof Configs
    .ConstantConf
    ?.config
);

console.error(
  "[config-check] " +
  "finalBlockRateLimit:",
  Configs
    .ConstantConf
    ?.config
    ?.finalBlockRateLimit
);

console.error(
  "[config-check] " +
  "LocalConf.config type:",
  typeof Configs
    .LocalConf
    ?.config
);

console.error(
  "[config-check] " +
  "seasonBattleTypes:",
  Configs
    .LocalConf
    ?.config
    ?.seasonBattleTypes
);

assertValue(
  Configs.ConstantConf?.config,
  "ConstantConf.config is missing"
);

assertValue(
  Configs.ConstantConf
    .config
    .finalBlockRateLimit !==
    undefined,
  "finalBlockRateLimit is missing"
);

assertValue(
  Configs.LocalConf?.config,
  "LocalConf.config is missing"
);

assertValue(
  Array.isArray(
    Configs.LocalConf
      .config
      .seasonBattleTypes
  ),
  "LocalConf.config." +
  "seasonBattleTypes is not an array"
);

const requiredFormationIds = [
  1000,
  1001,
  1002,
  1003,
  1004,
  1005,
  1006,
  2000,
];

console.error(
  "[config-check] FormationConf:",
  typeof Configs.FormationConf
);

console.error(
  "[config-check] " +
  "FormationConf list length:",
  Configs.FormationConf
    ?.list
    ?.length
);

for (
  const id of requiredFormationIds
) {
  const formation =
    Configs.FormationConf
      ?.getById(id);

  console.error(
    "[config-check] formation",
    id,
    "=",
    formation
      ? {
          id: formation.id,
          x: formation.x,
          y: formation.y,
        }
      : null
  );

  assertValue(
    formation,
    "Missing FormationConf ID " +
    id
  );

  assertValue(
    Number.isFinite(formation.x),
    "FormationConf " +
    id +
    " has invalid x"
  );

  assertValue(
    Number.isFinite(formation.y),
    "FormationConf " +
    id +
    " has invalid y"
  );
}

console.error(
  "[config-check] SkillConf count:",
  Configs.SkillConf
    ?.list
    ?.length
);

console.error(
  "[config-check] BuffConf count:",
  Configs.BuffConf
    ?.list
    ?.length
);

console.error(
  "[config-check] EffectConf count:",
  Configs.EffectConf
    ?.list
    ?.length
);

console.error(
  "[config-check] HeroConf count:",
  Configs.HeroConf
    ?.list
    ?.length
);

assertValue(
  Configs.SkillConf
    ?.list
    ?.length > 0,
  "SkillConf is empty"
);

assertValue(
  Configs.BuffConf
    ?.list
    ?.length > 0,
  "BuffConf is empty"
);

assertValue(
  Configs.EffectConf
    ?.list
    ?.length > 0,
  "EffectConf is empty"
);

assertValue(
  Configs.HeroConf
    ?.list
    ?.length > 0,
  "HeroConf is empty"
);

console.error(
  "[config-check] " +
  "VersionConf:",
  Configs.VersionConf
    ?.config ??
  Configs.VersionConf
);

console.error(
  "[config-check] " +
  "global BATTLE_VERSION:",
  globalThis.BATTLE_VERSION
);


/*
 * 本次探针的核心。
 */
launcher.initialize();

console.error(
  "[probe-init] initialize completed"
);

console.error(
  "[probe-init] after initialize:",
  {
    prototypeFactory:
      launcher.prototypeFactory.size,
    logicSystems:
      launcher.logicSystems.length,
    otherSystems:
      launcher.otherSystems.length,
    effectSystems:
      launcher.effectSystems.length,
    viewSystems:
      launcher.viewSystems.length,
    battleTypeSystems:
      launcher.battleTypeSystems.size,
    battles:
      launcher.battles.size,
    idBattles:
      launcher.idBattles.size,
    idTypes:
      launcher.idTypes.size,
    typeBattles:
      launcher.typeBattles.size,
  }
);