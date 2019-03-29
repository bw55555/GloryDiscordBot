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
  if (itemData[weaponid] == 0 || itemData[weaponid] == undefined || itemData[weaponid] == null || weaponid == "next") {
    functions.replyMessage(message, "This item does not exist!")
    return
  }
  functions.sendMessage(message.channel, functions.generateWeaponTemplate(weaponid,1,1))
}