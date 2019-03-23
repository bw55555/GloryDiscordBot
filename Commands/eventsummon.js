var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id) == -1) { return }

  if (words.length > 1) {
    summonlevel = parseInt(words[1])
    if (isNaN(summonlevel)) { return functions.sendMessage(message.channel, "The boss level must be an integer!") }
    summonhp = parseInt(words[2])
    if (isNaN(summonhp)) { return functions.sendMessage(message.channel, "The boss hp must be an integer!") }
    summonatk = parseInt(words[3])
    if (isNaN(summonatk)) { return functions.sendMessage(message.channel, "The boss atk must be an integer!") }
    summonreward = parseInt(words[4])
    if (isNaN(summonreward)) { return functions.sendMessage(message.channel, "The boss reward must be an integer!") }
    itemrewardId = undefined
    if (words[5] == "-item" || words[5] == "-id") {
      itemrewardId = parseInt(words[6])
      if (isNaN(itemrewardId) || itemData[itemrewardId] == undefined || itemData[itemrewardId].owner != "event") { return functions.sendMessage(message.channel, "The item reward must be an event item!") }
    }
    mobData[message.channel.id].alive = true;
    mobData[message.channel.id].raid = true;
    mobData[message.channel.id].attack = summonatk;
    //mobData[message.channel.id].defense = summondef;
    mobData[message.channel.id].currenthealth = summonhp;
    mobData[message.channel.id].maxhealth = summonhp;
    mobData[message.channel.id].reward = summonreward;
    mobData[message.channel.id].level = summonlevel;
    mobData[message.channel.id].itemReward = itemrewardId;
    mobData[message.channel.id].attacklist = [];

    functions.replyMessage(message, "Boss summoned. It is level " + mobData[message.channel.id].level + "!");
  }else if (words.length == 1){
    let roll = 1 + ((Math.random()-0.5) * 0.2);
    mobData[message.channel.id].alive = true;
    mobData[message.channel.id].raid = true;
    mobData[message.channel.id].attack = Math.floor(1500 * roll);
    //mobData[message.channel.id].defense = summondef;
    mobData[message.channel.id].currenthealth = Math.floor(5000 * roll);
    mobData[message.channel.id].maxhealth = Math.floor(5000 * roll);
    mobData[message.channel.id].reward = Math.floor(500000 * roll);
    mobData[message.channel.id].level = Math.floor(150 * roll);
    //mobData[message.channel.id].itemReward = itemrewardId;
    mobData[message.channel.id].attacklist = [];
    functions.replyMessage(message, "Boss summoned. It is level " + mobData[message.channel.id].level + "!");
  }
}