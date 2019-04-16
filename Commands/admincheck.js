var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let target = functions.validate(message)
    if (target == false) { return; }


    let attribute = words[2];
    if (userData[target][attribute] != undefined) {
        functions.sendMessage(message.channel, attribute + "\n" + userData[target][attribute]);
    } else {
        functions.sendMessage(message.channel, "undefined");
        return;
    }
    functions.logCommand(message)
}