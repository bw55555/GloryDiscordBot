var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let target = functions.validate(message)
    if (target == false) { return; }


    let attribute = words[2];
    if (attribute == undefined) { return functions.replyMessage(message,"Please specify an attribute to set!")}
    if (userData[target][attribute] != undefined) {
        if (typeof userData[target][attribute] == "object") {
            if (words.length > 3) {
                let secondattribute = words[3]
                if (userData[target][attribute][secondattribute] == undefined) {
                    functions.sendMessage(message.channel, "undefined");
                    return
                }
                functions.sendMessage(message.channel, attribute + ":" + secondattribute + "\n" + userData[target][attribute][secondattribute]);
                functions.logCommand(message)
                return
            }
            functions.sendMessage(message.channel, attribute + "\n" + JSON.stringify(userData[target][attribute]));
            functions.logCommand(message)
            return
        }
        functions.sendMessage(message.channel, attribute + "\n" + userData[target][attribute]);
    } else {
        functions.sendMessage(message.channel, "undefined");
        functions.logCommand(message)
        return;
    }
    functions.logCommand(message)
}