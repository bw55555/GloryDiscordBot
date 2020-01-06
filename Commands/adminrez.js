var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user}
    if (words.length == 1) {
        if (user.dead === false) {
            functions.replyMessage(message, "You're not dead. Why do you need to rez?");
            return user;
        }
        user.currenthealth = user.health;
        user.dead = false;
        user.shield = ts + 60000
        functions.replyMessage(message, "You have been Admin Rezzed!");
        return user;
    }
    if (words.length == 2) {
        return Promise.all([functions.validate(message,user)]).then(ret => {
            target = ret[0]
            if (target == false) {
                return user;
            }
            if (target.dead === false) {
                functions.replyMessage(message, "They're not dead. Why do you need to rez?");
                return user;
            }
            target.currenthealth = target.health;
            target.dead = false;
            functions.setUser(target)
            functions.replyMessage(message, "<@" + target._id + "> has been admin resurrected! They feel wonderful!");
            functions.logCommand(message)
            return user
        })
    }
}