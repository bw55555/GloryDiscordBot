module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (devData.enable) { return functions.replyMessage(message, "You cannot do this while the bot is enabled!")}
    functions.MessageAwait(message.channel, id, "Are you sure you want to start maintenance?\nIf you are sure, type `confirm`", "confirm", async function (response, extraArgs) {
        let message = extraArgs[0];
        
        await functions.setProp(userData, {}, {
            $set: {
                "equippedSkills": {"A": "None", "B": "None", "C": "None"},
                //"equippedSkills.A": "None",
                //"equippedSkills.B": "None",
                //"equippedSkills.C": "None",
                "statusEffects": {}
            }
        })
        await functions.findObjects("guildData", {}).then(ret => {
            for (let guild of ret) {
                guild.buffs.buff = guild.buffs.attack
                guild.buffs.dbuff = guild.buffs.defense
                delete guild.buffs.attack
                delete guild.buffs.defense
            }
        })
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
}