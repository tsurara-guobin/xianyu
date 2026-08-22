"use strict";

const fs = require("fs");
const path = require("path");

/*
 * 原客户端合并配置时使用的顺序。
 *
 * 当前缓存里可能不包含 level 或 levelcoef；
 * 缺失的分片会被跳过。
 */
const CONFIG_ORDER = [
  "config",
  "level",
  "tower",
  "language",
  "levelcoef",
  "config_ap",
  "season_tower",
  "season_level",
];

/*
 * 判断一个 JSON 是否是当前看到的
 * Cocos cc.JsonAsset 缓存格式。
 */
function extractConfigAsset(
  cacheData,
  sourceFile
) {
  if (!Array.isArray(cacheData)) {
    return null;
  }

  const serializedObjects =
    cacheData[5];

  if (
    !Array.isArray(serializedObjects) ||
    serializedObjects.length === 0
  ) {
    return null;
  }

  const firstObject =
    serializedObjects[0];

  if (
    !Array.isArray(firstObject) ||
    firstObject.length < 3
  ) {
    return null;
  }

  const assetName =
    firstObject[1];

  const payload =
    firstObject[2];

  if (typeof assetName !== "string") {
    return null;
  }

  if (
    payload === null ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    throw new Error(
      "Invalid config payload in " +
      sourceFile
    );
  }

  return {
    assetName,
    payload,
    sourceFile,
  };
}

/*
 * 从 gamecaches/config 读取所有可用配置分片，
 * 按原客户端顺序合并，然后调用原版 decodeConfig。
 */
function loadConfigCache(gameRequire) {
  if (typeof gameRequire !== "function") {
    throw new TypeError(
      "gameRequire must be a function"
    );
  }

  const configDirectory =
    path.resolve(
      __dirname,
      "..",
      "workspace",
      "xianyu",
      "gamecaches",
      "config"
    );

  console.error(
    "[config] directory:",
    configDirectory
  );

  if (!fs.existsSync(configDirectory)) {
    throw new Error(
      "Config cache directory does not " +
      "exist: " +
      configDirectory
    );
  }

  const assetsByName =
    new Map();

  const filenames =
    fs.readdirSync(configDirectory)
      .filter((filename) =>
        filename
          .toLowerCase()
          .endsWith(".json")
      )
      .sort();

  for (const filename of filenames) {
    const absolutePath =
      path.join(
        configDirectory,
        filename
      );

    const text =
      fs.readFileSync(
        absolutePath,
        "utf8"
      );

    const cacheData =
      JSON.parse(text);

    const asset =
      extractConfigAsset(
        cacheData,
        absolutePath
      );

    /*
     * app bundle manifest 之类的普通 JSON
     * 不属于配置分片，直接跳过。
     */
    if (asset === null) {
      console.error(
        "[config] skipped non-config:",
        filename
      );

      continue;
    }

    console.error(
      "[config] found:",
      asset.assetName,
      "from",
      filename,
      "keys:",
      Object.keys(asset.payload).length
    );

    if (
      assetsByName.has(asset.assetName)
    ) {
      throw new Error(
        "Duplicate config asset name: " +
        asset.assetName
      );
    }

    assetsByName.set(
      asset.assetName,
      asset
    );
  }

  const mergedConfig = {};

  for (
    const assetName
    of CONFIG_ORDER
  ) {
    const asset =
      assetsByName.get(assetName);

    if (!asset) {
      console.error(
        "[config] not cached:",
        assetName
      );

      continue;
    }

    Object.assign(
      mergedConfig,
      asset.payload
    );

    console.error(
      "[config] merged:",
      assetName
    );
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      mergedConfig,
      "ConstantConf"
    )
  ) {
    throw new Error(
      "Merged config has no ConstantConf"
    );
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      mergedConfig,
      "LocalConf"
    )
  ) {
    throw new Error(
      "Merged config has no LocalConf"
    );
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      mergedConfig,
      "formationConf"
    )
  ) {
    throw new Error(
      "Merged config has no formationConf"
    );
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      mergedConfig,
      "SkillConf"
    )
  ) {
    throw new Error(
      "Merged config has no SkillConf"
    );
  }

  if (
    !Object.prototype.hasOwnProperty.call(
      mergedConfig,
      "BuffConf"
    )
  ) {
    throw new Error(
      "Merged config has no BuffConf"
    );
  }

  const Configs =
    gameRequire("Configs");

  if (
    !Configs ||
    typeof Configs.decodeConfig !==
      "function"
  ) {
    throw new Error(
      "Configs.decodeConfig is unavailable"
    );
  }

  console.error(
    "[config] merged total keys:",
    Object.keys(
      mergedConfig
    ).length
  );

  /*
   * 第二个参数 false 表示完整解码，而不是增量覆盖。
   */
  Configs.decodeConfig(
    mergedConfig,
    false
  );

  console.error(
    "[config] decodeConfig completed"
  );

  return {
    Configs,
    mergedConfig,
    assetsByName,
  };
}

module.exports = {
  loadConfigCache,
};