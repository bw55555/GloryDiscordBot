
module.exports = async function (message, user) {
    if (devs.indexOf(message.author.id) == -1) { return }
    devData.enable = false
    functions.replyMessage(message, "Glory has been disabled for normal players. ")
    functions.setObject("devData", devData)
}