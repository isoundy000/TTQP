(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeSignInShowView/HomeSignInItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1bedbrlGuhOKK9tgzWQm9uT', 'HomeSignInItem', __filename);
// Script/HomeScript/HomeSignInShowView/HomeSignInItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        /// 未签到标记图标
        noSignInIcon: cc.Node,
        /// 已签到标记图标
        signInIcon: cc.Node
    },

    onLoad: function onLoad() {},
    init: function init(signInData) {

        var signInStatus = parseInt(signInData.status);
        this.signInIcon.active = signInStatus == 2;
        this.noSignInIcon.active = !this.signInIcon.active;
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
        //# sourceMappingURL=HomeSignInItem.js.map
        