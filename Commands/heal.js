var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.calcTime(user.cooldowns.heal, ts) > 0) {
        functions.deleteMessage(message);
        return functions.replyMessage(message, "You can't heal right now. You can only heal once every minute.\nYour next heal will be ready in " + functions.displayTime(user.cooldowns.heal, ts));
    }

    if (user.dead === true) {
        functions.replyMessage(message, "You can't heal as a corpse! Do !resurrect");
        return;
    }
    if (words.length > 1) {
        return Promise.all([functions.validate(message)]).then(ret => {
            let target = ret[0];
            if (target == false) { return }
            let maxheal = user.health
            if (user.dead === true) {
                functions.replyMessage(message, "You can't heal others while you are a corpse! Do !resurrect");
                return;
            }
            if (target.dead === true) {
                functions.replyMessage(message, "You can't heal a corpse! Do !resurrect");
                return;
            }
            if (target._id == user._id) {
                functions.replyMessage(message, "You can't target yourself with a heal!");
                return;
            }
            if (target.currenthealth >= target.health) {
                return functions.replyMessage(message, "<@" + target._id + "> is already at full health!");
            }
            let heal = Math.floor(target.health * Math.random() + (user.health / 5))

            if (target.currenthealth + heal > target.health || functions.hasSkill(user, 14)) {
                heal = target.health - target.currenthealth
            }
            user.speed = 0;
            target.speed = 0;
            target.currenthealth += heal
            user.xp += heal
            if (!functions.hasSkill(user, 14)) {
                user.currenthealth -= Math.floor(heal * Math.random())
            }
            functions.replyMessage(message, "<@" + target._id + "> was healed for " + heal + " health!")
            if (user.triangleid == "5") {
                functions.setCD(user, ts, healcd * 45, "heal")
            } else {
                functions.setCD(user, ts, healcd * 60, "heal")
            }
            if (functions.hasSkill(user, 34)) {
                user.speed = 0;
                functions.setCD(user, ts, healcd * 30, "heal")
                target.speed = 0;
            }
            functions.setUser(target)
        })
    } else {
        if (user.health <= user.currenthealth) {
            return functions.replyMessage(message, "You are already at full health!");
        }
        let heal = user.health - user.currenthealth;
        if (!functions.hasSkill(user, 14)) {
            if (heal * 5 > user.money) {
                heal = Math.floor((user.money) / 5);
            }
            user.money -= (heal * 5);
        }
        user.currenthealth += heal;

        if (heal == 0) {
            functions.replyMessage(message, "(You don't have any money. You can't heal!)");
            return;
        }
        if (!functions.hasSkill(user, 14)) {
            functions.replyMessage(message, "You healed for " + heal + " Health! It cost you $" + (heal * 5));
        }
        else {
            functions.replyMessage(message, "You healed for " + heal + " Health!");
        }
        user.speed = 0;
        functions.setCD(user, ts, healcd * 60, "heal")
        user.speed = 0;
        if (functions.hasSkill(user, 34)) {
            user.speed = 0;
            functions.setCD(user, ts, healcd * 30, "heal")
            user.speed = 0;
        }
    }
}
