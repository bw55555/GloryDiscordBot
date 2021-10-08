module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; } 
    if (user.guild == "None") { return functions.replyMessage(message, "You need to be in a guild to enchant something!")}
    return Promise.all([functions.getItem(weaponid), functions.getObject("guildData", user.guild)]).then(ret => {
        let item = ret[0]
        let guild = ret[1]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        if (item.owner != user._id) { return functions.replyMessage(message, "You do not own this item!") }
        if (item._id == user.weapon._id) { return functions.replyMessage(message, "This item is currently equipped!") }
        if (item.enchantlevel == undefined) { item.enchantlevel = 0; }
        if (item.enchantlevel >= guild.forge.enchant[0]) { return functions.replyMessage(message, "Your guild forge is not advanced enough to enchant your weapon!") }
        if (item.enchantlevel >= item.rarity) { return functions.replyMessage(message, "Your weapon is not yet strong enough to sustain a more powerful enchantment!") }
        let elevel = item.enchantlevel + 1;
        let ench = words[2];
        let energy = parseInt(words[3]);
        if (words[3] == "%") {
            let wanted = parseInt(words[4]);
            if (wanted + elevel * elevel - 100 * guildForgePrices.enchant[2].bonus[guild.forge.enchant[2]] > 0) {
                energy = 1 + parseInt(200 * elevel - Math.pow(Math.pow(200 * elevel, 2) - Math.pow(elevel * (wanted + elevel * elevel - 100 * guildForgePrices.enchant[2].bonus[guild.forge.enchant[2]]), 2), 0.5));
            } else {
                energy = 1;
            }
        }
        if (isNaN(energy) || energy < 0) { return functions.replyMessage(message, "Please specify the number of energy runes to use!") }
        if (ench == undefined || enchantData[ench] == undefined) { return functions.replyMessage(message, "This enchant does not exist!") }
        
        let runemult = parseInt((elevel) * (elevel + 1) / 2)
        let runetext = "";
        for (var i = 0; i < enchantData[ench].cost.length; i++) {
            if (enchantData[ench].cost[i] > 0) { runetext += enchantData[ench].cost[i] * runemult+" "+runeNames[3+i]+"s, "}
            //if (user.runes[3 + i] < enchantData[ench].cost[i] * runemult) { return functions.replyMessage(message, "You do not have enough runes to enchant your weapon!") }
        }
        if (item.numenchants == undefined) { item.numenchants = 0; }
        if (item.modifiers[ench] == undefined && item.numenchants > 0) { runetext += item.numenchants + " Wisdom Rune(s), "; }
        runetext += energy + " Energy Runes "
        let matscost = parseInt(100000 * Math.pow(4, elevel) * (1-guildForgePrices.enchant[1].bonus[guild.forge.enchant[1]]))
        
        let successrate = parseInt((Math.pow(Math.pow(200 * elevel, 2) - Math.pow(energy - 200 * elevel, 2), 0.5) / elevel) - Math.pow(elevel,2) + 100*guildForgePrices.enchant[2].bonus[guild.forge.enchant[2]])

        functions.MessageAwait(message.channel, id, "Are you sure you want to enchant your weapon? It will cost you "+runetext+"and "+matscost+" materials. "+"You have a success rate of "+successrate+"%\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
            Promise.all([functions.getUser(id), functions.getItem(weaponid)]).then(ret => {
                let user = ret[0];
                let item = ret[1];
                let message = extraArgs[0]
                if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
                if (item.owner != user._id) { return functions.replyMessage(message, "You do not own this item!") }
                if (item._id == user.weapon) { return functions.replyMessage(message, "This item is currently equipped!") }
                if (energy > user.runes[2]) { return functions.replyMessage(message, "You do not have enough energy runes to do this!") }
                if (user.materials < matscost) { return functions.replyMessage(message, "You do not have enough materials!") }
                let runemult = parseInt((elevel) * (elevel + 1) / 2)
                for (var i = 0; i < enchantData[ench].cost.length; i++) {
                    if (user.runes[3 + i] < enchantData[ench].cost[i] * runemult) { return functions.replyMessage(message, "You do not have enough "+runeNames[3+i]+" to enchant your weapon!") }
                }
                if (item.modifiers[ench] == undefined && item.numenchants > 0 && user.runes[1] < item.numenchants) { return functions.replyMessage(message, "You do not have enough wisdom runes!")}
                for (var i = 0; i < enchantData[ench].cost.length; i++) {
                    user.runes[3 + i] -= enchantData[ench].cost[i] * runemult
                }
                if (item.modifiers[ench] == undefined) { user.runes[1] -= item.numenchants; }
                user.runes[2] -= energy
                user.materials -= matscost
                functions.setUser(user)
                let chance = Math.random() * 100;
                let success = true;
                if (chance > successrate) {
                    success = false;
                    functions.replyMessage(message, "Oh no! There wasn't enough energy to activate the runes...")
                } else {
                    if (item.modifiers[ench] == undefined) { item.modifiers[ench] = enchantData[ench].start; item.numenchants += 1; }
                    else if (item.enchantlevel == 8 && item.numenchants <= 1) { item.modifiers[ench] += enchantData[ench].end}
                    else { item.modifiers[ench] += enchantData[ench].level }
                    item.enchantlevel += 1;
                    functions.setItem(item)
                    functions.replyMessage(message, "You have successfully enchanted your weapon to level "+item.enchantlevel)
                }
                functions.completeQuest(user, "enchant", {"item": item, "success": success}, 1)
            })
        }, [message], "Please enter `confirm` to enchant your weapon. (no caps)");

        


        
        
        
    })
}