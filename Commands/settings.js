
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1]
    if (message.guild.member(id).hasPermission("MANAGE_GUILD") == false && admins.indexOf(id) == -1) { return functions.replyMessage(message, "You must have the permission Manage Server to change the bot's settings!") }
    if (message.channel.type == "dm") { return }
    if (word2 == "prefix") {
        if (words[2] == undefined || words[2] == "") { return functions.replyMessage(message, "You cannot set the prefix to undefined!") }
        serverData[message.guild.id].prefix = words[2]
        functions.setObject("serverData", serverData[message.guild.id])
        functions.replyMessage(message, "GLORY's prefix has been changed to " + words[2])
    }
    if (word2 == "disable") {
        if (serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) {
            return functions.replyMessage(message, "This channel is already disabled!",true)
        }
        functions.replyMessage(message, "Glory has been disabled in this channel and will no longer send messages in it. ",true)
        serverData[message.guild.id].disabledChannels.push(message.channel.id)
        functions.setObject("serverData", serverData[message.guild.id])
    }
    if (word2 == "enable") {
        if (serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) == -1) {
            return functions.replyMessage(message, "This channel is already enabled!",true)
        }
        let indexToSplice = serverData[message.guild.id].disabledChannels.indexOf(message.channel.id)
        serverData[message.guild.id].disabledChannels.splice(indexToSplice, 1)
        functions.setObject("serverData", serverData[message.guild.id])
        functions.replyMessage(message, "Glory has been reenabled in this channel!", true)
    }
    if (word2 == "resetraids") {
        return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
            let svid = message.guild.id;
            if (serverData[svid].treant != undefined) { delete ret[serverData[svid].treant]; delete serverData[svid].treant }
            if (serverData[svid].kraken != undefined) { delete ret[serverData[svid].kraken]; delete serverData[svid].kraken }
            if (serverData[svid].dragon != undefined) { delete ret[serverData[svid].dragon]; delete serverData[svid].dragon }
            if (serverData[svid].deity != undefined) { delete ret[serverData[svid].deity]; delete serverData[svid].deity }
            functions.setObject("mobData", ret)
            functions.setObject("serverData", serverData[message.guild.id])
            functions.replyMessage(message, "All raids have been reset! You may now resummon them with !summon.")
        })
    }
}