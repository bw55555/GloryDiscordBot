var moment=require("moment")
var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].lastDaily != moment().format('L')) {//Checks if last daily object is L
    userData[id].lastDaily = moment().format('L') //Sets daily as L
	userData[id].box += 1; //gives you 10000!
    functions.sendMessage(message.channel, "You received a mysterious box... what could it contain?");
	userData[id].glory += 0.25 * Math.random()
    if (questData.questInfo.current == 3) {
        questData.questInfo.questList[3].completed++;
    }


  } else {
    functions.sendMessage(message.channel, 'Your next daily will be ready ' + moment().endOf('day').fromNow() + '.'); //already gotten, scammer
    //also, wait time.
  }
}