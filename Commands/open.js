var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].consum.box == undefined) {
    return;
  }
  let amount = 1
  if (words.length >= 2) {
    if (words[1].toUpperCase() != `ALL`) {
      amount = parseInt(words[1])
      if ((isNaN(amount) || amount < 1)) { return functions.replyMessage(message, "Please specify a valid amount!") }
    } else {
      amount = userData[id].consum.box
      if (amount == 0) {
        functions.replyMessage(message, "You have no boxes!")
        return
      }
    }
    if (userData[id].consum.box < amount) {
      functions.replyMessage(message, "You don't have enough boxes (You have " + userData[id].consum.box + "), silly! Get them by voting or buy them in the shop!")
      return;
    }
    let getrarities = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (var i = 0; i < amount; i++) {
      consumGive(id, box, -1);
      itemid = functions.craftItem(message, -1, -1, false);
      rarity = itemData[itemid].rarity
      getrarities[rarity] += 1
    }
    let text = "You opened " + amount + " boxes and got:\n"
    for (var i = 0; i < 9; i++) {
      if (getrarities[i] == 0) { continue }
      text += global.rarities[i] + ": " + getrarities[i] + "\n"
    }
    functions.replyMessage(message, text)
    return
  }
  if (userData[id].consum.box <= 0) {
    functions.replyMessage(message, "You don't have enough boxes, silly! Get them by voting or buy them in the shop!")
    return;
  }

  functions.craftItem(message, -1, -1, true)
  consumGive(id, box, -1);
}