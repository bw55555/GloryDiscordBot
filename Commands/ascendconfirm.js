var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.split(/\s+/)
    //if (admins.indexOf(id) == -1) { return }
    if (userData[id].level < 100) { return functions.replyMessage(message, "You must be level 100 to ascend!") }
    if (userData[id].attack < 100 && userData[id].defense < 100 && userData[id].health < 1000) { return functions.replyMessage(message, "You must be have lvl 100 stats to ascend!") }

    userData[id].sp += 1
    userData[id].ascension += 1
    userData[id].level = 1
    userData[id].attack = 1
    userData[id].defense = 1
    userData[id].health = 10
    userData[id].xp = 0
    userData[id].weapon = false
    if (!userData[id].reroll) {
        userData[id].reroll = 0;
    }
    if (userData[id].ascension % 2 == 1) {
        userData[id].reroll += 1;
    }
    if (!userData[id].glory) {
        userData[id].glory = 10;
    } else {
        userData[id].glory += 10;
    }
    functions.replyMessage(message, "You have ascended! You now have " + userData[id].sp + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
}