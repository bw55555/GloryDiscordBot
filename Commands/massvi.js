var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    for (var i = 1; i < words.length; i++) {
        let newmessage = message
        newmessage.content = "!vi " + words[i];
        functions.voteItem(newmessage, true)
        functions.logCommand(newmessage)
    }
    return functions.replyMessage(message,"Votes have been processed")
}