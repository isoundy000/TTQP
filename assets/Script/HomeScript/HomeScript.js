var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        // 底部栏
        bottomBgView: cc.Node,
        // 顶部个人信息栏
        topBgView: cc.Node,

        // 背包 弹窗
        packShowView: cc.Node,
        // 设置 弹窗
        settingShowView: cc.Node,
        // 领取奖励 弹窗
        awardGetShowView: cc.Node,
        // 用户协议 文档
        userAgreementShowView: cc.Node,
        // 签到 弹窗文档
        signInShowView: cc.Node,
        // 邮箱 弹窗文档
        emailShowView: cc.Node,
        // 商城
        mallView: cc.Node,
        //  家家乐
        jajale: cc.Node,
        // 活动弹窗
        activityView: cc.Node,
        // 分享
        shareView: cc.Node,
        // 更多
        moreView: cc.Node,
        // 客服
        kefuView: cc.Node,
        // 个人信息弹窗
        personInfoView: cc.Node,
    },

    onLoad() {
        this.activityView.active = false;

        // 现在数据是直接给定，所以再这边直接调用，要是接口数据话，还需要将配置方法放在接口回调中
        this.onConfigUI();

        // home场景，用户信息接口回调
        // onfire.on("HomeDataHandle",this.getHomeData.bind(this));

        // 从大厅切换到游戏
        onfire.on("cutGameMessage", this.cutGameMessage.bind(this));
        // 登录家家乐成功
        onfire.on("loginJajaleMessage", this.test11.bind(this));

        // this.onGetHomeData();
        setTimeout(() => {
            cc.director.preloadScene("Jajale", function () {
                cc.log("预加载家家乐场景");
                });
        }, 0);

        // 监听金币和钻石变化
        onfire.on("updateGoldAtMessage", this.updateGoldAtMessage.bind(this));
        onfire.on("updateDiamondAtMessage", this.updateDiamondAtMessage.bind(this));
    },

    /****************************  本类接口相关  *************************/

    // /*********************** 本类接口回调相关  **********************/

    /**
     * 服务器主推金币变化接口回调
     */
    updateGoldAtMessage: function (obj) {
        ttqp_global.currentUserInfo.diamond = obj.gold.toString();
    },

    /**
     * 服务器主推钻石变化接口回调
     */
    updateDiamondAtMessage: function (obj) {
        ttqp_global.currentUserInfo.gold = obj.diamond.toString();
    },

    /**
     * 配置UI相关
     */
    onConfigUI() {
        // 给顶部栏赋值
        this.topBgView.getComponent('HomeTopView').onConfigUI(ttqp_global.currentUserInfo);
    },

    /*************************  事件监听  *************************/
    /**  * 顶部 客服 按钮的点击 */
    onKefuBtnClick(event) {
        this.kefuView.getComponent('HomeKefuView').onShowView(true, () => {
            //
        });
    },

    /**  * 顶部 头像 按钮的点击 */
    onHeadBtnClick(event) {
        this.personInfoView.getComponent('HomePersonInfoView').onShowView(true);
    },

    /**  * 底部 背包 按钮的点击 */
    onPackBtnClick(event) {
        var self = this;
        this.packShowView.getComponent('HomePackView').onShowView(true);
    },

    /**  * 底部 活动 按钮的点击 */
    onActivityBtnClick(event) {
        var self = this;
        this.activityView.getComponent('HomeActivityView').onShowView(true);
    },

    /**  * 底部 设置 按钮的点击 */
    onSettingBtnClick(event) {
        var self = this;
        this.settingShowView.getComponent('HomeSettingView').onShowView(true);
    },

    /**  * 底部 商城 按钮的点击 */
    onShopBtnClick(event) {
        // cc.director.loadScene('MallScene');
        this.mallView.active = true;
        
    },

    /**  * 底部 签到 按钮的点击 */
    onSignInBtnClick(event) {
        let self = this;
        this.signInShowView.getComponent('HomeSignInShowView').onShowView(
            true, () => {
            });
    },

    /**  * 底部 邮件 按钮的点击 */
    onEmailBtnClick(event) {
        var self = this;
        let emailShowView = this.emailShowView.getComponent('HomeEmailShowView');
        emailShowView.onShowView(
            true,
            (updateData) => {
                console.log("邮件回调，需要做什么在这里做");
            });
    },

    /**  * 底部 分享 按钮的点击 */
    onShareBtnClick(event) {
        this.shareView.getComponent('HomeShareShowView').onShowView(true);
    },

    /**  * 底部 更多 按钮的点击 */
    onMoreBtnClick(event) {
        this.moreView.active = !this.moreView.active;
    },

    /**  * 底部 说明 按钮的点击 */
    onIntroBtnClick(event) {
        this.userAgreementShowView.getComponent('HomeUserAgreementView').onShowView(true);
    },

    onGameType(event, customData) {
        let typeIdx = parseInt(customData);
        console.log('操作按钮事件');
        switch (typeIdx) {
            case 0: {   // 天天牛牛
                //
                console.log('登录家家乐成功',this.jajale,this.kefuView,this);
            }
                break;
            case 1: {   // 家家乐
                //
                // 从大厅切换到游戏
                cc.scn.socket.send(9000,{'sId': -1});

                
            }
                break;
            case 2: {   // 天天至尊
                //
            }
                break;
            case 3: {   // 龙虎斗
                //
            }
                break;
            case 4: {   // 天地玄黄
                //
                cc.director.loadScene('MallScene');
            }
                break;

            default:
                break;
        }
    },

    /**  * 从大厅切换到游戏 成功回调*/
    cutGameMessage: function() {

        

        
        console.log('从大厅切换到游戏 成功',this.jajale);
        // 断开 大厅的服务器  连接 游戏的服务器

        cc.scn.socket.socket.onclose();
        cc.scn.socket.socket = null;
        cc.scn.socket.socket = {};
        cc.scn.socket = socket.connect('jajale');
        // console.log(cc.scn.socket);
        // 游戏服务器连接成功
        onfire.on("socketOpen", function(data) {
            // 登录家家乐
            
            if (data === 'jajale') {
                // console.log(data,'这是什么东西');
                let params = {
                    "token": ttqp_global.currentUserData.token,
                    "roleId": ttqp_global.currentUserInfo.roleId
                };
                cc.scn.socket.send(110101, params);
            }
            
        });
        // setTimeout(() => {
        //     let params = {
        //         "token": ttqp_global.currentUserData.token,
        //         "roleId": ttqp_global.currentUserInfo.roleId
        //     };
        //     cc.scn.socket.send(110101, params);
        // }, 0);

        
    },
    test11() {
        // var self = this;
        console.log('登录家家乐成功',this.jajale,this.kefuView,this);
        this.jajale.active = true;
    }
});
