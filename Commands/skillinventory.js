var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)

  let messages = "**Your Skills**\n"
  //let skills = userData[id].skills;
  for (var i in userData[id].skills) {
    //functions.sendMessage(message.channel, "hi");
    messages += skillData[userData[id].skills[i]].name + " (" + skillData[userData[id].skills[i]].id + ")\n";
  }
  //messages += "```"
  if (messages == "**Your Skills**\n"){
    messages = "You have no skills. Get them with skill points";
  }
  functions.sendMessage(message.channel, messages);

} 