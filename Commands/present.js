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
    if (devData.halloweenevent == undefined || ts < devData.halloweenevent.start || ts > devData.halloweenevent.end + 2 * 24 * 60 * 60 * 1000) { return functions.replyMessage(message, "The present shop is not open yet!") }
    let word2 = words[1]
    if (word2 == undefined) { word2 = "" }
    if (word2 == "open") {
        let amount = parseInt(words[2])
        if (words[2] == "all") {amount = user.present}
        if (words.length < 3) { amount = 1 }
        if (isNaN(amount) || amount < 0) { return functions.replyMessage(message, "Please select a positive number of items to buy!") }
        if (amount > user.present) { return functions.replyMessage(message, "You don't have enough present!") }
        let presentitems = {
            "xp": {
                "chance": 0.50
            }
        }
        let xpforasc = 0;
        for (let i = 1; i <= 99; i++) {
            xpforasc += functions.checkxp({ "ascension": user.ascension, "level": i })
        }
        let xpgain = 0;
        for (let i = 0; i < amount; i++) {
            xpgain += Math.ceil(xpforasc * (0.0003 * Math.random() - 0.0001))
        }
        user.present -= amount
        user.xp += xpgain
        functions.replyMessage(message, "You have eaten " + amount + " present and gained " + xpgain + " xp. ")
    } else {
        functions.replyMessage(message, "You have " + user.present + " presents. ")
    }
}