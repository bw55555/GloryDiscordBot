var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    target = functions.validate(message)
    if (target == false) { return }
    global.devData.hardbans[target] = true
    functions.replyMessage(message, "<@" + target + "> has been hardbanned... Bye")
    functions.logCommand(message)
    fs.writeFileSync('Storage/devData.json', JSON.stringify(devData, null, 4))
}