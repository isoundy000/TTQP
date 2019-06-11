(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/socket/websocket_API.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'bceadMJS8FNdY0p6ERfdqjj', 'websocket_API', __filename);
// Script/socket/websocket_API.js

'use strict';

var _methodName;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 接口命令 对应的 监听方法名
 */

var methodName = (_methodName = {

  /**
   * C -> S
   * 1 开头的命令ID
   */
  // 账号登录
  10102: 'loginAtMessage',

  // ------------------ 游戏大厅接口 ------------------
  10101: 'HomeDataHandle', // 获取 游戏大厅 的基本数据

  10301: 'EmailDataHandle', // 邮件列表 接口回调
  10302: 'EmailSendHandle', // 邮件发送 接口回调
  10303: 'EmailReadHandle', // 查看邮件 接口回调
  10304: 'EmailDelHandle', // 删除邮件
  10305: 'EmailGetGiftHandle', // 领取附件
  10306: 'EmailDealFriendHandle', // 处理添加好友的申请回调
  10307: 'EmailUserDataHandle', // 在发送带有金币邮件的时候，需要获取对应收件人的信息

  10401: 'HomeGetUserInfoHandle', // 人物信息
  10402: 'HomeBindPhoneHandle', // 绑定手机
  10403: 'HomeGameLogHandle', // 牌局记录

  10501: 'PackDataHandle', // 获取背包数据
  10502: 'PackUseShopHandle', // 使用商品回调

  10601: 'SignInDataHandle', // 获取 签到状态 接口回调
  10602: 'SignInHandle', // 发送 签到 接口回调

  10701: 'HomeAddFriendHandle', // 添加好友
  10702: 'HomeFriendListHandle', // 获取好友列表
  10703: 'HomeDelFriendHandle', // 删除好友

  10801: 'HomeRotaryTableHandle', // 转盘的弹窗接口的提前出发接口，为了让后台有时间计算20801的主推接口做准备
  10802: 'HomeChoujiangHanle', // 抽奖接口
  10803: 'HomeTaskDetailHandle', // 任务列表
  10804: 'HomeTaskGetDewardHandle', // 任务领取
  10805: 'HomeNoticeListHandle', // 公告列表

  10901: 'HomeDailiInfoHandle', // 获取代理信息
  10902: 'HomeDailiUserBangHandle', // 代理玩家排行
  10903: 'HomeApplyAgentHandle', // 申请代理
  10904: 'HomeUpdatePwdHandle', // 修改密码
  10905: 'ProjectGetVerCodeHandle', // 获取验证码
  10906: 'HomeInputInviterHandle', // 输入邀请人ID
  10907: 'HomeIsApplyAgentHandle', // 玩家是否注册过代理
  10908: 'HomeSetSexHandle', // 设置性别

  11001: 'HomeAllMoneyRankingHanle', // 总财富榜数据

  // 商城购买
  10666: 'mallBuyAtMessage',
  // 从大厅切换到游戏
  9000: 'cutGameMessage',
  // 返回大厅
  9001: 'backLobbyMessage',

  /**
   * S -> C
   * 2 开头的命令ID
   */

  // 金币更新
  20401: 'updateGoldAtMessage',
  // 钻石更新
  20402: 'updateDiamondAtMessage',

  // 好友上下线主推接口
  20501: 'HomeFriendOnlineStatusHandle',
  // 更新好友列表主推接口
  20502: 'HomeRefreshFriendListHandle',

  // 广播的主推接口
  20601: 'HomeGetBroadcastHandle',

  /**
   * 0:主界面-邮件提示
   * 1:主界面-签到提示
   * 2:主界面-活动提示
   * 100:系统邮件提示
   * 101:好友邮件提示
   * 102:系统消息提示
   * 103:抽奖提示
   * 104:任务提示
   * 105:分享任务提示
   * 106:充值任务提示
   */
  // 红点协议
  20701: 'HomeGetRedPointHandle',

  // 获取免费次数接口，要出发这个接口，先请求10801
  20801: 'HomeGetFreeCountHandle',

  // ------------------ 家家乐接口 ------------------

  // 登录家家乐
  110101: 'loginJajaleMessage',
  // 家家乐返回大厅
  110102: 'jajaleBackLobbyMessage',
  // 进入房间
  112204: 'enterTheRoomMessage',
  // 朋友厅房间列表
  112201: 'jajalePYTRoomListMessage',
  // 朋友厅创建房间
  112203: 'jajaleCreateRoomMessage',
  // 朋友厅删除房间
  112207: 'jajaleDelRoomMessage',
  // 坐下
  112215: 'sitdownMessage',
  // 站起
  112216: 'getupMessage',
  // 下注操作
  112301: 'jajaleBetMessage',

  // 游戏状态
  122303: 'jajaleGameStateMessage',
  // 下发下注
  122307: 'jajaleOtherBetStateMessage',
  // 发牌
  122304: 'jajaleSendCardStateMessage',
  // 选择玩家搓牌
  122305: 'jajaleSelectPlayerTwistMessage',
  // 下发开牌
  122301: 'jajaleOpenCardStateMessage',
  // 结算
  122205: 'jajaleClearingMessage',
  // 当家玩家
  122306: 'jajaleManagePlayeryMessage',
  // 在线人数
  122209: 'jajaleOnlineNumMessage',
  // 刷新玩家列表
  122302: 'jajaleRefreshPlayerListMessage',
  // 更新带入金币
  122401: 'jajaleRefreshDragInGoldMessage',
  // 带入成功更新总金币
  122403: 'jajaleRefreshUserGoldMessage',

  // 下发重复取消下注状态 
  122208: 'jajaleRepeatBetStatusMessage',
  // 下发重复投注 
  122207: 'jajaleRepeatBetMessage',
  // 重复取消投注 
  112213: 'jajaleRepeatBetOrClearBetMessage',
  // 下发取消自动下注
  122204: 'jajaleClearRepeatBetMessage',
  // 喊话
  112212: 'jajalePropagandaMessage',
  // 当家玩家列表
  112208: 'jajaleManagePlayerListMessage',
  // 当家玩家列表
  112210: 'jajaleApplyForManageMessage',
  // 自动排队
  112209: 'jajaleAutoQueueMessage',
  // 取消当家
  112211: 'jajaleCancelManageMessage'
}, _defineProperty(_methodName, '112216', 'jajaleLookOnMessage'), _defineProperty(_methodName, 112214, 'jajaleTrendMessage'), _methodName);

module.exports = methodName;

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
        //# sourceMappingURL=websocket_API.js.map
        