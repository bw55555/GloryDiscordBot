
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    //if (admins.indexOf(id) == -1) { return }
    if (user.level != 100) { return functions.replyMessage(message, "You must be level 100 to ascend!") }
    if (user.attack - functions.calcExtraStat(user, "attack") < 100 || user.defense - functions.calcExtraStat(user, "defense") < 100 || user.health - functions.calcExtraStat(user, "health") < 1000) { return functions.replyMessage(message, "You must have lvl 100 stats to ascend!") }
    if (user.weapon != false) { return functions.replyMessage(message, "You must unequip your weapon to ascend!") }
    functions.MessageAwait(message.channel, id, "Are you sure you want to Ascend? You will be set back to level 1 and leveling will become 1.5 times as hard!\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        functions.getUser(id).then(user => {
            let message = extraArgs[0]
            if (user.level != 100) {
                return functions.replyMessage(message, "You are not level 100 yet!");
            }
            if (user.attack - functions.calcExtraStat(user, "attack") < 100 || user.defense - functions.calcExtraStat(user, "defense") < 100 && user.health - functions.calcExtraStat(user, "health") < 1000) { return functions.replyMessage(message, "You must have lvl 100 stats to ascend!") }
            if (user.weapon != false) { return functions.replyMessage(message, "You must unequip your weapon to ascend!") }
            user.level = 1;
            user.attack = (user.ascension + 1) * 10;
            user.defense = (user.ascension + 1) * 10;
            user.health = (user.ascension + 1) * 100;
            user.xp = 0;
            user.weapon = false;
            user.currenthealth = (user.ascension + 1) * 100;
            user.glory += 10;
            user.consum.sp += 1; 
            user.consum.reroll += 1;
            user.ascension += 1;
            functions.completeQuest(user, "ascend", {}, 1)
            functions.setUser(user);
            functions.replyMessage(message, "You have ascended! You now have " + (user.consum.sp) + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
        })
    }, [message], "Please enter `confirm` to ascend. (no caps)");
    //functions.replyMessage(message,"Are you sure you want to Ascend? You will be set back to level 1 and leveling will become twice as hard!\nIf you are sure, type `!ascendconfirm`")
}