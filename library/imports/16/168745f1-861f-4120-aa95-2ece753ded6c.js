"use strict";
cc._RF.push(module, '16874Xxhh9BIKqVLs51Pe1s', 'HomeSetTixianView');
// Script/HomeScript/HomeSettingView/HomeSetTixianView.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        contentView: cc.Node,

        /// 游戏ID输入框
        idLabel: cc.Label,
        /// 银行输入框
        bankNameLabel: cc.Label,
        /// 银行卡号输入框
        cardNumEditBox: cc.EditBox,
        /// 验证码输入框
        yanzhengmaEditBox: cc.EditBox,

        /// 验证码的提示标签
        yzmAlertText: cc.Label,
        /// 倒计时的最大数
        maxCount: 60,

        // 银行名称列表
        bankListView: cc.Node
    },

    onLoad: function onLoad() {
        // 是否在倒计时
        this.isRunning = false;
        // 当前倒计时的数字
        this.currentCountNum = this.maxCount;
    },


    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow       
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView: function onShowView(isShow, callback) {
        this.callback = callback;
        this.contentView.setScale(0.8, 0.8);

        this.bankNameLabel.string = "请选择银行";

        if (isShow) {
            var scaleAmin1 = cc.scaleTo(0.000001, 0.8, 0.8);
            var scaleAmin2 = cc.scaleTo(0.2, 1, 1);
            this.contentView.runAction(cc.sequence(scaleAmin1, scaleAmin2));
        } else {
            var scaleAmin = cc.scaleTo(0, 0.8, 0.8);
            this.contentView.runAction(scaleAmin);
        }
        this.node.active = isShow;
    },
    onMenusBtnClick: function onMenusBtnClick(event, customData) {
        var itemIdx = parseInt(customData);
        switch (itemIdx) {
            case 0:
                {
                    // 提交
                    this.onShowView(false, this.callback);
                    console.log("提交提交提交提交提交提交提交提交提交");
                }
                break;
            case 1:
                {
                    // 获取验证码
                    if (!this.isRunning) {
                        this.isRunning = true;
                        this.yzmAlertText.string = this.currentCountNum + "s";

                        this.timer = function () {
                            if (this.currentCountNum > 0) {
                                this.currentCountNum--;
                                this.yzmAlertText.string = this.currentCountNum + "s";
                            } else {
                                this.isRunning = false;
                                this.yzmAlertText.string = "获取验证码";
                                this.currentCountNum = this.maxCount;
                                this.unschedule(this.timer);
                            }
                        };
                        this.schedule(this.timer, 1);
                    }
                }
                break;

            default:
                break;
        }
    },
    onIsShowBankListView: function onIsShowBankListView(event) {
        //
        this.isShowBankListView = !this.isShowBankListView;
        var bankList = [{ "title": "中国工商银行" }, { "title": "招商银行" }, { "title": "交通银行" }, { "title": "中国农业银行" }, { "title": "中国人民银行" }, { "title": "中国工商银行" }];
        var self = this;
        this.bankListView.getComponent('HomeSetTixianBankView').init(true, bankList, function (bankData) {
            self.bankNameLabel.string = bankData.title;
        });
    },


    /**
     * 点击关闭按钮
     */
    onCloseBtnClick: function onCloseBtnClick(event) {
        this.onShowView(false, this.callback);
    }
});

cc._RF.pop();