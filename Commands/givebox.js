var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].dead === true) {
    functions.replyMessage(message,"Corpses can't give boxes!");
    return;
  }
  //console.log(words);
  let target = functions.validate(message)
  if (target == false) { return; }
  //console.log(target);
  //console.log(target);
  //console.log('targetname: '+targetname);
  //console.log(check);
  if (target == id) {
    functions.sendMessage(message.channel, "You're a funny person trying to give yourself stuff :/");
    return;
  }

  if (words.length < 3) {
    functions.sendMessage(message.channel, "Please specify an amount.");
    return;
  }
  var amount = parseInt(words[2]);
  if (isNaN(amount)) {
    functions.sendMessage(message.channel, "Please specify an integer amount.");
    return;
  }
  if (userData[target].dead === true) {
    functions.replyMessage(message,"You can't give boxes to corpses!");
    return;
  }
  //console.log(amount);
  if (userData[id].box >= amount && amount > 0) {
    functions.sendMessage(message.channel, 'Sent ' + amount + ' boxes to <@' + target + ">");
    userData[target].box += amount;
    userData[id].box -= amount;
  } else if (userData[id].box < amount) {
    functions.sendMessage(message.channel, 'You can\'t give more boxes than you own');
  } else {
    functions.sendMessage(message.channel, 'Incorrect Argument');
  }
}