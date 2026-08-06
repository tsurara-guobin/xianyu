var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};

!function(e) {
    function n(t) {
        if (r[t]) return r[t].exports;
        var i = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }
    var r = {};
    n.m = e, n.c = r, n.d = function(t, e, r) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        });
    }, n.t = function(e, r) {
        if (1 & r && (e = n(e)), 8 & r) return e;
        if (4 & r && "object" == (void 0 === e ? "undefined" : t(e)) && e && e.__esModule) return e;
        var i = Object.create(null);
        if (n.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }), 2 & r && "string" != typeof e) for (var o in e) n.d(i, o, function(t) {
            return e[t];
        }.bind(null, o));
        return i;
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t.default;
        } : function() {
            return t;
        };
        return n.d(e, "a", e), e;
    }, n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 0);
}([ function(e, n, r) {
    function i(e) {
        return (i = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function o(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (o = r.key, a = void 0, a = function(t, e) {
                if ("object" !== i(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== i(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(o, "string"), "symbol" === i(a) ? a : String(a)), r);
        }
        var o, a;
    }
    function a(e) {
        return (a = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function u(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== a(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== a(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === a(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function c(e) {
        return (c = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function s(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== c(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== c(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === c(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function l(e) {
        return (l = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function f(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== l(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== l(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === l(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function h(t, e) {
        return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function y(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = d(t);
            if (e) {
                var i = d(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return p(this, n);
        };
    }
    function p(t, e) {
        if (e && ("object" === l(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return v(t);
    }
    function v(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function d(t) {
        return (d = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function b(e) {
        return (b = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function m(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== b(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== b(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === b(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function g(e) {
        return (g = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function w(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== g(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== g(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === g(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function _(t, e) {
        return (_ = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function x(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = k(t);
            if (e) {
                var i = k(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return S(this, n);
        };
    }
    function S(t, e) {
        if (e && ("object" === g(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function k(t) {
        return (k = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function O(e) {
        return (O = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function j(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== O(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== O(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === O(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function P(t, e) {
        return (P = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function T(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = C(t);
            if (e) {
                var i = C(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return E(this, n);
        };
    }
    function E(t, e) {
        if (e && ("object" === O(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function C(t) {
        return (C = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function R(e) {
        return (R = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function D(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== R(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== R(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === R(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function L(t, e) {
        return (L = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function M(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = A(t);
            if (e) {
                var i = A(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return $(this, n);
        };
    }
    function $(t, e) {
        if (e && ("object" === R(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function A(t) {
        return (A = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function I(e) {
        return (I = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function Y(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== I(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== I(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === I(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function B() {
        return (B = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
            var r = z(t, e);
            if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(arguments.length < 3 ? t : n) : i.value;
            }
        }).apply(this, arguments);
    }
    function z(t, e) {
        for (;!Object.prototype.hasOwnProperty.call(t, e) && null !== (t = X(t)); ) ;
        return t;
    }
    function H(t, e) {
        return (H = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function F(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = X(t);
            if (e) {
                var i = X(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return N(this, n);
        };
    }
    function N(t, e) {
        if (e && ("object" === I(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function X(t) {
        return (X = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function W(e) {
        return (W = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function K(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== W(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== W(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === W(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function U(t, e) {
        return (U = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function V(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = G(t);
            if (e) {
                var i = G(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return q(this, n);
        };
    }
    function q(t, e) {
        if (e && ("object" === W(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function G(t) {
        return (G = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function J(e) {
        return (J = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function Q(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== J(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== J(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === J(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function Z(t, e) {
        return (Z = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function tt(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = nt(t);
            if (e) {
                var i = nt(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return et(this, n);
        };
    }
    function et(t, e) {
        if (e && ("object" === J(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function nt(t) {
        return (nt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function rt(t) {
        this._events = this._events || {}, this.__mixinEvent__ = !0;
    }
    function it(t) {
        var e = this;
        this.__mixinTouchEvent__ || (this.__mixinTouchEvent__ = !0, this.__mixinEvent__ || this.mixin(rt), 
        this.touchLayer = 10, t && t.$touchMixin && null != t.$touchMixin.layer && (this.touchLayer = t.$touchMixin.layer), 
        this.on("enter", function() {
            e.engine.touchManager.addLayer(e.touchLayer, e);
        }), this.on("exit", function() {
            e.engine.touchManager.removeLayer(e);
        }));
    }
    function ot(e) {
        return (ot = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function at(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== ot(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== ot(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === ot(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function ut(e) {
        return (ut = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function ct(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== ut(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== ut(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === ut(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function st(t, e) {
        return (st = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function lt(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = ht(t);
            if (e) {
                var i = ht(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return ft(this, n);
        };
    }
    function ft(t, e) {
        if (e && ("object" === ut(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function ht(t) {
        return (ht = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function yt(e) {
        return (yt = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function pt(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function vt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== yt(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== yt(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === yt(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function dt(t, e, n) {
        return e && vt(t.prototype, e), n && vt(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function bt(e) {
        return (bt = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function mt(t, e) {
        var n = "undefined" != typeof Symbol && t[Symbol.iterator] || t["@@iterator"];
        if (!n) {
            if (Array.isArray(t) || (n = function(t, e) {
                if (t) {
                    if ("string" == typeof t) return gt(t, e);
                    var n = Object.prototype.toString.call(t).slice(8, -1);
                    return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? gt(t, e) : void 0;
                }
            }(t)) || e && t && "number" == typeof t.length) {
                n && (t = n);
                var r = 0, i = function() {};
                return {
                    s: i,
                    n: function() {
                        return r >= t.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: t[r++]
                        };
                    },
                    e: function(t) {
                        throw t;
                    },
                    f: i
                };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        var o, a = !0, u = !1;
        return {
            s: function() {
                n = n.call(t);
            },
            n: function() {
                var t = n.next();
                return a = t.done, t;
            },
            e: function(t) {
                u = !0, o = t;
            },
            f: function() {
                try {
                    a || null == n.return || n.return();
                } finally {
                    if (u) throw o;
                }
            }
        };
    }
    function gt(t, e) {
        (null == e || e > t.length) && (e = t.length);
        for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
        return r;
    }
    function wt(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function _t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== bt(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== bt(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === bt(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function xt(t, e, n) {
        return e && _t(t.prototype, e), n && _t(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function St(e) {
        return (St = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function kt(t, e) {
        var n = Object.keys(t);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(t);
            e && (r = r.filter(function(e) {
                return Object.getOwnPropertyDescriptor(t, e).enumerable;
            })), n.push.apply(n, r);
        }
        return n;
    }
    function Ot(t) {
        for (var e = 1; e < arguments.length; e++) {
            var n = null != arguments[e] ? arguments[e] : {};
            e % 2 ? kt(Object(n), !0).forEach(function(e) {
                jt(t, e, n[e]);
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n)) : kt(Object(n)).forEach(function(e) {
                Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(n, e));
            });
        }
        return t;
    }
    function jt(t, e, n) {
        return (e = Tt(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t;
    }
    function Pt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, Tt(r.key), r);
        }
    }
    function Tt(t) {
        var e = function(t, e) {
            if ("object" !== St(t) || null === t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(t, e);
                if ("object" !== St(r)) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(t);
        }(t, "string");
        return "symbol" === St(e) ? e : String(e);
    }
    function Et(t, e) {
        return (Et = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function Ct(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = Lt(t);
            if (e) {
                var i = Lt(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return Rt(this, n);
        };
    }
    function Rt(t, e) {
        if (e && ("object" === St(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return Dt(t);
    }
    function Dt(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function Lt(t) {
        return (Lt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function Mt(e) {
        return (Mt = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function $t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== Mt(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== Mt(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === Mt(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function At(e) {
        return (At = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function It(t, e, n) {
        return (e = Bt(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t;
    }
    function Yt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, Bt(r.key), r);
        }
    }
    function Bt(t) {
        var e = function(t, e) {
            if ("object" !== At(t) || null === t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(t, e);
                if ("object" !== At(r)) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(t);
        }(t, "string");
        return "symbol" === At(e) ? e : String(e);
    }
    function zt(t, e) {
        return (zt = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function Ht(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = Xt(t);
            if (e) {
                var i = Xt(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return Ft(this, n);
        };
    }
    function Ft(t, e) {
        if (e && ("object" === At(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return Nt(t);
    }
    function Nt(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function Xt(t) {
        return (Xt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function Wt(e) {
        return (Wt = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function Kt(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== Wt(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== Wt(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === Wt(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function Ut(t, e) {
        return (Ut = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function Vt(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = Jt(t);
            if (e) {
                var i = Jt(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return qt(this, n);
        };
    }
    function qt(t, e) {
        if (e && ("object" === Wt(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return Gt(t);
    }
    function Gt(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function Jt(t) {
        return (Jt = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function Qt(e) {
        return (Qt = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function Zt(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function te(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== Qt(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== Qt(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === Qt(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function ee(t, e, n) {
        return e && te(t.prototype, e), n && te(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function ne(e) {
        return (ne = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function re(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== ne(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== ne(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === ne(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function ie(t, e) {
        return (ie = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function oe(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = ue(t);
            if (e) {
                var i = ue(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return ae(this, n);
        };
    }
    function ae(t, e) {
        if (e && ("object" === ne(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return function(t) {
            if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return t;
        }(t);
    }
    function ue(t) {
        return (ue = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function ce(e) {
        return (ce = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function se(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
    }
    function le(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== ce(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== ce(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === ce(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function fe(t, e, n) {
        return e && le(t.prototype, e), n && le(t, n), Object.defineProperty(t, "prototype", {
            writable: !1
        }), t;
    }
    function he(e) {
        return (he = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function ye(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== he(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== he(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === he(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function pe() {
        return (pe = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
            var r = ve(t, e);
            if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(arguments.length < 3 ? t : n) : i.value;
            }
        }).apply(this, arguments);
    }
    function ve(t, e) {
        for (;!Object.prototype.hasOwnProperty.call(t, e) && null !== (t = we(t)); ) ;
        return t;
    }
    function de(t, e) {
        return (de = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function be(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = we(t);
            if (e) {
                var i = we(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return me(this, n);
        };
    }
    function me(t, e) {
        if (e && ("object" === he(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return ge(t);
    }
    function ge(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function we(t) {
        return (we = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function _e(e) {
        return (_e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function xe(t, e, n) {
        return (e = ke(e)) in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t;
    }
    function Se(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, ke(r.key), r);
        }
    }
    function ke(t) {
        var e = function(t, e) {
            if ("object" !== _e(t) || null === t) return t;
            var n = t[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(t, e);
                if ("object" !== _e(r)) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return String(t);
        }(t, "string");
        return "symbol" === _e(e) ? e : String(e);
    }
    function Oe(t, e) {
        return (Oe = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function je(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = Ee(t);
            if (e) {
                var i = Ee(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return Pe(this, n);
        };
    }
    function Pe(t, e) {
        if (e && ("object" === _e(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return Te(t);
    }
    function Te(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function Ee(t) {
        return (Ee = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function Ce(e) {
        return (Ce = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function Re(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== Ce(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== Ce(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === Ce(o) ? o : String(o)), r);
        }
        var i, o;
    }
    function De() {
        return (De = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function(t, e, n) {
            var r = Le(t, e);
            if (r) {
                var i = Object.getOwnPropertyDescriptor(r, e);
                return i.get ? i.get.call(arguments.length < 3 ? t : n) : i.value;
            }
        }).apply(this, arguments);
    }
    function Le(t, e) {
        for (;!Object.prototype.hasOwnProperty.call(t, e) && null !== (t = Ye(t)); ) ;
        return t;
    }
    function Me(t, e) {
        return (Me = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
            return t.__proto__ = e, t;
        })(t, e);
    }
    function $e(t) {
        var e = function() {
            if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
            if (Reflect.construct.sham) return !1;
            if ("function" == typeof Proxy) return !0;
            try {
                return Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {})), 
                !0;
            } catch (t) {
                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                return !1;
            }
        }();
        return function() {
            var n, r = Ye(t);
            if (e) {
                var i = Ye(this).constructor;
                n = Reflect.construct(r, arguments, i);
            } else n = r.apply(this, arguments);
            return Ae(this, n);
        };
    }
    function Ae(t, e) {
        if (e && ("object" === Ce(e) || "function" == typeof e)) return e;
        if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
        return Ie(t);
    }
    function Ie(t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
    }
    function Ye(t) {
        return (Ye = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
            return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
    }
    function Be(e) {
        return (Be = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
            return void 0 === e ? "undefined" : t(e);
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
        })(e);
    }
    function ze(t, e) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
            Object.defineProperty(t, (i = r.key, o = void 0, o = function(t, e) {
                if ("object" !== Be(t) || null === t) return t;
                var n = t[Symbol.toPrimitive];
                if (void 0 !== n) {
                    var r = n.call(t, e);
                    if ("object" !== Be(r)) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                }
                return String(t);
            }(i, "string"), "symbol" === Be(o) ? o : String(o)), r);
        }
        var i, o;
    }
    r.r(n);
    var He = function() {
        function t(e) {
            if (function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this._init = e, this._children = [], this._parent = null, this.x = 0, 
            this.y = 0, this.width = 0, this.height = 0, this._active = !0, this.visible = !0, 
            this.engine = null, this.__mixin__) for (var n = 0; n < this.__mixin__.length; n++) this.__mixin__[n].call(this, e);
            if (e) for (var r in e) "$" != r[0] && (this[r] = e[r]);
        }
        var e, n;
        return e = t, (n = [ {
            key: "active",
            get: function() {
                return this._active;
            },
            set: function(t) {
                this._active != t && (this._active = t, this.engine && (t ? this._callOnEnter(this.engine) : t || this._callOnExit(this.engine)));
            }
        }, {
            key: "addChild",
            value: function(t) {
                this._children.push(t), t._parent = this, this._active && this.engine && (t._callOnEnter(this.engine), 
                t._callResize(this.width, this.height)), this.onAddChild && this.onAddChild(t);
            }
        }, {
            key: "removeChild",
            value: function(t) {
                var e = this._children.indexOf(t);
                -1 != e && (this._children.splice(e, 1), this._active && this.engine && t._callOnExit(null), 
                this.onRemoveChild && this.onRemoveChild(t));
            }
        }, {
            key: "removeAllChildren",
            value: function() {
                for (;this._children.length; ) {
                    var t = this._children.shift();
                    this._active && this.engine && t._callOnExit(null), this.onRemoveChild && this.onRemoveChild(t);
                }
            }
        }, {
            key: "removeFromParent",
            value: function() {
                null !== this._parent && this._parent.removeChild(this);
            }
        }, {
            key: "_callOnEnter",
            value: function(t) {
                if (this.engine = t, this._active) {
                    for (var e = 0; e < this._children.length; e++) this._children[e]._callOnEnter(t);
                    this.onEnter && this.onEnter(), this.__mixinEvent__ && this.emit("enter");
                }
            }
        }, {
            key: "_callOnExit",
            value: function(t) {
                if (this._active) {
                    this.onExit && this.onExit(), this.__mixinEvent__ && this.emit("exit");
                    for (var e = 0; e < this._children.length; e++) this._children[e]._callOnExit(t);
                    this.engine = t;
                }
            }
        }, {
            key: "_callUpdate",
            value: function(t) {
                for (var e = 0; e < this._children.length; e++) this._children[e]._callUpdate(t);
                this.update && this.update(t);
            }
        }, {
            key: "_render",
            value: function(t, e, n, r, i, o, a) {
                if (this.active) {
                    this.render && this.render(t, e, n, r, i, this.x + o, this.y + a);
                    for (var u = 0; u < this._children.length; u++) {
                        var c = this._children[u];
                        c.visible && c._render(t, e, n, r, i, this.x + o, this.y + a);
                    }
                }
            }
        }, {
            key: "mixin",
            value: function(t) {
                this.__proto__ = {
                    __proto__: this.__proto__
                }, Object.assign(this.__proto__, t.prototype), t.call(this, this._init);
            }
        }, {
            key: "localToGlobal",
            value: function(t, e) {
                return null == this._parent ? {
                    x: 0,
                    y: 0
                } : this._parent.localToGlobal(this.x + t, this.y + e);
            }
        }, {
            key: "globalToLocal",
            value: function(t, e) {
                if (null == this._parent) return {
                    x: 0,
                    y: 0
                };
                var n = this._parent.globalToLocal(t, e);
                return {
                    x: n.x - this.x,
                    y: n.y - this.y
                };
            }
        }, {
            key: "isInside",
            value: function(t, e) {
                return t > 0 && t < this.width && e > 0 && e < this.height;
            }
        }, {
            key: "_callResize",
            value: function(t, e) {
                this.resize && this.resize(t, e);
                for (var n = 0; n < this._children.length; n++) this._children[n]._callResize(this.width, this.height);
                this.__mixinEvent__ && this.emit("resize");
            }
        } ]) && o(e.prototype, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }(), Fe = function() {
        function t() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.$bitmapX = 0, this.$bitmapY = 0, this.$bitmapWidth = 0, this.$bitmapHeight = 0, 
            this.$offsetX = 0, this.$offsetY = 0, this.$textureWidth = 0, this.$textureHeight = 0, 
            this.$sourceWidth = 0, this.$sourceHeight = 0, this.$bitmapData = null, this.patch9 = null;
        }
        var e, n;
        return e = t, (n = [ {
            key: "imgae",
            get: function() {
                return this.$bitmapData;
            },
            set: function(t) {
                this.$bitmapData = t;
                var e = t.width, n = t.height;
                this.$initData(0, 0, e, n, 0, 0, e, n, t.width, t.height);
            }
        }, {
            key: "$initData",
            value: function(t, e, n, r, i, o, a, u, c, s) {
                this.$bitmapX = t, this.$bitmapY = e, this.$bitmapWidth = n, this.$bitmapHeight = r, 
                this.$offsetX = i, this.$offsetY = o, this.$textureWidth = a, this.$textureHeight = u, 
                this.$sourceWidth = c, this.$sourceHeight = s;
            }
        }, {
            key: "render",
            value: function(t, e, n, r, i, o) {
                var a = this.$bitmapData;
                if (e = e || this.patch9, n = n || this.$textureWidth, r = r || this.$textureHeight, 
                e) {
                    var u = this.$bitmapX, c = this.$bitmapY, s = this.$bitmapWidth, l = this.$bitmapHeight, f = this.$offsetX, h = this.$offsetY, y = n, p = r;
                    n -= this.$textureWidth - s, r -= this.$textureHeight - l;
                    var v = e.x - f, d = e.y - h, b = v, m = d, g = e.w, w = e.h;
                    0 == w && (w = 1, m >= l && m--), 0 == g && (g = 1, b >= s && b--);
                    var _ = u, x = _ + b, S = x + g, k = s - b - g, O = c, j = O + m, P = j + w, T = l - m - w, E = k, C = T, R = f + (i || 0), D = R + v, L = R + (y - E), M = y - v - E, $ = h + (o || 0), A = $ + d, I = $ + p - C, Y = p - d - C;
                    m > 0 && (b > 0 && t.drawImage(a, _, O, b, m, R, $, v, d), g > 0 && t.drawImage(a, x, O, g, m, D, $, M, d), 
                    k > 0 && t.drawImage(a, S, O, k, m, L, $, E, d)), w > 0 && (b > 0 && t.drawImage(a, _, j, b, w, R, A, v, Y), 
                    g > 0 && t.drawImage(a, x, j, g, w, D, A, M, Y), k > 0 && t.drawImage(a, S, j, k, w, L, A, E, Y)), 
                    T > 0 && (b > 0 && t.drawImage(a, _, P, b, T, R, I, v, C), g > 0 && t.drawImage(a, x, P, g, T, D, I, M, C), 
                    k > 0 && t.drawImage(a, S, P, k, T, L, I, E, C));
                } else {
                    var B = n / this.$textureWidth, z = r / this.$textureHeight;
                    t.drawImage(a, this.$bitmapX, this.$bitmapY, this.$bitmapWidth, this.$bitmapHeight, B * this.$offsetX + (i || 0), z * this.$offsetY + (o || 0), B * this.$bitmapWidth, z * this.$bitmapHeight);
                }
            }
        }, {
            key: "width",
            get: function() {
                return this.$textureWidth;
            }
        }, {
            key: "height",
            get: function() {
                return this.$textureHeight;
            }
        } ]) && u(e.prototype, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }(), Ne = function() {
        function t(e, n) {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this._textureMap = Object.create(null), this.$texture = e, this._bitmapX = e.$bitmapX - e.$offsetX, 
            this._bitmapY = e.$bitmapY - e.$offsetY, n && this.parse(n);
        }
        var e, n;
        return e = t, (n = [ {
            key: "getTexture",
            value: function(t) {
                return this._textureMap[t];
            }
        }, {
            key: "parse",
            value: function(t) {
                console.log("  parse config");
                var e = t.frames;
                for (var n in e) {
                    t = e[n];
                    var r = this.createTexture(n, t.x, t.y, t.w, t.h, t.offX, t.offY, t.sourceW, t.sourceH);
                    if (t.scale9grid) {
                        var i = t.scale9grid;
                        console.log(i);
                        var o = i.split(",");
                        r.patch9 = {
                            x: parseInt(o[0]),
                            y: parseInt(o[1]),
                            w: parseInt(o[2]),
                            h: parseInt(o[3])
                        };
                    }
                }
            }
        }, {
            key: "createTexture",
            value: function(t, e, n, r, i, o, a, u, c) {
                void 0 === o && (o = 0), void 0 === a && (a = 0), void 0 === u && (u = o + r), void 0 === c && (c = a + i);
                var s = new Fe();
                return s.$bitmapData = this.$texture.$bitmapData, s.$initData(this._bitmapX + e, this._bitmapY + n, r, i, o, a, u, c, this.$texture.$sourceWidth, this.$texture.$sourceHeight), 
                this._textureMap[t] = s, s;
            }
        } ]) && s(e.prototype, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }(), Xe = function(t) {
        function e(t, n) {
            var r;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (r = i.call(this, t)).firstCharHeight = 0, r.charList = n.frames, p(r, v(r));
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && h(t, e);
        }(e, Ne);
        var n, r, i = y(e);
        return n = e, (r = [ {
            key: "getTexture",
            value: function(t) {
                var e = this._textureMap[t];
                if (!e) {
                    var n = this.charList[t];
                    if (!n) return null;
                    e = this.createTexture(t, n.x, n.y, n.w, n.h, n.offX, n.offY, n.sourceW, n.sourceH), 
                    this._textureMap[t] = e;
                }
                return e;
            }
        }, {
            key: "getConfig",
            value: function(t, e) {
                return this.charList[t] ? this.charList[t][e] : 0;
            }
        }, {
            key: "_getFirstCharHeight",
            value: function() {
                if (0 == this.firstCharHeight) for (var t in this.charList) {
                    var e = this.charList[t];
                    if (e) {
                        var n = e.sourceH;
                        if (void 0 === n) {
                            var r = e.h;
                            void 0 === r && (r = 0);
                            var i = e.offY;
                            void 0 === i && (i = 0), n = r + i;
                        }
                        if (n <= 0) continue;
                        this.firstCharHeight = n;
                        break;
                    }
                }
                return this.firstCharHeight;
            }
        } ]) && f(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(), We = null, Ke = function() {
        function t() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this._cache = {}, this._loading = {}, this._sheetConfig = {}, this._img2Sheet = {};
        }
        var e, n, r;
        return e = t, r = [ {
            key: "instance",
            get: function() {
                return We || (We = new t()), We;
            }
        } ], (n = [ {
            key: "setSheetConfig",
            value: function(t) {
                for (var e in t) {
                    var n = t[e];
                    this._sheetConfig[e] = n;
                    var r = n.frames;
                    for (var i in r) this._img2Sheet[i] = e;
                }
            }
        }, {
            key: "loadImgAuto",
            value: function(t) {
                if (this._cache[t]) return this._cache[t];
                var e = wx.createImage();
                return e.src = this.getResUrlByConfig(t), this._cache[t] = e, e;
            }
        }, {
            key: "loadImgAsync",
            value: function(t) {
                var e = this, n = this.getCache(t);
                if (n) return n;
                var r = this._img2Sheet[t];
                if (r) return this.loadImgInSheetAsync(r, t);
                var i = wx.createImage();
                i.src = this.getResUrlByConfig(t);
                var o = new Promise(function(n) {
                    i.onload = function() {
                        delete e._loading[t];
                        var r = new Fe();
                        r.imgae = i, e._cache[t] = r, n(r);
                    };
                });
                return this._loading[t] = o, o;
            }
        }, {
            key: "loadSheetAsync",
            value: function(t) {
                return this._loadSheetAsync(t, Ne);
            }
        }, {
            key: "loadImgInSheetAsync",
            value: function(t, e) {
                return this.loadSheetAsync(t).then(function(t) {
                    return t.getTexture(e);
                });
            }
        }, {
            key: "loadFontAsync",
            value: function(t) {
                return this._loadSheetAsync(t, Xe);
            }
        }, {
            key: "_loadSheetAsync",
            value: function(t, e) {
                var n = this, r = this.getCache(t);
                if (r) return r;
                var i = this._sheetConfig[t];
                if (!i) throw "can't find sheet config: ".concat(t);
                var o = i.file, a = t.lastIndexOf("/"), u = t.replace(t.substring(a + 1), o), c = this.loadImgAsync(u).then(function(r) {
                    delete n._loading[t];
                    var o = new e(r, i);
                    return n._cache[t] = o, o;
                }).catch(function(e) {
                    throw delete n._loading[t], "load sheet error: ".concat(t, " err: ").concat(e);
                });
                return this._loading[t] = c, c;
            }
        }, {
            key: "getCache",
            value: function(t) {
                return this._cache[t] ? Promise.resolve(this._cache[t]) : this._loading[t] ? this._loading[t] : void 0;
            }
        }, {
            key: "getResUrlByConfig",
            value: function(t) {
                return -1 == t.indexOf("http") && -1 == t.indexOf("png") ? "odc/static/".concat(t, ".png") : t;
            }
        } ]) && m(e.prototype, n), r && m(e, r), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }(), Ue = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).image = n.image || null, n.patch9 = n.patch9 || null, 
            n.autoSize = void 0 === n.autoSize || n.autoSize, n.ax = n.ax || 0, n.ay = n.ay || 0, 
            n.scaleX = n.scaleX || 1, n.scaleY = n.scaleY || 1, n._source = n._source || "", 
            n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && _(t, e);
        }(e, t);
        var n, r, i = x(e);
        return n = e, (r = [ {
            key: "render",
            value: function(t, e, n, r, i, o, a) {
                if (this.image) {
                    var u = this.width * this.scaleX, c = this.height * this.scaleY;
                    o -= u * this.ax, a -= c * this.ay, t.setTransform(e, n, r, i, o, a), this.image.render(t, this.patch9, u, c);
                }
            }
        }, {
            key: "fitImgSize",
            value: function() {
                this.width = this.image.width, this.height = this.image.height;
            }
        }, {
            key: "wait",
            value: function(t, e) {
                var n = this;
                return t.then(function(t) {
                    n.image = t, (e || n.autoSize) && n.fitImgSize();
                });
            }
        }, {
            key: "source",
            set: function(t) {
                var e = this;
                this._source = t, Ke.instance.loadImgAsync(t).then(function(n) {
                    e._source === t && (e.image = n, e.autoSize && e.fitImgSize());
                });
            }
        } ]) && w(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), Ve = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t))._font = n.font || null, n.ax = n.ax || 0, n.ay = n.ay || 0, 
            n.scaleX = n.scaleX || 1, n.scaleY = n.scaleY || 1, n._textures = void 0, n._letterSpacing = 0, 
            n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && P(t, e);
        }(e, t);
        var n, r, i = T(e);
        return n = e, (r = [ {
            key: "text",
            get: function() {
                return this._text;
            },
            set: function(t) {
                this._text = t.toString(), this.updateTextures();
            }
        }, {
            key: "font",
            get: function() {
                return this._font;
            },
            set: function(t) {
                this._font = t, this.updateTextures();
            }
        }, {
            key: "letterSpacing",
            get: function() {
                return this._letterSpacing;
            },
            set: function(t) {
                this._letterSpacing = t, this.updateSize();
            }
        }, {
            key: "source",
            set: function(t) {
                this.wait(Ke.instance.loadFontAsync(t));
            }
        }, {
            key: "updateTextures",
            value: function() {
                if (this._textures = void 0, this.text && this.font) {
                    var t = this.font;
                    this._textures = this.text.split("").map(function(e) {
                        return t.getTexture(e);
                    }).filter(function(t) {
                        return !!t;
                    }), this.updateSize();
                }
            }
        }, {
            key: "updateSize",
            value: function() {
                var t = this._textures, e = t.length;
                if (e) {
                    var n = 0, r = 0;
                    t.forEach(function(t) {
                        n += t.width, r = Math.max(r, t.height);
                    }), e > 1 && (n += (e - 1) * this.letterSpacing), this.width = n, this.height = r;
                }
            }
        }, {
            key: "render",
            value: function(t, e, n, r, i, o, a) {
                var u = this._textures;
                if (u) {
                    var c = this.width * this.scaleX, s = this.height * this.scaleY;
                    t.setTransform(e, n, r, i, o - c * this.ax, a - s * this.ay);
                    for (var l = 0, f = 0, h = u.length; f < h; f++) {
                        var y = u[f];
                        y.render(t, void 0, y.width * this.scaleX, y.height * this.scaleY, l), l += (y.width + this.letterSpacing) * this.scaleX;
                    }
                }
            }
        }, {
            key: "wait",
            value: function(t) {
                var e = this;
                return t.then(function(t) {
                    e.font = t;
                });
            }
        } ]) && j(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), qe = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).text = void 0 === n.text ? "Label" : n.text, n.font = n.font || "30px Arial", 
            n.textBaseline = n.textBaseline || "top", n.fillStyle = n.fillStyle || "0", n.textAlign = n.textAlign || "start", 
            n.lineWidth = n.lineWidth || 0, n.width = n.width || 0, n.ax = n.ax || 0, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && L(t, e);
        }(e, t);
        var n, r, i = M(e);
        return n = e, (r = [ {
            key: "render",
            value: function(t, e, n, r, i, o, a) {
                t.font = this.font, t.fillStyle = this.fillStyle, t.textAlign = this.textAlign, 
                t.textBaseline = this.textBaseline, this.width = t.measureText(this.text).width, 
                t.setTransform(e, n, r, i, o - this.width * this.ax, a), this.strokeStyle && (t.strokeStyle = this.strokeStyle, 
                t.lineWidth = this.lineWidth, t.strokeText(this.text, 0, 0)), t.fillText(this.text, 0, 0);
            }
        }, {
            key: "refreshWidth",
            value: function() {
                var t = e.engine.canvas.ctx;
                return t.font = this.font, t.fillStyle = this.fillStyle, t.textAlign = this.textAlign, 
                t.textBaseline = this.textBaseline, this.width = t.measureText(this.text).width, 
                this.width;
            }
        } ]) && D(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), Ge = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).mask = n.mask || null, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && H(t, e);
        }(e, He);
        var n, r, i = F(e);
        return n = e, (r = [ {
            key: "_render",
            value: function(t, e, n, r, i, o, a) {
                if (null != this.mask) {
                    t.save(), this.mask._render(t, e, n, r, i, this.x + o, this.y + a);
                    for (var u = 0; u < this._children.length; u++) this._children[u]._render(t, e, n, r, i, this.x + o, this.y + a);
                    t.restore();
                } else He.prototype._render.call(this, t, e, n, r, i, this.x + o, this.y + a);
            }
        }, {
            key: "_callOnEnter",
            value: function(t) {
                B(X(e.prototype), "_callOnEnter", this).call(this, t), this.mask && this.mask._callOnEnter(t);
            }
        }, {
            key: "_callOnExit",
            value: function(t) {
                B(X(e.prototype), "_callOnExit", this).call(this, t), this.mask && this.mask._callOnExit(t);
            }
        } ]) && Y(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(), Je = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).maxY = 0, n.scrollY = 0, n.speed = 0, n.bounce = !1, 
            n.bounceTime = 300, n._last5move = [], n._last5time = [], n.brake = .2, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && U(t, e);
        }(e, t);
        var n, r, i = V(e);
        return n = e, (r = [ {
            key: "onAddChild",
            value: function() {
                this.calculate();
            }
        }, {
            key: "onRemoveChild",
            value: function() {
                this.calculate();
            }
        }, {
            key: "calculate",
            value: function() {
                this.maxY = 0;
                for (var t = 0; t < this._children.length; t++) this.maxY = Math.max(this.maxY, this._children[t].y + this._children[t].height);
                this.maxY = this.maxY - this.height;
            }
        }, {
            key: "update",
            value: function(t) {
                if (0 != this._children.length && !(this.maxY <= this.height)) {
                    0 != this.speed || this.bounce || (this.scrollY > 0 && (this.bounce = !0, this.speed = -this.scrollY / this.bounceTime), 
                    this.scrollY < this.height - this.maxY && (this.bounce = !0, this.speed = (this.height - this.maxY - this.scrollY) / this.bounceTime));
                    var e = this.speed * t;
                    if (0 != e) {
                        this.scrollY += e;
                        for (var n = 0; n < this._children.length; n++) this._children[n].y += e;
                        if (this.onScroll && this.onScroll(e), this.scrollY <= 0 && this.scrollY >= -(this.maxY - this.height) && this.bounce && (this.bounce = !1, 
                        this.speed = 0), !this.bounce) {
                            var r = .001;
                            if (this.scrollY > 0 || this.scrollY < this.height - this.maxY) {
                                var i = Math.abs(this.speed), o = .001 * (i > 1 ? Math.pow(i, 2) : i) * 5;
                                r = o > .001 ? o : .001;
                            }
                            this.speed > 0 ? (this.speed -= t * r, this.speed < 0 && (this.speed = 0)) : (this.speed += t * r, 
                            this.speed > 0 && (this.speed = 0)), this.speed < .03 && this.speed > -.03 && (this.speed = 0);
                        }
                    }
                }
            }
        }, {
            key: "onTouchBegin",
            value: function(t) {
                if (!(this.maxY <= this.height)) {
                    var e = this.globalToLocal(t.current.x, t.current.y);
                    if (this.isInside(e.x, e.y)) return this.speed = 0, this._last5move = [], !0;
                }
            }
        }, {
            key: "onTouchMove",
            value: function(t) {
                var e = t.delta.y;
                (this.scrollY > 0 || this.scrollY < this.height - this.maxY) && (e *= .6), this.scrollY += e;
                for (var n = 0; n < this._children.length; n++) this._children[n].y += e;
                t.distance > 20 && (t.swallow = !0), this.onScroll && this.onScroll(e), this._gatherTouchMove(e, t.interval);
            }
        }, {
            key: "onTouchEnd",
            value: function(t) {
                if (this.scrollY > 0) return this.bounce = !0, void (this.speed = -this.scrollY / this.bounceTime);
                if (this.scrollY < this.height - this.maxY) return this.bounce = !0, void (this.speed = (this.height - this.maxY - this.scrollY) / this.bounceTime);
                this._gatherTouchMove(t.delta.y, t.interval);
                for (var e = 0, n = 0, r = 0; r < this._last5move.length; r++) n += this._last5move[r], 
                e += this._last5time[r];
                this.speed = e <= 0 || e > 500 ? 0 : n * (1 - this.brake) / e;
            }
        }, {
            key: "onTouchCancel",
            value: function(t) {}
        }, {
            key: "_gatherTouchMove",
            value: function(t, e) {
                this._last5move.push(t), this._last5time.push(e), this._last5move.length > 5 && (this._last5move.shift(), 
                this._last5time.shift());
            }
        }, {
            key: "onEnter",
            value: function() {
                console.log("### this.engine.touchManager.addLayer(10, this)"), this.engine.touchManager.addLayer(10, this), 
                this.calculate();
            }
        }, {
            key: "onExit",
            value: function() {
                this.engine.touchManager.removeLayer(this);
            }
        }, {
            key: "_render",
            value: function(t, e, n, r, i, o, a) {
                var u = this.engine._getTempCanvas(this.width, this.height);
                u.context.globalCompositeOperation = "source-over", u.context.setTransform(1, 0, 0, 1, 0, 0), 
                u.context.clearRect(0, 0, this.width, this.height);
                for (var c = 0; c < this._children.length; c++) this._children[c]._render(u.context, 1, 0, 0, 1, 0, 0);
                t.setTransform(e, n, r, i, this.x + o, this.y + a), t.drawImage(u.canvas, 0, 0, this.width, this.height), 
                this.engine._backTempCanvas(u);
            }
        } ]) && K(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), Qe = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).createNode = n.createNode || null, n.nodeHeight = n.nodeHeight || 0, 
            n.panddingTop = 0, n.data = [], n.added = !1, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && Z(t, e);
        }(e, Je);
        var n, r, i = tt(e);
        return n = e, (r = [ {
            key: "onEnter",
            value: function() {
                if (!this.added) {
                    if (this.added = !0, Je.prototype.onEnter.call(this), null == this.createNode) throw Error("ScrollList.createNode is null");
                    if (0 == this.nodeHeight) throw Error("ScrollList.nodeHeight is 0");
                }
            }
        }, {
            key: "onExit",
            value: function() {
                this.added && (this.added = !1, Je.prototype.onExit.call(this));
            }
        }, {
            key: "onScroll",
            value: function(t) {
                for (var e = this.height, n = 0, r = 0, i = 0, o = 0; o < this._children.length; o++) e > this._children[o].y && (e = this._children[o].y, 
                n = this._children[o]), r < this._children[o].y + this.nodeHeight && (r = this._children[o].y + this.nodeHeight, 
                i = this._children[o]);
                e > 0 && n._scrollListIndex > 0 && (i._scrollListIndex = n._scrollListIndex - 1, 
                i.setData(this.data[n._scrollListIndex - 1]), i.y = e - this.nodeHeight), r < this.height && this.data.length > i._scrollListIndex + 1 && (n._scrollListIndex = i._scrollListIndex + 1, 
                n.setData(this.data[i._scrollListIndex + 1]), n.y = r);
            }
        }, {
            key: "setData",
            value: function(t) {
                this.data = t, this.rebuild();
            }
        }, {
            key: "rebuild",
            value: function() {
                this.removeAllChildren();
                for (var t = this.panddingTop, e = Math.ceil(this.height / this.nodeHeight) + 1, n = 0; !(n >= e || n >= this.data.length); ) {
                    var r = this.createNode();
                    r.y = t, t += this.nodeHeight, r._scrollListIndex = n, r.setData(this.data[n]), 
                    this.addChild(r), r.visible = !0, n++;
                }
                this.scrollY = 0, this.maxY = this.nodeHeight * this.data.length + 25;
            }
        } ]) && Q(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }();
    rt.prototype.on = function(t, e) {
        (this._events[t] || (this._events[t] = [])).push({
            func: e,
            once: !1
        });
    }, rt.prototype.once = function(t, e) {
        (this._events[t] || (this._events[t] = [])).push({
            func: e,
            once: !0
        });
    }, rt.prototype.off = function(t, e) {
        var n = this._events[t];
        if (n && 0 !== n.length) if (void 0 !== e) {
            for (var r = 0; r < n.length; r++) if (n[r].func == e) return void n.splice(r, 1);
        } else null != t ? this._events[t] = [] : this._events = {};
    }, rt.prototype.emit = function(t) {
        var e = this._events[t];
        if (e && 0 !== e.length) {
            for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), i = 1; i < n; i++) r[i - 1] = arguments[i];
            for (var o = 0; o < e.length; o++) {
                var a;
                (a = e[o].func).call.apply(a, [ this ].concat(r)), e[o].once && (e.splice(o, 1), 
                o--);
            }
        }
    }, it.prototype.onTouchBegin = function(t) {
        var e = this.globalToLocal(t.current.x, t.current.y);
        if (this.isInside(e.x, e.y)) return this.emit("touchBegin", t, e), !0;
    }, it.prototype.onTouchMove = function(t) {
        this.emit("touchMove", t);
    }, it.prototype.onTouchEnd = function(t) {
        this.emit("touchEnd", t);
    }, it.prototype.onTouchCancel = function(t) {
        this.emit("touchCancel", t);
    }, it.prototype.onTouchTap = function(t) {
        this.emit("touchTap", t);
    };
    var Ze = 1, tn = function() {
        function t() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t);
        }
        var e, n;
        return e = t, n = [ {
            key: "assignKeys",
            value: function(t, e, n, r) {
                if (n.forEach(function(n) {
                    void 0 !== e[n] && (t[n] = e[n]);
                }), r) for (var i in r) {
                    var o = r[i];
                    void 0 !== e[o] && (t[i] = e[o]);
                }
            }
        }, {
            key: "setComponentProps",
            value: function(t, e, n) {
                var r = this;
                this.assignKeys(e, n, [ "x", "y", "ax", "ay", "visible", "angle" ], {
                    width: "w",
                    height: "h",
                    scaleX: "sx",
                    scaleY: "sy"
                }), n.name && (t[n.name] = e, e.name = n.name), n.children && n.children.forEach(function(n) {
                    var i = r.createNode(n, t);
                    e.addChild(i);
                }), n.touchEnable && e.mixin(it);
            }
        }, {
            key: "parseConf",
            value: function(t, e) {
                var n = this;
                if (t.length) t.forEach(function(t) {
                    var r = n.createNode(t, e);
                    e.addChild(r);
                }); else {
                    var r = this.createNode(t, e);
                    e.addChild(r);
                }
            }
        }, {
            key: "createNode",
            value: function(t, e) {
                var n;
                switch (t.type) {
                  case 0:
                    n = new He(t);
                    break;

                  case Ze:
                    n = this.parseLabel(t);
                    break;

                  case 2:
                    n = this.parseImage(t);
                    break;

                  case 3:
                    n = this.parseBmFont(t);
                    break;

                  case 4:
                    n = this.parseList(t);
                    break;

                  case 5:
                    n = this.parseClip(t);
                }
                return this.setComponentProps(e, n, t), n;
            }
        }, {
            key: "getFontStr",
            value: function(t) {
                var e = (t.fontSize || 26) + "px";
                return e += " " + (t.fontFamily || "Arial"), t.bold && (e = "bold " + e), t.italic && (e = "oblique " + e), 
                e;
            }
        }, {
            key: "transColor",
            value: function(t) {
                var e = t.toString(16), n = e.length;
                return n > 6 ? e = e.substring(0, 6) : n < 6 && (e = "0".repeat(6 - n) + e), "#" + e;
            }
        }, {
            key: "parseLabel",
            value: function(t) {
                var e = {
                    font: this.getFontStr(t),
                    fillStyle: t.textColor ? this.transColor(t.textColor) : void 0
                };
                return t.stroke && (e.strokeStyle = this.transColor(t.strokeColor), e.lineWidth = t.stroke), 
                this.assignKeys(e, t, [ "text", "textAlign", "textBaseline" ]), new qe(e);
            }
        }, {
            key: "parseImage",
            value: function(t) {
                var e = {};
                return this.assignKeys(e, t, [ "patch9", "autoSize" ], {
                    source: "res"
                }), new Ue(e);
            }
        }, {
            key: "parseBmFont",
            value: function(t) {
                var e = {};
                return this.assignKeys(e, t, [ "text" ], {
                    source: "font"
                }), new Ve(e);
            }
        }, {
            key: "parseList",
            value: function(t) {
                return new Qe(t);
            }
        }, {
            key: "parseClip",
            value: function(t) {
                return new Ge(t);
            }
        } ], null && at(e.prototype, null), n && at(e, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }(), en = function(t) {
        function e(t) {
            var n;
            !function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t))._wxCanvas = wx.getSharedCanvas(), n.ctx = n._wxCanvas.getContext("2d"), 
            n.width = n._wxCanvas.width, n.height = n._wxCanvas.height, console.log(n.width, n.height);
            var r = wx.getSystemInfoSync(), o = r.pixelRatio, a = r.screenHeight;
            return n.pixelRatio = o, n.screenHeight = a, n.sx = 1, n.sy = 1, n.px = 0, n.py = 0, 
            n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && st(t, e);
        }(e, t);
        var n, r, i = lt(e);
        return n = e, (r = [ {
            key: "_renderCanvas",
            value: function() {
                this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.clearRect(0, 0, this.width, this.height);
                for (var t = 0; t < this._children.length; t++) this._children[t]._render(this.ctx, 1, 0, 0, 1, 0, 0);
            }
        }, {
            key: "setViewport",
            value: function(t, e, n, r) {
                var i = this._wxCanvas, o = i.width, a = i.height;
                this.sx = n / this.pixelRatio / o, this.sy = r / this.pixelRatio / a, this.px = t / this.pixelRatio, 
                this.py = (this.screenHeight * this.pixelRatio - e - r) / this.pixelRatio, this.width = o, 
                this.height = a;
                for (var u = 0; u < this._children.length; u++) this._children[u]._callResize(this.width, this.height);
            }
        }, {
            key: "localToGlobal",
            value: function(t, e) {
                return {
                    x: t + this.px,
                    y: e + this.py
                };
            }
        }, {
            key: "globalToLocal",
            value: function(t, e) {
                return {
                    x: (t - this.px) / this.sx,
                    y: (e - this.py) / this.sy
                };
            }
        } ]) && ct(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), nn = function() {
        function t(e, n, r) {
            pt(this, t), this.id = e, this.begin = {
                x: n,
                y: r
            }, this.beginAt = Date.now(), this.current = {
                x: n,
                y: r
            }, this.currentAt = this.beginAt, this.delta = {
                x: 0,
                y: 0
            }, this.interval = 0, this.inviter = [], this.handle = !1, this.swallow = !1;
        }
        return dt(t, [ {
            key: "_moveTo",
            value: function(t, e) {
                if (t != this.current.x || e != this.current.y) {
                    var n = this.current, r = this.currentAt;
                    this.current = {
                        x: t,
                        y: e
                    }, this.currentAt = Date.now(), this.delta = {
                        x: this.current.x - n.x,
                        y: this.current.y - n.y
                    }, this.interval = this.currentAt - r;
                }
            }
        }, {
            key: "distance",
            get: function() {
                var t = this.current.x - this.begin.x, e = this.current.y - this.begin.y;
                return Math.sqrt(t * t + e * e);
            }
        } ]), t;
    }(), rn = function() {
        function t(e) {
            pt(this, t), console.log("add touchEvent"), this.touchEventAdded = !1, this.engine = e, 
            this.touch = null, this.handlers = {
                begin: this._onTouchBegin.bind(this),
                move: this._onTouchMove.bind(this),
                end: this._onTouchEnd.bind(this),
                cancel: this._onTouchCancel.bind(this)
            }, this.layers = [], this.layerNodes = {}, this.layerNodeMap = new Map(), e.on("start", this._addListener.bind(this)), 
            e.on("stop", this._removeListener.bind(this));
        }
        return dt(t, [ {
            key: "addLayer",
            value: function(t, e) {
                console.log("addLayer ---\x3e"), -1 == this.layers.indexOf(t) && (this.layers.push(t), 
                this.layers.sort(function(t, e) {
                    return t - e;
                }), this.layerNodes[t.toString()] = []), this.layerNodes[t.toString()].push(e), 
                this.layerNodeMap.set(e, t);
            }
        }, {
            key: "removeLayer",
            value: function(t) {
                console.log("removeLayer ---\x3e");
                var e = this.layerNodeMap.get(t);
                if (void 0 !== e) {
                    this.layerNodeMap.delete(t);
                    var n = this.layerNodes[e.toString()];
                    if (n) {
                        var r = n.indexOf(t);
                        r >= 0 && n.splice(r, 1);
                    }
                }
            }
        }, {
            key: "_addListener",
            value: function() {
                this.touchEventAdded || (console.log("开始监听---"), this.touchEventAdded = !0, wx.onTouchStart(this.handlers.begin), 
                wx.onTouchMove(this.handlers.move), wx.onTouchEnd(this.handlers.end), wx.onTouchCancel(this.handlers.cancel));
            }
        }, {
            key: "_removeListener",
            value: function() {}
        }, {
            key: "_onTouchBegin",
            value: function(t) {
                if (this.engine.updateTimer && null == this.touch && !(t.changedTouches.length <= 0)) {
                    var e = t.changedTouches[0], n = e.pageX, r = e.pageY;
                    this.touch = new nn(e.identifier, n, r), console.log("--", this.touch);
                    for (var i = 0; i < this.layers.length; i++) for (var o = this.layerNodes[this.layers[i]], a = 0; a < o.length; a++) if (this.touch.handle = !1, 
                    this.touch.swallow = !1, !0 === o[a].onTouchBegin(this.touch) || this.touch.handle) {
                        if (this.touch.swallow) {
                            for (var u = 0; u < this.touch.inviter.length; u++) if (this.touch.inviter[u].onTouchCancel) try {
                                this.touch.inviter[u].onTouchCancel(this.touch);
                            } catch (t) {
                                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                                console.error(t);
                            }
                            return void (this.touch.inviter = [ o[a] ]);
                        }
                        this.touch.inviter.push(o[a]);
                    }
                }
            }
        }, {
            key: "_onTouchMove",
            value: function(t) {
                if (null != this.touch && !(t.changedTouches.length <= 0)) {
                    for (var e = null, n = 0; n < t.changedTouches.length; n++) t.changedTouches[n].identifier == this.touch.id && (e = t.changedTouches[n]);
                    if (null != e) {
                        this.touch.swallow = !1, this.touch._moveTo(e.pageX, e.pageY);
                        for (var r = 0; r < this.touch.inviter.length; r++) if (this.touch.inviter[r].onTouchMove) {
                            try {
                                this.touch.inviter[r].onTouchMove(this.touch);
                            } catch (t) {
                                t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                                console.error(t);
                            }
                            if (this.touch.swallow) {
                                for (n = 0; n < this.touch.inviter.length; n++) if (n != r && this.touch.inviter[n].onTouchCancel) try {
                                    this.touch.inviter[r].onTouchCancel(this.touch);
                                } catch (t) {
                                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                                    console.error(t);
                                }
                                return void (this.touch.inviter = [ this.touch.inviter[r] ]);
                            }
                        }
                    }
                }
            }
        }, {
            key: "_onTouchEnd",
            value: function(t) {
                if (null != this.touch && !(t.changedTouches.length <= 0)) {
                    for (var e = null, n = 0; n < t.changedTouches.length; n++) t.changedTouches[n].identifier == this.touch.id && (e = t.changedTouches[n]);
                    if (null != e) {
                        this.touch._moveTo(e.pageX, e.pageY);
                        for (var r = 0; r < this.touch.inviter.length; r++) if (this.touch.inviter[r].onTouchEnd) try {
                            this.touch.inviter[r].onTouchEnd(this.touch);
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            console.error(t);
                        }
                        if (this.touch.distance < 20 && this.touch.currentAt - this.touch.beginAt < 350) for (r = 0; r < this.touch.inviter.length; r++) if (this.touch.inviter[r].onTouchTap) try {
                            this.touch.inviter[r].onTouchTap(this.touch);
                        } catch (t) {
                            t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                            console.error(t);
                        }
                        this.touch = null;
                    }
                }
            }
        }, {
            key: "_onTouchCancel",
            value: function(t) {
                if (null != this.touch && !(t.changedTouches.length <= 0)) {
                    for (var e = null, n = 0; n < t.changedTouches.length; n++) t.changedTouches[n].identifier == this.touch.id && (e = t.changedTouches[n]);
                    if (null != e) {
                        for (var r = 0; r < this.touch.inviter.length; r++) this.touch.inviter[r].onTouchCancel && this.touch.inviter[r].onTouchCancel(this.touch);
                        this.touch = null;
                    }
                }
            }
        } ], [ {
            key: "addon",
            value: function(e) {
                e.touchManager = new t(e);
            }
        } ]), t;
    }();
    new (function() {
        function t() {
            wt(this, t), this._tweens = new Map();
        }
        return xt(t, [ {
            key: "removeAll",
            value: function() {
                this._tweens = new Map();
            }
        }, {
            key: "add",
            value: function(t) {
                this._tweens.set(t.id, t);
            }
        }, {
            key: "remove",
            value: function(t) {
                this._tweens.delete(t.id);
            }
        }, {
            key: "update",
            value: function(t) {
                var e, n = mt(this._tweens.values());
                try {
                    for (n.s(); !(e = n.n()).done; ) {
                        var r = e.value;
                        r.update && !1 === r.update(t) && (r.isPlaying = !1, this._tweens.delete(r.id));
                    }
                } catch (t) {
                    t = VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(t);
                    n.e(t);
                } finally {
                    n.f();
                }
            }
        } ]), t;
    }())();
    var on, an, un = {
        Linear: function(t, e) {
            var n = t.length - 1, r = n * e, i = Math.floor(r), o = un.Utils.Linear;
            return e < 0 ? o(t[0], t[1], r) : e > 1 ? o(t[n], t[n - 1], n - r) : o(t[i], t[i + 1 > n ? n : i + 1], r - i);
        },
        Bezier: function(t, e) {
            for (var n = 0, r = t.length - 1, i = Math.pow, o = un.Utils.Bernstein, a = 0; a <= r; a++) n += i(1 - e, r - a) * i(e, a) * t[a] * o(r, a);
            return n;
        },
        CatmullRom: function(t, e) {
            var n = t.length - 1, r = n * e, i = Math.floor(r), o = un.Utils.CatmullRom;
            return t[0] === t[n] ? (e < 0 && (i = Math.floor(r = n * (1 + e))), o(t[(i - 1 + n) % n], t[i], t[(i + 1) % n], t[(i + 2) % n], r - i)) : e < 0 ? t[0] - (o(t[0], t[0], t[1], t[1], -r) - t[0]) : e > 1 ? t[n] - (o(t[n], t[n], t[n - 1], t[n - 1], r - n) - t[n]) : o(t[i ? i - 1 : 0], t[i], t[n < i + 1 ? n : i + 1], t[n < i + 2 ? n : i + 2], r - i);
        },
        Utils: {
            Linear: function(t, e, n) {
                return (e - t) * n + t;
            },
            Bernstein: function(t, e) {
                var n = un.Utils.Factorial;
                return n(t) / n(e) / n(t - e);
            },
            Factorial: (on = [ 1 ], function(t) {
                var e = 1;
                if (on[t]) return on[t];
                for (var n = t; n > 1; n--) e *= n;
                return on[t] = e, e;
            }),
            CatmullRom: function(t, e, n, r, i) {
                var o = .5 * (n - t), a = .5 * (r - e), u = i * i;
                return (2 * e - 2 * n + o + a) * (i * u) + (-3 * e + 3 * n - 2 * o - a) * u + o * i + e;
            }
        }
    }, cn = function(t) {
        function e() {
            var t;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), t = o.call(this), wx.getSharedCanvas ? (t.canvas = new en(), t.canvas._active = !0, 
            t.canvas.engine = Dt(t), t.updateTimer = null, t._lastUpdate = 0, t._tempCanvas = {}, 
            t.targetInterval = 1e3 / 60, t) : Rt(t);
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && Et(t, e);
        }(e, rt);
        var n, r, i, o = Ct(e);
        return n = e, i = [ {
            key: "mixin",
            value: function(t, e) {
                if ("function" != typeof t) throw Error("mixin target must be class");
                if ("function" != typeof e) throw Error("mixin must be class");
                t.__mixin__ ? t.__mixin__.push(e) : t.__mixin__ = [ e ], t.prototype = Ot(Ot({}, t.prototype), e.prototype), 
                t.prototype = {
                    __proto__: t.prototype
                }, Object.assign(t.prototype, e.prototype);
            }
        } ], (r = [ {
            key: "update",
            value: function(t) {
                if (this.canvas) {
                    var e = this._lastUpdate, n = Date.now();
                    void 0 !== t && (this.updateTimer = requestAnimationFrame(this.update.bind(this)), 
                    n - e < this.targetInterval) || (this._lastUpdate = n, this.canvas._callUpdate(n - e), 
                    this.emit("update", n - e), this.canvas._renderCanvas());
                }
            }
        }, {
            key: "start",
            value: function() {
                console.log("start ---\x3e"), null === this.updateTimer && (this.emit("start"), 
                this._lastUpdate = Date.now(), this.updateTimer = requestAnimationFrame(this.update.bind(this)));
            }
        }, {
            key: "stop",
            value: function() {
                null !== this.updateTimer && (cancelAnimationFrame(this.updateTimer), this.updateTimer = null, 
                this.emit("stop"));
            }
        }, {
            key: "setFPS",
            value: function(t) {
                this.targetInterval = 1e3 / t;
            }
        }, {
            key: "_getTempCanvas",
            value: function(t, e) {
                var n = t + "x" + e, r = this._tempCanvas[n] || (this._tempCanvas[n] = []);
                if (0 == r.length) {
                    var i = wx.createCanvas();
                    return console.log("create temp canvas:" + n), i.width = t, i.height = e, {
                        id: n,
                        canvas: i,
                        context: i.getContext("2d")
                    };
                }
                return r.pop();
            }
        }, {
            key: "_backTempCanvas",
            value: function(t) {
                (this._tempCanvas[t.id] || (this._tempCanvas[id] = [])).push(t);
            }
        } ]) && Pt(n.prototype, r), i && Pt(n, i), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(), sn = function() {
        function t() {
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t);
        }
        var e, n;
        return e = t, n = [ {
            key: "fixName",
            value: function(t, e) {
                return e = e || 6, t.length > e ? t.slice(0, e) + "..." : t;
            }
        }, {
            key: "_measurement",
            get: function() {
                return [ "K", "M", "B", "T", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az" ];
            }
        }, {
            key: "numberToEnglishWithMany",
            value: function(t) {
                for (var e = t, n = -1; e >= 1e3; ) e /= 1e3, n++;
                return Math.floor(10 * e) / 10 + (n > -1 ? this._measurement[n] : "");
            }
        }, {
            key: "randomIn",
            value: function(t, e) {
                void 0 === e && (e = t), e = Math.min(t, e);
                for (var n = new Array(t), r = [], i = 0; i < e; i++) {
                    var o = Math.floor(Math.random() * t), a = n[o];
                    void 0 === a && (a = o);
                    var u = n[--t];
                    n[o] = void 0 === u ? t : u, r.push(a);
                }
                return r;
            }
        }, {
            key: "getLimitStr",
            value: function(t, e, n) {
                e = e || 15, n = n || "...";
                for (var r = 0, i = 0, o = !1; i < t.length; i++) if (r++, t.charCodeAt(i) > 255 && r++, 
                r >= e) {
                    o = !0;
                    break;
                }
                var a = t.slice(0, i);
                return o && (a += n), a;
            }
        }, {
            key: "abridge",
            value: function(t) {
                var e = t;
                if (e < 1e5) return Math.round(e).toString();
                for (var n = 3, r = 0; ;) {
                    if (e < 1e4) {
                        if (e > 1e3) n = 0; else if (e > 100) n = Math.floor(10 * e) % 10 == 0 ? 0 : 1; else if (e > 10) {
                            var i = Math.floor(100 * e);
                            n = i % 10 == 0 ? i % 100 == 0 ? 0 : 1 : 2;
                        } else {
                            var o = Math.floor(1e3 * e);
                            n = o % 10 == 0 ? o % 100 == 0 ? o % 1e3 == 0 ? 0 : 1 : 2 : 3;
                        }
                        break;
                    }
                    r++, e /= 1e4;
                }
                var a = Math.pow(10, n);
                return (e = Math.floor(e * a) / a).toFixed(n).toString() + [ "", "万", "亿", "兆", "京", "垓" ][r];
            }
        } ], null && $t(e.prototype, null), n && $t(e, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }(), ln = {
        shareData: {
            shareTitle: "即使做咸鱼，也要做最咸的那条！",
            shareImage: "https://wxmini-resource.hortorgames.com/background-image/20211015-150906-1634285002.png"
        }
    }, fn = function(t) {
        function e(t) {
            var n;
            !function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this);
            var r = (n = i.call(this, t)).getStyle();
            return tn.parseConf(r, Nt(n)), n.visible = !0, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && zt(t, e);
        }(e, t);
        var n, r, i = Ht(e);
        return n = e, (r = [ {
            key: "getStyle",
            value: function() {
                var t;
                return [ {
                    type: 2,
                    name: "bg",
                    w: this.width,
                    h: this.height,
                    x: 2,
                    y: 8,
                    res: "odcres/1.png",
                    patch9: {
                        x: 116,
                        y: 3,
                        w: 5,
                        h: 107
                    },
                    autoSize: !1
                }, {
                    type: 2,
                    name: "imgHead",
                    x: 123,
                    y: 20,
                    w: 80,
                    h: 80,
                    ax: 0,
                    ay: 0,
                    autoSize: !1
                }, (t = {
                    type: 2,
                    name: "imgRank",
                    ax: .5,
                    x: 25,
                    y: 28,
                    w: 72,
                    h: 75
                }, It(t, "ax", 0), It(t, "ay", 0), It(t, "autoSize", !1), t), {
                    type: Ze,
                    name: "labRank",
                    text: "-",
                    textAlign: "center",
                    fontSize: 36,
                    ax: 0,
                    textColor: 5319181,
                    strokeColor: 10971171,
                    stroke: 0,
                    x: 62,
                    y: 48
                }, {
                    type: Ze,
                    name: "labName",
                    text: "-",
                    fontSize: 24,
                    textColor: 4982275,
                    strokeColor: 4276545,
                    stroke: 0,
                    x: 220,
                    y: 33
                }, {
                    type: Ze,
                    name: "labPower",
                    text: "-",
                    fontSize: 18,
                    textColor: 9983526,
                    strokeColor: 0,
                    stroke: 0,
                    x: 220,
                    y: 72
                }, {
                    type: Ze,
                    name: "labLevelTitle",
                    textAlign: "center",
                    text: "-",
                    fontSize: 24,
                    textColor: 4982275,
                    strokeColor: 0,
                    stroke: 0,
                    x: 592,
                    y: 42
                }, {
                    type: Ze,
                    name: "labLevel",
                    textAlign: "center",
                    text: "-",
                    fontSize: 24,
                    textColor: 9983526,
                    strokeColor: 0,
                    stroke: 0,
                    x: 592,
                    y: 72
                } ];
            }
        }, {
            key: "setData",
            value: function(t) {
                var e = t.rank, n = t.info, r = e <= 3;
                this.imgRank.visible = r, this.labRank.visible = !r, this.data = t, r && (this.imgRank.source = "odcres/tubiao_paiming".concat(e, ".png")), 
                this.labRank.text = "".concat(e), this.imgHead.source = n.avatarUrl, this.labLevelTitle.text = "通关数", 
                this.labLevel.text = "".concat(n.level), this.labPower.text = "战力值:".concat(sn.abridge(n.power)), 
                this.labName.text = sn.getLimitStr(n.nickname);
            }
        }, {
            key: "onShareTaped",
            value: function() {
                console.log("点击分享按钮"), this.targetShare();
            }
        }, {
            key: "targetShare",
            value: function() {
                if (wx.shareMessageToFriend) {
                    var t = this.data.info.openid;
                    console.log("shareMessageToFriend", t), wx.shareMessageToFriend({
                        openId: t,
                        title: ln.shareData.shareTitle,
                        imageUrl: ln.shareData.shareImage
                    });
                } else console.log("不支持定向分享");
            }
        }, {
            key: "sendGift",
            value: function() {
                wx.modifyFriendInteractiveStorage({
                    key: "1",
                    opNum: 1,
                    operation: "add",
                    toUser: this.data.info.openid,
                    success: function(t) {
                        console.log("赠送礼物成功", t);
                    },
                    fail: function(t) {
                        console.log("赠送礼物失败", t);
                    }
                });
            }
        } ]) && Yt(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), hn = function(t) {
        function e(t) {
            var n;
            !function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this);
            var r = (n = i.call(this, t)).getStyle();
            return tn.parseConf(r, Gt(n)), n.visible = !0, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && Ut(t, e);
        }(e, t);
        var n, r, i = Vt(e);
        return n = e, (r = [ {
            key: "getStyle",
            value: function() {
                return [ {
                    type: 2,
                    name: "bg",
                    w: this.width,
                    h: this.height,
                    x: 25,
                    y: 0,
                    res: "odcres/2.png",
                    patch9: {
                        x: 114,
                        y: 29,
                        w: 46,
                        h: 29
                    },
                    autoSize: !1
                }, {
                    type: 2,
                    name: "imgHead",
                    x: 156,
                    y: 15,
                    w: 80,
                    h: 80,
                    ax: 0,
                    ay: 0,
                    autoSize: !1
                }, {
                    type: 2,
                    name: "imgRank",
                    x: 43,
                    y: 20,
                    w: 72,
                    h: 75,
                    ax: 0,
                    ay: 0,
                    autoSize: !1
                }, {
                    type: Ze,
                    name: "labRank",
                    text: "-",
                    textAlign: "center",
                    fontSize: 40,
                    ax: 0,
                    textColor: 15843653,
                    strokeColor: 10971171,
                    stroke: 0,
                    x: 77,
                    y: 42
                }, {
                    type: Ze,
                    name: "labName",
                    text: "-",
                    fontSize: 26,
                    textColor: 16709040,
                    strokeColor: 4276545,
                    stroke: 0,
                    x: 254,
                    y: 27
                }, {
                    type: Ze,
                    name: "labPower",
                    text: "-",
                    fontSize: 18,
                    textColor: 15843653,
                    strokeColor: 0,
                    stroke: 0,
                    x: 257,
                    y: 60
                }, {
                    type: Ze,
                    name: "labLevelTitle",
                    textAlign: "center",
                    text: "-",
                    fontSize: 24,
                    textColor: 16709040,
                    strokeColor: 0,
                    stroke: 0,
                    x: 650,
                    y: 27
                }, {
                    type: Ze,
                    name: "labLevel",
                    textAlign: "center",
                    text: "-",
                    fontSize: 24,
                    textColor: 15843653,
                    strokeColor: 0,
                    stroke: 0,
                    x: 650,
                    y: 57
                } ];
            }
        }, {
            key: "setData",
            value: function(t) {
                var e = t.rank, n = t.info, r = e <= 3;
                this.imgRank.visible = r, this.labRank.visible = !r, this.data = t, r && (this.imgRank.source = "odcres/tubiao_paiming".concat(e, ".png")), 
                this.labRank.text = "".concat(e), this.imgHead.source = n.avatarUrl, this.labLevelTitle.text = "通关数", 
                this.labLevel.text = "".concat(n.level), this.labPower.text = "战力值:".concat(sn.abridge(n.power)), 
                this.labName.text = sn.getLimitStr(n.nickname);
            }
        } ]) && Kt(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), yn = 1, pn = function() {
        function t(e) {
            Zt(this, t), this.keys = e, this.kvData = null, this.sortKey = e[0];
        }
        return ee(t, [ {
            key: "getFriendDataList",
            value: function() {
                var t = this;
                return new Promise(function(e, n) {
                    if (!wx.getFriendCloudStorage) return e();
                    wx.getFriendCloudStorage({
                        keyList: t.keys,
                        success: function(t) {
                            console.log("开放数据域getFreindStorage的返回->>", t), e(t.data || []);
                        },
                        fail: function(t) {
                            console.log("开放数据域调取数据域失败-----\x3e>>>>"), n();
                        }
                    });
                });
            }
        }, {
            key: "getOpenData",
            value: function(t, e, n) {
                var r = this;
                if (void 0 === n && (n = yn), this.sortKey = e || this.keys[0], 0 === n || !this.kvData || (this._updateDataList(this.kvData, t), 
                2 !== n)) return this.getFriendDataList().then(function(e) {
                    return r._transDataList(e), r._updateDataList(e, t);
                });
            }
        }, {
            key: "_transDataList",
            value: function(t) {
                t.forEach(function(t) {
                    t.KVDataList.forEach(function(e) {
                        t[e.key] = e.value;
                    });
                });
            }
        }, {
            key: "_updateDataList",
            value: function(t, e) {
                var n = this.sortKey;
                this.kvData = t, e(t = t.filter(function(t) {
                    return !!t[n];
                }).sort(function(t, e) {
                    return e[n] - t[n];
                }));
            }
        } ], [ {
            key: "findData",
            value: function(e, n, r) {
                for (var i = e, o = 0; o < i.length; ++o) {
                    var a = i[o];
                    if (t.isSelf(a, n, r)) return {
                        info: a,
                        rank: o + 1
                    };
                }
            }
        }, {
            key: "isSelf",
            value: function(t, e, n) {
                n = "" + n;
                var r = t.openid == e;
                return !r && n > 0 && (r = t.uid == n), r;
            }
        }, {
            key: "getKvData",
            value: function(t, e) {
                var n = t.KVDataList[e];
                return void 0 !== n ? n.value : 0;
            }
        }, {
            key: "getKvDataNum",
            value: function(t, e) {
                return +this.getKvData(t, e);
            }
        } ]), t;
    }(), vn = function() {
        function t() {
            Zt(this, t), this.bundleDict = {};
        }
        return ee(t, [ {
            key: "getBundle",
            value: function(t) {
                var e = t.join("_"), n = this.bundleDict[e];
                return n || (n = this.bundleDict[e] = new pn(t)), n;
            }
        } ], [ {
            key: "instance",
            get: function() {
                return an || (an = new t()), an;
            }
        } ]), t;
    }(), dn = function(t) {
        function e(t) {
            var n;
            return function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).dataBundle = null, n.kvData = null, n.key = "", n.cacheType = yn, 
            n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && ie(t, e);
        }(e, t);
        var n, r, i = oe(e);
        return n = e, (r = [ {
            key: "updateData",
            value: function(t) {
                var e = this, n = this.keys || [ "level", "power" ], r = this;
                (this.dataBundle = vn.instance.getBundle(n)).getOpenData(function(n) {
                    e.kvData = n, e.onData(t);
                }, this.key, this.cacheType).catch(function(t) {
                    r.kvData && 0 !== r.cacheType || r.onDataError();
                });
            }
        }, {
            key: "onData",
            value: function(t) {}
        }, {
            key: "onDataError",
            value: function() {}
        } ]) && re(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), bn = function() {
        function t(e) {
            se(this, t), this.keys = e, this.kvData = null, this.sortKey = e[0];
        }
        return fe(t, [ {
            key: "getFriendDataList",
            value: function() {
                var t = this;
                return new Promise(function(e, n) {
                    if (!wx.getFriendCloudStorage) return e();
                    wx.getFriendCloudStorage({
                        keyList: t.keys,
                        success: function(t) {
                            console.log("开放数据域getFreindStorage的返回->>", t), e(t.data || []);
                        },
                        fail: function(t) {
                            console.log("开放数据域调取数据域失败-----\x3e>>>>"), n();
                        }
                    });
                });
            }
        }, {
            key: "getOpenData",
            value: function(t, e, n) {
                var r = this;
                if (void 0 === n && (n = 1), this.sortKey = e || this.keys[0], 0 === n || !this.kvData || (this._updateDataList(this.kvData, t), 
                2 !== n)) return this.getFriendDataList().then(function(e) {
                    return r._transDataList(e), r._updateDataList(e, t);
                });
            }
        }, {
            key: "_transDataList",
            value: function(t) {
                t.forEach(function(t) {
                    t.KVDataList.forEach(function(e) {
                        t[e.key] = e.value;
                    });
                });
            }
        }, {
            key: "_updateDataList",
            value: function(t, e) {
                var n = this.sortKey;
                this.kvData = t, e(t = t.filter(function(t) {
                    return !!t[n];
                }).sort(function(t, e) {
                    return e[n] - t[n];
                }));
            }
        } ], [ {
            key: "findData",
            value: function(e, n, r) {
                for (var i = e, o = 0; o < i.length; ++o) {
                    var a = i[o];
                    if (t.isSelf(a, n, r)) return {
                        info: a,
                        rank: o + 1
                    };
                }
            }
        }, {
            key: "isSelf",
            value: function(t, e, n) {
                n = "" + n;
                var r = t.openid == e;
                return !r && n > 0 && (r = t.uid == n), r;
            }
        }, {
            key: "getKvData",
            value: function(t, e) {
                var n = t.KVDataList[e];
                return void 0 !== n ? n.value : 0;
            }
        }, {
            key: "getKvDataNum",
            value: function(t, e) {
                return +this.getKvData(t, e);
            }
        } ]), t;
    }(), mn = function(t) {
        function e(t) {
            var n;
            !function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).keys = [ "level", "power" ], n.currentPage = 0, n.kvData = null, 
            n.keyIndex = 0, n.width = 750, n.height = t.height, console.log("创建的rankLayer 高度为: ", t.height);
            var r = new Qe();
            r.width = n.width, r.height = n.height - 135, r.nodeHeight = 118, r.x = 26, r.y = 20, 
            r.createNode = function() {
                return new fn({
                    width: 668,
                    height: 110
                });
            }, n.addChild(r), n.list = r, tn.parseConf({
                type: Ze,
                name: "labError",
                text: "获取排行榜失败",
                w: 120,
                fontSize: 36,
                textColor: 16777215,
                textAlign: "center",
                strokeColor: 13158,
                stroke: 2,
                bold: !0,
                x: n.width / 2,
                y: 142,
                visible: !0
            }, ge(n));
            var o = n.self = new hn({
                isSelf: !0,
                width: 704,
                height: 116
            });
            return o.x = -14, o.y = n.height - 121, n.addChild(o), n.self.visible = !0, n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && de(t, e);
        }(e, dn);
        var n, r, i = be(e);
        return n = e, (r = [ {
            key: "onEnter",
            value: function() {}
        }, {
            key: "onExit",
            value: function() {}
        }, {
            key: "updateData",
            value: function(t) {
                this.key = this.keys[t.index], this.keyIndex = t.index, this.list.visible = !0, 
                this.labError.visible = !1, pe(we(e.prototype), "updateData", this).call(this, t);
            }
        }, {
            key: "onData",
            value: function(t) {
                this.list.visible = !0, this.self.visible = !0;
                var e = t.openId, n = t.uid, r = this.kvData.map(function(t, r) {
                    return {
                        info: t,
                        isSelf: bn.isSelf(t, e, n),
                        level: t.level,
                        power: t.power
                    };
                });
                (r = r.sort(function(t, e) {
                    return t.level != e.level ? e.level - t.level : t.power != e.power ? e.power - t.power : e.uid - t.uid;
                })).forEach(function(t, e) {
                    t.rank = e + 1;
                }), this.list.setData(r);
                var i = r.find(function(t) {
                    return t.isSelf;
                });
                this.self.visible = !!i, i && this.self.setData(i);
            }
        }, {
            key: "onDataError",
            value: function() {
                this.kvData || (this.labError.visible = !0);
            }
        } ]) && ye(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(), gn = function(t) {
        function e(t) {
            var n;
            !function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this);
            var r = (n = i.call(this, t)).getStyle();
            return tn.parseConf(r, Te(n)), n.visible = !0, n.btnShare.on("touchEnd", n.onShareTaped.bind(Te(n))), 
            n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && Oe(t, e);
        }(e, t);
        var n, r, i = je(e);
        return n = e, (r = [ {
            key: "getStyle",
            value: function() {
                var t;
                return [ {
                    type: 2,
                    name: "bg",
                    w: this.width,
                    h: this.height,
                    x: 0,
                    y: 0,
                    res: "odcres/1.png",
                    patch9: {
                        x: 116,
                        y: 3,
                        w: 5,
                        h: 107
                    },
                    autoSize: !1
                }, {
                    type: 2,
                    name: "imgHead",
                    x: 130,
                    y: 12,
                    w: 80,
                    h: 80,
                    ax: 0,
                    ay: 0,
                    autoSize: !1
                }, (t = {
                    type: 2,
                    name: "imgRank",
                    ax: .5,
                    x: 17,
                    y: 20,
                    w: 72,
                    h: 75
                }, xe(t, "ax", 0), xe(t, "ay", 0), xe(t, "autoSize", !1), t), {
                    type: Ze,
                    name: "labRank",
                    text: "-",
                    textAlign: "center",
                    fontSize: 36,
                    ax: 0,
                    textColor: 5319181,
                    strokeColor: 10971171,
                    stroke: 0,
                    x: 45,
                    y: 30
                }, {
                    type: Ze,
                    name: "labName",
                    text: "-",
                    fontSize: 24,
                    textColor: 4982275,
                    strokeColor: 4276545,
                    stroke: 0,
                    x: 218,
                    y: 20
                }, {
                    type: Ze,
                    name: "labPower",
                    text: "-",
                    fontSize: 18,
                    textColor: 15035173,
                    strokeColor: 0,
                    stroke: 0,
                    x: 218,
                    y: 54
                }, {
                    type: 0,
                    name: "btnShare",
                    width: 130,
                    height: 70,
                    x: this.width - 156,
                    y: (this.height - 70) / 2,
                    touchEnable: !0,
                    children: [ {
                        type: 2,
                        res: "odcres/anniu_lv_tongyong.png",
                        w: 66,
                        h: 121,
                        autoSize: !0
                    } ]
                } ];
            }
        }, {
            key: "setData",
            value: function(t) {
                var e = t.rank, n = t.info, r = e <= 3;
                this.imgRank.visible = r, this.labRank.visible = !r, this.data = t, r && (this.imgRank.source = "odcres/tubiao_paiming".concat(e, ".png")), 
                this.labRank.text = "".concat(e), this.imgHead.source = n.avatarUrl, this.labPower.text = "战力值:".concat(sn.abridge(n.power)), 
                this.labName.text = sn.getLimitStr(n.nickname), this.btnShare.active = !t.isSelf;
            }
        }, {
            key: "onShareTaped",
            value: function() {
                console.log("点击加好友按钮"), this.targetShare();
            }
        }, {
            key: "targetShare",
            value: function() {
                if (wx.shareMessageToFriend) {
                    var t = this.data.info.openid;
                    console.log("shareMessageToFriend", t);
                } else console.log("不支持定向分享");
            }
        }, {
            key: "sendGift",
            value: function() {
                wx.modifyFriendInteractiveStorage({
                    key: "1",
                    opNum: 1,
                    operation: "add",
                    toUser: this.data.info.openid,
                    success: function(t) {
                        console.log("赠送礼物成功", t);
                    },
                    fail: function(t) {
                        console.log("赠送礼物失败", t);
                    }
                });
            }
        } ]) && Se(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(He), wn = function(t) {
        function e(t) {
            var n;
            !function(t, n) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this), (n = i.call(this, t)).keys = [ "level", "power" ], n.currentPage = 0, n.kvData = null, 
            n.keyIndex = 0, n.width = 680, n.height = t.height || 960;
            var r = new Qe();
            return r.width = n.width, r.height = n.height, r.nodeHeight = 110, r.x = 0, r.y = 0, 
            r.createNode = function() {
                return new gn({
                    width: n.width,
                    height: 110
                });
            }, n.addChild(r), n.list = r, tn.parseConf([ {
                type: Ze,
                name: "labError",
                text: "获取微信好友失败!",
                w: 120,
                fontSize: 30,
                textColor: 5319181,
                textAlign: "center",
                x: n.width / 2,
                y: 142,
                visible: !1
            }, {
                type: Ze,
                name: "labError2",
                text: "您可在右上角[...]>[设置]>[微信好",
                w: 120,
                fontSize: 24,
                textColor: 9917990,
                textAlign: "center",
                x: n.width / 2,
                y: 222,
                visible: !1
            }, {
                type: Ze,
                name: "labError3",
                text: "友信息]开启好友权限",
                w: 120,
                fontSize: 24,
                textColor: 9917990,
                textAlign: "center",
                x: n.width / 2,
                y: 262,
                visible: !1
            } ], Ie(n)), n;
        }
        !function(t, e) {
            if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
            t.prototype = Object.create(e && e.prototype, {
                constructor: {
                    value: t,
                    writable: !0,
                    configurable: !0
                }
            }), Object.defineProperty(t, "prototype", {
                writable: !1
            }), e && Me(t, e);
        }(e, dn);
        var n, r, i = $e(e);
        return n = e, (r = [ {
            key: "onEnter",
            value: function() {}
        }, {
            key: "onExit",
            value: function() {}
        }, {
            key: "updateData",
            value: function(t) {
                this.key = this.keys[t.index], this.keyIndex = t.index, this.list.visible = !0, 
                this.labError.visible = !1, this.labError2.visible = !1, this.labError3.visible = !1, 
                De(Ye(e.prototype), "updateData", this).call(this, t);
            }
        }, {
            key: "onData",
            value: function(t) {
                this.list.visible = !0;
                var e = t.openId, n = t.uid, r = this.kvData.map(function(t, r) {
                    return {
                        info: t,
                        isSelf: bn.isSelf(t, e, n),
                        level: t.level,
                        power: t.power
                    };
                });
                (r = r.sort(function(t, e) {
                    return t.power != e.power ? e.power - t.power : e.uid - t.uid;
                })).forEach(function(t, e) {
                    t.rank = e + 1;
                }), this.list.setData(r);
            }
        }, {
            key: "onDataError",
            value: function() {
                this.kvData || (this.labError.visible = !0, this.labError2.visible = !0, this.labError3.visible = !0);
            }
        } ]) && Re(n.prototype, r), Object.defineProperty(n, "prototype", {
            writable: !1
        }), e;
    }(), _n = new cn();
    rn.addon(_n), qe.engine = _n, new (function() {
        function t() {
            var e = this;
            !function(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }(this, t), this.curLayer = void 0, this.layers = new Map(), this.engine = _n, "undefined" != typeof window && (window.main = this), 
            wx.onMessage(function(t) {
                if (console.log("开放域监听到message==>", t), t.fromEngine) e.handlerEngineMessage(t); else {
                    var n = e[t.cmd];
                    n && n.call(e, t);
                }
            });
        }
        var e, n;
        return e = t, (n = [ {
            key: "handlerEngineMessage",
            value: function(t) {
                switch (t.event) {
                  case "mainLoop":
                    t.value ? _n.start() : _n.stop();
                    break;

                  case "frameRate":
                    _n.setFPS(t.value);
                    break;

                  case "viewport":
                    var e = _n.canvas._wxCanvas;
                    console.log(e.width, e.height), _n.canvas.setViewport(t.x, t.y, t.width, t.height);
                    break;

                  case "step":
                    _n.update();
                }
            }
        }, {
            key: "refresh",
            value: function() {
                this.curLayer && this.curLayer.updateData();
            }
        }, {
            key: "setSheetConfig",
            value: function(t) {
                Ke.instance.setSheetConfig(t.sheets);
            }
        }, {
            key: "setShareData",
            value: function(t) {
                ln.shareData = t;
            }
        }, {
            key: "_showLayer",
            value: function(t, e) {
                this.curLayer && this.curLayer.removeFromParent();
                var n = this.layers.get(t);
                n || (n = new t({
                    width: e.width || _n.canvas.width,
                    height: e.height || _n.canvas.height
                }), this.layers.set(t, n)), n.removeFromParent(), _n.canvas.addChild(n), this.curLayer = n, 
                this.curLayer.visible = !0, n.updateData(e);
            }
        }, {
            key: "showRank",
            value: function(t) {
                this._showLayer(mn, t);
            }
        }, {
            key: "showFriend",
            value: function(t) {
                this._showLayer(wn, t);
            }
        } ]) && ze(e.prototype, n), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t;
    }())();
} ]);