var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].cooldowns.smeltall > ts) { return functions.replyMessage(message,"Be patient! Wait "+functions.calcTime(userData[id].cooldowns.smeltall,ts)+" more seconds!")}
  let totalmaterials = 0
  let totalmoney = 0
  let totalxp = 0
  if (Object.keys(userData[id].inventory).length == 0) {
    return functions.replyMessage(message, "You do not have any items to smelt!")
  }
  let minrarity=0
  let maxrarity = 9
  if (words.length ==2) {
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
  let count = 0
  for (var weaponid in userData[id].inventory) {
    if (userData[id].inventory[weaponid] != weaponid || weaponid == userData[id].weapon || itemData[weaponid].favorite==true) { continue }
    let rarity = itemData[weaponid].rarity
    if (rarity == "Unique" || rarity == 9 || rarity>maxrarity || rarity < minrarity) { continue }
    totalmaterials += Math.pow(5, rarity)
    totalmoney += rarity * rarity * 1000
    totalxp += rarity * rarity * 1000
    delete userData[id].inventory[weaponid];
    itemData[weaponid] = 0
    count += 1
  }
  if (totalmaterials == 0) { return functions.replyMessage(message, "You do not have any items to smelt!") }
  userData[id].materials += totalmaterials
  userData[id].money += totalmoney
  userData[id].xp += totalxp
  userData[id].cooldowns.smeltall = ts + smeltallcd * 1000 * 60
  functions.sendMessage(message.channel, "You have smelted " + count + " items for " + totalmaterials + " materials, $" + totalmoney + ", and " + totalxp + " xp.")
}