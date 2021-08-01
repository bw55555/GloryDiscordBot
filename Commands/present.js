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
        if (isNaN(amount) || amount <= 0) { return functions.replyMessage(message, "Please select a positive number of presents to open!") }
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
                "SR weapon box": {
                    "chance": 10,
                    "amount": 1,
                    "item": "bag.g0_6_6"
                },
                "Epic weapon box": {
                    "chance": 4,
                    "amount": 1,
                    "item": "bag.g0_7_7"
                },
                "Legendary weapon box": {
                    "chance": 1.5,
                    "amount": 1,
                    "item": "bag.g0_8_8"
                },
                "Godly weapon box": {
                    "chance": 0.09,//0.098985,
                    "amount": 1,
                    "item": "bag.g0_9_9"
                },
                "Reroll": {
                    "chance": 2.4,
                    "amount": 1,
                    "item": "consum.reroll"
                },
                "Skill point": {
                    "chance": 0.01,
                    "amount": 1,
                    "item": "consum.sp"
                }
                /*
                "Familiar Invocation Contract": {
                    "chance": 1.5,
                    "amount": 1,
                    "item": "bag.f4_0_0"
                },
                "Familiar Selection Contract (Common)": {
                    "chance": 0.3,
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
                }
                */
            }
            let presentlist = Object.keys(presentitems)
            let chosenpresent = functions.getRandomArrayElement(presentlist, presentlist.map(x => presentitems[x].chance))
            if (totalpresentitems[chosenpresent] == undefined) { totalpresentitems[chosenpresent] = 0 }
            totalpresentitems[chosenpresent] += presentitems[chosenpresent].amount
            functions.JSONoperate(user, presentitems[chosenpresent].item, "add", presentitems[chosenpresent].amount, false)
        }
        let presenttext = ""
        functions.replyMessage(message, "You have opened " + amount + " presents and gained:\n" + Object.keys(totalpresentitems).map(item => totalpresentitems[item] + "x " + item).join("\n"))
    } else {
        functions.replyMessage(message, "You have " + user.present + " presents. ")
    }
}