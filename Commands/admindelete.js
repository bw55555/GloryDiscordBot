
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return user; }
    if (words.length == 1) {return functions.replyMessage(message, "Please specify a user to delete. ")}
    return Promise.all([functions.validate(message,words[1])]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        if (target.guild != "None") { return functions.replyMessage(message, "You cannot delete your character if you are in a guild!") }
        functions.MessageAwait(message.channel, id, "Are you sure you want to delete <@" + target._id + ">'s character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
            let target = extraArgs[1]
            let message = extraArgs[0]
            functions.deleteUser(target._id);
            if (target.guild != "None") { return functions.replyMessage(message, "You cannot delete your character if you are in a guild!") }
            functions.deleteObjects("itemData",{ "owner": target._id });
            if (target.marry != "None") { functions.setProp("userData", { "_id": target.marry }, { $set: { "marry": "None" } }) }
            functions.replyMessage(message, '<@' + target._id + '>s character has been deleted. :(')
        }, [message, target]);
    });
}