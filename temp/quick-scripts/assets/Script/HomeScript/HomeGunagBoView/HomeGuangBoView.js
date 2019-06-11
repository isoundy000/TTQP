(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeGunagBoView/HomeGuangBoView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f9a1e5gN7NBXLnH42DO0GWJ', 'HomeGuangBoView', __filename);
// Script/HomeScript/HomeGunagBoView/HomeGuangBoView.js

'use strict';

// let guanggaos = [
//     {"sender": "测试测试测试测试1", "msg": "大师傅的按斯蒂芬1"},
//     {"sender": "测试测试2", "msg": "大师傅的按时发大水发斯蒂芬2"},
//     {"sender": "测试3", "msg": "大师傅的水发斯蒂芬3"},
//     {"sender": "测试测试测试测试测试4", "msg": "大师傅的按时发大水发斯蒂芬4"},
//     {"sender": "测试5", "msg": "大师傅的按时发大水发时发大水发斯蒂时发大水发斯蒂斯蒂芬5"},
//     {"sender": "测试6", "msg": "大师傅的按时发大水发斯蒂芬6"},
//     {"sender": "测试测试7", "msg": "大师傅的按时发大水发斯蒂时发大水发斯蒂芬7"},
//     {"sender": "测试8", "msg": "大师傅的按时发大水发斯蒂芬8"},
//     {"sender": "测试测试9", "msg": "大师傅的按时发大水时发大水发斯蒂时发大水发斯蒂发斯蒂芬9"},
//     {"sender": "系统公告测试10", "msg": "大师傅的按时发大水发斯蒂芬10"},
// ];

cc.Class({
    extends: cc.Component,

    properties: {
        radioLabelPrefab: cc.Prefab
    },

    onLoad: function onLoad() {

        this.broadcastList = [];
        // this.broadcastList = guanggaos;

        // 初始化对象池
        HPool.initObjPool(this, 'HomeRadioPool');

        // 获取任务列表
        onfire.on("HomeGetBroadcastHandle", this.onGetBroadcastData.bind(this));

        this.onCreateItem();
    },

    /**
     * 创建广告标签
     */
    onCreateItem: function onCreateItem() {
        if (this.broadcastList.length > 0) {
            var windowSize = cc.view.getVisibleSize();
            var parentNodeW = windowSize.width - 150;

            var newNode = HPool.onCreateItem(this['HomeRadioPool'], this.radioLabelPrefab, this.node);
            // newNode.getComponent(cc.Label).string = this.broadcastList[0].sender.toString() + ':' + this.broadcastList[0].msg.toString();
            newNode.setPosition(cc.p(parentNodeW, -100));
            newNode.getComponent('HomeGuangBoItem').init(this.broadcastList[0]);
            this.broadcastList.splice(0, 1);
        }
    },
    onGetBroadcastData: function onGetBroadcastData(data) {
        if (data) {
            this.broadcastList.push(data);
            if (this.broadcastList.length == 1) {
                this.onCreateItem();
            }
        }
    },
    onNextGuanggao: function onNextGuanggao() {
        this.onCreateItem();
    },
    onRecyclingNode: function onRecyclingNode(node) {
        HPool.onRecyclingNodeToPool(this, 'HomeRadioPool', node);
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
        //# sourceMappingURL=HomeGuangBoView.js.map
        