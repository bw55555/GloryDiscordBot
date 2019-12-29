var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
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
    let price = parseInt(words[2])
    if (isNaN(price) || price >= 1000000000 || price < 0) {
        functions.replyMessage(message, "Choose a integer selling price between 0 and 1 billion.")
        return;
    }
    let weaponid = words[1]
    if (user.inventory[weaponid] != weaponid) {
        functions.sendMessage(message.channel, "You don't own this weapon.")
        return
    }
    if (user.weapon._id == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped.")
        return
    }
    functions.setProp("itemData", { "_id": weaponid }, { $set: { "price": price } })
    functions.sendMessage(message.channel, "You put an item (ID:" + item._id + ") on the market for " + price)
    delete user.inventory[weaponid]
}