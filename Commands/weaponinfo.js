var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1) {
    functions.replyMessage(message, "Choose an id!")
    return
  }

  let weaponid = parseInt(words[1])
  if (isNaN(weaponid)) {
    functions.replyMessage(message, "This item does not exist!")
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
  functions.sendMessage(message.channel, functions.generateWeaponTemplate(weaponid,1,1))
}