var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.replyMessage(message, "Pong!<:ping:542111806521344023><:ping:542111806521344023><:ping:542111806521344023>\nPing: " + bot.ping + " ms");
}
