(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/combat/jajaleDeskScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9c182B37e9D4pxRerm6CNOZ', 'jajaleDeskScript', __filename);
// Script/jajaleScript/combat/jajaleDeskScript.js

'use strict';

var socket = require("websocketScript");
/**
 * 家家乐牌桌
 */
cc.Class({
    extends: cc.Component,

    properties: {
        // 发牌动画 1 
        landlordCard1: cc.Node,
        // 发牌动画 2
        landlordCard2: cc.Node,
        // 发牌动画 3
        farmerCard1: cc.Node,
        // 发牌动画 4
        farmerCard2: cc.Node,
        // 显示牌  地主1
        landlordShowCard1: cc.Node,
        // 显示牌  地主2
        landlordShowCard2: cc.Node,
        // 显示牌  地主3
        landlordShowCard3: cc.Node,
        // 显示牌  农民1
        farmerShowCard1: cc.Node,
        // 显示牌  农民2
        farmerShowCard2: cc.Node,
        // 显示牌  农民3
        farmerShowCard3: cc.Node,

        // 金币动画 容器
        goldContainer: cc.Node,

        // 倒计时框
        countdownBox: cc.Node,
        // 倒计时 数字1
        countdownNum1: cc.Sprite,
        // 倒计时 数字2
        countdownNum2: cc.Sprite,

        // 押注 直赢按钮
        withBtn: cc.Button,
        // 押注 农民1：1按钮
        farmerChipBtn: cc.Button,
        // 押注 农民对子按钮
        farmerPairBtn: cc.Button,
        // 押注 地主1：1按钮
        landlordChipBtn: cc.Button,
        // 押注 地主对子按钮
        landlordPairBtn: cc.Button,

        // 走势图层
        trendBox: cc.Node,
        // 玩法说明层
        questionBox: cc.Node,

        // 当家昵称
        manageLab: cc.Label,

        // 散牌1
        cardTypeNode1: cc.Sprite,
        // 散牌2
        cardTypeNode2: cc.Sprite,
        // 开牌的牌型
        cardTypeIcons: {
            default: [],
            type: cc.SpriteFrame
        },

        // 搓牌节点
        cardNode: cc.Node,

        // 返回下拉菜单
        backMenu: cc.Node,
        // 
        backSelectBG1: cc.Node,
        backSelectBG2: cc.Node,

        // 计时器
        jajaleInterval: null

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.animationContainer = this.goldContainer.getComponent('jajaleGoldContainerScript');

        this.configureData();

        // 坐下
        onfire.on('sitdownMessage', this.sitdownMessage.bind(this));
        // 发牌
        onfire.on('jajaleSendCardStateMessage', this.jajaleSendCardStateMessage.bind(this));
        // 下注
        onfire.on('jajaleBetMessage', this.jajaleBetMessage.bind(this));
        // 下发开牌
        onfire.on('jajaleOpenCardStateMessage', this.jajaleOpenCardStateMessage.bind(this));
        // 结算
        onfire.on('jajaleClearingMessage', this.jajaleClearingMessage.bind(this));
        // 状态改变
        onfire.on('jajaleGameStateMessage', this.jajaleGameStateMessage.bind(this));
        // 选择玩家搓牌
        onfire.on('jajaleSelectPlayerTwistMessage', this.jajaleSelectPlayerTwistMessage.bind(this));
        // 当家玩家
        onfire.on('jajaleManagePlayeryMessage', this.jajaleManagePlayeryMessage.bind(this));
        // 在线人数
        onfire.on('jajaleOnlineNumMessage', this.jajaleOnlineNumMessage.bind(this));
        // 站起旁观
        onfire.on('jajaleLookOnMessage', this.jajaleLookOnMessage.bind(this));
        // 走势图
        onfire.on('jajaleTrendMessage', this.jajaleTrendMessage.bind(this));
    },

    /**
     * 配置数据
     */
    configureData: function configureData() {
        var _this = this;

        // 存放 开牌的牌数
        this.showCardObj = {};

        // 下注状态
        this.betBtnInteractable = false;
        this.manageLab.string = cc.jajale.enterRoomData.nickname;

        console.log(cc.jajale.enterRoomData.countdown, '倒计时时间', cc.jajale.enterRoomData.status);
        if (cc.jajale.enterRoomData.status === 2 && cc.jajale.enterRoomData.countdown > 0) {
            console.log('初始状态：倒计时');
            this.countdownHandle();
        }

        // 3已发牌
        if (cc.jajale.enterRoomData.playerStatus === 3) {

            this.showCardObj = {
                'llc': cc.jajale.enterRoomData.sendList[0].cards,
                'fc': cc.jajale.enterRoomData.sendList[1].cards
            };

            if (cc.jajale.enterRoomData.status === 3) {
                console.log('初始状态：3已发牌，3发牌');
                this.dealed();
            } else if (cc.jajale.enterRoomData.status === 4) {
                console.log('初始状态：3已发牌，4A开牌');
                this.dealed();

                setTimeout(function () {
                    // A 开牌
                    _this.jajaleAOpenCardStateHandle();
                }, 0);
            } else if (cc.jajale.enterRoomData.status === 5) {
                console.log('初始状态：3已发牌，5B开牌');
                this.dealed();

                setTimeout(function () {
                    // B 开牌
                    _this.jajaleBOpenCardStateHandle();
                }, 0);
            }
        }

        // 6 A已开牌
        if (cc.jajale.enterRoomData.playerStatus === 6) {

            // 4 A开牌
            if (cc.jajale.enterRoomData.status === 4) {

                // 显示A三张牌，B两张，B准备开牌
                console.log('初始状态：6 A已开牌,4 A开牌');
            }
            // 5 B开牌
            if (cc.jajale.enterRoomData.status === 5) {

                // 显示A三张牌，B两张，B正在开牌
                console.log('初始状态：6 A已开牌,5 B开牌');
            }
        }

        // 7 B已开牌
        if (cc.jajale.enterRoomData.playerStatus === 7) {
            // 4 A开牌
            if (cc.jajale.enterRoomData.status === 4) {

                // 显示B三张牌，A两张，A正在开牌
                console.log('初始状态：7 B已开牌,4 A开牌');
            }
            // 5 B开牌
            if (cc.jajale.enterRoomData.status === 5) {

                // 显示B三张牌，A两张，A准备开牌
                console.log('初始状态：7 B已开牌,5 B开牌');
            }
        }

        // 8.A和B已开牌
        if (cc.jajale.enterRoomData.playerStatus === 8) {
            console.log('初始状态：8.A和B已开牌');
            var llc = cc.jajale.enterRoomData.sendList[0];
            this.createBrandSpriteFrame(this.landlordShowCard1, llc.cards[0]);
            this.createBrandSpriteFrame(this.landlordShowCard2, llc.cards[1]);
            var fc = cc.jajale.enterRoomData.sendList[1];
            this.createBrandSpriteFrame(this.farmerShowCard1, fc.cards[0]);
            this.createBrandSpriteFrame(this.farmerShowCard2, fc.cards[1]);
        }
    },
    /**
     * 返回、商城 按钮操作
     */
    onBackAndMallHandle: function onBackAndMallHandle(event, customData) {
        switch (customData) {
            case 'back':
                this.backSelectBG1.active = false;
                this.backSelectBG2.active = false;
                this.backMenu.active = true;
                break;
            case 'mall':

                break;
            default:
                break;
        }
    },
    /**
     * 返回大厅、站起旁观 按钮操作
     */
    onbackMenuHandle: function onbackMenuHandle(event, customData) {
        console.log(123, customData);
        var self = this;
        switch (customData) {
            case 'FHDT':
                this.backSelectBG1.active = true;

                // 这里 有是否坐下状态的需求 ！！！！
                //  如果在座位状态，就返回到游戏大厅，在返回大厅后，游戏大厅会显示游戏进行中列表，列表中会显示在进行中的家家乐游戏图标，点击家家乐图标后会返回到在进行的游戏房间中

                // 家家乐返回大厅
                cc.scn.socket.send(110102);

                // 110102 家家乐返回大厅 成功回调
                onfire.on("jajaleBackLobbyMessage", function () {

                    // 断开 游戏的服务器  连接 大厅的服务器
                    cc.scn.socket.socket.onclose();
                    cc.scn.socket.socket = {};
                    cc.scn.socket = socket.connect('home');
                    // 大厅服务器连接成功
                    onfire.on("socketOpen", function (data) {
                        // 返回大厅
                        if (data === 'home') {
                            var params = {
                                "token": ttqp_global.currentUserData.token,
                                "roleId": ttqp_global.currentUserInfo.roleId
                            };
                            cc.scn.socket.send(9001, params);
                        }
                    });
                });

                // 9001 返回大厅成功 
                onfire.on("backLobbyMessage", function () {

                    console.log('返回大厅成功');
                    clearInterval(self.jajaleInterval);
                    self.jajaleInterval = null;
                    cc.jajale.enterRoomData.countdown = 0;

                    cc.director.loadScene('Home');
                });
                break;
            case 'ZQPG':

                cc.scn.socket.send(112216);
                break;
            default:
                break;
        }
    },
    /**
     * 关闭返回菜单 操作
     */
    onCloseBackMenuHandle: function onCloseBackMenuHandle(event, customData) {
        this.backMenu.active = false;
    },
    /**
     * 走势图、问题 按钮操作
     */
    onTopHandle: function onTopHandle(event, customData) {
        console.log(123, customData);

        switch (customData) {
            case '走势图':
                cc.scn.socket.send(112214);
                break;
            case '问题':

                this.questionBox.active = true;
                break;
            default:
                break;
        }
    },
    /**
     * 底部操作按钮
     */
    onBottomHandle: function onBottomHandle(event, customData) {
        console.log(123, customData);

        // 下注索引
        var betIndex;
        switch (customData) {
            case '直赢':
                betIndex = 5;
                break;
            case '地主一比一':
                betIndex = 1;
                break;
            case '地主对子':
                betIndex = 3;
                break;
            case '农民一比一':
                betIndex = 2;
                break;
            case '农民对子':
                betIndex = 4;
                break;
            default:
                break;
        }
        // var num = Math.floor(Math.random()*(8-0+1)+0);
        // let  userIdx = 8; 
        // this.animationContainer.creatorBetAnimationGoldNode(betIndex, userIdx);

        // 押注
        console.log('下注金额：', cc.jajale.enterRoomData.betChipNum);
        if (cc.jajale.play) {
            cc.scn.socket.send(112301, { 'betType': betIndex, 'betGold': cc.jajale.enterRoomData.betChipNum });
        }
    },
    /**
     * 创建 牌
     */
    createBrandSpriteFrame: function createBrandSpriteFrame(nd, num) {
        nd.getComponent('jajaleBrandScript').createBrand(num);
    },
    /**
     * 发牌
     */
    dealHandle: function dealHandle() {
        this.deal1();
    },
    deal1: function deal1() {

        this.nextDeal(this.landlordCard1, this.deal2);
    },

    deal2: function deal2() {

        this.landlordShowCard1.active = true;
        // 移回动画起始点
        var move = cc.moveTo(0, cc.p(0, 647.5));
        // 执行动画，并添加回调函数
        this.landlordCard1.runAction(move, cc.callFunc(this.nextDeal(this.farmerCard1, this.deal3)));
    },
    deal3: function deal3() {

        this.farmerShowCard1.active = true;
        var move = cc.moveTo(0, cc.p(0, 647.5));
        this.farmerCard1.runAction(move, cc.callFunc(this.nextDeal(this.landlordCard2, this.deal4)));
    },
    deal4: function deal4() {
        this.landlordShowCard2.active = true;
        var move = cc.moveTo(0, cc.p(0, 647.5));
        // this.landlordCard2.runAction(move, cc.callFunc(this.nextDeal(this.farmerCard2, this.dealEnd)));
        this.landlordCard2.runAction(move, cc.callFunc(this.nextDeal(this.farmerCard2, function () {
            this.farmerShowCard2.active = true;
            var move = cc.moveTo(0, cc.p(0, 647.5));
            this.farmerCard2.runAction(move);
        })));
    },
    /**
     * 继续执行发牌动画
     */
    nextDeal: function nextDeal(node, func) {
        node.active = true;
        var anim = node.getComponent(cc.Animation);
        if (func != null) {
            anim.on('finished', func, this);
        }
        anim.play();
    },
    /**
     * 发牌结束(弃用)
     */
    dealEnd: function dealEnd() {
        var _this2 = this;

        // 发牌结束后
        // 判断是否直赢。是直赢就结束对比，执行赢家动画；不是就选择玩家搓牌，做搓牌动画

        // this.farmerShowCard2.active = true;
        // var move = cc.moveTo(0,cc.p(0, 647.5));
        // this.farmerCard2.runAction(move);

        // 在这之前 需要加入 搓牌逻辑
        setTimeout(function () {
            _this2.createBrandSpriteFrame(_this2.landlordShowCard3.children[0], 3);
            _this2.landlordShowCard3.active = true;
            var anim = _this2.landlordShowCard3.getComponent(cc.Animation);
            anim.play();
            setTimeout(function () {
                _this2.createBrandSpriteFrame(_this2.farmerShowCard3.children[0], 49);
                _this2.farmerShowCard3.active = true;
                var anim = _this2.farmerShowCard3.getComponent(cc.Animation);
                anim.play();
            }, 1000);
        }, 1000);
    },
    /**
     * 倒计时
     */
    countdownHandle: function countdownHandle() {

        // 开启押注按钮的点击事件
        if (this.betBtnInteractable) {
            this.detainBtnState(true);
        }

        var self = this;

        // 开启押注特效
        this.animationContainer.detainEffect(true);

        var t = cc.jajale.enterRoomData.countdown;

        // 以字符串的形式截取到数组中
        var tmps = String(t).split('');

        if (tmps.length < 2) {
            self.countdownNum2.node.active = false;
        }

        var file = "textures/jajale/combat/bottom/jajale-numtext";
        cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {
            // console.log(atlas, err);
            var frame1 = atlas.getSpriteFrame('jajale-num' + tmps[0]);
            self.countdownNum1.spriteFrame = frame1;

            var frame2 = atlas.getSpriteFrame('jajale-num' + tmps[1]);
            self.countdownNum2.spriteFrame = frame2;
        });

        this.countdownBox.active = true;

        var interval = setInterval(function () {

            t--;

            tmps = String(t).split('');

            if (tmps.length < 2) {
                self.countdownNum2.node.active = false;
            }

            var file = "textures/jajale/combat/bottom/jajale-numtext";
            cc.loader.loadRes(file, cc.SpriteAtlas, function (err, atlas) {
                // console.log(atlas, err);
                var frame1 = atlas.getSpriteFrame('jajale-num' + tmps[0]);
                self.countdownNum1.spriteFrame = frame1;

                var frame2 = atlas.getSpriteFrame('jajale-num' + tmps[1]);
                self.countdownNum2.spriteFrame = frame2;
            });

            if (t == 0) {
                console.log('押注结束');
                clearInterval(interval);
                self.countdownBox.active = false;
                self.countdownNum2.node.active = true;
                // 停止押注特效
                self.animationContainer.detainEffect(false);
                // 禁止押注按钮的点击事件
                self.detainBtnState(false);

                // 押注结束
                // cc.jajale.state.fsm.betHandle();
            }
        }, 1000);

        this.jajaleInterval = interval;
    },
    /**
     * 押注 按钮状态
     */
    detainBtnState: function detainBtnState(s) {
        this.withBtn.interactable = s;
        this.landlordChipBtn.interactable = s;
        this.landlordPairBtn.interactable = s;
        this.farmerChipBtn.interactable = s;
        this.farmerPairBtn.interactable = s;
    },
    /**
     * 坐下 回调
     */
    sitdownMessage: function sitdownMessage() {

        this.betBtnInteractable = true;

        if (cc.jajale.enterRoomData.status === 2) {
            this.detainBtnState(true);
        }
        cc.jajale.play = true;
    },
    /**
     * 发牌 回调
     */
    jajaleSendCardStateMessage: function jajaleSendCardStateMessage(data) {
        // console.log('发牌',data);

        this.dealHandle();
        // 地主牌
        var llc = data.sendList[0];
        // 发牌 动画牌面
        this.createBrandSpriteFrame(this.landlordCard1.children[0], llc.cards[0]);
        this.createBrandSpriteFrame(this.landlordCard2.children[0], llc.cards[1]);
        // 发牌 显示牌面
        this.createBrandSpriteFrame(this.landlordShowCard1, llc.cards[0]);
        this.createBrandSpriteFrame(this.landlordShowCard2, llc.cards[1]);

        // 农民牌
        var fc = data.sendList[1];

        this.createBrandSpriteFrame(this.farmerCard1.children[0], fc.cards[0]);
        this.createBrandSpriteFrame(this.farmerCard2.children[0], fc.cards[1]);

        this.createBrandSpriteFrame(this.farmerShowCard1, fc.cards[0]);
        this.createBrandSpriteFrame(this.farmerShowCard2, fc.cards[1]);

        // 
        this.showCardObj = {
            'llc': llc.cards,
            'fc': fc.cards
        };
    },
    /**
     * 下注 回调
     */
    jajaleBetMessage: function jajaleBetMessage() {
        console.log('下注成功');
    },
    /**
     * 下发开牌 回调 
     */
    jajaleOpenCardStateMessage: function jajaleOpenCardStateMessage(data) {

        if (data.openType === 1) {
            // 地主 开牌后的牌型
            this.cardTypeNode1.node.active = true;
            this.cardTypeNode1.spriteFrame = this.cardTypeIcons[data.cardType - 1];
        } else {
            this.cardTypeNode2.node.active = true;
            this.cardTypeNode2.spriteFrame = this.cardTypeIcons[data.cardType - 1];
        }
    },
    /**
     * 结算 回调 
     */
    jajaleClearingMessage: function jajaleClearingMessage(data) {
        console.log(data);
        // 打斗
        this.animationContainer.fightEffect(data);
    },
    /**
     * 状态改变 回调 
     */
    jajaleGameStateMessage: function jajaleGameStateMessage(data) {
        console.log(data.status, '游戏状态发生改变22');

        switch (data.status) {
            case 1:
                // 等待准备
                this.jajaleReadyStateHandle();
                break;
            case 2:
                // 下注
                this.jajaleBetStateHandle();
                break;
            case 3:
                // 发牌
                this.jajaleDealStateHandle();
                break;
            case 4:
                // A开牌
                this.jajaleAOpenCardStateHandle();
                break;
            case 5:
                // B开牌
                this.jajaleBOpenCardStateHandle();
                break;
            case 6:
                // 结算
                this.jajaleClearStateHandle();
                break;

            default:
                break;
        }
    },
    /**
     * 选择玩家搓牌 回调 
     */
    jajaleSelectPlayerTwistMessage: function jajaleSelectPlayerTwistMessage(data) {
        var _this3 = this;

        console.log('选择玩家搓牌 回调 ', data);
        console.log(data.nickname + '玩家代表搓牌');

        // this.jajaleTwist(obj,nd);
        var self = this;

        var llc = this.showCardObj.llc;
        if (llc.length === 3) {

            this.cardNode.active = true;
            this.cardNode.getComponent('cardMove').initCard(llc[2] - 1);

            // 已经搓牌回调
            this.cardNode.getComponent('cardMove').setOpenCardOverHook(function (card) {

                setTimeout(function () {

                    self.cardNode.active = false;
                    card.active = false;

                    setTimeout(function () {
                        self.createBrandSpriteFrame(self.landlordShowCard3.children[0], llc[2]);
                        self.landlordShowCard3.active = true;
                        var anim = self.landlordShowCard3.getComponent(cc.Animation);
                        anim.play();
                    }, 500);
                }, 1000);
            });

            // 如果不是搓牌代表 就直接开牌
            setTimeout(function () {
                _this3.cardNode.getComponent('cardMove').openCrad();
            }, 1000);
        }
    },
    /**
     * 当家玩家 回调 
     */
    jajaleManagePlayeryMessage: function jajaleManagePlayeryMessage(data) {
        console.log('当家玩家 回调 ', data);
        cc.jajale.enterRoomData.nickname = data.nickname;
        cc.jajale.enterRoomData.bossId = data.bossId;
        this.manageLab.string = cc.jajale.enterRoomData.nickname;
    },
    /**
     * 在线人数 回调 
     */
    jajaleOnlineNumMessage: function jajaleOnlineNumMessage(data) {
        console.log('在线人数 回调 ', data);
    },
    /**
     * 站起旁观 回调 
     */
    jajaleLookOnMessage: function jajaleLookOnMessage(data) {
        console.log('站起旁观 回调 ', data);
        this.backSelectBG2.active = true;
        this.backMenu.active = false;
        cc.jajale.play = false;
    },
    /**
     * 走势图 回调 
     */
    jajaleTrendMessage: function jajaleTrendMessage(data) {
        console.log('走势图 回调 ', data);
        this.trendBox.active = true;
        this.trendBox.getComponent('trendScript').initTrend(data);
        // cc.jajale.trendData = data;
    },

    // 等待
    jajaleReadyStateHandle: function jajaleReadyStateHandle() {
        console.log('等待回调');
    },

    // 状态机 下注
    jajaleBetStateHandle: function jajaleBetStateHandle() {
        console.log('下注');
        this.animationContainer.VSEffect();
        this.countdownHandle();
    },
    // 状态机 发牌
    jajaleDealStateHandle: function jajaleDealStateHandle() {
        console.log('发牌');
        // 开始
        this.animationContainer.beginEffect();
    },
    // 状态机 A开牌
    jajaleAOpenCardStateHandle: function jajaleAOpenCardStateHandle() {
        var _this4 = this;

        console.log('A开牌');

        var self = this;

        var llc = this.showCardObj.llc;
        if (llc.length === 3) {

            this.cardNode.active = true;
            this.cardNode.getComponent('cardMove').initCard(llc[2] - 1);

            // 已经搓牌回调
            this.cardNode.getComponent('cardMove').setOpenCardOverHook(function (card) {

                setTimeout(function () {

                    self.cardNode.active = false;
                    card.active = false;

                    setTimeout(function () {
                        self.createBrandSpriteFrame(self.landlordShowCard3.children[0], llc[2]);
                        self.landlordShowCard3.active = true;
                        var anim = self.landlordShowCard3.getComponent(cc.Animation);
                        anim.play();
                    }, 500);
                }, 1000);
            });

            // 如果不是搓牌代表 就直接开牌
            setTimeout(function () {
                _this4.cardNode.getComponent('cardMove').openCrad();
            }, 1000);
        }
    },
    // 状态机 B开牌
    jajaleBOpenCardStateHandle: function jajaleBOpenCardStateHandle() {
        var _this5 = this;

        console.log('B开牌');

        var self = this;

        var fc = this.showCardObj.fc;
        if (fc.length === 3) {

            this.cardNode.active = true;
            this.cardNode.getComponent('cardMove').initCard(fc[2] - 1);

            // 已经搓牌回调
            this.cardNode.getComponent('cardMove').setOpenCardOverHook(function (card) {

                setTimeout(function () {

                    self.cardNode.active = false;
                    card.active = false;

                    setTimeout(function () {
                        self.createBrandSpriteFrame(self.farmerShowCard3.children[0], fc[2]);
                        self.farmerShowCard3.active = true;
                        var anim = self.farmerShowCard3.getComponent(cc.Animation);
                        anim.play();
                    }, 500);
                }, 1000);
            });

            // 如果不是搓牌代表 就直接开牌
            setTimeout(function () {
                _this5.cardNode.getComponent('cardMove').openCrad();
            }, 1000);
        }
    },
    // 状态机 结算
    jajaleClearStateHandle: function jajaleClearStateHandle() {
        var _this6 = this;

        console.log('结算');

        setTimeout(function () {
            // 隐藏牌
            _this6.landlordShowCard1.active = false;
            _this6.landlordShowCard2.active = false;
            _this6.landlordShowCard3.active = false;
            _this6.farmerShowCard1.active = false;
            _this6.farmerShowCard2.active = false;
            _this6.farmerShowCard3.active = false;
            // 隐藏牌类型
            _this6.cardTypeNode1.node.active = false;
            _this6.cardTypeNode2.node.active = false;
        }, 5500);
    },

    /**
     * 进入房间 初始化 各种状态
     */
    // 已发牌
    dealed: function dealed() {
        var _this7 = this;

        var llc = this.showCardObj.llc;
        var fc = this.showCardObj.fc;
        // 设置牌点数
        this.createBrandSpriteFrame(this.landlordShowCard1, llc[0]);
        this.createBrandSpriteFrame(this.landlordShowCard2, llc[1]);
        this.createBrandSpriteFrame(this.farmerShowCard1, fc[0]);
        this.createBrandSpriteFrame(this.farmerShowCard2, fc[1]);

        setTimeout(function () {
            _this7.landlordShowCard1.active = true;
            _this7.landlordShowCard2.active = true;
            _this7.farmerShowCard1.active = true;
            _this7.farmerShowCard2.active = true;
        }, 0);
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
        //# sourceMappingURL=jajaleDeskScript.js.map
        