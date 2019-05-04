var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].triangleid != 9 && !functions.hasSkill(id, 11)) {
    return functions.replyMessage(message, "You can't bolster!");
  }
  if (functions.calcTime(userData[id].cooldowns.bolster, ts) > 0) {
    functions.deleteMessage(message);
    return functions.replyMessage(message, "You can't bolster right now. You can bolster again in " + functions.displayTime(userData[id].cooldowns.bolster, ts));
  }
  if (words.length == 1) {
    if (userData[id].bolster === true) {
      functions.replyMessage(message, "You are already bolstered!");
      return;
    }
    if (userData[id].triangleid != 9) {
        functions.replyMessage(message, "You cannot bolster yourself!");
        return
    }
    userData[id].bolster = true;
    functions.replyMessage(message, "You have bolstered yourself!");
  } else if (words.length == 2) {
    let target = functions.validate(message);
    if (target == false) {
      return;
    }
    if (userData[target].bolster === true) {
      functions.replyMessage(message, "They are already bolstered!");
      return;
    }
    if (target == id && userData[id].triangleid != 9) { return functions.replyMessage(message,"You cannot bolster yourself!") }
    userData[target].bolster = true;
    if (target == id) {
        functions.replyMessage(message, "You have been bolstered!");
    }
    else if (userData[id].triangleid == 9) {
      userData[id].bolster = true;
      functions.replyMessage(message, "You and <@" + target + "> have both been bolstered!");
    }else{
      functions.replyMessage(message, "<@" + target + "> has been bolstered!");
    }

    
  }
  functions.setCD(id, ts, bolstercd * 60, "bolster")
}