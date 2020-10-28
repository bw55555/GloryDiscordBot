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
                "equippedSkills": {"A": "None", "B": "None", "C": "None"},
                //"equippedSkills.A": "None",
                //"equippedSkills.B": "None",
                //"equippedSkills.C": "None",
                "statusEffects": {},
                "messageToSend": "",
                "candy": 0,
                "guildbuffs": {},
                "dailyhonor": 0,
                "honor": 0, 
                "maintenance": true
            }, 
            $unset: {
                "skillA": "",
                "skillB": "",
                "skillC": "",
                "ability": ""
            }
        })
        await functions.findObjects("guildData", {}).then(ret => {
            for (let guild of ret) {
                guild.buffs.buff = guild.buffs.attack
                guild.buffs.dbuff = guild.buffs.defense
                delete guild.buffs.attack
                delete guild.buffs.defense
                functions.setProp("userData", { "guild":guild._id }, { $set: { "guild": guild._id, "guildpos": "Member", "guildbuffs": guild.buffs } })
                functions.setObject("guildData", guild)
            }
        })
        await functions.setProp("itemData", { "modifiers": { $exists: false } }, { $set: { "modifiers": {}}})
        await functions.setProp("itemData", { "modifiers.spikes": { $exists: true } }, { $mul: { "modifiers.spikes": 0.5 } })
        await functions.setProp("itemData", { "modifiers.evade": { $exists: true } }, { $inc: { "modifiers.evade": -0.01 } })
        await functions.setProp("itemData", { "modifiers.evade": { $exists: true } }, { $mul: { "modifiers.evade": 2 } })
        await functions.setProp("itemData", { "modifiers.evade": { $exists: true } }, { $inc: { "modifiers.evade": 0.01 } })
        await functions.deleteObjects("mobData", {})
        await functions.setProp("serverData", {}, {
            $unset: {
                "treant": "",
                "kraken": "",
                "deity": "",
                "dragon": "",
                "hell": ""
            }
        })
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
}