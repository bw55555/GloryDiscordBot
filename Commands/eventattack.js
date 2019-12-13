var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    if (message.channel.id != "542171947895881748") { return }
    functions.raidAttack(message, user, mobData[message.channel.id], true, false, true)
}