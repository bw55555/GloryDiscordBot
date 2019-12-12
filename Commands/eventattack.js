var functions = require("../Utils/functions.js")
module.exports = function (message,user) {
    if (message.channel.id != "542171947895881748") { return }
    functions.raidAttack(message, mobData[message.channel.id], true, false, true)
}