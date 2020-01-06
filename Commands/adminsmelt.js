var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    if (words.length == 1) {
        functions.replyMessage(message, "Choose an id!")
        return
    }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0];
        if (item == false) {
            functions.replyMessage(message, "This item does not exist!")
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
        return Promise.all[functions.getUser(item.owner)].then(ret => {
            owner = ret[0]
            if (owner == undefined) { return functions.replyMessage(message, "No one owns this item! Notify a dev. ") }
            if (owner.weapon._id == item._id) { owner.weapon = false }
            let itemRewards = functions.smeltItem(owner, item, false)
            functions.setUser(owner)
            functions.sendMessage(message.channel, "You have adminsmelted item " + item._id + "!")
            return;
        })
    })
}