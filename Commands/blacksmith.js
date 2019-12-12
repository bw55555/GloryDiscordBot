var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let itemList = []
  let text = ""
  
  /*itemName += "ID 101 - Random Item\n"
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
  itemName += "ID 301 - Egg\n"
  itemDesc += "Will it be a good or bad egg?\n"
  itemCost += "3000\n"
  itemName += "ID 302 - Eggsplosion\n"
  itemDesc += "Pelt everyone nearby with an egg!\n"
  itemCost += "30000\n"*/

  text += "**ID 101 - Random Item - (400 Materials)**\n"
  text += "Get a random weapon. It usually sucks though.\n"
  text += "**ID 102 - Simple Crafting - (125 Materials)**\n"
  text += "Get a tier 0-2 weapon.\n"
  text += "**ID 103 - Moderate Crafting - (3125 Materials)**\n"
  text += "Get a tier 2-4 weapon.\n"
  text += "**ID 104 - Exquisite Crafting - (78125 Materials)**\n"
  text += "Get a tier 4-6 weapon.\n"

  text += "**ID 200 - Explosion - (100000 Materials)**\n"
  text += "Blow up everyone nearby! Use `!explosion` to activate.\n"
  text += "**ID 201 - Phoenix Feather - (5000 Materials)**\n"
  text += "Rez yourself instantly! Use `!feather` to activate.\n"
  text += "**ID 202 - Nametag - (10000 Materials)**\n"
  text += "Rename a weapon! Use `!nametag`\n"
  /*
  text += "**ID 301 - Egg - (3000 Materials)**\n"
  text += "Will it be a good or bad egg? `!pelt [target]` to find out.\n"
  text += "**ID 302 - Eggsplosion - (30000 Materials)**\n"
  text += "Use `!eggsplosion` to pelt everyone nearby with eggs.\n"
  */

  functions.sendMessage(message.channel, {
    "embed": {
      "title": "The Smith",
      "description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
      "color": 13498074,

      "fields": [
        {
          "name": "Item ID and Name",
          "value": text,
          "inline": true
        }/*,
          {
            "name": "Item Description",
            "value": itemDesc,
            "inline": true
          },
          {
            "name": "Item Cost (In Materials)",
            "value": itemCost,
            "inline": true
          }*/
      ]
    }
  });
}