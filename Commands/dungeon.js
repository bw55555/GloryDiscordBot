const raidData = require("../Assets/raidData.json")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let command = (words.length == 1) ? "" : words[1].toLowerCase()
    if (command == "help") {
        return;
    }
    if (command == "permit") {
        let dungeon = {
            "_id": user._id,
            "maxFloor": 0,
            "floor": 0,
            "raid": {},
            "task": "raid"
        }
        functions.setObject("dungeonData", dungeon)
    }
    return Promise.all([functions.getObject("dungeonData", user._id)]).then(ret => {
        let dungeon = ret[0];
        if (dungeon == false) { return functions.replyMessage(message, "You have not yet acquired a permit to the crystal mines!") }
        if (command == "start") {
            
        } else if (command == "attack" || command == "atk") {
            if (dungeon.task != "raid") { return functions.replyMessage(message, "You have not yet encountered a monster!") }
            functions.raidAttack(message, user, dungeon.raid, "dungeon")
        } else if (command == "info" || command == "view") {
            if (dungeon.task == "raid") {
                functions.raidInfo(message, dungeon.raid)
            }
        } else if (command == "stats") {
            let text = "```\n"
            text += "Max Floor: " + dungeon.maxFloor + "\n";
            text+="```"
            return functions.replyMessage(message, "")
        } else {
            return functions.replyMessage(message, "This command is not recognized!")
        }
        functions.setObject("dungeonData", dungeon)
    })
}
function nextFloor(dungeon) {
    let base = Math.floor(dungeon.floor / 25)
    if (base > 2) { base = 2}
    if (dungeon.floor % 5 == 0) {
        if (dungeon.floor % 10 == 0 && dungeon.floor < 50) {
            base += 2;
        } else {
            base += 1;
        }
    }
    let summonrarity = base;
    let summonlevel = dungeon.floor
    let rarityraids = raidData[base]
    let raid = rarityraids[Math.floor(rarityraids.length * Math.random())]
    dungeon.task = "raid"
    dungeon.raid = {}
    dungeon.raid._id = user._id
    dungeon.raid.isRaid = true
    dungeon.raid.url = raid.url
    dungeon.raid.name = raid.name;
    dungeon.raid.attack = raid.attack * summonlevel * 2;
    dungeon.raid.currenthealth = summonlevel * raid.health * 10;
    dungeon.raid.maxhealth = summonlevel * raid.health * 10;
    dungeon.raid.reward = summonlevel * raid.reward * 50;
    dungeon.raid.crystalreward = Math.floor(summonlevel * raid.crystalreward / 100);
    dungeon.raid.alive = true;
    dungeon.raid.attacklist = {};
    dungeon.raid.level = summonlevel;
}