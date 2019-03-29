var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].cooldowns.smeltall > ts) { return functions.replyMessage(message, "Be patient! Wait " + functions.displayTime(userData[id].cooldowns.smeltall, ts)) }
  let totalmaterials = 0
  let totalmoney = 0
  let totalxp = 0
  if (Object.keys(userData[id].inventory).length == 0) {
    return functions.replyMessage(message, "You do not have any items to smelt!")
  }
  let minrarity = 0
  let maxrarity = 9
  if (words.length == 2) {
    if (!isNaN(parseInt(words[1]))) {
      maxrarity = parseInt(words[1])
    }
  }
  if (words.length == 3) {
    if (!isNaN(parseInt(words[1]))) {
      minrarity = parseInt(words[1])
    }
    if (!isNaN(parseInt(words[2]))) {
      maxrarity = parseInt(words[2])
    }
  }

  if (maxrarity < 0 || maxrarity > 9 || minrarity < 0 || minrarity > 9) { return functions.replyMessage(message, "No items exist at that level! Choose different bounds") }
  let count = 0
  for (var weaponid in userData[id].inventory) {
    if (itemData[weaponid] == undefined) { continue; }
    if (userData[id].inventory[weaponid] != weaponid || weaponid == userData[id].weapon || itemData[weaponid].favorite == true || itemData[weaponid].rarity < minrarity || itemData[weaponid].rarity > maxrarity) { continue }
    let itemRewards = functions.smeltItem(id, weaponid)
    if (isNaN(itemRewards[0])||isNaN(itemRewards[1])||isNaN(itemRewards[2])){
      continue
    }
    totalxp += itemRewards[0]
    totalmoney += itemRewards[1]
    totalmaterials += itemRewards[2]
    count += 1
  }
  if (count == 0) { return functions.replyMessage(message, "You do not have any items to smelt!") }
  userData[id].cooldowns.smeltall = ts + smeltallcd * 1000 * 60
  functions.sendMessage(message.channel, "You have smelted " + count + " items for " + totalmaterials + " materials, $" + totalmoney + ", and " + totalxp + " xp.")
}