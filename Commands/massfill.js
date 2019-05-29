var functions = require("../Utils/functions.js")
module.exports = function (message) {
	return;
    let id = message.author.id;
    if (userData[id].status == 0) { return; }
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    let i = 0
    for ( i; i < 100; i++) {

        let rarity = Math.floor(Math.random() * 5)
        let price = Math.floor(Math.random() * 100000)
        if (isNaN(rarity) || rarity < 0 || rarity > 9) { rarity = undefined }
        let itemid = functions.generateRandomItem(id, rarity)
        //functions.sendMessage(message.channel, "<@" + id + "> has been given an item with id " + itemid + " and of rarity " + itemData[itemid].rarity)

        itemData[itemid].price = price
        //functions.sendMessage(message.channel, "You put " + itemData[itemid].name + " (" + itemid + ") on the market for " + price)
        delete userData[id].inventory[itemid]
    }
}