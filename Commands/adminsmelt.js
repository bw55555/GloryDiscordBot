var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    if (words.length == 1) {
        functions.replyMessage(message, "Choose an id!")
        return
    }
    let weaponid = words[1]

    if (itemData[weaponid] == 0 || itemData[weaponid] == null || itemData[weaponid] == undefined) {
        functions.replyMessage(message, "This item does not exist!")
        return
    }
    /*if (userData[id].inventory[weaponid] != weaponid) {
        functions.replyMessage(message, "You do not own this item!")
        return
    }
    if (weaponid == userData[id].weapon) {
        functions.replyMessage(message, "You cannot smelt your equipped weapon!")
        return
    }
    let rarity = itemData[weaponid].rarity
    if (rarity == "Unique") {
        functions.replyMessage(message, "You cannot smelt a unique weapon!")
        return
    }
    if (rarity == 9) {
        functions.replyMessage(message, "You cannot smelt a GLORY weapon!")
        return
    }*/

    let itemRewards = functions.smeltItem(id, weaponid)
    functions.sendMessage(message.channel, "You have smelted item " + weaponid + " for " + itemRewards[2] + " materials, $" + itemRewards[1] + " ,and " + itemRewards[0] + " xp.")
}