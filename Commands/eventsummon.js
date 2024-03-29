
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    if (devData.halloweenevent != undefined && ts > devData.halloweenevent.start && ts < devData.halloweenevent.end) {
        let raid = {};
        raid.ghostmultiplier = 1;
        raid.ghostcurrent = 1;
        raid.ghosttotal = 10001;
        let ro = {};
        let gm = raid.ghostmultiplier
        let mm = 1.0005;
        ro.name = "Ghost"
        ro.url = "https://i.imgur.com/V6IABze.jpeg"
        ro.level = Math.floor(100 * gm);
        ro.attack = Math.floor(10 * ro.level * gm)
        ro.health = Math.floor(50 * ro.level * gm * mm)
        ro.reward = Math.floor(1000 * ro.level * gm * mm)
        ro.candyreward = Math.floor(ro.level / 100 * gm * mm)
        ro.ability = { "evade": 0.05 }
        ro.abilitydesc = "5% chance to evade an attack. "
        functions.customsummon(raid, ro)
        raid._id = "ghost"
        functions.setObject("mobData", raid)
        functions.replyMessage(message, "The ghosts were summoned...")
    } else {
        if (message.channel.id != devData.eventRaidChannel) { return; }
        let options = functions.extractOptions(message, false, ["-preset", "-time"])
        let time = 0;
        if (options.time != undefined) {
            if (options.time == "random") { options.time = Math.floor(Math.random() * 24) + "h" + Math.floor(Math.random() * 60) + "m" + Math.floor(Math.random() * 60) + "s" }
            time = functions.extractTime(message, options.time)
            if (time === false) { return functions.replyMessage(message, "This time is not valid!")}
        }
        let raid = { "_id": "event" };
        raid.isRaid = true
        let raidoptions = [
            { "name": "Treant King", "url": "https://i.imgur.com/1zjU5kt.jpeg", "level": 100, "health": 1000000, "attack": 1000 * (1+100/400), "reward": 20000000 },
            { "name": "Leviathan", "url": "https://i.imgur.com/x6QeL4U.jpg", "level": 150, "health": 1500000, "attack": 1500 * (1 + 150 / 400), "reward": 32000000 },
            { "name": "Dragonlord", "url": "https://i.imgur.com/cMile7I.png", "level": 200, "health": 2000000, "attack": 2000*(1+200/400), "reward": 50000000 },
            { "name": "Godking", "url": "https://i.imgur.com/ENTCcfx.jpg", "level": 250, "health": 2500000, "attack": 2500 * (1 + 250 / 400), "reward": 72000000 },
            { "name": "Lord of the Abyss", "url": "https://i.imgur.com/Mhu1t7M.png", "level": 300, "health": 3000000, "attack": 3000 * (1+300/400), "reward": 100000000 },
            { "name": "Star Queen", "url": "https://cdn.discordapp.com/attachments/547415056065757194/792921517133529098/images.jpeg", "level": 400, "health": 4000000, "attack": 4000*(1+400/400), "reward": 150000000, "ability": {"vulnerable": 3}, "abilitydesc": "Applies 3 vulnerable on attack. "},
            { "name": "Starmie Pinata", "url": "https://cdn.discordapp.com/attachments/744331762146082837/775925715442729010/image0-9.png", "level": 77, "health": 7777777, "attack": 777, "reward": 77777777, "ability": { "stun": 0.07, "silence": 0.07, "critRate": 0.07, "critDamage": 6, "pierce": 0.07, "block": 0.07, "evade": 0.07 }, "abilitydesc": "7% chance to stun, 7% chance to silence, 7% chance to deal a critical and do 7 times the damage, 7% chance to pierce, 7% chance to block, 7% chance to evade" },
            { "name": "Goku Pinata", "url": "https://cdn.discordapp.com/attachments/722206616769790003/789597232424812544/image0.png", "level": 222, "health": 2500000, "attack": 1234, "reward": 66666666 },
            { "name": "Keqing Pinata", "url": "https://cdn.discordapp.com/attachments/531858145480540170/901089548946272316/unknown.png", "level": 126, "health": 2466666, "attack": 666, "reward": 66666666, "ability": { 'stun': 0.06, 'defense': -100 }, "abilitydesc": "6% chance to stun, takes double the damage. " }
        ]
        let raidnum = 4;
        raid.name = raidoptions[raidnum].name
        raid.url = raidoptions[raidnum].url
        if (options.preset != undefined) {
            raidnum = parseInt(options.preset);
            if (options.preset == "random") {raidnum = Math.floor(Math.random()*5)}
            if (isNaN(raidnum) || raidnum < 0 || raidnum > raidoptions.length) { return functions.replyMessage(message, "This preset does not exist!") }
            functions.customsummon(raid, raidoptions[raidnum])

        } else if (words.length > 1) {
            /*
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
            raid.health = summonhp;
            raid.reward = summonreward;
            raid.level = summonlevel;
            raid.attacklist = {};
            raid.damagelist = {};
            */
            return
        } else {
            //let roll = 1 + ((Math.random() - 0.5) * 0.2);
            /*
            let summonlevel = 200 + Math.floor(Math.random() * 100)
            raid.attack = Math.floor(summonlevel * 12);
            //raid.defense = summondef;
            raid.currenthealth = Math.floor(summonlevel * 50);
            raid.health = Math.floor(summonlevel * 50);
            raid.reward = Math.floor(summonlevel * 5000);
            raid.level = summonlevel;
            */
            return
        }
        if (time > 0) { functions.replyMessage(message, "Boss will be summoned in " + functions.displayTime(time, 0)) }
        bot.setTimeout(function () {
            functions.setObject("mobData", raid)
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: true
            }).then(ret => functions.replyMessage(message, "Boss summoned. It is level " + raid.level + "!\n" + "<@&564565782852272140>"));
        }, time)
    }
}