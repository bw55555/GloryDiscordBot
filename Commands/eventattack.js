
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    /*
    //if (message.channel.id != devData.eventRaidChannel) { return;}
    if (devData.halloweenevent != undefined && ts > devData.halloweenevent.start && ts < devData.halloweenevent.end) {
        return Promise.all([functions.getObject("mobData", "ghost")]).then(ret => {
            let raid = ret[0]
            if (raid == false) {
                functions.sendMessage(message.channel, "All the ghosts were killed :(");
                return;
            }
            let extratext = "Ghosts Remaining: " + (raid.ghosttotal - raid.ghostcurrent)
            functions.raidAttack(message, user, raid, "ghost")
            functions.setObject("mobData", raid)
        })
    } else {
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
    */
}