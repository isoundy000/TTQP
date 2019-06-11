(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeEmailShowView/HomeEmailItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e459aTScplFiKYBClFaTGhy', 'HomeEmailItem', __filename);
// Script/HomeScript/HomeEmailShowView/HomeEmailItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 左边邮件是否打开的图标
        emailIconBtn: cc.Node,
        // 是否有附件的图标
        giftBoxIcon: cc.Node,
        // 昵称标签
        nameLabel: cc.Label,
        // 内容标签
        contentLabel: cc.Label,
        // 右边是否已经查看邮件的按钮
        goDetailBtn: cc.Node,
        // 右边是否查看过邮件的按钮内的文字按钮
        // statusTitleBtn: cc.Node,

        // 红点
        redPointIcon: cc.Node
    },

    onLoad: function onLoad() {},


    /**
     * 配置本类UI
     */
    init: function init(itemData, forIdx, onGoDetailHandle) {
        if (!itemData) return;
        this.itemData = itemData;
        this.onGoDetailHandle = onGoDetailHandle;

        this.nameLabel.string = itemData.nickname;

        this.contentLabel.string = this.onSubString(itemData.content);

        this.emailIconBtn.getComponent('HomeSelectBtn').onStatus(itemData.isRead == "1");
        this.redPointIcon.active = itemData.isRead == "0";

        this.giftBoxIcon.active = itemData.gold.toString().length > 0;

        this.goDetailBtn.getComponent('HomeSelectImgTitleBtn').onStatus(itemData.isRead == "1");
        this.goDetailBtn.tag = forIdx;

        // this.statusTitleBtn.getComponent('HomeSelectBtn').onStatus(itemData.isRead == "1");
    },


    // 判断字符串是否超过20，超过后打点
    onSubString: function onSubString(string, fontSize, maxWidth) {

        var newString = "";
        for (var i = 0; i < string.length; i++) {
            if (i < 20) {
                newString += string[i];
            } else {
                newString += "...";
                break;
            }
        }
        return newString;
    },


    /**
     * 设置点击查看按钮的tag值
     */

    /********************************  监听本类事件 ********************************/
    onGoDetailBtnClick: function onGoDetailBtnClick(event) {
        var tag = event.currentTarget.tag;

        if (this.onGoDetailHandle) {
            this.itemData.isOpen = "1";
            this.redPointIcon.active = false;
            this.onGoDetailHandle(this.itemData, tag);
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
        //# sourceMappingURL=HomeEmailItem.js.map
        