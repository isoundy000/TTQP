"use strict";
cc._RF.push(module, '39424W94WRHPasXI3fQkFEM', 'HomeSetUpdatePwdView');
// Script/HomeScript/HomeSettingView/HomeSetUpdatePwdView.js

"use strict";

// 发接口对象
var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        /// 手机号输入框
        phoneEditBox: cc.EditBox,
        /// 新密码输入框
        pwdEditBox: cc.EditBox,
        /// 验证码输入框
        yanzhengmaEditBox: cc.EditBox,

        /// 验证码的提示标签
        yzmAlertText: cc.Label,
        /// 倒计时的最大数
        maxCount: 60

    },

    onLoad: function onLoad() {
        // 是否在倒计时
        this.isRunning = false;
        // 当前倒计时的数字
        this.currentCountNum = this.maxCount;

        // 获取验证码 接口回调 配置
        onfire.on("ProjectGetVerCodeHandle", this.onGetVerCode.bind(this));
        onfire.on("HomeUpdatePwdHandle", this.onUpdatePwdHandle.bind(this));
    },
    onConfigUI: function onConfigUI() {
        //
        this.phoneEditBox.string = "";
        this.pwdEditBox.string = "";
        this.yanzhengmaEditBox.string = "";
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow       
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, callback) {
        this.contentView.setScale(0.8, 0.8);
        this.callback = callback;

        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));

            this.onConfigUI();
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
        this.node.active = isShow;
    },


    /**
     * 关闭获取验证码的倒计时
     */
    onCloseVerCodeTimer: function onCloseVerCodeTimer() {
        this.isRunning = false;
        this.yzmAlertText.string = "获取验证码";
        this.currentCountNum = this.maxCount;
        if (this.timer) {
            this.unschedule(this.timer);
        }
    },


    /*********************** 发送接口 ***********************/
    onVerCodeRequest: function onVerCodeRequest() {
        var phone = this.phoneEditBox.string ? this.phoneEditBox.string : "";
        if (phone.length == 0) {
            console.log("请输入手机号码！");
        } else if (phone.length != 11) {
            console.log("请输入正确的手机号码！");
        } else {
            var params = {
                "phone": phone,
                "type": 1
            };
            cc.scn.socket.send(10905, params);
        }
    },


    /**
     * 修改密码
     */
    onUpdatePwd: function onUpdatePwd() {

        var phone = this.phoneEditBox.string ? this.phoneEditBox.string : "";
        var password = this.pwdEditBox.string ? this.pwdEditBox.string : "";
        var code = this.yanzhengmaEditBox.string ? this.yanzhengmaEditBox.string : "";

        if (phone.length != 11) {
            console.log("请输入正确的手机号码");
        } else if (code.length != 6) {
            console.log("请输入正确的验证码");
        } else if (!(password.length >= 6 && password.length <= 12)) {
            console.log("请输入6-12位数字或英文字母的密码");
        } else {
            var params = {
                "pwd": password,
                "code": code,
                "phone": phone
            };
            cc.scn.socket.send(10904, params);
        }
    },


    /*********************** 接口回调 ***********************/
    /**
     * 获取验证码接口
     */
    onGetVerCode: function onGetVerCode(data) {
        if (this.node.active == false) return;

        this.isRunning = true;
        this.yzmAlertText.string = this.currentCountNum + "s";

        this.timer = function () {
            if (this.currentCountNum > 0) {
                this.currentCountNum--;
                this.yzmAlertText.string = this.currentCountNum + "s";
            } else {
                // 关闭获取验证码的定时器
                this.onCloseVerCodeTimer();
            }
        };
        this.schedule(this.timer, 1);
    },


    /**
     * 提交修改密码回调
     */
    onUpdatePwdHandle: function onUpdatePwdHandle(data) {
        //
        console.log("修改密码成功");
    },
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var itemIdx = parseInt(customData);
        switch (itemIdx) {
            case 0:
                {
                    // 确定
                    this.onUpdatePwd();
                }
                break;
            case 1:
                {
                    // 取消
                    this.onShowView(false, this.callback);
                    // 关闭获取验证码的定时器
                    this.onCloseVerCodeTimer();
                }
                break;
            case 2:
                {
                    // 获取验证码
                    if (!this.isRunning) {
                        // 发送获取验证码接口
                        this.onVerCodeRequest();
                    }
                }
                break;

            default:
                break;
        }
    },


    /**
     * 点击关闭按钮
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
        // 关闭获取验证码的定时器
        this.onCloseVerCodeTimer();
    }
});

cc._RF.pop();