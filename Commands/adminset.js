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
  let amount = words[3];
  if (!isNaN(parseInt(amount))) { amount = parseInt(amount)}
  let attribute = words[2];
  //console.log(attribute)
    //console.log(JSON.stringify(userData))
  if (userData[target][attribute] == undefined) {
    functions.sendMessage(message.channel, attribute + " is not a defined attribute");
    return;
  }
  if (typeof userData[target][attribute] == "object") {
      if (words.length > 4) {
          let secondattribute = words[3]
          let amount = parseInt(words[4]);
          if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
          if (userData[target][attribute][secondattribute] == undefined) {
              functions.sendMessage(message.channel, attribute + ":" + secondattribute + " is not a defined attribute");
              return
          }
          functions.sendMessage(message.channel, 'Set <@' + target + ">\'s " + attribute + ":" + secondattribute + " to " + amount);
          userData[target][attribute][secondattribute] = amount;
          functions.logCommand(message)
          return
      }
      return functions.sendMessage(message.channel, attribute + " is an object. Try setting one of its properties.")
  }
  functions.sendMessage(message.channel, 'Set <@' + target + ">\'s " + attribute + " to " + amount);
  userData[target][attribute] = amount;
  functions.logCommand(message)
}