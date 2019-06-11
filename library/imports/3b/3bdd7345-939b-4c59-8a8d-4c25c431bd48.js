"use strict";
cc._RF.push(module, '3bdd7NFk5tMWYqNTCXEMb1I', 'global');
// Script/global/global.js

'use strict';

window.ttqp_global = {
    // 当前登录用户信息
    currentUserData: null,
    // 当前登录用户的详细信息
    currentUserInfo: null,

    // 单位换算
    unitConversion: function unitConversion(gold) {
        // 无四舍五入
        return gold < 10000 ? gold : gold < 100000000 ? parseInt(gold / 10000 * 10) / 10 + '万' : parseInt(gold / 100000000 * 10) / 10 + '亿';

        // return gold < 10000 ? gold : gold < 100000000 ? (gold / 10000).toFixed(1) + '万' : (gold / 100000000).toFixed(1) + '亿';
    },
    // 红点数组
    redPointArray: []
};

cc._RF.pop();