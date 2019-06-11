(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/socket/errCode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cbc09j+3dNMA4B9OMuSHwo6', 'errCode', __filename);
// Script/socket/errCode.js

'use strict';

/**
 * 请求错误码
 */

var errCode = {

    //系统相关9000
    9002: '返回值发生错误',
    9003: '游戏服务器连接非法',
    9004: '查询超时',
    9005: '没有该游戏',

    //结果成功
    10000: '执行成功',

    10001: '系统错误',
    10002: '更新数据库出错',

    //用户模块 10100
    10101: '帐号不存在',
    10102: '用户已存在',
    10103: '代理号非法不能注册',
    10104: 'TOKEN错误',
    10105: '已经在线',
    10106: 'wechat token不能为空',
    10107: 'wechat无法登录',
    10108: '用户密码为空',
    10109: '用户不存在或密码出错',
    10110: '用户已经登录',
    10111: 'token错误，请重新登录游戏',
    10112: '金币不足',
    10113: '钻石不足',
    10114: '角色不存在',

    //角色模块 10300
    10301: '角色不存在',

    //邮件模块 10200
    10201: '邮件不存在',
    10202: '邮件增加失败',
    10203: '附件已领取',
    10204: '邮件类型错误',
    10205: '邮件已被处理',
    10206: '金币最少要100万',
    10207: 'ID输入错误',

    //背包模块 10500
    10501: '道具ID错误',
    10502: '背包道具不存在',
    10503: '背包道具使用出错',

    //签到模块 10600
    10601: '已经签到',

    //好友模块 10700
    10701: '删除好友失败',
    10702: '对方已是好友',
    10703: '自己好友已达最大数',
    10704: '对方好友已达最大数',
    10705: '对方不是好友',
    10706: '好友不存在',
    10707: '好友已存在',
    10708: '添加好友失败',
    10709: '不能添加自己',

    10801: '道具ID错误',

    //活动模块
    10901: '该选项不存在',
    10902: '不能免费使用',
    10903: '免费次数已用完',
    10904: '抽奖异常',
    10905: '钻石不够',

    //任务模块
    11001: '任务不存在',
    11002: '任务未完成',
    11003: '没有该类型任务',
    11004: '任务已领取',

    //系统设置模块
    11101: '该代理不存在',
    11102: '手机号不正确',
    11103: '代理已存在',
    11104: '获取验证码间隔时间太短',
    11105: '当天获取验证码数量超过上限',
    11106: '发送短信失败',
    11107: '没有该验证码',
    11108: '验证失败',
    11109: '类型错误',
    11110: '已经修改过，不能再次修改性别'

};
module.exports = errCode;

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
        //# sourceMappingURL=errCode.js.map
        