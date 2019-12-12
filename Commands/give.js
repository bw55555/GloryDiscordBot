var functions=require("../Utils/functions.js")
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].dead === true) {
    functions.replyMessage(message,"Corpses can't give money!");
    return;
  }
    //console.log(words);
  console.log(message+"|"+id)
  let target = functions.validate(message)
  if (target == false) { return; }
  //console.log(target);
  //console.log(target);
  //console.log('targetname: '+targetname);
  //console.log(check);
  if (target == id) {
    functions.sendMessage(message.channel, "You're a funny person trying to give yourself money");
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
    functions.replyMessage(message,"You can't give money to corpses!");
    return;
  }
  //console.log(amount);
  if (userData[id].money >= amount && amount > 0) {
    functions.sendMessage(message.channel, 'Sent $' + amount + ' to <@' + target + ">");
    userData[target].money += amount;
    userData[id].money -= amount;
  } else if (userData[id].money < amount) {
    functions.sendMessage(message.channel, 'You can\'t give more money than you own');
  } else {
    functions.sendMessage(message.channel, 'Incorrect Argument');
  }
}