(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/socket/websocketScript.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1cc5S2ygBCyrtFk2k1FpAm', 'websocketScript', __filename);
// Script/socket/websocketScript.js

"use strict";

window.onfire = require("onfire");
var errCodeObj = require("errCode");
var websocketAPIObj = require("websocket_API");

window.host = "ws://192.168.3.84:8072";
window.jajale = "ws://192.168.3.84:8073";

var WS = {

    socket: {},

    connect: function connect(state) {

        this.state = state;

        if (this.socket.readyState !== 1) {
            // 这里还有内存泄漏的bug，未解决！！！
            if (state == 'home') {
                console.log(host);
                this.socket = new WebSocket(host);
                this.socket.binaryType = "arraybuffer";
                this.socket.onopen = this.openFire.bind(this);
                this.socket.onclose = this.closeFire.bind(this);
                this.socket.onmessage = this.messageFire.bind(this);
                this.socket.onerror = this.errorFire.bind(this);
            } else if (state == 'jajale') {
                console.log(jajale);
                this.socket = new WebSocket(jajale);
                this.socket.binaryType = "arraybuffer";
                this.socket.onopen = this.openFire.bind(this);
                this.socket.onclose = this.closeFire.bind(this);
                this.socket.onmessage = this.messageFire.bind(this);
                this.socket.onerror = this.errorFire.bind(this);
            }
        }

        return this;
    },

    openFire: function openFire() {

        console.log('open', this.state);
        onfire.fire('socketOpen', this.state);
    },
    /**
     * 触发接收监听 
     */
    messageFire: function messageFire(obj) {

        // 接收 socket 请求 需要拆包（二进制）
        // 请求头为 12 个字节
        // 第一、二个字节为消息长度、第三、四、五、六个字节为接口命令、第七、八、九、十个字节为保留字、第十一、十二个字节为服务器字段（不管）、后面追加消息体（传参）

        // console.log(obj);
        var a = new Uint8Array(obj.data);
        var dv = new DataView(obj.data);
        var msgLen = dv.getInt16(0, false);
        var cmdId = dv.getInt32(2, false);
        var retCode = dv.getInt32(6, false);
        var codeType = dv.getInt16(10, false);

        var info = this.byteToString(a.slice(12));;
        console.log(msgLen, cmdId, retCode, codeType, info);
        if (cmdId === 9000) {
            console.log('响应9000协议ID');
        }
        if (retCode == 10000 || retCode == 110000) {

            // 事件触发
            if (info.length > 0 && info != 'null') {
                onfire.fire(websocketAPIObj[cmdId], JSON.parse(info));
            } else {
                onfire.fire(websocketAPIObj[cmdId]);
            }
        } else {
            // 错误
            console.log(errCodeObj[retCode]);
            if (retCode === 10205) {
                // 处理添加好友申请的时候，需要在邮件已经处理的状态下，将回调返回去
                onfire.fire(websocketAPIObj[cmdId], {
                    err_code: retCode,
                    err_msg: errCodeObj[retCode]
                });
            }

            if (cmdId == 10802) {
                // 处理添加好友申请的时候，需要在邮件已经处理的状态下，将回调返回去
                onfire.fire(websocketAPIObj[cmdId], {
                    err_code: retCode
                });
            }
        }
    },

    closeFire: function closeFire() {

        console.log('close321');
    },

    errorFire: function errorFire(e) {
        console.log(e);
    },
    /**
     * 触发发送
     * cmdId: 命令ID、parm: 参数（JSON）
     */
    send: function send(cmdId, parm) {

        // 发送 socket 请求 需要封包（二进制）
        // 消息头为 8 个字节

        // 第一、二个字节为消息长度、第三、四、五、六个字节为接口命令、第七、八个字节为保留字、后面追加消息体（传参）
        console.log("接口ID == " + cmdId + "，参数 == " + JSON.stringify(parm));
        if (typeof parm === 'undefined') {
            // 无参
            var byteArr = new ArrayBuffer(8);
            var dv = new DataView(byteArr);
            dv.setUint16(0, 8, false);
            dv.setUint32(2, cmdId, false);
            dv.setUint16(6, 1, false);
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(dv);
            }
        } else {
            var tmp;
            if (typeof parm === 'string') {
                tmp = this.stringToByte(parm);
            } else {
                tmp = this.stringToByte(JSON.stringify(parm));
            }
            // var tmp = this.stringToByte(JSON.stringify(parm));
            var l = 8 + tmp.length;
            var byteArr = new ArrayBuffer(l);
            var dv = new DataView(byteArr);
            dv.setUint16(0, l, false);
            dv.setUint32(2, cmdId, false);
            dv.setUint16(6, 1, false);
            for (var i = 0; i < tmp.length; i++) {
                dv.setUint8(i + 8, tmp[i]);
            }
            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.send(dv);
            }
        }

        if (cmdId === 110101) {
            console.log(this.socket);
        }
        // 这里这样操作的话无法对中文正确封包
        // for (let idx = 0; idx < tmp.length; idx++) {
        //     dv.setUint8(idx+6,tmp[idx].charCodeAt());
        // }        

    },

    /**
     * stringToByte()
     * byteToString()
     * 这两个函数是处理二进制封包、解包时中文乱码的问题
     */
    //string转byte数组
    stringToByte: function stringToByte(str) {
        var bytes = new Array();
        var len, c;
        len = str.length;
        for (var i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if (c >= 0x010000 && c <= 0x10FFFF) {
                bytes.push(c >> 18 & 0x07 | 0xF0);
                bytes.push(c >> 12 & 0x3F | 0x80);
                bytes.push(c >> 6 & 0x3F | 0x80);
                bytes.push(c & 0x3F | 0x80);
            } else if (c >= 0x000800 && c <= 0x00FFFF) {
                bytes.push(c >> 12 & 0x0F | 0xE0);
                bytes.push(c >> 6 & 0x3F | 0x80);
                bytes.push(c & 0x3F | 0x80);
            } else if (c >= 0x000080 && c <= 0x0007FF) {
                bytes.push(c >> 6 & 0x1F | 0xC0);
                bytes.push(c & 0x3F | 0x80);
            } else {
                bytes.push(c & 0xFF);
            }
        }
        return bytes;
    },
    // byte数组转string
    byteToString: function byteToString(bytearr) {
        if (typeof bytearr === 'string') {
            return bytearr;
        }
        var str = '',
            _arr = bytearr;
        for (var i = 0; i < _arr.length; i++) {
            var one = _arr[i].toString(2),
                v = one.match(/^1+?(?=0)/);
            if (v && one.length == 8) {
                var bytesLength = v[0].length;
                var store = _arr[i].toString(2).slice(7 - bytesLength);
                for (var st = 1; st < bytesLength; st++) {
                    store += _arr[st + i].toString(2).slice(2);
                }
                str += String.fromCharCode(parseInt(store, 2));
                i += bytesLength - 1;
            } else {
                str += String.fromCharCode(_arr[i]);
            }
        }
        return str;
    }

};

module.exports = WS;

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
        //# sourceMappingURL=websocketScript.js.map
        