const enchantData = {
    "critRate": { "start": 0.01, "level": 0.01, "end": 0.02, "cost": [6, 4, 0, 0] },
    "critDamage": { "start": 0.4, "level": 0.3, "end": 0.5, "cost": [7, 3, 0, 0] },
    "lifeSteal": { "start": 0.04, "level": 0.03, "end": 0.5, "cost": [3, 2, 0, 5] },
    "lucky": { "start": 1.2, "level": 0.3, "end": 0.5, "cost": [10, 0, 0, 0] },
    "sacrifice": { "start": 0.04, "level": 0.03, "end": 0.05, "cost": [3, 5, 0, 2] },
    "revenge": { "start": 0.005, "level": 0.005, "end": 0.01, "cost": [6, 3, 1, 0] },
    "rage": { "start": 0.2, "level": 0.2, "end": 0.4, "cost": [6, 3, 0, 1] },
    "burn": { "start": 5, "level": 2, "end": 6, "cost": [6, 4, 0, 0] },
    "haste": { "start": 0.03, "level": 0.01, "end": 0.05, "cost": [10, 0, 0, 0] },
    "evade": { "start": 0.01, "level": 0.005, "end": 0.015, "cost": [8, 0, 2, 0] },
    "tempo": { "start": 0.2, "level": 0.3, "end": 0.4, "cost": [8, 2, 0, 0] },
    "regen": { "start": 0.05, "level": 0.02, "end": 0.06, "cost": [2, 0, 0, 8] },
    "pierce": { "start": 0.02, "level": 0.02, "end": 0.4, "cost": [0, 10, 0, 0] },
    "spikes": { "start": 0.2, "level": 0.2, "end": 0.4, "cost": [0, 5, 5, 0] },
    "block": { "start": 0.02, "level": 0.01, "end": 0.03, "cost": [0, 0, 10, 0] },
    "maxhp": { "start": 20.0, "level": 40.0, "end": 100.0, "cost": [0, 0, 0, 10] }
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return functions.replyMessage(message, "This function is under development!") }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    if (user.guild == "None") { return functions.replyMessage(message, "You need to be in a guild to enhance something!") }
    let stat = words[2];
    if (stat == undefined) { return functions.replyMessage(message, "Please specify a stat(random, attack, or defense)!") }
    stat = stat.toLowerCase();
    if (stat != "random" && stat != "attack" && stat != "defense") { return functions.replyMessage(message, "Please specify attack, defense, or random. ") }
    let num = words[3];
    if (num == undefined) { num = 1; }
    num = parseInt(num);
    if (num < 0) {return functions.replyMessage(message, "Please specify a positive integer number!")}
    return Promise.all([functions.getItem(weaponid), functions.getObject("guildData", user.guild)]).then(ret => {
        let item = ret[0]
        let guild = ret[1]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        if (item.owner != user._id) { return functions.replyMessage(message, "You do not own this item!") }
        if (item._id == user.weapon) { return functions.replyMessage(message, "This item is currently equipped!") }
        if (item.enhance.level+1 > guildForgePrices.enhance[0].bonus[guild.forge.enhance[0]]) { return functions.replyMessage(message, "The guild forge is not advanced enough to enhance this item further!") }
        if (item.enhance.level+1 > Math.pow(2, item.rarity)) { return functions.replyMessage(message, "Your weapon is not strong enough to withstand another enhancement!") }
        let successrate = 100 - 10 * item.rarity + 100 * guildForgePrices.enhance[2].bonus[guild.forge.enhance[2]]
        let cost = parseInt(Math.pow(2, Math.pow(item.enhance.level, 0.5)) * (item.enhance.level + 1) * 10000 * (1 - guildForgePrices.enhance[1].bonus[guild.forge.enhance[1]]))
        if (stat == "attack" || stat == "defense") { cost *= 2 }
        let extratext = "? It will cost you $" + cost + ".You have a success rate of " + successrate + "%"
        if (num > 1) { extratext = " "+num+" times?"}
        functions.MessageAwait(message.channel, id, "Are you sure you want to enhance your weapon" +extratext+ "\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
            Promise.all([functions.getUser(id), functions.getItem(weaponid)]).then(ret => {
                let user = ret[0];
                let item = ret[1];
                let message = extraArgs[0]
                if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
                if (item.owner != user._id) { return functions.replyMessage(message, "You do not own this item!") }
                if (item._id == user.weapon) { return functions.replyMessage(message, "This item is currently equipped!") }
                if (num == 1) {
                    let cost = parseInt(Math.pow(2, Math.pow(item.enhance.level, 0.5)) * item.enhance.level * 10000 * (1 - guildForgePrices.enhance[1].bonus[guild.forge.enhance[1]]))
                    let successrate = 100 - 10 * item.rarity + 100 * guildForgePrices.enhance[2].bonus[guild.forge.enhance[2]]
                    if (user.money < cost) { return functions.replyMessage(message, "You do not have enough money!") }
                    user.money -= cost;
                    functions.setUser(user)
                    let chance = Math.random() * 100;
                    if (chance > successrate) {
                        return functions.replyMessage(message, "Oh no! It failed...")
                    } else {
                        item.enhance.level += 1;
                        if (stat == "random") {
                            if (Math.random() > 0.5) {
                                stat = "attack"
                            } else {
                                stat = "defense"
                            }
                        }
                        item.enhance[stat] += 1;
                        functions.setItem(item)
                        return functions.replyMessage(message, "You have successfully enhanced your weapon to level " + item.enhance.level)
                    }
                }
                let text = "";
                for (let i = 0; i < num; i++) {
                    if (text.length > 1900) {functions.replyMessage(message, text); text = ""}
                    cost = parseInt(Math.pow(2, Math.pow(item.enhance.level, 0.5)) * item.enhance.level * 10000 * (1 - guildForgePrices.enhance[1].bonus[guild.forge.enhance[1]]))
                    successrate = 100 - 10 * item.rarity + 100 * guildForgePrices.enhance[2].bonus[guild.forge.enhance[2]]
                    if (item.enhance.level + 1 > guildForgePrices.enhance[0].bonus[guild.forge.enhance[0]]) { text += "The guild forge is not advanced enough to enhance this item further!\n";break }
                    if (item.enhance.level + 1 > Math.pow(2, item.rarity)) { text += "Your weapon is not strong enough to withstand another enhancement!\n";break }
                    if (user.money < cost) { text += "You do not have enough money!\n"; break }
                    user.money -= cost;
                    functions.setUser(user)
                    let chance = Math.random() * 100;
                    if (chance > successrate) {
                        text += "Oh no! It failed...\n";
                    } else {
                        item.enhance.level += 1;
                        let tu = stat;
                        if (stat == "random") {
                            if (Math.random() > 0.5) {
                                tu = "attack"
                            } else {
                                tu = "defense"
                            }
                        }
                        item.enhance[tu] += 1;
                        text += "You have successfully enhanced your weapon to level " + item.enhance.level +"\n"
                    }
                }
                if (text != "") { functions.replyMessage(message, text); }
                functions.setItem(item);
            })
        }, [message], "Please enter `confirm` to enhance your weapon. (no caps)");
    })
}