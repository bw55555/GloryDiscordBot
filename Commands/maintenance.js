module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (devData.enable) { return functions.replyMessage(message, "You cannot do this while the bot is enabled!")}
    functions.MessageAwait(message.channel, id, "Are you sure you want to start maintenance?\nIf you are sure, type `confirm`", "confirm", async function (response, extraArgs) {
        let message = extraArgs[0];
        await functions.setProp(mobData, {}, {
            $set: {
                "damagelist": []
            }
        })
        await functions.setProp(itemData, {}, {
            $set: {
                "enchantlevel": 0,
                "numenchants": 0,
                "enhance": {
                    "level": 0,
                    "attack": 0,
                    "defense": 0
                }, 
                "equip": false
            },
            $unset: {
                "enhancementlevel": "",
                "maxenhancement": "",
                "enhancementattempts": ""
            }
        })
        await functions.setProp(userData, {}, {
            $set: {
                "cnumbers": [0, 0],
                "quests": [],
                "contribution": 0,
                "guildbuffs": {},
                "weapon": false,
                "shield": ts + 1000*60*60*24
            },
            $inc: {
                "consum.reroll": 3,
                "box": 100
            }
        })
        await functions.setProp(guildData, {}, {
            $set: {
                "forge": {
                    "level": 0,
                    "enchant": [0, 0, 0],
                    "enhance": [0, 0, 0],
                    "donate": {
                        "money": 0,
                        "materials": 0
                    }
                }
            }
        })
        await functions.findObjects("guildData", {}).then(ret => {
            for (let guild of ret) {
                for (let buffname in guild.buffs) {
                    guild.buffs[buffname] = guild.buffs[buffname].level;
                }
                functions.setProp("userData", { "guild": guild._id }, {"guildbuffs": guild.buffs})
                functions.setObject("guildData", guild)
            }
        })
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
}