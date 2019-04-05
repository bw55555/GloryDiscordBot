var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let userInv = userData[id].inventory
  let minrarity = 0
  let maxrarity = 9
  let fav = "None"
    let unique = false
  if (words.indexOf("-min") != -1) {
      minrarity = parseInt(words[words.indexOf("-min") + 1])
      if (isNaN(minrarity)) { return functions.replyMessage(message,"Please enter an integer for the minimum rarity.")}
  }
  if (words.indexOf("-max") != -1) {
      minrarity = parseInt(words[words.indexOf("-max") + 1])
      if (isNaN(minrarity)) { return functions.replyMessage(message, "Please enter an integer for the maximum rarity.") }
  }
  if (words.indexOf("-fav") != -1) {
      fav = true
  }
  if (words.indexOf("-nofav") != -1) {
      fav = false
  }
  if (words.indexOf("-unique") != -1) {
      unique = true
  }
  let pages = []
  //console.log(userData[id].weapon)
  
  let page = ""
  displayItems = []
  if (userData[id].weapon != false && userData[id].weapon != "None") {
      displayItems.push(userData[id].weapon)
  }
  
  for (var item in userInv) {
      //console.log(item)
      //console.log(itemData[item])
      let itemID = item.toString();
      if (!unique && itemData[item].rarity == "Unique") { continue}
      if (itemData[itemID] == undefined || item == userData[id].weapon || userData[id].inventory[item] != item || itemData[itemID].rarity < minrarity || itemData[itemID].rarity > maxrarity) continue
      if (fav == true && itemData[itemID].favorite == false) { continue }
      if (fav == false && itemData[itemID].favorite == true) { continue }
      displayItems.push(item)
  }
  for (var i = 0; i < displayItems.length;i++) {
    //console.log(item)
      //console.log(itemData[item])
    let itemID = displayItems[i].toString();
    page = functions.generateWeaponTemplate(itemID, i+1, displayItems.length)
    pages.push(page)
    
  }
  if (pages.length == 0) {
    functions.sendMessage(message.channel, "There's nothing in your inventory...")
  } else {
    new functions.Paginator(message.channel, message.author, pages)
  }
}