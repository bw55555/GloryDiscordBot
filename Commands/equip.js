
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Choose an id! (or `none` to unequip your weapon) ex. !equip 123456")
        return
    }
    if (words[1].toLowerCase() == "none") {
        if (user.weapon == false) { return functions.replyMessage(message, "You have not equipped a weapon. ")}
        if (user.weapon.modifiers.maxhp != undefined) { user.health -= user.weapon.modifiers.maxhp }
        functions.setProp("itemData", { "_id": user.weapon._id }, { $set: { "equip": false } })
        user.weapon = false
        return functions.replyMessage(message, "You have successfully unequipped your weapon!")
    }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item == false) { return functions.replyMessage(message, "This weapon does not exist!"); }
        if (user.weapon._id == item._id) {
            functions.replyMessage(message, "You already have this weapon equipped!")
            return
        }
        if (item.owner != user._id) {
            return functions.replyMessage(message, "You do not own this weapon!")
        }
        if (user.level + 10 * user.ascension < item.rarity * 10) {
            functions.replyMessage(message, "You must be at least level " + (item.rarity * 10-10*user.ascension) + " to equip this item!")
            return
        }
        if (user.weapon != false) {
            if (user.weapon.modifiers.maxhp != undefined) { user.health -= user.weapon.modifiers.maxhp }
            functions.setProp("itemData", { "_id": user.weapon._id }, { $set: { "equip": false } })
            user.weapon = false
        }
        user.weapon = item
        if (user.weapon.modifiers.maxhp != undefined) { user.health += user.weapon.modifiers.maxhp }
        functions.completeQuest(user, "equip", {"item": item}, 1)
        functions.setProp("itemData", { "_id": item._id }, { $set: {"equip":true}})
        functions.sendMessage(message.channel, "You successfully equipped the weapon with id " + item._id)
    })
}

