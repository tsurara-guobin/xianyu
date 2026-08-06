var e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e;
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};

!function e(t, n, o) {
    function r(a, c) {
        if (!n[a]) {
            if (!t[a]) {
                var u = "function" == typeof require && require;
                if (!c && u) return u(a, !0);
                if (i) return i(a, !0);
                throw (c = new Error("Cannot find module '" + a + "'")).code = "MODULE_NOT_FOUND", 
                c;
            }
            u = n[a] = {
                exports: {}
            }, t[a][0].call(u.exports, function(e) {
                return r(t[a][1][e] || e);
            }, u, u.exports, e, t, n, o);
        }
        return n[a].exports;
    }
    for (var i = "function" == typeof require && require, a = 0; a < o.length; a++) r(o[a]);
    return r;
}({
    1: [ function(e, t, n) {}, {} ],
    2: [ function(e, t, n) {
        var o = window.fsUtils, r = o.getUserDataPath, i = o.readJsonSync, a = o.makeDirSync, c = o.writeFileSync, u = o.copyFile, s = o.downloadFile, l = o.writeFile, d = o.deleteFile, f = o.rmdirSync, p = o.unzip, h = o.isOutOfStorage, m = !1, g = null, y = !1, v = [], b = [], w = !1, _ = 0, E = /^https?:\/\/.*/;
        cc.assetManager.cacheManager = t.exports = {
            cacheDir: "gamecaches",
            cachedFileName: "cacheList.json",
            cacheEnabled: !0,
            autoClear: !0,
            cacheInterval: 500,
            deleteInterval: 500,
            writeFileInterval: 2e3,
            outOfStorage: !1,
            tempFiles: null,
            cachedFiles: null,
            cacheQueue: {},
            version: "1.0",
            getCache: function(e) {
                return this.cachedFiles.has(e) ? this.cachedFiles.get(e).url : "";
            },
            getTemp: function(e) {
                return this.tempFiles.has(e) ? this.tempFiles.get(e) : "";
            },
            init: function() {
                this.cacheDir = r() + "/" + this.cacheDir;
                var e = this.cacheDir + "/" + this.cachedFileName, t = i(e);
                t instanceof Error || !t.version ? (t instanceof Error || f(this.cacheDir, !0), 
                this.cachedFiles = new cc.AssetManager.Cache(), a(this.cacheDir, !0), c(e, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8")) : this.cachedFiles = new cc.AssetManager.Cache(t.files), this.tempFiles = new cc.AssetManager.Cache();
            },
            updateLastTime: function(e) {
                this.cachedFiles.has(e) && (this.cachedFiles.get(e).lastTime = Date.now());
            },
            _write: function() {
                y = !(g = null), l(this.cacheDir + "/" + this.cachedFileName, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8", function() {
                    y = !1;
                    for (var e = 0, t = b.length; e < t; e++) b[e]();
                    b.length = 0, b.push.apply(b, v), v.length = 0;
                });
            },
            writeCacheFile: function(e) {
                g || (g = setTimeout(this._write.bind(this), this.writeFileInterval), !0 !== y) ? e && b.push(e) : e && v.push(e);
            },
            _cache: function() {
                var e, t = this;
                for (e in this.cacheQueue) {
                    var n = function(n) {
                        if (m = !1, n) {
                            if (h(n.message)) return t.outOfStorage = !0, void (t.autoClear && t.clearLRU());
                        } else t.cachedFiles.add(e, {
                            bundle: a,
                            url: l,
                            lastTime: c
                        }), delete t.cacheQueue[e], t.writeCacheFile();
                        cc.js.isEmptyObject(t.cacheQueue) || (m = !0, setTimeout(t._cache.bind(t), t.cacheInterval));
                    }, o = this.cacheQueue[e], r = o.srcUrl, i = o.isCopy, a = o.cacheBundleRoot, c = Date.now().toString(), l = "", l = (a ? "".concat(this.cacheDir, "/").concat(a, "/") : "".concat(this.cacheDir, "/")).concat(c).concat(_++).concat(cc.path.extname(e));
                    return void (i ? u(r, l, n) : s(r, l, null, n));
                }
                m = !1;
            },
            cacheFile: function(e, t, n, o, r) {
                !(n = void 0 !== n ? n : this.cacheEnabled) || this.cacheQueue[e] || this.cachedFiles.has(e) || (this.cacheQueue[e] = {
                    srcUrl: t,
                    cacheBundleRoot: o,
                    isCopy: r
                }, m) || (m = !0, this.outOfStorage ? m = !1 : setTimeout(this._cache.bind(this), this.cacheInterval));
            },
            clearCache: function() {
                var e = this, t = (f(this.cacheDir, !0), this.cachedFiles = new cc.AssetManager.Cache(), 
                a(this.cacheDir, !0), this.cacheDir + "/" + this.cachedFileName);
                this.outOfStorage = !1, c(t, JSON.stringify({
                    files: this.cachedFiles._map,
                    version: this.version
                }), "utf8"), cc.assetManager.bundles.forEach(function(t) {
                    E.test(t.base) && e.makeBundleFolder(t.name);
                });
            },
            clearLRU: function() {
                if (!w) {
                    w = !0;
                    var e = [], t = this;
                    if (this.cachedFiles.forEach(function(n, o) {
                        "internal" === n.bundle || t._isZipFile(o) && cc.assetManager.bundles.find(function(e) {
                            return -1 !== e.base.indexOf(n.url);
                        }) || e.push({
                            originUrl: o,
                            url: n.url,
                            lastTime: n.lastTime
                        });
                    }), e.sort(function(e, t) {
                        return e.lastTime - t.lastTime;
                    }), e.length = Math.floor(this.cachedFiles.count / 3), 0 !== e.length) {
                        for (var n = 0, o = e.length; n < o; n++) this.cachedFiles.remove(e[n].originUrl);
                        this.writeCacheFile(function() {
                            setTimeout(function n() {
                                var o = e.pop();
                                t._isZipFile(o.originUrl) ? (f(o.url, !0), t._deleteFileCB()) : d(o.url, t._deleteFileCB.bind(t)), 
                                0 < e.length ? setTimeout(n, t.deleteInterval) : w = !1;
                            }, t.deleteInterval);
                        });
                    }
                }
            },
            removeCache: function(e) {
                var t, n;
                this.cachedFiles.has(e) && (n = (t = this).cachedFiles.remove(e).url, this.writeCacheFile(function() {
                    t._isZipFile(e) ? (f(n, !0), t._deleteFileCB()) : d(n, t._deleteFileCB.bind(t));
                }));
            },
            _deleteFileCB: function(e) {
                e || (this.outOfStorage = !1);
            },
            makeBundleFolder: function(e) {
                a(this.cacheDir + "/" + e, !0);
            },
            unzipAndCacheBundle: function(e, t, n, o) {
                var r = Date.now().toString(), i = "".concat(this.cacheDir, "/").concat(n, "/").concat(r).concat(_++), c = this;
                a(i, !0), p(t, i, function(t) {
                    t ? (f(i, !0), h(t.message) && (c.outOfStorage = !0, c.autoClear) && c.clearLRU(), 
                    o && o(t)) : (c.cachedFiles.add(e, {
                        bundle: n,
                        url: i,
                        lastTime: r
                    }), c.writeCacheFile(), o && o(null, i));
                });
            },
            _isZipFile: function(e) {
                return ".zip" === e.slice(-4);
            }
        };
    }, {} ],
    3: [ function(e, t, n) {
        function o(e, t, n) {
            "function" == typeof t && (n = t, t = null), S.test(e) ? n && n(new Error("Can not load remote scripts")) : (__cocos_require__(e), 
            n && n(null));
        }
        function r(e, t, n) {
            "function" == typeof t && (n = t, t = null), (t = document.createElement("audio")).src = e, 
            n && n(null, t);
        }
        function i(e, t, n, o, r) {
            var i = R(e, n);
            i.inLocal ? t(i.url, n, r) : i.inCache ? (g.updateLastTime(e), t(i.url, n, function(t, n) {
                t && g.removeCache(e), r(t, n);
            })) : v(e, null, n.header, o, function(o, i) {
                o ? r(o, null) : t(i, n, function(t, o) {
                    t || (g.tempFiles.add(e, i), g.cacheFile(e, i, n.cacheEnabled, n.__cacheBundleRoot__, !0)), 
                    r(t, o);
                });
            });
        }
        function a(e, t, n) {
            w(e, n);
        }
        function c(e, t, n) {
            b(e, n);
        }
        function u(e, t, n) {
            _(e, n);
        }
        function s(e, t, n) {
            n(null, e);
        }
        function l(e, t, n) {
            i(e, s, t, t.onFileProgress, n);
        }
        function d(e, t, n) {
            w(e, function(e, o) {
                if (e) return n(e);
                D(o, t, n);
            });
        }
        function f(e, t, n) {
            w(e, function(e, o) {
                if (e) return n(e);
                P(o, t, n);
            });
        }
        var p, h, m, g = e("../cache-manager"), y = (e = window.fsUtils).fs, v = e.downloadFile, b = e.readText, w = e.readArrayBuffer, _ = e.readJson, E = e.loadSubpackage, x = e.getUserDataPath, S = /^https?:\/\/.*/, e = cc.assetManager.downloader, N = cc.assetManager.parser, T = cc.assetManager.presets, O = __globalAdapter.isSubContext, M = (e.maxConcurrency = 8, 
        e.maxRequestsPerFrame = 64, T.scene.maxConcurrency = 10, T.scene.maxRequestsPerFrame = 64, 
        {}), C = {}, A = O ? function(e, t, n) {
            e = (e = R(e, t).url).slice(p.length + 1), t = __cocos_require__(cc.path.changeExtname(e, ".js")), 
            n && n(null, t);
        } : function(e, t, n) {
            i(e, u, t, t.onFileProgress, n);
        }, T = O ? function(e, t, n) {
            n(null, "Arial");
        } : function(e, t, n) {
            n(null, __globalAdapter.loadFont(e) || "Arial");
        }, D = N.parsePVRTex, P = N.parsePKMTex, I = O ? function(e, t, n) {
            n(null, e = R(e, t).url);
        } : l, R = (e.downloadDomAudio = r, e.downloadScript = o, N.parsePVRTex = d, N.parsePKMTex = f, 
        e.register({
            ".js": o,
            ".mp3": l,
            ".ogg": l,
            ".wav": l,
            ".m4a": l,
            ".png": I,
            ".jpg": I,
            ".bmp": I,
            ".jpeg": I,
            ".gif": I,
            ".ico": I,
            ".tiff": I,
            ".image": I,
            ".webp": I,
            ".pvr": l,
            ".pkm": l,
            ".font": l,
            ".eot": l,
            ".ttf": l,
            ".woff": l,
            ".svg": l,
            ".ttc": l,
            ".txt": l,
            ".xml": l,
            ".vsh": l,
            ".fsh": l,
            ".atlas": l,
            ".tmx": l,
            ".tsx": l,
            ".plist": l,
            ".fnt": l,
            ".json": A,
            ".ExportJson": l,
            ".binary": l,
            ".bin": l,
            ".dbbin": l,
            ".skel": l,
            ".mp4": l,
            ".avi": l,
            ".mov": l,
            ".mpg": l,
            ".mpeg": l,
            ".rm": l,
            ".rmvb": l,
            bundle: function(e, t, n) {
                function o(e, o) {
                    var r, a, c;
                    e ? n && n(e) : o.isZip ? (e = o.zipVersion, e = "".concat(i, "/res.").concat(e ? e + "." : "", "zip"), 
                    r = e, a = t, c = function(e, t) {
                        e ? n && n(e) : (o.base = t + "/res/", (e = cc.sys).platform === e.ALIPAY_GAME && e.os === e.OS_ANDROID && y.accessSync({
                            path: e = t + "res/"
                        }) && (o.base = e), n && n(null, o));
                    }, (e = g.cachedFiles.get(r)) ? (g.updateLastTime(r), c(null, e.url)) : S.test(r) ? v(r, null, a.header, a.onFileProgress, function(e, t) {
                        e ? c(e) : g.unzipAndCacheBundle(r, t, a.__cacheBundleRoot__, c);
                    }) : g.unzipAndCacheBundle(r, r, a.__cacheBundleRoot__, c)) : (o.base = i + "/", 
                    n && n(null, o));
                }
                var r, i, a, c = cc.path.basename(e), u = t.version || cc.assetManager.downloader.bundleVers[c];
                M[c] ? (a = "subpackages/".concat(c, "/config.").concat(u ? u + "." : "", "json"), 
                E(c, t.onFileProgress, function(e) {
                    e ? n(e, null) : A(a, t, function(e, t) {
                        t && (t.base = "subpackages/".concat(c, "/")), n(e, t);
                    });
                })) : (S.test(e) || !O && e.startsWith(x()) ? (i = e, r = "src/scripts/".concat(c, "/index.js"), 
                g.makeBundleFolder(c)) : C[c] ? (i = "".concat(h, "remote/").concat(c), r = "src/scripts/".concat(c, "/index.js"), 
                g.makeBundleFolder(c)) : (i = "assets/".concat(c), r = "assets/".concat(c, "/index.js")), 
                __cocos_require__(r), t.__cacheBundleRoot__ = c, a = "".concat(i, "/config.").concat(u ? u + "." : "", "json"), 
                "config" !== c && cc.sys._bundleAll && cc.sys._bundleAll[c] ? (e = cc.sys._bundleAll[c], 
                function(e, t) {
                    o(null, t), delete cc.sys._bundleAll[c];
                }(0, e)) : A(a, t, o));
            },
            default: function(e, t, n) {
                i(e, c, t, t.onFileProgress, n);
            }
        }), N.register({
            ".png": e.downloadDomImage,
            ".jpg": e.downloadDomImage,
            ".bmp": e.downloadDomImage,
            ".jpeg": e.downloadDomImage,
            ".gif": e.downloadDomImage,
            ".ico": e.downloadDomImage,
            ".tiff": e.downloadDomImage,
            ".image": e.downloadDomImage,
            ".webp": e.downloadDomImage,
            ".pvr": d,
            ".pkm": f,
            ".font": T,
            ".eot": T,
            ".ttf": T,
            ".woff": T,
            ".svg": T,
            ".ttc": T,
            ".mp3": r,
            ".ogg": r,
            ".wav": r,
            ".m4a": r,
            ".txt": c,
            ".xml": c,
            ".vsh": c,
            ".fsh": c,
            ".atlas": c,
            ".tmx": c,
            ".tsx": c,
            ".fnt": c,
            ".plist": function(e, t, n) {
                b(e, function(e, t) {
                    var o = null;
                    e || (o = cc.plistParser.parse(t)) || (e = new Error("parse failed")), n && n(e, o);
                });
            },
            ".binary": a,
            ".bin": a,
            ".dbbin": a,
            ".skel": a,
            ".ExportJson": u
        }), O ? function(e, t) {
            return {
                url: e = S.test(e) ? e : p + "/" + e
            };
        } : function(e, t) {
            var n = !1, o = !1;
            return !e.startsWith(x()) && S.test(e) ? t.reload || ((t = g.cachedFiles.get(e)) ? (o = !0, 
            e = t.url) : (t = g.tempFiles.get(e)) && (n = !0, e = t)) : n = !0, {
                url: e,
                inLocal: n,
                inCache: o
            };
        });
        O ? (m = cc.assetManager.init, cc.assetManager.init = function(e) {
            m.call(cc.assetManager, e), p = e.subContextRoot || "";
        }) : (cc.assetManager.transformPipeline.append(function(e) {
            for (var t = e.output = e.input, n = 0, o = t.length; n < o; n++) {
                var r = t[n], i = r.options;
                r.config ? i.__cacheBundleRoot__ = r.config.name : "bundle" !== r.ext && (i.cacheEnabled = void 0 !== i.cacheEnabled && i.cacheEnabled);
            }
        }), m = cc.assetManager.init, cc.assetManager.init = function(e) {
            m.call(cc.assetManager, e), e.subpackages && e.subpackages.forEach(function(e) {
                return M[e] = "subpackages/" + e;
            }), e.remoteBundles && e.remoteBundles.forEach(function(e) {
                return C[e] = !0;
            }), (h = e.server || "") && !h.endsWith("/") && (h += "/"), g.init();
        });
    }, {
        "../cache-manager": 2
    } ],
    4: [ function(e, t, n) {
        var o, r = cc._Audio;
        r && (o = r.prototype.getDuration, Object.assign(r.prototype, {
            _createElement: function() {
                var e = this._src._nativeAsset;
                this._element || (this._element = __globalAdapter.createInnerAudioContext()), this._element.src = e.src;
            },
            destroy: function() {
                this._element && (this._element.destroy(), this._element = null);
            },
            setCurrentTime: function(e) {
                var t = this;
                this._src && this._src._ensureLoaded(function() {
                    t._element.seek(e);
                });
            },
            stop: function() {
                var e = this;
                this._src && this._src._ensureLoaded(function() {
                    e._element.seek(0), e._element.stop(), e._unbindEnded(), e.emit("stop"), e._state = r.State.STOPPED;
                });
            },
            _bindEnded: function() {
                var e = this._element;
                e && e.onEnded && !this._onended._binded && (this._onended._binded = !0, e.onEnded(this._onended));
            },
            _unbindEnded: function() {
                var e = this._element;
                e && e.offEnded && this._onended._binded && (this._onended._binded = !1, e.offEnded) && e.offEnded(this._onended);
            },
            getDuration: function() {
                return o.call(this) || (this._element ? this._element.duration : 0);
            },
            _touchToPlay: function() {},
            _forceUpdatingState: function() {}
        }));
    }, {} ],
    5: [ function(e, t, n) {
        cc && cc.audioEngine && (cc.audioEngine._maxAudioInstance = 10);
    }, {} ],
    6: [ function(e, t, n) {
        var o = cc.internal.inputManager, r = window.__globalAdapter;
        Object.assign(o, {
            setAccelerometerEnabled: function(e) {
                var t = cc.director.getScheduler();
                t.enableForTarget(this), e ? (this._registerAccelerometerEvent(), t.scheduleUpdate(this)) : (this._unregisterAccelerometerEvent(), 
                t.unscheduleUpdate(this));
            },
            _registerAccelerometerEvent: function() {
                this._accelCurTime = 0;
                var e = this;
                this._acceleration = new cc.Acceleration(), r.startAccelerometer(function(t) {
                    e._acceleration.x = t.x, e._acceleration.y = t.y, e._acceleration.z = t.y;
                });
            },
            _unregisterAccelerometerEvent: function() {
                this._accelCurTime = 0, r.stopAccelerometer();
            }
        });
    }, {} ],
    7: [ function(e, t, n) {
        function o() {
            u.call(this), this._eventListeners = {
                onKeyboardInput: null,
                onKeyboardConfirm: null,
                onKeyboardComplete: null
            };
        }
        var r, i, a, c, u;
        cc && cc.EditBox && (r = cc.EditBox, i = r.KeyboardReturnType, c = a = null, u = r._ImplClass, 
        cc.js.extend(o, u), r._ImplClass = o, Object.assign(o.prototype, {
            init: function(e) {
                e ? this._delegate = e : cc.error("EditBox init failed");
            },
            beginEditing: function() {
                var e = this;
                this._editing || this._ensureKeyboardHide(function() {
                    var t = e._delegate;
                    e._showKeyboard(), e._registerKeyboardEvent(), e._editing = !0, c = e, t.editBoxEditingDidBegan();
                });
            },
            endEditing: function() {
                this._hideKeyboard();
                var e = this._eventListeners;
                e.onKeyboardComplete && e.onKeyboardComplete();
            },
            _registerKeyboardEvent: function() {
                var e = this, t = this._delegate, n = this._eventListeners;
                n.onKeyboardInput = function(e) {
                    t._string !== e.value && t.editBoxTextChanged(e.value);
                }, n.onKeyboardConfirm = function(n) {
                    t.editBoxEditingReturn();
                    var o = e._eventListeners;
                    o.onKeyboardComplete && o.onKeyboardComplete();
                }, n.onKeyboardComplete = function() {
                    e._editing = !1, c = null, e._unregisterKeyboardEvent(), t.editBoxEditingDidEnded();
                }, __globalAdapter.onKeyboardInput(n.onKeyboardInput), __globalAdapter.onKeyboardConfirm(n.onKeyboardConfirm), 
                __globalAdapter.onKeyboardComplete(n.onKeyboardComplete);
            },
            _unregisterKeyboardEvent: function() {
                var e = this._eventListeners;
                e.onKeyboardInput && (__globalAdapter.offKeyboardInput(e.onKeyboardInput), e.onKeyboardInput = null), 
                e.onKeyboardConfirm && (__globalAdapter.offKeyboardConfirm(e.onKeyboardConfirm), 
                e.onKeyboardConfirm = null), e.onKeyboardComplete && (__globalAdapter.offKeyboardComplete(e.onKeyboardComplete), 
                e.onKeyboardComplete = null);
            },
            _otherEditing: function() {
                return !!c && c !== this && c._editing;
            },
            _ensureKeyboardHide: function(e) {
                var t = this._otherEditing();
                if (!t && !a) return e();
                a && clearTimeout(a), t && c.endEditing(), a = setTimeout(function() {
                    a = null, e();
                }, 600);
            },
            _showKeyboard: function() {
                var e = this._delegate, t = e.inputMode === r.InputMode.ANY, n = e.maxLength < 0 ? 65535 : e.maxLength;
                __globalAdapter.showKeyboard({
                    defaultValue: e._string,
                    maxLength: n,
                    multiple: t,
                    confirmHold: !1,
                    confirmType: function() {
                        switch (e.returnType) {
                          case i.DEFAULT:
                          case i.DONE:
                            return "done";

                          case i.SEND:
                            return "send";

                          case i.SEARCH:
                            return "search";

                          case i.GO:
                            return "go";

                          case i.NEXT:
                            return "next";
                        }
                        return "done";
                    }(),
                    success: function(e) {},
                    fail: function(e) {
                        cc.warn(e.errMsg);
                    }
                });
            },
            _hideKeyboard: function() {
                __globalAdapter.hideKeyboard({
                    success: function(e) {},
                    fail: function(e) {
                        cc.warn(e.errMsg);
                    }
                });
            }
        }));
    }, {} ],
    8: [ function(e, t, n) {
        var o = cc.internal.inputManager, r = cc.renderer, i = cc.game, a = cc.dynamicAtlasManager, c = i.run;
        Object.assign(i, {
            _banRunningMainLoop: __globalAdapter.isSubContext,
            _firstSceneLaunched: !1,
            run: function() {
                var e = this;
                cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function() {
                    e._firstSceneLaunched = !0;
                }), c.apply(this, arguments);
            },
            setFrameRate: function(e) {
                this.config.frameRate = e, __globalAdapter.setPreferredFramesPerSecond ? __globalAdapter.setPreferredFramesPerSecond(e) : (this._intervalId && window.cancelAnimFrame(this._intervalId), 
                this._intervalId = 0, this._paused = !0, this._setAnimFrame(), this._runMainLoop());
            },
            _runMainLoop: function() {
                var e, t, n, o, r, i;
                this._banRunningMainLoop || (n = (e = this).config, o = cc.director, r = !0, i = n.frameRate, 
                cc.debug.setDisplayStats(n.showFPS), t = function() {
                    e._paused || (e._intervalId = window.requestAnimFrame(t), 30 === i && !__globalAdapter.setPreferredFramesPerSecond && (r = !r)) || o.mainLoop();
                }, e._intervalId = window.requestAnimFrame(t), e._paused = !1);
            },
            _initRenderer: function() {
                var e, t;
                this._rendererInitialized || (this.frame = this.container = document.createElement("DIV"), 
                e = __globalAdapter.isSubContext ? window.sharedCanvas || __globalAdapter.getSharedCanvas() : canvas, 
                this.canvas = e, this._determineRenderType(), this.renderType === this.RENDER_TYPE_WEBGL && (t = {
                    stencil: !0,
                    antialias: cc.macro.ENABLE_WEBGL_ANTIALIAS,
                    alpha: cc.macro.ENABLE_TRANSPARENT_CANVAS,
                    preserveDrawingBuffer: !1
                }, r.initWebGL(e, t), this._renderContext = r.device._gl, !cc.macro.CLEANUP_IMAGE_CACHE) && a && (a.enabled = !0), 
                this._renderContext || (this.renderType = this.RENDER_TYPE_CANVAS, r.initCanvas(e), 
                this._renderContext = r.device._ctx), this._rendererInitialized = !0);
            },
            _initEvents: function() {
                this.config.registerSystemEvent && o.registerSystemEvent(this.canvas);
                var e = !1;
                __globalAdapter.onAudioInterruptionEnd && __globalAdapter.onAudioInterruptionEnd(function() {
                    cc.audioEngine && cc.audioEngine._restore();
                }), __globalAdapter.onAudioInterruptionBegin && __globalAdapter.onAudioInterruptionBegin(function() {
                    cc.audioEngine && cc.audioEngine._break();
                }), __globalAdapter.onShow && __globalAdapter.onShow(function(t) {
                    e && (e = !1, i.renderType === i.RENDER_TYPE_WEBGL && i._renderContext.finish(), 
                    i.emit(i.EVENT_SHOW, t));
                }), __globalAdapter.onHide && __globalAdapter.onHide(function() {
                    e || (e = !0, i.emit(i.EVENT_HIDE));
                }), this.on(i.EVENT_HIDE, function() {
                    i.pause();
                }), this.on(i.EVENT_SHOW, function() {
                    i.resume();
                });
            },
            end: function() {}
        });
    }, {} ],
    9: [ function(e, t, n) {
        var o = cc.internal.inputManager, r = {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
        o && Object.assign(o, {
            _updateCanvasBoundingRect: function() {},
            registerSystemEvent: function(e) {
                if (!this._isRegisterEvent) {
                    this._glView = cc.view;
                    var t, n = this, o = {
                        onTouchStart: this.handleTouchesBegin,
                        onTouchMove: this.handleTouchesMove,
                        onTouchEnd: this.handleTouchesEnd,
                        onTouchCancel: this.handleTouchesCancel
                    };
                    for (t in o) !function(e) {
                        var t = o[e];
                        __globalAdapter[e](function(e) {
                            e.changedTouches && t.call(n, n.getTouchesByEvent(e, r));
                        });
                    }(t);
                    this._isRegisterEvent = !0;
                }
            }
        });
    }, {} ],
    10: [ function(e, t, n) {
        Object.assign(cc.screen, {
            autoFullScreen: function(e, t) {}
        });
    }, {} ],
    11: [ function(e, t, n) {
        var o = cc.Texture2D;
        o && Object.assign(o.prototype, {
            initWithElement: function(e) {
                e && (this._image = e, this.handleLoadedTexture());
            }
        });
    }, {} ],
    12: [ function(e, t, n) {
        t.exports = function(e, t) {
            t = t || __globalAdapter.getSystemInfoSync(), e.isNative = !1, e.isBrowser = !1, 
            e.isMobile = !0, e.language = t.language.substr(0, 2), e.languageCode = t.language.toLowerCase();
            var n = t.system.toLowerCase(), o = ("android" === (o = (o = t.platform).toLowerCase()) ? e.os = e.OS_ANDROID : "ios" === o && (e.os = e.OS_IOS), 
            /[\d\.]+/.exec(n = "android p" === n ? "android p 9.0" : n)), o = (e.osVersion = o ? o[0] : n, 
            e.osMainVersion = parseInt(e.osVersion), e.browserType = null, e.browserVersion = null, 
            t.windowWidth), n = t.windowHeight, t = t.pixelRatio || 1, o = (e.windowPixelResolution = {
                width: t * o,
                height: t * n
            }, e.localStorage = window.localStorage, !__globalAdapter.isSubContext), t = !1;
            try {
                t = document.createElement("canvas").toDataURL("image/webp").startsWith("data:image/webp");
            } catch (e) {}
            e.capabilities = {
                canvas: !0,
                opengl: !!o,
                webp: t
            }, e.__audioSupport = {
                ONLY_ONE: !1,
                WEB_AUDIO: !1,
                DELAY_CREATE_CTX: !1,
                format: [ ".mp3" ]
            };
        };
    }, {} ],
    13: [ function(e, t, n) {
        t.exports = function(e) {
            e._setupContainer = function(e, t, n) {
                var o = e._devicePixelRatio = 1;
                e.isRetinaEnabled() && (o = e._devicePixelRatio = Math.min(e._maxPixelRatio, window.devicePixelRatio || 1)), 
                __globalAdapter.isSubContext || (n *= o, (e = cc.game.canvas).width === (t *= o) && e.height === n) || (e.width = t, 
                e.height = n);
            };
        };
    }, {} ],
    14: [ function(e, t, n) {
        t.exports = function(e) {
            Object.assign(e, {
                _adjustViewportMeta: function() {},
                setRealPixelResolution: function(e, t, n) {
                    this.setDesignResolutionSize(e, t, n);
                },
                enableAutoFullScreen: function(e) {
                    cc.warn("cc.view.enableAutoFullScreen() is not supported on minigame platform.");
                },
                isAutoFullScreenEnabled: function() {
                    return !1;
                },
                setCanvasSize: function() {
                    cc.warn("cc.view.setCanvasSize() is not supported on minigame platform.");
                },
                setFrameSize: function() {
                    cc.warn("frame size is readonly on minigame platform.");
                },
                _initFrameSize: function() {
                    var e, t = this._frameSize;
                    __globalAdapter.isSubContext ? (e = window.sharedCanvas || __globalAdapter.getSharedCanvas(), 
                    t.width = e.width, t.height = e.height) : (t.width = window.innerWidth, t.height = window.innerHeight);
                }
            });
        };
    }, {} ],
    15: [ function(e, t, n) {
        var o = window.__globalAdapter;
        Object.assign(o, {
            adaptSys: e("./BaseSystemInfo"),
            adaptView: e("./View"),
            adaptContainerStrategy: e("./ContainerStrategy")
        });
    }, {
        "./BaseSystemInfo": 12,
        "./ContainerStrategy": 13,
        "./View": 14
    } ],
    16: [ function(e, t, n) {
        e("./Audio"), e("./AudioEngine"), e("./DeviceMotionEvent"), e("./Editbox"), e("./Game"), 
        e("./InputManager"), e("./AssetManager"), e("./Screen"), e("./Texture2D"), e("./misc");
    }, {
        "./AssetManager": 3,
        "./Audio": 4,
        "./AudioEngine": 5,
        "./DeviceMotionEvent": 6,
        "./Editbox": 7,
        "./Game": 8,
        "./InputManager": 9,
        "./Screen": 10,
        "./Texture2D": 11,
        "./misc": 17
    } ],
    17: [ function(e, t, n) {
        cc.macro.DOWNLOAD_MAX_CONCURRENT = 10;
    }, {} ],
    18: [ function(e, t, n) {
        t.exports = {
            cloneMethod: function(e, t, n, o) {
                t[n] && (e[o = o || n] = t[n].bind(t));
            }
        };
    }, {} ],
    19: [ function(e, t, n) {
        function o(e) {
            this.options = e || {
                locator: {}
            };
        }
        function r() {
            this.cdata = !1;
        }
        function i(e, t) {
            t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber;
        }
        function a(e) {
            if (e) return "\n@" + (e.systemId || "") + "#[line:" + e.lineNumber + ",col:" + e.columnNumber + "]";
        }
        function c(e, t, n) {
            return "string" == typeof e ? e.substr(t, n) : e.length >= t + n || t ? new java.lang.String(e, t, n) + "" : e;
        }
        function u(e, t) {
            (e.currentElement || e.doc).appendChild(t);
        }
        o.prototype.parseFromString = function(e, t) {
            var n = this.options, o = new l(), i = n.domBuilder || new r(), c = n.errorHandler, u = n.locator, d = n.xmlns || {}, f = (t = /\/x?html?$/.test(t)) ? s.entityMap : {
                lt: "<",
                gt: ">",
                amp: "&",
                quot: '"',
                apos: "'"
            };
            return u && i.setDocumentLocator(u), o.errorHandler = function(e, t) {
                function n(n) {
                    var r = e[n];
                    !r && c && (r = 2 == e.length ? function(t) {
                        e(n, t);
                    } : e), o[n] = r ? function(e) {
                        r("[xmldom " + n + "]\t" + e + a(t));
                    } : function() {};
                }
                if (!e) {
                    if (i instanceof r) return i;
                    e = i;
                }
                var o = {}, c = e instanceof Function;
                return t = t || {}, n("warning"), n("error"), n("fatalError"), o;
            }(c, u), o.domBuilder = n.domBuilder || i, t && (d[""] = "http://www.w3.org/1999/xhtml"), 
            d.xml = d.xml || "http://www.w3.org/XML/1998/namespace", e ? o.parse(e, d, f) : o.errorHandler.error("invalid doc source"), 
            i.doc;
        }, r.prototype = {
            startDocument: function() {
                this.doc = new d().createDocument(null, null, null), this.locator && (this.doc.documentURI = this.locator.systemId);
            },
            startElement: function(e, t, n, o) {
                var r = this.doc, a = r.createElementNS(e, n || t), c = o.length;
                u(this, a), this.currentElement = a, this.locator && i(this.locator, a);
                for (var s = 0; s < c; s++) {
                    var e = o.getURI(s), l = o.getValue(s), n = o.getQName(s), d = r.createAttributeNS(e, n);
                    this.locator && i(o.getLocator(s), d), d.value = d.nodeValue = l, a.setAttributeNode(d);
                }
            },
            endElement: function(e, t, n) {
                var o = this.currentElement;
                o.tagName, this.currentElement = o.parentNode;
            },
            startPrefixMapping: function(e, t) {},
            endPrefixMapping: function(e) {},
            processingInstruction: function(e, t) {
                e = this.doc.createProcessingInstruction(e, t), this.locator && i(this.locator, e), 
                u(this, e);
            },
            ignorableWhitespace: function(e, t, n) {},
            characters: function(e, t, n) {
                var o;
                (e = c.apply(this, arguments)) && (o = this.cdata ? this.doc.createCDATASection(e) : this.doc.createTextNode(e), 
                this.currentElement ? this.currentElement.appendChild(o) : /^\s*$/.test(e) && this.doc.appendChild(o), 
                this.locator) && i(this.locator, o);
            },
            skippedEntity: function(e) {},
            endDocument: function() {
                this.doc.normalize();
            },
            setDocumentLocator: function(e) {
                (this.locator = e) && (e.lineNumber = 0);
            },
            comment: function(e, t, n) {
                e = c.apply(this, arguments), e = this.doc.createComment(e), this.locator && i(this.locator, e), 
                u(this, e);
            },
            startCDATA: function() {
                this.cdata = !0;
            },
            endCDATA: function() {
                this.cdata = !1;
            },
            startDTD: function(e, t, n) {
                var o = this.doc.implementation;
                o && o.createDocumentType && (o = o.createDocumentType(e, t, n), this.locator && i(this.locator, o), 
                u(this, o));
            },
            warning: function(e) {
                console.warn("[xmldom warning]\t" + e, a(this.locator));
            },
            error: function(e) {
                console.error("[xmldom error]\t" + e, a(this.locator));
            },
            fatalError: function(e) {
                throw console.error("[xmldom fatalError]\t" + e, a(this.locator)), e;
            }
        }, "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(e) {
            r.prototype[e] = function() {
                return null;
            };
        });
        var s = e("./entities"), l = e("./sax").XMLReader, d = n.DOMImplementation = e("./dom").DOMImplementation;
        n.XMLSerializer = e("./dom").XMLSerializer, n.DOMParser = o;
    }, {
        "./dom": 20,
        "./entities": 21,
        "./sax": 22
    } ],
    20: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            for (var n in e) t[n] = e[n];
        }
        function a(e, t) {
            var n = e.prototype;
            if (!(n instanceof t)) {
                var o, r = function() {};
                for (o in r.prototype = t.prototype, r = new r(), n) r[o] = n[o];
                e.prototype = n = r;
            }
            n.constructor != e && ("function" != typeof e && console.error("unknow Class:" + e), 
            n.constructor = e);
        }
        function c(e, t) {
            var n;
            return t instanceof Error ? n = t : (n = this, Error.call(this, K[e]), this.message = K[e], 
            Error.captureStackTrace && Error.captureStackTrace(this, c)), n.code = e, t && (this.message = this.message + ": " + t), 
            n;
        }
        function u() {}
        function s(e, t) {
            this._node = e, this._refresh = t, l(this);
        }
        function l(e) {
            var t = e._node._inc || e._node.ownerDocument._inc;
            if (e._inc != t) {
                var n, o = e._refresh(e._node);
                for (n in B(e, "length", o.length), o) e[n] = o[n];
                e._inc = t;
            }
        }
        function d() {}
        function f(e, t) {
            for (var n = e.length; n--; ) if (e[n] === t) return n;
        }
        function p(e, t, n, o) {
            o ? t[f(t, o)] = n : t[t.length++] = n, e && (t = (n.ownerElement = e).ownerDocument) && (o && w(t, e, o), 
            o = e, e = n, (n = t) && n._inc++, "http://www.w3.org/2000/xmlns/" == e.namespaceURI) && (o._nsMap[e.prefix ? e.localName : ""] = e.value);
        }
        function h(e, t, n) {
            var o = f(t, n);
            if (!(0 <= o)) throw c(8, new Error(e.tagName + "@" + n));
            for (var r, i = t.length - 1; o < i; ) t[o] = t[++o];
            t.length = i, e && (r = e.ownerDocument) && (w(r, e, n), n.ownerElement = null);
        }
        function m(e) {
            if (this._features = {}, e) for (var t in e) this._features = e[t];
        }
        function g() {}
        function y(e) {
            return ("<" == e ? "&lt;" : ">" == e && "&gt;") || ("&" == e ? "&amp;" : '"' == e && "&quot;") || "&#" + e.charCodeAt() + ";";
        }
        function v(e, t) {
            if (t(e)) return 1;
            if (e = e.firstChild) do {
                if (v(e, t)) return 1;
            } while (e = e.nextSibling);
        }
        function b() {}
        function w(e, t, n) {
            e && e._inc++, "http://www.w3.org/2000/xmlns/" == n.namespaceURI && delete t._nsMap[n.prefix ? n.localName : ""];
        }
        function _(e, t, n) {
            if (e && e._inc) {
                e._inc++;
                var o = t.childNodes;
                if (n) o[o.length++] = n; else {
                    for (var r = t.firstChild, i = 0; r; ) r = (o[i++] = r).nextSibling;
                    o.length = i;
                }
            }
        }
        function E(e, t) {
            var n = t.previousSibling, o = t.nextSibling;
            return n ? n.nextSibling = o : e.firstChild = o, o ? o.previousSibling = n : e.lastChild = n, 
            _(e.ownerDocument, e), t;
        }
        function x(e, t, n) {
            var o = t.parentNode;
            if (o && o.removeChild(t), 11 === t.nodeType) {
                var r = t.firstChild;
                if (null == r) return t;
                var i = t.lastChild;
            } else r = i = t;
            for (o = n ? n.previousSibling : e.lastChild, r.previousSibling = o, i.nextSibling = n, 
            o ? o.nextSibling = r : e.firstChild = r, null == n ? e.lastChild = i : n.previousSibling = i; r.parentNode = e, 
            r !== i && (r = r.nextSibling); ) ;
            return _(e.ownerDocument || e, e), 11 == t.nodeType && (t.firstChild = t.lastChild = null), 
            t;
        }
        function S() {
            this._nsMap = {};
        }
        function N() {}
        function T() {}
        function O() {}
        function M() {}
        function C() {}
        function A() {}
        function D() {}
        function P() {}
        function I() {}
        function R() {}
        function j() {}
        function L() {}
        function F(e, t) {
            var n, o = [], r = 9 == this.nodeType && this.documentElement || this, i = r.prefix, a = r.namespaceURI;
            return H(this, o, e, t, n = a && null == i && null == r.lookupPrefix(a) ? [ {
                namespace: a,
                prefix: null
            } ] : n), o.join("");
        }
        function k(e, t, n) {
            var o = e.prefix || "", r = e.namespaceURI;
            if ((o || r) && ("xml" !== o || "http://www.w3.org/XML/1998/namespace" !== r) && "http://www.w3.org/2000/xmlns/" != r) {
                for (var i = n.length; i--; ) {
                    var a = n[i];
                    if (a.prefix == o) return a.namespace != r;
                }
                return 1;
            }
        }
        function H(e, t, n, o, r) {
            if (o) {
                if (!(e = o(e))) return;
                if ("string" == typeof e) return t.push(e);
            }
            switch (e.nodeType) {
              case 1:
                r = r || [];
                var i = e.attributes, a = i.length, c = e.firstChild, u = e.tagName;
                n = "http://www.w3.org/1999/xhtml" === e.namespaceURI || n, t.push("<", u);
                for (f = 0; f < a; f++) "xmlns" == (s = i.item(f)).prefix ? r.push({
                    prefix: s.localName,
                    namespace: s.value
                }) : "xmlns" == s.nodeName && r.push({
                    prefix: "",
                    namespace: s.value
                });
                for (var s, l, d, f = 0; f < a; f++) k(s = i.item(f), 0, r) && (l = s.prefix || "", 
                d = s.namespaceURI, t.push(l ? " xmlns:" + l : " xmlns", '="', d, '"'), r.push({
                    prefix: l,
                    namespace: d
                })), H(s, t, n, o, r);
                if (k(e, 0, r) && (l = e.prefix || "", d = e.namespaceURI, t.push(l ? " xmlns:" + l : " xmlns", '="', d, '"'), 
                r.push({
                    prefix: l,
                    namespace: d
                })), c || n && !/^(?:meta|link|img|br|hr|input)$/i.test(u)) {
                    if (t.push(">"), n && /^script$/i.test(u)) for (;c; ) c.data ? t.push(c.data) : H(c, t, n, o, r), 
                    c = c.nextSibling; else for (;c; ) H(c, t, n, o, r), c = c.nextSibling;
                    t.push("</", u, ">");
                } else t.push("/>");
                return;

              case 9:
              case 11:
                for (c = e.firstChild; c; ) H(c, t, n, o, r), c = c.nextSibling;
                return;

              case 2:
                return t.push(" ", e.name, '="', e.value.replace(/[<&"]/g, y), '"');

              case 3:
                return t.push(e.data.replace(/[<&]/g, y));

              case 4:
                return t.push("<![CDATA[", e.data, "]]>");

              case 8:
                return t.push("\x3c!--", e.data, "--\x3e");

              case 10:
                var u = e.publicId, p = e.systemId;
                return t.push("<!DOCTYPE ", e.name), u ? (t.push(' PUBLIC "', u), p && "." != p && t.push('" "', p), 
                t.push('">')) : p && "." != p ? t.push(' SYSTEM "', p, '">') : ((u = e.internalSubset) && t.push(" [", u, "]"), 
                t.push(">"));

              case 7:
                return t.push("<?", e.target, " ", e.data, "?>");

              case 5:
                return t.push("&", e.nodeName, ";");

              default:
                t.push("??", e.nodeName);
            }
        }
        function B(e, t, n) {
            e[t] = n;
        }
        var U, W = {}, V = (W.ELEMENT_NODE = 1, W.ATTRIBUTE_NODE = 2, W.TEXT_NODE = 3, W.CDATA_SECTION_NODE = 4, 
        W.ENTITY_REFERENCE_NODE = 5, W.ENTITY_NODE = 6, W.PROCESSING_INSTRUCTION_NODE = 7, 
        W.COMMENT_NODE = 8, W.DOCUMENT_NODE = 9, W.DOCUMENT_TYPE_NODE = 10, W.DOCUMENT_FRAGMENT_NODE = 11, 
        W.NOTATION_NODE = 12, {}), K = {};
        V.INDEX_SIZE_ERR = (K[1] = "Index size error", 1), V.DOMSTRING_SIZE_ERR = (K[2] = "DOMString size error", 
        2), V.HIERARCHY_REQUEST_ERR = (K[3] = "Hierarchy request error", 3), V.WRONG_DOCUMENT_ERR = (K[4] = "Wrong document", 
        4), V.INVALID_CHARACTER_ERR = (K[5] = "Invalid character", 5), V.NO_DATA_ALLOWED_ERR = (K[6] = "No data allowed", 
        6), V.NO_MODIFICATION_ALLOWED_ERR = (K[7] = "No modification allowed", 7), V.NOT_FOUND_ERR = (K[8] = "Not found", 
        8), V.NOT_SUPPORTED_ERR = (K[9] = "Not supported", 9), V.INUSE_ATTRIBUTE_ERR = (K[10] = "Attribute in use", 
        10), V.INVALID_STATE_ERR = (K[11] = "Invalid state", 11), V.SYNTAX_ERR = (K[12] = "Syntax error", 
        12), V.INVALID_MODIFICATION_ERR = (K[13] = "Invalid modification", 13), V.NAMESPACE_ERR = (K[14] = "Invalid namespace", 
        14), V.INVALID_ACCESS_ERR = (K[15] = "Invalid access", 15), c.prototype = Error.prototype, 
        i(V, c), u.prototype = {
            length: 0,
            item: function(e) {
                return this[e] || null;
            },
            toString: function(e, t) {
                for (var n = [], o = 0; o < this.length; o++) H(this[o], n, e, t);
                return n.join("");
            }
        }, s.prototype.item = function(e) {
            return l(this), this[e];
        }, a(s, u), d.prototype = {
            length: 0,
            item: u.prototype.item,
            getNamedItem: function(e) {
                for (var t = this.length; t--; ) {
                    var n = this[t];
                    if (n.nodeName == e) return n;
                }
            },
            setNamedItem: function(e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement) throw new c(10);
                return t = this.getNamedItem(e.nodeName), p(this._ownerElement, this, e, t), t;
            },
            setNamedItemNS: function(e) {
                var t = e.ownerElement;
                if (t && t != this._ownerElement) throw new c(10);
                return t = this.getNamedItemNS(e.namespaceURI, e.localName), p(this._ownerElement, this, e, t), 
                t;
            },
            removeNamedItem: function(e) {
                return e = this.getNamedItem(e), h(this._ownerElement, this, e), e;
            },
            removeNamedItemNS: function(e, t) {
                return e = this.getNamedItemNS(e, t), h(this._ownerElement, this, e), e;
            },
            getNamedItemNS: function(e, t) {
                for (var n = this.length; n--; ) {
                    var o = this[n];
                    if (o.localName == t && o.namespaceURI == e) return o;
                }
                return null;
            }
        }, m.prototype = {
            hasFeature: function(e, t) {
                return !(!(e = this._features[e.toLowerCase()]) || t && !(t in e));
            },
            createDocument: function(e, t, n) {
                var o = new b();
                return o.implementation = this, o.childNodes = new u(), (o.doctype = n) && o.appendChild(n), 
                t && (n = o.createElementNS(e, t), o.appendChild(n)), o;
            },
            createDocumentType: function(e, t, n) {
                var o = new A();
                return o.name = e, o.nodeName = e, o.publicId = t, o.systemId = n, o;
            }
        }, g.prototype = {
            firstChild: null,
            lastChild: null,
            previousSibling: null,
            nextSibling: null,
            attributes: null,
            parentNode: null,
            childNodes: null,
            ownerDocument: null,
            nodeValue: null,
            namespaceURI: null,
            prefix: null,
            localName: null,
            insertBefore: function(e, t) {
                return x(this, e, t);
            },
            replaceChild: function(e, t) {
                this.insertBefore(e, t), t && this.removeChild(t);
            },
            removeChild: function(e) {
                return E(this, e);
            },
            appendChild: function(e) {
                return this.insertBefore(e, null);
            },
            hasChildNodes: function() {
                return null != this.firstChild;
            },
            cloneNode: function(e) {
                return function e(t, n, o) {
                    var i, a = new n.constructor();
                    for (i in n) {
                        var c = n[i];
                        "object" != r(c) && c != a[i] && (a[i] = c);
                    }
                    switch (n.childNodes && (a.childNodes = new u()), a.ownerDocument = t, a.nodeType) {
                      case 1:
                        var s = n.attributes, l = a.attributes = new d(), f = s.length;
                        l._ownerElement = a;
                        for (var p = 0; p < f; p++) a.setAttributeNode(e(t, s.item(p), !0));
                        break;

                      case 2:
                        o = !0;
                    }
                    if (o) for (var h = n.firstChild; h; ) a.appendChild(e(t, h, o)), h = h.nextSibling;
                    return a;
                }(this.ownerDocument || this, this, e);
            },
            normalize: function() {
                for (var e = this.firstChild; e; ) {
                    var t = e.nextSibling;
                    t && 3 == t.nodeType && 3 == e.nodeType ? (this.removeChild(t), e.appendData(t.data)) : (e.normalize(), 
                    e = t);
                }
            },
            isSupported: function(e, t) {
                return this.ownerDocument.implementation.hasFeature(e, t);
            },
            hasAttributes: function() {
                return 0 < this.attributes.length;
            },
            lookupPrefix: function(e) {
                for (var t = this; t; ) {
                    var n = t._nsMap;
                    if (n) for (var o in n) if (n[o] == e) return o;
                    t = 2 == t.nodeType ? t.ownerDocument : t.parentNode;
                }
                return null;
            },
            lookupNamespaceURI: function(e) {
                for (var t = this; t; ) {
                    var n = t._nsMap;
                    if (n && e in n) return n[e];
                    t = 2 == t.nodeType ? t.ownerDocument : t.parentNode;
                }
                return null;
            },
            isDefaultNamespace: function(e) {
                return null == this.lookupPrefix(e);
            }
        }, i(W, g), i(W, g.prototype), b.prototype = {
            nodeName: "#document",
            nodeType: 9,
            doctype: null,
            documentElement: null,
            _inc: 1,
            insertBefore: function(e, t) {
                if (11 == e.nodeType) for (var n = e.firstChild; n; ) {
                    var o = n.nextSibling;
                    this.insertBefore(n, t), n = o;
                } else null == this.documentElement && 1 == e.nodeType && (this.documentElement = e), 
                x(this, e, t), e.ownerDocument = this;
                return e;
            },
            removeChild: function(e) {
                return this.documentElement == e && (this.documentElement = null), E(this, e);
            },
            importNode: function(e, t) {
                return function e(t, n, o) {
                    var r;
                    switch (n.nodeType) {
                      case 1:
                        (r = n.cloneNode(!1)).ownerDocument = t;

                      case 11:
                        break;

                      case 2:
                        o = !0;
                    }
                    if ((r = r || n.cloneNode(!1)).ownerDocument = t, r.parentNode = null, o) for (var i = n.firstChild; i; ) r.appendChild(e(t, i, o)), 
                    i = i.nextSibling;
                    return r;
                }(this, e, t);
            },
            getElementById: function(e) {
                var t = null;
                return v(this.documentElement, function(n) {
                    if (1 == n.nodeType && n.getAttribute("id") == e) return t = n, !0;
                }), t;
            },
            createElement: function(e) {
                var t = new S();
                return t.ownerDocument = this, t.nodeName = e, t.tagName = e, t.childNodes = new u(), 
                (t.attributes = new d())._ownerElement = t;
            },
            createDocumentFragment: function() {
                var e = new R();
                return e.ownerDocument = this, e.childNodes = new u(), e;
            },
            createTextNode: function(e) {
                var t = new O();
                return t.ownerDocument = this, t.appendData(e), t;
            },
            createComment: function(e) {
                var t = new M();
                return t.ownerDocument = this, t.appendData(e), t;
            },
            createCDATASection: function(e) {
                var t = new C();
                return t.ownerDocument = this, t.appendData(e), t;
            },
            createProcessingInstruction: function(e, t) {
                var n = new j();
                return n.ownerDocument = this, n.tagName = n.target = e, n.nodeValue = n.data = t, 
                n;
            },
            createAttribute: function(e) {
                var t = new N();
                return t.ownerDocument = this, t.name = e, t.nodeName = e, t.localName = e, t.specified = !0, 
                t;
            },
            createEntityReference: function(e) {
                var t = new I();
                return t.ownerDocument = this, t.nodeName = e, t;
            },
            createElementNS: function(e, t) {
                var n = new S(), o = t.split(":"), r = n.attributes = new d();
                return n.childNodes = new u(), n.ownerDocument = this, n.nodeName = t, n.tagName = t, 
                n.namespaceURI = e, 2 == o.length ? (n.prefix = o[0], n.localName = o[1]) : n.localName = t, 
                r._ownerElement = n;
            },
            createAttributeNS: function(e, t) {
                var n = new N(), o = t.split(":");
                return n.ownerDocument = this, n.nodeName = t, n.name = t, n.namespaceURI = e, n.specified = !0, 
                2 == o.length ? (n.prefix = o[0], n.localName = o[1]) : n.localName = t, n;
            }
        }, a(b, g), b.prototype.getElementsByTagName = (S.prototype = {
            nodeType: 1,
            hasAttribute: function(e) {
                return null != this.getAttributeNode(e);
            },
            getAttribute: function(e) {
                return (e = this.getAttributeNode(e)) && e.value || "";
            },
            getAttributeNode: function(e) {
                return this.attributes.getNamedItem(e);
            },
            setAttribute: function(e, t) {
                (e = this.ownerDocument.createAttribute(e)).value = e.nodeValue = "" + t, this.setAttributeNode(e);
            },
            removeAttribute: function(e) {
                (e = this.getAttributeNode(e)) && this.removeAttributeNode(e);
            },
            appendChild: function(e) {
                return 11 === e.nodeType ? this.insertBefore(e, null) : (t = this, (n = e.parentNode) && (o = t.lastChild, 
                n.removeChild(e), o = t.lastChild), o = t.lastChild, e.parentNode = t, e.previousSibling = o, 
                e.nextSibling = null, o ? o.nextSibling = e : t.firstChild = e, t.lastChild = e, 
                _(t.ownerDocument, t, e), e);
                var t, n, o;
            },
            setAttributeNode: function(e) {
                return this.attributes.setNamedItem(e);
            },
            setAttributeNodeNS: function(e) {
                return this.attributes.setNamedItemNS(e);
            },
            removeAttributeNode: function(e) {
                return this.attributes.removeNamedItem(e.nodeName);
            },
            removeAttributeNS: function(e, t) {
                (e = this.getAttributeNodeNS(e, t)) && this.removeAttributeNode(e);
            },
            hasAttributeNS: function(e, t) {
                return null != this.getAttributeNodeNS(e, t);
            },
            getAttributeNS: function(e, t) {
                return (e = this.getAttributeNodeNS(e, t)) && e.value || "";
            },
            setAttributeNS: function(e, t, n) {
                (e = this.ownerDocument.createAttributeNS(e, t)).value = e.nodeValue = "" + n, this.setAttributeNode(e);
            },
            getAttributeNodeNS: function(e, t) {
                return this.attributes.getNamedItemNS(e, t);
            },
            getElementsByTagName: function(e) {
                return new s(this, function(t) {
                    var n = [];
                    return v(t, function(o) {
                        o === t || 1 != o.nodeType || "*" !== e && o.tagName != e || n.push(o);
                    }), n;
                });
            },
            getElementsByTagNameNS: function(e, t) {
                return new s(this, function(n) {
                    var o = [];
                    return v(n, function(r) {
                        r === n || 1 !== r.nodeType || "*" !== e && r.namespaceURI !== e || "*" !== t && r.localName != t || o.push(r);
                    }), o;
                });
            }
        }).getElementsByTagName, b.prototype.getElementsByTagNameNS = S.prototype.getElementsByTagNameNS, 
        a(S, g), N.prototype.nodeType = 2, a(N, g), T.prototype = {
            data: "",
            substringData: function(e, t) {
                return this.data.substring(e, e + t);
            },
            appendData: function(e) {
                e = this.data + e, this.nodeValue = this.data = e, this.length = e.length;
            },
            insertData: function(e, t) {
                this.replaceData(e, 0, t);
            },
            appendChild: function(e) {
                throw new Error(K[3]);
            },
            deleteData: function(e, t) {
                this.replaceData(e, t, "");
            },
            replaceData: function(e, t, n) {
                var o = this.data.substring(0, e), e = this.data.substring(e + t);
                this.nodeValue = this.data = n = o + n + e, this.length = n.length;
            }
        }, a(T, g), O.prototype = {
            nodeName: "#text",
            nodeType: 3,
            splitText: function(e) {
                var t = (n = this.data).substring(e), n = n.substring(0, e), e = (this.data = this.nodeValue = n, 
                this.length = n.length, this.ownerDocument.createTextNode(t));
                return this.parentNode && this.parentNode.insertBefore(e, this.nextSibling), e;
            }
        }, a(O, T), M.prototype = {
            nodeName: "#comment",
            nodeType: 8
        }, a(M, T), C.prototype = {
            nodeName: "#cdata-section",
            nodeType: 4
        }, a(C, T), A.prototype.nodeType = 10, a(A, g), D.prototype.nodeType = 12, a(D, g), 
        P.prototype.nodeType = 6, a(P, g), I.prototype.nodeType = 5, a(I, g), R.prototype.nodeName = "#document-fragment", 
        R.prototype.nodeType = 11, a(R, g), j.prototype.nodeType = 7, a(j, g), L.prototype.serializeToString = function(e, t, n) {
            return F.call(e, t, n);
        }, g.prototype.toString = F;
        try {
            Object.defineProperty && (U = function e(t) {
                switch (t.nodeType) {
                  case 1:
                  case 11:
                    var n = [];
                    for (t = t.firstChild; t; ) 7 !== t.nodeType && 8 !== t.nodeType && n.push(e(t)), 
                    t = t.nextSibling;
                    return n.join("");

                  default:
                    return t.nodeValue;
                }
            }, Object.defineProperty(s.prototype, "length", {
                get: function() {
                    return l(this), this.$$length;
                }
            }), Object.defineProperty(g.prototype, "textContent", {
                get: function() {
                    return U(this);
                },
                set: function(e) {
                    switch (this.nodeType) {
                      case 1:
                      case 11:
                        for (;this.firstChild; ) this.removeChild(this.firstChild);
                        (e || String(e)) && this.appendChild(this.ownerDocument.createTextNode(e));
                        break;

                      default:
                        this.data = e, this.value = e, this.nodeValue = e;
                    }
                }
            }), B = function(e, t, n) {
                e["$$" + t] = n;
            });
        } catch (o) {}
        o.DOMImplementation = m, o.XMLSerializer = L;
    }, {} ],
    21: [ function(e, t, n) {
        n.entityMap = {
            lt: "<",
            gt: ">",
            amp: "&",
            quot: '"',
            apos: "'",
            Agrave: "À",
            Aacute: "Á",
            Acirc: "Â",
            Atilde: "Ã",
            Auml: "Ä",
            Aring: "Å",
            AElig: "Æ",
            Ccedil: "Ç",
            Egrave: "È",
            Eacute: "É",
            Ecirc: "Ê",
            Euml: "Ë",
            Igrave: "Ì",
            Iacute: "Í",
            Icirc: "Î",
            Iuml: "Ï",
            ETH: "Ð",
            Ntilde: "Ñ",
            Ograve: "Ò",
            Oacute: "Ó",
            Ocirc: "Ô",
            Otilde: "Õ",
            Ouml: "Ö",
            Oslash: "Ø",
            Ugrave: "Ù",
            Uacute: "Ú",
            Ucirc: "Û",
            Uuml: "Ü",
            Yacute: "Ý",
            THORN: "Þ",
            szlig: "ß",
            agrave: "à",
            aacute: "á",
            acirc: "â",
            atilde: "ã",
            auml: "ä",
            aring: "å",
            aelig: "æ",
            ccedil: "ç",
            egrave: "è",
            eacute: "é",
            ecirc: "ê",
            euml: "ë",
            igrave: "ì",
            iacute: "í",
            icirc: "î",
            iuml: "ï",
            eth: "ð",
            ntilde: "ñ",
            ograve: "ò",
            oacute: "ó",
            ocirc: "ô",
            otilde: "õ",
            ouml: "ö",
            oslash: "ø",
            ugrave: "ù",
            uacute: "ú",
            ucirc: "û",
            uuml: "ü",
            yacute: "ý",
            thorn: "þ",
            yuml: "ÿ",
            nbsp: " ",
            iexcl: "¡",
            cent: "¢",
            pound: "£",
            curren: "¤",
            yen: "¥",
            brvbar: "¦",
            sect: "§",
            uml: "¨",
            copy: "©",
            ordf: "ª",
            laquo: "«",
            not: "¬",
            shy: "­­",
            reg: "®",
            macr: "¯",
            deg: "°",
            plusmn: "±",
            sup2: "²",
            sup3: "³",
            acute: "´",
            micro: "µ",
            para: "¶",
            middot: "·",
            cedil: "¸",
            sup1: "¹",
            ordm: "º",
            raquo: "»",
            frac14: "¼",
            frac12: "½",
            frac34: "¾",
            iquest: "¿",
            times: "×",
            divide: "÷",
            forall: "∀",
            part: "∂",
            exist: "∃",
            empty: "∅",
            nabla: "∇",
            isin: "∈",
            notin: "∉",
            ni: "∋",
            prod: "∏",
            sum: "∑",
            minus: "−",
            lowast: "∗",
            radic: "√",
            prop: "∝",
            infin: "∞",
            ang: "∠",
            and: "∧",
            or: "∨",
            cap: "∩",
            cup: "∪",
            int: "∫",
            there4: "∴",
            sim: "∼",
            cong: "≅",
            asymp: "≈",
            ne: "≠",
            equiv: "≡",
            le: "≤",
            ge: "≥",
            sub: "⊂",
            sup: "⊃",
            nsub: "⊄",
            sube: "⊆",
            supe: "⊇",
            oplus: "⊕",
            otimes: "⊗",
            perp: "⊥",
            sdot: "⋅",
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigmaf: "ς",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            thetasym: "ϑ",
            upsih: "ϒ",
            piv: "ϖ",
            OElig: "Œ",
            oelig: "œ",
            Scaron: "Š",
            scaron: "š",
            Yuml: "Ÿ",
            fnof: "ƒ",
            circ: "ˆ",
            tilde: "˜",
            ensp: " ",
            emsp: " ",
            thinsp: " ",
            zwnj: "‌",
            zwj: "‍",
            lrm: "‎",
            rlm: "‏",
            ndash: "–",
            mdash: "—",
            lsquo: "‘",
            rsquo: "’",
            sbquo: "‚",
            ldquo: "“",
            rdquo: "”",
            bdquo: "„",
            dagger: "†",
            Dagger: "‡",
            bull: "•",
            hellip: "…",
            permil: "‰",
            prime: "′",
            Prime: "″",
            lsaquo: "‹",
            rsaquo: "›",
            oline: "‾",
            euro: "€",
            trade: "™",
            larr: "←",
            uarr: "↑",
            rarr: "→",
            darr: "↓",
            harr: "↔",
            crarr: "↵",
            lceil: "⌈",
            rceil: "⌉",
            lfloor: "⌊",
            rfloor: "⌋",
            loz: "◊",
            spades: "♠",
            clubs: "♣",
            hearts: "♥",
            diams: "♦"
        };
    }, {} ],
    22: [ function(e, t, n) {
        function o() {}
        function r(e, t) {
            return t.lineNumber = e.lineNumber, t.columnNumber = e.columnNumber, t;
        }
        function i(e, t, n) {
            for (var o = e.tagName, r = null, i = e.length; i--; ) {
                var c = e[i], u = c.qName, s = c.value, u = 0 < (d = u.indexOf(":")) ? (l = c.prefix = u.slice(0, d), 
                f = u.slice(d + 1), "xmlns" === l && f) : (l = null, "xmlns" === (f = u) && "");
                c.localName = f, !1 !== u && (null == r && (r = {}, a(n, n = {})), n[u] = r[u] = s, 
                c.uri = "http://www.w3.org/2000/xmlns/", t.startPrefixMapping(u, s));
            }
            for (var l, i = e.length; i--; ) (l = (c = e[i]).prefix) && ("xml" === l && (c.uri = "http://www.w3.org/XML/1998/namespace"), 
            "xmlns" !== l) && (c.uri = n[l || ""]);
            var d, f = 0 < (d = o.indexOf(":")) ? (l = e.prefix = o.slice(0, d), e.localName = o.slice(d + 1)) : (l = null, 
            e.localName = o), p = e.uri = n[l || ""];
            if (t.startElement(p, f, o, e), !e.closed) return e.currentNSMap = n, e.localNSMap = r, 
            1;
            if (t.endElement(p, f, o), r) for (l in r) t.endPrefixMapping(l);
        }
        function a(e, t) {
            for (var n in e) t[n] = e[n];
        }
        function c(e) {}
        var u = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, s = new RegExp("[\\-\\.0-9" + u.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]"), l = new RegExp("^" + u.source + s.source + "*(?::" + u.source + s.source + "*)?$");
        o.prototype = {
            parse: function(e, t, n) {
                var o = this.domBuilder;
                o.startDocument(), a(t, t = {}), function(e, t, n, o, a) {
                    function u(e) {
                        var t = e.slice(1, -1);
                        return t in n ? n[t] : "#" === t.charAt(0) ? 65535 < (t = parseInt(t.substr(1).replace("x", "0x"))) ? (t -= 65536, 
                        String.fromCharCode(55296 + (t >> 10), 56320 + (1023 & t))) : String.fromCharCode(t) : (a.error("entity not found:" + e), 
                        e);
                    }
                    function s(t) {
                        var n;
                        P < t && (n = e.substring(P, t).replace(/&#?\w+;/g, u), C && l(P), o.characters(n, 0, t - P), 
                        P = t);
                    }
                    function l(t, n) {
                        for (;O <= t && (n = M.exec(e)); ) T = n.index, O = T + n[0].length, C.lineNumber++;
                        C.columnNumber = t - T + 1;
                    }
                    for (var d, f, p, h, m, g, y, v, b, w, _, E, x, S, N, T = 0, O = 0, M = /.*(?:\r\n?|\n)|.*$/g, C = o.locator, A = [ {
                        currentNSMap: t
                    } ], D = {}, P = 0; ;) {
                        try {
                            var I, R, j = e.indexOf("<", P);
                            if (j < 0) return e.substr(P).match(/^\s*$/) || (R = (I = o.doc).createTextNode(e.substr(P)), 
                            I.appendChild(R), o.currentElement = R);
                            switch (P < j && s(j), e.charAt(j + 1)) {
                              case "/":
                                var L = e.indexOf(">", j + 3), F = e.substring(j + 2, L), k = A.pop(), H = (L < 0 ? (F = e.substring(j + 2).replace(/[\s<].*/, ""), 
                                a.error("end tag name: " + F + " is not complete:" + k.tagName), L = j + 1 + F.length) : F.match(/\s</) && (F = F.replace(/[\s<].*/, ""), 
                                a.error("end tag name: " + F + " maybe not complete"), L = j + 1 + F.length), k.localNSMap), B = k.tagName == F;
                                if (B || k.tagName && k.tagName.toLowerCase() == F.toLowerCase()) {
                                    if (o.endElement(k.uri, k.localName, F), H) for (var U in H) o.endPrefixMapping(U);
                                    B || a.fatalError("end tag name: " + F + " is not match the current start tagName:" + k.tagName);
                                } else A.push(k);
                                L++;
                                break;

                              case "?":
                                C && l(j), x = j, S = o, L = (N = (E = e).indexOf("?>", x)) && (E = E.substring(x, N).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/)) ? (E[0].length, 
                                S.processingInstruction(E[1], E[2]), N + 2) : -1;
                                break;

                              case "!":
                                C && l(j), y = j, v = o, b = a, _ = w = void 0, L = "-" === (g = e).charAt(y + 2) ? "-" === g.charAt(y + 3) ? y < (_ = g.indexOf("--\x3e", y + 4)) ? (v.comment(g, y + 4, _ - y - 4), 
                                _ + 3) : (b.error("Unclosed comment"), -1) : -1 : "CDATA[" == g.substr(y + 3, 6) ? (_ = g.indexOf("]]>", y + 9), 
                                v.startCDATA(), v.characters(g, y + 9, _ - y - 9), v.endCDATA(), _ + 3) : 1 < (_ = (b = function(e, t) {
                                    var n, o = [], r = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
                                    for (r.lastIndex = t, r.exec(e); n = r.exec(e); ) if (o.push(n), n[1]) return o;
                                }(g, y)).length) && /!doctype/i.test(b[0][0]) ? (g = b[1][0], y = 3 < _ && /^public$/i.test(b[2][0]) && b[3][0], 
                                w = 4 < _ && b[4][0], b = b[_ - 1], v.startDTD(g, y && y.replace(/^(['"])(.*?)\1$/, "$2"), w && w.replace(/^(['"])(.*?)\1$/, "$2")), 
                                v.endDTD(), b.index + b[0].length) : -1;
                                break;

                              default:
                                C && l(j);
                                var W = new c(), V = A[A.length - 1].currentNSMap, L = function(e, t, n, o, r, i) {
                                    for (var a, c = ++t, u = 0; ;) {
                                        var s = e.charAt(c);
                                        switch (s) {
                                          case "=":
                                            if (1 === u) a = e.slice(t, c); else if (2 !== u) throw new Error("attribute equal must after attrName");
                                            u = 3;
                                            break;

                                          case "'":
                                          case '"':
                                            if (3 === u || 1 === u) {
                                                if (1 === u && (i.warning('attribute value must after "="'), a = e.slice(t, c)), 
                                                !(0 < (c = e.indexOf(s, t = c + 1)))) throw new Error("attribute value no end '" + s + "' match");
                                                l = e.slice(t, c).replace(/&#?\w+;/g, r), n.add(a, l, t - 1);
                                            } else {
                                                if (4 != u) throw new Error('attribute value must after "="');
                                                l = e.slice(t, c).replace(/&#?\w+;/g, r), n.add(a, l, t), i.warning('attribute "' + a + '" missed start quot(' + s + ")!!"), 
                                                t = c + 1;
                                            }
                                            u = 5;
                                            break;

                                          case "/":
                                            switch (u) {
                                              case 0:
                                                n.setTagName(e.slice(t, c));

                                              case 5:
                                              case 6:
                                              case 7:
                                                u = 7, n.closed = !0;

                                              case 4:
                                              case 1:
                                              case 2:
                                                break;

                                              default:
                                                throw new Error("attribute invalid close char('/')");
                                            }
                                            break;

                                          case "":
                                            return i.error("unexpected end of input"), 0 == u && n.setTagName(e.slice(t, c)), 
                                            c;

                                          case ">":
                                            switch (u) {
                                              case 0:
                                                n.setTagName(e.slice(t, c));

                                              case 5:
                                              case 6:
                                              case 7:
                                                break;

                                              case 4:
                                              case 1:
                                                "/" === (l = e.slice(t, c)).slice(-1) && (n.closed = !0, l = l.slice(0, -1));

                                              case 2:
                                                2 === u && (l = a), 4 == u ? (i.warning('attribute "' + l + '" missed quot(")!!'), 
                                                n.add(a, l.replace(/&#?\w+;/g, r), t)) : ("http://www.w3.org/1999/xhtml" === o[""] && l.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + l + '" missed value!! "' + l + '" instead!!'), 
                                                n.add(l, l, t));
                                                break;

                                              case 3:
                                                throw new Error("attribute value missed!!");
                                            }
                                            return c;

                                          case "":
                                            s = " ";

                                          default:
                                            if (s <= " ") switch (u) {
                                              case 0:
                                                n.setTagName(e.slice(t, c)), u = 6;
                                                break;

                                              case 1:
                                                a = e.slice(t, c), u = 2;
                                                break;

                                              case 4:
                                                var l = e.slice(t, c).replace(/&#?\w+;/g, r);
                                                i.warning('attribute "' + l + '" missed quot(")!!'), n.add(a, l, t);

                                              case 5:
                                                u = 6;
                                            } else switch (u) {
                                              case 2:
                                                n.tagName, "http://www.w3.org/1999/xhtml" === o[""] && a.match(/^(?:disabled|checked|selected)$/i) || i.warning('attribute "' + a + '" missed value!! "' + a + '" instead2!!'), 
                                                n.add(a, a, t), t = c, u = 1;
                                                break;

                                              case 5:
                                                i.warning('attribute space is required"' + a + '"!!');

                                              case 6:
                                                u = 1, t = c;
                                                break;

                                              case 3:
                                                u = 4, t = c;
                                                break;

                                              case 7:
                                                throw new Error("elements closed character '/' and '>' must be connected to");
                                            }
                                        }
                                        c++;
                                    }
                                }(e, j, W, V, u, a), K = W.length;
                                if (!W.closed && (d = e, f = L, p = W.tagName, m = void 0, null == (m = (h = D)[p]) && ((m = d.lastIndexOf("</" + p + ">")) < f && (m = d.lastIndexOf("</" + p)), 
                                h[p] = m), m < f) && (W.closed = !0, n.nbsp || a.warning("unclosed xml attribute")), 
                                C && K) {
                                    for (var G = r(C, {}), q = 0; q < K; q++) {
                                        var z = W[q];
                                        l(z.offset), z.locator = r(C, {});
                                    }
                                    o.locator = G, i(W, o, V) && A.push(W), o.locator = C;
                                } else i(W, o, V) && A.push(W);
                                "http://www.w3.org/1999/xhtml" !== W.uri || W.closed ? L++ : L = function(e, t, n, o, r) {
                                    if (/^(?:script|textarea)$/i.test(n)) {
                                        var i = e.indexOf("</" + n + ">", t), e = e.substring(t + 1, i);
                                        if (/[&<]/.test(e)) return /^script$/i.test(n) || (e = e.replace(/&#?\w+;/g, o)), 
                                        r.characters(e, 0, e.length), i;
                                    }
                                    return t + 1;
                                }(e, L, W.tagName, u, o);
                            }
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            a.error("element parse error: " + t), L = -1;
                        }
                        P < L ? P = L : s(Math.max(j, P) + 1);
                    }
                }(e, t, n, o, this.errorHandler), o.endDocument();
            }
        }, c.prototype = {
            setTagName: function(e) {
                if (!l.test(e)) throw new Error("invalid tagName:" + e);
                this.tagName = e;
            },
            add: function(e, t, n) {
                if (!l.test(e)) throw new Error("invalid attribute:" + e);
                this[this.length++] = {
                    qName: e,
                    value: t,
                    offset: n
                };
            },
            length: 0,
            getLocalName: function(e) {
                return this[e].localName;
            },
            getLocator: function(e) {
                return this[e].locator;
            },
            getQName: function(e) {
                return this[e].qName;
            },
            getURI: function(e) {
                return this[e].uri;
            },
            getValue: function(e) {
                return this[e].value;
            }
        }, n.XMLReader = o;
    }, {} ],
    23: [ function(e, t, n) {
        var o = GameGlobal, r = o.__globalAdapter = {};
        Object.assign(r, {
            init: function() {
                e("./wrapper/builtin"), o.DOMParser = e("../../common/xmldom/dom-parser").DOMParser, 
                e("./wrapper/unify"), e("./wrapper/fs-utils"), e("../../common/engine/globalAdapter"), 
                e("./wrapper/systemInfo");
            },
            adaptEngine: function() {
                e("./wrapper/error-reporter"), e("../../common/engine"), e("./wrapper/engine"), 
                e("./wrapper/sub-context-adapter");
            }
        });
    }, {
        "../../common/engine": 16,
        "../../common/engine/globalAdapter": 15,
        "../../common/xmldom/dom-parser": 19,
        "./wrapper/builtin": 46,
        "./wrapper/engine": 53,
        "./wrapper/error-reporter": 55,
        "./wrapper/fs-utils": 56,
        "./wrapper/sub-context-adapter": 1,
        "./wrapper/systemInfo": 57,
        "./wrapper/unify": 58
    } ],
    24: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t, n) {
            return (i = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function(e, t, n) {
                if (e = function(e, t) {
                    for (;!Object.prototype.hasOwnProperty.call(e, t) && null !== (e = c(e)); ) ;
                    return e;
                }(e, t)) return (e = Object.getOwnPropertyDescriptor(e, t)).get ? e.get.call(n) : e.value;
            })(e, t, n || e);
        }
        function a(e, t) {
            return (a = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function c(e) {
            return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0;
        var u = 1, s = {}, t = function(e) {
            function t(e) {
                var n;
                if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function");
                (n = d.call(this))._$sn = u++, n.HAVE_NOTHING = 0, n.HAVE_METADATA = 1, n.HAVE_CURRENT_DATA = 2, 
                n.HAVE_FUTURE_DATA = 3, n.HAVE_ENOUGH_DATA = 4, n.readyState = 0;
                var o = wx.createInnerAudioContext();
                return s[n._$sn] = o, n._canplayEvents = [ "load", "loadend", "canplay", "canplaythrough", "loadedmetadata" ], 
                o.onCanplay(function() {
                    n._loaded = !0, n.readyState = n.HAVE_CURRENT_DATA, n._canplayEvents.forEach(function(e) {
                        n.dispatchEvent({
                            type: e
                        });
                    });
                }), o.onPlay(function() {
                    n._paused = s[n._$sn].paused, n.dispatchEvent({
                        type: "play"
                    });
                }), o.onPause(function() {
                    n._paused = s[n._$sn].paused, n.dispatchEvent({
                        type: "pause"
                    });
                }), o.onEnded(function() {
                    n._paused = s[n._$sn].paused, !1 === s[n._$sn].loop && n.dispatchEvent({
                        type: "ended"
                    }), n.readyState = 4;
                }), o.onError(function() {
                    n._paused = s[n._$sn].paused, n.dispatchEvent({
                        type: "error"
                    });
                }), e ? n.src = e : n._src = "", n._loop = o.loop, n._autoplay = o.autoplay, n._paused = o.paused, 
                n._volume = o.volume, n._muted = !1, n;
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && a(n, e);
            for (var o = t, l = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), d = function() {
                var e, t = c(o), t = (e = l ? (e = c(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            }, f = (n = t).prototype, p = [ {
                key: "addEventListener",
                value: function(e, n) {
                    var o = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};
                    i(c(t.prototype), "addEventListener", this).call(this, e, n, o), e = String(e).toLowerCase(), 
                    this._loaded && -1 !== this._canplayEvents.indexOf(e) && this.dispatchEvent({
                        type: e
                    });
                }
            }, {
                key: "load",
                value: function() {}
            }, {
                key: "play",
                value: function() {
                    s[this._$sn].play();
                }
            }, {
                key: "resume",
                value: function() {
                    s[this._$sn].resume();
                }
            }, {
                key: "pause",
                value: function() {
                    s[this._$sn].pause();
                }
            }, {
                key: "stop",
                value: function() {
                    s[this._$sn].stop();
                }
            }, {
                key: "destroy",
                value: function() {
                    s[this._$sn].destroy();
                }
            }, {
                key: "canPlayType",
                value: function() {
                    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                    return "string" == typeof e && (-1 < e.indexOf("audio/mpeg") || e.indexOf("audio/mp4")) ? "probably" : "";
                }
            }, {
                key: "cloneNode",
                value: function() {
                    var e = new t();
                    return e.loop = this.loop, e.autoplay = this.autoplay, e.src = this.src, e;
                }
            }, {
                key: "currentTime",
                get: function() {
                    return s[this._$sn].currentTime;
                },
                set: function(e) {
                    s[this._$sn].seek(e);
                }
            }, {
                key: "duration",
                get: function() {
                    return s[this._$sn].duration;
                }
            }, {
                key: "src",
                get: function() {
                    return this._src;
                },
                set: function(e) {
                    this._src = e, this._loaded = !1, this.readyState = this.HAVE_NOTHING, s[this._$sn].src = e;
                }
            }, {
                key: "loop",
                get: function() {
                    return this._loop;
                },
                set: function(e) {
                    this._loop = e, s[this._$sn].loop = e;
                }
            }, {
                key: "autoplay",
                get: function() {
                    return this.autoplay;
                },
                set: function(e) {
                    this._autoplay = e, s[this._$sn].autoplay = e;
                }
            }, {
                key: "paused",
                get: function() {
                    return this._paused;
                }
            }, {
                key: "volume",
                get: function() {
                    return this._volume;
                },
                set: function(e) {
                    this._volume = e, this._muted || (s[this._$sn].volume = e);
                }
            }, {
                key: "muted",
                get: function() {
                    return this._muted;
                },
                set: function(e) {
                    this._muted = e, s[this._$sn].volume = e ? 0 : this._volume;
                }
            } ], h = 0; h < p.length; h++) {
                var m = p[h];
                m.enumerable = m.enumerable || !1, m.configurable = !0, "value" in m && (m.writable = !0), 
                Object.defineProperty(f, m.key, m);
            }
            return t;
        }((t = (t = t("./HTMLAudioElement")) && t.__esModule ? t : {
            default: t
        }).default);
        o.default = t, n.exports = o.default;
    }, {
        "./HTMLAudioElement": 32
    } ],
    25: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function() {
            var e = wx.createCanvas();
            return e.type = "canvas", e.getBoundingClientRect = function() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            }, e.style = {
                top: "0px",
                left: "0px",
                width: o.innerWidth + "px",
                height: o.innerHeight + "px"
            }, e.addEventListener = function(e, t) {
                document.addEventListener(e, t, 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {});
            }, e.removeEventListener = function(e, t) {
                document.removeEventListener(e, t);
            }, e.dispatchEvent = function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
                console.log("canvas.dispatchEvent", e.type, e);
            }, Object.defineProperty(e, "clientWidth", {
                enumerable: !0,
                get: function() {
                    return o.innerWidth;
                }
            }), Object.defineProperty(e, "clientHeight", {
                enumerable: !0,
                get: function() {
                    return o.innerHeight;
                }
            }), e;
        };
        var o = e("./WindowProperties");
        t.exports = n.default;
    }, {
        "./WindowProperties": 43
    } ],
    26: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0, t = function(e) {
            function t() {
                var e;
                if (this instanceof t) return (e = u.call(this)).className = "", e.children = [], 
                e;
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            var o = t, c = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), u = function() {
                var e, t = a(o), t = (e = c ? (e = a(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            };
            return t;
        }(((t = t("./Node")) && t.__esModule ? t : {
            default: t
        }).default), o.default = t, n.exports = o.default;
    }, {
        "./Node": 40
    } ],
    27: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, n.default = function e() {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
        }, t.exports = n.default;
    }, {} ],
    28: [ function(e, t, n) {
        function o(e) {
            if (!(this instanceof o)) throw new TypeError("Cannot call a class as a function");
            this.touches = [], this.targetTouches = [], this.changedTouches = [], this.preventDefault = i.noop, 
            this.stopPropagation = i.noop, this.type = e, this.target = window.canvas, this.currentTarget = window.canvas;
        }
        function r(e) {
            return function(t) {
                var n = new o(e);
                n.touches = t.touches, n.targetTouches = Array.prototype.slice.call(t.touches), 
                n.changedTouches = t.changedTouches, n.timeStamp = t.timeStamp, document.dispatchEvent(n);
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var i = e("../util/index.js");
        n.default = o, wx.onTouchStart(r("touchstart")), wx.onTouchMove(r("touchmove")), 
        wx.onTouchEnd(r("touchend")), wx.onTouchCancel(r("touchcancel")), t.exports = n.default;
    }, {
        "../util/index.js": 50
    } ],
    29: [ function(e, t, n) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), Object.defineProperty(n, "TouchEvent", {
            enumerable: !0,
            get: function() {
                return r.default;
            }
        }), Object.defineProperty(n, "MouseEvent", {
            enumerable: !0,
            get: function() {
                return i.default;
            }
        });
        var r = o(e("./TouchEvent")), i = o(e("./MouseEvent"));
    }, {
        "./MouseEvent": 27,
        "./TouchEvent": 28
    } ],
    30: [ function(e, t, n) {
        function o() {
            if (!(this instanceof o)) throw new TypeError("Cannot call a class as a function");
            r.set(this, {});
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = new WeakMap(), i = (function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(e, o.key, o);
            }
        }(o.prototype, [ {
            key: "addEventListener",
            value: function(e, t) {
                var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {}, o = r.get(this);
                o || r.set(this, o = {}), o[e] || (o[e] = []), o[e].push(t), n.capture, n.once, 
                n.passive;
            }
        }, {
            key: "removeEventListener",
            value: function(e, t) {
                var n = r.get(this);
                if (n) {
                    var o = n[e];
                    if (o && 0 < o.length) for (var i = o.length; i--; ) if (o[i] === t) {
                        o.splice(i, 1);
                        break;
                    }
                }
            }
        }, {
            key: "dispatchEvent",
            value: function() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, t = r.get(this)[e.type];
                if (t) for (var n = 0; n < t.length; n++) t[n](e);
            }
        } ]), o);
        n.default = i, t.exports = n.default;
    }, {} ],
    31: [ function(e, t, n) {
        function o() {
            if (!(this instanceof o)) throw new TypeError("Cannot call a class as a function");
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        for (var r = o.prototype, i = [ {
            key: "construct",
            value: function() {}
        } ], a = 0; a < i.length; a++) {
            var c = i[a];
            c.enumerable = c.enumerable || !1, c.configurable = !0, "value" in c && (c.writable = !0), 
            Object.defineProperty(r, c.key, c);
        }
        n.default = o, t.exports = n.default;
    }, {} ],
    32: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0, t = function(e) {
            function t() {
                if (this instanceof t) return u.call(this, "audio");
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            var o = t, c = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), u = function() {
                var e, t = a(o), t = (e = c ? (e = a(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            };
            return t;
        }(((t = t("./HTMLMediaElement")) && t.__esModule ? t : {
            default: t
        }).default), o.default = t, n.exports = o.default;
    }, {
        "./HTMLMediaElement": 36
    } ],
    33: [ function(e, t, n) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = o(e("./Canvas"));
        o(e("./HTMLElement")), GameGlobal.screencanvas = GameGlobal.screencanvas || new r.default(), 
        e = GameGlobal.screencanvas.constructor, n.default = e, t.exports = n.default;
    }, {
        "./Canvas": 25,
        "./HTMLElement": 34
    } ],
    34: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0;
        var c = (c = t("./Element")) && c.__esModule ? c : {
            default: c
        }, u = t("./util/index.js"), s = t("./WindowProperties");
        t = function(e) {
            function t() {
                var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "", n = this;
                if (n instanceof t) return (n = l.call(this)).className = "", n.childern = [], n.style = {
                    width: "".concat(s.innerWidth, "px"),
                    height: "".concat(s.innerHeight, "px")
                }, n.insertBefore = u.noop, n.innerHTML = "", n.tagName = e.toUpperCase(), n;
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            for (var o = t, c = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), l = function() {
                var e, t = a(o), t = (e = c ? (e = a(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            }, d = (n = t).prototype, f = [ {
                key: "setAttribute",
                value: function(e, t) {
                    this[e] = t;
                }
            }, {
                key: "getAttribute",
                value: function(e) {
                    return this[e];
                }
            }, {
                key: "getBoundingClientRect",
                value: function() {
                    return {
                        top: 0,
                        left: 0,
                        width: s.innerWidth,
                        height: s.innerHeight
                    };
                }
            }, {
                key: "focus",
                value: function() {}
            }, {
                key: "clientWidth",
                get: function() {
                    var e = parseInt(this.style.fontSize, 10) * this.innerHTML.length;
                    return Number.isNaN(e) ? 0 : e;
                }
            }, {
                key: "clientHeight",
                get: function() {
                    var e = parseInt(this.style.fontSize, 10);
                    return Number.isNaN(e) ? 0 : e;
                }
            } ], p = 0; p < f.length; p++) {
                var h = f[p];
                h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), 
                Object.defineProperty(d, h.key, h);
            }
            return t;
        }(c.default), o.default = t, n.exports = o.default;
    }, {
        "./Element": 26,
        "./WindowProperties": 43,
        "./util/index.js": 50
    } ],
    35: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, (e = e("./HTMLElement")) && e.__esModule, e = wx.createImage().constructor, 
        n.default = e, t.exports = n.default;
    }, {
        "./HTMLElement": 34
    } ],
    36: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0, t = function(e) {
            function t(e) {
                if (this instanceof t) return u.call(this, e);
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            for (var o = t, c = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), u = function() {
                var e, t = a(o), t = (e = c ? (e = a(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            }, s = (n = t).prototype, l = [ {
                key: "addTextTrack",
                value: function() {}
            }, {
                key: "captureStream",
                value: function() {}
            }, {
                key: "fastSeek",
                value: function() {}
            }, {
                key: "load",
                value: function() {}
            }, {
                key: "pause",
                value: function() {}
            }, {
                key: "play",
                value: function() {}
            } ], d = 0; d < l.length; d++) {
                var f = l[d];
                f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), 
                Object.defineProperty(s, f.key, f);
            }
            return t;
        }(((t = t("./HTMLElement")) && t.__esModule ? t : {
            default: t
        }).default), o.default = t, n.exports = o.default;
    }, {
        "./HTMLElement": 34
    } ],
    37: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0, t = function(e) {
            function t() {
                if (this instanceof t) return u.call(this, "video");
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            var o = t, c = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), u = function() {
                var e, t = a(o), t = (e = c ? (e = a(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            };
            return t;
        }(((t = t("./HTMLMediaElement")) && t.__esModule ? t : {
            default: t
        }).default), o.default = t, n.exports = o.default;
    }, {
        "./HTMLMediaElement": 36
    } ],
    38: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = function() {
            return wx.createImage();
        }, (e = e("./HTMLImageElement")) && e.__esModule, t.exports = n.default;
    }, {
        "./HTMLImageElement": 35
    } ],
    39: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, n.default = function e() {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
        }, t.exports = n.default;
    }, {} ],
    40: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            return (a = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0, t = function(e) {
            function t() {
                var e;
                if (this instanceof t) return (e = u.call(this)).childNodes = [], e;
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            for (var o = t, c = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), u = function() {
                var e, t = a(o), t = (e = c ? (e = a(this).constructor, Reflect.construct(t, arguments, e)) : t.apply(this, arguments), 
                this);
                if (!e || "object" !== r(e) && "function" != typeof e) {
                    if (void 0 !== t) return t;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return e;
            }, s = (n = t).prototype, l = [ {
                key: "appendChild",
                value: function(e) {
                    this.childNodes.push(e);
                }
            }, {
                key: "cloneNode",
                value: function() {
                    var e = Object.create(this);
                    return Object.assign(e, this), e;
                }
            }, {
                key: "removeChild",
                value: function(e) {
                    var t = this.childNodes.findIndex(function(t) {
                        return t === e;
                    });
                    return -1 < t ? this.childNodes.splice(t, 1) : null;
                }
            } ], d = 0; d < l.length; d++) {
                var f = l[d];
                f.enumerable = f.enumerable || !1, f.configurable = !0, "value" in f && (f.writable = !0), 
                Object.defineProperty(s, f.key, f);
            }
            return t;
        }(((t = t("./EventTarget.js")) && t.__esModule ? t : {
            default: t
        }).default), o.default = t, n.exports = o.default;
    }, {
        "./EventTarget.js": 30
    } ],
    41: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, n.default = function e() {
            if (!(this instanceof e)) throw new TypeError("Cannot call a class as a function");
        }, t.exports = n.default;
    }, {} ],
    42: [ function(e, t, n) {
        function o(e) {
            var t = this, n = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : [], i = o;
            if (!(this instanceof i)) throw new TypeError("Cannot call a class as a function");
            if (this.binaryType = "", this.bufferedAmount = 0, this.extensions = "", this.onclose = null, 
            this.onerror = null, this.onmessage = null, this.onopen = null, this.protocol = "", 
            this.readyState = 3, "string" == typeof e && /(^ws:\/\/)|(^wss:\/\/)/.test(e)) return this.url = e, 
            this.readyState = o.CONNECTING, i = wx.connectSocket({
                url: e,
                protocols: Array.isArray(n) ? n : [ n ],
                tcpNoDelay: !0
            }), r.set(this, i), i.onClose(function(e) {
                t.readyState = o.CLOSED, "function" == typeof t.onclose && t.onclose(e);
            }), i.onMessage(function(e) {
                "function" == typeof t.onmessage && t.onmessage(e);
            }), i.onOpen(function() {
                t.readyState = o.OPEN, "function" == typeof t.onopen && t.onopen();
            }), i.onError(function(e) {
                "function" == typeof t.onerror && t.onerror(new Error(e.errMsg));
            }), this;
            throw new TypeError("Failed to construct 'WebSocket': The URL '".concat(e, "' is invalid"));
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var r = new WeakMap(), i = (function(e, t) {
            for (var n = 0; n < t.length; n++) {
                var o = t[n];
                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), 
                Object.defineProperty(e, o.key, o);
            }
        }(o.prototype, [ {
            key: "close",
            value: function(e, t) {
                this.readyState = o.CLOSING, r.get(this).close({
                    code: e,
                    reason: t
                });
            }
        }, {
            key: "send",
            value: function(e) {
                if (!("string" == typeof e || e instanceof ArrayBuffer || ArrayBuffer.isView(e))) throw new TypeError("Failed to send message: The data ".concat(e, " is invalid"));
                r.get(this).send({
                    data: e
                });
            }
        } ]), o);
        (n.default = i).CONNECTING = 0, i.OPEN = 1, i.CLOSING = 2, i.CLOSED = 3, t.exports = n.default;
    }, {} ],
    43: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.ontouchend = n.ontouchmove = n.ontouchstart = n.performance = n.screen = n.devicePixelRatio = n.innerHeight = n.innerWidth = void 0;
        var o = (i = wx.getSystemInfoSync()).screenWidth, r = i.screenHeight, i = (n.devicePixelRatio = i.devicePixelRatio, 
        o), a = r, o = {
            width: o,
            height: r,
            availWidth: n.innerWidth = i,
            availHeight: n.innerHeight = a,
            availLeft: 0,
            availTop: 0
        }, r = (n.screen = o, {
            now: Date.now
        });
        n.performance = r, n.ontouchstart = null, n.ontouchmove = null, n.ontouchend = null;
    }, {} ],
    44: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e, t) {
            return (i = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t, e;
            })(e, t);
        }
        function a(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e;
        }
        function c(e) {
            return (c = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        function u(e) {
            if ("function" == typeof this["on".concat(e)]) {
                for (var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), o = 1; o < t; o++) n[o - 1] = arguments[o];
                this["on".concat(e)].apply(this, n);
            }
        }
        function s(e) {
            this.readyState = e, u.call(this, "readystatechange");
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0, t = (t = t("./EventTarget.js")) && t.__esModule ? t : {
            default: t
        };
        var l = new WeakMap(), d = new WeakMap(), f = new WeakMap(), p = new WeakMap(), h = new WeakMap();
        t = function(e) {
            function t() {
                var e;
                if (this instanceof t) return (e = g.call(this)).timeout = 0, e.onabort = null, 
                e.onerror = null, e.onload = null, e.onloadstart = null, e.onprogress = null, e.ontimeout = null, 
                e.onloadend = null, e.onreadystatechange = null, e.readyState = 0, e.response = null, 
                e.responseText = null, e.responseType = "", e.responseXML = null, e.status = 0, 
                e.statusText = "", e.upload = {}, e.withCredentials = !1, f.set(a(e), {
                    "content-type": "application/x-www-form-urlencoded"
                }), p.set(a(e), {}), e;
                throw new TypeError("Cannot call a class as a function");
            }
            var n = t;
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            n.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: n,
                    writable: !0,
                    configurable: !0
                }
            }), e && i(n, e);
            for (var o = t, m = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
                if (Reflect.construct.sham) return !1;
                if ("function" == typeof Proxy) return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})), 
                    !0;
                } catch (e) {
                    e = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(e);
                    return !1;
                }
            }(), g = function() {
                var e = c(o), t = m ? (t = c(this).constructor, Reflect.construct(e, arguments, t)) : e.apply(this, arguments), e = this;
                return !t || "object" !== r(t) && "function" != typeof t ? a(e) : t;
            }, y = (n = t).prototype, v = [ {
                key: "abort",
                value: function() {
                    var e = h.get(this);
                    e && e.abort();
                }
            }, {
                key: "getAllResponseHeaders",
                value: function() {
                    var e = p.get(this);
                    return Object.keys(e).map(function(t) {
                        return "".concat(t, ": ").concat(e[t]);
                    }).join("\n");
                }
            }, {
                key: "getResponseHeader",
                value: function(e) {
                    return p.get(this)[e];
                }
            }, {
                key: "open",
                value: function(e, n) {
                    d.set(this, e), l.set(this, n), s.call(this, t.OPENED);
                }
            }, {
                key: "overrideMimeType",
                value: function() {}
            }, {
                key: "send",
                value: function() {
                    var e = this, n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "";
                    if (this.readyState !== t.OPENED) throw new Error("Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
                    n = wx.request({
                        data: n,
                        url: l.get(this),
                        method: d.get(this),
                        header: f.get(this),
                        dataType: "other",
                        responseType: "arraybuffer" === this.responseType ? "arraybuffer" : "text",
                        timeout: this.timeout || void 0,
                        success: function(n) {
                            var o = n.data, r = n.statusCode, n = n.header;
                            switch (e.status = r, p.set(e, n), u.call(e, "loadstart"), s.call(e, t.HEADERS_RECEIVED), 
                            s.call(e, t.LOADING), e.responseType) {
                              case "json":
                                e.responseText = o;
                                try {
                                    e.response = JSON.parse(o);
                                } catch (n) {
                                    n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                                    e.response = null;
                                }
                                break;

                              case "":
                              case "text":
                                e.responseText = e.response = o;
                                break;

                              case "arraybuffer":
                                e.response = o, e.responseText = "";
                                for (var i = new Uint8Array(o), a = i.byteLength, c = 0; c < a; c++) e.responseText += String.fromCharCode(i[c]);
                                break;

                              default:
                                e.response = null;
                            }
                            s.call(e, t.DONE), u.call(e, "load"), u.call(e, "loadend");
                        },
                        fail: function(t) {
                            -1 !== (t = t.errMsg).indexOf("abort") ? u.call(e, "abort") : -1 !== t.indexOf("timeout") ? u.call(e, "timeout") : u.call(e, "error", t), 
                            u.call(e, "loadend");
                        }
                    }), h.set(this, n);
                }
            }, {
                key: "setRequestHeader",
                value: function(e, t) {
                    var n = f.get(this);
                    n[e] = t, f.set(this, n);
                }
            }, {
                key: "addEventListener",
                value: function(e, t) {
                    var n;
                    "function" == typeof t && ((n = this)["on" + e] = function(e) {
                        t.call(n, e);
                    });
                }
            } ], b = 0; b < v.length; b++) {
                var w = v[b];
                w.enumerable = w.enumerable || !1, w.configurable = !0, "value" in w && (w.writable = !0), 
                Object.defineProperty(y, w.key, w);
            }
            return t;
        }(t.default), (o.default = t).UNSEND = 0, t.OPENED = 1, t.HEADERS_RECEIVED = 2, 
        t.LOADING = 3, t.DONE = 4, n.exports = o.default;
    }, {
        "./EventTarget.js": 30
    } ],
    45: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function a() {
            var e;
            return "function" != typeof WeakMap ? null : (e = new WeakMap(), a = function() {
                return e;
            }, e);
        }
        Object.defineProperty(o, "__esModule", {
            value: !0
        }), o.default = void 0;
        var c = function(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" !== r(e) && "function" != typeof e) return {
                default: e
            };
            var t = a();
            if (t && t.has(e)) return t.get(e);
            var n, o, i = {}, c = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (n in e) Object.prototype.hasOwnProperty.call(e, n) && ((o = c ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set) ? Object.defineProperty(i, n, o) : i[n] = e[n]);
            return i.default = e, t && t.set(e, i), i;
        }(t("./window")), u = i(t("./HTMLElement")), s = i(t("./HTMLVideoElement")), l = i(t("./Image")), d = i(t("./Audio")), f = i(t("./Canvas"));
        t("./EventIniter/index.js");
        var p = {}, h = {
            readyState: "complete",
            visibilityState: "visible",
            documentElement: c,
            hidden: !1,
            style: {},
            location: c.location,
            ontouchstart: null,
            ontouchmove: null,
            ontouchend: null,
            head: new u.default("head"),
            body: new u.default("body"),
            createElement: function(e) {
                return "canvas" === e ? new f.default() : "audio" === e ? new d.default() : "img" === e ? new l.default() : "video" === e ? new s.default() : new u.default(e);
            },
            createElementNS: function(e, t) {
                return this.createElement(t);
            },
            getElementById: function(e) {
                return e === c.canvas.id ? c.canvas : null;
            },
            getElementsByTagName: function(e) {
                return "head" === e ? [ h.head ] : "body" === e ? [ h.body ] : "canvas" === e ? [ c.canvas ] : [];
            },
            getElementsByName: function(e) {
                return "head" === e ? [ h.head ] : "body" === e ? [ h.body ] : "canvas" === e ? [ c.canvas ] : [];
            },
            querySelector: function(e) {
                return "head" === e ? h.head : "body" === e ? h.body : "canvas" === e || e === "#".concat(c.canvas.id) ? c.canvas : null;
            },
            querySelectorAll: function(e) {
                return "head" === e ? [ h.head ] : "body" === e ? [ h.body ] : "canvas" === e ? [ c.canvas ] : [];
            },
            addEventListener: function(e, t) {
                p[e] || (p[e] = []), p[e].push(t);
            },
            removeEventListener: function(e, t) {
                var n = p[e];
                if (n && 0 < n.length) for (var o = n.length; o--; ) if (n[o] === t) {
                    n.splice(o, 1);
                    break;
                }
            },
            dispatchEvent: function(e) {
                var t = p[e.type];
                if (t) for (var n = 0; n < t.length; n++) t[n](e);
            }
        };
        o.default = h, n.exports = o.default;
    }, {
        "./Audio": 24,
        "./Canvas": 25,
        "./EventIniter/index.js": 29,
        "./HTMLElement": 34,
        "./HTMLVideoElement": 37,
        "./Image": 38,
        "./window": 51
    } ],
    46: [ function(t, n, o) {
        function r(t) {
            return (r = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
                return void 0 === t ? "undefined" : e(t);
            } : function(t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
            })(t);
        }
        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        function a() {
            var e;
            return "function" != typeof WeakMap ? null : (e = new WeakMap(), a = function() {
                return e;
            }, e);
        }
        var c = function(e) {
            if (e && e.__esModule) return e;
            if (null === e || "object" !== r(e) && "function" != typeof e) return {
                default: e
            };
            var t = a();
            if (t && t.has(e)) return t.get(e);
            var n, o, i = {}, c = Object.defineProperty && Object.getOwnPropertyDescriptor;
            for (n in e) Object.prototype.hasOwnProperty.call(e, n) && ((o = c ? Object.getOwnPropertyDescriptor(e, n) : null) && (o.get || o.set) ? Object.defineProperty(i, n, o) : i[n] = e[n]);
            return i.default = e, t && t.set(e, i), i;
        }(t("./window")), u = i(t("./document"));
        i(t("./HTMLElement"));
        var s = GameGlobal;
        if (!GameGlobal.__isAdapterInjected) if (GameGlobal.__isAdapterInjected = !0, c.document = u.default, 
        c.addEventListener = function(e, t) {
            c.document.addEventListener(e, t);
        }, c.removeEventListener = function(e, t) {
            c.document.removeEventListener(e, t);
        }, c.dispatchEvent = c.document.dispatchEvent, t = wx.getSystemInfoSync().platform, 
        "undefined" == typeof __devtoolssubcontext && "devtools" === t) {
            for (var l in c) {
                var d = Object.getOwnPropertyDescriptor(s, l);
                d && !0 !== d.configurable || Object.defineProperty(window, l, {
                    value: c[l]
                });
            }
            for (var f in c.document) {
                var p = Object.getOwnPropertyDescriptor(s.document, f);
                p && !0 !== p.configurable || Object.defineProperty(s.document, f, {
                    value: c.document[f]
                });
            }
            window.parent = window;
        } else {
            for (var h in c) s[h] = c[h];
            s.window = c, (window = s).top = window.parent = window;
        }
    }, {
        "./HTMLElement": 34,
        "./document": 45,
        "./window": 51
    } ],
    47: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, n.default = {
            get length() {
                return wx.getStorageInfoSync().keys.length;
            },
            key: function(e) {
                return wx.getStorageInfoSync().keys[e];
            },
            getItem: function(e) {
                return wx.getStorageSync(e);
            },
            setItem: function(e, t) {
                var n = null;
                try {
                    n = wx.setStorageSync(e, t);
                } catch (n) {
                    n = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(n);
                    n && n.toString && "function" == typeof n.toString && HSDK && HSDK.postAPMLog && HSDK.postAPMLog({
                        msg: n && n.toString(),
                        data: {
                            key: e,
                            value: t
                        }
                    });
                }
                return n;
            },
            removeItem: function(e) {
                wx.removeStorageSync(e);
            },
            clear: function() {
                wx.clearStorageSync();
            }
        }, t.exports = n.default;
    }, {} ],
    48: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0, n.default = {
            href: "game.js",
            reload: function() {}
        }, t.exports = n.default;
    }, {} ],
    49: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.default = void 0;
        var e = e("./util/index.js"), o = wx.getSystemInfoSync(), r = (console.log(o), o.system), i = o.platform, a = o.language, o = o.version, r = -1 !== r.toLowerCase().indexOf("android") ? "Android; CPU ".concat(r) : "iPhone; CPU iPhone OS ".concat(r, " like Mac OS X"), o = "Mozilla/5.0 (".concat(r, ") AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/").concat(o, " MiniGame NetType/WIFI Language/").concat(a), c = {
            platform: i,
            language: a,
            appVersion: "5.0 (".concat(r, ") AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"),
            userAgent: o,
            onLine: !0,
            geolocation: {
                getCurrentPosition: e.noop,
                watchPosition: e.noop,
                clearWatch: e.noop
            }
        };
        wx.onNetworkStatusChange && wx.onNetworkStatusChange(function(e) {
            c.onLine = e.isConnected;
        }), n.default = c, t.exports = n.default;
    }, {
        "./util/index.js": 50
    } ],
    50: [ function(e, t, n) {
        Object.defineProperty(n, "__esModule", {
            value: !0
        }), n.noop = function() {};
    }, {} ],
    51: [ function(e, t, n) {
        function o(e) {
            return e && e.__esModule ? e : {
                default: e
            };
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var r = {
            canvas: !0,
            setTimeout: !0,
            setInterval: !0,
            clearTimeout: !0,
            clearInterval: !0,
            requestAnimationFrame: !0,
            cancelAnimationFrame: !0,
            navigator: !0,
            XMLHttpRequest: !0,
            WebSocket: !0,
            Image: !0,
            ImageBitmap: !0,
            Audio: !0,
            FileReader: !0,
            HTMLElement: !0,
            HTMLImageElement: !0,
            HTMLCanvasElement: !0,
            HTMLMediaElement: !0,
            HTMLAudioElement: !0,
            HTMLVideoElement: !0,
            WebGLRenderingContext: !0,
            TouchEvent: !0,
            MouseEvent: !0,
            DeviceMotionEvent: !0,
            localStorage: !0,
            location: !0
        }, i = (Object.defineProperty(n, "navigator", {
            enumerable: !0,
            get: function() {
                return a.default;
            }
        }), Object.defineProperty(n, "XMLHttpRequest", {
            enumerable: !0,
            get: function() {
                return c.default;
            }
        }), Object.defineProperty(n, "WebSocket", {
            enumerable: !0,
            get: function() {
                return u.default;
            }
        }), Object.defineProperty(n, "Image", {
            enumerable: !0,
            get: function() {
                return s.default;
            }
        }), Object.defineProperty(n, "ImageBitmap", {
            enumerable: !0,
            get: function() {
                return l.default;
            }
        }), Object.defineProperty(n, "Audio", {
            enumerable: !0,
            get: function() {
                return d.default;
            }
        }), Object.defineProperty(n, "FileReader", {
            enumerable: !0,
            get: function() {
                return f.default;
            }
        }), Object.defineProperty(n, "HTMLElement", {
            enumerable: !0,
            get: function() {
                return p.default;
            }
        }), Object.defineProperty(n, "HTMLImageElement", {
            enumerable: !0,
            get: function() {
                return h.default;
            }
        }), Object.defineProperty(n, "HTMLCanvasElement", {
            enumerable: !0,
            get: function() {
                return m.default;
            }
        }), Object.defineProperty(n, "HTMLMediaElement", {
            enumerable: !0,
            get: function() {
                return g.default;
            }
        }), Object.defineProperty(n, "HTMLAudioElement", {
            enumerable: !0,
            get: function() {
                return y.default;
            }
        }), Object.defineProperty(n, "HTMLVideoElement", {
            enumerable: !0,
            get: function() {
                return v.default;
            }
        }), Object.defineProperty(n, "WebGLRenderingContext", {
            enumerable: !0,
            get: function() {
                return b.default;
            }
        }), Object.defineProperty(n, "TouchEvent", {
            enumerable: !0,
            get: function() {
                return w.TouchEvent;
            }
        }), Object.defineProperty(n, "MouseEvent", {
            enumerable: !0,
            get: function() {
                return w.MouseEvent;
            }
        }), Object.defineProperty(n, "DeviceMotionEvent", {
            enumerable: !0,
            get: function() {
                return w.DeviceMotionEvent;
            }
        }), Object.defineProperty(n, "localStorage", {
            enumerable: !0,
            get: function() {
                return _.default;
            }
        }), Object.defineProperty(n, "location", {
            enumerable: !0,
            get: function() {
                return E.default;
            }
        }), n.cancelAnimationFrame = n.requestAnimationFrame = n.clearInterval = n.clearTimeout = n.setInterval = n.setTimeout = n.canvas = void 0, 
        o(e("./Canvas"))), a = o(e("./navigator")), c = o(e("./XMLHttpRequest")), u = o(e("./WebSocket")), s = o(e("./Image")), l = o(e("./ImageBitmap")), d = o(e("./Audio")), f = o(e("./FileReader")), p = o(e("./HTMLElement")), h = o(e("./HTMLImageElement")), m = o(e("./HTMLCanvasElement")), g = o(e("./HTMLMediaElement")), y = o(e("./HTMLAudioElement")), v = o(e("./HTMLVideoElement")), b = o(e("./WebGLRenderingContext")), w = e("./EventIniter/index.js"), _ = o(e("./localStorage")), E = o(e("./location")), x = e("./WindowProperties");
        Object.keys(x).forEach(function(e) {
            "default" === e || "__esModule" === e || Object.prototype.hasOwnProperty.call(r, e) || e in n && n[e] === x[e] || Object.defineProperty(n, e, {
                enumerable: !0,
                get: function() {
                    return x[e];
                }
            });
        }), GameGlobal.screencanvas = GameGlobal.screencanvas || new i.default(), n.canvas = e = GameGlobal.screencanvas;
        var e = (i = GameGlobal).setTimeout, S = i.setInterval, N = i.clearTimeout, T = i.clearInterval, O = i.requestAnimationFrame, i = i.cancelAnimationFrame;
        n.cancelAnimationFrame = i, n.requestAnimationFrame = O, n.clearInterval = T, n.clearTimeout = N, 
        n.setInterval = S, n.setTimeout = e;
    }, {
        "./Audio": 24,
        "./Canvas": 25,
        "./EventIniter/index.js": 29,
        "./FileReader": 31,
        "./HTMLAudioElement": 32,
        "./HTMLCanvasElement": 33,
        "./HTMLElement": 34,
        "./HTMLImageElement": 35,
        "./HTMLMediaElement": 36,
        "./HTMLVideoElement": 37,
        "./Image": 38,
        "./ImageBitmap": 39,
        "./WebGLRenderingContext": 41,
        "./WebSocket": 42,
        "./WindowProperties": 43,
        "./XMLHttpRequest": 44,
        "./localStorage": 47,
        "./location": 48,
        "./navigator": 49
    } ],
    52: [ function(e, t, n) {
        cc.Texture2D && (cc.Texture2D.prototype._checkPackable = function() {
            var e, t, n = cc.dynamicAtlasManager;
            n && (this._isCompressed() || (e = this.width, t = this.height, !this._image) || e > n.maxFrameSize || t > n.maxFrameSize || this._getHash() !== n.Atlas.DEFAULT_HASH ? this._packable = !1 : this._image && this._image.getContext && (this._packable = !0));
        });
    }, {} ],
    53: [ function(e, t, n) {
        e("./VideoPlayer"), e("./pc-adapter"), e("./Texture2D");
    }, {
        "./Texture2D": 52,
        "./VideoPlayer": 1,
        "./pc-adapter": 54
    } ],
    54: [ function(e, t, n) {
        function o(e) {
            var t = e.key.toLowerCase(), e = e.code;
            return /^\d$/.test(t) || "delete" === t ? l[e] : s[t] || 0;
        }
        var r = wx.getSystemInfoSync(), i = cc.internal.inputManager, a = cc.internal.eventManager, c = cc.Event.EventKeyboard, u = cc.Event.EventMouse, s = {
            backspace: 8,
            tab: 9,
            enter: 13,
            shift: 16,
            control: 17,
            alt: 18,
            pause: 19,
            capslock: 20,
            escape: 27,
            " ": 32,
            pageup: 33,
            pagedown: 34,
            end: 35,
            home: 36,
            arrowleft: 37,
            arrowup: 38,
            arrowright: 39,
            arrowdown: 40,
            insert: 45,
            a: 65,
            b: 66,
            c: 67,
            d: 68,
            e: 69,
            f: 70,
            g: 71,
            h: 72,
            i: 73,
            j: 74,
            k: 75,
            l: 76,
            m: 77,
            n: 78,
            o: 79,
            p: 80,
            q: 81,
            r: 82,
            s: 83,
            t: 84,
            u: 85,
            v: 86,
            w: 87,
            x: 88,
            y: 89,
            z: 90,
            "*": 106,
            "+": 107,
            "-": 109,
            "/": 111,
            f1: 112,
            f2: 113,
            f3: 114,
            f4: 115,
            f5: 116,
            f6: 117,
            f7: 118,
            f8: 119,
            f9: 120,
            f10: 121,
            f11: 122,
            f12: 123,
            numlock: 144,
            scrolllock: 145,
            ";": 186,
            "=": 187,
            ",": 188,
            ".": 190,
            "`": 192,
            "[": 219,
            "\\": 220,
            "]": 221,
            "'": 222
        }, l = {
            Delete: 46,
            Digit0: 48,
            Digit1: 49,
            Digit2: 50,
            Digit3: 51,
            Digit4: 52,
            Digit5: 53,
            Digit6: 54,
            Digit7: 55,
            Digit8: 56,
            Digit9: 57,
            Numpad0: 96,
            Numpad1: 97,
            Numpad2: 98,
            Numpad3: 99,
            Numpad4: 100,
            Numpad5: 101,
            Numpad6: 102,
            Numpad7: 103,
            Numpad8: 104,
            Numpad9: 105,
            NumpadDecimal: 110
        };
        __globalAdapter.isSubContext || "windows" !== r.platform || (i.registerSystemEvent = function() {
            function e(e, n, o) {
                wx[e](function(e) {
                    var r = i.getMouseEvent(e, t, n);
                    r.setButton(e.button || 0), o(e, r), a.dispatchEvent(r);
                });
            }
            var t;
            this._isRegisterEvent || (this._glView = cc.view, wx.onKeyDown(function(e) {
                return a.dispatchEvent(new c(o(e), !0));
            }), wx.onKeyUp(function(e) {
                return a.dispatchEvent(new c(o(e), !1));
            }), t = {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }, e("onMouseDown", u.DOWN, function(e, n) {
                i._mousePressed = !0, i.handleTouchesBegin([ i.getTouchByXY(e.x, e.y, t) ]);
            }), e("onMouseUp", u.UP, function(e, n) {
                i._mousePressed = !1, i.handleTouchesEnd([ i.getTouchByXY(e.x, e.y, t) ]);
            }), e("onMouseMove", u.MOVE, function(e, n) {
                i.handleTouchesMove([ i.getTouchByXY(e.x, e.y, t) ]), i._mousePressed || n.setButton(null);
            }), e("onWheel", u.SCROLL, function(e, t) {
                t.setScrollData(0, -e.deltaY);
            }), this._isRegisterEvent = !0);
        });
    }, {} ],
    55: [ function(e, t, n) {}, {} ],
    56: [ function(e, t, n) {
        var o = wx.getFileSystemManager ? wx.getFileSystemManager() : null, r = /the maximum size of the file storage/, i = {
            fs: o,
            isOutOfStorage: function(e) {
                return r.test(e);
            },
            getUserDataPath: function() {
                return wx.env.USER_DATA_PATH;
            },
            checkFsValid: function() {
                return !!o || (console.warn("can not get the file system!"), !1);
            },
            deleteFile: function(e, t) {
                o.unlink({
                    filePath: e,
                    success: function() {
                        t && t(null);
                    },
                    fail: function(n) {
                        console.warn("Delete file failed: path: ".concat(e, " message: ").concat(n.errMsg)), 
                        t && t(new Error(n.errMsg));
                    }
                });
            },
            downloadFile: function e(t, n, o, r, a) {
                var c = {
                    url: t,
                    success: function(c) {
                        if (200 === c.statusCode) a && a(null, c.tempFilePath || c.filePath); else {
                            for (var u = void 0, s = void 0, l = 0, d = CDNS.length; l + 1 < d; l++) t.startsWith(CDNS[l]) && (u = CDNS[l], 
                            s = CDNS[l + 1]);
                            CDNSwitch && u && s ? (console.warn("CDN: " + u + " download error, switch new CDN: " + s), 
                            e(t.replace(u, s), n, o, r, a)) : (c.filePath && i.deleteFile(c.filePath), console.warn("Download file failed: path: ".concat(t, " message: ").concat(c.statusCode)), 
                            a && a(new Error(c.statusCode), null));
                        }
                    },
                    fail: function(i) {
                        for (var c = void 0, u = void 0, s = 0, l = CDNS.length; s + 1 < l; s++) t.startsWith(CDNS[s]) && (c = CDNS[s], 
                        u = CDNS[s + 1]);
                        CDNSwitch && c && u ? (console.warn("CDN: " + c + " download error, switch new CDN: " + u), 
                        e(t.replace(c, u), n, o, r, a)) : (console.warn("Download file failed: path: ".concat(t, " message: ").concat(i.errMsg)), 
                        a && a(new Error(i.errMsg), null));
                    }
                }, c = (n && (c.filePath = n), o && (c.header = o), wx.downloadFile(c));
                r && c.onProgressUpdate(r);
            },
            saveFile: function(e, t, n) {
                wx.saveFile({
                    tempFilePath: e,
                    filePath: t,
                    success: function(e) {
                        n && n(null);
                    },
                    fail: function(t) {
                        console.warn("Save file failed: path: ".concat(e, " message: ").concat(t.errMsg)), 
                        n && n(new Error(t.errMsg));
                    }
                });
            },
            copyFile: function(e, t, n) {
                o.copyFile({
                    srcPath: e,
                    destPath: t,
                    success: function() {
                        n && n(null);
                    },
                    fail: function(t) {
                        console.warn("Copy file failed: path: ".concat(e, " message: ").concat(t.errMsg)), 
                        n && n(new Error(t.errMsg));
                    }
                });
            },
            writeFile: function(e, t, n, r) {
                o.writeFile({
                    filePath: e,
                    encoding: n,
                    data: t,
                    success: function() {
                        r && r(null);
                    },
                    fail: function(t) {
                        console.warn("Write file failed: path: ".concat(e, " message: ").concat(t.errMsg)), 
                        r && r(new Error(t.errMsg));
                    }
                });
            },
            writeFileSync: function(e, t, n) {
                try {
                    return o.writeFileSync(e, t, n), null;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return console.warn("Write file failed: path: ".concat(e, " message: ").concat(t.message)), 
                    new Error(t.message);
                }
            },
            readFile: function(e, t, n) {
                o.readFile({
                    filePath: e,
                    encoding: t,
                    success: function(t) {
                        t.data && 0 !== t.data.byteLength ? n && n(null, t.data) : n && n(new Error("readFile:fail " + e + " corrupt"), null);
                    },
                    fail: function(t) {
                        console.warn("Read file failed: path: ".concat(e, " message: ").concat(t.errMsg)), 
                        n && n(new Error(t.errMsg), null);
                    }
                });
            },
            readDir: function(e, t) {
                o.readdir({
                    dirPath: e,
                    success: function(e) {
                        t && t(null, e.files);
                    },
                    fail: function(n) {
                        console.warn("Read directory failed: path: ".concat(e, " message: ").concat(n.errMsg)), 
                        t && t(new Error(n.errMsg), null);
                    }
                });
            },
            readText: function(e, t) {
                i.readFile(e, "utf8", t);
            },
            readArrayBuffer: function(e, t) {
                i.readFile(e, "", t);
            },
            readJson: function(e, t) {
                i.readFile(e, "utf8", function(n, o) {
                    var r = null;
                    if (!n) try {
                        r = JSON.parse(o);
                    } catch (o) {
                        o = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(o);
                        console.warn("Read json failed: path: ".concat(e, " message: ").concat(o.message)), 
                        n = new Error(o.message);
                    }
                    t && t(n, r);
                });
            },
            readJsonSync: function(e) {
                try {
                    var t = o.readFileSync(e, "utf8");
                    return JSON.parse(t);
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return console.warn("Read json failed: path: ".concat(e, " message: ").concat(t.message)), 
                    new Error(t.message);
                }
            },
            makeDirSync: function(e, t) {
                try {
                    return o.mkdirSync(e, t), null;
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return console.warn("Make directory failed: path: ".concat(e, " message: ").concat(t.message)), 
                    new Error(t.message);
                }
            },
            rmdirSync: function(e, t) {
                try {
                    o.rmdirSync(e, t);
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    return console.warn("rm directory failed: path: ".concat(e, " message: ").concat(t.message)), 
                    new Error(t.message);
                }
            },
            exists: function(e, t) {
                o.access({
                    path: e,
                    success: function() {
                        t && t(!0);
                    },
                    fail: function() {
                        t && t(!1);
                    }
                });
            },
            loadSubpackage: function(e, t, n) {
                var o = wx.loadSubpackage({
                    name: e,
                    success: function() {
                        n && n();
                    },
                    fail: function(t) {
                        console.warn("Load Subpackage failed: path: ".concat(e, " message: ").concat(t.errMsg)), 
                        n && n(new Error("Failed to load subpackage ".concat(e, ": ").concat(t.errMsg)));
                    }
                });
                return t && o.onProgressUpdate(t), o;
            },
            unzip: function(e, t, n) {
                o.unzip({
                    zipFilePath: e,
                    targetPath: t,
                    success: function() {
                        n && n(null);
                    },
                    fail: function(t) {
                        console.warn("unzip failed: path: ".concat(e, " message: ").concat(t.errMsg)), n && n(new Error("unzip failed: " + t.errMsg));
                    }
                });
            }
        };
        window.fsUtils = t.exports = i;
    }, {} ],
    57: [ function(e, t, n) {
        var o = window.__globalAdapter, r = wx.getSystemInfoSync(), i = o.adaptSys;
        Object.assign(o, {
            adaptSys: function(e) {
                var t;
                i.call(this, e), "windows" === r.platform ? (e.isMobile = !1, e.os = e.OS_WINDOWS) : o.isDevTool && (-1 < (t = r.system.toLowerCase()).indexOf("android") ? e.os = e.OS_ANDROID : -1 < t.indexOf("ios") && (e.os = e.OS_IOS)), 
                wx.getOpenDataContext ? e.platform = e.WECHAT_GAME : e.platform = e.WECHAT_GAME_SUB, 
                e.getSafeAreaRect = function() {
                    var e = cc.view, t = o.getSafeArea(), n = e.getFrameSize(), r = new cc.Vec2(t.left, t.bottom), t = new cc.Vec2(t.right, t.top), n = {
                        left: 0,
                        top: 0,
                        width: n.width,
                        height: n.height
                    };
                    return e.convertToLocationInView(r.x, r.y, n, r), e.convertToLocationInView(t.x, t.y, n, t), 
                    e._convertPointWithScale(r), e._convertPointWithScale(t), cc.rect(r.x, r.y, t.x - r.x, t.y - r.y);
                };
            }
        });
    }, {} ],
    58: [ function(e, t, n) {
        var o, r, i, a, c, u, s, e = e("../../../common/utils");
        window.__globalAdapter && (o = window.__globalAdapter, i = (r = wx.getSystemInfoSync()).windowWidth, 
        c = (a = r.windowHeight) < i, o.isSubContext = void 0 === wx.getOpenDataContext, 
        o.isDevTool = "devtools" === r.platform, e.cloneMethod(o, wx, "getSystemInfoSync"), 
        e.cloneMethod(o, wx, "onTouchStart"), e.cloneMethod(o, wx, "onTouchMove"), e.cloneMethod(o, wx, "onTouchEnd"), 
        e.cloneMethod(o, wx, "onTouchCancel"), e.cloneMethod(o, wx, "createInnerAudioContext"), 
        e.cloneMethod(o, wx, "onAudioInterruptionEnd"), e.cloneMethod(o, wx, "onAudioInterruptionBegin"), 
        e.cloneMethod(o, wx, "createVideo"), e.cloneMethod(o, wx, "setPreferredFramesPerSecond"), 
        e.cloneMethod(o, wx, "showKeyboard"), e.cloneMethod(o, wx, "hideKeyboard"), e.cloneMethod(o, wx, "updateKeyboard"), 
        e.cloneMethod(o, wx, "onKeyboardInput"), e.cloneMethod(o, wx, "onKeyboardConfirm"), 
        e.cloneMethod(o, wx, "onKeyboardComplete"), e.cloneMethod(o, wx, "offKeyboardInput"), 
        e.cloneMethod(o, wx, "offKeyboardConfirm"), e.cloneMethod(o, wx, "offKeyboardComplete"), 
        e.cloneMethod(o, wx, "getOpenDataContext"), e.cloneMethod(o, wx, "onMessage"), e.cloneMethod(o, wx, "getSharedCanvas"), 
        e.cloneMethod(o, wx, "loadFont"), e.cloneMethod(o, wx, "onShow"), e.cloneMethod(o, wx, "onHide"), 
        e.cloneMethod(o, wx, "onError"), e.cloneMethod(o, wx, "offError"), u = !1, s = 1, 
        wx.onDeviceOrientationChange && wx.onDeviceOrientationChange(function(e) {
            "landscape" === e.value ? s = 1 : "landscapeReverse" === e.value && (s = -1);
        }), Object.assign(o, {
            startAccelerometer: function(e) {
                u ? wx.startAccelerometer && wx.startAccelerometer({
                    fail: function(e) {
                        console.error("start accelerometer failed", e);
                    }
                }) : (u = !0, wx.onAccelerometerChange && wx.onAccelerometerChange(function(t) {
                    var n, o = {}, r = t.x, i = t.y;
                    c && (n = r, r = -i, i = n), o.x = r * s, o.y = i * s, o.z = t.z, e && e(o);
                }));
            },
            stopAccelerometer: function() {
                wx.stopAccelerometer && wx.stopAccelerometer({
                    fail: function(e) {
                        console.error("stop accelerometer failed", e);
                    }
                });
            }
        }), o.getSafeArea = function() {
            var e, t = (l = r.safeArea).top, n = l.left, i = l.bottom, u = l.right, s = l.width, l = l.height;
            return "ios" === r.platform && !o.isDevTool && c && (t = a - (e = [ u, t, n, i, s, l ])[0], 
            n = e[1], i = a - e[2], u = e[3], l = e[4], s = e[5]), {
                top: t,
                left: n,
                bottom: i,
                right: u,
                width: s,
                height: l
            };
        });
    }, {
        "../../../common/utils": 18
    } ]
}, {}, [ 23 ]);