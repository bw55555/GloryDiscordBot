
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (words.length != 3) {
        functions.replyMessage(message, "`sell [weaponid] [price]`")
        return
    }

    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    let price = parseInt(words[2])
    if (isNaN(price) || price >= 1000000000 || price < 0) {
        functions.replyMessage(message, "Choose a integer selling price between 0 and 1 billion.")
        return;
    }
    if (user.weapon._id == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped.")
        return
    }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item.owner != user._id) {
            return functions.replyMessage(message, "You don't own this weapon.")
        }
        if (item.price != undefined) {return functions.replyMessage(message, "This item is already on the market!")}
        if (item.rarity == 9) { return functions.replyMessage(message, "You cannot sell a GLORY weapon!") }
        if (item.rarity == "Unique") { return functions.replyMessage(message, "You cannot sell a unique weapon!") }
        functions.setProp("itemData", { "_id": weaponid }, { $set: { "price": price } })
        functions.sendMessage(message.channel, "You put an item (ID:" + item._id + ") on the market for $" + price)
    })
}