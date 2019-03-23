var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.replyMessage(message, "It's `!ping` you nimwit! (" + bot.ping + " ms)");
}