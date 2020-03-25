
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.quests.length == 0) { return functions.replyMessage(message, "You have no quests!") }
    let fields = []
    for (var i = 0; i < user.quests.length; i++) {
        fields.push({
            name: user.quests[i].name,
            value: "**Description:** " + user.quests[i].description+" ("+user.quests[i].current+"/"+user.quests[i].total+")\n**Reward:** "+JSON.stringify(user.quests[i].reward),
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