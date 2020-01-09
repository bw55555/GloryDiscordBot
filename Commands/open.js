var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let amount = 1
    if (words[1] == undefined) {
        amount = 1
    }
    else if (words[1].toUpperCase() != `ALL`) {
        amount = parseInt(words[1])
        if ((isNaN(amount) || amount < 1)) { return functions.replyMessage(message, "Please specify a valid amount!") }
    } else {
        amount = user.consum.box
        if (amount == 0) {
            functions.replyMessage(message, "You have no boxes!")
            return
        }
    }
    if (amount > 10000) { return functions.replyMessage(message, "You cannot open more than 10000 boxes at once. (cuz lag)")}
    if (user.consum.box < amount) {
        functions.replyMessage(message, "You don't have enough boxes (You have " + user.consum.box + "), silly! Get them by voting or buy them in the shop!")
        return;
    }
    user.consum.box -= amount;
    let text = "You opened " + amount + " boxes and got:\n"
    text += functions.craftItems(message, user, -1, -1, amount)
    if (amount != 1) { functions.replyMessage(message, text) }
}