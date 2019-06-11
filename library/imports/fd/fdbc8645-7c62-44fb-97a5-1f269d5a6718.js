"use strict";
cc._RF.push(module, 'fdbc8ZFfGJE+5elHyadWmcY', 'jajaleBottomScript');
// Script/jajaleScript/combat/jajaleBottomScript.js

'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

cc.Class(_defineProperty({
    extends: cc.Component,

    properties: {
        // 头像
        userHead: cc.Sprite,
        // 昵称框
        userName: cc.Node,
        // 当家列表
        manageListBox: cc.Node,
        // 喊话层
        propagandaBox: cc.Node,
        // 
        lookonBox: cc.Node,
        // 昵称
        userNameLab: cc.Label,
        // 总金币
        userGoldLab: cc.Label,
        // 总钻石
        userDiamondLab: cc.Label,
        // 带入金币框
        dragInGoldBox: cc.Node,
        // 带入金币
        dragInGoldLab: cc.Label,
        // 重复投注按钮
        repeatBetBtn: cc.Button,
        // 重复投注按钮 文字
        repeatBetText: cc.Sprite,
        // 带入金币框
        carryGoldNode: cc.Node,

        // 特效
        effectLv: cc.Node,
        effectLan: cc.Node,
        effectZi: cc.Node,
        effectCHeng: cc.Node,
        effectHong: cc.Node,

        // 1重复，2取消重复下注,3没下注过
        repeatBetType: 3

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        // 坐下
        onfire.on('sitdownMessage', this.sitdownMessage.bind(this));
        // 刷新带入金币
        onfire.on('jajaleRefreshDragInGoldMessage', this.jajaleRefreshDragInGoldMessage.bind(this));
        // 带入成功后刷新 用户总金币
        onfire.on('jajaleRefreshUserGoldMessage', this.jajaleRefreshUserGoldMessage.bind(this));
        // 下发重复取消下注状态
        onfire.on('jajaleRepeatBetStatusMessage', this.jajaleRepeatBetStatusMessage.bind(this));
        // 下发重复投注
        onfire.on('jajaleRepeatBetMessage', this.jajaleRepeatBetMessage.bind(this));
        // 下发取消自动下注
        onfire.on('jajaleClearRepeatBetMessage', this.jajaleClearRepeatBetMessage.bind(this));
        // 站起旁观
        onfire.on('jajaleLookOnMessage', this.jajaleLookOnMessage.bind(this));
    },

    /**
     * 头像事件
     */
    onMineHeadHandle: function onMineHeadHandle() {
        console.log('用户头像');
        // 这里需要弹出 带入金币框，然后再发送下面的接口
        // cc.scn.socket.send(112215, {'gold': 200000000});
        if (cc.jajale.play) {
            // 弹个人信息框
        } else {
            this.carryGoldNode.active = true;
        }
    },
    /**
     * 筹码事件
     */
    onWeightsHandle: function onWeightsHandle(event, customData) {
        // console.log(customData,event.currentTarget);

        // 隐藏、停止所有特效节点
        this.effectLv.active = false;
        this.effectLan.active = false;
        this.effectZi.active = false;
        this.effectCHeng.active = false;
        this.effectHong.active = false;

        this.effectLv.getComponent(cc.Animation).stop();
        this.effectLan.getComponent(cc.Animation).stop();
        this.effectZi.getComponent(cc.Animation).stop();
        this.effectCHeng.getComponent(cc.Animation).stop();
        this.effectHong.getComponent(cc.Animation).stop();

        // 显示、播放当前特效节点
        event.currentTarget.children[1].active = true;
        var currentAnimation = event.currentTarget.children[1].getComponent(cc.Animation);
        currentAnimation.play();

        switch (customData) {
            case '1000':
                cc.jajale.enterRoomData.betChipNum = 1000;
                break;
            case '1万':
                cc.jajale.enterRoomData.betChipNum = 10000;
                break;
            case '10万':
                cc.jajale.enterRoomData.betChipNum = 100000;
                break;
            case '100万':
                cc.jajale.enterRoomData.betChipNum = 1000000;
                break;
            case '1000万':
                cc.jajale.enterRoomData.betChipNum = 10000000;
                break;

            default:
                break;
        }
    },
    /**
     * 申请当家事件
     */
    onApplyForManageHandle: function onApplyForManageHandle(event, customData) {
        this.manageListBox.active = true;
        // 获取当家列表 roomType:(int) 是1百家厅，2是朋友厅
        cc.scn.socket.send(112208, { 'roomType': cc.jajale.enterRoomData.roomType });
    },
    /**
     * 重复投注事件
     */
    onRepeatBetHandle: function onRepeatBetHandle(event, customData) {
        if (this.repeatBetType === 3) {
            return;
        }
        var type = this.repeatBetType === 1 ? 2 : 1;
        cc.scn.socket.send(112213, { 'type': type });
    },
    /**
     * 喊话
     */
    onPropagandaHandle: function onPropagandaHandle(event, customData) {
        this.propagandaBox.active = true;
    },
    /**
     * 成功坐下 回调
     */
    sitdownMessage: function sitdownMessage() {
        console.log('成功坐下');
        // 把旁观层隐藏
        this.lookonBox.active = false;

        this.dragInGoldBox.active = true;

        this.carryGoldNode.active = false;

        // 坐下成功后要换上玩家头像
        this.userName.active = true;
        this.userHead.spriteFrame = new cc.SpriteFrame(cc.url.raw('resources/textures/Home/img_test/home_top_head_test_icon.png'));
    },
    /**
     * 站起旁观 回调 
     */
    jajaleLookOnMessage: function jajaleLookOnMessage(data) {

        var self = this;

        this.lookonBox.active = true;

        this.dragInGoldBox.active = false;

        // 金币
        this.userGoldLab.string = 0;
        // 钻石
        this.userDiamondLab.string = 0;

        this.userName.active = false;
        cc.loader.loadRes("textures/jajale/jajale-carryGold", cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame('jajale-sitdown');
            self.userHead.spriteFrame = frame;
        });
    },
    /**
     * 刷新带入金币 回调
     */
    jajaleRefreshDragInGoldMessage: function jajaleRefreshDragInGoldMessage(data) {
        console.log('刷新带入金币', data);
        this.dragInGoldLab.string = ttqp_global.unitConversion(data.gold);
        cc.jajale.enterRoomData.dragInGold = data.gold;
    },
    /**
     * 带入成功更新总金币 回调
     */
    jajaleRefreshUserGoldMessage: function jajaleRefreshUserGoldMessage(data) {

        // 昵称 
        this.userNameLab.string = ttqp_global.currentUserData.userName;
        // 金币
        this.userGoldLab.string = ttqp_global.unitConversion(data.totalGold);
        // 钻石
        this.userDiamondLab.string = ttqp_global.currentUserInfo.diamond;

        // 这里是死数据，写完带入金币UI后要用输入的带入金币值
        this.dragInGoldLab.string = ttqp_global.unitConversion(data.intoGold);
        cc.jajale.enterRoomData.dragInGold = data.intoGold;
    },
    /**
     * 下发重复取消下注状态 回调
     */
    jajaleRepeatBetStatusMessage: function jajaleRepeatBetStatusMessage(data) {
        this.repeatBetType = data.repeatBetType;
        if (this.repeatBetType === 3) {
            console.log('什么鸡巴状态现在3', this.repeatBetType);
            this.repeatBetBtn.interactable = false;
            this.repeatBetBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/combat/jajale-Btn3.png"));
        } else if (this.repeatBetType === 2) {
            console.log('什么鸡巴状态现在2', this.repeatBetType);
            this.repeatBetBtn.interactable = true;
            this.repeatBetBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/combat/jajale-Btn2.png"));
            this.repeatBetText.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/combat/jajale-repeatBet.png"));
        } else {
            console.log('什么鸡巴状态现在1', this.repeatBetType);
            this.repeatBetBtn.interactable = true;
            this.repeatBetBtn.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/combat/jajale-Btn2.png"));
            this.repeatBetText.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/combat/jajale-clearRepeat.png"));
        }
    },
    /**
     * 下发重复投注 回调
     */
    jajaleRepeatBetMessage: function jajaleRepeatBetMessage(data) {
        console.log(data);
    },
    /**
     * 下发取消自动下注 回调
     */
    jajaleClearRepeatBetMessage: function jajaleClearRepeatBetMessage(data) {
        console.log(data.message);
    }
}, 'jajaleClearRepeatBetMessage', function jajaleClearRepeatBetMessage(data) {
    console.log(data.message);
}));

cc._RF.pop();