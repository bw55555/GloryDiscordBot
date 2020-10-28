
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let stats = functions.calcEnchants(user);
    let text = ""
    for (var enchant in stats) {
        text += "**" + enchant + "**: " + stats[enchant] + "\n"
    }
    //text+="```"
    functions.sendMessage(message.channel, {
        "embed": {
            "title": user.username + "'s Stats",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": 13498074,

            "fields": [
                {
                    "name": "Battle Stats",
                    "value": text
                    //"inline": true
                }
            ]
        }
    })
}