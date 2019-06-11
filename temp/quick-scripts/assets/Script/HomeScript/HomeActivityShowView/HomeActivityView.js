(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e54b6kbpsxAmK2JNIIqtGGX', 'HomeActivityView', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,

        // 最新活动 类型按钮
        activityBtn: cc.Node,
        // 游戏任务 类型按钮
        gameTaskBtn: cc.Node,
        // 游戏公告 类型按钮
        gonggaoBtn: cc.Node,

        // 最佳公告View
        gonggaoView: cc.Node,
        // 最新任务View
        taskView: cc.Node,
        // 最热活动View - 转盘
        zhuanpanView: cc.Node
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onCloseBtnClick(null);
        });
    },


    // 配置类型按钮
    onConfigActivityTypeBtn: function onConfigActivityTypeBtn(isActivity, isGameTask, isGonggao) {

        this.activityBtn.getComponent('HomeSelectImgTitleBtn').onStatus(isActivity);
        this.zhuanpanView.getComponent('HomeActivityPanView').onShowView(isActivity);

        this.gameTaskBtn.getComponent('HomeSelectImgTitleBtn').onStatus(isGameTask);
        this.taskView.getComponent('HomeActivityTaskView').onShowView(isGameTask);

        this.gonggaoBtn.getComponent('HomeSelectImgTitleBtn').onStatus(isGonggao);
        this.gonggaoView.getComponent('HomeActivityGonggaoView').onShowView(isGonggao);
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     */
    onShowView: function onShowView(isShow) {

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            this.onConfigActivityTypeBtn(true, false, false);
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /**
     * 类型按钮切换
     * @param {按钮事件} event 
     * @param {属性编辑器中传递过来的数据} customData 
     */
    onMenusTypeBtnClick: function onMenusTypeBtnClick(event, customData) {
        var typeIdx = parseInt(customData);

        this.itemIdx = typeIdx;

        switch (typeIdx) {
            case 0:
                this.onConfigActivityTypeBtn(true, false, false);
                break;
            case 1:
                this.onConfigActivityTypeBtn(false, true, false);
                break;
            case 2:
                this.onConfigActivityTypeBtn(false, false, true);
                break;

            default:
                break;
        }
    },
    onCloseBtnClick: function onCloseBtnClick(event) {
        if (this.zhuanpanView.getComponent('HomeActivityPanView').isRunning == true) return;
        this.onShowView(false);
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
        //# sourceMappingURL=HomeActivityView.js.map
        