"use strict";
cc._RF.push(module, '0f296GEjkNOMpob9akQvNS9', 'jajaleSelectScript');
// Script/jajaleScript/jajaleSelectScript.js

"use strict";

var socket = require("websocketScript");
var roomData = require("jajaleRoomDataScript");
var jajaleState = require("jajaleState");

cc.Class({
    extends: cc.Component,

    properties: {

        // 好友厅层
        pytBox: cc.Node

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {

        cc.jajale = {};
        // 从大厅切换到游戏
        // cc.scn.socket.send(9000,{'sId': -1});
        // cc.scn.socket.socket.onclose();
        // cc.scn.socket.socket = {};
        // cc.scn.socket = socket.connect('jajale');

        // 进入房间
        onfire.on("enterTheRoomMessage", this.enterTheRoomMessage.bind(this));

        // 游戏状态
        onfire.on('jajaleGameStateMessage', this.jajaleGameStateMessage.bind(this));

        // setTimeout(() => {
        //     // 登录家家乐
        //     let params = {
        //         "token": ttqp_global.currentUserData.token,
        //         "roleId": ttqp_global.currentUserInfo.roleId
        //     };
        //     cc.scn.socket.send(110101, params);
        // }, 1000);


        this.statusArr = [];
    },


    /**
     * 选择入口
     */
    onSelectJajaleType: function onSelectJajaleType(event, customData) {
        console.log(customData);

        if (customData == "2001") {

            // 进入房间
            var params = {
                /**
                 * roomId:(int) //房间号, 0：百家场；其它：朋友场的房间号ID
                 * roomPwd:(string) //加锁密码；百家场则忽略
                 * enterType:(int)//0百家厅，(朋友厅里用到) 1进入房间，2快速进入或者列表进入
                 */
                "roomId": 0,
                "roomPwd": '',
                "enterType": 0
            };
            cc.scn.socket.send(112204, params);
        } else if (customData == "2002") {

            cc.scn.socket.send(112201);
            this.pytBox.active = true;
        }
    },
    /**
     * 关闭窗口
     */
    onClose: function onClose() {
        // console.log('close');

        var self = this;

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
            self.node._parent.active = false;
        });
    },
    /**
     * 进入房间接口回调
     */
    enterTheRoomMessage: function enterTheRoomMessage(data) {

        console.log(data.status, '进入房间成功');

        cc.jajale.enterRoomData = data;

        if (cc.jajale.enterRoomData.betTime != 0) {
            var timestamp = cc.jajale.enterRoomData.time - cc.jajale.enterRoomData.betTime;
            var d = new Date(timestamp * 1000); //根据时间戳生成的时间对象
            var date = d.getSeconds();
            console.log(date, '98789798');
            cc.jajale.enterRoomData.countdown = 29 - date;
        }
        // 下注默认筹码 1000
        cc.jajale.enterRoomData.betChipNum = 1000;
        // 坐下状态
        cc.jajale.play = false;

        cc.director.loadScene('Jajale');
    },
    jajaleGameStateMessage: function jajaleGameStateMessage(data) {

        cc.jajale.enterRoomData.status = data.status;

        console.log(cc.jajale.enterRoomData.status, '游戏状态发生改变');

        if (data.status === 2) {
            var jajaleCountdown = 29;
            cc.jajale.enterRoomData.countdown = jajaleCountdown;
            var interval = setInterval(function () {

                jajaleCountdown--;

                if (jajaleCountdown < 1) {
                    clearInterval(interval);
                    jajaleCountdown = 0;
                }
                cc.jajale.enterRoomData.countdown = jajaleCountdown;
            }, 1000);
        }
    }

});

cc._RF.pop();