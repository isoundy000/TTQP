(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityGonggaoTitleBtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8d9a35qKktP5Zn55QOgu3Jd', 'HomeActivityGonggaoTitleBtn', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityGonggaoTitleBtn.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        titleLabel: cc.Label
    },

    onLoad: function onLoad() {},
    init: function init(data) {
        this.titleLabel.string = data.title.toString();
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
        //# sourceMappingURL=HomeActivityGonggaoTitleBtn.js.map
        