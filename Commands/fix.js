var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let errorWeapons = 0

    for (var userid in userData) {//loops through user data to check. //w/o if statement, it checks everyone
        for (var itemid in userData[userid].inventory) {
            if (userData[userid].inventory[itemid] != itemid) {
                delete userData[userid].inventory[itemid]
                functions.sendMessage(message.channel, itemid + " id does not match, deleted from <@" + userid + ">")
                errorWeapons += 1
            } else if (itemData[itemid] == undefined) {
                delete userData[userid].inventory[itemid]
                functions.sendMessage(message.channel, itemid + " id does not exist, deleted from <@" + userid + ">")
                errorWeapons += 1
            }
        }
    }
    functions.sendMessage(message.channel, errorWeapons + " Error Items Removed")
}
