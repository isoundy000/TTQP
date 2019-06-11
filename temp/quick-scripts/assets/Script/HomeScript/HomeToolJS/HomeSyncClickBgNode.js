(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeToolJS/HomeSyncClickBgNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4bcf2+fIAJIlJ/9xmgtRtwB', 'HomeSyncClickBgNode', __filename);
// Script/HomeScript/HomeToolJS/HomeSyncClickBgNode.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {
        var self = this;
        this.node.on("touchstart", function (event) {
            event.stopPropagation();
            if (self.callback) {
                self.callback();
            }
        });
    },
    onClickLightGrayBg: function onClickLightGrayBg(callback) {
        this.callback = callback;
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=HomeSyncClickBgNode.js.map
        