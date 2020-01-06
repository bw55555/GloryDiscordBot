var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.sendMessage(message.channel, "There is no raid going on in this channel!");
            return;
        }
        functions.raidInfo(message, raid)
    })
}