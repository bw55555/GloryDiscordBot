var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    functions.replyMessage(message, "Choose an id!")
    return
  }
  let weaponid = words[1].toLowerCase()
  if (weaponid == "none") {
      if (user.weapon != false && itemData[user.weapon].modifiers.maxhp != undefined) { user.health -= itemData[user.weapon].modifiers.maxhp }
      user.weapon = false
      return functions.replyMessage(message, "You have successfully unequipped your weapon!")
  }
  if (itemData[weaponid] == undefined) {return functions.replyMessage(message,"This weapon does not exist!");}
  if (user.weapon == weaponid) {
    functions.replyMessage(message, "You already have this weapon equipped!")
    return
  }
  
  if (user.inventory[weaponid] != weaponid) {
    functions.replyMessage(message, "You don't own this item!")
    return
  }
  if (user.level+10*user.ascension<itemData[weaponid].rarity*10 && itemData[weaponid].rarity != 9) {
    functions.replyMessage(message, "You must be at least level "+itemData[weaponid].rarity*10+" to equip this item!")
    return
  }
  if (user.weapon!=false) {
    //if (itemData[user.weapon].modifiers.maxhp!=undefined) {user.health-=itemData[user.weapon].modifiers.maxhp}
  }
  user.weapon = weaponid
  //if (itemData[weaponid].modifiers.maxhp!=undefined) {user.health+=itemData[weaponid].modifiers.maxhp}
  functions.sendMessage(message.channel, "You successfully equipped the weapon with id " + weaponid)
}

