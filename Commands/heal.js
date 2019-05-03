var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (functions.calcTime(userData[id].cooldowns.heal, ts) > 0) {
    functions.deleteMessage(message);
    return functions.replyMessage(message, "You can't heal right now. You can only heal once every minute.\nYour next heal will be ready in " + functions.displayTime(userData[id].cooldowns.heal, ts));
  }

  if (userData[id].dead === true) {
    functions.replyMessage(message, "You can't heal as a corpse! Do !resurrect");
    return;
  }
  if (words.length > 1) {
    let target = functions.validate(message)
    if (target == false) { return }
    let maxheal = userData[id].health
    if (userData[id].dead === true) {
      functions.replyMessage(message, "You can't heal others while you are a corpse! Do !resurrect");
      return;
    }
    if (userData[target].dead === true) {
      functions.replyMessage(message, "You can't heal a corpse! Do !resurrect");
      return;
    }

    if (target === id) {
      functions.replyMessage(message, "You can't target yourself with a heal!");
      return;
    }


    if (userData[target].currenthealth >= userData[target].health) {
      return functions.replyMessage(message, "<@" + target + "> is already at full health!");
    }
    let heal = Math.floor(userData[target].health * Math.random() + (userData[id].health / 5))

    if (userData[target].currenthealth + heal > userData[target].health) {
      heal = userData[target].health - userData[target].currenthealth
    }
    userData[id].speed = 0;
    userData[target].speed = 0;
    userData[target].currenthealth += heal
    userData[id].xp += heal
    if (!functions.hasSkill(id, 14)) {
        userData[id].currenthealth -= Math.floor(heal * Math.random())
    }
    functions.replyMessage(message, "<@" + target + "> was healed for " + heal + " health!")
    if (userData[id].triangleid == "5") {
        functions.setCD(id, ts,healcd * 45,"heal")
    } else {
        functions.setCD(id, ts, healcd * 60, "heal")
    }
  } else {
    if (userData[id].health <= userData[id].currenthealth) {
      return functions.replyMessage(message, "You are already at full health!");
    }
    let heal = userData[id].health - userData[id].currenthealth;
    if (!functions.hasSkill(id, 14)) {
      if (heal * 5 > userData[id].money) {
        heal = Math.floor((userData[id].money) / 5);
      }
      userData[id].money -= (heal * 5);
    }
    userData[id].currenthealth += heal;
    
    if (heal == 0) {
      functions.replyMessage(message, "(You don't have any money. You can't heal!)");
      return;
    }
    if (!functions.hasSkill(id, 14)) {
      functions.replyMessage(message, "You healed for " + heal + " Health! It cost you $" + (heal * 5));
    }
    else{
      functions.replyMessage(message, "You healed for " + heal + " Health!");
    }
    userData[id].speed = 0;
    functions.setCD(id, ts, healcd * 60, "heal")
    userData[id].speed = 0;
    if (functions.hasSkill(id, 34)) {
      userData[id].speed = 0;
      functions.setCD(id, ts, healcd * 30, "heal")
      userData[id].speed = 0;
    }
  }
}
