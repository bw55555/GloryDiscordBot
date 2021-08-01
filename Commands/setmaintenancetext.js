module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    //if (devData.enable) { return functions.replyMessage(message, "You cannot do this while the bot is enabled!") }
    functions.MessageAwait(message.channel, id, "Enter the new maintenance text.", (x) => true, async function (response, extraArgs) {
        let message = extraArgs[0];
        devData.maintenancetext = response.content
        functions.setObject("devData", devData)
        //await functions.deleteObjects("mobData", {})
        functions.replyMessage(message, response.content)
    }, [message])
}