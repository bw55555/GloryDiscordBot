var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1]
    if (message.guild.member(id).hasPermission("MANAGE_GUILD") == false && admins.indexOf(id) == -1) { return functions.replyMessage(message, "You must have the permission Manage Server to change the bot's settings!") }
    if (message.channel.type == "dm") { return }
    if (word2 == "prefix") {
        if (words[2] == undefined || words[2] == "") { return functions.replyMessage(message, "You cannot set the prefix to undefined!") }
        serverData[message.guild.id].prefix = words[2]
        functions.replyMessage(message, "GLORY's prefix has been changed to " + words[2])
    }
    if (word2 == "disable") {
        if (serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) {
            return functions.replyMessage(message, "This channel is already disabled!",true)
        }
        functions.replyMessage(message, "Glory has been disabled in this channel and will no longer send messages in it. ",true)
        serverData[message.guild.id].disabledChannels.push(message.channel.id)
    }
    if (word2 == "enable") {
        if (serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) == -1) {
            return functions.replyMessage(message, "This channel is already enabled!",true)
        }
        let indexToSplice = serverData[message.guild.id].disabledChannels.indexOf(message.channel.id)
        serverData[message.guild.id].disabledChannels.splice(indexToSplice, 1)
        functions.replyMessage(message, "Glory has been reenabled in this channel!",true)
    }
}