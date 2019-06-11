(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/question/questionScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a4bdDWqm1F1oZjmvdgz4uq', 'questionScript', __filename);
// Script/jajaleScript/question/questionScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 玩法说明 按钮
        playingBtn: cc.Button,
        // 牌型介绍 按钮
        introductionBtn: cc.Button,
        // 当家说明 按钮
        manageBtn: cc.Button,
        // 玩法说明 节点
        playingNode: cc.Node,
        // 牌型介绍 节点
        introductionNode: cc.Node,
        // 当家说明 节点
        manageNode: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.onTopPageHandle(this.playingBtn, '玩法说明');

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.node.active = false;
        }, this);
    },


    /**
     * 关闭弹窗
     */
    onCloseQuestionBox: function onCloseQuestionBox() {
        this.node.active = false;
    },

    onTopPageHandle: function onTopPageHandle(event, customData) {
        console.log(customData);
        switch (customData) {
            case '玩法说明':
                this.playingBtn.getComponent('mallClassBtnScript').setBtnStatus(true, 1);
                this.introductionBtn.getComponent('mallClassBtnScript').setBtnStatus(false, 2);
                this.manageBtn.getComponent('mallClassBtnScript').setBtnStatus(false, 3);

                this.playingNode.active = true;
                this.introductionNode.active = false;
                this.manageNode.active = false;
                break;
            case '牌型介绍':
                this.playingBtn.getComponent('mallClassBtnScript').setBtnStatus(false, 1);
                this.introductionBtn.getComponent('mallClassBtnScript').setBtnStatus(true, 2);
                this.manageBtn.getComponent('mallClassBtnScript').setBtnStatus(false, 3);

                this.introductionNode.active = true;
                this.playingNode.active = false;
                this.manageNode.active = false;
                break;
            case '当家说明':
                this.playingBtn.getComponent('mallClassBtnScript').setBtnStatus(false, 1);
                this.introductionBtn.getComponent('mallClassBtnScript').setBtnStatus(false, 2);
                this.manageBtn.getComponent('mallClassBtnScript').setBtnStatus(true, 3);

                this.manageNode.active = true;
                this.playingNode.active = false;
                this.introductionNode.active = false;
                break;

            default:
                break;
        }
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
        //# sourceMappingURL=questionScript.js.map
        