
module.exports = async function (message, user) {
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (isCD(user, ts, "heal")) {
        functions.deleteMessage(message);
        return functions.replyMessage(message, "You can't heal right now. \nYour next heal will be ready in " + functions.displayTime(user.cooldowns.heal, ts));
    }

    if (user.dead === true) {
        functions.replyMessage(message, "You can't heal as a corpse! Do !resurrect");
        return;
    }
    if (words.length > 1) {
        if (user.triangleid != "5") {return functions.replyMessage(message, "Non-healers cannot heal others.") }

        return Promise.all([functions.validate(message,user)]).then(ret => {
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
            if (user.shield > ts) {
                functions.replyMessage(message, "You just healed someone else! You lost your shield :(");
                user.shield = 1
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
            let healcd = 0;
            if (user.triangleid == "5") {
                healcd = 60;
            } else {
                healcd = 90;
            }
            if (functions.hasSkill(user, 34)) {
                healcd = Math.floor(healcd/2)
            }
            functions.setCD(user, ts, healcd, "heal")
            functions.setCD(user, ts, 60, "purchase")
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
        let healcd = 0;
        if (user.triangleid == "5") {
            healcd = 60;
        } else {
            healcd = 90;
        }
        if (user.dungeonts != undefined) { healcd*=3;}
        if (functions.hasSkill(user, 34)) {
            healcd = Math.floor(healcd / 2)
        }
        functions.setCD(user, ts, healcd, "heal")
        functions.completeQuest(user, "heal", {}, heal)
    }
}
