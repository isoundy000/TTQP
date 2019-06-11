"use strict";
cc._RF.push(module, '50c865wExlHn50+KGhMTllb', 'HomeGameLogView');
// Script/HomeScript/HomePersonInfoView/HomeGameLogView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,

        itemPrefab: cc.Prefab
    },

    onLoad: function onLoad() {
        onfire.on("HomeGameLogHandle", this.onGetGameLogHandle.bind(this));
    },
    onCreateItem: function onCreateItem(dataList) {

        this.scrollContent.removeAllChildren();

        for (var i = 0; i < dataList.length; i++) {
            var logData = dataList[i];
            var item = cc.instantiate(this.itemPrefab);
            this.scrollContent.addChild(item);
            item.getComponent('HomeActivityGonggaoTitleBtn').init(logData);
        }
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
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /****************************  本类接口相关  *************************/
    onGetGameLogRequest: function onGetGameLogRequest() {
        console.log("发送获取牌局记录的接口，目前还没有确定");
        cc.scn.socket.send(10403);
    },


    /*********************** 本类接口回调相关  **********************/
    onGetGameLogHandle: function onGetGameLogHandle(data) {
        var phone = this.phoneEditBox.string ? this.phoneEditBox.string : "";
        if (this.callback) {
            this.callback(phone);
        }
    },


    /****************************************  本类事件监听  ****************************************/
    /**
     * 点击确定和徐取消按钮
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false);
    }
});

cc._RF.pop();