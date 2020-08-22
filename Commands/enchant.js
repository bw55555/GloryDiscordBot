const enchantData = {
    "critRate": { "start": 0.01, "level": 0.01, "end": 0.02, "cost": [6, 4, 0, 0] },
    "critDamage": [7, 3, 0, 0],
    "lifeSteal": [3, 2, 0, 5],
    "lucky": [10, 0, 0, 0],
    "sacrifice": [3, 5, 0, 2],
    "revenge": [6, 3, 1, 0],
    "rage": [6, 3, 0, 1],
    "burn": [6, 4, 0, 0],
    "haste": [10, 0, 0, 0],
    "evade": [8, 0, 2, 0],
    "tempo": [8, 2, 0, 0],
    "regen": [2, 0, 0, 8],
    "pierce": [0, 10, 0, 0],
    "spikes": [0, 5, 5, 0],
    "block": [0, 0, 10, 0],
    "maxhp": [0, 0, 0, 10]
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This function is under development!")}
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; } 
    if (user.guild == "None") { return functions.replyMessage(message, "You need to be in a guild to enchant something!")}
    return Promise.all([functions.getItem(weaponid), functions.getObject("guildData", user.guild)]).then(ret => {
        let item = ret[0]
        let guild = ret[1]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        let ench = words[2];
        let energy = parseInt(words[3]);
        
        if (ench == undefined || enchantData[ench] == undefined) { return functions.replyMessage(message, "This enchant does not exist!") }
        if (isNaN(energy) || energy < 0) { return functions.replyMessage(message, "Please specify the number of energy runes to use!") }
        if (energy > user.runes[2]) { return functions.replyMessage(message, "You do not have enough energy runes to do this!") }
        if (item.enchantlevel == undefined) { item.enchantlevel = 0; }
        if (item.enchantlevel >= guild.forge.enchant[0]) { return functions.replyMessage(message, "Your guild forge is not advanced enough to enchant your weapon!") }
        if (item.enchantlevel >= item.rarity) { return functions.replyMessage(message, "Your weapon is not yet strong enough to sustain a more powerful enchantment!")}
        let elevel = item.enchantlevel + 1;
        let runemult = parseInt((elevel) * (elevel + 2) / 2)
        let runetext = "";
        for (var i = 0; i < enchantData[ench].cost.length; i++) {
            if (enchantData[ench].cost[i] > 0) { runetext += enchantData[ench].cost[i] * runemult+" "+runeNames[3+i]+", "}
            if (user.runes[3 + i] < enchantData[ench].cost[i] * runemult) { return functions.replyMessage(message, "You do not have enough runes to enchant your weapon!") }
        }
        
        let matscost = parseInt(100000 * Math.pow(4, elevel) * guildForgePrices.enchant[1].bonus[guild.forge.enchant[1]])
        
        let successrate = parseInt((Math.pow(Math.pow(200 * elevel, 2) - Math.pow(energy - 200 * elevel, 2), 0.5) / elevel) - Math.pow(elevel,2) + 100*guildForgePrices.enchant[2].bonus[guild.forge.enchant[2]])

        functions.MessageAwait(message.channel, id, "Are you sure you want to enchant your weapon? It will cost you "+runetext+"and "+matscost+" materials. "+"You have a success rate of "+successrate+"%\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
            Promise.all([functions.getUser(id), functions.getItem(weaponid)]).then(ret => {
                let user = ret[0];
                let item = ret[1];
                let message = extraArgs[0]
                if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
                if (energy > user.runes[2]) { return functions.replyMessage(message, "You do not have enough energy runes to do this!") }
                if (user.materials < matscost) { return functions.replyMessage(message, "You do not have enough materials!") }
                let runemult = parseInt((elevel) * (elevel + 1) / 2)
                for (var i = 0; i < enchantData[ench].cost.length; i++) {
                    if (user.runes[3 + i] < enchantData[ench].cost[i] * runemult) { return functions.replyMessage(message, "You do not have enough "+runeNames[3+i]+" to enchant your weapon!") }
                }
                for (var i = 0; i < enchantData[ench].cost.length; i++) {
                    user.runes[3 + i] -= enchantData[ench].cost[i] * runemult
                }
                user.runes[2] -= energy
                user.materials -= matscost
                functions.setUser(user)
                let chance = Math.random() * 100;
                if (chance > successrate) {
                    return functions.replyMessage(message, "Oh no! There wasn't enough energy to activate the runes...")
                } else {
                    if (item.modifiers[ench] == undefined) { item.modifiers[ench] = enchantData[ench].start; item.numenchants += 1; }
                    else if (item.enchantlevel == 8 && item.numenchants <= 1) { item.modifiers[ench] += enchantData[ench].end}
                    else { item.modifiers[ench] += enchantData[ench].level }
                    item.enchantlevel += 1;
                    functions.setItem(item)
                    return functions.replyMessage(message, "You have successfully enchanted your weapon to level "+item.enchantlevel)
                }
                functions.replyMessage(message, "You have ascended! You now have " + (user.consum.sp) + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
            })
        }, [message], "Please enter `confirm` to enchant your weapon. (no caps)");

        


        
        
        
    })
}