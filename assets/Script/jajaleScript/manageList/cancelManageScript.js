

cc.Class({
    extends: cc.Component,

    properties: {
        // 
        hintLab: cc.Label,      
              
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        
        // 取消当家
        onfire.on('jajaleCancelManageMessage', this.jajaleCancelManageMessage.bind(this));
        
        this.node.on(cc.Node.EventType.TOUCH_END, function(event) { this.node.active = false; }, this);

        
    },
    setHintText: function(str) {
        // var str = cc.jajale.enterRoomData.isManage ? '您确定要取消当家状态吗？':'您确定要取消当家申请吗？';
        this.hintLab.string = str;
    },
    /**
     * 关闭窗口
     */
    onCloseCancelManage: function() {
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function(event, customData) {
        if (customData === 'sure') {
            // 取消申请当家
            cc.scn.socket.send(112211);
        } else if (customData === 'cancel') {
            this.node.active = false;
        } 
    },

    
    /**
     * 取消申请当家排队 回调
     */
    jajaleCancelManageMessage: function(data) {
        // 获取当家列表 roomType:(int) 是1百家厅，2是朋友厅
        cc.scn.socket.send(112208,{'roomType': cc.jajale.enterRoomData.roomType});

        this.node.active = false;

        if (cc.jajale.enterRoomData.isManage) {
            console.log('牌局结束后取消您的当家状态');
        }else {
            console.log('取消申请当家成功');
        }
        
    },

});
