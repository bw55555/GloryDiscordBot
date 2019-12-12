var functions=require("../Utils/functions.js")
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let target = id;
  if (words.length > 1) {
    target = functions.validate(message)
    if (target == false) { return; }
  }
  textmessage = "<@" + target + "> has " + userData[target].consum.box + " boxes"
  functions.sendMessage(message.channel, textmessage);
}