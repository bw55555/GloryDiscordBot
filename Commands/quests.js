
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.quests.length == 0) { return functions.replyMessage(message, "You have no quests!") }
    let fields = []
    for (var i = 0; i < user.quests.length; i++) {
        var text = "**Description:**\n"
        for (var j = 0; j < user.quests[i].conditions.length; j++) {
            text += user.quests[i].conditions[j].description + " (" + user.quests[i].conditions[j].current + "/" + user.quests[i].conditions[j].total + ")\n"
        }
        text += "** Reward:** "+JSON.stringify(user.quests[i].reward)
        fields.push({
            name: (i+1)+": "+user.quests[i].name,
            value: text,
            inline: false,
        })
    }
    functions.sendMessage(message.channel,{
        "embed": {
            "color": 0xffffff,
            "title": user.username + "'s Quests",
            "fields": fields,
        }
    })
}