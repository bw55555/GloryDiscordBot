
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        let ench = words[2]
        if (ench == undefined || allowedmodifiers.indexOf(ench) == -1) { return functions.replyMessage(message, "That is not an allowed modifier!") }
        if (item.equip == true) { return functions.replyMessage(message, "You cannot enchant an equipped weapon!") }
        let amt = parseFloat(words[3])
        if (isNaN(amt) && words[3] != "level") { return functions.replyMessage(message, "The modifier must be a float!") }
        if (words[3] == "level") {
            if (ench == undefined || enchantData[ench] == undefined) { return functions.replyMessage(message, "This enchant does not exist!") }
            let elevel = parseInt(words[4]);
            if (isNaN(elevel)) { return functions.replyMessage(message, "Please specify an integer level!") }
            if (item.enchantlevel + elevel > 9) { return functions.replyMessage(message, "You cannot enchant a weapon past level 9!") }
            for (let i = 0; i < elevel; i++) {
                if (item.modifiers[ench] == undefined) { item.modifiers[ench] = enchantData[ench].start; item.numenchants += 1; }
                else if (item.enchantlevel == 8 && item.numenchants <= 1) { item.modifiers[ench] += enchantData[ench].end }
                else { item.modifiers[ench] += enchantData[ench].level }
                item.enchantlevel += 1;
                functions.setItem(item)
            }
            functions.setItem(item)
            functions.replyMessage(message, "You have successfully enchanted item " + words[1] + " with modifier " + words[2] + " to level " + item.enchantlevel)
        } else {
            item.modifiers[ench] = amt
            functions.setItem(item)
            functions.replyMessage(message, "You have successfully enchanted item " + words[1] + " with modifier " + words[2] + " at level " + words[3])
            
        }
        functions.logCommand(message)
    })
}