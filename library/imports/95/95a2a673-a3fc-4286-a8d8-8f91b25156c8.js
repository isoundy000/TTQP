"use strict";
cc._RF.push(module, '95a2aZzo/xChqjYj5GyUVbI', 'HomeConfigTool');
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