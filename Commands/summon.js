
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            if (message.channel.type == "dm" || message.channel.type == "group" || message.guild == undefined || message.guild == null || (message.guild.members.cache.filter(member => member.user.bot == false).size < 10 && devs.indexOf(id) == -1)) { return functions.replyMessage(message, "You cannot summon a raid in a server with less than 50 members!") }
            raid = { "_id": message.channel.id }
            let level = undefined;
            if (words.length > 1 && admins.indexOf(id) != -1) {
                level = parseInt(words[1])
                if (isNaN(level) || level <= 0) { return functions.replyMessage(message, "Please specify a level.") }
            }
            if (message.channel.type != "dm" && message.channel.name == "treant-raid") {
                if (serverData[message.guild.id].treant != undefined || (serverData[message.guild.id].treant == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a treant raid in this server!") }
                else { serverData[message.guild.id].treant = message.channel.id; functions.setProp("serverData", { "_id": message.guild.id }, { $set: { "treant": message.channel.id } }) }
                functions.summon(raid, level, 0, 25, "Treant Boss", 'https://i.imgur.com/1fbm4us.jpg')
            }
            else if (message.channel.type != "dm" && message.channel.name == "kraken-raid") {
                if (serverData[message.guild.id].kraken != undefined || (serverData[message.guild.id].kraken == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a kraken raid in this server!") }
                else { serverData[message.guild.id].kraken = message.channel.id; functions.setProp("serverData", { "_id": message.guild.id }, { $set: { "kraken": message.channel.id } }) }
                functions.summon(raid, level, 25, 50, "Kraken Boss", 'https://i.imgur.com/mGKIsnX.jpg')
            }
            else if (message.channel.type != "dm" && message.channel.name == "dragon-raid") {
                if (serverData[message.guild.id].dragon != undefined || (serverData[message.guild.id].dragon == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a dragon raid in this server!") }
                else { serverData[message.guild.id].dragon = message.channel.id; functions.setProp("serverData", { "_id": message.guild.id }, { $set: { "dragon": message.channel.id } }) }
                functions.summon(raid, level, 50, 75, "Dragon Boss", 'https://i.imgur.com/YCdZZmT.jpg')
            }
            else if (message.channel.type != "dm" && message.channel.name == "deity-raid") {
                if (serverData[message.guild.id].deity != undefined || (serverData[message.guild.id].deity == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a deity raid in this server!") }
                else { serverData[message.guild.id].deity = message.channel.id; functions.setProp("serverData", { "_id": message.guild.id }, { $set: { "deity": message.channel.id } }) }
                functions.summon(raid, level, 75, 100, "Deity Boss", 'https://i.imgur.com/o842h20.jpg')
            }
            else if (message.channel.type != "dm" && message.channel.name == "hell-raid") {
                if (message.channel.id != 570356602843168769 && devs.indexOf(id) == -1) { return functions.replyMessage(message, "This is for the support server only!") }
                if (serverData[message.guild.id].hell != undefined || (serverData[message.guild.id].hell == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a hell raid in this server!") }
                else { serverData[message.guild.id].hell = message.channel.id; functions.setProp("serverData", { "_id": message.guild.id }, { $set: { "hell": message.channel.id } }) }
                functions.summon(raid, level, 100, 200, "Hell Lord", 'https://imgur.com/MbGhMkJ.jpg', {"pierce": 0.1, "critRate": 0.1}, '10% chance to pierce, 10% chance to crit and deal 2x damage. ')
            }
            else { return functions.replyMessage(message, "Please name the channel either #treant-raid, #kraken-raid, #dragon-raid, or #deity-raid. Join the support server to access #hell-raid, a level 100-200 boss!") }
            functions.replyMessage(message, "A boss has been summoned! It is level "+ raid.level + "!");
            functions.setObject("mobData", raid)
            return;
        }
        if (admins.indexOf(id) == -1) { return functions.replyMessage(message, "You already have a raid in this channel!"); }
        if (words.length == 1) { functions.summon(raid) }
        else {
            let level = undefined
            if (words.length > 1 && admins.indexOf(id) != -1) {
                level = parseInt(words[1])
                if (isNaN(level) || level <= 0) { return functions.replyMessage(message, "Please specify a level.") }
            } 
            functions.summon(raid, level)
        }
        functions.replyMessage(message, "A boss has been summoned! It is level " + raid.level + "!");
        functions.setObject("mobData", raid)
    })
}