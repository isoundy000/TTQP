(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/LoginTest/LoginTest.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '100d09mrpRHXovSaSvSIyed', 'LoginTest', __filename);
// Script/LoginTest/LoginTest.js

"use strict";

var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad: function onLoad() {

        cc.scn = {};
        cc.scn.socket = socket.connect('home');

        // home场景，用户信息接口回调
        onfire.on("HomeDataHandle", this.getHomeData.bind(this));
        onfire.on("loginAtMessage", this.loginAtMessage.bind(this));

        // 红点主推接口
        onfire.on("HomeGetRedPointHandle", this.onRedPointHandle.bind(this));
    },


    /**
     * 配置邮件按钮右上角的红点图标
     */
    onRedPointHandle: function onRedPointHandle(data) {
        if (!data || !data.prompt || data.prompt.length == 0) return;
        ttqp_global.redPointArray = data.prompt;
    },
    user_285LoginBtnClick: function user_285LoginBtnClick(event) {
        var parm = { 'userName': 'test', 'userPwd': '123456' }; // roleId = 285
        cc.scn.socket.send(10102, parm);
    },
    user_13LoginBtnClick: function user_13LoginBtnClick(event) {
        var parm = { 'userName': 'tourists_34', 'userPwd': '123456' }; // roleId = 285
        cc.scn.socket.send(10102, parm);
    },
    user_14LoginBtnClick: function user_14LoginBtnClick(event) {
        var parm = { 'userName': 'tourists_35', 'userPwd': '123456' }; // roleId = 285
        cc.scn.socket.send(10102, parm);
    },
    onLoginBtnClick: function onLoginBtnClick(event) {
        // var parm = {'userName': 'test','userPwd': '123456'};     // roleId = 13
        var parm = { 'userName': 'tourists_36', 'userPwd': '123456' }; // roleId = 15
        // var parm = {'userName': 'tourists_34','userPwd': '123456'};     // roleId = 285
        // var parm = {'userName': 'tourists_35','userPwd': '123456'};     // roleId = 14
        cc.scn.socket.send(10102, parm);
    },


    // 登录 处理时间回调
    loginAtMessage: function loginAtMessage(data) {

        ttqp_global.currentUserData = data.userInfo;
        // cc.director.loadScene('Home');

        this.onGetHomeData();
    },

    // 获取 游戏大厅 基本数据
    onGetHomeData: function onGetHomeData() {
        var params = {
            "userId": ttqp_global.currentUserData.userId ? ttqp_global.currentUserData.userId : "",
            "token": ttqp_global.currentUserData.token ? ttqp_global.currentUserData.token : "",
            "sys": 0,
            "mac": ''
        };
        cc.scn.socket.send(10101, params);
    },

    // home场景，用户信息接口回调
    getHomeData: function getHomeData(data) {
        console.log('home data == >' + data);
        if (!data) return;
        // this.home_data = data;
        ttqp_global.currentUserInfo = data;

        // 给顶部栏赋值
        // this.topBgView.getComponent('HomeTopView').onConfigUI(this.home_data);

        cc.director.loadScene('Home');
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
        //# sourceMappingURL=LoginTest.js.map
        