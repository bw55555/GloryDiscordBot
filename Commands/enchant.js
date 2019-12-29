var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        if (words[2] == undefined || allowedmodifiers.indexOf(words[2]) == -1) { return functions.replyMessage(message, "That is not an allowed modifier!") }
        if (isNaN(parseFloat(words[3]))) { return functions.replyMessage(message, "The modifier must be a float!") }
        if (item.equip == true) { return functions.replyMessage(message, "You cannot enchant an equipped weapon!")}
        item.modifiers[words[2]] = parseFloat(words[3])
        functions.replyMessage(message, "You have successfully enchanted item " + words[1] + " with modifier " + words[2] + " at level " + words[3])
        functions.logCommand(message)
    })
}