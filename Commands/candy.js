let items = {
    "1": { "name": "Ghost Class", "cost": 300, "type": "ghostclass" },
    "2": { "name": "Legendary Item", "cost": 2000, "type": "item", "amount": 1 },
    "3": { "name": "Wisdom Rune", "cost": 1000, "type": "runes.1", "amount": 1 },
    "4": { "name": "Rune Shards(10)", "cost": 1, "type": "runes.0", "amount": 10 },
    "5": { "name": "Reroll", "cost": 100, "type": "consum.reroll", "amount": 1 },
    "6": { "name": "Crystals(10)", "cost": 1, "amount": 10, "type": "crystals" },
    "7": { "name": "Boxes(10)", "cost": 1, "type": "consum.box", "amount": 10 },
    "8": { "name": "Honor(3)", "cost": 1, "amount": 3, "type": "honor" },
    "9": { "name": "Money(500k)", "cost": 1, "type": "money", "amount": 500000 }
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
    } else if (word2 == "buy") {
        let itemid = words[2]
        let amount = parseInt(words[3])
        if (itemid == undefined || items[itemid] == undefined) { return functions.replyMessage(message, "Please select a valid item id!"); }
        if (words.length < 4) { amount = 1 }
        if (isNaN(amount) && amount > 0) { return functions.replyMessage(message, "Please select a positive number of items to buy!") }
        let type = items[itemid].type
        if (type == "ghostclass") {
            amount = 1;
            if (user.triangleid == 2000) { return functions.replyMessage(message, "You are already a ghost!")}
            user.triangle = '<:ghostclass:771114679941595156> Ghost';
            user.triangleid = 2000;
            user.trianglemod = 1.6;
            user.boughtghost = true;
        } else if (type == "item") {
            amount = 1;
            functions.craftItem(message, user, 7, 7)
        } else if (type == "crystals") {
            if (user.guild == "None") { return functions.replyMessage(message, "Since you are currently not in a guild, you cannot buy this. ")}
            functions.getObject("guildData", user.guild).then(guild => { guild.crystals += amount * items[itemid].amount; functions.setObject("guildData", guild) });
        } else {
            if (functions.JSONoperate(user, type, "get") == undefined) {
                return functions.replyMessage(message, "There was an error. Contact an admin through the support server. ");
            }
            functions.JSONoperate(user, type, "add", amount*items[itemid].amount)
        }
        user.candy -= amount * items[itemid].cost
        functions.replyMessage(message, "You have bought "+amount+" "+items[itemid].name+" for "+(items[itemid].cost * amount)+" candy. ")
    } else {
        functions.replyMessage(message, "You have "+user.candy+" candy. ")
    }
}