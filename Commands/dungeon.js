const raidData = require("../Assets/raidData.json")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let command = (words.length == 1) ? "" : words[1].toLowerCase()
    if (functions.isCD(user, ts, "crystalmines")) { return functions.replyMessage(message, "You can only enter the crystal mines once per day. ") }
    if (user.ascension < 3) { return functions.replyMessage(message, "You can only enter the crystal mines at ascension 3. ") }
    if (user.guild == "None") { return functions.replyMessage(message, "You must have a guild to enter the crystal mines. ")}
    if (command == "help") {
        return;
    }
    if (command == "permit") {
        let dungeon = {
            "_id": user._id,
            "maxFloor": 0,
            "floor": 0,
            "raid": {},
            "task": "raid", 
            "crystals": 0,
            "xp": 0
        }
        functions.setObject("dungeonData", dungeon)
        return functions.replyMessage(message, "You may now enter the mines. ")
    }
    return Promise.all([functions.getObject("dungeonData", user._id)]).then(ret => {
        let dungeon = ret[0];
        if (dungeon == false) { return functions.replyMessage(message, "You have not yet acquired a permit to the crystal mines!") }
        if (command == "start" || command == "s") {
            if (dungeon.task == "start") {
                nextFloor(message, dungeon)
            }
        } else if (command == "attack" || command == "atk" || command == "a") {
            if (dungeon.task != "raid") { return functions.replyMessage(message, "You have not yet encountered a monster!") }
            functions.raidAttack(message, user, dungeon.raid, "dungeon", dungeon)
            if (!dungeon.raid.alive) {dungeon.task = "next" }
        } else if (command == "info" || command == "view" || command == "i") {
            if (dungeon.task == "raid") {
                functions.raidInfo(message, dungeon.raid)
            }
        } else if (command == "next") {
            if (dungeon.task == "next") {
                nextFloor(message, dungeon)
            }
        } else if (command == "exit") {
            if (dungeon.task == "next") {
                functions.setProp("guildData", { "_id": user.guild }, { $inc: { "crystals": dungeon.crystals, "xp": dungeon.xp } })
                dungeon.crystals = 0; dungeon.xp = 0;
                dungeon.task = "start";
                functions.setCD(user, ts, functions.secondsUntilReset(ts), "crystalmines")
                functions.replyMessage(message, "You have successfully left the dungeon. Your guild earned " + dungeon.crystals+" crystals and "+dungeon.xp +" xp. ")
            }
        } else if (command == "stats") {
            let text = "```\n"
            text += "Max Floor: " + dungeon.maxFloor + "\n";
            text+="```"
            return functions.replyMessage(message, text)
        } else if (command == "setfloor" && admins.indexOf(id) != -1) {
            let floornum = parseInt(words[2]);
            if (isNaN(floornum) || floornum < 0) { return functions.replyMessage(message, "The dungeon floor must be a positive integer!")}
            dungeon.floor = floornum
        }
        else {
            return functions.replyMessage(message, "This command is not recognized!")
        }
        functions.setObject("dungeonData", dungeon)
    })
}
function nextFloor(message, dungeon) {
    dungeon.floor += 1;
    let base = Math.floor(dungeon.floor / 25)
    if (base > 2) { base = 2 }
    if (dungeon.floor % 5 == 0) {
        if (dungeon.floor % 10 == 0 && dungeon.floor < 50) {
            base += 2;
        } else {
            base += 1;
        }
    }
    let raritytoscroll = { "0": "common", "1": "uncommon", "2": "rare", "3": "epic", "4": "legendary", "c": "common", "u": "uncommon", "r": "rare", "e": "epic", "l": "legendary" }
    let summonrarity = raritytoscroll[base];
    let summonlevel = 2*dungeon.floor+60
    let rarityraids = raidData[summonrarity]
    let raid = rarityraids[Math.floor(rarityraids.length * Math.random())]
    dungeon.task = "raid"
    dungeon.raid = {}
    dungeon.raid._id = "Draid" + dungeon._id
    dungeon.raid.isRaid = true
    dungeon.raid.url = raid.url
    dungeon.raid.name = raid.name;
    dungeon.raid.attack = raid.attack * summonlevel;
    dungeon.raid.currenthealth = summonlevel * raid.health * 4;
    dungeon.raid.maxhealth = summonlevel * raid.health * 4;
    dungeon.raid.reward = summonlevel * raid.reward * 5;
    dungeon.raid.crystalreward = Math.floor(summonlevel * raid.crystalreward / 20);
    dungeon.raid.alive = true;
    dungeon.raid.attacklist = {};
    dungeon.raid.level = summonlevel;
    functions.sendMessage(message.channel, "You encountered a level "+summonlevel+" "+raid.name+"!" )
    functions.raidInfo(message, dungeon.raid)
}