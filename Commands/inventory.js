var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let userInv = userData[id].inventory
  let minrarity = 0
  if (words.length > 1) {
      if (!isNaN(parseInt(words[1]))) {
          minrarity=parseInt(words[1])
      }
  }
  let maxrarity = 9
  if (words.length > 2) {
      if (!isNaN(parseInt(words[2]))) {
          maxrarity = parseInt(words[2])
      }
  }
  let pages = []
  //console.log(userData[id].weapon)
  
  let page = ""
  let total = 0
  if (userData[id].weapon != false && userData[id].weapon != "None") {
      total++
  }
  for (var item in userInv) {
      //console.log(item)
      //console.log(itemData[item])
      if (item == userData[id].weapon || userData[id].inventory[item] != item || itemData[parseInt(item)].rarity < minrarity || itemData[parseInt(item)].rarity > maxrarity) continue
      total++
  }
  let count = 0
  if (userData[id].weapon != false && userData[id].weapon != "None") {
      count++
      pages.push(functions.generateWeaponTemplate(userData[id].weapon,count,total))
      
  }
  for (var item in userInv) {
    //console.log(item)
      //console.log(itemData[item])
    
    if (item == userData[id].weapon || userData[id].inventory[item] != item || itemData[parseInt(item)].rarity < minrarity || itemData[parseInt(item)].rarity > maxrarity) continue
    count++
    page = functions.generateWeaponTemplate(item, count, total)
    pages.push(page)
    
  }
  if (pages.length == 0) {
    functions.sendMessage(message.channel, "There's nothing in your inventory...")
  } else {
    new functions.Paginator(message.channel, message.author, pages)
  }
}