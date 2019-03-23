var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let target = functions.validate(message); //target //validate(message) overrides your words[1] //it should
  if (target == false) {
    return;
  }
  if (target == false) { return; }
  if (target == id) {
    functions.sendMessage(message.channel, "Poor kid with no friends...");
    return;
  }
  if (words.length < 2) {
    functions.sendMessage(message.channel, "Please specify a person you wish to marry");
    return;
  }
  if (userData[target].marry != "None") {
    functions.sendMessage(message.channel, "<@" + target + "> is already married 😭");
  }
  else if (userData[target].marry === "None" && userData[target].marrytarget != id) {
    userData[id].marrytarget = target;
    functions.sendMessage(message.channel, "<@" + target + ">, <@" + id + "> wishes to marry you! Type !marry <@" + id + "> to become married!");
  }
  else if (userData[target].marry === "None" && userData[target].marrytarget === id) {
    userData[id].marry = target;
    userData[target].marry = id;
    userData[id].marrytarget = "None";
    userData[target].marrytarget = "None";
    functions.sendMessage(message.channel, "<:nixheart:506240330916429837><:nixheart:506240330916429837><:nixheart:506240330916429837>🎉🎉🎉Congradulations! <@" + target + "> and <@" + id + "> are now married!🎉🎉🎉<:nixheart:506240330916429837><:nixheart:506240330916429837><:nixheart:506240330916429837>");
  } else {
    functions.sendMessage(message.channel, "Incorrect Argument");
  }
}