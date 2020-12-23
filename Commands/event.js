let NUM_QUESTS = 10;
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devData.christmasevent == undefined || ts < devData.christmasevent.start || ts > devData.christmasevent.end + 2 * 24 * 60 * 60 * 1000) { return functions.replyMessage(message, "The quest board is not currently open!") }
    let word2 = words[1]
    if (word2 == undefined) { word2 = "quests" }
    if (ts > devData.christmasevent.refresh) {
        devData.christmasevent.refresh += 30 * 60 * 1000;
        for (let i = 0; i < NUM_QUESTS; i++) {
            refreshQuest(i)
        }
        functions.replyMessage(message, "Quests refreshed!")
    }
    if (word2 == "quests") {
        functions.findObjects("Xmasquests", {}).then(quests => {
            quests.sort((a,b) => a._id - b._id)
            functions.createPages(message, user, quests, "Event Quests", x => x.name, x => {
                let text = "";
                if (x.flavortext != undefined && x.flavortext != "") { text += "**Description:**\n" + x.flavortext + "\n" }
                text += "**Requirements:**\n"
                for (var j = 0; j < x.conditions.length; j++) {
                    text += x.conditions[j].description + " (" + x.conditions[j].current + "/" + x.conditions[j].total + ")\n"
                }
                let rewardtext = Object.keys(x.reward).map(r => x.reward[r] + " " + r.substring(r.lastIndexOf(".") + 1)).join(", ")
                if (rewardtext == "") { rewardtext = "No Rewards." }
                text += "** Reward:** " + rewardtext
                return text
            }, {"includeNumbering": true})
        })
    }
    if (word2 == "refresh") {
        if (admins.indexOf(id) == -1) {return functions.replyMessage(message, "You do not have permission to do this!")}
        for (let i = 0; i < NUM_QUESTS; i++) {
            refreshQuest(i)
        }
        functions.replyMessage(message, "Missions refreshed!")
    }
    if (word2 == "accept") {
        let qnum = parseInt(words[2]) - 1
        if (isNaN(qnum) || qnum < 0 || qnum >= NUM_QUESTS) { return functions.replyMessage(message, "This quest does not exist!") }
        if (user.quests.filter(x => x.event == true).length >= 3) { return functions.replyMessage(message, "You have already accepted 3 quests!") }
        return functions.getObject("Xmasquests", qnum).then(q => { user.quests.push(q); refreshQuest(q._id); functions.replyMessage(message, "Accepted a quest: " +q.name) }) 
    }
}
function refreshQuest(id) {
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
    let monsters = Object.keys(Assets.locationraidData).map(x => Assets.locationraidData[x]).reduce((t, c) => t.concat(c.map(x => x.name)), [])
    let currency = functions.getRandomArrayElement(Object.keys(currencies))
    let amt = Math.floor(Math.random() * (currencies[currency].maxincr + 1)) * currencies[currency].incr + currencies[currency].min
    let rwd = 1;
    if (amt >= currencies[currency].min * 2) {rwd += 1}
    let conditions = []
    conditions.push(functions.addQuestCondition("donate", ">=", "Donate " + amt + " " + currencies[currency].name, amt, { "currency": { "value": currency, "operator": "=" } }, "a"))
    let mkey = functions.getRandomArrayElement([0, 1, 2], [0.4, 0.4, 0.2]) + 3 * functions.getRandomArrayElement([0, 1, 2, 3, 4, 5, 6, 7], [0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05])
    rwd += Math.floor(mkey/9)
    let mname = monsters[mkey]
    let mamt = Math.floor((1 + Math.random()) * 3 * ((mkey + 1) % 3) + 1)
    conditions.push(functions.addQuestCondition("raidAttack", ">=", "Kill " + mamt + " " + mname, mamt, { "raid.currenthealth": { "value": 0, "operator": "<=" }, "raid.name": { "value": mname, "operator": "=" } }, "a"))
    let exq = functions.makeQuest(undefined, "Help us Decorate!", undefined, conditions, { "present": rwd })
    exq.event = true;
    exq._id = id
    delete exq.mqid
    delete exq.flavortext
    functions.setObject("Xmasquests", exq)
}