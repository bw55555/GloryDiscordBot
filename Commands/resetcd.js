
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.toLowerCase().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        let cmd = words[2]
        if (cmd == "all") {
            for (var cooldown in target.cooldowns) {
                target.cooldowns[cooldown] = 1
            }
        }
        else if (cmd == undefined || target.cooldowns[cmd] == undefined) { return functions.replyMessage(message, "Please enter a valid command!") }
        else {
            target.cooldowns[cmd] = 1
        }
        functions.replyMessage(message, "You have successfully reset <@" + target._id + ">'s cooldown for the command " + cmd)
        functions.setUser(target)
    })
}