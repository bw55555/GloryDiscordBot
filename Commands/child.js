var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.sendMessage(message.channel, "This feature is under development... Check back later or join the support server for updates on progress.");
}