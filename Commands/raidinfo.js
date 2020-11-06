
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.location == "city") { return functions.replyMessage(message, "You cannot do this in the city!") }
    return Promise.all([functions.getObject("mobData", user.location)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.sendMessage(message.channel, "There is no raid going on in this channel!");
            return;
        }
        functions.raidInfo(message, raid)
    })
}