var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        let attribute = words[2];
        if (attribute == undefined) { functions.replyMessage(message, "Please specify an attribute to set!");return user; }
        if (target[attribute] != undefined) {
            if (typeof target[attribute] == "object") {
                if (words.length > 3) {
                    let secondattribute = words[3]
                    if (target[attribute][secondattribute] == undefined) {
                        functions.sendMessage(message.channel, "undefined");
                        return user;
                    }
                    functions.sendMessage(message.channel, attribute + ":" + secondattribute + "\n" + target[attribute][secondattribute]);
                    functions.logCommand(message)
                    return user;
                }
                functions.sendMessage(message.channel, attribute + "\n" + JSON.stringify(target[attribute]));
                functions.logCommand(message)
                return user;
            }
            functions.sendMessage(message.channel, attribute + "\n" + target[attribute]);
        } else {
            functions.sendMessage(message.channel, "undefined");
            functions.logCommand(message)
            return user;
        } })
    
    functions.logCommand(message)
}