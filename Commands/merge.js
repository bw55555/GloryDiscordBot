var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    functions.replyMessage(message, "Choose two IDs to merge them!")
    return
  }
  if (words.length == 2) {
    functions.replyMessage(message, "Choose another ID to merge the first item with!")
    return
  }
  if (userData[id].cooldowns.merge > ts) { return functions.replyMessage(message,"You cannot merge now. Try again in " + functions.calcTime(userData[id].cooldowns.merge,ts)+" seconds.") }
  let weaponid = words[1]
  let weaponid2 = words[2]
  if (weaponid == weaponid2) {
    functions.replyMessage(message, "You cannot merge an item with itself.")
  }

  if (itemData.length <= weaponid) {
    functions.replyMessage(message, "The first item does not exist!")
    return
  }
  if (itemData.length <= weaponid2) {
    functions.replyMessage(message, "The second item does not exist!")
    return
  }
  if (itemData[weaponid] == 0) {
    functions.replyMessage(message, "This item does not exist!")
  }
  if (itemData[weaponid2] == 0) {
    functions.replyMessage(message, "This item does not exist!")
    return
  }
  if (userData[id].inventory[weaponid] != weaponid) {
    functions.replyMessage(message, "You do not own the first item!")
    return
  }
  if (userData[id].inventory[weaponid2] != weaponid2) {
    functions.replyMessage(message, "You do not own the second item!")
    return
  }
  if (weaponid2 == userData[id].weapon) {
    functions.replyMessage(message, "You cannot merge away your equipped weapon!")
    return
  }
  let rarity = itemData[weaponid].rarity
  if (rarity == "Unique") {
    functions.replyMessage(message, "You cannot merge an unique weapon!")
    return
  }
  if (rarity == 9) {
    functions.replyMessage(message, "You cannot merge a GLORY weapon!")
    return
  }
  let rarity2 = itemData[weaponid2].rarity
  if (rarity2 == "Unique") {
    functions.replyMessage(message, "You cannot merge an unique weapon!")
    return
  }
  if (rarity2 == 9) {
    functions.replyMessage(message, "You cannot merge a GLORY weapon!")
    return
  }
  if (rarity != rarity2) {
    functions.replyMessage(message, "You must merge weapons of the same rarity!")
    return
  }
  if (itemData[weaponid].merge >= 10) {
    functions.replyMessage(message, "The first item cannot be upgraded any further!")
    return
  }
  let extratime = (rarity<2) ? 0 : Math.pow(2,rarity-2)*60*1000*15
  let wepatk = itemData[weaponid].attack
  let wepdef = itemData[weaponid].defense
  let y = (raritystats[rarity] - (wepatk + wepdef)) / (10 - itemData[weaponid].merge)
  let chance = Math.random()
  if (y > 0 && y <= 1) { y=1}
  if (raritystats[rarity] - (wepatk + wepdef) < 1 && rarity!=8) {
      itemData[weaponid].merge = 9
      y=1
  } else if (raritystats[rarity] - (wepatk + wepdef) < 1 && rarity == 8) {
      return functions.replyMessage(message,"This weapon cannot be upgraded anymore!")
  }
  for (let x = 0; x < y; x++) {
    chance = Math.random()
    if (chance > 0.5) {
      itemData[weaponid].attack += 1;
    } else {
      itemData[weaponid].defense += 1;
    }
  }
  itemData[weaponid].merge += 1;

  functions.replyMessage(message, itemData[weaponid].name + " (" + weaponid + ")'s stats has increased by " + (itemData[weaponid].attack - wepatk) + " Attack and " + (itemData[weaponid].defense - wepdef) + " Defense!")

  if (itemData[weaponid].merge >= 10 && itemData[weaponid].rarity != 8) {
    itemData[weaponid].merge = 0
    itemData[weaponid].rarity += 1;
    functions.sendMessage(message.channel, "It is now a " + itemData[weaponid].rarity + " rarity weapon!")
  }
  delete userData[id].inventory[weaponid2];
  itemData[weaponid2] = 0;
    
  userData[id].cooldowns.merge=ts+extratime
}