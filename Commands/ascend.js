
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    //if (admins.indexOf(id) == -1) { return }
    if (user.level != 100) { return functions.replyMessage(message, "You must be level 100 to ascend!") }
    if (user.attack - functions.calcExtraStat(user, "attack") < 100 || user.defense - functions.calcExtraStat(user, "defense") < 100 || user.health - functions.calcExtraStat(user, "health") < 1000) { return functions.replyMessage(message, "You must have lvl 100 stats to ascend!") }
    functions.MessageAwait(message.channel, id, "Are you sure you want to Ascend? You will be set back to level 1 and leveling will become 1.5 times as hard!\nIf you are sure, type `confirm`", "confirm", function (response, extraArgs) {
        functions.getUser(id).then(user => {
            let message = extraArgs[0]
            if (user.level != 100) {
                return functions.replyMessage(message, "You are not level 100 yet!");
            }
            if (user.attack - functions.calcExtraStat(user, "attack") < 100 || user.defense - functions.calcExtraStat(user, "defense") < 100 && user.health - functions.calcExtraStat(user, "health") < 1000) { return functions.replyMessage(message, "You must have lvl 100 stats to ascend!") }
            if (user.weapon != false) { functions.setProp("itemData", { "_id": user.weapon._id }, { $set: {"equip": false}})}
            functions.setProp("userData", { _id: user._id }, { $set: { "level": 1, "attack": (user.ascension + 1) * 10, "defense": (user.ascension + 1) * 10, "health": (user.ascension + 1) * 100, "xp": 0, "weapon": false, "currenthealth": (user.ascension + 1) * 100 }, $inc: { "glory": 10, "consum.sp": 1, "consum.reroll": 1, "ascension": 1 } })
            functions.replyMessage(message, "You have ascended! You now have " + (user.consum.sp + 1) + " skill points!\n(Note that your weapon has been dequipped. Favorite it before smelting everything!)")
        })
    }, [message], "Please enter `confirm` to ascend. (no caps)");
    //functions.replyMessage(message,"Are you sure you want to Ascend? You will be set back to level 1 and leveling will become twice as hard!\nIf you are sure, type `!ascendconfirm`")
}