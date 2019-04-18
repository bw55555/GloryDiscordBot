var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let target = functions.validate(message)
    if (target == false) { return; }
    var amount = parseInt(words[2]);
    if (!isNaN(amount)) {
        functions.sendMessage(message.channel, 'Sent ' + amount + ' boxes to <@' + target + ">");
        functions.consumGive(target, box, amount)
    } else {
        functions.sendMessage(message.channel, amount + ' is an incorrect argument');
    }
    functions.logCommand(message)
}