var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  if (words.length < 4) {
    functions.sendMessage(message.channel, "Syntax: !adminset user attribute value");
    return;
  }
  let target = functions.validate(message)
  if (target == false) { return; }
  let amount = parseInt(words[3]);
  let attribute = words[2];
  //console.log(attribute)
  //console.log(JSON.stringify(userData))
  if (userData[target][attribute] == undefined || attribute == "cooldowns" || attribute == "inventory") {
    functions.sendMessage(message.channel, attribute + " is not a defined attribute");
    return;
  }
  if (amount > 0) {
    functions.sendMessage(message.channel, 'Set <@' + target + ">\'s " + attribute + " to " + amount);
    userData[target][attribute] = amount;
  } else {
    functions.sendMessage(message.channel, 'Incorrect Argument');
  }
  functions.logCommand(message)
}