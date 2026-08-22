"use strict";

// 小程序和浏览器中有 window，Node.js 中没有。
// 让 window 指向 Node.js 的全局对象。
globalThis.window = globalThis;
globalThis.self = globalThis;

/*
 * vm2 catch-wrapper compatibility.
 *
 * 当前反编译 bundle 中的 catch 块被 vm2 注入了：
 *
 *   error =
 *     VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL
 *       .handleException(error);
 *
 * runner 运行在普通 Node.js 中，不存在 vm2 的跨沙箱异常边界。
 * 因此保持原始 Error 对象不变即可恢复普通 catch 语义。
 */

globalThis
  .VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL = {
    handleException(error) {
      return error;
    },
  };


/*
 * 游戏构建期全局变量。
 *
 * 小程序构建工具通常会在打包时注入这些变量。
 * 当前反编译产物保留了 dev fallback，但因为模块处于
 * strict mode，Node.js 无法给未声明标识符直接赋值。
 *
 * probe 阶段使用原代码声明的 dev 默认值。
 */

globalThis.PLATFORM = "dev";
globalThis.SUB_PLATFORM = "";
globalThis.ENV = "Dev";

globalThis.APPID = "dev";
globalThis.CDN = "dev";
globalThis.SERVER = "dev";

globalThis.GAME_NAME = "dev";
globalThis.GAME_ID = "dev";
globalThis.GAME_VERSION = "dev";

globalThis.COMMIT_ID = "dev";
globalThis.CONFIG_COMMIT_ID = "dev";
globalThis.RESOURCES_COMMIT_ID = "dev";

globalThis.DOWNLOAD_URL = "dev";
globalThis.VERSION_POSTFIX = "";
globalThis.CDNS = [];


// 一个什么也不做的函数。
function noop() {}

globalThis.cc = globalThis.cc || {};

// Cocos bundle 在注册模块时会调用 cc._RF.push/pop。
// 它们主要用于编辑器脚本登记，不参与实际伤害计算。
globalThis.cc = {
  _RF: {
    push: noop,
    pop: noop,
  },
};

globalThis.__extends = function (child, parent) {
  if (typeof parent !== "function" && parent !== null) {
    throw new TypeError(
      "Class extends value " + String(parent) +
      " is not a constructor or null"
    );
  }

  Object.setPrototypeOf(child, parent);

  function TemporaryConstructor() {
    this.constructor = child;
  }

  if (parent === null) {
    child.prototype = Object.create(null);
  } else {
    TemporaryConstructor.prototype = parent.prototype;
    child.prototype = new TemporaryConstructor();
  }
};

/*
 * Cocos decorators.
 *
 * 这些 decorator 在原游戏中主要负责把类和属性登记到 Cocos 编辑器。
 * headless runner 不需要编辑器元数据，因此保留被装饰的类/属性即可。
 */

function identityClassDecorator(targetOrName) {
  /*
   * 支持两种用法：
   *
   *   @ccclass
   *   @ccclass("ClassName")
   *
   * 编译后的 JavaScript 也会同时出现这两种调用方式。
   */

  if (typeof targetOrName === "function") {
    // @ccclass：直接接收到目标类。
    return targetOrName;
  }

  // @ccclass("ClassName")：先接收到名字，再返回装饰器。
  return function classDecorator(target) {
    return target;
  };
}

function noOpPropertyDecorator(...args) {
  /*
   * 支持：
   *
   *   @property
   *   @property()
   *   @property({ type: ... })
   *
   * 如果参数看起来像直接装饰属性，则什么都不做；
   * 否则返回一个什么也不做的属性装饰器。
   */

  if (
    args.length >= 2 &&
    (
      typeof args[1] === "string" ||
      typeof args[1] === "symbol"
    )
  ) {
    return undefined;
  }

  return function propertyDecorator() {
    return undefined;
  };
}

function noOpClassDecoratorFactory() {
  return function classDecorator(target) {
    return target;
  };
}

globalThis.cc._decorator = {
  ccclass: identityClassDecorator,
  property: noOpPropertyDecorator,
  menu: noOpClassDecoratorFactory,
};

/*
 * Cocos Component 的最小 headless 实现。
 *
 * 原 bundle 中很多 UI 类会写：
 *
 *   class Xxx extends cc.Component
 *
 * 即使 runner 不创建这些 UI 实例，类定义阶段也要求 cc.Component
 * 必须是一个有效的构造函数。
 *
 * 这里必须优先使用普通 function，而不是 ES6 class。
 */
function Component() {
  this.node = null;
  this.enabled = true;
  this.enabledInHierarchy = true;
}

/*
 * 以下方法是 Cocos Component 常用方法。
 * 当前阶段主要用于保证 UI 类在注册时拥有正确的方法形状。
 */
Component.prototype.getComponent =
  function getComponent() {
    return null;
  };

Component.prototype.getComponents =
  function getComponents() {
    return [];
  };

Component.prototype.getComponentInChildren =
  function getComponentInChildren() {
    return null;
  };

Component.prototype.getComponentsInChildren =
  function getComponentsInChildren() {
    return [];
  };

Component.prototype.addComponent =
  function addComponent() {
    return null;
  };

Component.prototype.schedule =
  function schedule() {
    return undefined;
  };

Component.prototype.scheduleOnce =
  function scheduleOnce() {
    return undefined;
  };

Component.prototype.unschedule =
  function unschedule() {
    return undefined;
  };

Component.prototype.unscheduleAllCallbacks =
  function unscheduleAllCallbacks() {
    return undefined;
  };

globalThis.cc.Component = Component;

function Sprite() {}

Sprite.prototype.getMaterial =
  function getMaterial() {
    return null;
  };

globalThis.cc.Sprite = Sprite;

/*
 * Cocos 平台信息 shim。
 *
 * runner 不伪装成微信、抖音、浏览器、iOS 或原生 App，
 * 避免触发与战斗无关的平台补丁。
 */

const HEADLESS_PLATFORM = "HEADLESS_NODE";
const HEADLESS_OS = "HEADLESS_OS";

globalThis.cc.sys = {
  /*
   * 当前真实运行环境。
   */
  platform: HEADLESS_PLATFORM,
  os: HEADLESS_OS,

  /*
   * Cocos 平台常量。
   *
   * 数值只需要彼此不同，并且不能等于当前 platform。
   */
  WECHAT_GAME: "WECHAT_GAME",
  BYTEDANCE_GAME: "BYTEDANCE_GAME",
  BYTEDANCE_GAME_SUB: "BYTEDANCE_GAME_SUB",
  BYTEDANCE_MINI_GAME: "BYTEDANCE_MINI_GAME",
  DESKTOP_BROWSER: "DESKTOP_BROWSER",
  MOBILE_BROWSER: "MOBILE_BROWSER",

  /*
   * 新版代码有时通过 cc.sys.Platform.xxx 访问平台常量。
   */
  Platform: {
    WECHAT_GAME: "WECHAT_GAME",
    BYTEDANCE_GAME: "BYTEDANCE_GAME",
    BYTEDANCE_GAME_SUB: "BYTEDANCE_GAME_SUB",
    BYTEDANCE_MINI_GAME:
      "BYTEDANCE_MINI_GAME",
    DESKTOP_BROWSER: "DESKTOP_BROWSER",
    MOBILE_BROWSER: "MOBILE_BROWSER",
  },

  /*
   * 操作系统常量。
   *
   * 当前 os 使用 HEADLESS_OS，因此以下比较全部为 false。
   */
  OS_IOS: "iOS",
  OS_OSX: "OS X",
  OS_ANDROID: "Android",

  /*
   * 明确声明不是浏览器、移动设备和原生客户端。
   */
  isBrowser: false,
  isMobile: false,
  isNative: false,

  /*
   * 默认语言。
   * 主要用于主 bundle 初始化，不参与战斗伤害计算。
   */
  language: "zh",
  languageCode: "zh-CN",

  /*
   * 时间函数。
   */
  now() {
    return Date.now();
  },

  /*
   * WebGL 能力查询。
   *
   * headless runner 没有 WebGL；返回 null/false。
   */
  glExtension() {
    return null;
  },

  getMaxJointMatrixSize() {
    return 0;
  },

  /*
   * 网络状态。
   *
   * 不要返回 NONE，因为某些初始化代码在离线状态下
   * 可能尝试执行特殊重试逻辑。
   */
  NetworkType: {
    NONE: 0,
    LAN: 1,
    WWAN: 2,
  },

  getNetworkType() {
    return 1;
  },
};

/*
 * 内存版 localStorage。
 *
 * runner 进程退出后数据会消失，这是期望行为；
 * 战斗计算不需要保存玩家登录状态或 UI 设置。
 */

const localStorageData = new Map();

globalThis.cc.sys.localStorage = {
  getItem(key) {
    const normalizedKey = String(key);

    if (!localStorageData.has(normalizedKey)) {
      return null;
    }

    return localStorageData.get(normalizedKey);
  },

  setItem(key, value) {
    localStorageData.set(
      String(key),
      String(value)
    );
  },

  removeItem(key) {
    localStorageData.delete(String(key));
  },

  clear() {
    localStorageData.clear();
  },

  key(index) {
    const keys = Array.from(
      localStorageData.keys()
    );

    return keys[index] ?? null;
  },

  get length() {
    return localStorageData.size;
  },
};

/*
 * 最小 cc.game 事件系统。
 *
 * 这里不立即执行 EVENT_ENGINE_INITED 回调，因为它用于修补
 * MeshBuffer 等渲染行为，headless 战斗不需要这些补丁。
 */

globalThis.cc.game = {
  EVENT_ENGINE_INITED: "engine-inited",

  on(eventName, callback, target) {
    /*
     * 保存或忽略渲染初始化回调。
     *
     * 当前阶段选择忽略，不调用 callback。
     */
    return undefined;
  },

  once(eventName, callback, target) {
    return undefined;
  },

  off(eventName, callback, target) {
    return undefined;
  },

  emit(eventName, ...args) {
    return undefined;
  },
};

/*
 * Cocos logging。
 */
globalThis.cc.warn = (...args) => {
  console.error("[cc.warn]", ...args);
};

