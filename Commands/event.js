let NUM_QUESTS = 25;
let refreshtime = 15 * 60 * 1000
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devData.questevent == undefined || ts < devData.questevent.start || ts > devData.questevent.end + 2 * 24 * 60 * 60 * 1000) { return functions.replyMessage(message, "The quest board is not currently open!") }
    let word2 = words[1]
    if (word2 == undefined) { word2 = "quests" }
    if (word2 == "help") {
        return functions.replyMessage(message, ":gift: **Quest Event** :gift: \nThe residents of Glory city need your help, and have many presents to give to willing adventurers. \nThey have set up a quest board with requests, and will be thankful if you helped! \n`!event` - Shows you what quests are available to earn presents. Quests will automatically refresh every half an hour or when there are no quests left. \n`!event accept quest#` - Accepts a quest. You can accept at most 3 quests at any time \n`!quest` - Shows what quests you have\n`!quest donate quest# currency amount` - donates the amount of specified currency to the selected `quest#`. Both `currency` and `amount` can be replaced with auto to automatically select the currency and/or amount\n`!cq quest#` - Claims the reward from the selected quest once the quest is complete\n`!present` - See how many presents you have\n`!present open amount` - Opens a certain amount of presents")
    }
    if (ts > devData.questevent.refresh) {
        devData.questevent.refresh = ts - (ts % refreshtime) + refreshtime;
        refreshQuests()
        functions.setObject("devData", devData)
        functions.replyMessage(message, "Quests refreshed!")
    }
    if (word2 == "quests") {
        functions.findObjects("eventQuests", {}).then(quests => {
            if (quests.length == 0) {
                
                functions.replyMessage(message, "Quests refreshed!")
            }
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
        devData.questevent.refresh = ts - (ts % refreshtime) + refreshtime;
        if (admins.indexOf(id) == -1) {return functions.replyMessage(message, "You do not have permission to do this!")}
        refreshQuests()
        functions.setObject("devData", devData)
        functions.replyMessage(message, "Missions refreshed!")
    }
    if (word2 == "accept") {
        let qnum = parseInt(words[2]) - 1
        if (isNaN(qnum) || qnum < 0 || qnum >= NUM_QUESTS) { return functions.replyMessage(message, "This quest does not exist!") }
        if (user.quests.filter(x => x.event == true).length >= 3) { return functions.replyMessage(message, "You have already accepted 3 quests!") }
        return functions.getObject("eventQuests", qnum).then(q => { user.quests.push(q); refreshQuest(q._id); functions.replyMessage(message, "Accepted a quest: " +q.name) }) 
    }
}
let monsters = Object.keys(Assets.locationraidData).map(x => Assets.locationraidData[x]).reduce((t, c) => t.concat(c.map(x => x.name)), [])
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
        "min": 25,
        "incr": 1,
        "maxincr": 50
    },
}
function refreshQuests() {
    let tasks = []
    for (let i = 0; i < NUM_QUESTS; i++) {
        let q = refreshQuest(i, true)
        tasks.push({
            replaceOne:
            {
                "filter": { _id: q._id },
                "replacement": q,
                "upsert": true
            }
        })
        
    }
    functions.bulkWrite("eventQuests",tasks)
    
}
function refreshQuest(id, massrefresh) {
    let currency = functions.getRandomArrayElement(Object.keys(currencies))
    let amt = Math.floor(Math.random() * (currencies[currency].maxincr + 1)) * currencies[currency].incr + currencies[currency].min
    let rwd = amt / (2 * currencies[currency].min);
    let conditions = []
    conditions.push(functions.addQuestCondition("donate", ">=", "Donate " + amt + " " + currencies[currency].name, amt, { "currency": { "value": currency, "operator": "=" } }, "a"))
    let mloc = functions.getRandomArrayElement([0, 1, 2, 3, 4, 5, 6, 7], [0.05, 0.1, 0.15, 0.2, 0.2, 0.15, 0.1, 0.05])
    let mrar = functions.getRandomArrayElement([0, 1, 2], [0.45, 0.35, 0.2])
    let mname = monsters[mloc * 3 + mrar]
    //let mamt = Math.max(0,Math.floor(((9 - (mrar + 1) * (mrar + 1)) * 2 - mloc) * 3 / (mrar+1) * Math.random())) + Math.floor((mloc + 1) / 4)+1 
    let mamt = Math.floor(((8 - mloc) / Math.pow(2, mrar) * (3 - mrar)) * Math.random())
    rwd += Math.ceil(mloc / 2) / 2 + mrar / 2
    if (mamt > 10) {rwd += 1}
    mamt += 1 + (2 - mrar) * (2 - mrar)
    mamt = Math.max(1, mamt)
    rwd = Math.max(Math.floor(rwd),1)
    
    conditions.push(functions.addQuestCondition("raidAttack", ">=", "Kill " + mamt + " " + mname, mamt, { "raid.currenthealth": { "value": 0, "operator": "<=" }, "raid.name": { "value": mname, "operator": "=" } }, "a"))
    let exq = functions.makeQuest(undefined, "Help the City!", undefined, conditions, { "present": rwd })
    exq.event = true;
    exq._id = id
    delete exq.mqid
    delete exq.flavortext
    if (massrefresh != true) {functions.setObject("eventQuests", exq)}
    return exq
}