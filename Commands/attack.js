
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (functions.isCD(user, ts, "attack")) {
        functions.deleteMessage(message);
        functions.replyMessage(message, 'You can\'t attack right now. You can attack again in ' + functions.displayTime(user.cooldowns.attack, ts));
        return;
    }

    if (user.dead === true) {
        functions.replyMessage(message, "Corpses can\'t attack! Do !resurrect");
        return;
    }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) {
            return;
        }
        if (target.dead == true) {
            functions.replyMessage(message, "Don't attack corpses!");
            return;
        }
        if (target._id == user._id) {
            functions.replyMessage(message, "Don't attack yourself!");
            return;
        }
        if (target.shield > ts) {
            functions.replyMessage(message, "They are protected from attacks! Try again in " + functions.displayTime(target.shield, ts));
            return;
        }
        if (user.shield > ts) {
            functions.replyMessage(message, "You just attacked! You lost your shield :(");
            user.shield = 1
        }
        functions.dmUser(target, "You have been attacked by " + user.username + "! Their id is " + id)
        let damage = 0;
        let counter = 0;
        let damagearr = functions.calcDamage(message, user, target, user);//ok...
        let damagetext = damagearr[0];
        damage += damagearr[1]
        counter += damagearr[2]
        let counterarr = functions.calcDamage(message, target, user, user);//ok...
        let countertext = counterarr[0];
        counter += counterarr[1];
        damage += counterarr[2];

        if (damage < 0) {
            damage = 0;
        }
        if (counter < 0) {
            counter = 0;
        }
        user.currenthealth = user.currenthealth - counter;
        target.currenthealth = target.currenthealth - damage;
        //console.log('targethealth: ' + target.currenthealth);
        let stolen = Math.floor((target.money) / 5);
        let counterstolen = Math.floor((user.money) / 5);
        /*
        target.xp += counter * user.level;
        user.xp += damage * target.level;
        */
        if (user.currenthealth > user.health) {
            user.currenthealth = user.health
        }

        if (target.currenthealth > target.health) {
            target.currenthealth = target.health
        }

        functions.sendMessage(message.channel, {
            embed: {
                title: '<:pvpattack:549652727744167936>' + message.author.username + " attacks " + target.username + "!",
                color: 0xF1C40F,
                fields: [
                    {
                        name: "Attack Results",
                        value: damagetext + "<@" + target._id + "> took **" + damage + "** damage! They have **" + target.currenthealth + "** Health remaining!",
                    }, {
                        name: "Counter Results",
                        value: countertext + "<@" + user._id + "> took **" + counter + "** counterdamage! You have **" + user.currenthealth + "** Health remaining!",
                    }
                ]
            }
        });
        if (target.currenthealth <= 0 && user.currenthealth <= 0) {
            target.dead = true;
            target.currenthealth = 0;
            user.dead = true;
            user.currenthealth = 0;
            let xplost = Math.floor(functions.checkxp(user) / 10)
            user.xp -= xplost;
            if (user.level <= 1) { user.xp = 0 }
            if (user.xp < 0) { user.level -= 1; user.xp += functions.checkxp(user) }
            xplost = Math.floor(functions.checkxp(target) / 10)
            target.xp -= xplost;
            if (target.level <= 1) { target.xp = 0 }
            if (target.xp < 0) { target.level -= 1; target.xp += functions.checkxp(target) }
            target.money -= stolen;
            user.money -= counterstolen;
            functions.sendMessage(message.channel, '<@' + user._id + '> and <@' + target._id + '> was killed! Both lost 10% of their money.');
            if (user.bounty > 0) {
                functions.sendMessage(message.channel, '<@' + target._id + "> collected your bounty of $" + user.bounty);
                target.money += user.bounty;
                user.bounty = 0;
            }
            if (target.bounty > 0) {
                functions.sendMessage(message.channel, 'You collected <@' + target._id + ">'s bounty of $" + target.bounty);
                user.money += target.bounty;
                target.bounty = 0;
            }
            functions.completeQuest(user, "kill", { "death": target }, 1)
            functions.completeQuest(target, "kill", { "death": user }, 1)
        }
        else if (target.currenthealth <= 0) {
            target.dead = true;
            target.currenthealth = 0;
            target.money -= stolen;
            user.money += stolen;
            functions.sendMessage(message.channel, '<@' + target._id + '> was killed! You stole $' + stolen + ' from their body.');
            if (target.bounty > 0) {
                functions.sendMessage(message.channel, 'You collected <@' + target._id + ">'s bounty of $" + target.bounty);
                user.money += target.bounty;
                target.bounty = 0;
            }

            let xplost = Math.floor(functions.checkxp(target) / 10)
            target.xp -= xplost;
            if (target.level <= 1) { target.xp = 0 }
            if (target.xp < 0) { target.level -= 1; target.xp += functions.checkxp(target) }

            if (user.glory != undefined && target.glory != undefined) {
                let glorywon = target.glory * 0.001
                if (glorywon > 1) {
                    glorywon = 1;
                }
                target.glory -= glorywon
                user.glory += glorywon
            }

            if (user.currenthealth > 0 && functions.hasSkill(user, 15)) {
                user.currenthealth += target.health
                functions.sendMessage(message.channel, "Soulsteal activated. <@" + user._id + "> has stolen " + target.health + " health");
                user.currenthealth = Math.min(user.currenthealth, user.health)
            }
            functions.completeQuest(user, "kill", {"death": target}, 1)
        } else if (user.currenthealth <= 0) {
            user.dead = true;
            user.currenthealth = 0;
            user.money -= counterstolen;
            target.money += counterstolen;
            functions.sendMessage(message.channel, '<@' + user._id + '> (you) were killed! <@' + target._id + '> stole $' + counterstolen + ' from your body.');
            if (user.bounty > 0) {
                functions.sendMessage(message.channel, '<@' + target._id + "> collected your bounty of $" + user.bounty);
                target.money += user.bounty;
                user.bounty = 0;
            }
            let xplost = Math.floor(functions.checkxp(user) / 10)
            user.xp -= xplost;
            if (user.level <= 1) { user.xp = 0 }
            if (user.xp < 0) { user.level -= 1; user.xp += functions.checkxp(user) }

            if (user.glory != undefined && target.glory != undefined) {
                let glorywon = user.glory * 0.001
                if (glorywon > 1) {
                    glorywon = 1
                }
                target.glory += glorywon
                user.glory -= glorywon
            }


            if (target.currenthealth > 0 && functions.hasSkill(target, 15)) {
                target.currenthealth += user.health
                functions.sendMessage(message.channel, "Soulsteal activated. <@" + target._id + "> has stolen " + user.health + " health");
                target.currenthealth = Math.min(target.currenthealth, target.health)
            }
            functions.completeQuest(target, "kill", { "death": user }, 1)
        }
        functions.completeQuest(user, "attack", {"target": target, "damage": damage, "counter": counter})
        functions.setCD(user, ts, 60, "attack")
        functions.setCD(user, ts, 120, "heal")
        functions.setCD(user, ts, 300, "purchase")
        functions.setCD(user, ts, 300, "crystalmines")
        functions.setCD(target, ts, 30, "attack")
        functions.setCD(target, ts, 120, "heal")
        functions.setCD(target, ts, 300, "crystalmines")
        user.speed += 1;
        target.speed += 1;
        functions.setUser(target)
    })
}
