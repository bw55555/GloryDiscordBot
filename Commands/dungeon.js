var raidData = Assets.raidData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let command = (words.length == 1) ? "" : words[1].toLowerCase()
    if (user.ascension < 3) { return functions.replyMessage(message, "You can only enter the crystal mines at ascension 3. ") }
    if (user.guild == "None") { return functions.replyMessage(message, "You must have a guild to enter the crystal mines. ")}
    if (command == "help") {
        return;
    }
    if (command == "permit") {
        if (user.dungeonts != undefined) { return functions.replyMessage(message, "You are currently inside the dungeon!")}
        functions.MessageAwait(message.channel, id, "Are you sure you want a dungeon permit? \n**Warning: This will reset your dungeon data if you have already entered the dungeon.**\nEnter `confirm` to continue. ", "confirm", (response, extraArgs) => {
            let dungeon = {
                "_id": user._id,
                "maxFloor": 0,
                "floor": 0,
                "raid": {},
                "task": "start",
                "crystals": 0,
                "xp": 0
            }
            functions.setObject("dungeonData", dungeon)
            return functions.replyMessage(message, "You may now enter the mines. ")
        }, [], "Enter `confirm` to acquire a permit. ")
        return 
    }
    return Promise.all([functions.getObject("dungeonData", user._id)]).then(ret => {
        let dungeon = ret[0];
        if (dungeon == false) { return functions.replyMessage(message, "You have not yet acquired a permit to the crystal mines!") }
        let timeout = false;
        if (!functions.isCD(user, ts, "crystalmines") && user.dungeonts != undefined && functions.calcTime(ts, user.dungeonts) > 600) { leaveDungeon(message, dungeon, user, "timeout") }
        else if (user.currenthealth <= 0) { leaveDungeon(message, dungeon, user, "death")}
        else if (command == "sweep") {
            if (user.dungeonts == undefined && functions.isCD(user, ts, "crystalmines")) { return functions.replyMessage(message, "You can enter the crystal mines in " + functions.displayTime(user.cooldowns.crystalmines, ts)) }
            if (user.dead) {return functions.replyMessage(message, "You cannot enter the dungeon if you are dead!")}
            if (dungeon.task == "start") {
                let startfloor = parseInt(words[2]);
                if (isNaN(startfloor) || startfloor > words[2]) { startfloor = dungeon.maxFloor - 10 }
                if (dungeon.maxFloor < 10) {return functions.replyMessage(message, "Sweeping is unlocked at floor 10.")}
                if (startfloor < 1) {return functions.replyMessage(message, "You cannot sweep below floor 1!")}
                for (let i = 0; i < startfloor; i++) {
                    nextFloor(message, dungeon, true);
                    dungeon.xp += dungeon.raid.reward;
                    dungeon.crystals += dungeon.raid.crystalreward;
                }
                dungeon.ts = ts;
                user.dungeonts = ts;
                user.statusEffects = {};
                user.speed = 0;
                functions.sendMessage(message.channel, "You have swept floors 1 - " + (startfloor) + " of the crystal mines for " + dungeon.xp + " guild xp and " + dungeon.crystals + " crystals. Use `!d next` to keep exploring or `!d exit` to leave. ")
                dungeon.task = "next"
            } else {
                functions.replyMessage(message, "You are already in the crystal mines!")
            }
            
        }
        else if (command == "start" || command == "s") {
            if (user.dungeonts == undefined && functions.isCD(user, ts, "crystalmines")) { return functions.replyMessage(message, "You can enter the crystal mines in " + functions.displayTime(user.cooldowns.crystalmines, ts)) }
            if (user.dead) { return functions.replyMessage(message, "You cannot enter the dungeon if you are dead!") }
            if (dungeon.task == "start") {
                dungeon.ts = ts;
                dungeon.floor = 0;
                user.dungeonts = ts;
                user.statusEffects = {};
                user.speed = 0;
                nextFloor(message, dungeon)
            } else {
                functions.replyMessage(message, "You are already in the crystal mines!")
            }
        } else if (command == "stats") {
            let text = "```\n"
            text += "Max Floor: " + dungeon.maxFloor + "\n";
            text += "```"
            return functions.replyMessage(message, text)
        } else if (command == "setfloor" && admins.indexOf(id) != -1) {
            let floornum = parseInt(words[2]);
            if (isNaN(floornum) || floornum < 0) { return functions.replyMessage(message, "The dungeon floor must be a positive integer!") }
            dungeon.floor = floornum
            functions.replyMessage(message, "The dungeon floor has been set to " + dungeon.floor)
        } else if (dungeon.task == "start") {
            return functions.replyMessage(message, "You have not yet entered the dungeon! Use `!d start`")
        } else if (command == "attack" || command == "atk" || command == "a") {
            if (dungeon.task != "raid") { return functions.replyMessage(message, "You have not yet encountered a monster!") }
            functions.raidAttack(message, user, dungeon.raid, "dungeon", dungeon)
            if (user.dead || user.currenthealth < 0) { leaveDungeon(message, dungeon, user, "death")}
            else if (!dungeon.raid.alive) {dungeon.task = "next" }
        } else if (command == "info" || command == "view" || command == "i") {
            if (dungeon.task == "raid") {
                return functions.raidInfo(message, dungeon.raid, "Total Rewards: "+dungeon.xp + " xp, "+dungeon.crystals +" crystals","Current Floor: "+dungeon.floor)
            } else if (dungeon.task == "next") {
                return functions.sendMessage(message.channel, {
                    embed: {
                        color: 0xF1C40F,
                        fields: [
                            {
                                name: "Current Floor",
                                value: dungeon.floor
                            }
                        ]
                    }
                })
            } else {
                let text = "```\n"
                text += "Max Floor: " + dungeon.maxFloor + "\n";
                text += "```"
                return functions.replyMessage(message, text)
            }
        } else if (command == "next") {
            if (dungeon.task == "next") {
                nextFloor(message, dungeon)
                user.dungeonts = ts;
            } else {
                functions.replyMessage(message, "You cannot go deeper into the mines during an encounter!")
            }
        } else if (command == "exit") {
            if (dungeon.task == "next") {
                leaveDungeon(message, dungeon, user, "exit")
            } else {
                functions.replyMessage(message, "You cannot exit the mines during an encounter!")
            }
        } 
        else {
            return functions.replyMessage(message, "This command is not recognized!")
        }
        functions.setObject("dungeonData", dungeon)
    })
}
function nextFloor(message, dungeon, notext) {
    if (notext != true) { notext = false;}
    dungeon.floor += 1;
    let base = Math.floor(dungeon.floor / 50)
    if (base > 2) { base = 2 }
    if (dungeon.floor % 50 == 0) {
        base += 3;
    }
    else if (dungeon.floor % 10 == 0) {
        base += 2;
    }
    else if (dungeon.floor % 10 >= 5) {
        base += 1;
    }
    let raritytoscroll = { "0": "common", "1": "uncommon", "2": "rare", "3": "epic", "4": "legendary", "5": "mythical", "c": "common", "u": "uncommon", "r": "rare", "e": "epic", "l": "legendary", "m": "mythical" }
    let summonrarity = raritytoscroll[base];
    let summonlevel = 3*dungeon.floor+30
    let rarityraids = raidData[summonrarity]
    let raid = rarityraids[Math.floor(rarityraids.length * Math.random())]
    dungeon.task = "raid"
    dungeon.raid = {}
    dungeon.raid._id = "Draid" + dungeon._id
    dungeon.raid.isRaid = true
    dungeon.raid.url = raid.url
    dungeon.raid.name = raid.name;
    dungeon.raid.attack = raid.attack * summonlevel;
    dungeon.raid.currenthealth = summonlevel * raid.health * 2;
    dungeon.raid.health = summonlevel * raid.health * 2;
    dungeon.raid.reward = summonlevel * raid.reward * 5;
    dungeon.raid.crystalreward = Math.floor(summonlevel * raid.crystalreward / 20);
    dungeon.raid.alive = true;
    dungeon.raid.attacklist = {};
    dungeon.raid.level = summonlevel;
    if (raid.ability != undefined) { dungeon.raid.ability = raid.ability; dungeon.raid.abilitydesc = raid.abilitydesc; }
    if (notext == false) {
        functions.sendMessage(message.channel, "You encountered a level " + summonlevel + " " + raid.name + "!")
        functions.raidInfo(message, dungeon.raid)
    }
}

function leaveDungeon(message, dungeon, user, option) {
    functions.setProp("guildData", { "_id": user.guild }, { $inc: { "crystals": dungeon.crystals, "xp": dungeon.xp } })
    let text = ""
    
    if (option == "timeout") { text = "You ran out of time and you were forced to leave the dungeon. "; dungeon.floor -= 1; }
    else if (option == "death") { text = "You died in the dungeon... "; dungeon.crystals = Math.floor(dungeon.crystals/2); dungeon.xp = Math.floor(dungeon.xp/2); dungeon.floor -= 1; }
    else { text = "You have successfully left the dungeon. ";}
    dungeon.maxFloor = Math.max(dungeon.maxFloor, dungeon.floor)
    text += "Your guild earned " + dungeon.crystals + " crystals and " + dungeon.xp + " xp. "
    dungeon.crystals = 0; dungeon.xp = 0;
    dungeon.task = "start";
    dungeon.raid = {};
    dungeon.floor = 0;
    user.dungeonts = undefined;
    functions.setCD(user, message.createdTimestamp, "daily", "crystalmines")
    functions.replyMessage(message, text)
}