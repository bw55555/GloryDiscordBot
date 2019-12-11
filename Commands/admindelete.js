var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    if (devs.indexOf(id) == -1) { return; }
    target = functions.validate(message);
    if (target == false) { return; }
    new functions.MessageAwait(message.channel, id, "Are you sure you want to delete <@"+target+">'s character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let id = extraArgs[1]
        let message = extraArgs[0]
        userData[id] = undefined;
        functions.replyMessage(message, '<@'+target+'>s character has been deleted. :(')
    }, [message, target]);
}