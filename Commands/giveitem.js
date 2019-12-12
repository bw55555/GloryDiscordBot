var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  

  //functions.replyMessage(message, "This feature is not yet complete!");
  //return;


  if (userData[id].dead === true) {
    functions.replyMessage(message, "You can't give items while you are a corpse!");
    return;
  }
  //console.log(words);
  let target = functions.validate(message)
  if (target == false) { return; }
  //console.log(target);
  //console.log(target);
  //console.log('targetname: '+targetname);
  //console.log(check);
  if (target == id) {
    functions.replyMessage(message, "You can't give yourself items");
    return;
  }

  if (words.length < 3) {
    functions.replyMessage(message, "Please specify an item ID.");
    return;
  }
  var weaponid = parseInt(words[2]);
  if (isNaN(weaponid)) {
    functions.replyMessage(message, "Please specify an integer item ID.");
    return;
  }

  if (userData[id].inventory[weaponid] != weaponid) {
    functions.replyMessage(message, "You do not own this item!")
    return
  }
  if (itemData.next <= weaponid) {
    functions.replyMessage(message, "This item does not exist!")
    return
  }
  if (itemData[weaponid] == 0) {
    functions.replyMessage(message, "This item does not exist!")
    return
  }
  if (weaponid == userData[id].weapon) {
    functions.replyMessage(message, "You cannot give away your equipped weapon!")
    return
  }
  rarity = itemData[weaponid].rarity

  if (rarity == "Unique" && admins.indexOf(id)==-1) {
    functions.replyMessage(message, "You cannot trade an Unique weapon!")
    return
  }
  if (rarity == "GLORY" && admins.indexOf(id)==-1) {
    functions.replyMessage(message, "You cannot trade a GLORY weapon!")
    return
  }


  if (userData[target].dead === true) {
    functions.replyMessage(message, "You can't give items to a corpse!");
    return;
  }

  delete userData[id].inventory[weaponid]
//userData[id].inventory[weaponid] = undefined
  //delete userData[target].inventory[weaponid]
  userData[target].inventory[weaponid] = weaponid
  itemData[weaponid].owner = target
  functions.sendMessage(message.channel, "<@"+target+"> recieved " + weaponid + " from <@" + id + ">");
}