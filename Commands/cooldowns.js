
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //return functions.replyMessage(message,"This will be here later...")
    let text = ""
    let cooldowns = Object.keys(user.cooldowns)
    for (var i = 0; i < cooldowns.length; i++) {
        //if (functions.calcTime(user.cooldowns[cooldowns[i]], ts) < 0) { continue }
        text += "**" + cooldowns[i] + "**: " + functions.displayTime(user.cooldowns[cooldowns[i]], Math.min(ts, user.cooldowns[cooldowns[i]]) ) + "\n"
    }
    //text+="```"
    if (text == "") {
        text = "You have no ongoing cooldowns."
    }
    functions.sendMessage(message.channel, {
        "embed": {
            //"title": user.username + "'s Cooldowns",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": 13498074,

            "fields": [
                {
                    "name": user.username + "'s Cooldowns",
                    "value": text
                    //"inline": true
                }
            ]
        }
    })
}
