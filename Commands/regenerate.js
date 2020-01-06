var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.hasSkill(user, 24)) {
        return Promise.all([functions.validate(message,user)]).then(ret => {
            let target = ret[0];
            if (target == false) { return }
            if (!user.cooldowns.regenerate) user.cooldowns.regenerate = ts;
            if (user.dead == true) return functions.replyMessage(message, "You can't regenerate while dead!")
            healthrestored = Math.floor((ts - user.cooldowns.regenerate) / 2000)
            if (healthrestored > 1000) {
                healthrestored = 1000
            }
            target.currenthealth += healthrestored
            if (target.currenthealth > target.health) {
                target.currenthealth = target.health
            }
            if (healthrestored == 0) {
                functions.replyMessage(message, "Your healthpack is charging!")
            } else {
                functions.replyMessage(message, "<@" + target._id + "> was restored **" + healthrestored + "** health!")
            }
            user.cooldowns.regenerate = ts
            functions.setUser(target)
        })
    }
    else {
        functions.replyMessage(message, "You don't have this skill!")
        return;
    }
}