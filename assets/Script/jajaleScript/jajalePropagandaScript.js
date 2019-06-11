
cc.Class({
    extends: cc.Component,

    properties: {
        editText: '',
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {


        // 喊话成功
        onfire.on('jajalePropagandaMessage', this.jajalePropagandaMessage.bind(this));

        this.node.on(cc.Node.EventType.TOUCH_END, function(event) { this.node.active = false; }, this);
    },

    /**
     * 关闭窗口
     */
    onCloseJajalePropaganda: function() {
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function(event, customData) {
        if (customData === 'sure') {
            cc.scn.socket.send(112212,{'message': this.editText});
        } else if (customData === 'cancel') {
            this.node.active = false;
        } 
    },
    /**
     * 输入喊话内容 监听
     */
    onTextChanged: function(text, event, customData) {
        this.editText = text;
    },
    jajalePropagandaMessage: function() {
        console.log('喊话成功提示');
        this.node.active = false;
    }
});
