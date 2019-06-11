cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件背景View
        contentView: cc.Node,

        // 提示的内容标签
        alertMsgLabel: cc.Label,

        // 标题
        titleIcon: cc.Node,
    },

    onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(() => {
            self.onShowView(false, this.isShowDelTitleIcon, self.alertMsg, self.callback);
        });
     },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {提示信息} alertMsg    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView(isShow, isShowDelTitleIcon, alertMsg, callback) {
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
    onMenusBtnClick(event, customData) {
        var btnIdx = parseInt(customData);

        this.onShowView(false, this.isShowDelTitleIcon, this.alertMsg, this.callback);
        if (btnIdx == 0 && this.callback) {
            this.callback();
        }
    },

});
