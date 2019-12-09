var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return }

    if (words.length != 4) { return functions.sendMessage(message.channel, "!adminconsum [target] [item] [amount]");}

    let target = functions.validate(message)
    if (target == false) { return; }

	var item = words[2]
    var amount = parseInt(words[3]);
    if (isNaN(amount)){return functions.sendMessage(message.channel, "!adminconsum [target] [item] [amount]");}
    functions.consumGive(target, item, amount);
	functions.sendMessage(message.channel, "<@" + target + "> given " + amount + " " + item);

    functions.logCommand(message)
}