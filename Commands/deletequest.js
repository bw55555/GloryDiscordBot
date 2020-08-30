module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        let qnum = parseInt(words[2]);
        if (isNaN(qnum) || qnum < 1 || qnum > target.quests.length) {
            return functions.replyMessage(message, "This quest number is not defined!")
        }
        qnum -= 1;
        target.quests.splice(qnum, 1)
        functions.setUser(target)
    })
}