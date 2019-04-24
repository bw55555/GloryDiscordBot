var functions = require("../Utils/functions.js")
module.exports = function (message) {
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
  functions.sendMessage(message.channel, "https://tenor.com/view/explosion-gif-9488133")
  functions.sendMessage(message.channel, message.author.username + " burnt " + userData[target].username + "!");
  }
}
