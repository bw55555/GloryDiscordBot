
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.getObject("mobData", "world")]).then(ret => {
        let raid = ret[0]
        if (raid == false || raid.alive == false) {
            functions.sendMessage(message.channel, "The world boss is dead. Please wait " + functions.displayTime(86400000, Date.now() % 86400000)+" for the boss to be summoned again. ");
            return;
        }
        functions.raidInfo(message, raid)
    })
}