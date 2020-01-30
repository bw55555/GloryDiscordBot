
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
    if (user.inventory[weaponid] != weaponid) {
        functions.replyMessage(message, "You do not own this item!")
        return
    }
    if (user.weapon._id == weaponid) {functions.replyMessage(message, "You have already equipped this item!")}
    let name = message.content.slice(message.content.indexOf(words[2]));
    if (name.length > 35) {
        functions.replyMessage(message, "That weapon name is too long! (35 characters max)");
        return;
    }
    functions.replyMessage(message, "Weapon ID " + weaponid + " is now called " + name);
    functions.setProp("itemData", { "_id": weaponid }, { $set: { "name": name } })
    user.consum.nametag -= 1;
}