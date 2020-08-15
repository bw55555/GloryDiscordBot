module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user.vip == undefined) { return }
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        let amount = parseInt(words[2]);
        if (isNaN(amount)) { functions.sendMessage(message.channel, "Please enter an integer amount!"); return; }
        if (amount < 0 || amount > user.consum.reroll) { return functions.sendMessage(message.channel, "You do not have this many rerolls to send!")}
        target.consum.reroll += amount;
        user.consum.reroll -= amount;
        functions.sendMessage(message.channel, "<@" + target._id + "> given " + amount + " rerolls.");
        functions.setUser(target);
        functions.logCommand(message)
    })
}