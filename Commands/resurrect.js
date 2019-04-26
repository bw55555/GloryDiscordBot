var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    if (userData[id].dead === false) {
      functions.replyMessage(message, "You're not dead. Why do you need to rez?");
      return;
    }
    if (userData[id].health-10 >= functions.calcExtraStat(id, "health") && userData[id].health > 10) { //debuffs stats if they are above a certain level
      userData[id].health -= 10;
    }
    if (userData[id].attack - 1 >= functions.calcExtraStat(id, "attack") && userData[id].attack >= 1) {
      userData[id].attack -= 1;
    }
    if (userData[id].defense - 1 >= functions.calcExtraStat(id, "defense") && userData[id].defense >= 1) {
      userData[id].defense -= 1;
    }
    userData[id].speed = 0;
    userData[id].xp = 0;
    userData[id].currenthealth = userData[id].health;
    userData[id].dead = false;
    userData[id].shield = ts + 1800000
    functions.replyMessage(message, "You have been resurrected! You find yourself a little weaker than before. You also have a 1-minute Rez Shield and can't be attacked.");
  }
  if (words.length == 2 && userData[id].triangleid == 5) {
      if (functions.calcTime(userData[id].cooldowns.rez, ts) > 0) {
      return functions.replyMessage(message, 'You can\'t rez right now. You can only rez once every minute.');
    }
    let target = functions.validate(message);
    if (target == false) {
      return;
    }
    if (userData[id].dead === true) {
      functions.replyMessage(message, "You can't rez as a corpse! Do !resurrect");
      return;
    }
    if (userData[target].dead === false) {
      functions.replyMessage(message, "They're not dead. Why do you need to rez?");
      return;
    }
    if (!functions.hasSkill(id, 14)) {
      userData[id].currenthealth -= Math.abs(Math.floor(Math.random() * Math.random() * userData[target].health) - userData[id].defense);
    }
    userData[target].speed = 0;
    userData[id].speed = 0;
    userData[target].xp = 0;
    userData[target].currenthealth = userData[target].health;
    userData[target].dead = false;
    userData[target].shield = ts + 1800000;
    let text = "<@" + target + "> has been resurrected! They feel wonderful!"
    if (!functions.hasSkill(id, 14)) {
      text += " (On the other hand, you don't feel so well)"
    }
    functions.replyMessage(message, text);
    
  }
}