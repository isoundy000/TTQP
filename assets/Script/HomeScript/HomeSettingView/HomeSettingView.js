cc.Class({
    extends: cc.Component,

    properties: {
        // 子控件的背景View
        contentView: cc.Node,

        /******************  代理相关的两个按钮  ******************/
        // 申请代理
        applyAgentBtn: cc.Node,
        // 代理信息
        agentInfoBtn: cc.Node,


        /******************  开关按钮Node相关  ******************/
        // 状态圆圈为开状态下的位置和为关状态下的位置
        ioIconOpenX: 0,
        ioIconCloseX: 0,
        // 是否开启音乐
        isOpenMusic: false,
        // 音乐开关标记的⭕️
        musicTagIcon: cc.Node,
        // 是否开启音效
        isOpenYinXiao: false,
        // 音效开关标记的⭕️
        yinXiaoTagIcon: cc.Node,
        // 是否开启震动
        isOpenZhenDong: false,
        // 震动开关标记的⭕️
        zhenDongTagIcon: cc.Node,
        // 是否开启特效
        isOpenTeXiao: false,
        // 特效开关标记的⭕️
        teXiaoTagIcon: cc.Node,

        /******************  男女选择相关  ******************/
        // 选中和反选图片
        checkboxSpFrames: [cc.SpriteFrame],
        // 男性 图标
        boyCheckbox: cc.Node,
        // 女性 图标
        girlCheckbox: cc.Node,
        // 是否是男性
        isBoy: true,

        /******************  子级弹窗  ******************/
        // 申请代理弹窗
        applyForDailiView: cc.Node,
        // 修改密码弹窗
        updatePwdView: cc.Node,
        // 邀请人ID
        yaoqingrenIDView: cc.Node,
        // 代理信息
        dailiInfoView: cc.Node,

    },

    onLoad() {
        var self = this;
        this.node.getComponent('HomeSyncClickBgNode').onClickLightGrayBg(() => {
            self.onShowView(false);
        });

        onfire.on("HomeIsApplyAgentHandle", this.onGetUserIsApplyAgent.bind(this));
        onfire.on("HomeSetSexHandle", this.onSetSexHandle.bind(this));
    },

    /**
     * 本类UI配置
     */
    onConfigUI() {
        this.onIOBtnClick(null, "0");
        this.onIOBtnClick(null, "1");
        this.onIOBtnClick(null, "2");
        this.onIOBtnClick(null, "3");

        let sexIdx = ttqp_global.currentUserInfo.sex;
        if (sexIdx != 2) {  // 这个值有0，1，2，0是默认男，1是男，2是女
            this.isBoy = true;
            this.sexClickIdx = 0;
        } else {
            this.isBoy = false;
            this.sexClickIdx = 1;
        }
        this.onConfigSexNode(this.isBoy);

        // 获取玩家是否注册过代理请求
        this.onGetUserIsApplyAgentRequest();
    },

    // 设置性别标记
    onConfigSexNode(isBoy) {
        this.boyCheckbox.getComponent(cc.Sprite).spriteFrame = this.checkboxSpFrames[isBoy ? 1 : 0];
        this.girlCheckbox.getComponent(cc.Sprite).spriteFrame = this.checkboxSpFrames[!isBoy ? 1 : 0];
    },

    /**
     * 弹出/关闭 窗口
     * @param {是否弹出} isShow         
     * @param {背包内的商品列表数组} pack_shop_list    
     * @param {回调函数，在点击使用的时候回调} callback 
     */
    onShowView(isShow) {

        this.node.active = isShow;
        if (isShow) {
            var moveAction = cc.moveTo(0.2, cc.p(0, 0));
            this.contentView.runAction(moveAction);

            this.onConfigUI();
        } else {
            this.contentView.setPositionY(-1300);
        }
    },

    /*********************** 发送接口 ***********************/
    /**
     * 获取玩家是否注册过代理请求
     */
    onGetUserIsApplyAgentRequest() {
        cc.scn.socket.send(10907);
    },

    /**
     * 设置性别
     */
    onSetUserSex() {
        let params = {
            "sex": this.sexClickIdx == 0 ? 1 : 2,
        };
        cc.scn.socket.send(10908, params);
    },

    /*********************** 接口回调 ***********************/
    /**
     * 获取玩家是否注册过代理回调
     */
    onGetUserIsApplyAgent(data) {
        if (data) {
            this.applyAgentBtn.active = data.isRegisterAgent == 1;
            this.agentInfoBtn.active = !this.applyAgentBtn.active;
        }
    },
    /**
     * 设置性别回调
     */
    onSetSexHandle(data) {
        //
        this.isBoy = parseInt(customData) == 0;
        this.onConfigSexNode(this.isBoy);
    },


    /****************************************  本类事件监听  ****************************************/
    /// 关闭按钮的点击
    onCloseBtnClick(event) {
        this.onShowView(false);
    },
    /// 性别按钮的点击
    onSexBtnClick(event, customData) {
        this.sexClickIdx = parseInt(customData);
        if (ttqp_global.currentUserInfo.sex == 0) {
            this.onSetUserSex();
        } else {
            console.log("用户性别只能修改一次，修改过后，用户性别就不能更改了");
        }
    },
    /// 开关按钮的点击
    onIOBtnClick(event, customData) {
        var btnTag = parseInt(customData);

        switch (btnTag) {
            case 0: {
                this.isOpenMusic = !this.isOpenMusic;
                var moveAction = cc.moveTo(0.2, cc.p(this.isOpenMusic ? this.ioIconOpenX : this.ioIconCloseX, 0));
                this.musicTagIcon.runAction(moveAction);
                if (event) {
                    event.currentTarget.getComponent('HomeSelectBtn').onStatus(this.isOpenMusic);
                }
            }
                break;
            case 1: {
                this.isOpenYinXiao = !this.isOpenYinXiao;
                var moveAction = cc.moveTo(0.2, cc.p(this.isOpenYinXiao ? this.ioIconOpenX : this.ioIconCloseX, 0));
                this.yinXiaoTagIcon.runAction(moveAction);
                if (event) {
                    event.currentTarget.getComponent('HomeSelectBtn').onStatus(this.isOpenYinXiao);
                }
            }
                break;
            case 2: {
                this.isOpenZhenDong = !this.isOpenZhenDong;
                var moveAction = cc.moveTo(0.2, cc.p(this.isOpenZhenDong ? this.ioIconOpenX : this.ioIconCloseX, 0));
                this.zhenDongTagIcon.runAction(moveAction);
                if (event) {
                    event.currentTarget.getComponent('HomeSelectBtn').onStatus(this.isOpenZhenDong);
                }
            }
                break;
            case 3: {
                this.isOpenTeXiao = !this.isOpenTeXiao;
                var moveAction = cc.moveTo(0.2, cc.p(this.isOpenTeXiao ? this.ioIconOpenX : this.ioIconCloseX, 0));
                this.teXiaoTagIcon.runAction(moveAction);
                if (event) {
                    event.currentTarget.getComponent('HomeSelectBtn').onStatus(this.isOpenTeXiao);
                }
            }
                break;

            default:
                break;
        }
    },
    /// 功能按钮的点击
    onMenusBtnClick(event, customData) {
        let itemIdx = parseInt(customData);
        switch (itemIdx) {
            case 0: {   // 申请代理
                let self = this;
                this.applyForDailiView.getComponent('HomeSetApplyForDailiView').onShowView(true, () => {
                    //
                    self.onGetUserIsApplyAgentRequest();
                });
            }
                break;
            case 1: {   // 邀请人ID
                this.yaoqingrenIDView.getComponent('HomeSetYaoqingrenIDView').onShowView(true, () => {
                    //
                });
            }
                break;
            case 2: {   // 更改密码
                console.log("修改密码的前提，是必须要手机登录的才能点击，具体获取用户登录方式，后期后台完善后再跟进");

                this.updatePwdView.getComponent('HomeSetUpdatePwdView').onShowView(true, () => {
                    //
                });
            }
                break;
            case 3: {   // 切换账号
                console.log("切换账号");
            }
                break;
            case 4: {   // 代理信息
                this.dailiInfoView.getComponent('HomeSetDailiInfoView').onShowView(true, () => {
                    //
                });
            }
                break;

            default:
                break;
        }
    },

});
