"use strict";

require("./shim.js");

const requiredBuildGlobals = [
  "PLATFORM",
  "SUB_PLATFORM",
  "ENV",
  "APPID",
  "CDN",
  "SERVER",
  "GAME_NAME",
  "GAME_ID",
  "GAME_VERSION",
  "COMMIT_ID",
  "CONFIG_COMMIT_ID",
  "RESOURCES_COMMIT_ID",
  "DOWNLOAD_URL",
  "VERSION_POSTFIX",
  "CDNS",
];

for (const name of requiredBuildGlobals) {
  if (!(name in globalThis)) {
    throw new Error(
      "Missing build global: " + name
    );
  }

  console.error(
    "[probe] build global",
    name,
    "=",
    globalThis[name]
  );
}

require(
  "../workspace/xianyu/assets/main/index.js"
);

console.error(
  "[probe] main bundle loaded, __require:",
  typeof globalThis.__require
);

const requiredShimEntries = [
  ["cc", globalThis.cc],
  ["cc._RF", globalThis.cc?._RF],
  [
    "cc._RF.push",
    globalThis.cc?._RF?.push,
  ],
  [
    "cc._RF.pop",
    globalThis.cc?._RF?.pop,
  ],
  [
    "cc._decorator",
    globalThis.cc?._decorator,
  ],
  [
    "cc._decorator.ccclass",
    globalThis.cc?._decorator?.ccclass,
  ],
  [
    "cc._decorator.property",
    globalThis.cc?._decorator?.property,
  ],
  [
    "cc._decorator.menu",
    globalThis.cc?._decorator?.menu,
  ],
  [
    "cc.Component",
    globalThis.cc?.Component,
  ],
];

console.error(
  "[probe] cc.sys.platform:",
  globalThis.cc?.sys?.platform
);

console.error(
  "[probe] cc.sys.os:",
  globalThis.cc?.sys?.os
);

console.error(
  "[probe] cc.sys.isBrowser:",
  globalThis.cc?.sys?.isBrowser
);

console.error(
  "[probe] cc.game.on type:",
  typeof globalThis.cc?.game?.on
);

console.error(
  "[probe] localStorage type:",
  typeof globalThis.cc?.sys?.localStorage
);

for (
  const [name, value] of requiredShimEntries
) {
  if (
    value === undefined ||
    value === null
  ) {
    throw new Error(
      "Missing shim entry: " + name
    );
  }

  console.error(
    "[probe]",
    name,
    "type:",
    typeof value
  );
}

require("../workspace/xianyu/assets/main/index.js");

console.error(
  "[probe] main bundle loaded, __require type:",
  typeof globalThis.__require
);