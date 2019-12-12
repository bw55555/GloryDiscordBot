var functions=require("../Utils/functions.js")
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id) == -1) { return }
  let target = functions.validate(message)
  if (target == false) { return}
  let rarity = parseInt(words[2])
  if (isNaN(rarity) ||  rarity < 0 || rarity > 9) { rarity = undefined}
  let itemid = functions.generateRandomItem(target,rarity)
  functions.sendMessage(message.channel, "<@" + target + "> has been given an item with id " + itemid + " and of rarity " + itemData[itemid].rarity)
  functions.logCommand(message)
}