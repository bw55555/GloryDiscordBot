
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    functions.voteItem(message, user, true)
    functions.completeQuest(user, "vote", {}, 1)
    functions.logCommand(message)
}