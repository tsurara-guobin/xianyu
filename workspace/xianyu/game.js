require("adapter-min.js"), __globalAdapter.init(), require("cocos/cocos2d-js-min.js"), 
__globalAdapter.adaptEngine(), require("./ccRequire"), require("./src/settings"), 
require("./main"), require("./game-defines.js"), cc.view._maxPixelRatio = 4, cc.sys.platform !== cc.sys.WECHAT_GAME_SUB && (cc.macro.CLEANUP_IMAGE_CACHE = !0);

var e = require("./hortor/sdk.min.js");

window.__HORTOR_SDK__ = e, window.HSDK = e, function() {
    window.boot();
    var r = 0, i = null;
    (i = function() {
        e.init({
            env: "Prod",
            gameId: "xyzw_mix",
            gameVersion: "2.42.2-d92211097e8063c3-wx",
            getUserInfoBtn: {
                type: "image",
                image: "https://caveman-resource.hortorgames.com/resource/btn_enter.png",
                style: {
                    width: 200,
                    height: 70,
                    top: 200,
                    left: 80
                }
            },
            shareData: {
                title: "做咸鱼也要做最咸的那一条！",
                query: "key=val",
                imageUrl: "https://wxmini-resource.hortorgames.com/background-image/20211015-150906-1634285002.png"
            },
            appId: "wx0840558555a454ed",
            wallKey: "DAACudONS8wAVjRn",
            useShareAdapter: !0,
            stdAutoUpload: !0,
            tgaAutoUpload: !0,
            shareSuccessDiff: 2e3,
            openGetShareTheme: !0,
            openShareTimeline: !0,
            logReportFrequency: 0,
            wxAppId: "wx0840558555a454ed",
            wxAdSourceId: Number("1207657291"),
            wxAdSecretKey: "b84b0afce7e836bb1d2538bd1b44c44b"
        }).then(function(e) {
            console.info("SDK init success.", JSON.stringify(e)), window._hortor_callOnLoad(!1, !0);
        }).catch(function(e) {
            console.error("SDK init error", JSON.stringify(e)), r++ < 60 && setTimeout(i, 1e3);
        });
    })();
}();