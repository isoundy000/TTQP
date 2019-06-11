(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HomeScript/HomeToolJS/HomeConfigTool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '95a2aZzo/xChqjYj5GyUVbI', 'HomeConfigTool', __filename);
// Script/HomeScript/HomeToolJS/HomeConfigTool.js

"use strict";

module.exports = {
    onConfigEmailRedPoint: function onConfigEmailRedPoint(emailData) {
        var emailRedPointObj = {
            "friend": "0",
            "system_email": "0",
            "system_msg": "0"
        };
        var keys = Object.keys(emailData);

        for (var i = 0; i < keys.length; i++) {
            var emailList = emailData[keys[i]];
            for (var j = 0; j < emailList.length; j++) {
                if (emailList[j].isOpen == "0") {
                    if (i == 0) {
                        emailRedPointObj.friend = "1";
                    } else if (i == 1) {
                        emailRedPointObj.system_email = "1";
                    } else {
                        emailRedPointObj.system_msg = "1";
                    }
                    break;
                }
            }
        }
        return emailRedPointObj;
    }
};

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
        //# sourceMappingURL=HomeConfigTool.js.map
        