
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Choose an id! ex. !smelt 123456")
        return
    }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item.owner != user._id) {
            functions.replyMessage(message, "You do not own this item!")
            return
        }
        if (item._id == user.weapon._id) {
            functions.replyMessage(message, "You cannot smelt your equipped weapon!")
            return
        }
        let rarity = item.rarity
        if (rarity == "Unique") {
            functions.replyMessage(message, "You cannot smelt a unique weapon!")
            return
        }
        if (rarity == 9) {
            functions.replyMessage(message, "You cannot smelt a GLORY weapon!")
            return
        }

        let itemRewards = functions.smeltItem(user, item)
        functions.sendMessage(message.channel, "You have smelted item " + item._id + " for " + itemRewards[2] + " materials, $" + itemRewards[1] + " ,and " + itemRewards[0] + " xp.")
    })
}