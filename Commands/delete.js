
module.exports = async function (message, user) {
    let id = message.author.id;
    if (user.guild != "None") { return functions.replyMessage(message, "You cannot delete your character if you are in a guild!") }
    functions.MessageAwait(message.channel, id, "Are you sure you want to delete your character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let id = extraArgs[1]
        let message = extraArgs[0]
        if (user.guild != "None") { return functions.replyMessage(message, "You cannot delete your character if you are in a guild!") }
        functions.deleteObjects("itemData",{ "owner": id });
        if (user.marry != "None") { functions.setProp("userData", { "_id": user.marry }, { $set: { "marry": "None" } }) }
        functions.deleteUser(id);
        functions.replyMessage(message, 'Your character has been deleted. :(')
    }, [message, id]);
}