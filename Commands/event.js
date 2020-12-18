
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
                if (x.flavortext != undefined && x.flavortext != "") { text += "**Description:**\n" + x.flavortext + "\n" }
                text += "**Requirements:**\n"
                for (var j = 0; j < x.conditions.length; j++) {
                    text += x.conditions[j].description + " (" + x.conditions[j].current + "/" + x.conditions[j].total + ")\n"
                }
                let rewardtext = Object.keys(x.reward).map(x => x.reward[x] + " " + x.substring(x.lastIndexOf(".") + 1)).join(", ")
                if (rewardtext == "") { rewardtext = "No Rewards." }
                text += "** Reward:** " + rewardtext
                return text
            }, {"includeNumbering": true})
        })
    }
    if (word2 == "refresh") {
        let currencies = {
            "money": {
                "name": "money",
                "min": 100000,
                "incr": 1000,
                "maxincr": 200
            }, 
            "materials": {
                "name": "materials",
                "min": 1000,
                "incr": 10,
                "maxincr": 200
            }, 
            "runes.0": {
                "name": "rune shards",
                "min": 100,
                "incr": 1,
                "maxincr": 200
            }, 
        }
        for (let i = 0; i <= 9; i++) {
            let currency = functions.getRandomByChances(Object.keys(currencies))
            let amt = Math.floor(Math.random() * (currencies[currency].maxincr+1)) * currencies[currency].incr + currencies[currency].min
            let exq = functions.makeQuest(undefined, "Random Name", [functions.addQuestCondition("donate", "=>", "Donate " + amt + " " + currency, amt, {"currency": currency}, "a")])
            exq._id = i
            functions.setObject("Xmasquests", exq)
        }
        functions.replyMessage(message, "Missions refreshed!")
    }
}