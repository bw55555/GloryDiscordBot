
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    if (words.length < 2) {
        functions.sendMessage(message.channel, "Syntax: !importuser id");
        return user;
    }
    if (isNaN(parseInt(words[1]))) { return functions.replyMessage(message, "The id must be an integer!") }
    if (db != "test") { return functions.replyMessage(message, "This can only be used in the test server!")}
    return Promise.all([functions.importUser("current", "userData", words[1])]).then(ret => {
        let target = ret[0];
        if (target == false) { return functions.replyMessage(message, "This id does not exist!"); }
        target._id = user._id
        target.username = user.username
        target.guild = "None"
        target.guildpos = "None"
        target.inventory = {}
        user = target;
        functions.logCommand(message)
        functions.replyMessage(message, "Successfully imported id "+words[1]+". Please note guild and inventory were cleared. ")
    })
}