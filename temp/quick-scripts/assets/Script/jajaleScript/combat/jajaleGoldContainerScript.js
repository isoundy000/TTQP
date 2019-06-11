(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/combat/jajaleGoldContainerScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '51b19ih4aZAm7Cbdze7wnrF', 'jajaleGoldContainerScript', __filename);
// Script/jajaleScript/combat/jajaleGoldContainerScript.js

'use strict';

var jajaleState = require("jajaleState");

cc.Class({
    extends: cc.Component,

    properties: {
        // 用户头像层
        userHead: cc.Node,
        // 玩家头像层1
        otherHead1: cc.Node,
        // 玩家头像层2
        otherHead2: cc.Node,
        // 玩家头像层3
        otherHead3: cc.Node,
        // 玩家头像层4
        otherHead4: cc.Node,
        // 玩家头像层5
        otherHead5: cc.Node,
        // 玩家头像层6
        otherHead6: cc.Node,
        // 玩家头像层7
        otherHead7: cc.Node,
        // 玩家头像层8
        otherHead8: cc.Node,
        // 金币 直赢层
        withBox: cc.Node,
        // 金币 农民1：1层
        farmerChipBox: cc.Node,
        // 金币 农民对子层
        farmerPairBox: cc.Node,
        // 金币 地主1：1层
        landlordChipBox: cc.Node,
        // 金币 地主对子层
        landlordPairBox: cc.Node,

        // 下注显示金币总和 农民1：1层
        farmerChipTotalBetGold: cc.Node,
        // 下注显示金币总和 农民对子层
        farmerPairTotalBetGold: cc.Node,
        // 下注显示金币总和 地主1：1层
        landlordChipTotalBetGold: cc.Node,
        // 下注显示金币总和 地主对子层
        landlordPairTotalBetGold: cc.Node,
        // 下注显示金币总和 直赢层
        withTotalBetGold: cc.Node,

        // 当前用户下注显示金币总和 农民1：1层
        farmerChipUserTotalBetGold: cc.Node,
        // 当前用户下注显示金币总和 农民对子层
        farmerPairUserTotalBetGold: cc.Node,
        // 当前用户下注显示金币总和 地主1：1层
        landlordChipUserTotalBetGold: cc.Node,
        // 当前用户下注显示金币总和 地主对子层
        landlordPairUserTotalBetGold: cc.Node,
        // 当前用户下注显示金币总和 直赢层
        withUserTotalBetGold: cc.Node,

        /**
         * 特效
         */

        // 散牌 左 -> 右
        jajaleEffect10: cc.Node,
        jajaleEffect11: cc.Node,
        // 发牌框 左 -> 右
        jajaleEffect20: cc.Node,
        jajaleEffect21: cc.Node,
        // 押注区 直赢 -> 地主1：1 -> 地主对子 -> 农民对子 -> 农民1：1
        jajaleEffect30: cc.Node,
        jajaleEffect31: cc.Node,
        jajaleEffect32: cc.Node,
        jajaleEffect33: cc.Node,
        jajaleEffect34: cc.Node,
        // 赢  文字
        jajaleEffect40: cc.Node,
        jajaleEffect41: cc.Node,
        // 赢  标志  直赢 -> 地主1：1 -> 地主对子 -> 农民对子 -> 农民1：1
        jajaleEffect42: cc.Node,
        jajaleEffect43: cc.Node,
        jajaleEffect44: cc.Node,
        jajaleEffect45: cc.Node,
        jajaleEffect46: cc.Node,
        // 开始 VS -> 开始
        jajaleEffect50: cc.Node,
        jajaleEffect51: cc.Node,
        // 打斗 地主打 -> 农民打
        jajaleEffect60: cc.Node,
        jajaleEffect61: cc.Node,

        // 这个数组用来做玩家下注的
        roleIdArr: [],
        // A 赢的玩家 用来做赢家金币动画
        aWinAnimationGold: [],
        // A对子 赢的玩家
        aPairWinAnimationGold: [],
        // B 赢的玩家
        bWinAnimationGold: [],
        // B对子 赢的玩家
        bPairWinAnimationGold: [],
        // 直赢 赢的玩家
        withWinAnimationGold: []

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        this.headNodes = [this.otherHead1, this.otherHead2, this.otherHead3, this.otherHead4, this.otherHead5, this.otherHead6, this.otherHead7, this.otherHead8, this.userHead];
        console.log(cc.jajale.enterRoomData.fighterList, '显示游戏界面的玩家列表');

        // this.roleIdArr = [];

        this.configurePlayer();

        // 下注 S -> C
        onfire.on('jajaleOtherBetStateMessage', this.jajaleOtherBetStateMessage.bind(this));
        // 刷新玩家列表
        onfire.on('jajaleRefreshPlayerListMessage', this.jajaleRefreshPlayerListMessage.bind(this));
    },

    /**
     * 配置玩家信息
     */
    configurePlayer: function configurePlayer() {

        // 清空数组
        this.roleIdArr = [];

        if (cc.jajale.enterRoomData.fighterList.length > 0) {
            for (var idx = 0; idx < cc.jajale.enterRoomData.fighterList.length; idx++) {
                var nd = this.headNodes[idx];
                var other = cc.jajale.enterRoomData.fighterList[idx];

                var lab = nd.children[1].children[0].getComponent(cc.Label);

                // var gold = other.gold > 10000 ? (other.gold / 10000).toFixed(1) + '万' : other.gold;
                var gold = ttqp_global.unitConversion(other.gold);
                lab.string = gold;
                // 这里图片有跨越问题
                // nd.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(cc.url.raw(other.headimgurl));
                // if (other.headimgurl.length) {
                //     cc.loader.load(other.headimgurl, function (err, texture) {
                //         console.log(other.headimgurl,err,texture);
                //         nd.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
                //     });
                // }
                this.roleIdArr.push(other.roleId);

                if (idx === 7 && this.roleIdArr.length === 8) {
                    this.roleIdArr.push(ttqp_global.currentUserInfo.roleId);
                }
            }
        }
    },
    // 单位转换
    // unitConversion: function(gold) {
    //     return gold > 10000 ? (gold / 10000).toFixed(1) + '万' : gold;
    // },


    /**
     * 下注 S -> C 回调
     */
    jajaleOtherBetStateMessage: function jajaleOtherBetStateMessage(data) {

        var betIdx = this.roleIdArr.indexOf(data.roleId);
        console.log(cc.jajale.enterRoomData.fighterList.length, this.roleIdArr, data.roleId, '下注', betIdx, data.totalBetGold);
        this.creatorBetAnimationGoldNode(data, betIdx);
    },
    /**
     * 刷新玩家列表 回调
     */
    jajaleRefreshPlayerListMessage: function jajaleRefreshPlayerListMessage(data) {
        console.log('刷新玩家列表 回调', data);

        cc.jajale.enterRoomData.fighterList = data.fighterList;
        this.configurePlayer();
    },

    /**
     * 下注动画金币节点
     */
    creatorBetAnimationGoldNode: function creatorBetAnimationGoldNode(data, index) {

        // 动画的起始节点
        var tmpNode = this.headNodes[index];

        // 全部下注总和
        var totalGold = ttqp_global.unitConversion(data.totalBetGold);
        // 自己下注总和
        var userTotalGold = ttqp_global.unitConversion(data.betGoldSum);

        var tmp;
        if (data.betType === 5) {
            // 直赢
            tmp = this.withBox;

            this.showGoldLabel(this.withTotalBetGold, this.withUserTotalBetGold, totalGold, userTotalGold, index);
        } else if (data.betType === 1) {
            // 地主1：1
            tmp = this.landlordChipBox;

            this.showGoldLabel(this.landlordChipTotalBetGold, this.landlordChipUserTotalBetGold, totalGold, userTotalGold, index);
        } else if (data.betType === 3) {
            // 地主对子
            tmp = this.landlordPairBox;

            this.showGoldLabel(this.landlordPairTotalBetGold, this.landlordPairUserTotalBetGold, totalGold, userTotalGold, index);
        } else if (data.betType === 2) {
            // 农民1：1
            tmp = this.farmerChipBox;

            this.showGoldLabel(this.farmerChipTotalBetGold, this.farmerChipUserTotalBetGold, totalGold, userTotalGold, index);
        } else if (data.betType === 4) {
            // 农民对子
            tmp = this.farmerPairBox;

            this.showGoldLabel(this.farmerPairTotalBetGold, this.farmerPairUserTotalBetGold, totalGold, userTotalGold, index);
        }

        var gold = new cc.Node('animaitonGold1');
        var sp = gold.addComponent(cc.Sprite);
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/Global_imgs/jinbi.png"));
        this.node.addChild(gold);
        gold.setPosition(tmpNode._position);
        var move = cc.moveTo(0.6, this.randomTerminal(tmp.x, tmp.y));
        gold.runAction(move);
    },
    creatorWinAnimationGoldNode: function creatorWinAnimationGoldNode(nd, obj, winStr) {
        var _this = this;

        var index = this.roleIdArr.indexOf(obj.roleId);
        console.log(obj[winStr], index, this.roleIdArr, obj.roleId);
        // 动画结束节点
        var tmpNode = this.headNodes[index];

        var gold = new cc.Node('animaitonGold2');
        var sp = gold.addComponent(cc.Sprite);
        sp.spriteFrame = new cc.SpriteFrame(cc.url.raw("resources/textures/Global_imgs/jinbi.png"));
        this.node.addChild(gold);
        gold.setPosition(this.randomTerminal(nd.x, nd.y));
        var move = cc.moveTo(0.6, tmpNode._position);
        gold.runAction(move);

        setTimeout(function () {
            if (_this.node.children.length > 0) {
                _this.node.children.forEach(function (obj) {
                    if (obj['name'] === 'animaitonGold2') {
                        obj.destroy();
                    }
                });
            }

            // +金币 上升动画
            var addGoldLab = new cc.Node('addGoldLab');
            var lab = addGoldLab.addComponent(cc.Label);
            addGoldLab.color = new cc.Color(255, 235, 4);
            lab.string = '+' + ttqp_global.unitConversion(obj[winStr]);
            _this.node.addChild(addGoldLab);
            addGoldLab.setPosition(tmpNode._position);
            var upMove = cc.moveTo(0.5, cc.p(tmpNode._position.x, tmpNode._position.y + 60));
            addGoldLab.runAction(upMove);

            setTimeout(function () {
                if (_this.node.children.length > 0) {
                    _this.node.children.forEach(function (obj) {
                        if (obj['name'] === 'addGoldLab') {
                            obj.destroy();
                        }
                    });
                }
            }, 550);
        }, 600);
    },
    /**
     * 随机动画终点
     * position: 随机范围
     * Math.floor(Math.random()*(max-min+1)+min);
     */
    randomTerminal: function randomTerminal(x, y) {

        var maxX = x + 50;
        var minX = x - 50;
        var nodeX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
        // console.log(absX,absY,maxX,minX,nodeX);

        var maxY = y + 30;
        var minY = y - 30;
        var nodeY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
        // console.log(maxY,minY,nodeY);
        // 金币动画的 随机终点
        // console.log(nodeX, nodeY); 
        return cc.p(nodeX, nodeY);
    },
    /**
     * 销毁动画金币
     */
    destroyGoldNode: function destroyGoldNode() {

        this.node.children.forEach(function (obj) {
            if (obj['name'] === 'animaitonGold1') {
                obj.destroy();
            }
        });
    },
    /**
     * 显示下注金币 label
     * node1: 全部下注总数节点
     * node2: 当前用户全部下注总数节点
     * total1: 全部下注总数
     * total2: 当前用户全部下注总数
     * idx: 玩家布局索引，8为当前用户
     */
    showGoldLabel: function showGoldLabel(node1, node2, total1, total2, idx) {

        node1.active = true;
        node1.children[0].getComponent(cc.Label).string = total1;

        if (idx === 8) {
            node2.active = true;
            node2.children[0].getComponent(cc.Label).string = total2;
        }
    },
    /**
     * 隐藏显示下注金币 label
     */
    hideGoldLabel: function hideGoldLabel() {

        this.withTotalBetGold.active = false;
        this.withUserTotalBetGold.active = false;

        this.landlordChipTotalBetGold.active = false;
        this.landlordChipUserTotalBetGold.active = false;

        this.landlordPairTotalBetGold.active = false;
        this.landlordPairUserTotalBetGold.active = false;

        this.farmerChipTotalBetGold.active = false;
        this.farmerChipUserTotalBetGold.active = false;

        this.farmerPairTotalBetGold.active = false;
        this.farmerPairUserTotalBetGold.active = false;
    },

    // ------------------ 状态一、等待准备 ------------------
    /**
     * VS 特效 
     */
    VSEffect: function VSEffect() {
        var _this2 = this;

        this.jajaleEffect50.active = true;
        this.jajaleEffect50.getComponent(cc.Animation).play();

        setTimeout(function () {
            _this2.jajaleEffect50.active = false;
            _this2.jajaleEffect50.getComponent(cc.Animation).stop();
        }, 2000);
        console.log('VS 特效');
    },

    // ------------------ 状态二、下注 ------------------
    /**
     * 押注特效
     * state : 显示状态（布尔类型）
     */
    detainEffect: function detainEffect(state) {
        console.log('押注特效');
        if (typeof state == 'boolean') {
            this.jajaleEffect30.active = state;
            this.jajaleEffect31.active = state;
            this.jajaleEffect32.active = state;
            this.jajaleEffect33.active = state;
            this.jajaleEffect34.active = state;
            if (state) {
                this.jajaleEffect30.getComponent(cc.Animation).play();
                this.jajaleEffect31.getComponent(cc.Animation).play();
                this.jajaleEffect32.getComponent(cc.Animation).play();
                this.jajaleEffect33.getComponent(cc.Animation).play();
                this.jajaleEffect34.getComponent(cc.Animation).play();
            } else {
                this.jajaleEffect30.getComponent(cc.Animation).stop();
                this.jajaleEffect31.getComponent(cc.Animation).stop();
                this.jajaleEffect32.getComponent(cc.Animation).stop();
                this.jajaleEffect33.getComponent(cc.Animation).stop();
                this.jajaleEffect34.getComponent(cc.Animation).stop();
            }
        }
    },

    // ------------------ 状态三、发牌 ------------------
    /**
     * 开始 特效
     */
    beginEffect: function beginEffect() {
        var _this3 = this;

        console.log('开始 特效');
        this.jajaleEffect51.active = true;
        this.jajaleEffect51.getComponent(cc.Animation).play();
        setTimeout(function () {
            _this3.jajaleEffect51.active = false;
            _this3.jajaleEffect51.getComponent(cc.Animation).stop();
        }, 2000);
    },
    /**
     * 发牌
     */

    // ------------------ 状态四、搓牌 ------------------


    // ------------------ 状态五、结算 ------------------

    /**
    * 打斗特效
    */
    fightEffect: function fightEffect(data) {
        var _this4 = this;

        // 隐藏显示下注金币
        this.hideGoldLabel();

        console.log('打斗特效');
        if (data.winType === 1) {
            this.jajaleEffect10.active = true;
            this.jajaleEffect20.active = true;
            this.jajaleEffect60.active = true;
            this.jajaleEffect10.getComponent(cc.Animation).play();
            this.jajaleEffect20.getComponent(cc.Animation).play();
            this.jajaleEffect60.getComponent(cc.Animation).play();
        } else if (data.winType === 2) {
            this.jajaleEffect11.active = true;
            this.jajaleEffect21.active = true;
            this.jajaleEffect61.active = true;
            this.jajaleEffect11.getComponent(cc.Animation).play();
            this.jajaleEffect21.getComponent(cc.Animation).play();
            this.jajaleEffect61.getComponent(cc.Animation).play();
        }

        setTimeout(function () {
            if (data.winType === 1) {

                _this4.jajaleEffect60.active = false;
                _this4.jajaleEffect60.getComponent(cc.Animation).stop();
            } else if (data.winType === 2) {

                _this4.jajaleEffect61.active = false;
                _this4.jajaleEffect61.getComponent(cc.Animation).stop();
            }
            setTimeout(function () {

                // 销毁这些下注金币 
                _this4.destroyGoldNode();

                _this4.winEffect(data);
            }, 500);
        }, 3000);

        this.aWinAnimationGold = [];
        this.bWinAnimationGold = [];
        this.aPairWinAnimationGold = [];
        this.bPairWinAnimationGold = [];
        this.withWinAnimationGold = [];

        for (var key in data.accountList) {
            if (data.accountList.hasOwnProperty(key)) {
                var obj = data.accountList[key];
                if (obj.accAGold > 0) {
                    // A win
                    this.aWinAnimationGold.push(obj);
                }
                if (obj.accBGold > 0) {
                    // B win
                    this.bWinAnimationGold.push(obj);
                }
                if (obj.accPairAGold > 0) {
                    // Ap win
                    this.aPairWinAnimationGold.push(obj);
                }
                if (obj.accPairBGold > 0) {
                    // Bp win
                    this.bPairWinAnimationGold.push(obj);
                }
                if (obj.accDrawGold > 0) {
                    // W win
                    this.withWinAnimationGold.push(obj);
                }
            }
        }
    },
    /**
     * 赢家特效
     */
    winEffect: function winEffect(data) {
        var _this5 = this;

        console.log('赢家特效', this.aWinAnimationGold, this.bWinAnimationGold, this.aPairWinAnimationGold, this.bPairWinAnimationGold, this.withWinAnimationGold);

        if (this.aWinAnimationGold.length > 0) {
            for (var idx = 0; idx < this.aWinAnimationGold.length; idx++) {
                var obj = this.aWinAnimationGold[idx];
                // var betIdx = this.roleIdArr.indexOf(obj.roleId); 
                this.creatorWinAnimationGoldNode(this.landlordChipBox, obj, 'accAGold');
            }
        }
        if (this.bWinAnimationGold.length > 0) {
            for (var _idx = 0; _idx < this.bWinAnimationGold.length; _idx++) {
                var obj = this.bWinAnimationGold[_idx];
                // var betIdx = this.roleIdArr.indexOf(obj.roleId);
                this.creatorWinAnimationGoldNode(this.farmerChipBox, obj, 'accBGold');
            }
        }
        if (this.aPairWinAnimationGold.length > 0) {
            for (var _idx2 = 0; _idx2 < this.aPairWinAnimationGold.length; _idx2++) {
                var obj = this.aPairWinAnimationGold[_idx2];
                // var betIdx = this.roleIdArr.indexOf(obj.roleId);
                this.creatorWinAnimationGoldNode(this.landlordPairBox, obj, 'accPairAGold');
            }
        }
        if (this.bPairWinAnimationGold.length > 0) {
            for (var _idx3 = 0; _idx3 < this.bPairWinAnimationGold.length; _idx3++) {
                var obj = this.bPairWinAnimationGold[_idx3];
                // var betIdx = this.roleIdArr.indexOf(obj.roleId);
                this.creatorWinAnimationGoldNode(this.farmerPairBox, obj, 'accPairBGold');
            }
        }
        if (this.withWinAnimationGold.length > 0) {
            for (var _idx4 = 0; _idx4 < this.withWinAnimationGold.length; _idx4++) {
                var obj = this.withWinAnimationGold[_idx4];
                // var betIdx = this.roleIdArr.indexOf(obj.roleId);
                this.creatorWinAnimationGoldNode(this.withBox, obj, 'accDrawGold');
            }
        }

        // 这里创建赢家金币动画


        if (data.winType === 1) {
            this.jajaleEffect40.active = true;
            this.jajaleEffect43.active = true;
            this.jajaleEffect40.getComponent(cc.Animation).play();
            this.jajaleEffect43.getComponent(cc.Animation).play();
        } else if (data.winType === 2) {
            this.jajaleEffect41.active = true;
            this.jajaleEffect46.active = true;
            this.jajaleEffect41.getComponent(cc.Animation).play();
            this.jajaleEffect46.getComponent(cc.Animation).play();
        }
        if (data.aPairWin) {
            this.jajaleEffect44.active = true;
            this.jajaleEffect44.getComponent(cc.Animation).play();
        }
        if (data.bPairWin) {
            this.jajaleEffect45.active = true;
            this.jajaleEffect45.getComponent(cc.Animation).play();
        }
        if (data.dirWin) {
            this.jajaleEffect42.active = true;
            this.jajaleEffect42.getComponent(cc.Animation).play();
        }

        setTimeout(function () {

            if (data.winType === 1) {
                // 隐藏地主赢家框特效
                _this5.jajaleEffect10.active = false;
                _this5.jajaleEffect20.active = false;
                _this5.jajaleEffect10.getComponent(cc.Animation).stop();
                _this5.jajaleEffect20.getComponent(cc.Animation).stop();
                // 隐藏地主赢家文字、标志特效
                _this5.jajaleEffect40.active = false;
                _this5.jajaleEffect43.active = false;
                _this5.jajaleEffect40.getComponent(cc.Animation).stop();
                _this5.jajaleEffect43.getComponent(cc.Animation).stop();
            } else if (data.winType === 2) {
                // 隐藏农民赢家框特效
                _this5.jajaleEffect11.active = false;
                _this5.jajaleEffect21.active = false;
                _this5.jajaleEffect11.getComponent(cc.Animation).stop();
                _this5.jajaleEffect21.getComponent(cc.Animation).stop();

                // 隐藏农民赢家文字、标志特效
                _this5.jajaleEffect41.active = false;
                _this5.jajaleEffect46.active = false;
                _this5.jajaleEffect41.getComponent(cc.Animation).stop();
                _this5.jajaleEffect46.getComponent(cc.Animation).stop();
            }
            if (data.aPairWin) {
                // 隐藏地主对子赢家标志特效
                _this5.jajaleEffect44.active = false;
                _this5.jajaleEffect44.getComponent(cc.Animation).stop();
            }
            if (data.bPairWin) {
                // 隐藏农民对子赢家标志特效
                _this5.jajaleEffect45.active = false;
                _this5.jajaleEffect45.getComponent(cc.Animation).stop();
            }
            if (data.dirWin) {
                // 隐藏直赢赢家标志特效
                _this5.jajaleEffect42.active = false;
                _this5.jajaleEffect42.getComponent(cc.Animation).stop();
            }
        }, 2000);
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
        //# sourceMappingURL=jajaleGoldContainerScript.js.map
        