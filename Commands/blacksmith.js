var functions=require("../Utils/functions.js")
module.exports=function(message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let itemName = ""
    let itemDesc = ""
    let itemCost = ""
    itemName += "ID 101 - Random Item\n"
    itemDesc += "Get a random weapon\n"
    itemCost += "400\n"
    itemName += "ID 102 - Simple Crafting\n"
    itemDesc += "Get a tier 0-2 weapon\n"
    itemCost += "125\n"
    itemName += "ID 103 - Moderate Crafting\n"
    itemDesc += "Get a tier 2-4 weapon\n"
    itemCost += "3125\n"
    itemName += "ID 104 - Exquisite Crafting\n"
    itemDesc += "Get a tier 4-6 weapon\n"
    itemCost += "78125\n"
    itemName += "ID 200 - Explosion\n"
    itemDesc += "Blow up everyone!\n"
    itemCost += "100000\n"
    itemName += "ID 201 - Phoenix Feather\n"
    itemDesc += "Rez yourself instantly!\n"
    itemCost += "5000\n"
    itemName += "ID 202 - Nametag\n"
    itemDesc += "Rename a weapon!\n"
    itemCost += "10000\n"

    //event items
    itemName += "ID 301 - Sweet n' Salty Egg\n"
    itemDesc += "Will it be sweet or salty?\n"
    itemCost += "10000\n"
    itemName += "ID 302 - Mystery Egg\n"
    itemDesc += "Pelt someone with an egg (ow)\n"
    itemCost += "10000\n"
    itemName += "ID 303 - Egg Fiesta\n"
    itemDesc += "Pelt everyone nearby with eggs\n"
    itemCost += "100000\n"

    functions.sendMessage(message.channel, {
      "embed": {
        "title": "The Blacksmith",
        "description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
        "color": 13498074,

        "fields": [
          {
            "name": "Item ID and Name",
            "value": itemName,
            "inline": true
          },
          {
            "name": "Item Description",
            "value": itemDesc,
            "inline": true
          },
          {
            "name": "Item Cost (In Materials)",
            "value": itemCost,
            "inline": true
          }
        ]
      }
    });
}