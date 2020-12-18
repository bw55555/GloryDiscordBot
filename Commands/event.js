
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1]
    if (word2 == undefined) { word2 = "quests" }
    if (word2 == "quests") {
        functions.findObjects("Xmasquests", {}).then(quests => {
            functions.createPages(message, user, quests, "Event Quests", x => x.name, x => {
                let text = "";
                if (user.quests[i].flavortext != undefined && user.quests[i].flavortext != "") { text += "**Description:**\n" + user.quests[i].flavortext + "\n" }
                text += "**Requirements:**\n"
                for (var j = 0; j < user.quests[i].conditions.length; j++) {
                    text += user.quests[i].conditions[j].description + " (" + user.quests[i].conditions[j].current + "/" + user.quests[i].conditions[j].total + ")\n"
                }
                let rewardtext = Object.keys(user.quests[i].reward).map(x => user.quests[i].reward[x] + " " + x.substring(x.lastIndexOf(".") + 1)).join(", ")
                if (rewardtext == "") { rewardtext = "No Rewards." }
                text += "** Reward:** " + rewardtext
                return text
            }, {"includeNumbering": true})
        })
    }
}