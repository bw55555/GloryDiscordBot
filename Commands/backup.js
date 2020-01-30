
module.exports = async function (message, user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    return;
  functions.replyMessage(message, "Backing up data...")
  functions.replyMessage(message, "Data backed up!")
  functions.logCommand(message)
}