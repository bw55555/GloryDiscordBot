
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
        let raid = {"_id": message.channel.id};
        raid.name = 'Fallen Angel'
        raid.url = 'https://i.imgur.com/InedjHz.jpg'
        if (words.length > 1) {
            let summonlevel = parseInt(words[1])
            if (isNaN(summonlevel)) { return functions.sendMessage(message.channel, "The boss level must be an integer!") }
            let summonhp = parseInt(words[2])
            if (isNaN(summonhp)) { return functions.sendMessage(message.channel, "The boss hp must be an integer!") }
            let summonatk = parseInt(words[3])
            if (isNaN(summonatk)) { return functions.sendMessage(message.channel, "The boss atk must be an integer!") }
            let summonreward = parseInt(words[4])
            if (isNaN(summonreward)) { return functions.sendMessage(message.channel, "The boss reward must be an integer!") }
            raid.alive = true;
            raid.raid = true;
            raid.attack = summonatk;
            //raid.defense = summondef;
            raid.currenthealth = summonhp;
            raid.maxhealth = summonhp;
            raid.reward = summonreward;
            raid.level = summonlevel;
            raid.attacklist = [];
        } else {
            //let roll = 1 + ((Math.random() - 0.5) * 0.2);
            let summonlevel = 200 + Math.floor(Math.random() * 100)
            raid.alive = true;
            raid.raid = true;
            raid.attack = Math.floor(summonlevel * 12);
            //raid.defense = summondef;
            raid.currenthealth = Math.floor(summonlevel * 50);
            raid.maxhealth = Math.floor(summonlevel * 50);
            raid.reward = Math.floor(summonlevel * 5000);
            raid.level = summonlevel;
            //raid.itemReward = itemrewardId;
            raid.attacklist = [];
        }
        functions.setObject("mobData", raid)
        message.channel.overwritePermissions(message.guild.roles.cache.get("536599503608872961"), {
            "READ_MESSAGES": true,
            "SEND_MESSAGES": true
        }).then(function () { functions.replyMessage(message, "Boss summoned. It is level " + raid.level + "!\n" + "<@&564565782852272140>"); }).catch(console.error);
    }, time)
}