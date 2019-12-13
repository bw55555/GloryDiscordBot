var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (mobData[message.channel.id] == undefined) {
        functions.sendMessage(message.channel, "There is no raid going on in this channel!");
        return;
    }
    functions.raidInfo(message, mobData[message.channel.id])
}