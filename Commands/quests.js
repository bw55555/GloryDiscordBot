
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.quests.length == 0) { return functions.replyMessage(message, "You have no quests!") }
    let fields = []
    let pages = [];
    let page = {};
    let numPerPage = 5;
    for (var i = 0; i < user.quests.length; i++) {
        let text = "";
        if (user.quests[i].flavortext != undefined && user.quests[i].flavortext != "") { text+="**Description:**\n" + user.quests[i].flavortext+"\n"}
        text += "**Requirements:**\n"
        for (var j = 0; j < user.quests[i].conditions.length; j++) {
            text += user.quests[i].conditions[j].description + " (" + user.quests[i].conditions[j].current + "/" + user.quests[i].conditions[j].total + ")\n"
        }
        let rewardtext = Object.keys(user.quests[i].reward).map(x => user.quests[i].reward[x] + " " + x.substring(x.lastIndexOf(".")+1)).join(", ")
        if (rewardtext == "") { rewardtext = "No Rewards."}
        text += "** Reward:** " + rewardtext
        fields.push({
            name: (i+1)+": "+user.quests[i].name,
            value: text,
            inline: false,
        })
        if ((i % numPerPage) == (numPerPage - 1)) {
            if (fields.length > 0) {
                page = {
                    "embed": {
                        //"title": "Global Wealth",
                        "color": 0xffffff,
                        "title": user.username + "'s Quests",
                        "fields": fields,
                        "footer": {
                            "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(user.quests.length / numPerPage))
                        },
                    }
                }
                pages.push(page)
                fields = []
            }
        }
    }
    if (fields.length > 0) {
        page = {
            "embed": {
                //"title": "Global Wealth",
                "color": 0xffffff,
                "title": user.username + "'s Quests",
                "fields": fields,
                "footer": {
                    "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(user.quests.length / numPerPage))
                },
            }
        }
        pages.push(page)
        fields = []
    }
    new functions.Paginator(message.channel, message.author, pages)
}