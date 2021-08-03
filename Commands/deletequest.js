module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 2) {
        let qnum = parseInt(words[1]);
        if (isNaN(qnum) || qnum < 1 || qnum > user.quests.length) {
            return functions.replyMessage(message, "This quest number is not defined!")
        }
        qnum -= 1;
        if (user.quests[qnum].event != true) { return functions.replyMessage(message, "You can only delete event quests!") }
        if (functions.isCD(user, ts, "deletequest")) { return functions.replyMessage(message, "You cannot do this right now! Try again in "+functions.displayTime(user.cooldowns.deletequest, ts))}
        user.quests.splice(qnum, 1)
        functions.setCD(user, ts, 180, "deletequest")
        functions.replyMessage(message, "Deleted <@" + user._id + ">'s quest " + (qnum + 1))
    } else {
        if (admins.indexOf(id) == -1) {return}
        return Promise.all([functions.validate(message, user)]).then(ret => {
            let target = ret[0];
            if (target == false) { return; }
            let qnum = parseInt(words[2]);
            if (isNaN(qnum) || qnum < 1 || qnum > target.quests.length) {
                return functions.replyMessage(message, "This quest number is not defined!")
            }
            qnum -= 1;
            target.quests.splice(qnum, 1)
            functions.replyMessage(message, "Deleted <@" + target._id + ">'s quest " + (qnum + 1))
            functions.setUser(target)
        })
    }
}