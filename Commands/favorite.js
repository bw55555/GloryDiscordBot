var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (words.length == 1){return functions.replyMessage(message,"Choose an item!")}
  let weaponid=words[1]
  if (userData[id].inventory[weaponid]!=weaponid) {return functions.replyMessage(message,"You don't own this item!")}
  if (itemData[weaponid].favorite==true){
itemData[weaponid].favorite=false;
functions.replyMessage(message,"You have successfully unfavorited the weapon with id "+weaponid)
}else{
itemData[weaponid].favorite=true;
functions.replyMessage(message,"You have successfully favorited the weapon with id "+weaponid)
}

  
}