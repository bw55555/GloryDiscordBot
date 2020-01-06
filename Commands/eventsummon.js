var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let time = 0;
    if (words[1] == "-time") {
        time = functions.extractTime(message,words[2])
        if (time === false) { return }
        words.splice(1, 2)
    }
    if (time > 0) { functions.replyMessage(message, "Boss will be summoned in " + functions.displayTime(time, 0)) }
    bot.setTimeout(function () {
        let item = ret[0]
        mobData[message.channel.id] = {};
        mobData[message.channel.id].name = 'Fallen Angel'
        mobData[message.channel.id].url = 'https://i.imgur.com/InedjHz.jpg'
        if (words.length > 1) {
            let summonlevel = parseInt(words[1])
            if (isNaN(summonlevel)) { return functions.sendMessage(message.channel, "The boss level must be an integer!") }
            let summonhp = parseInt(words[2])
            if (isNaN(summonhp)) { return functions.sendMessage(message.channel, "The boss hp must be an integer!") }
            let summonatk = parseInt(words[3])
            if (isNaN(summonatk)) { return functions.sendMessage(message.channel, "The boss atk must be an integer!") }
            let summonreward = parseInt(words[4])
            if (isNaN(summonreward)) { return functions.sendMessage(message.channel, "The boss reward must be an integer!") }
            mobData[message.channel.id].alive = true;
            mobData[message.channel.id].raid = true;
            mobData[message.channel.id].attack = summonatk;
            //mobData[message.channel.id].defense = summondef;
            mobData[message.channel.id].currenthealth = summonhp;
            mobData[message.channel.id].maxhealth = summonhp;
            mobData[message.channel.id].reward = summonreward;
            mobData[message.channel.id].level = summonlevel;
            mobData[message.channel.id].attacklist = [];
        } else if (words.length == 1) {
            //let roll = 1 + ((Math.random() - 0.5) * 0.2);
            let summonlevel = 200 + Math.floor(Math.random() * 100)
            mobData[message.channel.id].alive = true;
            mobData[message.channel.id].raid = true;
            mobData[message.channel.id].attack = Math.floor(summonlevel * 12);
            //mobData[message.channel.id].defense = summondef;
            mobData[message.channel.id].currenthealth = Math.floor(summonlevel * 50);
            mobData[message.channel.id].maxhealth = Math.floor(summonlevel * 50);
            mobData[message.channel.id].reward = Math.floor(summonlevel * 5000);
            mobData[message.channel.id].level = summonlevel;
            //mobData[message.channel.id].itemReward = itemrewardId;
            mobData[message.channel.id].attacklist = [];
        }
        message.channel.overwritePermissions(message.guild.roles.get("536599503608872961"), {
            "READ_MESSAGES": true,
            "SEND_MESSAGES": true
        }).then(function () { functions.replyMessage(message, "Boss summoned. It is level " + mobData[message.channel.id].level + "!\n" + "<@&564565782852272140>"); }).catch(console.error);
    }, time)
}