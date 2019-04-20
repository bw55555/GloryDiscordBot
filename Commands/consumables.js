var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  //let ts = message.createdTimestamp;
  //let words = message.content.trim().split(/\s+/)
  let itemtext = ""
  /*if (userData[id].box != 0){
  items += "**Boxes** (`!open`): " + userData[id].box  + "\n"
  }
      
  if (userData[id].explosion != 0){
  items += "**Explosions** (`!explosion`): " + userData[id].explosion + "\n"
  }
  
  if (userData[id].phoenixfeather != 0){
  items += "**Phoenixfeathers** (`!feather`): " + userData[id].phoenixfeather + "\n"
  }
  
  if (userData[id].sp != 0){
  items += "**Skill Points** (`!skillpoint`): " + userData[id].sp + "\n"
  }
  
  if (userData[id].reroll != undefined && userData[id].reroll != 0){
    items += "**Skill Rerolls** (`!reroll`): " + userData[id].reroll + "\n"
  }
  
  
  if (userData[id].nametag != undefined && userData[id].nametag != 0){
    items += "**Nametags** (`!nametag`): " + userData[id].nametag + "\n"
  }*/

  for (var item in userData[id].consum) {
    if (userData[id].consum[item] > 0) {
      if (item == "egg") {
        itemtext += "**" + item + ":** (`!pelt [target]`)" + userData[id].consum[item] + "\n";
      } 
      else {
        itemtext += "**" + item + ":** " + userData[id].consum[item] + "\n";
      }
    }
  }

  if (itemtext == "") {
    itemtext += "You have no consumable items!"
  }

  functions.sendMessage(message.channel, {
    "embed": {
      "title": userData[id].username + "'s Consumables",
      //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
      "color": 13498074,

      "fields": [
        {
          "name": "Item List",
          "value": itemtext
          //"inline": true
        }
      ]
    }
  })
}