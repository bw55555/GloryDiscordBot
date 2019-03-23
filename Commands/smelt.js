var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    functions.replyMessage(message, "Choose an id!")
    return
  }
  let weaponid = words[1]
  if (userData[id].inventory[weaponid] != weaponid) {
    functions.replyMessage(message, "You do not own this item!")
    return
  }
  if (itemData.length <= weaponid) {
    functions.replyMessage(message, "This item does not exist!")
    return
  }
  if (itemData[weaponid] == 0) {
    functions.replyMessage(message, "This item does not exist!")
    return
  }
  if (weaponid == userData[id].weapon) {
    functions.replyMessage(message, "You cannot smelt your equipped weapon!")
    return
  }
  let rarity = itemData[weaponid].rarity
  if (rarity == "Unique") {
    functions.replyMessage(message, "You cannot smelt a unique weapon!")
    return
  }
  if (rarity == 9) {
    functions.replyMessage(message, "You cannot smelt a GLORY weapon!")
    return
  }
  
  let materials = Math.pow(5, rarity)
  let money = rarity * rarity * 1000
  let xp = rarity * rarity * 1000
  userData[id].materials += materials
  userData[id].money += money
  userData[id].xp += xp
  delete userData[id].inventory[weaponid];
  itemData[weaponid] = 0
  functions.sendMessage(message.channel, "You have smelted item " + weaponid + " for " + materials + " materials, $" + money + " ,and " + xp + " xp.")
}