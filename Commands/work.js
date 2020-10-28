
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let text = ""
    if (functions.isCD(user, ts, "work")) {
        functions.replyMessage(message, "More work will be available in " + functions.displayTime(user.cooldowns.work, ts))
        functions.deleteMessage(message);
        return;
    }
    if (user.dead === true) {
        functions.replyMessage(message, "Corpses can\'t work! Do !resurrect");
        functions.deleteMessage(message);
        return;
    }
    let earnings = Math.floor((-4 * ((Math.random() - 0.5) ** 2) + 1) * ((10 * user.ascension + user.level) * 10 + 1));
    let lb = functions.calcLuckyBuff(user)
    let moneyearnings = Math.floor(earnings * (1+(lb-1)/5))
    let xpearnings = Math.floor(earnings * lb * 10)
    user.xp += xpearnings;
    user.money += moneyearnings;
    functions.setCD(user, ts, workcdseconds, "work")
    text += message.author.username + ' worked for ' + earnings + ' money and xp!'
    if (user.marry != "None") {
        await Promise.all([functions.getUser(user.marry)]).then(ret => {
            let spouse = ret[0];
            if (spouse == undefined) { return;}
            spouse.money += moneyearnings;
            text += " Your spouse, " + spouse.username + ", also earned $" + moneyearnings + "!"
            functions.setUser(spouse)
        })
    }
    if (Math.random() > 1) {
        functions.sendMessage(message.channel, "TEST")
        let a = Math.floor(Math.random() * 100)
        let b = Math.floor(Math.random() * 100)
        let c = Math.floor(Math.random() * 100)
        let d = a + b + c
        functions.MessageAwait(message.channel, id, "Answer the following question to recieve a bonus! What is " + a + " + " + b + " + " + c + "?", d, function (response, extraArgs) {
            Promise.all([functions.getUser(extraArgs[1]._id)]).then(ret => {
                let user = ret[0];
                let message = extraArgs[0];
                let special = 10 * Math.floor((-4 * ((Math.random() - 0.5) ** 2) + 1) * (Math.sqrt(user.level) * 50 + 1));
                functions.setProp("userData", { _id: user._id }, { $inc: { "money": special } })
                functions.replyMessage(message, "You earned $" + special + "!")
            })
        }, [message, user]);
    }
    functions.completeQuest(user, "work", {}, earnings)
    user.speed = 0;
    functions.deleteMessage(message);
    functions.sendMessage(message.channel, text)
}
