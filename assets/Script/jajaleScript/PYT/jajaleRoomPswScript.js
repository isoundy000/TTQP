
cc.Class({
    extends: cc.Component,

    properties: {
        editText: null,
        roomId: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 验证房间密码        
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) { this.node.active = false; }, this);
    },
    configurea: function(roomId) {
        this.roomId = roomId;
    },
    /**
     * 关闭删除房间窗口
     */
    onCloseRoomPswHandle: function() {
        console.log('close');
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function(event, customData) {
        if (customData === 'sure') {
            //  进入房间
            let params = {

                "roomId": this.roomId,
                "roomPwd": this.editText,
                "enterType": 2,
            };
            cc.scn.socket.send(112204, params);
        } else if (customData === 'cancel') {
            this.node.active = false;
        } 
    },
    /**
     * 输入密码内容 监听
     */
    onTextChanged: function(text, event, customData) {
        this.editText = text;        
    },

});
