var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let divorcee = userData[id].marry;
  if (userData[id].marry == "None") {
    return;
  }
  userData[id].marry = "None";
  userData[id].marrytarget = "None";
  userData[divorcee].marry = "None";
  userData[divorcee].marrytarget = "None";
  functions.sendMessage(message.channel, "<@" + divorcee + ">, <@" + id + "> has divorced you. Although you were probably going to do it if they weren't. 💔");
}