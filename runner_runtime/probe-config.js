"use strict";

const {
  loadConfigCache,
} = require("./load-config-cache.js");

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

const {
  Configs,
  mergedConfig,
  assetsByName,
} = loadConfigCache(gameRequire);

console.error(
  "[probe-config] assets:",
  Array.from(
    assetsByName.keys()
  )
);

console.error(
  "[probe-config] merged keys:",
  Object.keys(
    mergedConfig
  ).length
);

console.error(
  "[probe-config] " +
  "finalBlockRateLimit:",
  Configs.ConstantConf
    ?.config
    ?.finalBlockRateLimit
);

console.error(
  "[probe-config] " +
  "seasonBattleTypes:",
  Configs.LocalConf
    ?.config
    ?.seasonBattleTypes
);

console.error(
  "[probe-config] formations:",
  Configs.FormationConf
    ?.list
    ?.length
);

console.error(
  "[probe-config] skills:",
  Configs.SkillConf
    ?.list
    ?.length
);

console.error(
  "[probe-config] buffs:",
  Configs.BuffConf
    ?.list
    ?.length
);

console.error(
  "[probe-config] effects:",
  Configs.EffectConf
    ?.list
    ?.length
);

console.error(
  "[probe-config] heroes:",
  Configs.HeroConf
    ?.list
    ?.length
);