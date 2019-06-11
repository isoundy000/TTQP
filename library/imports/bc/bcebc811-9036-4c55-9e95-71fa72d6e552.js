"use strict";
cc._RF.push(module, 'bcebcgRkDZMVZ6Vcfpy1uVS', 'manageListScript');
// Script/jajaleScript/manageList/manageListScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        // 当家列表 content view
        manageListContentView: cc.Node,
        // 当家列表 item
        managePlayerItem: cc.Prefab,
        // 设置当家金币 lab
        setManageGoldLab: cc.Label,
        // 设置当家赔付金币 lab
        setCompensateGoldLab: cc.Label,
        // 
        cancelManageBox: cc.Node,

        // 设置当家金币 +号按钮
        addBtn1: cc.Button,
        // 设置当家金币 -号按钮
        subBtn1: cc.Button,
        // 设置当家赔付金币 +号按钮
        addBtn2: cc.Button,
        // 设置当家赔付金币 -号按钮
        subBtn2: cc.Button,
        // 自动排队 icon
        zdpdIcon: cc.Sprite,
        // 申请当家文字 icon
        sqdjIcon: cc.Sprite,

        // 当家金币
        setManageGold: 100000000,
        // 当家赔付金币
        setCompensateGold: 100000000,
        // 排队roleID数组
        manageRoleIdArr: [],
        // 是否自动排队
        isAutoApplyFor: false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 当家玩家列表
        onfire.on('jajaleManagePlayerListMessage', this.jajaleManagePlayerListMessage.bind(this));
        // 申请当家
        onfire.on('jajaleApplyForManageMessage', this.jajaleApplyForManageMessage.bind(this));
        // 自动排队
        onfire.on('jajaleAutoQueueMessage', this.jajaleAutoQueueMessage.bind(this));

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.node.active = false;
        }, this);

        // 百家厅 默认值
        this.setManageGoldLab.string = ttqp_global.unitConversion(this.setManageGold);
        this.setCompensateGoldLab.string = ttqp_global.unitConversion(this.setCompensateGold);

        // 当前玩家是否当家
        cc.jajale.enterRoomData.isManage = false;
    },

    /**
     * 关闭弹窗
     */
    onCloseManageListBox: function onCloseManageListBox() {
        this.node.active = false;
    },
    /**
     * 申请当家
     */
    onSQDJHandle: function onSQDJHandle() {
        if (!cc.jajale.play) {
            console.log('需要坐下才可以操作');
            return;
        }
        console.log('申请当家');

        if (this.manageRoleIdArr.indexOf(ttqp_global.currentUserInfo.roleId) == -1) {
            // 不在排队列表
            if (ttqp_global.currentUserInfo.roleId === cc.jajale.enterRoomData.bossId) {
                console.log('您已经在当家状态，不可申请');
                return;
            }
            // else if (this.manageRoleIdArr.indexOf(ttqp_global.currentUserInfo.roleId) != -1) {
            //     console.log('您已经在排队状态，不可申请');
            //     return;
            // }
            else if (cc.jajale.enterRoomData.dragInGold < 100000000) {
                    console.log('金币不足1亿，不能申请');
                    return;
                } else if (this.manageRoleIdArr.length >= 500) {
                    console.log('排队人数已满500，不可申请');
                    return;
                } else {
                    /**
                     * roomType:(int)//是1百家厅，2是朋友厅
                     * bossGold(int):当家金币，玩家拿出多少钱去当庄
                     * payBet(int):赔付金额， 一把玩家最多赔付多少
                     */
                    var p = {
                        'roomType': cc.jajale.enterRoomData.roomType,
                        'bossGold': this.setManageGold,
                        'payBet': this.setCompensateGold
                    };
                    cc.scn.socket.send(112210, p);
                }
        } else {
            console.log('弹出取消申请框');
            this.cancelManageBox.active = true;
            var str = cc.jajale.enterRoomData.isManage ? '您确定要取消当家状态吗？' : '您确定要取消当家申请吗？';
            this.cancelManageBox.getComponent('cancelManageScript').setHintText(str);
        }
    },
    /**
     * 加 减
     */
    onSetGoldHandle: function onSetGoldHandle(event, customData) {
        if (!cc.jajale.play) {
            console.log('需要坐下才可以操作');
            return;
        }
        if (cc.jajale.enterRoomData.dragInGold < 100000000) {
            console.log('带入金币少于当家最低金额');
            return;
        }
        console.log('加 减', customData);
        switch (customData) {
            case 'addBtn1':

                if (this.setManageGold + 10000000 > cc.jajale.enterRoomData.dragInGold) {
                    console.log('当家金额不能大于携带的金币数量');
                    return;
                } else {
                    this.setManageGold += 10000000;
                }

                break;
            case 'subBtn1':
                if (this.setManageGold - 10000000 < 100000000) {
                    console.log('当家金额不能低于1亿');
                    return;
                } else {
                    this.setManageGold -= 10000000;
                }
                break;
            case 'addBtn2':
                if (this.setCompensateGold + 10000000 > this.setManageGold) {
                    console.log('赔付金额不能大于当家金额');
                    return;
                } else {
                    this.setCompensateGold += 10000000;
                }
                break;
            case 'subBtn2':
                if (this.setCompensateGold - 10000000 < this.setManageGold * 0.2) {
                    console.log('赔付金额不能低于当家金币的20%');
                    return;
                } else {
                    this.setCompensateGold -= 10000000;
                }
                break;

            default:
                break;
        }

        this.setManageGoldLab.string = ttqp_global.unitConversion(this.setManageGold);
        this.setCompensateGoldLab.string = ttqp_global.unitConversion(this.setCompensateGold);
    },
    /**
     * 自动排队
     */
    onZDPDHandle: function onZDPDHandle() {
        if (!cc.jajale.play) {
            console.log('需要坐下才可以操作');
            return;
        }
        console.log('自动排队');
        if (this.manageRoleIdArr.indexOf(ttqp_global.currentUserInfo.roleId) == -1) {
            console.log('您没有在申请当家列表中');
        } else {
            // 排队
            cc.scn.socket.send(112209, { 'isAutoList': !this.isAutoApplyFor });
        }
    },
    /**
    * 当家玩家列表 回调
    */
    jajaleManagePlayerListMessage: function jajaleManagePlayerListMessage(data) {
        var _this = this;

        console.log('当家列表', data);
        var self = this;
        this.manageRoleIdArr = [];
        this.manageListContentView.removeAllChildren();

        this.isAutoApplyFor = data.isAutoList;

        var file = "textures/jajale/manage/jajale-sqdj";
        var zdpdText = this.isAutoApplyFor ? 'draw1' : 'draw2';
        cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame(zdpdText);
            self.zdpdIcon.spriteFrame = frame;
        });

        var list = data.bossList;
        for (var index = 0; index < list.length; index++) {
            var item = cc.instantiate(this.managePlayerItem);
            this.manageListContentView.addChild(item);
            item.getComponent('manageListItemScript').initManageListItem(list[index]);
            this.manageRoleIdArr.push(list[index].roleId);
        }
        setTimeout(function () {
            console.log('id 列表', _this.manageRoleIdArr);
            if (_this.manageRoleIdArr.indexOf(ttqp_global.currentUserInfo.roleId) != -1) {
                // 当前用户已在排队列表
                cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {

                    var frame = atlas.getSpriteFrame('qxdj');
                    self.sqdjIcon.spriteFrame = frame;
                });
            } else {
                cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {

                    var frame = atlas.getSpriteFrame('sqdj');
                    self.sqdjIcon.spriteFrame = frame;
                });
            }
        }, 0);
    },
    /**
     * 申请当家 回调
     */
    jajaleApplyForManageMessage: function jajaleApplyForManageMessage(data) {

        // 获取当家列表 roomType:(int) 是1百家厅，2是朋友厅
        cc.scn.socket.send(112208, { 'roomType': cc.jajale.enterRoomData.roomType });

        this.sqdjIcon.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/jajale/manage/jajale-sqdj.plist/qxdj.png"));
    },
    /**
     * 自动排队 回调
     */
    jajaleAutoQueueMessage: function jajaleAutoQueueMessage(data) {

        var self = this;

        this.isAutoApplyFor = data.isAutoList;

        var file = "textures/jajale/manage/jajale-sqdj";
        var zdpdText = this.isAutoApplyFor ? 'draw1' : 'draw2';
        cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {
            var frame = atlas.getSpriteFrame(zdpdText);
            self.zdpdIcon.spriteFrame = frame;
        });
    }

});

cc._RF.pop();