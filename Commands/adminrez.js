var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id) == -1) { return }
  if (words.length == 1) {
    if (userData[id].dead === false) {
      functions.replyMessage(message, "You're not dead. Why do you need to rez?");
      return;
    }
    userData[id].currenthealth = userData[id].health;
    userData[id].dead = false;
    userData[id].shield = ts + 60000
    functions.replyMessage(message, "You have been Admin Rezzed!");
  }
  if (words.length == 2) {
    let target = functions.validate(message);
    if (target == false) {
      return;
    }
    if (userData[target].dead === false) {
      functions.replyMessage(message, "They're not dead. Why do you need to rez?");
      return;
    }

    userData[target].currenthealth = userData[target].health;
    userData[target].dead = false;

    userData[target].shield = ts + 60000;
    functions.replyMessage(message, "<@" + target + "> has been admin resurrected! They feel wonderful!");
  }
  functions.logCommand(message)
}