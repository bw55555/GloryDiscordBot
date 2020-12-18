
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let loc = user.location
    if (words.length > 1) {loc = words[1]}
    if (loc == "city") { return functions.replyMessage(message, "You cannot do this in the city!") }
    if (loc == "guild") {
        if (user.guild == "None") { return functions.replyMessage(message, "You are not in a guild!") }
        return Promise.all([functions.getObject("guildData", user.guild)]).then(ret => {
            let guild = ret[0];
            if (guild == undefined || guild.raid == undefined || guild.raid.alive != true) { return functions.replyMessage(message, "You don't have a raid going on!") }
            functions.raidInfo(message, guild.raid)
            if (guild.raid.alive == false) { guild.raid = ts + 1000 * 60 * guild.raid.level }
            functions.setObject("guildData", guild)
        })
    } else {
        return Promise.all([functions.getObject("mobData", loc)]).then(ret => {
            let raid = ret[0]
            if (raid == false) {
                functions.sendMessage(message.channel, "There is no raid going on in this location!");
                return;
            }
            functions.raidInfo(message, raid)
        })
    }
}