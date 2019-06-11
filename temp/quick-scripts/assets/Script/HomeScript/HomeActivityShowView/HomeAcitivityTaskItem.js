(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeAcitivityTaskItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '825b65HmxJKIoyR6+eO9ekO', 'HomeAcitivityTaskItem', __filename);
// Script/HomeScript/HomeActivityShowView/HomeAcitivityTaskItem.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 标题
        titleLabel: cc.Label,
        // 奖励金币数量
        goldNumLabel: cc.Label,
        // 状态标签  未完成/完成
        statusLabel: cc.Label,
        // 进度标签
        progressLabel: cc.Label,
        // 领取按钮
        getBtn: cc.Node
    },

    onLoad: function onLoad() {},
    init: function init(data, idx, callback) {
        this.data = data;
        this.idx = idx;
        this.callback = callback;

        this.titleLabel.string = data.taskMsg.toString();
        this.goldNumLabel.string = "奖励：" + data.reward.toString() + "金币";

        var allProgress = data.target.toString();
        var currentProgress = data.process.toString();
        this.progressLabel.string = "进度：" + currentProgress + "/" + allProgress;

        this.getBtn.getComponent('HomeSelectBtn').onStatus(parseInt(allProgress) != parseInt(currentProgress) && parseInt(data.isRec) == 0);
    },
    onGetBtnClick: function onGetBtnClick(event) {
        var allProgress = this.data.target.toString();
        var currentProgress = this.data.process.toString();

        if (allProgress === currentProgress && parseInt(this.data.isRec) == 0) {
            if (this.callback) {
                this.callback(this.data, this.idx);
            }
        } else {
            console.log("任务还没有完成，不能领取");
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
        //# sourceMappingURL=HomeAcitivityTaskItem.js.map
        