var moment=require("moment")
var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].lastDaily != moment().format('L')) {//Checks if last daily object is L
    userData[id].lastDaily = moment().format('L') //Sets daily as L
    let boxNumber = Math.floor(userData[id].glory/10) + 1
    let userData[id].bounty += Math.floor(0.5 * userData[id].glory * (userData[id].ascension * 100 + userData[id].level - 1));
    functions.consumGive(id, "box", boxNumber); //gives you one box
    functions.sendMessage(message.channel, "You received " + boxNumber + " mysterious box(es)... what could it contain?");
	userData[id].glory += 0.25
    /*if (questData.questInfo.current == 3) {
        questData.questInfo.questList[3].completed++;
    }*/


  } else {
    functions.sendMessage(message.channel, 'Your next daily will be ready ' + moment().endOf('day').fromNow() + '.'); //already gotten, scammer
    //also, wait time.
  }
}
