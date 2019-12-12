var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)

    if (functions.hasSkill(id, 24)) {
        let target = id
        if (words.length == 2) {
            target = functions.validate(message)
            if (target == false) { return }
        }
        if (!userData[id].cooldowns.regenerate) userData[id].cooldowns.regenerate = ts;
        if (userData[id].dead == true) return functions.replyMessage(message, "You can't regenerate while dead!")
        healthrestored = Math.floor((ts - userData[id].cooldowns.regenerate) / 2000)
        if (healthrestored > 1000) {
            healthrestored = 1000
        }
        userData[target].currenthealth += healthrestored
        if (userData[target].currenthealth > userData[target].health) {
            userData[target].currenthealth = userData[target].health
        }
        if (healthrestored == 0) {
            functions.replyMessage(message, "Your healthpack is charging!")
        } else {
            functions.replyMessage(message, "<@" + target + "> was restored **" + healthrestored + "** health!")
        }
        userData[id].cooldowns.regenerate = ts
    }
    else {
        functions.replyMessage(message, "You don't have this skill!")
        return;
    }
}