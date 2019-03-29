var functions = require("../Utils/functions.js")
module.exports = function (message) {

  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id) == -1) { return }
  let target = functions.validate(message)
  if (target == false) { return }
  if (admins.indexOf(target) != -1) {
    functions.sendMessage(message.channel, "You cannot adminkill an admin!");
    return;
  }
  userData[target].currenthealth = 0;
  userData[target].dead = true;
  functions.sendMessage(message.channel, "I guess /kill really does exist... <@" + target + "> has been killed!");
  functions.logCommand(message)
}