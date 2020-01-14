var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    if (user.guild != "None") { return functions.replyMessage(message, "You cannot be in a guild to delete your character!") }
    functions.MessageAwait(message.channel, id, "Are you sure you want to delete your character? This is an irreversible action.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let id = extraArgs[1]
        let message = extraArgs[0]
        if (user.guild != "None") { return functions.replyMessage(message, "You cannot be in a guild to delete your character!") }
        client.db("current").collection("itemData").deleteMany({ "owner": id });
        if (user.marry != "None") { functions.setProp("userData", { "_id": user.marry }, { $set: { "marry": "None" } }) }
        functions.deleteUser(id);
        functions.replyMessage(message, 'Your character has been deleted. :(')
    }, [message, id]);
}