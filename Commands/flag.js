
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return user; }
    if (words.length == 1) { return functions.replyMessage(message, "Please specify a user to flag. ") }
    return Promise.all([functions.validate(message, words[1])]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        if (target.flag == true) { delete target.flag; functions.setUser(target); return functions.replyMessage(message, "<@" + target._id + "> was successfully unflagged!")}
        else { target.flag = true; functions.setUser(target); return functions.replyMessage(message, "<@" + target._id + "> was successfully unflagged!") }
    });
}