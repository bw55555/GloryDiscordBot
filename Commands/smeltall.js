var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].cooldowns.smeltall > ts) { return functions.replyMessage(message, "Be patient! Wait " + functions.displayTime(userData[id].cooldowns.smeltall, ts)) }
  let totalmaterials = 0
  let totalmoney = 0
  let totalxp = 0
  let smeltItems = functions.itemFilter(message, {"fav":false})
  if (smeltItems == false) { return }
  let count = 0
  for (var i = 0; i < smeltItems.length; i++) {
      let weaponid = smeltItems[i]
      if (itemData[smeltItems[i]].rarity == "Unique" || itemData[smeltItems[i]].rarity == 9 || userData[id].weapon == weaponid) { continue}
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