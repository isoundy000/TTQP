(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/jajaleCarryGoldScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5e5c9vm83xDO5MDWI1oe02s', 'jajaleCarryGoldScript', __filename);
// Script/jajaleScript/jajaleCarryGoldScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {

        editBox: cc.EditBox,
        editText: 10000,
        goldLabel: cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.node.active = false;
        }, this);
    },

    /**
     * 关闭窗口
     */
    onCloseJajaleCarryGold: function onCloseJajaleCarryGold() {
        this.node.active = false;
    },
    /**
     * 确定、取消
     */
    onSureOrCancelHandle: function onSureOrCancelHandle(event, customData) {
        if (customData === 'sure') {
            // cc.scn.socket.send(112212,{'message': this.editText});
            cc.scn.socket.send(112215, { 'gold': this.editText });
        } else if (customData === 'cancel') {
            this.node.active = false;
        }
    },
    /**
     * 加 减
     */
    onSetGoldHandle: function onSetGoldHandle(event, customData) {

        var tmp = parseInt(this.editText);
        switch (customData) {
            case 'addBtn':
                this.editText = tmp + 10000;
                break;
            case 'subBtn':
                if (this.editText <= 10000) {
                    console.log('已经是最低携带金币');
                    return;
                }
                this.editText = tmp - 10000;
                this.editText = this.editText < 10000 ? 10000 : this.editText;

                break;
            default:
                break;
        }
        console.log(this.editText);
        this.goldLabel.string = ttqp_global.unitConversion(this.editText);
    },
    /**
     * 输入喊话内容 监听
     */
    onTextChanged: function onTextChanged(text, event, customData) {
        this.editText = text;
    },
    onEditDidBegan: function onEditDidBegan() {
        this.goldLabel.string = '';
    },
    onEditDidEnded: function onEditDidEnded() {
        console.log(this.editText);
        this.editBox.string = '';
        this.goldLabel.string = ttqp_global.unitConversion(this.editText);
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
        //# sourceMappingURL=jajaleCarryGoldScript.js.map
        