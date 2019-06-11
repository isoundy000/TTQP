(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityPanView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a5aa19fHWZD/4Clh1UHBboT', 'HomeActivityPanView', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityPanView.js

'use strict';

// 所涉及到的本地配置数据文件
var shopItems = require('Item'); // 商品列表
var turnList = require('TurnTable'); // 转盘中的商品配置列表
var global_config_data = require('HallGameValue'); // 全局基本配置文件

cc.Class({
    extends: cc.Component,

    properties: {
        // 转盘上商品的图标节点数组
        itemIcons: [cc.Node],
        // 转盘上商品的图标背景节点数组
        itemBgViews: [cc.Node],

        // 开始抽奖按钮
        startBtn: cc.Node,
        // 金币数标签
        goldLabel: cc.Label,
        // 钻石数
        zuanLabel: cc.Label,
        // 免费次数提醒标签
        freeAlertNode: cc.Node,
        // 单次抽奖所需钻石数量标签背景
        singleCountZuanNode: cc.Node,
        // 单次抽奖所需钻石数量标签
        singleCountZuanLabel: cc.Label,
        // 十连抽标签
        tenCountZuanAlertLabel: cc.Label,

        // 抽奖成功后，弹出确认领取弹窗
        fetchView: cc.Node
    },

    onLoad: function onLoad() {
        this.isRunning = false;
        // 免费次数，默认为0
        this.free = "0";
        this.isTenLianZhuan = false;

        // 配置弹窗接口
        this.onRequestHandleConfig();

        // 配置本地数据
        this.onConfigDataSource();
        // 配置UI
        this.onConfigUI();

        this.angles = [360, 62, 125, 180, 240, 299];
        this.angleIdx = 0;

        // 监听金币和钻石变化
        onfire.on("updateGoldAtMessage", this.updateGoldAtMessage.bind(this));
        onfire.on("updateDiamondAtMessage", this.updateDiamondAtMessage.bind(this));
    },


    /**
     * 配置弹窗接口
     */
    onRequestHandleConfig: function onRequestHandleConfig() {
        onfire.on("HomeRotaryTableHandle", this.rotaryTableHandle.bind(this));
        onfire.on("HomeChoujiangHanle", this.getChoujiangHandle.bind(this));
        onfire.on("HomeGetFreeCountHandle", this.getFreeCount.bind(this));
    },


    /**
     * @param {是否显示转盘} isShow 
     */
    onShowView: function onShowView(isShow) {
        this.node.active = isShow;
        if (isShow) {
            this.onRotaryTableRequest();
        }
    },


    /****************************************  本类接口相关  ****************************************/
    // 获取签到数据
    onRotaryTableRequest: function onRotaryTableRequest() {
        cc.scn.socket.send(10801);
    },

    // 抽奖接口
    onChoujiangRequest: function onChoujiangRequest() {
        var type = 1;
        if (this.isTenLianZhuan) {
            type = 2;
        } else {
            type = parseInt(this.zhuanpanData.free) > 0 ? 3 : 1;
        }

        cc.scn.socket.send(10802, {
            "type": type
        });
    },


    /****************************************  本类接口回调相关  ****************************************/
    // 触发抽奖接口的奠基接口
    rotaryTableHandle: function rotaryTableHandle(data) {},

    // 抽奖接口回调，先请求成功后，才能进行抽奖
    getChoujiangHandle: function getChoujiangHandle(data) {
        if (data.err_code) {
            console.log("这里抽奖失败了都！！！");
            this.isRunning = false;
            return;
        }

        // 处理免费抽奖次数
        var freeCount = parseInt(this.zhuanpanData.free);
        if (!this.isTenLianZhuan && freeCount > 0) {
            this.zhuanpanData.free = (freeCount - 1).toString();
            this.free = this.zhuanpanData.free;
            this.freeAlertNode.active = freeCount - 1 > "0";
            this.singleCountZuanNode.active = !this.freeAlertNode.active;
        }

        this.idArray = data.resultList;

        this.onRunningAmin();
    },


    // 返回免费次数接口
    getFreeCount: function getFreeCount(data) {
        if (!this.node.active) return;
        console.log("getFreeCount === " + data.free);
        this.free = data.free.toString();
        this.zhuanpanData.free = this.free;
        this.freeAlertNode.active = parseInt(this.zhuanpanData.free) > "0";
        this.singleCountZuanNode.active = !this.freeAlertNode.active;
    },


    /**
     * 服务器主推金币变化接口回调
     */
    updateGoldAtMessage: function updateGoldAtMessage(obj) {
        ttqp_global.currentUserInfo.gold = obj.gold.toString();
        this.zhuanpanData.gold = ttqp_global.currentUserInfo.gold;
        this.goldLabel.string = this.zhuanpanData.gold;
    },

    /**
     * 服务器主推钻石变化接口回调
     */
    updateDiamondAtMessage: function updateDiamondAtMessage(obj) {
        ttqp_global.currentUserInfo.diamond = obj.diamond.toString();
        this.zhuanpanData.zuan = ttqp_global.currentUserInfo.diamond;
        this.zuanLabel.string = this.zhuanpanData.zuan;
    },

    // 获取转盘本地数据
    onConfigUI: function onConfigUI() {
        this.zuanLabel.string = this.zhuanpanData.zuan;
        this.goldLabel.string = this.zhuanpanData.gold;
        this.singleCountZuanLabel.string = this.zhuanpanData.single;
        this.tenCountZuanAlertLabel.string = this.zhuanpanData.ten;
        this.freeAlertNode.active = parseInt(this.zhuanpanData.free) > "0";
        this.singleCountZuanNode.active = !this.freeAlertNode.active;
    },


    /**
     * 单次循转
     */
    onSingleRotateFinish: function onSingleRotateFinish() {
        var _this = this;

        this.onConfigDataSource();

        if (this.angleIdx == 0) {
            this.onConfigItemBgView(true, false, false, false, false, false);
        } else if (this.angleIdx == 1) {
            this.onConfigItemBgView(false, true, false, false, false, false);
        } else if (this.angleIdx == 2) {
            this.onConfigItemBgView(false, false, true, false, false, false);
        } else if (this.angleIdx == 3) {
            this.onConfigItemBgView(false, false, false, true, false, false);
        } else if (this.angleIdx == 4) {
            this.onConfigItemBgView(false, false, false, false, true, false);
        } else if (this.angleIdx == 5) {
            this.onConfigItemBgView(false, false, false, false, false, true);
        }
        if (!this.isTenLianZhuan) {
            setTimeout(function () {
                var self = _this;
                _this.fetchView.getComponent('HomeActivityShopFetchView').onShowView(true, _this.onGetFetchShopItems(), function () {
                    var actionDefault = cc.rotateTo(0, 0);
                    self.startBtn.runAction(actionDefault);
                    self.onConfigItemBgView(false, false, false, false, false, false);
                });
            }, 1000);
        }
    },


    /**
     * 十连转完成
     */
    onTenLianZhuanFinish: function onTenLianZhuanFinish() {
        var _this2 = this;

        this.onSingleRotateFinish();
        setTimeout(function () {
            var self = _this2;
            _this2.fetchView.getComponent('HomeActivityShopFetchView').onShowView(true, _this2.onGetFetchShopItems(), function () {
                var actionDefault = cc.rotateTo(0, 0);
                self.startBtn.runAction(actionDefault);
                self.onConfigItemBgView(false, false, false, false, false, false);
            });
        }, 1000);
    },


    /**
     * 转到哪个商品，哪个商品亮起来
     */
    onConfigItemBgView: function onConfigItemBgView(isZero, isOne, isTwo, isThree, isFour, isFive) {
        this.itemBgViews[0].active = isZero;
        this.itemBgViews[1].active = isOne;
        this.itemBgViews[2].active = isTwo;
        this.itemBgViews[3].active = isThree;
        this.itemBgViews[4].active = isFour;
        this.itemBgViews[5].active = isFive;
    },


    /**
     * 开始按钮的点击
     */
    onStartBtnClick: function onStartBtnClick(event) {
        this.onConfigItemBgView(false, false, false, false, false, false);

        if (this.isRunning == false) {
            this.isTenLianZhuan = false;
            this.onChoujiangRequest();
            this.isRunning = true;
        }
    },

    /**
     * 十连转按钮的点击
     */
    onShiLianZhuanBtnClick: function onShiLianZhuanBtnClick(event) {
        if (this.isRunning == false) {

            this.isTenLianZhuan = true;
            this.onChoujiangRequest();
            this.isRunning = true;
        }
    },


    /**
     * 筛选，排查，统计所有抽中的物品和数量
     */
    onGetFetchShopItems: function onGetFetchShopItems() {
        var shopItems = [];
        if (this.idArray.length == 1) {
            for (var i = 0; i < this.zhuanpanData.shops.length; i++) {
                var shopData = this.zhuanpanData.shops[i];
                if (shopData.id == this.idArray[0]) {
                    shopData.getCount = "1";
                    shopItems.push(shopData);
                    break;
                }
            }
        } else {
            for (var _i = 0; _i < this.idArray.length; _i++) {
                var shopID = this.idArray[_i];

                for (var j = 0; j < this.zhuanpanData.shops.length; j++) {
                    var shopItem = this.zhuanpanData.shops[j];
                    if (shopItem.id == shopID) {
                        var count = shopItem.getCount ? parseInt(shopItem.getCount) : 0;
                        this.zhuanpanData.shops[j].getCount = (count + 1).toString();
                    }
                }
            }

            for (var k = 0; k < this.zhuanpanData.shops.length; k++) {
                var _shopItem = this.zhuanpanData.shops[k];
                if (parseInt(_shopItem.getCount) > 0) {
                    shopItems.push(_shopItem);
                }
            }
        }
        console.log("shopItems == ");
        console.log(shopItems);
        return shopItems;
    },
    onRunningAmin: function onRunningAmin() {
        var _this3 = this;

        if (this.isRunning == true) {
            var date = 0.3;
            var actionBy0 = cc.rotateBy(date, 360);
            var actionBy1 = cc.rotateBy(date, 720);
            var actionBy2 = cc.rotateBy(date, 720);
            var actionBy3 = cc.rotateBy(date, 720);
            var actionBy4 = cc.rotateBy(date, 720);
            var actionBy5 = cc.rotateBy(date, 720);
            var actionBy6 = cc.rotateBy(date, 720);
            var actionBy7 = cc.rotateBy(date, 360);

            for (var i = 0; i < this.zhuanpanData.shops.length; i++) {
                var shopData = this.zhuanpanData.shops[i];
                if (shopData.id == this.idArray[0]) {
                    this.angleIdx = i;
                }
            }
            var actionBy8 = cc.rotateBy(date * 2, this.angles[this.angleIdx]);
            var seq = cc.sequence(actionBy0, actionBy1, actionBy2, actionBy3, actionBy4, actionBy5, actionBy6, actionBy7, actionBy8);
            this.startBtn.runAction(seq);

            setTimeout(function () {
                // 判断是10连转还是单转
                if (_this3.isTenLianZhuan == true) {
                    _this3.onTenLianZhuanFinish();
                } else {
                    _this3.onSingleRotateFinish();
                }
                _this3.isRunning = false;
            }, date * 10 * 1000);
        }
    },
    onConfigDataSource: function onConfigDataSource() {

        var shopList = [];
        var turns = turnList;
        for (var i = 0; i < turns.length; i++) {
            var turnData = turns[i];
            for (var j = 0; j < shopItems.length; j++) {
                var itemData = shopItems[j];
                if (parseInt(turnData.mid) == parseInt(itemData.id)) {
                    turnData.shop = itemData;
                    break;
                }
            }
            turnData.getCount = "0";
            shopList.push(turnData);
        }

        this.zhuanpanData = {
            "zuan": ttqp_global.currentUserInfo ? ttqp_global.currentUserInfo.diamond.toString() : "",
            "gold": ttqp_global.currentUserInfo ? ttqp_global.currentUserInfo.gold.toString() : "",
            "free": this.free,
            "single": global_config_data[1].value.toString(),
            "ten": global_config_data[2].value.toString(),
            "shops": shopList
        };
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
        //# sourceMappingURL=HomeActivityPanView.js.map
        