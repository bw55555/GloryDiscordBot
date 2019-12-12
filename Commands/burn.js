var functions = require("../Utils/functions.js")
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.split(/\s+/)

  if (userData[id].dead === true) {
    functions.replyMessage(message, "You're dead. Do !resurrect");
    return;
  }
  let target = functions.validate(message)
  if (target == false) {
    return;
  }
  if (userData[target].dead === true) {
    functions.replyMessage(message, "Don't burn corpses... that's just bad taste.");
    return;
  }
  if (target === id) {
    functions.replyMessage(message, "Masochism is highly discouraged...");
    return;
  }
  functions.sendMessage(message.channel, "https://images-ext-2.discordapp.net/external/dojOhwEHXtz0SHhaypep01Eg3YvXrXAktzGjqybEDvw/https/media.discordapp.net/attachments/557601299663814666/570454010130333696/unknown.gif")
  functions.sendMessage(message.channel, message.author.username + " burnt " + userData[target].username + "!");
}
