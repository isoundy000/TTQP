"use strict";
cc._RF.push(module, '073feKqhatJyapuZ9tn6cJY', 'jajaleCreateRoomScript');
// Script/jajaleScript/jajaleCreateRoomScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        pswEdit: cc.EditBox,
        minGoldLab: cc.Label,
        minGold: 100000000
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.minGoldLab.string = ttqp_global.unitConversion(this.minGold);

        // 创建房间
        onfire.on('jajaleCreateRoomMessage', this.jajaleCreateRoomMessage.bind(this));
    },


    /**
     * 关闭创建房间窗口
     */
    onCloseCreateHomeHandle: function onCloseCreateHomeHandle() {
        console.log('close');
        this.node.active = false;
    },
    /**
     * 加 减
     */
    onSetGoldHandle: function onSetGoldHandle(event, customData) {
        switch (customData) {
            case 'add':
                if (this.minGold === 50000000) {
                    this.minGold = 100000000;
                } else if (this.minGold === 1000000000) {
                    this.minGold = 50000000;
                } else {
                    this.minGold += 100000000;
                }
                break;
            case 'sub':
                if (this.minGold === 50000000) {
                    this.minGold = 1000000000;
                } else if (this.minGold === 100000000) {
                    this.minGold = 50000000;
                } else {
                    this.minGold -= 100000000;
                }
                break;

            default:
                break;
        }
        this.minGoldLab.string = ttqp_global.unitConversion(this.minGold);
    },
    /**
     * 输入喊话内容 监听
     */
    onTextChanged: function onTextChanged(text, event, customData) {
        this.editText = text;
    },
    /**
     * 创建
     */
    onCreateRoom: function onCreateRoom() {

        var p = {
            'password': this.pswEdit.string,
            'minGold': this.minGold
        };
        cc.scn.socket.send(112203, p);
    },
    /**
     * 创建房间成功 回调
     */
    jajaleCreateRoomMessage: function jajaleCreateRoomMessage() {
        this.node.active = false;
        cc.scn.socket.send(112201);
    }
});

cc._RF.pop();