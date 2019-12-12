var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (userData[id].consum.nametag == undefined || userData[id].consum.nametag == 0) {
        functions.replyMessage(message, "You have no Nametags!");
        return;
    }
    if (words.length <= 2) {
        functions.replyMessage(message, "!nametag [itemID] [Desired Weapon Name]");
        return;
    }
    
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) {
        functions.sendMessage(message.channel, "The Weapon ID must be an integer");
        return;
    }
    if (itemData[weaponid] == 0) {
        functions.replyMessage(message, "This item does not exist!")
        return
    }
    if (userData[id].inventory[weaponid+""] != weaponid) {
        functions.replyMessage(message, "You do not own this item!")
        return
    }
    let name = message.content.slice(message.content.indexOf(words[2]));
    if (name.length > 35) {
        functions.replyMessage(message, "That weapon name is too long!");
        return;
    }
    itemData[weaponid].name = name;
    functions.replyMessage(message, "Weapon ID " + weaponid + " is now called " + name);
    functions.consumGive(id, "nametag", -1);
}