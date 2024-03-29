
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.consum.nametag == undefined || user.consum.nametag == 0) {
        functions.replyMessage(message, "You have no Nametags!");
        return;
    }
    if (words.length < 3) {
        functions.replyMessage(message, "!nametag [weaponID] [Desired Weapon Name]");
        return;
    }
    
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    
    
    return functions.getItem(weaponid).then(item => {
        if (user.weapon._id == weaponid) { functions.replyMessage(message, "You have already equipped this item!") }
        if (item.owner != user._id) {
            functions.replyMessage(message, "You do not own this item!")
            return
        }
        let name = message.content.slice(message.content.indexOf(words[2]));
        if (name.length > 35) {
            functions.replyMessage(message, "That weapon name is too long! (35 characters max)");
            return;
        }
        functions.replyMessage(message, "Weapon ID " + weaponid + " is now called " + name);
        functions.setProp("itemData", { "_id": weaponid }, { $set: { "name": name } })
        if (user.weapon.id == weaponid) { user.weapon.name = name }
        user.consum.nametag -= 1;
    })
}