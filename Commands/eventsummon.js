
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    if (message.channel.id != devData.eventRaidChannel) { return; }
    let time = 0;
    if (words[1] == "-time") {
        if (words[2] == "random") { words[2] = Math.floor(Math.random() * 24) + "h" + Math.floor(Math.random() * 60) + "m" + Math.floor(Math.random() * 60) + "s"}
        time = functions.extractTime(message,words[2])
        if (time === false) { return }
        words.splice(1, 2)
    }
    if (time > 0) { functions.replyMessage(message, "Boss will be summoned in " + functions.displayTime(time, 0)) }
    bot.setTimeout(function () {
        let raid = { "_id": "event" };
        raid.isRaid = true
        let raidoptions = [
            { "name": "Treant King", "url": "https://i.imgur.com/1zjU5kt.jpeg", "level": 100, "health": 500000, "attack": 1000, "reward": 10000000 },
            { "name": "Leviathan", "url": "https://i.imgur.com/x6QeL4U.jpg", "level": 150, "health": 750000, "attack": 1500, "reward": 15000000},
            { "name": "Dragonlord", "url": "https://i.imgur.com/cMile7I.png", "level": 200, "health": 1000000, "attack": 2000, "reward": 20000000 },
            { "name": "Godking", "url": undefined, "level": 250, "health": 1250000, "attack": 2500, "reward": 25000000 },
            { "name": "Lord of the Abyss", "url": undefined, "level": 300, "health": 1500000, "attack": 3000, "reward": 30000000 }
        ]
        let raidnum = 2;
        raid.name = raidoptions[raidnum].name
        raid.url = raidoptions[raidnum].url
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
            raid.attacklist = {};
            raid.damagelist = {};
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
            raid.attacklist = {};
            raid.damagelist = {};
        }
        functions.setObject("mobData", raid)
        message.channel.updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true
        }).then(ret => functions.replyMessage(message, "Boss summoned. It is level " + raid.level + "!\n" + "<@&564565782852272140>"));
    }, time)
}