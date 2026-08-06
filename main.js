window._hortor_sceneok = !1, window._hortor_sdkok = !1, window._hortor_callOnLoad = function(e, n) {
    if (e && (window._hortor_sceneok = e), n && (window._hortor_sdkok = n), window._hortor_sceneok && window._hortor_sdkok) {
        var o = window._hortor_sceneok;
        if (o) {
            var r = o._children;
            if (r && r[0]) {
                var a = r[0].getComponent("Launcher");
                a && a.onLoadFunc();
            }
        }
    }
}, window.boot = function() {
    function e(e) {
        if (e) return console.error(e.message, e.stack);
        ++d === u.length + 1 && cc.assetManager.loadBundle(n.hasStartSceneBundle ? i : s, function(e) {
            e || cc.game.run(a, o);
        });
    }
    var n = window._CCSettings;
    window._CCSettings = void 0;
    var o = function() {
        cc.view.enableRetina(!0), cc.view.resizeWithBrowserSize(!0);
        n.launchScene;
        !function e() {
            var o = n.launchScene;
            cc.director.loadScene(o, function(n, o) {
                n ? (console.error("Failed to load scene: " + n), setTimeout(e, 1e3)) : window._hortor_callOnLoad(o, !1);
            });
        }();
    }, r = cc.sys.platform === cc.sys.WECHAT_GAME_SUB, a = {
        id: "GameCanvas",
        debugMode: n.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: !r && n.debug,
        frameRate: 60,
        groupList: n.groupList,
        collisionMatrix: n.collisionMatrix
    };
    cc.assetManager.init({
        bundleVers: n.bundleVers,
        subpackages: n.subpackages,
        remoteBundles: n.remoteBundles,
        server: n.server,
        subContextRoot: n.subContextRoot
    });
    var t = cc.AssetManager.BuiltinBundleName.RESOURCES, c = cc.AssetManager.BuiltinBundleName.INTERNAL, s = cc.AssetManager.BuiltinBundleName.MAIN, i = cc.AssetManager.BuiltinBundleName.START_SCENE, u = [ c ];
    n.hasResourcesBundle && u.push(t), n.hasStartSceneBundle && u.push(s);
    var d = 0;
    cc.assetManager.loadScript(n.jsList.map(function(e) {
        return "src/" + e;
    }), e);
    for (var l = 0; l < u.length; l++) cc.assetManager.loadBundle(u[l], e);
};