var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (functions.calcTime(user.cooldowns.attack, ts) > 0) {
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
        console.log(target._id)
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
        if (user.ascension * 10 + user.level > target.ascension * 10 + target.level + 100) {
            functions.replyMessage(message, "You can't attack anyone that's less than 100 levels less than you!");
            return;
        }
        if (user.ascension * 10 + user.level < target.ascension * 10 + target.level - 100) {
            functions.replyMessage(message, "You can't attack anyone that's more than 100 levels higher than you!");
            return;
        }
        if (user.shield > ts) {
            functions.replyMessage(message, "You just attacked! You lost your shield :(");
            user.shield = 1
        }
        functions.dmUser(target, "You have been attacked by " + user.username + "! Their id is " + id)
        let damage = functions.calcDamage(message, user, target, user);//ok...
        let counter = functions.calcDamage(message, target, user, user);

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
                        value: "<@" + target._id + "> took " + damage + " damage! They have " + target.currenthealth + " Health remaining!",
                    }, {
                        name: "Counter Results",
                        value: "<@" + user._id + "> took " + counter + " counterdamage! You have " + user.currenthealth + " Health remaining!",
                    }
                ]
            }
        });

        if (target.currenthealth <= 0 && user.currenthealth <= 0) {
            target.dead = true;
            target.currenthealth = 0;
            user.dead = true;
            user.currenthealth = 0;
            user.xp = 0
            target.xp = 0
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

            user.xp += target.xp
            target.xp = 0

            if (user.glory != undefined && target.glory != undefined) {
                let glorywon = (target.level / user.level) * target.glory * 0.005
                if (glorywon > 1.5) {
                    glorywon = 1.5
                }
                target.glory -= glorywon
                user.glory += glorywon
            }

            if (user.currenthealth > 0 && functions.hasSkill(user, 15)) {
                user.currenthealth += target.health
                functions.sendMessage(message.channel, "Soulsteal activated. <@" + user._id + "> has stolen " + target.health + " health");
                user.currenthealth = Math.min(user.currenthealth, user.health)
            }

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
            target.xp += user.xp
            user.xp = 0

            if (user.glory != undefined && target.glory != undefined) {
                let glorywon = (user.level / target.level) * user.glory * 0.005
                if (glorywon > 1.5) {
                    glorywon = 1.5
                }
                target.glory += glorywon
                user.glory -= glorywon
            }


            if (target.currenthealth > 0 && functions.hasSkill(target, 15)) {
                target.currenthealth += user.health
                functions.sendMessage(message.channel, "Soulsteal activated. <@" + target._id + "> has stolen " + user.health + " health");
                target.currenthealth = Math.min(target.currenthealth, target.health)
            }
        }
        user.cooldowns.attack = ts + attackcd * 60 * 1000
        user.cooldowns.heal = ts + healcd * 60 * 1000
        target.cooldowns.heal = ts + healcd * 60 * 1000
        user.cooldowns.purchase = ts + 1000 * 60
        target.cooldowns.purchase = ts + 1000 * 60
        user.speed += 1;
        target.speed += 1;
        functions.setUser(target)
    })
}
