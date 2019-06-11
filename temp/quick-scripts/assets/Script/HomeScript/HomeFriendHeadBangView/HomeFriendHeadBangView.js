(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeFriendHeadBangView/HomeFriendHeadBangView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9cf917PvshF2JV+bPrHFrHs', 'HomeFriendHeadBangView', __filename);
// Script/HomeScript/HomeFriendHeadBangView/HomeFriendHeadBangView.js

"use strict";

var socket = require("websocketScript");

cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: cc.ScrollView,
        scrollContent: cc.Node,
        friendHeadItem: cc.Prefab,

        // 添加好友弹窗
        addFriendView: cc.Node,
        // 弹出排行榜弹窗
        rankingListView: cc.Node
    },

    onLoad: function onLoad() {

        this.page = 0;

        onfire.on("HomeFriendListHandle", this.onFriendRequestHandle.bind(this));
        onfire.on("HomeFriendOnlineStatusHandle", this.onOnlineStatusHandle.bind(this));
        onfire.on("HomeRefreshFriendListHandle", this.onRefreshHandle.bind(this));

        // 给滑动视图view 添加上拉加载功能操作
        var scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node; //这个 node 节点是你的事件处理代码组件所属的节点
        scrollViewEventHandler.component = "HomeFriendHeadBangView"; //这个是代码文件名
        scrollViewEventHandler.handler = "onFriendLoadMoreHandle"; // 触发上拉加载回调
        var scroll = this.scrollView.getComponent(cc.ScrollView);
        scroll.scrollEvents.push(scrollViewEventHandler);

        this.onGetFriendData();
    },


    // 创建Item
    onCreateFriendItem: function onCreateFriendItem() {
        var self = this;

        this.scrollContent.removeAllChildren();

        for (var i = 0; i < this.friendList.length; i++) {
            var friendData = this.friendList[i];
            friendData.isFriend = "1";

            var item = cc.instantiate(this.friendHeadItem);
            item.getComponent('HomeBangHeadItem').init(friendData, function (userInfo) {
                //
                // self.userInfoView.getComponent('HomeFriendShowView').onShowView(true, userInfo);
            });
            this.scrollContent.addChild(item);
        }
    },


    /****************************************  本类发送接口相关  ****************************************/
    // 获取好友列表
    onGetFriendData: function onGetFriendData() {
        if (!cc.scn || !cc.scn.socket) return;
        this.isInCurent = true;
        var params = {
            "page": this.page
        };
        cc.scn.socket.send(10702, params);
    },

    /****************************************  本类接口响应回调  ****************************************/
    // 好友列表接口回调
    onFriendRequestHandle: function onFriendRequestHandle(data) {
        if (!this.isInCurent) return;
        this.isInCurent = false;

        if (this.page == 0) {
            this.friendList = data.friendList;
        } else {
            this.friendList = this.friendList.concat(data.friendList);
        }

        this.page += 1;
        this.onCreateFriendItem();
    },

    // 好友上下线接口回调
    onOnlineStatusHandle: function onOnlineStatusHandle(data) {
        this.page = 0;
        this.onGetFriendData();
    },

    // 好友列表数据变化接口回调
    onRefreshHandle: function onRefreshHandle(data) {
        this.page = 0;
        this.onGetFriendData();
    },


    /****************************************  本类事件监听  ****************************************/
    // 添加好友按钮
    onAddFriendBtnClick: function onAddFriendBtnClick(event) {

        // 弹出添加好友弹窗
        this.addFriendView.getComponent('HomeAddFriendView').onShowView(true, "", function () {
            //
        });
    },


    /**
     * 滑动视图 ScrollView 的上拉加载
     */
    onFriendLoadMoreHandle: function onFriendLoadMoreHandle(scrollview, eventType) {
        if (eventType === cc.ScrollView.EventType.BOUNCE_BOTTOM) {
            this.onGetFriendData();
        } else if (eventType === cc.ScrollView.EventType.BOUNCE_TOP) {
            this.page = 0;
            this.onGetFriendData();
        }
    },


    /**
     * 弹出排行榜
     */
    onShowRankingListBtnClick: function onShowRankingListBtnClick(event) {
        this.isDetailList = true;
        var self = this;
        this.rankingListView.getComponent('HomeRankingListView').onShowView(true, function () {
            self.isDetailList = false;
        });
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
        //# sourceMappingURL=HomeFriendHeadBangView.js.map
        