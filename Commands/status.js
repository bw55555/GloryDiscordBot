
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //return functions.replyMessage(message,"This will be here later...")
    let text = ""
    for (let effect in user.statusEffects) {
        //if (functions.calcTime(user.cooldowns[cooldowns[i]], ts) < 0) { continue }
        if (user.statusEffects[effect] > 0) {
            text += "**" + effect + "**: " + user.statusEffects[effect] + "\n"
        }
    }
    //text+="```"
    if (text == "") {
        text = "You have no active status effects."
    }
    functions.sendMessage(message.channel, {
        "embed": {
            "title": user.username + "'s Status Effects",
            //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
            "color": 13498074,

            "fields": [
                {
                    "name": "Status Effects",
                    "value": text
                    //"inline": true
                }
            ]
        }
    })
}
