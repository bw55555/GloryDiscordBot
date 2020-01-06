var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (mobData[message.channel.id] == undefined) {
        functions.sendMessage(message.channel, "There is no raid going on in this channel!");
        return;
    }
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        functions.raidInfo(message, raid)
    }
}