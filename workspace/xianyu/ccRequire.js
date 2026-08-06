var s = {
    "src/assets/launcher/common/libs/platform/hortor/HSDK.turnpass.min.js": function() {
        return require("src/assets/launcher/common/libs/platform/hortor/HSDK.turnpass.min.js");
    },
    "assets/internal/index.js": function() {
        return require("assets/internal/index.js");
    },
    "assets/main/index.js": function() {
        return require("assets/main/index.js");
    }
};

window.__cocos_require__ = function(n) {
    var r = s[n];
    return r ? r() : function() {};
};