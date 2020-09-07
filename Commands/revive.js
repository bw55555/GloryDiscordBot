
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        if (user.dead === false) {
            functions.replyMessage(message, "You're not dead. Why do you need to rez?");
            return;
        }
        if (user.health - 10 >= functions.calcExtraStat(user, "health") && user.health > 10) { //debuffs stats if they are above a certain level
            user.health -= 10;
        }
        if (user.attack - 1 >= functions.calcExtraStat(user, "attack") && user.attack >= 1) {
            user.attack -= 1;
        }
        if (user.defense - 1 >= functions.calcExtraStat(user, "defense") && user.defense >= 1) {
            user.defense -= 1;
        }
        user.speed = 0;
        user.xp = 0;
        user.currenthealth = user.health;
        user.dead = false;
        user.shield = ts + 1800000
        functions.completeQuest(user, "revive", {}, 1)
        functions.replyMessage(message, "You have been resurrected! You find yourself a little weaker than before. You also have a 1-minute Rez Shield and can't be attacked.");
    }
    if (words.length == 2 && user.triangleid == 5) {
        if (functions.isCD(user, ts, "rez")) {
            return functions.replyMessage(message, 'You can\'t rez right now. You can only rez once every minute.');
        }
        return Promise.all([functions.validate(message, user)]).then(ret => {
            let target = ret[0];
            if (target == false) {
                return;
            }
            if (user.dead === true) {
                functions.replyMessage(message, "You can't rez as a corpse! Do !resurrect");
                return;
            }
            if (target.dead === false) {
                functions.replyMessage(message, "They're not dead. Why do you need to rez?");
                return;
            }
            if (!functions.hasSkill(user, 14)) {
                user.currenthealth -= Math.abs(Math.floor(Math.random() * Math.random() * target.health) - user.defense);
            }
            target.speed = 0;
            user.speed = 0;
            target.xp = 0;
            target.currenthealth = target.health;
            target.dead = false;
            target.shield = ts + 1800000;
            let text = "<@" + target._id + "> has been resurrected! They feel wonderful!"
            if (!functions.hasSkill(user, 14)) {
                text += " (On the other hand, you don't feel so well)"
            }
            functions.completeQuest(message, "reviveOther", {"target": target}, 1)
            functions.replyMessage(message, text);
            functions.setUser(target)
        })
    }
}