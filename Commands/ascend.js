var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    //if (admins.indexOf(id) == -1) { return }
    if (userData[id].level != 100) { return functions.replyMessage(message, "You must be level 100 to ascend!") }
    if (userData[id].attack - functions.calcExtraStat(id, "attack") != 100 && userData[id].defense - functions.calcExtraStat(id, "defense") != 100 && userData[id].health - functions.calcExtraStat(id, "health") != 1000) { return functions.replyMessage(message, "You must have lvl 100 stats to ascend!") }
    /*    userData[id].sp += 1
        userData[id].ascension += 1
        userData[id].level = 1
        userData[id].attack = 1
        userData[id].defense = 1
        userData[id].health = 10
        userData[id].xp = 0
        userData[id].weapon=false */
    new functions.MessageAwait(message.channel, id, "Are you sure you want to Ascend? You will be set back to level 1 and leveling will become 1.5 times as hard!\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let id = extraArgs[1]
        let message = extraArgs[0]
        functions.consumGive(id, "sp", 1)
        userData[id].ascension += 1
        userData[id].level = 1
        userData[id].attack = userData[id].ascension * 10
        userData[id].defense = userData[id].ascension * 10
        userData[id].health = userData[id].ascension * 100
        userData[id].xp = 0
        userData[id].weapon = false
        if (!userData[id].glory) {
            userData[id].glory = 10;
        } else {
            userData[id].glory += 10;
        }
        functions.replyMessage(message, "You have ascended! You now have " + userData[id].consum.sp + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
    }, [message, id]);
    //functions.replyMessage(message,"Are you sure you want to Ascend? You will be set back to level 1 and leveling will become twice as hard!\nIf you are sure, type `!ascendconfirm`")
}