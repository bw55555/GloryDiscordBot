
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.triangleid != 9 && !functions.hasSkill(user, 11)) {
        return functions.replyMessage(message, "You can't bolster!");
    }
    if (functions.isCD(user, ts, "bolster")) {
        functions.deleteMessage(message);
        return functions.replyMessage(message, "You can't bolster right now. You can bolster again in " + functions.displayTime(user.cooldowns.bolster, ts));
    }
    if (words.length == 1) {
        if (user.statusEffects.bolster >= 1) {
            functions.replyMessage(message, "You are already bolstered!");
            return;
        }
        if (user.triangleid != 9) {
            functions.replyMessage(message, "You cannot bolster yourself!");
            return
        }
        user.statusEffects.bolster = 1;
        functions.replyMessage(message, "You have bolstered yourself!");
        functions.setCD(user, ts, bolstercd * 60, "bolster")
    } else if (words.length == 2) {
        return Promise.all([functions.validate(message,user)]).then(ret => {
            let target = ret[0];
            if (target == false) {
                return;
            }
            if (target.statusEffects.bolster >= 1) {
                functions.replyMessage(message, "They are already bolstered!");
                return;
            }
            if (target._id == user._id && user.triangleid != 9) { return functions.replyMessage(message, "You cannot bolster yourself!") }
            target.statusEffects.bolster = 1;
            if (target._id == user._id) {
                functions.replyMessage(message, "You have been bolstered!");
            }
            else if (user.triangleid == 9) {
                user.statusEffects.bolster = 1;
                functions.replyMessage(message, "You and <@" + target._id + "> have both been bolstered!");
            } else {
                functions.replyMessage(message, "<@" + target._id + "> has been bolstered!");
            }
            functions.setCD(user, ts, bolstercd * 60, "bolster")
            functions.setUser(target)
        })
    
  }
}