
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let itemtext = ""
    for (var item in user.consum) {
        if (user.consum[item] > 0) {
            itemtext += "**" + item + ":** " + user.consum[item] + "\n";
        }
    }

    if (itemtext == "") {
        itemtext += "You have no consumable items!"
    }

    functions.sendMessage(message.channel, {
        "embed": {
            "title": user.username + "'s Consumables",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": 13498074,

            "fields": [
                {
                    "name": "Item List",
                    "value": itemtext
                    //"inline": true
                }
            ]
        }
    })
}