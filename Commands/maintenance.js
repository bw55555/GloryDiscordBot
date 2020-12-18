module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (devData.enable) { return functions.replyMessage(message, "You cannot do this while the bot is enabled!")}
    functions.MessageAwait(message.channel, id, "Are you sure you want to start maintenance?\nIf you are sure, type `confirm`", "confirm", async function (response, extraArgs) {
        let message = extraArgs[0];
        
        await functions.setProp("userData", {}, {
            $set: {
                "location": "city",
                "guildperms": {},
                "maintenance": true,
                "bag": {},
                "missions": [], 
                "present": 0,
                "ability": {}
            }, 
            $unset: {
                "inventory": "",
                "candy": ""
            }
        })
        await functions.deleteObjects("mobData", {})
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
}