var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    return Promise.all([functions.validate(message)]).then(ret => {
        target = ret[0];
        if (target == false) { return user; }
        var amount = parseInt(words[2]);
        if (!isNaN(amount)) {
            functions.sendMessage(message.channel, 'Sent $' + amount + ' to <@' + target._id + ">");
            target.money += amount;
        } else {
            functions.sendMessage(message.channel, amount + ' is an incorrect argument');
        }
        functions.logCommand(message)
        functions.setUser(target)
        return user
    });
}