module.exports = {
    onConfigEmailRedPoint(emailData) {
        var emailRedPointObj = {
            "friend": "0",
            "system_email": "0",
            "system_msg": "0"
        };
        let keys = Object.keys(emailData);

        for (let i = 0; i < keys.length; i++) {
            let emailList = emailData[keys[i]];
            for (let j = 0; j < emailList.length; j++) {
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
    },
};