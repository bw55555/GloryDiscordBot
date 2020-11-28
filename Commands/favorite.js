
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) { return functions.replyMessage(message, "Choose an item!") }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    if (user.inventory[weaponid] != weaponid) { return functions.replyMessage(message, "You don't own this item!") }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item.favorite == true) {
            item.favorite = false;
            functions.replyMessage(message, "You have successfully unfavorited the weapon with id " + weaponid)
        } else {
            item.favorite = true;
            functions.replyMessage(message, "You have successfully favorited the weapon with id " + weaponid)
        }
        if (item.equip == true) { user.weapon = item}
        functions.setItem(item)
    })
}