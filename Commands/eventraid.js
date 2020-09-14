
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.getObject("mobData", "event")]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.sendMessage(message.channel, "There is no event raid going on!");
            return;
        }
        functions.raidInfo(message, raid)
    })
}