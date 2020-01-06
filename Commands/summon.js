var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            if (message.channel.type == "dm" || message.channel.type == "group" || message.guild == undefined || message.guild == null || (message.guild.members.filter(member => member.user.bot == false).size < 50 && devs.indexOf(id) == -1)) { return functions.replyMessage(message, "You cannot summon a raid in a server with less than 50 members!") }
            raid = {"_id": message.channel.id}
        }
        if (message.channel.type != "dm" && message.channel.name == "treant-raid") {
            if (serverData[message.guild.id].treant != undefined || (serverData[message.guild.id].treant == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a treant raid in this server!") }
            else { serverData[message.guild.id].treant = message.channel.id }
            functions.summon(raid, 0, 25, "Treant Boss", 'https://i.imgur.com/1fbm4us.jpg')
        }
        else if (message.channel.type != "dm" && message.channel.name == "kraken-raid") {
            if (serverData[message.guild.id].kraken != undefined || (serverData[message.guild.id].kraken == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a kraken raid in this server!") }
            else { serverData[message.guild.id].kraken = message.channel.id }
            functions.summon(raid, 25, 50, "Kraken Boss", 'https://i.imgur.com/mGKIsnX.jpg')
        }
        else if (message.channel.type != "dm" && message.channel.name == "dragon-raid") {
            if (serverData[message.guild.id].dragon != undefined || (serverData[message.guild.id].dragon == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a dragon raid in this server!") }
            else { serverData[message.guild.id].dragon = message.channel.id }
            functions.summon(raid, 50, 75, "Dragon Boss", 'https://i.imgur.com/YCdZZmT.jpg')
        }
        else if (message.channel.type != "dm" && message.channel.name == "deity-raid") {
            if (serverData[message.guild.id].deity != undefined || (serverData[message.guild.id].deity == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a deity raid in this server!") }
            else { serverData[message.guild.id].deity = message.channel.id }
            functions.summon(raid, 75, 100, "Deity Boss", 'https://i.imgur.com/o842h20.jpg')
        }
        else if (message.channel.type != "dm" && message.channel.name == "hell-raid") {
            if (message.channel.id != 570356602843168769 && devs.indexOf(id) == -1) { return functions.replyMessage(message, "This is for the support server only!") }
            if (serverData[message.guild.id].hell != undefined || (serverData[message.guild.id].hell == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a hell raid in this server!") }
            else { serverData[message.guild.id].deity = message.channel.id }
            functions.summon(raid, 100, 200, "Hell Lord", 'https://imgur.com/MbGhMkJ.jpg', '25% chance to pierce, 25% chance to crit and deal 2x damage. ')
        }
        else { return functions.replyMessage(message, "Please name the channel either #treant-raid, #kraken-raid, #dragon-raid, or #deity-raid. Join the support server to access #hell-raid, a level 100-200 boss!") }
        functions.setObject("mobData", raid)
    })
}