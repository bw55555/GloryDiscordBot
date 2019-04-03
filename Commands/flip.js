var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    if(Math.random() > 0.5){
      functions.sendMessage(message.channel, 'It was heads!');
    }
    else{
      functions.sendMessage(message.channel, 'It was tails!');
    }
    return;
  }
  if (words.length < 3) {
    functions.sendMessage(message.channel, 'You are missing some arguments. !flip [heads|tails] [amount]');
    return;
  }
  tipside = words[1].toUpperCase()
  if (tipside != "HEADS" && tipside != "TAILS") {
    functions.sendMessage(message.channel, 'Please choose heads or tails.');
    return;
  }
  amount = parseInt(words[2]);
  if (amount <= userData[id].money && amount > 0) {
    if (Math.random() > .6) {
      let coin = (tipside == "HEADS") ? "heads" : "tails" //if call heads then set coin to heads, else set coin to tails
      //console.log(tipside + ":" + coin)
      functions.sendMessage(message.channel, 'It was ' + coin + '! You won $' + amount + '!');
      userData[id].money += amount;
    } else {
      let coin = (tipside == "HEADS") ? "tails" : "heads" //if call heads then set coin to tails, else set coin to heads
      functions.sendMessage(message.channel, 'It was ' + coin + '! You lost $' + amount + '!');
      userData[id].money -= amount;
    }
  } else if (amount > userData[id].money || amount <= 0) {
    functions.sendMessage(message.channel, 'You can\'t flip more than you own! (or a negative amount)');
  }
}