var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let text = ""
    if (functions.calcTime(user.cooldowns.work, ts) > 0) {
        functions.replyMessage(message, "More work will be available in " + functions.displayTime(user.cooldowns.work, ts))
        functions.deleteMessage(message);
        return;
    }
    if (user.dead === true) {
        functions.replyMessage(message, "Corpses can\'t work! Do !resurrect");
        functions.deleteMessage(message);
        return;
    }
    let earnings = Math.floor((-4 * ((Math.random() - 0.5) ** 2) + 1) * (Math.sqrt(user.level) * 50 + 1));
    if (user.triangleid == 7) {
        earnings = Math.floor(earnings * 2);
    }
    earnings *= functions.calcLuckyBuff(user)
    earnings = Math.floor(earnings)
    user.xp += earnings;
    user.money += earnings;
    functions.setCD(user, ts, workcdseconds, "work")
    text += message.author.username + ' worked for ' + earnings + ' money and xp!'
    if (user.marry != "None") {
        await Promise.all([functions.getUser(user.marry)]).then(ret => {
            let spouse = ret[0];
            if (spouse == undefined) { return;}
            spouse.money += earnings;
            text += " Your spouse, " + spouse.username + ", also earned $" + earnings + "!"
            functions.setUser(spouse)
        })
    }
    if (Math.random() > 1) {
        functions.sendMessage(message.channel, "TEST")
        let a = Math.floor(Math.random() * 100)
        let b = Math.floor(Math.random() * 100)
        let c = Math.floor(Math.random() * 100)
        let d = a + b + c
        await functions.MessageAwait(message.channel, id, "Answer the following question to recieve a bonus! What is " + a + " + " + b + " + " + c + "?", d, function (response, extraArgs) {
            let user = extraArgs[1];
            let message = extraArgs[0];
            let special = 10 * Math.floor((-4 * ((Math.random() - 0.5) ** 2) + 1) * (Math.sqrt(user.level) * 50 + 1));
            functions.replyMessage(message, "You earned $" + special + "!")
        }, [message, user]);
    }
    user.speed = 0;
    functions.deleteMessage(message);
    functions.sendMessage(message.channel, text)
}
