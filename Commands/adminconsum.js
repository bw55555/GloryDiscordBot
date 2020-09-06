
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return user}
    if (words.length != 4) { functions.sendMessage(message.channel, "!adminconsum [target] [item] [amount]");return user;}

    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        var item = words[2]
        var amount = parseInt(words[3]);
        if (isNaN(amount)) { return functions.sendMessage(message.channel, "The amount must be an integer!"); }
        if (item == undefined || target.consum[item] == undefined) { return functions.sendMessage(message.channel, "This item is not defined!")}
        target.consum[item] += amount;
        functions.sendMessage(message.channel, "<@" + target._id + "> given " + amount + " " + item);
        functions.setUser(target);
        functions.logCommand(message)
    })
}