var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let target = functions.validate(message)
    if (target == false) { return; }
	var item = words[2]
    var amount = parseInt(words[3]);
    functions.consumGive(target, item, amount);
	functions.sendMessage(message.channel, target + " given " + amount + " " + item);

    functions.logCommand(message)
}