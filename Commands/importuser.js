
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    if (words.length < 2) {
        words.push(id+"")
    }
    if (devs.indexOf(id) == -1) { words[1] = id + "" }
    if (isNaN(parseInt(words[1]))) { return functions.replyMessage(message, "The id must be an integer!") }
    if (db != "test") { return functions.replyMessage(message, "This can only be used in the test server!") }
    functions.MessageAwait(message.channel, id, "Are you sure you want to do this? It will overwrite all your data.\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        Promise.all([functions.importObject("current", "userData", words[1])]).then(ret => {
            let target = ret[0];
            if (target == false) { return functions.replyMessage(message, "This id does not exist!"); }
            target._id = user._id
            target.username = user.username
            target.guild = user.guild
            target.guildpos = user.guildpos
            target.inventory = user.inventory
            functions.setUser(target)
            functions.logCommand(message)
            functions.replyMessage(message, "Successfully imported id " + words[1] + ". Please note guild and inventory will remain the same. Guild buffs will be imported.  ")
        })
    }, [message], "Please enter `confirm`. (no caps)");

}