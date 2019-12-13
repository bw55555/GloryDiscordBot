var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {

    let id = message.author.id;
    if (user.status == 0) { return; }
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
        if (user.inventory[weaponid] == weaponid) {
            delete user.inventory[weaponid]
        }
        functions.replyMessage(message, "This weapon does not exist.");
        return
    } else if (user.weapon == weaponid) {
        functions.replyMessage(message, "You already have this weapon equipped. (Somehow?!?)")
        return
    } else if (itemData[weaponid].price == undefined) {
        functions.replyMessage(message, "This item is not for sale.")
        return
    } else if (user.money < itemData[weaponid].price) {
        functions.replyMessage(message, "You don't have enough money to buy this item.")
        return
    }
    user.money -= parseInt(itemData[weaponid].price)
    return Promise.all([functions.getUser(itemData[weaponid].owner)]).then(ret => {
        let previousOwner = ret[0];
        previousOwner.money += parseInt(itemData[weaponid].price) //transfer of money
        itemData[weaponid].owner = user._id //weapon ownerid transfer
        user.inventory[weaponid] = weaponid //weapon added to inventory
        functions.setUser(previousOwner)
        functions.sendMessage(message.channel, "You bought " + weaponid + " for $" + itemData[weaponid].price)
        functions.dmUser(previousOwner._id, "<@" + user._id + "> bought " + itemData[weaponid].name + " (" + weaponid + ") for $" + itemData[weaponid].price)
        delete itemData[weaponid].price
    })
}