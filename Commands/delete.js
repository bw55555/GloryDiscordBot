
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    if (user.guild != "None") { return functions.replyMessage(message, "You cannot delete your character if you are in a guild!") }
    if (admins.indexOf(user) == -1 && user.startts != undefined && functions.calcTime(user.startts + 24 * 60 * 60 * 1000, ts) > 0) { return functions.replyMessage(message, "You cannot delete your account yet! Please wait " + functions.displayTime(user.startts + 24 * 60 * 60 * 1000, ts))}
    functions.MessageAwait(message.channel, id, "Are you sure you want to delete your character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let id = extraArgs[1]
        let message = extraArgs[0]
        if (user.guild != "None") { return functions.replyMessage(message, "You cannot delete your character if you are in a guild!") }
        if (user.marry != "None") { functions.setProp("userData", { "_id": user.marry }, { $set: { "marry": "None" } }) }
        functions.deleteObjects("itemData", { "owner": id });
        functions.deleteObject("dungeonData", id)
        functions.deleteUser(id);
        user._id = null
        functions.replyMessage(message, 'Your character has been deleted. :(')
    }, [message, id]);
}