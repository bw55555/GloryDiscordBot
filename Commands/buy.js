var functions = require("../Utils/functions.js")
module.exports = function (message) {

    let id = message.author.id;
    if (userData[id].status == 0) { return; }
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (words.length != 2) {
        functions.replyMessage(message, "`buy [weaponid]`")
        return
    }

    if (isNaN(words[1])) {
        functions.replyMessage(message, "Choose a real weapon id.")
        return;
    }
    let weaponid = words[1]
    if (itemData[weaponid] == undefined) {
        if (userData[id].inventory[weaponid] == weaponid) {
            delete userData[id].inventory[weaponid]
        }
        functions.replyMessage(message, "This weapon does not exist.");
        return
    } else if (userData[id].weapon == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped. (Somehow?!?)")
        return
    } else if (itemData[weaponid].price == undefined) {
        functions.replyMessage(message, "This item is not for sale.")
        return
    } else if (userData[id].money < itemData[weaponid].price) {
        functions.replyMessage(message, "You don't have enough money to buy this item.")
        return
    }

    userData[id].money -= parseInt(itemData[weaponid].price)
    userData[itemData[weaponid].owner].money += parseInt(itemData[weaponid].price) //transfer of money
    let previousOwner = itemData[weaponid].owner
    itemData[weaponid].owner = id //weapon ownerid transfer
    userData[id].inventory[weaponid] = weaponid //weapon added to inventory
    functions.sendMessage(message.channel, "You bought " + weaponid + " for $" + itemData[weaponid].price)
    functions.dmUser(previousOwner, "<@" + id + "> bought " + itemData[weaponid].name + " (" + weaponid + ") for $" + itemData[weaponid].price)
    delete itemData[weaponid].price
}