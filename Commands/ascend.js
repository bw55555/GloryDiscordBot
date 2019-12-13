var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    //if (admins.indexOf(id) == -1) { return }
    if (user.level != 100) { return functions.replyMessage(message, "You must be level 100 to ascend!") }
    if (user.attack - functions.calcExtraStat(user, "attack") < 100 || user.defense - functions.calcExtraStat(user, "defense") < 100 && user.health - functions.calcExtraStat(user, "health") < 1000) { return functions.replyMessage(message, "You must have lvl 100 stats to ascend!") }
    return functions.MessageAwait(message.channel, id, "Are you sure you want to Ascend? You will be set back to level 1 and leveling will become 1.5 times as hard!\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        let user = extraArgs[1]
        let message = extraArgs[0]
        user.consum.sp += 1;
        user.consum.reroll += 1;
	    if(user.level != 100){
            return functions.replyMessage(message, "You are not level 100 yet!");
	    }
	    user.level = 1
        user.ascension += 1
        user.attack = user.ascension * 10
        user.defense = user.ascension * 10
        user.health = user.ascension * 100
        user.xp = 0
        user.weapon = false
        if (!user.glory) {
            user.glory = 10;
        } else {
            user.glory += 10;
        }
        functions.replyMessage(message, "You have ascended! You now have " + user.consum.sp + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
    }, [message, user]);
    //functions.replyMessage(message,"Are you sure you want to Ascend? You will be set back to level 1 and leveling will become twice as hard!\nIf you are sure, type `!ascendconfirm`")
}