let items = {
    "1": { "name": "Ghost Class", "cost": 300, "type": "ghostclass" },
    "2": { "name": "Legendary Item", "cost": 2000, "type": "item", "amount": 1 },
    "3": { "name": "Wisdom Rune", "cost": 1000, "type": "runes.1", "amount": 1 },
    "4": { "name": "Rune Shards(10)", "cost": 1, "type": "runes.0", "amount": 10 },
    "5": { "name": "Reroll", "cost": 100, "type": "consum.reroll", "amount": 1 },
    "6": { "name": "Crystals(10)", "cost": 1, "amount": 10, "type": "crystals" },
    "7": { "name": "Boxes(10)", "cost": 1, "type": "consum.box", "amount": 10 },
    "8": { "name": "Honor(3)", "cost": 1, "amount": 3, "type": "honor" },
    "9": { "name": "Money(500k)", "cost": 1, "type": "money", "amount": 500000 }
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (devData.halloweenevent == undefined || ts < devData.halloweenevent.start || ts > devData.halloweenevent.end + 2 * 24 * 60 * 60 * 1000) { return functions.replyMessage(message, "The present shop is not open yet!") }
    let word2 = words[1]
    if (word2 == undefined) { word2 = "" }
    if (word2 == "open") {
        let amount = parseInt(words[2])
        if (words[2] == "all") {amount = user.present}
        if (words.length < 3) { amount = 1 }
        if (isNaN(amount) || amount <= 0) { return functions.replyMessage(message, "Please select a positive number of items to buy!") }
        if (amount > user.present) { return functions.replyMessage(message, "You don't have enough present!") }
        let xpamt = functions.checkxp({ "ascension": user.ascension, "level": 1 }, 99)
        user.present -= amount;
        let totalpresentitems = {}
        let presentitems;
        for (let i = 0; i < amount; i++) {
            presentitems = {
                "xp": {
                    "chance": 50,
                    "amount": Math.floor((0.5 + Math.random()) * xpamt * 0.0001),
                    "item": "xp"
                },
                "honor": {
                    "chance": 12,
                    "amount": functions.randint(5, 10),
                    "item": "honor"
                },
                "box": {
                    "chance": 20,
                    "amount": functions.randint(5, 10),
                    "item": "consum.box"
                },
                "SR weapon": {
                    "chance": 10,
                    "amount": 1,
                    "item": "bag.g0_6_6"
                },
                "Epic weapon": {
                    "chance": 3,
                    "amount": 1,
                    "item": "bag.g0_7_7"
                },
                "Legendary weapon": {
                    "chance": 1,
                    "amount": 1,
                    "item": "bag.g0_7_7"
                },
                "Godly weapon": {
                    "chance": 0.079885,
                    "amount": 1,
                    "item": "bag.g0_8_8"
                },
                "reroll": {
                    "chance": 2,
                    "amount": 1,
                    "item": "consum.reroll"
                },
                "Familiar Invocation Contract": {
                    "chance": 1,
                    "amount": 1,
                    "item": "bag.f4_0_0"
                },
                "Familiar Selection Contract (Common)": {
                    "chance": 0.15,
                    "amount": 1,
                    "item": "bag.f5_0_1"
                },
                "Familiar Selection Contract (Rare)": {
                    "chance": 0.1,
                    "amount": 1,
                    "item": "bag.f5_0_2"
                },
                "Familiar Selection Contract (Epic)": {
                    "chance": 0.02,
                    "amount": 1,
                    "item": "bag.f5_0_3"
                },
                "Familiar Selection Contract (Legendary)": {
                    "chance": 0.001,
                    "amount": 1,
                    "item": "bag.f5_0_4"
                },
                "Familiar Selection Contract (Divine)": {
                    "chance": 0.000005,
                    "amount": 1,
                    "item": "bag.f5_0_5"
                },
                "Familiar Invocation Contract (Divine)": {
                    "chance": 0.00001,
                    "amount": 1,
                    "item": "bag.f4_0_5"
                },
            }
            let presentlist = Object.keys(presentitems)
            let chosenpresent = functions.getRandomArrayElement(presentlist, presentlist.map(x => presentitems[x].chance))
            if (totalpresentitems[chosenpresent] == undefined) { totalpresentitems[chosenpresent] = 0 }
            totalpresentitems[chosenpresent] += amount
            functions.JSONoperate(user, presentitems[chosenpresent].item, "add", amount)
        }
        let presenttext = ""
        functions.replyMessage(message, "You have opened " + amount + " presents and gained:\n" + Object.keys(totalpresentitems).map(item => totalpresentitems[item] + " " + item).join("\n"))
    } else {
        functions.replyMessage(message, "You have " + user.present + " presents. ")
    }
}