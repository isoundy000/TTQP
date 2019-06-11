"use strict";
cc._RF.push(module, '25846uvAhlM1ISgau10oXrz', 'jajaleDelRoomScript');
// Script/jajaleScript/PYT/jajaleDelRoomScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 删除房间
        onfire.on("jajaleDelRoomMessage", this.jajaleDelRoomMessage.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.node.active = false;
        }, this);
    },


    /**
     * 关闭删除房间窗口
     */
    onCloseDelRoomHandle: function onCloseDelRoomHandle() {
        console.log('close');
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function onSureOrCancelHandle(event, customData) {
        if (customData === 'sure') {

            // 删除房间
            cc.scn.socket.send(112207);
        } else if (customData === 'cancel') {
            this.node.active = false;
        }
    },
    jajaleDelRoomMessage: function jajaleDelRoomMessage() {

        cc.scn.socket.send(112201);
        this.node.active = false;
    }
});

cc._RF.pop();