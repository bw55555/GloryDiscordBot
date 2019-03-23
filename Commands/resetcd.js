var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.toLowerCase().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let target = functions.validate(message)
    if (target == false) { return; }
    let cmd = words[2]
    if (cmd == "all") {
        for (var cooldown in userData[target].cooldowns) {
            userData[target].cooldowns[cooldown]=1
        }
    }
    else if (cmd == undefined || userData[target].cooldowns[cmd] == undefined) { return functions.replyMessage(message, "Please enter a valid command!") }
    else {
        userData[target].cooldowns[cmd]=1
    }
    functions.replyMessage(message,"You have successfully reset <@"+target+">'s cooldown for the command "+cmd)
}