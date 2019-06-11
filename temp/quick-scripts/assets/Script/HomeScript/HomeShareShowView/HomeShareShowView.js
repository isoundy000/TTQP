(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeShareShowView/HomeShareShowView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '033dbZWzaZFbI/kY/xMSs3E', 'HomeShareShowView', __filename);
// Script/HomeScript/HomeShareShowView/HomeShareShowView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        alertView: cc.Node,
        alertContentView: cc.Node,
        moneyLabel: cc.Label,
        yingliLabel: cc.Label

    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false);
        });
    },
    onShowView: function onShowView(isShow) {
        //
        this.node.active = isShow;
    },
    onShowAlertView: function onShowAlertView(isShow) {
        this.alertView.active = isShow;
        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.alertContentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.alertContentView.runAction(scaleAmin);
        }
    },
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var idx = parseInt(customData);
        switch (idx) {
            case 0:
                {
                    //
                    console.log("分享好友");
                }
                break;
            case 1:
                {
                    //
                    console.log("分享朋友圈");
                }
                break;

            default:
                break;
        }
        this.onShowAlertView(true);
    },
    onCloseAlertView: function onCloseAlertView(event) {
        //
        this.onShowAlertView(false);
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
        //# sourceMappingURL=HomeShareShowView.js.map
        