window.__require = function e(i, o, t) {
    function u(n, s, a) {
        if (!o[n]) {
            if (!i[n]) {
                var c = n;
                if (n.includes("./") && (c = (c = n.split("/"))[c.length - 1]), !i[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!s && l) return l(c, !0);
                    if (r) return r(c, !0);
                    throw new Error("Cannot find module '" + n + "'");
                }
                n = c;
            }
            var d = o[n] = {
                exports: {}
            };
            i[n][0].call(d.exports, function(e) {
                return u(i[n][1][e] || e, void 0, e.includes("./") ? void 0 : e);
            }, d, d.exports, e, i, o, t);
        }
        return a && o[n] && !o[a] && (o[a] = o[n]), o[n].exports;
    }
    for (var r = "function" == typeof __require && __require, n = 0; n < t.length; n++) u(t[n]);
    return u;
}({
    TestModule: [ function(e, i, o) {
        cc._RF.push(i, "285b6OCdM5Mlp0Qoc/CbvJn", "TestModule"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.TestModule = void 0;
        var t = e("../../../launcher/config/Configs"), u = e("../../../game/scripts/modules/RemoteModuleLoader"), r = e("../../../game/scripts/modules/BaseModule"), n = e("../../../game/scripts/ui/loading/NormalSwitchLoading"), s = e("../../../game/scripts/ui/index-ui"), a = e("../ui/TestUi"), c = function(e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(i, e), i.prototype.goto = function() {
                return __awaiter(this, void 0, void 0, function() {
                    return __generator(this, function(e) {
                        switch (e.label) {
                          case 0:
                            return [ 4, s.SHOW_PROXY_AFTER_LOADING(a.TestUi, n.NormalSwitchLoading) ];

                          case 1:
                            return e.sent(), [ 2 ];
                        }
                    });
                });
            }, i.prototype.test = function() {
                console.log("TestModule test");
            }, __decorate([ u.remoteModule(t.ModuleType.TEST_REMOTE_MODULE) ], i);
        }(r.BaseModule);
        o.TestModule = c, cc._RF.pop();
    }, {
        "../../../game/scripts/modules/BaseModule": void 0,
        "../../../game/scripts/modules/RemoteModuleLoader": void 0,
        "../../../game/scripts/ui/index-ui": void 0,
        "../../../game/scripts/ui/loading/NormalSwitchLoading": void 0,
        "../../../launcher/config/Configs": void 0,
        "../ui/TestUi": "TestUi"
    } ],
    TestUi: [ function(e, i, o) {
        cc._RF.push(i, "80389gXeRJKg7SO3Q5AKQD+", "TestUi"), Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.TestUi = void 0;
        var t = e("../../../launcher/config/Configs"), u = __importDefault(e("../../../game/scripts/fairygui/ui_dungeon/UI_DungeonPanel")), r = e("../../../game/scripts/modules/ModuleManager"), n = e("../../../game/scripts/ui/common/UIDialog"), s = e("../../../game/scripts/ui/features/UIFullScreen"), a = e("../../../game/scripts/ui/index-ui"), c = e("../../../game/scripts/ui/types-ui"), l = function(e) {
            function i() {
                return null !== e && e.apply(this, arguments) || this;
            }
            return __extends(i, e), i.prototype.onShow = function() {
                var e = this;
                this.ui.m_btnSelfBack.onClick(function() {
                    r.GET_MODULE(t.ModuleType.TEST_REMOTE_MODULE).test(), e.close();
                });
            }, __decorate([ a.ui({
                ui: u.default,
                autoDisposeV2: !0,
                layer: c.UILayer.Dialog,
                features: [ a.UIController, s.UIFullScreen ]
            }) ], i);
        }(n.UIDialog);
        o.TestUi = l, cc._RF.pop();
    }, {
        "../../../game/scripts/fairygui/ui_dungeon/UI_DungeonPanel": void 0,
        "../../../game/scripts/modules/ModuleManager": void 0,
        "../../../game/scripts/ui/common/UIDialog": void 0,
        "../../../game/scripts/ui/features/UIFullScreen": void 0,
        "../../../game/scripts/ui/index-ui": void 0,
        "../../../game/scripts/ui/types-ui": void 0,
        "../../../launcher/config/Configs": void 0
    } ]
}, {}, [ "TestModule", "TestUi" ]);