"use strict";
cc._RF.push(module, '1e721LOvrhC4qsHBPJ2SXVr', 'manageListItemScript');
// Script/jajaleScript/manageList/manageListItemScript.js

'use strict';

cc.Class({
    extends: cc.Component,

    properties: {
        manageIcon: cc.Node,
        manageNameLab: cc.Label,
        manageGoldLab: cc.Label,
        compensateGoldlab: cc.Label,
        remainNumLab: cc.Label
    },
    initManageListItem: function initManageListItem(data) {
        console.log('item info', data);
        if (data.remainGame === -1) {
            this.manageIcon.active = false;
            this.remainNumLab.string = '排队中...';
        } else {
            this.manageIcon.active = true;
            this.remainNumLab.string = '剩余' + data.remainGame + '局';
            if (data.roleId === ttqp_global.currentUserInfo.roleId) {
                // 当前玩家是否当家
                cc.jajale.enterRoomData.isManage = true;
            }
        }
        this.manageNameLab.string = data.nickname;
        this.manageGoldLab.string = ttqp_global.unitConversion(data.bossGold);
        this.compensateGoldlab.string = ttqp_global.unitConversion(data.payGold);
    }
});

cc._RF.pop();