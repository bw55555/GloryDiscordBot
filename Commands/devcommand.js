
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return user }
    let cmd = words[1] == undefined ? "help" : words[1].toLowerCase();
    if (cmd == "help") {
        return functions.replyMessage(message, "`resetallraids`")
    }
    if (cmd == "resetallraids") {
        functions.setProp(userData, {}, { $set: { location: "city" } })
        functions.deleteObjects(mobData, {})
        functions.replyMessaege(message, "All raids were reset! (remember to resummon the world boss)")
    }
    
}