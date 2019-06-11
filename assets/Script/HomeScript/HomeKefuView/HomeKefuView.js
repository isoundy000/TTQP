const logList = [
    {"time": "2018/07/01 13:42:11", "content": "我是内容我是内容我是内容1", "isMe": "0"},
    {"time": "2018/07/02 13:42:11", "content": "我是内容2", "isMe": "1"},
    {"time": "2018/07/03 13:42:11", "content": "内容3", "isMe": "1"},
    {"time": "2018/07/04 13:42:11", "content": "我是内容我是内容我是内容我是内容我是内容我是内容4", "isMe": "0"},
    {"time": "2018/07/05 13:42:11", "content": "我是内容5", "isMe": "1"},
    {"time": "2018/07/06 13:42:11", "content": "我是内容6", "isMe": "0"},
    {"time": "2018/07/07 13:42:11", "content": "我是内容7", "isMe": "1"},
    {"time": "2018/07/08 13:42:11", "content": "我是内容我是内容我是内容我是内容我是内容我是内容我是内容孙女8", "isMe": "0"},
];

cc.Class({
    extends: cc.Component,

    properties: {
        logScrollView: cc.ScrollView,
        logScrollContent: cc.Node,
        charRowPrefab: cc.Prefab,


        msgEditBox: cc.EditBox,
    },

    onLoad () {
    },

    onCreateChatRow(dataList) {

        this.logScrollContent.removeAllChildren();
        for (let i = 0; i < dataList.length; i++) {
            const log = dataList[i];
            let item = cc.instantiate(this.charRowPrefab);
            this.logScrollContent.addChild(item);
            item.getComponent('HomeKefuChatRow').init(log, this.logScrollContent.width);
        }
        this.logScrollView.scrollToBottom(0.1);
    },

    /**
     * 弹出客服界面
     * @param {*} isShow    是否弹出
     * @param {*} callback  需要回调就用这个
     */
    onShowView(isShow, callback) {
        this.node.active = isShow;
        this.callback = callback;

        if (isShow) {
            this.onCreateChatRow(logList);
        }
    },

    onCloseBtnClick(event) {
        this.onShowView(false, this.dataList, this.callback);
    },

    onSendBtnClick(event) {
        let msg = this.msgEditBox.string ? this.msgEditBox.string : "";
        msg = msg.replace(/\n/g, '');
        
        if (msg.length == 0) {
            console.log("请输入要发送的文字");
        } else {
            let msgDic = {"time": "0000/00/00 00:00:00", "content": msg, "isMe": "1"};
            logList.push(msgDic);

            let answerDic = {"time": "1111/11/11 11:11:11", "content": msg, "isMe": "0"};
            logList.push(answerDic);

            this.onCreateChatRow(logList);

            this.msgEditBox.string = "";
        }
    },

});
