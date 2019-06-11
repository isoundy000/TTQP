(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeGiftFetchView/HomeGiftFetchView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fdb6ejUKOdN35KOVWQwXs20', 'HomeGiftFetchView', __filename);
// Script/HomeScript/HomeGiftFetchView/HomeGiftFetchView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件背景View
        contentView: cc.Node,

        /// 内容
        contentLabel: cc.Label
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false, self.alertMsg, self.callback);
        });
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {提示信息} alertMsg    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, alertMsg, callback) {
        this.alertMsg = alertMsg;
        this.callback = callback;

        this.node.active = isShow;

        if (isShow) {
            this.contentLabel.string = alertMsg.toString();

            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /**
     * 点击确定和徐取消按钮
     */
    onMenusBtnClick: function onMenusBtnClick(event) {
        this.onShowView(false, this.alertMsg, this.callback);
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
        //# sourceMappingURL=HomeGiftFetchView.js.map
        