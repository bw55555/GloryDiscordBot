let items = {
    "102": { "name": "Wisdom Rune", "cost": "10 Rune Shards" },
    "103": { "name": "Arcane Rune", "cost": "50 Rune Shards" },
    "104": { "name": "Force Rune", "cost": "25 Rune Shards" },
    "105": { "name": "Guard Rune", "cost": "25 Rune Shards" },
    "106": { "name": "Life Rune", "cost": "25 Rune Shards" }
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1]
    if (word2 == undefined) { word2 = "" }
    if (word2 == "store") {
        let text = "";
        let keys = Object.keys(items)
        for (let key of keys) {
            text += "ID " + key + " - " + items[key].name + " - (" + items[key].cost + ")\n"
        }
        return functions.sendMessage(message.channel, {
            "embed": {
                "title": "The Candy Store",
                "description": "Welcome to the candy store!\nUse `!candy buy [ID_of_Item] [number of items]` to buy items!\n",
                "color": 13498074,

                "fields": [
                    {
                        "name": "Item ID and Name",
                        "value": text,
                        "inline": true
                    },
                ]
            }
        });
    } else if (word2 == "BUY") {
        let itemid = words[2]
        let amount = parseInt(words[3])
        if (itemid == undefined || items[itemid] == undefined) { return functions.replyMessage(message, "Please select a valid item id!"); }
        if (words.length < 4) { amount = 1 }
        if (isNaN(amount) && amount > 0) { return functions.replyMessage(message, "Please select a positive number of items to buy!") }
        let type = items[itemid].type
        if (type == "ghostclass") {
            user.triangle = '<:ghostclass:771114679941595156> Ghost';
            user.triangleid = 2000;
            user.trianglemod = 1.6;
        } else {
            if (functions.JSONoperate(user, type, "get") == undefined) {
                return functions.replyMessage(message, "There was an error. Contact an admin through the support server. ");
            }
            functions.JSONoperate(user, type, "add", amount)
        }
        user.candy -= amount * items[itemid].cost
    } else {
        functions.replyMessage(message, "You have "+user.candy+" candy. ")
    }
}