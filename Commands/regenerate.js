
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let regen = 0;
    if (functions.hasSkill(user, 24)) {
        regen += 3;
    }
    if (user.weapon.modifiers != undefined && user.weapon.modifiers.regen != undefined) { regen += user.weapon.modifiers}
    if (regen > 0) {
        if (!user.cooldowns.regenerate) user.cooldowns.regenerate = ts;
        if (user.dead == true) return functions.replyMessage(message, "You can't regenerate while dead!")
        healthrestored = Math.floor(regen * (ts - user.cooldowns.regenerate) / 2000)
        if (healthrestored > 1000) {
            healthrestored = 1000
        }
        user.currenthealth += healthrestored
        if (user.currenthealth > user.health) {
            user.currenthealth = user.health
        }
        if (healthrestored == 0) {
            functions.replyMessage(message, "Your healthpack is charging!")
        } else {
            functions.replyMessage(message, "<@" + user._id + "> was restored **" + healthrestored + "** health!")
        }
        user.cooldowns.regenerate = ts
        functions.completeQuest(user, "regen", {}, healthrestored)
    }
    else {
        functions.replyMessage(message, "You don't have this skill!")
        return;
    }
}