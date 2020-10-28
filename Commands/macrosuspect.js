
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        target.macro = true;
        functions.setUser(target)
        functions.replyMessage(message, "<@" +target._id +"> is being tested for macroing. ")
        functions.logCommand(message)
        return user
    })
}