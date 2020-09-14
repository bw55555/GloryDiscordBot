
module.exports = async function (message, user) {
    if (message.channel.id != devData.eventRaidChannel) { return;}
    return Promise.all([functions.getObject("mobData", "event")]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.sendMessage(message.channel, "There is no event raid going on!");
            return;
        }
        functions.raidAttack(message, user, raid, "event")
        functions.setObject("mobData", raid)
    })
}