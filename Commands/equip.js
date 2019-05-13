var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    functions.replyMessage(message, "Choose an id!")
    return
  }
  let weaponid = words[1].toLowerCase()
  if (weaponid == "none") {
      if (userData[id].weapon != false && itemData[userData[id].weapon].modifiers.maxhp != undefined) { userData[id].health -= itemData[userData[id].weapon].modifiers.maxhp }
      userData[id].weapon = false
      return functions.replyMessage(message, "You have successfully unequipped your weapon!")
  }
  if (itemData[weaponid] == undefined) {return functions.replyMessage(message,"This weapon does not exist!");}
  if (userData[id].weapon == weaponid) {
    functions.replyMessage(message, "You already have this weapon equipped!")
    return
  }
  
  if (userData[id].inventory[weaponid] != weaponid) {
    functions.replyMessage(message, "You don't own this item!")
    return
  }
  if (userData[id].level+10*userData[id].ascension<itemData[weaponid].rarity*10 && itemData[weaponid].rarity != 9) {
    functions.replyMessage(message, "You must be at least level "+itemData[weaponid].rarity*10+" to equip this item!")
    return
  }
  if (userData[id].weapon!=false) {
    //if (itemData[userData[id].weapon].modifiers.maxhp!=undefined) {userData[id].health-=itemData[userData[id].weapon].modifiers.maxhp}
  }
  userData[id].weapon = weaponid
  //if (itemData[weaponid].modifiers.maxhp!=undefined) {userData[id].health+=itemData[weaponid].modifiers.maxhp}
  functions.sendMessage(message.channel, "You successfully equipped the weapon with id " + weaponid)
}

