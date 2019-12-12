var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return user}
    if (words.length != 4) { functions.sendMessage(message.channel, "!adminconsum [target] [item] [amount]");return user;}

    return Promise.all([functions.validate(message)]).then(ret => {
        target = ret[0];
        if(target == false) { return user; }
        var item = words[2]
        var amount = parseInt(words[3]);
        if (isNaN(amount)) { functions.sendMessage(message.channel, "!adminconsum [target] [item] [amount]");return user; }
        target.consum[item] += amount;
        functions.sendMessage(message.channel, "<@" + target._id + "> given " + amount + " " + item);
        functions.setUser(target);
        functions.logCommand(message)
    })
}