
module.exports = async function (message, user) {
    if (user.location == "city") { return functions.replyMessage(message, "You cannot do this in the city!") }
    if (user.location == "guild") {
        if (user.guild == "None") { return functions.replyMessage(message, "You are not in a guild!") }
        return Promise.all([functions.getObject("guildData", guildName)]).then(ret => {
            let guild = ret[0];
            if (guild == undefined || guild.raid == undefined || guild.raid.alive != true) { return functions.replyMessage(message, "You don't have a raid going on!") }
            functions.raidAttack(message, user, guild.raid, "guild", guild)
            if (guild.raid.alive == false) { guild.raid = ts + 1000 * 60 * guild.raid.level }
            functions.setObject("guildData", guild)
        })
    } else {
        return Promise.all([functions.getObject("mobData", user.location)]).then(ret => {
            let raid = ret[0]
            if (raid == false) {
                functions.deleteMessage(message);
                functions.replyMessage(message, "There is no raid where you are!");
                return;
            }
            let type = "raid"
            if (user.location == "world" || user.location == "event") { type = user.location }
            functions.raidAttack(message, user, raid, type)
            functions.setObject("mobData", raid)
        })
    }
}