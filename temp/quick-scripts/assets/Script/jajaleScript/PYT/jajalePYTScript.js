(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/jajaleScript/PYT/jajalePYTScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4df1944yxVG3bPXidWkRv6O', 'jajalePYTScript', __filename);
// Script/jajaleScript/PYT/jajalePYTScript.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // ID
        IDL: cc.Label,
        // 当前人数
        currentNumL: cc.Label,
        // 剩余时间
        timeL: cc.Label,
        // ID输入框
        IDEdit: cc.EditBox,
        // 创建房间层
        createBox: cc.Node,
        // 删除房间层
        delRoomBox: cc.Node,
        // 房间密码层
        roomPswBox: cc.Node,

        // 
        listContentView: cc.Node,
        // 
        listItem: cc.Prefab,

        userRoomId: null,
        myRoominterval: null,
        editText: null
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 朋友厅房间列表
        onfire.on("jajalePYTRoomListMessage", this.jajalePYTRoomListMessage.bind(this));
        // 进入房间
        onfire.on("enterTheRoomMessage", this.enterTheRoomMessage.bind(this));
    },


    /**
     * 关闭朋友厅窗口
     */
    onClosePYTHandle: function onClosePYTHandle() {
        console.log('close');
        this.node.active = false;
    },

    /**
     * 事件操作
     */
    onPYTHandle: function onPYTHandle(event, customData) {
        console.log(123, customData);
        switch (customData) {
            case '删除房间':

                if (this.userRoomId && this.userRoomId != 0) {
                    this.delRoomBox.active = true;
                }

                break;
            case '进入房间':

                if (this.userRoomId && this.userRoomId != 0) {
                    var params = {
                        /**
                         * roomId:(int) //房间号, 0：百家场；其它：朋友场的房间号ID
                         * roomPwd:(string) //加锁密码；百家场则忽略
                         * enterType:(int)//0百家厅，(朋友厅里用到) 1进入房间，2快速进入或者列表进入
                         */
                        "roomId": this.userRoomId,
                        "roomPwd": '',
                        "enterType": 1
                    };
                    cc.scn.socket.send(112204, params);
                }

                break;
            case '快速加入':

                if (this.editText) {
                    this.roomPswBox.active = true;
                    this.roomPswBox.getComponent('jajaleRoomPswScript').configurea(this.editText);
                }

                break;
            case '创建房间':
                this.createBox.active = true;
                break;
            default:
                break;
        }
    },
    /**
     * 输入房间ID内容 监听
     */
    onTextChanged: function onTextChanged(text, event, customData) {
        this.editText = text;
    },
    /**
     * 进入房间接口回调
     */
    enterTheRoomMessage: function enterTheRoomMessage(data) {
        this.node.active = false;
        clearInterval(this.myRoominterval);
    },
    // 朋友厅房间列表
    jajalePYTRoomListMessage: function jajalePYTRoomListMessage(data) {

        var self = this;

        var tmpRemainTime = 0;
        this.userRoomId = 0;
        this.IDL.string = '- -';
        this.currentNumL.string = '- -';
        this.timeL.string = '- -';
        clearInterval(this.myRoominterval);
        this.listContentView.removeAllChildren();

        var roomList = data.roomList;

        for (var index = 0; index < roomList.length; index++) {
            if (roomList[index].roleId === ttqp_global.currentUserInfo.roleId) {
                this.userRoomId = roomList[index].roomId;
                this.IDL.string = roomList[index].roomId;
                this.currentNumL.string = roomList[index].curOnline;
                tmpRemainTime = data.remainTime;
            } else {
                var item = cc.instantiate(this.listItem);
                this.listContentView.addChild(item);
                item.getComponent('jajalePYTItemScript').initPYTItem(roomList[index], function (idx) {

                    self.roomPswBox.active = true;
                    self.roomPswBox.getComponent('jajaleRoomPswScript').configurea(idx);
                });
            }
        }

        var interval = setInterval(function () {
            if (tmpRemainTime != 0) {
                self.timeL.string = self.unixTool(tmpRemainTime);
                tmpRemainTime--;

                if (tmpRemainTime < 1) {
                    clearInterval(interval);
                }
            }
        }, 1000);
        this.myRoominterval = interval;
    },

    unixTool: function unixTool(remainTime) {
        var d = parseInt(remainTime / 86400);
        var h = parseInt(remainTime % 86400 / 3600);
        var m = parseInt(remainTime % 86400 % 3600 / 60);
        var s = parseInt(remainTime % 86400 % 3600 % 60);
        return d + '天' + h + '小时' + m + '分' + s + '秒';
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
        //# sourceMappingURL=jajalePYTScript.js.map
        