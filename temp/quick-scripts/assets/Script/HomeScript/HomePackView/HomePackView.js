(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomePackView/HomePackView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e812a98fnBN5pzD6s4xCqbs', 'HomePackView', __filename);
// Script/HomeScript/HomePackView/HomePackView.js

'use strict';

var shop_icon_configs = require('Item');

cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,
        // 滑动视图控制器的content节点
        scrollContent: cc.Node,
        // 商品item
        shopItem: cc.Prefab,

        //-------------- 商品介绍控件 -------------
        // 商品名称
        shop_namelabel: cc.Label,
        // 商品个数
        shop_num_label: cc.Label,
        // 商品用途
        shop_intro_label: cc.Label,
        // 有效期
        shop_time_label: cc.Label,
        // 商品图标数组
        shopSpFrames: [cc.SpriteFrame],
        // 使用道具按钮
        useBtn: cc.Node,
        useBtnSpFrames: [cc.SpriteFrame]
    },

    onLoad: function onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(function () {
            self.onShowView(false, self.pack_shop_list);
        });

        this.shop_namelabel.string = '';
        this.shop_num_label.string = '';
        this.shop_intro_label.string = "";
        this.shop_time_label.string = '有效期至：';

        onfire.on("PackDataHandle", this.onGetPackData.bind(this));
        onfire.on("PackUseShopHandle", this.onPackUseShopData.bind(this));
    },


    /** 配置/创建Item
     */
    onConfigUI: function onConfigUI() {

        this.configUseBtnSPF(this.pack_shop_list == null || this.pack_shop_list.length == 0);

        // 移除掉所有的item
        this.scrollContent.removeAllChildren();

        if (this.pack_shop_list == null || this.pack_shop_list.length == 0) {

            this.shop_namelabel.string = '';
            this.shop_num_label.string = '';
            this.shop_intro_label.string = "";
            this.shop_time_label.string = '有效期至：';

            return;
        }

        // 创建item
        for (var i = 0; i < this.pack_shop_list.length; i++) {
            var item = cc.instantiate(this.shopItem);
            this.scrollContent.addChild(item);

            item.tag = i;
            item.on('click', this.onClickItem, this);

            var itemData = this.pack_shop_list[i];
            item.getComponent("HomePackShopItem").init(itemData, this.onGetIconConfigData(itemData.giftId));
            if (i == 0) {
                this.onClickItem(null);
            }
        }
    },
    configUseBtnSPF: function configUseBtnSPF(isNotClick) {
        var normalSprite = null;
        var pressedSprite = null;
        if (!isNotClick) {
            normalSprite = this.useBtnSpFrames[0];
            pressedSprite = this.useBtnSpFrames[1];
        } else {
            normalSprite = this.useBtnSpFrames[2];
            pressedSprite = this.useBtnSpFrames[2];
        }
        var button = this.useBtn.getComponent(cc.Button);
        button.normalSprite = normalSprite;
        button.pressedSprite = pressedSprite;
        this.useBtn.on('click', this.onUseBtnClick, this);
    },


    /**
     * 从配置文件中获取商品图标基本信息
     */
    onGetIconConfigData: function onGetIconConfigData(itemGiftId) {
        var iconConfigData = null;
        for (var i = 0; i < shop_icon_configs.length; i++) {
            var shop_iconData = shop_icon_configs[i];
            if (itemGiftId.toString() == shop_iconData.id.toString()) {
                iconConfigData = shop_iconData;
                break;
            }
        }
        return iconConfigData;
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow          
     */
    onShowView: function onShowView(isShow) {
        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            // 发送接口，获取当前用户背包数据
            this.onRequestForPackData();
        } else {
            this.contentView.setPositionY(-1300);
        }
    },


    /****************************************  本类发送接口相关  ****************************************/
    // 发送获取背包数据接口
    onRequestForPackData: function onRequestForPackData() {
        cc.scn.socket.send(10501, {});
    },


    // 发送 使用道具 接口
    onRequestForUseShopData: function onRequestForUseShopData() {

        var currentItemDic = this.pack_shop_list[this.currentItemClickIdx];
        if (parseInt(currentItemDic.giftId) == 10) {
            console.log("使用喇叭的时候要跳转到哪里去输入广播的文字 ====== ");
        } else {
            cc.scn.socket.send(10502, {
                "giftId": parseInt(currentItemDic.giftId),
                "context": ""
            });
        }
    },


    /****************************************  本类接口响应回调  ****************************************/
    // 获取背包数据接口回调
    onGetPackData: function onGetPackData(data) {
        if (!data || data.length == 0) return;
        this.pack_shop_list = data;
        this.onConfigUI();
    },


    // 使用道具 接口回调
    onPackUseShopData: function onPackUseShopData(data) {
        console.log("使用商品回调 === " + data);

        var currentItemDic = this.pack_shop_list[this.currentItemClickIdx];
        if (parseInt(currentItemDic.nums) > 1) {

            currentItemDic.nums = (parseInt(currentItemDic.nums) - 1).toString();
            this.shop_num_label.string = currentItemDic.nums;

            this.pack_shop_list[this.currentItemClickIdx] = currentItemDic;
        } else {
            this.pack_shop_list.splice(this.currentItemClickIdx, 1);
            this.currentItemClickIdx = 0;
            this.onConfigUI();
        }
    },


    /****************************************  本类事件监听  ****************************************/

    /**
     * 关闭按钮的点击
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.pack_shop_list);
    },


    /**
     * item的点击
     */
    onClickItem: function onClickItem(event) {

        var currentItemClickIdx = event ? event.currentTarget.tag : 0;
        this.currentItemClickIdx = currentItemClickIdx;

        var itemData = this.pack_shop_list[currentItemClickIdx];
        var iconConfigData = this.onGetIconConfigData(itemData.giftId);
        this.shop_namelabel.string = iconConfigData.name;
        this.shop_num_label.string = itemData.nums;
        this.shop_intro_label.string = iconConfigData.des;

        var date = new Date(itemData.pastTime);
        this.shop_time_label.string = '有效期至：' + date.getFullYear() + "-" + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1).toString() + '-' + date.getDate().toString();
    },


    /** 使用商品的按钮点击
     */
    onUseBtnClick: function onUseBtnClick(event) {
        if (this.pack_shop_list == null || this.pack_shop_list.length == 0) return;
        this.onRequestForUseShopData();
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
        //# sourceMappingURL=HomePackView.js.map
        