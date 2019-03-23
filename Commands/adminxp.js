var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  let target = functions.validate(message)
  if (target == false) { return; }
  var amount = parseInt(words[2]);
  if (amount > 0) {
    functions.sendMessage(message.channel, 'Sent ' + amount + ' xp to <@' + target + ">");
    userData[target].xp += amount;
  } else {
    functions.sendMessage(message.channel, 'Incorrect Argument');
  }
  functions.logCommand(message)
}