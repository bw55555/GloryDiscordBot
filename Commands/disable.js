var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    if (devs.indexOf(message.author.id) == -1) { return }
    global.devData.enable = false
    functions.replyMessage(message, "Glory has been disabled for normal players. ")
    fs.writeFileSync('Storage/devData.json', JSON.stringify(devData, null, 4))
}