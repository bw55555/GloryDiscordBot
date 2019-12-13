var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    if (user.spells == undefined) {return;}

    let itemName = ""
    let itemNum = ""
    itemName += "ID 1000 - Healing Spells\n"
    itemNum += user.spells[0] + "\n"
    itemName += "ID 1001 - Damage Spells\n"
    itemNum += user.spells[1] + "\n"
    itemName += "ID 1002 - Fortune Spells\n"
    itemNum += user.spells[2] + "\n"
    itemName += "ID 1003 - Karma Spells\n"
    itemNum += user.spells[3] + "\n"
    itemName += "ID 1004 - Meme Spells\n"
    itemNum += user.spells[4] + "\n"
    

    functions.sendMessage(message.channel, {
      "embed": {
        "title": "Spells.. idk change name later",
        "description": "Here is your spell inventory\nUse `!cast [ID_of_Item]` to cast you spell... yeah \n",
        "color": 13498074,

        "fields": [
          {
            "name": "Spell",
            "value": itemName,
            "inline": true
          },
          {
            "name": "Quantity",
            "value": itemNum,
            "inline": true
          }
        ]
      }
    })

}