(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/PYT/jajaleRoomPswScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bfc63kC865Hlab8BBlamwNx', 'jajaleRoomPswScript', __filename);
// Script/jajaleScript/PYT/jajaleRoomPswScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        editText: null,
        roomId: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 验证房间密码        
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.node.active = false;
        }, this);
    },

    configurea: function configurea(roomId) {
        this.roomId = roomId;
    },
    /**
     * 关闭删除房间窗口
     */
    onCloseRoomPswHandle: function onCloseRoomPswHandle() {
        console.log('close');
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function onSureOrCancelHandle(event, customData) {
        if (customData === 'sure') {
            //  进入房间
            var params = {

                "roomId": this.roomId,
                "roomPwd": this.editText,
                "enterType": 2
            };
            cc.scn.socket.send(112204, params);
        } else if (customData === 'cancel') {
            this.node.active = false;
        }
    },
    /**
     * 输入密码内容 监听
     */
    onTextChanged: function onTextChanged(text, event, customData) {
        this.editText = text;
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=jajaleRoomPswScript.js.map
        