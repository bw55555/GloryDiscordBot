
module.exports = async function (message, user) {
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.isCD(user, ts, "heal")) {
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
            functions.MessageAwait(message.channel, target._id, "<@" + target._id + ">, <@" + user._id + "> would like to heal you! Type `confirm` to accept", "confirm", (response, extraArgs) => {
                return Promise.all([functions.getUser(user._id), functions.getUser(target._id)]).then(ret => {

                    let user = ret[0];
                    let target = ret[1];
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
                    let text = ""
                    if (user.shield > ts) {
                        text += "You just healed someone else! You lost your shield :(\n";
                        user.shield = 1
                    }
                    let maxheal = user.health
                    let heal = Math.floor(target.health * Math.random() + (user.health / 5))

                    if (target.currenthealth + heal > target.health || functions.hasSkill(user, 14)) {
                        heal = target.health - target.currenthealth
                    }
                    target.speed = 0;
                    target.currenthealth += heal
                    text += "You healed <@" + target._id + "> for " + heal + " health!"
                    if (!functions.hasSkill(user, 14)) {
                        let healdmg = Math.floor(heal * Math.random());
                        user.currenthealth -= healdmg;
                        text += "It cost you "+ healdmg+" health. "
                    }
                    if (hasSkill(user, 41)) { text += "\nTheir status effects were purified!"; target.statusEffects = {} }
                    if (functions.isCD(user, ts, "savestate") && hasSkill(user, 42)) { text += "\nYou have kept your tempo!"; functions.setCD(user, ts, 180, "savestate") }
                    else { user.speed = 0; }
                    functions.replyMessage(message, text)
                    let healcd = 0;
                    if (user.triangleid == "5") {
                        healcd = 60;
                    } else {
                        healcd = 90;
                    }
                    if (functions.hasSkill(user, 34)) {
                        healcd = Math.floor(healcd / 2)
                    }
                    functions.setCD(user, ts, healcd, "heal")
                    functions.setCD(user, ts, 60, "purchase")
                    functions.setUser(target)
                    functions.setUser(user)
                })
            }, undefined, "They didn't want to be healed... ")
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
        let text = "You healed for " + heal + " health!"
        if (!functions.hasSkill(user, 14)) { text += "It cost you $" + (heal * 5) }
        if (hasSkill(user, 41)) { text += "\nYour status effects were purified!"; user.statusEffects = {} }
        if (functions.isCD(user, ts, "savestate") && hasSkill(user, 42)) { text += "\nYou have kept your tempo!"; functions.setCD(user, ts, 180, "savestate") }
        else { user.speed = 0; }
        if (heal == 0) {
            functions.replyMessage(message, "(You don't have any money. You can't heal!)");
            return;
        }
        functions.replyMessage(message, text);
        

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
