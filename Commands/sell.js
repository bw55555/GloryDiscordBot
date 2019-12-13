var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (words.length != 3) {
        functions.replyMessage(message, "`sell [weaponid] [price]`")
        return
    }

    if (isNaN(words[1])) {
        functions.replyMessage(message, "Choose a real weapon id.")
        return;
    }
    if (isNaN(words[2]) || words[2] >= 1000000000) {
        functions.replyMessage(message, "Choose a integer selling price.")
        return;
    }
    let weaponid = words[1]
    if (itemData[weaponid] == undefined) {
        if (user.inventory[weaponid] == weaponid) {
            delete user.inventory[weaponid]
        }
        functions.replyMessage(message, "This weapon does not exist.");
        return
    } else if (user.weapon == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped.")
        return
    } else if (user.inventory[weaponid] != weaponid) {
        functions.sendMessage(message.channel, "You don't own this weapon.")
        return
    }
    let price = Math.floor(words[2])
    if (price < 0) {
        functions.sendMessage(message.channel, "Don't even try.")
        return
    }
    itemData[weaponid].price = price
    functions.sendMessage(message.channel, "You put " + itemData[weaponid].name + " (" + weaponid + ") on the market for " + price)
    delete user.inventory[weaponid]
}