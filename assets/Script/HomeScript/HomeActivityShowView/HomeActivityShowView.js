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
    },

    onLoad () {
        //
        this.onConfigActivityTypeBtn(true, false, false);
    },


    // 配置邮件类型按钮
    onConfigActivityTypeBtn(isActivity, isGameTask, isGonggao) {
        //
        this.activityBtn.getComponent('HomeSelectBtn').onStatus(isActivity);
        this.gameTaskBtn.getComponent('HomeSelectBtn').onStatus(isGameTask);
        this.gonggaoBtn.getComponent('HomeSelectBtn').onStatus(isGonggao);
    },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow
     */
    onShowView(isShow) {

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);
        } else {
            this.contentView.setPositionY(-1300);
        }
    },

    /**
     * 类型按钮切换
     * @param {按钮事件} event 
     * @param {属性编辑器中传递过来的数据} customData 
     */
    onEmailTypeBtnClick(event, customData) {
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
    }
});
