(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/mallScript/mallScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b71b5Q8BFhK/o0Z09nxzIT7', 'mallScript', __filename);
// Script/mallScript/mallScript.js

"use strict";

var mallData = require("mall-data");
var socket = require("websocketScript");
// var ws = new WebSocket("ws://192.168.3.22:8072");

cc.Class({
    extends: cc.Component,

    properties: {

        // 金币
        mall_gold_text: cc.Label,
        // 钻石
        mall_diamond_text: cc.Label,
        // 返回
        mall_back_btn: cc.Button,
        // 钻石按钮
        mall_diamond_btn: cc.Button,
        // 金币按钮
        mall_gold_btn: cc.Button,
        // 道具按钮
        mall_prop_btn: cc.Button,
        // 滑动视图
        mall_scrollview: cc.ScrollView,
        // 滑动 content
        mall_scroll_content: cc.Node,
        // item
        mall_scroll_item: cc.Prefab,
        // 弹出 购买层
        mall_alert_box: cc.Node,
        // 弹出 钻石不足层
        mall_diamondLack_box: cc.Node,
        // 确认按钮
        mall_sure_btn: cc.Button,
        // 取消按钮
        mall_cancel_btn: cc.Button,
        // 弹框文字
        mall_alert_text: cc.Label,
        // 支付web
        mall_payWebView: cc.Node
    },

    // 钻石 1001、金币 1002、道具 1003  按钮事件
    onDiamondGoldAndPropAction: function onDiamondGoldAndPropAction(event, customData) {

        // 钻石商城
        if (customData == "1001") {
            this.setContentList(this.mallItemData.diamond, "1001");
            this.mall_diamond_btn.getComponent('mallClassBtnScript').setBtnStatus(true, 1);
            this.mall_gold_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 2);
            this.mall_prop_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 3);
        }
        // 金币商城
        else if (customData == "1002") {
                this.setContentList(this.mallItemData.gold, "1002");
                this.mall_diamond_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 1);
                this.mall_gold_btn.getComponent('mallClassBtnScript').setBtnStatus(true, 2);
                this.mall_prop_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 3);
            }
            // 道具商城
            else if (customData == "1003") {
                    this.setContentList(this.mallItemData.prop, "1003");
                    this.mall_diamond_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 1);
                    this.mall_gold_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 2);
                    this.mall_prop_btn.getComponent('mallClassBtnScript').setBtnStatus(true, 3);
                }
    },

    onBackAction: function onBackAction() {
        console.log("back", this.node._parent);
        // cc.director.loadScene("Home");
        this.node._parent.active = false;
    },
    // 弹框 按钮事件
    onSureAndCancelAction: function onSureAndCancelAction(event, customData) {

        this.mall_alert_box.active = false;
        if (customData == "sure") {
            console.log(this.buyItemObj);
            if (this.buyItemObj.hType != 'diamond') {
                // 需要做钻石比较 购买消耗的钻石不能大于用户拥有的钻石
                if (this.buyItemObj.price > parseInt(this.mall_diamond_text.string)) {

                    this.mall_diamondLack_box.active = true;
                    return;
                }
            }
            var parm = { 'id': this.buyItemObj.id, 'num': 1 };
            cc.scn.socket.send(10666, parm);
        } else if (customData == "lack") {
            this.mall_diamondLack_box.active = false;
            this.setContentList(this.mallItemData.diamond, "1001");
            this.mall_diamond_btn.getComponent('mallClassBtnScript').setBtnStatus(true, 1);
            this.mall_gold_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 2);
            this.mall_prop_btn.getComponent('mallClassBtnScript').setBtnStatus(false, 3);
        } else {
            return;
        }
    },

    // LIFE-CYCLE CALLBACKS:


    onLoad: function onLoad() {

        // 本地数据
        this.configMallData();

        // 默认 钻石商城
        this.setContentList(this.mallItemData.diamond, "1001");

        var self = this;
        // 定义全局属性
        // cc.scn = {};
        // cc.scn.socket = socket.connect();


        // 购买对象
        this.buyItemObj = null;

        // 动态控制 item padding  1500 为设计分辨率宽
        var s = cc.director.getVisibleSize();
        if (s.width > 1500) {
            var paddingL = 0;
            var surplus = s.width - 565 - 935;
            if (surplus > 325) {
                paddingL = (surplus - 325) / 2;
            } else {
                paddingL = surplus / 2;
            }
            var layout = this.mall_scroll_content.getComponent(cc.Layout);
            layout.paddingLeft = paddingL;
            layout.paddingRight = paddingL;
        }

        // 事件监听
        this.onItemLayerAction("onBuyAction", this.mall_alert_box);

        onfire.on("mallBuyAtMessage", this.mallBuyAtMessage.bind(this));
        onfire.on("updateGoldAtMessage", this.updateGoldAtMessage.bind(this));
        onfire.on("updateDiamondAtMessage", this.updateDiamondAtMessage.bind(this));
    },

    // 数据
    configMallData: function configMallData() {

        this.mallItemData = {};
        this.mallItemData.diamond = [];
        this.mallItemData.gold = [];
        this.mallItemData.prop = [];
        for (var idx = 0; idx < mallData.length; idx++) {
            var dic = mallData[idx];
            if (dic["hType"] == "diamond") {
                this.mallItemData.diamond.push(dic);
            } else if (dic["hType"] == "gold") {
                this.mallItemData.gold.push(dic);
            } else if (dic["hType"] == "prop") {
                this.mallItemData.prop.push(dic);
            }
        }

        // 金币
        this.mall_gold_text.string = ttqp_global.currentUserInfo.gold;
        // 钻石
        this.mall_diamond_text.string = ttqp_global.currentUserInfo.diamond;
    },
    // 根据状态 传递不同数据 创建item
    setContentList: function setContentList(lists, tag) {

        this.mall_scroll_content.removeAllChildren();
        this.mall_scrollview.scrollToTop(0.01);

        for (var index = 0; index < lists.length; index++) {
            var item = cc.instantiate(this.mall_scroll_item);
            this.mall_scroll_content.addChild(item);
            var dict = lists[index];
            item.getComponent('goldItemScript').init(dict, tag);
        }
    },

    // 监听购买事件
    onItemLayerAction: function onItemLayerAction(name, nd) {

        // 监听 name 事件
        this.node.on(name, function (event) {
            // 中断冒泡
            event.stopPropagation();
            // 获取用户数据
            var obj = event.getUserData()[0];

            this.setAlertText(obj);

            this.buyItemObj = obj;
            // 显示层
            nd.active = true;

            var anim = nd.getComponent(cc.Animation);
            anim.play();
        }, this);

        // 监听遮罩层 touch 事件 变向禁止触摸吞噬！！！！！
        // 用 BlockInputEvents 组件替换
        // nd.on(cc.Node.EventType.TOUCH_END, function(event) {}, this);
    },
    // 设置提示文
    setAlertText: function setAlertText(obj) {
        switch (obj.tag) {
            case '1001':
                this.mall_alert_text.string = "确定消耗" + obj.price + "元购买" + obj.total;
                break;
            case '1002':
                this.mall_alert_text.string = "确定消耗" + obj.price + "钻石购买" + obj.detail;
                break;
            case '1003':
                this.mall_alert_text.string = "确定消耗" + obj.price + "钻石购买" + obj.detail + "表情";
                break;

            default:
                break;
        }
    },
    // websocket message 监听事件
    mallBuyAtMessage: function mallBuyAtMessage(obj) {
        console.log('购买成功');
        if (this.buyItemObj.hType == 'diamond') {
            console.log('购买钻石' + obj.url);
            this.mall_payWebView.active = true;
            this.mall_payWebView.getComponent(cc.WebView).url = obj.url;
        }
    },
    updateGoldAtMessage: function updateGoldAtMessage(obj) {
        this.mall_gold_text.string = String(obj.gold);
        ttqp_global.currentUserInfo.diamond = obj.gold.toString();
    },
    updateDiamondAtMessage: function updateDiamondAtMessage(obj) {
        this.mall_diamond_text.string = String(obj.diamond);
        ttqp_global.currentUserInfo.gold = obj.diamond.toString();
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
        //# sourceMappingURL=mallScript.js.map
        