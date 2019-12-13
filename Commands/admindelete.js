var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    if (devs.indexOf(id) == -1) { return user; }
    return Promise.all([functions.validate(message)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        new functions.MessageAwait(message.channel, id, "Are you sure you want to delete <@" + target._id + ">'s character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
            let id = extraArgs[1]
            let message = extraArgs[0]
            functions.deleteUser(target._id);
            functions.replyMessage(message, '<@' + target._id + '>s character has been deleted. :(')
        }, [message, target]);
        return user;
    });
}