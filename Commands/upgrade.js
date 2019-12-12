var functions = require("../Utils/functions.js")
function upgradeStats(attributeToUpgrade, amount,id) {
    let totalcost = 0
    let cost = 0
    //console.log(userData[id][attributeToUpgrade])
    let attrcosts = { "attack": 1, "defense": 1, "health": 10 }
    let levelstop = false;
    let moneystop = false;
    let text = ""
    let extrastat = functions.calcExtraStat(id, attributeToUpgrade)
    while (amount > 0) {
        let basestat = userData[id][attributeToUpgrade] - extrastat
        if (basestat < 0) {
            userData[id][attributeToUpgrade] = functions.calcExtraStat(id, attributeToUpgrade)
            basestat = 0
        }
        cost = Math.floor(100 / attrcosts[attributeToUpgrade] * (basestat + attrcosts[attributeToUpgrade]));
        if (userData[id].money >= cost && userData[id].level * attrcosts[attributeToUpgrade] > basestat) {
            userData[id].money -= cost;
            userData[id][attributeToUpgrade] += attrcosts[attributeToUpgrade];
        } else if (userData[id].level <= Math.floor(basestat / attrcosts[attributeToUpgrade])) {
            levelstop = true;
            //functions.replyMessage(message, 'You must be level ' + (Math.floor(userData[id][attributeToUpgrade] / attrcosts[attributeToUpgrade]) + 1) + ' to level up your ' + attributeToUpgrade + ' to ' + (userData[id][attributeToUpgrade] + attrcosts[attributeToUpgrade]) + '. You are level ' + userData[id].level + '!');
            break;
        } else if (userData[id].money < cost) {
            moneystop = true;
            //functions.replyMessage(message, 'You need $' + cost + ' to level up your ' + attributeToUpgrade + ' to ' + (userData[id][attributeToUpgrade] + attrcosts[attributeToUpgrade]) + '. You have $' + userData[id].money);
            break;
        }
        totalcost += cost
        amount -= 1;
    }
    let basestat = userData[id][attributeToUpgrade] - extrastat
    if (totalcost > 1) {
        text += 'You spent $' + totalcost + ' increasing your ' + attributeToUpgrade + ' to ' + basestat+"\n";
    }
    if (levelstop == true) {
        text += 'You must be level ' + (Math.floor(basestat / attrcosts[attributeToUpgrade]) + 1) + ' to level up your ' + attributeToUpgrade + ' to ' + (basestat + attrcosts[attributeToUpgrade]) + '. You are level ' + userData[id].level + '!' + "\n";
    }
    if (moneystop == true) {
        text += 'You need $' + cost + ' to level up your ' + attributeToUpgrade + ' to ' + (basestat + attrcosts[attributeToUpgrade]) + '. You have $' + userData[id].money + "\n";
    }
    return text;
}
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  //if (admins.indexOf(id) == -1) { return functions.replyMessage(message,"This command is being temporarily disabled while we fix some bugs")}
  if (words.length == 1) {
    functions.replyMessage(message, "Please specify an attribute to upgrade.");
    return;
  }
  attributeToUpgrade = words[1].toUpperCase();
  var amount = 1;
  let text=""
  if (words[2] != undefined) {
    amount = parseInt(words[2]);
  }
  if (words[2] == "all") {
    amount = 100;
  }
  if (isNaN(amount)) {
    functions.sendMessage(message.channel, "Please specify an integer amount.");
    return;
  }
  if (attributeToUpgrade == 'ATTACK' || attributeToUpgrade == 'ATK') { //Upgrade Atk
      text += upgradeStats("attack", amount, id)
  }
  else if (attributeToUpgrade == 'DEFENSE' || attributeToUpgrade == 'DEF') { //Upgrade Def
      text+=upgradeStats("defense", amount,id)
  }
  else if (attributeToUpgrade == 'HEALTH' || attributeToUpgrade == 'HP') { //Upgrade Health
      text += upgradeStats("health", amount, id)
  }
  else if (attributeToUpgrade == 'ALL') { //Upgrade Health
      text += upgradeStats("attack", amount,id)
      text += upgradeStats("defense", amount, id)
      text += upgradeStats("health", amount, id)
  }
  else { return functions.replyMessage(message, "That is not a valid stat!") }
  functions.replyMessage(message,text)
  
}
