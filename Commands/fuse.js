let items = {
    "102": { "name": "Energy Rune", "cost": "10 Rune Shards" },
    "103":{ "name": "Arcane Rune", "cost": "50 Rune Shards" },
    "104":{ "name": "Force Rune", "cost": "25 Rune Shards" },
    "105":{ "name": "Guard Rune", "cost": "25 Rune Shards" },
    "106":{ "name": "Life Rune", "cost": "25 Rune Shards" }
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    let item = words[1];
    if (item == "list") {
        let text = "";
        let keys = Object.keys(items)
        for (let key of keys) {
            text += "ID " + key + " - " + items[key].name + " - (" + items[key].cost+")\n"
        }
        return functions.sendMessage(message.channel, {
            "embed": {
                "title": "The Smith",
                "description": "Welcome to the fusion reactor!\nUse `!fuse [ID_of_Item] [number of items]` to select the item you want to fuse!\n",
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
    }
    if (items[item] != undefined) {
        let itemid = parseInt(item)
        let num = parseInt(words[2])
        if (words.length < 3) { num = 1 }
        if (isNaN(num) || num > 0) { return functions.replyMessage(message, "Please select a positive number of items to fuse!") }
        if (102 <= itemid && itemid <= 106) {
            let shardcosts = [10, 50, 25, 25, 25]
            if (user.runes[0] < shardcosts[itemid - 102] * num) { return functions.replyMessage(message, "You do not have enough rune shards!") }
            user.runes[0] -= shardcosts[itemid - 102] * num
            user.runes[itemid - 100] += num
            functions.replyMessage(message, "You successfully fused " + num + " " + items[item].name + "!")
        }
        functions.completeQuest(user, "fuse", {"itemid": itemid}, num)
    } else {
        return functions.replyMessage(message, "Please select a proper item or use `!fuse list` to see them all!")
    }
    
}