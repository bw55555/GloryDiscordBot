var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    return functions.MessageAwait(message.channel, id, "Are you sure you want to delete your character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let id = extraArgs[1]
        let message = extraArgs[0]
        functions.deleteUser(id);
        functions.replyMessage(message, 'Your character has been deleted. :(')
    }, [message, id]);
}