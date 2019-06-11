(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeAlertView/HomeAlertView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3c79bZhSXtG9JL912Bze6z2', 'HomeAlertView', __filename);
// Script/HomeScript/HomeAlertView/HomeAlertView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件背景View
        contentView: cc.Node,

        // 提示的内容标签
        alertMsgLabel: cc.Label,

        // 标题
        titleIcon: cc.Node
    },

    onLoad: function onLoad() {
        var _this = this;

        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false, _this.isShowDelTitleIcon, self.alertMsg, self.callback);
        });
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {提示信息} alertMsg    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, isShowDelTitleIcon, alertMsg, callback) {
        this.alertMsg = alertMsg;
        this.isShowDelTitleIcon = isShowDelTitleIcon;
        this.callback = callback;

        this.node.active = isShow;
        this.titleIcon.active = this.isShowDelTitleIcon;

        if (isShow) {
            this.alertMsgLabel.string = alertMsg;

            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0.000001, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /**
     * 点击确定和徐取消按钮
     */
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var btnIdx = parseInt(customData);

        this.onShowView(false, this.isShowDelTitleIcon, this.alertMsg, this.callback);
        if (btnIdx == 0 && this.callback) {
            this.callback();
        }
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
        //# sourceMappingURL=HomeAlertView.js.map
        