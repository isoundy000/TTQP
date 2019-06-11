(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeActivityShowView/HomeActivityGonggaoView.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f876cZ9Os1Gzbf2WhEjI3gG', 'HomeActivityGonggaoView', __filename);
// Script/HomeScript/HomeActivityShowView/HomeActivityGonggaoView.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        titleScrollView: cc.ScrollView,
        titleSrollContent: cc.Node,
        titlePrefab: cc.Prefab,

        imageNode: cc.Node,
        detailNode: cc.Node
    },

    onLoad: function onLoad() {

        // 获取公告列表
        onfire.on("HomeNoticeListHandle", this.onGetNoticeData.bind(this));
    },
    init: function init() {

        this.titleSrollContent.removeAllChildren();
        for (var i = 0; i < this.noticeList.length; i++) {
            var notice = this.noticeList[i];
            var item = cc.instantiate(this.titlePrefab);
            item.tag = i;
            this.titleSrollContent.addChild(item);
            item.getComponent('HomeActivityGonggaoTitleBtn').init(notice);
            item.on('click', this.onClickTitleItem, this);
        }
        if (this.noticeList && this.noticeList.length > 0) {
            this.onClickTitleItem(null);
        }
    },
    onShowView: function onShowView(isShow) {
        this.node.active = isShow;
        if (isShow) {
            // 公告列表
            this.noticeList = [];

            this.onGetNoticeListRequest();
        }
    },


    /****************************************  本类接口相关  ****************************************/
    onGetNoticeListRequest: function onGetNoticeListRequest() {
        cc.scn.socket.send(10805);
    },

    /****************************************  本类接口回调相关  ****************************************/
    onGetNoticeData: function onGetNoticeData(data) {
        //
        this.noticeList = data.noticeList;
        this.init();
    },
    onClickTitleItem: function onClickTitleItem(event) {

        var tag = event ? event.currentTarget.tag : 0;

        for (var i = 0; i < this.titleSrollContent.children.length; i++) {
            var item = this.titleSrollContent.children[i];
            item.getComponent('HomeSelectBtn').onStatus(i == tag);
        }

        var notice = this.noticeList[tag];

        var content = notice.content ? notice.content.toString() : "";
        this.detailNode.active = content.length > 0;
        this.detailNode.getComponent(cc.Label).string = content;

        var picture = notice.picture ? notice.picture.toString() : "";
        this.imageNode.active = picture.length > 0;
        if (picture.length) {
            var self = this;
            cc.loader.load(picture, function (err, texture) {
                self.imageNode.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            });
        }
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
        //# sourceMappingURL=HomeActivityGonggaoView.js.map
        