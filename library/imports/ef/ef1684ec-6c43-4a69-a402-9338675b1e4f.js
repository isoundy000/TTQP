"use strict";
cc._RF.push(module, 'ef168TsbENKaaQCkzhnWx5P', 'jajalePropagandaScript');
// Script/jajaleScript/jajalePropagandaScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        editText: ''
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // 喊话成功
        onfire.on('jajalePropagandaMessage', this.jajalePropagandaMessage.bind(this));

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.node.active = false;
        }, this);
    },


    /**
     * 关闭窗口
     */
    onCloseJajalePropaganda: function onCloseJajalePropaganda() {
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function onSureOrCancelHandle(event, customData) {
        if (customData === 'sure') {
            cc.scn.socket.send(112212, { 'message': this.editText });
        } else if (customData === 'cancel') {
            this.node.active = false;
        }
    },
    /**
     * 输入喊话内容 监听
     */
    onTextChanged: function onTextChanged(text, event, customData) {
        this.editText = text;
    },
    jajalePropagandaMessage: function jajalePropagandaMessage() {
        console.log('喊话成功提示');
        this.node.active = false;
    }
});

cc._RF.pop();