var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let target = validate(message)
  if (target == false) {return}
  duel.opponent = target;
  functions.sendMessage(message.channel, "You have challenged " + challenged + " to a duel!")
}