
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1]
    if (word2 == undefined) { word2 = "" }
    if (word2 == "store") {

    } else {
        functions.replyMessage(message, "You have "+user.candy+" candy. ")
    }
}