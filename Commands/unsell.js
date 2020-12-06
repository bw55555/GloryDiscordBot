
module.exports = async function (message, user) {
    //INCOMPLETE
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (words.length != 2) {
        functions.replyMessage(message, "`unsell [weaponid]`")
        return
    }

    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item == false) {
            functions.replyMessage(message, "This weapon does not exist.");
            return
        } else if (user.weapon._id == item._id) {
            functions.replyMessage(message, "You already have this weapon equipped. (Somehow?!?)")
            return
        } else if (item.price == undefined) {
            functions.replyMessage(message, "This item is not for sale.")
            return
        } else if (item.owner != user._id) {
            functions.replyMessage(message, "You are not selling this item.")
            return
        }
        functions.sendMessage(message.channel, "You removed " + item.name + " (" + item._id + ") from the market.")
        delete item.price
        functions.setItem(item)
    })
}