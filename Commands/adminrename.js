var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) {
        functions.replyMessage(message, "You have no Nametags!");
        return;
    }
    if (words.length <= 3) {
        functions.replyMessage(message, "!nametag [weaponID] [Desired Weapon Name]");
        return;
    }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all[functions.getUser(weaponid)].then(ret => {
        let item = ret[0]
        if (item == false) {
            functions.replyMessage(message, "This item does not exist!")
            return
        }
        let name = message.content.slice(message.content.indexOf(words[2]));
        if (name.length > 35) {
            functions.replyMessage(message, "That weapon name is too long!");
            return;
        }
        functions.setProp("itemData", { _id: item._id }, { $set: {"name":name}})
        functions.replyMessage(message, "Weapon ID " + weaponid + " is now called " + name);
        return;
    })
}