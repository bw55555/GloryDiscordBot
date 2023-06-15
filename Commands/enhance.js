module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    if (user.guild == "None") { return functions.replyMessage(message, "You need to be in a guild to enhance something!") }
    let stat = words[2];
    if (stat == undefined) { return functions.replyMessage(message, "Please specify a stat(random, attack, or defense)!") }
    stat = stat.toLowerCase();
    if (stat != "random" && stat != "attack" && stat != "defense") { return functions.replyMessage(message, "Please specify attack, defense, or random. ") }
    let num = words[3];
    let enhanceToLevel = false;
    if (words[3] == "level") { num = words[4]; enhanceToLevel = true;}
    if (num == undefined) { num = 1; }
    num = parseInt(num);
    if (isNaN(num) || num < 0) {return functions.replyMessage(message, "Please specify a positive integer number!")}
    return Promise.all([functions.getItem(weaponid), functions.getObject("guildData", user.guild)]).then(ret => {
        let item = ret[0]
        let guild = ret[1]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        if (item.owner != user._id) { return functions.replyMessage(message, "You do not own this item!") }
        if (item._id == user.weapon._id) { return functions.replyMessage(message, "This item is currently equipped!") }
        if (item.enhance == undefined) {
            item.enhance = { "level": 0, "attack": 0, "defense": 0 }
        }
        if (item.enhance.level+1 > guildForgePrices.enhance[0].bonus[guild.forge.enhance[0]]) { return functions.replyMessage(message, "The guild forge is not advanced enough to enhance this item further!") }
        if (item.enhance.level+1 > Math.pow(2, item.rarity)) { return functions.replyMessage(message, "Your weapon is not strong enough to withstand another enhancement!") }
        let successrate = 100 - 10 * item.rarity + 100 * guildForgePrices.enhance[2].bonus[guild.forge.enhance[2]]
        let cost = parseInt(Math.pow(1.4, Math.pow(item.enhance.level, 0.5)) * Math.pow(item.enhance.level + 1, 1.5) * 10000 * (1 - guildForgePrices.enhance[1].bonus[guild.forge.enhance[1]]))
        if (stat == "attack" || stat == "defense") { cost *= 2 }
        let extratext = "? It will cost you $" + cost + ".You have a success rate of " + successrate + "%"
        if (num > 1) { extratext = " " + num + " times? You have a success rate of " + successrate + "%" }
        if (enhanceToLevel) { extratext = " to level "+num+"? You have a success rate of " + successrate + "%"}
        functions.MessageAwait(message.channel, id, "Are you sure you want to enhance your weapon" +extratext+ "\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
            Promise.all([functions.getUser(id), functions.getItem(weaponid)]).then(ret => {
                let user = ret[0];
                let item = ret[1];
                let message = extraArgs[0]
                if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
                if (item.owner != user._id) { return functions.replyMessage(message, "You do not own this item!") }
                if (item._id == user.weapon) { return functions.replyMessage(message, "This item is currently equipped!") }
                if (num == 1) {
                    let ret = enhanceWeapon(user, guild, item, stat);
                    if (ret.text) {
                        functions.replyMessage(message, text);
                    }
                    if (!ret.success) {
                        functions.replyMessage(message, "Oh no! It failed...")
                    }
                    if (ret.success) {
                        functions.replyMessage(message, "You have successfully enhanced your weapon to level " + item.enhance.level)
                    }
                } else {
                    let text = "";
                    let totalcost = 0;
                    let i = 0;
                    for (i = 0; i < min(num, 1000); i++) {
                        if (enhanceToLevel && item.enhance.level >= num) { break; }
                        let ret = enhanceWeapon(user, guild, item, stat)
                        if (ret.text != undefined) { text += ret.text; break }
                        if (ret.cost != undefined) { totalcost += ret.cost }
                    }
                    text = "You spent "+i +" attempts and a total of $" + totalcost + " to enhance your weapon to level " + item.enhance.level + "!\n" + text;
                    functions.replyMessage(message, text);
                    functions.setUser(user);
                    functions.setItem(item);
                }
            })
        }, [message], "Please enter `confirm` to enhance your weapon. (no caps)");
    })
}
function enhanceWeapon(user, guild, item, stat) {
    let cost = parseInt(Math.pow(1.4, Math.pow(item.enhance.level, 0.5)) * Math.pow(item.enhance.level + 1, 1.5) * 10000 * (1 - guildForgePrices.enhance[1].bonus[guild.forge.enhance[1]]))
    if (stat == "attack" || stat == "defense") {cost *= 2}
    let successrate = 100 - 10 * item.rarity + 100 * guildForgePrices.enhance[2].bonus[guild.forge.enhance[2]]
    if (item.enhance.level + 1 > guildForgePrices.enhance[0].bonus[guild.forge.enhance[0]]) { return { "text": "The guild forge is not advanced enough to enhance this item further!\n" } }
    if (item.enhance.level + 1 > Math.pow(2, item.rarity)) { return { "text": "Your weapon is not strong enough to withstand another enhancement!\n" } }
    if (user.money < cost) {
        return { "text": "You do not have enough money!\n" }
    }
    user.money -= cost;
    let chance = Math.random() * 100;
    let success = true;
    if (chance > successrate) {
        success = false;
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
    }
    functions.completeQuest(user, "enhance", { "success": success, "item": item }, 1)
    return {"cost": cost, "success": success}
}