
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1];
    if (word2 == undefined) { word2 = "list" }
    word2 = word2.toLowerCase()
    if (word2 == "donate") {
        let qnum = parseInt(words[2]);
        let currency = words[3];
        let amount = words[4]
        if (isNaN(qnum) || qnum < 0 || qnum >= user.quests.length) { return functions.replyMessage(message, "Specify a quest number!") }
        let firstdonateindex = user.quests[qnum].conditions.findIndex(x=> x.condition.category.value == "donate")
        if (firstdonateindex == -1) { return functions.replyMessage(message, "This quest does not have any donation conditions!") }
        if (currency == "auto") { currency = user.quests[qnum].conditions[firstdonateindex].condition.currency.value }
        if (currency == undefined || functions.JSONoperate(user, currency, "get") == undefined) { return functions.replyMessage(message, "Specify a currency! (or `auto` to automatically select a currency)") }
        let donatecondition = user.quests[qnum].conditions.find(x => x.condition.currency.value == currency)
        if (donatecondition == undefined) {return functions.replyMessage(message, "This quest does not require donating " + currency+"!")}
        if (amount == "auto") { amount = Math.min(donatecondition.total - donatecondition.current, functions.JSONoperate(user, currency, "get")) }
        amount = parseInt(amount)
        if (isNaN(amount)) { return functions.replyMessage(message, "Specify an amount to donate!") }
        if (amount > donatecondition.total - donatecondition.current) { amount = donatecondition.total - donatecondition.current }
        if (amount < 0) {return functions.replyMessage(message, "You cannot donate a negative amount!")}
        if (functions.JSONoperate(user, currency, "get") < amount) { return functions.replyMessage(message, "You do not have enough to donate!") }
        functions.JSONoperate(user, currency, "add", -1 * amount)

        donatecondition.current += amount;
        functions.replyMessage(message, "Successfully donated "+amount +" "+currency+"!")
    } else if (word2 == "list") {
        if (user.quests.length == 0) { return functions.replyMessage(message, "You have no quests!") }
        let fields = []
        let pages = [];
        let page = {};
        let numPerPage = 5;
        for (var i = 0; i < user.quests.length; i++) {
            let text = "";
            if (user.quests[i].flavortext != undefined && user.quests[i].flavortext != "") { text += "**Description:**\n" + user.quests[i].flavortext + "\n" }
            text += "**Requirements:**\n"
            for (var j = 0; j < user.quests[i].conditions.length; j++) {
                text += user.quests[i].conditions[j].description + " (" + user.quests[i].conditions[j].current + "/" + user.quests[i].conditions[j].total + ")\n"
            }
            let rewardtext = Object.keys(user.quests[i].reward).map(x => user.quests[i].reward[x] + " " + x.substring(x.lastIndexOf(".") + 1)).join(", ")
            if (rewardtext == "") { rewardtext = "No Rewards." }
            text += "** Reward:** " + rewardtext
            fields.push({
                name: (i + 1) + ": " + user.quests[i].name,
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
}