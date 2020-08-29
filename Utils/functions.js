async function getUser(uid) {
    return client.db(db).collection("userData").find({ _id: uid }).toArray().then(r => {
        if (r[0] == undefined) {return false }
        return r[0];
    }).catch(err => {
        console.error(err)
        return false
    })
}
async function findUsers(query,projection) {
    return client.db(db).collection("userData").find(query, { "projection": projection }).toArray().then(r => {
        if (r == []) { return false }
        return r;
    }).catch(err => {
        console.error(err)
        return false
    })
}
async function setUser(newuser) {
    return client.db(db).collection("userData").replaceOne({ _id: newuser._id }, newuser, { upsert: true }).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function deleteUser(uid) {
    return client.db(db).collection("userData").deleteOne({ _id: uid }).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function getItem(iid) {
    return client.db(db).collection("itemData").find({ _id: iid }).toArray().then(r => {
        if (r[0] == undefined) { return false }
        return r[0];
    }).catch(err => {
        console.error(err)
        return false
    })
}
async function findItems(query, projection) {
    return client.db(db).collection("itemData").find(query, { "projection": projection }).toArray().then(r => {
        if (r == []) { return false }
        return r;
    }).catch(err => {
        console.error(err)
        return false
    })
}
async function setItem(newitem) {
    return client.db(db).collection("itemData").replaceOne({ _id: newitem._id }, newitem, {upsert:true}).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function deleteItem(iid) {
    return client.db(db).collection("itemData").deleteOne({ _id: iid }).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function getFloorMob(floor) {
    return client.db(db).collection("floorData").find({ floorlevel: floor }).toArray().then(r => {
            if (r[0] == undefined) { return false }
    return r[0];
}).catch(err => {
        console.error(err)
    return false
})
}
async function getObject(coll,oid) {
    return client.db(db).collection(coll).find({ _id: oid }).toArray().then(r => {
        if (r[0] == undefined) { return false }
        return r[0];
    }).catch(err => {
        console.error(err)
        return false
    })
}
async function findObjects(coll, query, projection) {
    return client.db(db).collection(coll).find(query, { "projection": projection }).toArray().then(r => {
        if (r == []) { return false }
        return r;
    }).catch(err => {
        console.error(err)
        return false
    })
}
async function setObject(coll,newobj) {
    return client.db(db).collection(coll).replaceOne({ _id: newobj._id }, newobj, { upsert: true }).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function deleteObject(coll,oid) {
    return client.db(db).collection(coll).deleteOne({ _id: oid }).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function setProp(coll, query, newvalue) {
    return client.db(db).collection(coll).updateMany(query,newvalue).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function bulkWrite(coll, tasks) {
    return client.db(db).collection(coll).bulkWrite(tasks).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
async function deleteObjects(coll, filter) {
    return client.db(db).collection(coll).deleteMany(filter).then(function (r) {
        return true;
    }).catch(function (err) {
        console.error(err)
        return false;
    })
}
function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
function sendMessage(channel, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) { return; }
    if (channel.type != "dm" && channel.type != "group" && (channel.memberPermissions(bot.user) != null && !channel.memberPermissions(bot.user).has("SEND_MESSAGES"))) { return }
    channel.send(text).catch(function (err) {
        console.error(err)
    })
    //console.timeEnd("Message Send")
}
function replyMessage(message, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && message.channel.guild != undefined && serverData[message.guild.id] != undefined && serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) { return; }
    if (message.channel.type != "dm" && message.channel.type != "group" && message.channel.memberPermissions(bot.user) != null && !message.channel.memberPermissions(bot.user).has("SEND_MESSAGES")) { return }
    message.channel.send("<@" + message.author.id + ">, " + text).catch(function (err) {
        console.error(err)
    })
    //console.timeEnd("Message Send")
}
function deleteMessage(message) {
    if (message.channel.guild != undefined && serverData[message.guild.id] != undefined && serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) { return; }
    if (!message.deletable) { return }
    message.delete().catch(function (err) {
        console.error(err)
    })
}

function dmUser(user, text) {
    if (user._id == bot.id || bot.users.get(user._id) == undefined) { return }
    if (user.dmmute != true) bot.users.get(user._id).send(text).catch(function (err) { console.error(err) })
}


function logCommand(message, extratext) {
    if (message.author.bot) { return }
    if (extratext == undefined) { extratext = "" } else { extratext = "|" + extratext }
    sendMessage(bot.guilds.get(debugGuildId).channels.get(debugChannelId), clean(message.author.id + "|" + message.content + "|" + message.createdTimestamp + extratext))
}

async function validate(message, user, spot) {
    if (isNaN(parseInt(spot))) { spot = 1}
    if (spot == 0) { return false; }
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) { return user; }
    if (words.length <= spot) {
        sendMessage(message.channel, "Choose a target!")
        return false;
    }
    let target = words[spot];
    let targetname = words[spot];
    if (target.startsWith('<@') && target.endsWith('>')) {
        target = target.slice(2, -1);
    }
    if (target.startsWith('!')) {
        target = target.slice(1);
    }
    let temptarget = undefined
    if (target.slice(target.length - 5).startsWith("#")) {
        //replyMessage(message,"Ran")
        temptarget = bot.users.find(val => val.discriminator == target.slice(target.length - 4) && val.username == target.slice(0, target.length - 5));
    } else {
        temptarget = bot.users.find(val => val.username == target)
    }
    if (temptarget != undefined) {
        target = temptarget.id
        targetname = temptarget
    }
    if (target == message.author.id) { return user}
    return getUser(target).then(ret => {
        if (ret == false) {
            //Send fail message here
            sendMessage(message.channel, targetname + " is not a real person");
            return false;
        }
        return ret
    })
}
function hasSkill(user, skillid, enable) {
    enable = (enable == false) ? false : true
    if (user.skillA == skillid || user.skillB == skillid || user.skillC == skillid) return enable
    else return false
}
function generateWeaponTemplate(owner, weapon, current, total) {
    let mergetext = weapon.merge //+ " (Merges until next rarity: " + (10-weapon.merge) + ")";
    if (weapon.rarity == 'Unique' || weapon.rarity == 9) {
        mergetext = "This weapon can't be merged"
    }
    if (!weapon.merge) {
        weapon.merge = 0;
    }
    let name = ""
    if (weapon.owner == "event") {
        name = "event"
    } else {
        name = bot.users.get(weapon.owner).username
    }
    return {
        embed: {
            title: "Weapon info for " + name + "\'s weapon",
            color: 0xF1C40F,
            fields: [{
                name: "Owner:",
                value: weapon.owner,
                inline: false,
            }, {
                name: "Weapon Name and ID:",
                value: weapon.name + " (" + weapon._id + ")",
                inline: false,
            }, {
                name: "Attack:",
                value: weapon.attack +"(+"+weapon.enhance.attack+")",
                inline: true,
            }, {
                name: "Defense:",
                value: weapon.defense + "(+" + weapon.enhance.defense + ")",
                inline: true,
            }, {
                name: "Rarity:",
                value: rarities[weapon.rarity],
                inline: false,
            }, {
                name: "Modifiers:",
                value: getModifierText(weapon.modifiers),
                inline: false,
            }, {
                name: "Merges:",
                value: mergetext,
                inline: false,
            }, {
                name: "Favorite:",
                value: JSON.stringify(weapon.favorite),
                inline: false,
            }],
            "footer": {
                "text": "Page " + current + " of " + total
            },
        }
    }
}
function generateGuildTemplate(guild) {
    let xpleft = (Math.pow(guild.level + 1, 4) > guild.xp) ? (Math.pow(guild.level + 1, 4) - guild.xp) + " xp left to next level" : "Ready to upgrade!"
    xpleft = (guild.level == 100) ? "MAX level" : xpleft
    return {
        embed: {
            color: 0xF1C40F,
            thumbnail: {
                "url": guild.icon
            },
            fields: [
                {
                    name: "<:dragonbanner:542171281609457675> Guild Name <:dragonbanner:542171281609457675>",
                    value: guild._id,
                    inline: true
                },
                {
                    name: "<:guildlevel:542188803339845652> Guild Level <:guildlevel:542188803339845652>",
                    value: guild.level + " (" + guild.xp + " xp) (" + xpleft + ")",
                    inline: true
                },
                {
                    name: "<:PandaAdmireWizard:537831495243399168> Guild Leader <:PandaAdmireWizard:537831495243399168>",
                    value: "<@" + guild.leader + ">",
                    inline: true
                },
                {
                    name: "<:mallowhug:541663981895417866> Guild Members <:mallowhug:541663981895417866>",
                    value: guild.members.length,
                    inline: true
                },
                {
                    name: "<:guildbank:542186612964982805> Guild Bank <:guildbank:542186612964982805>",
                    value: guild.bank + " / " + guild.bankmax,
                    inline: true
                },
                {
                    name: "<:materialsgem:542178396474572805> Guild Materials <:materialsgem:542178396474572805>",
                    value: guild.materials + " / " + guild.materialmax,
                    inline: true
                },
                {
                    name: "<:guildcrystal:567335577645613057> Guild Crystals <:guildcrystal:567335577645613057>",
                    value: guild.crystals,
                    inline: true
                }
            ]
        }
    }
}
function generateItem(owner, itemid, attack, defense, rarity, name, modifiers, isBulk) {
    if (modifiers == undefined) { modifiers = {} }
    if (name == undefined) {
        let items = ["Stick", "Pebble", "Rock", "Sling"]
        if (!isNaN(owner.triangleid)) {
            if (owner.triangleid % 3 == 1) {
                items = ["Bow", "Crossbow", "Longbow", "Recurve Bow", "Kunai", "Throwing Stars", "Shuriken", "Throwing Knife"]
            }
            else if (owner.triangleid % 3 == 2) {
                items = ["Amulet", "Staff", "Wand", "Gem", "Talisman", "Spellblade", "Orb", "Tome", "Book", "Crystal", "Runes", "Runestaff", "Arcanics", "Skull", "Rite"]
            }
            else if (owner.triangleid % 3 == 0 && owner.triangleid != 0) {
                items = ["Sword", "Axe", "Spear", "Rapier", "Mace", "Scythe", "Hammer", "Longsword", "Dagger", "Knife", "Scimitar", "Greatsword", "Katana", "Falchion", "Cutlass", "Sabre", "Khopesh"]
            }
            if (attack * 5 < defense) {
                items = ["Shield", "Plate", "Robes", "Armor", "Mail"];
            }
        }
        name = rarities[rarity] + " " + items[Math.floor(Math.random() * items.length)]

    }
    if (itemid == null || itemid == "" || itemid == undefined) {
        itemid = devData.nextItem;
    }
    if (owner != "event") { owner.inventory[itemid] = itemid }
    devData.nextItem++;
    let item = {
        "owner": owner._id, "_id": itemid, "equip": false, "attack": attack, "defense": defense, "rarity": rarity, "modifiers": modifiers, "name": name, "enhance": {"level": 0, "attack": 0, "defense": 0}, "enchantlevel": 0, "numenchants": 0, "favorite": false, "merge": 0 }
    if (isBulk != true) {
        setItem(item)
        setObject("devData", devData)
    }
    completeQuest(owner, "getItem", { "item": item }, 1)
    return item;
}

function generateRandomItem(owner, rarity, isBulk) {
    //console.log(owner)
    //console.log(rarity)
    rarity = parseInt(rarity)
    if (isNaN(rarity)) {
        let randomfactor = 1000000 * Math.random()
        let chances = [100000, 333333, 333333, 183334, 49000, 900, 90, 10]
        let prefixsum = 0
        for (var i = 0; i < chances.length; i++) {
            prefixsum += chances[i]
            if (randomfactor < prefixsum) { break }
        }
        rarity = i
    }
    let total = 0
    if (rarity == 0) {
        total = Math.floor((Math.random()) * 5 + 1)
    } else {
        total = Math.floor(raritystats[rarity - 1] + 1 + (raritystats[rarity] - raritystats[rarity - 1]) * Math.random())
    }
    let attack = Math.floor(Math.random() * (total + 1))
    let defense = total - attack

    let item = generateItem(owner, null, attack, defense, rarity, undefined, undefined, isBulk)
    return item
}
function calcExtraStat(user, stat) {
    const statlevels = { "health": 100, "attack": 10, "defense": 10 }
    let extrastat = user.ascension * statlevels[stat]
    if (stat == "health") {
        if (user.weapon != false && user.weapon != undefined && user.weapon.modifiers.maxhp != undefined) extrastat += user.weapon.modifiers.maxhp
    }
    return extrastat
}
function calcLuckyBuff(user) {
    let luckybuff = 1
    if (user.weapon != false && user.weapon != undefined) { //lucky enchant
        if (user.weapon.modifiers.lucky != undefined) {
            luckybuff = user.weapon.modifiers.lucky
        }
    }
    if (hasSkill(user, 16)) { //Royalty Skill
        luckybuff += 0.5
    }
    if (user.guild != "None" && user.guildbuffs.lucky != undefined) {
        luckybuff += user.guildbuffs.lucky.value
    }
    luckybuff += user.glory * 0.01;
    if (user.vip != undefined) {
        luckybuff += user.vip.lucky;
    }
    return luckybuff
}
function errorlog(text) {
    if (!bot.guilds.has("536599503608872961")) {return}
    if (!bot.guilds.get("536599503608872961").channels.has("538526944141246486")) {return}
    sendMessage(bot.guilds.get("536599503608872961").channels.get("538526944141246486"),text)
}
function setCD(user, ts, cdsecs, cdname) {
    //if (user.cooldowns[cdname] == undefined) { errorlog("Something went wrong with setCD. " + cdname + " not defined." + user._id + "|" + ts) }
    if (user.weapon != false && user.weapon.modifiers.haste != undefined) { cdsecs -= parseInt(user.weapon.modifiers.haste) }
    user.cooldowns[cdname] = ts + cdsecs * 1000
}
function calcTime(time1, time2) {
    if (time1 == undefined || time2 == undefined) { return -1;}
    return Math.floor((time1 - time2) / 1000)
}
function displayTime(time1, time2) {
    let totalseconds = calcTime(time1, time2)
    let hours = Math.floor(totalseconds / 3600)
    totalseconds -= 3600 * hours
    let minutes = Math.floor(totalseconds / 60)
    if (minutes < 10) { minutes = "0" + minutes }
    let seconds = totalseconds - 60 * minutes
    if (seconds < 10) { seconds = "0" + seconds }
    return hours + ":" + minutes + ":" + seconds
}
function extractTime(message,timeword) {
    let time = 0;
    let regexp = /\b([0-9]+h)?([0-9]+m)?([0-9]+s)?\b/
    if (timeword == undefined) { return time}
    if (timeword != undefined && regexp.test(timeword)) {
        let saveindex = 0
        const timevalues = { "h": 3600000, "m": 60000, "s": 1000 }
        for (var i = 0; i < timeword.length; i++) {
            if (timevalues[timeword.slice(i, i + 1)] != undefined) {
                if (isNaN(parseInt(timeword.slice(saveindex, i)))) { replyMessage(message, "Something happened. The regex broke.");return false }
                time += parseInt(timeword.slice(saveindex, i)) * timevalues[timeword.slice(i, i + 1)]
                saveindex = i + 1
            }
        }
    } else {
        replyMessage(message, "Please specify a valid time. Ex. 1h2m3s")
        return false;
    }
    return time;
}
///---------------------
function calcDamage(message, attacker, defender, initiator) {
    let text = ""
    let roll = Math.random()
    let burn = 0;
    let skillenable = true;
    if (defender.name == "Charybdis") { skillenable = false }
    if (attacker.name == "Charybdis") { skillenable = false }
    let defendername = defender.name
    if (defendername == undefined) { defendername = "<@" + defender._id + ">" }
    let attackername = attacker.name
    if (attackername == undefined) { attackername = "<@" + attacker._id + ">" }
    let evadechance = Math.random()
    let evaderate = 0;
    if (defender.name == "Will-o'-the-wisp") {
        evaderate += 0.95
    }
    if (defender.isRaid != true && defender.weapon != false && defender.weapon.modifiers.evade != undefined) {
        evaderate += defender.weapon.modifiers.evade
    }
    if (evadechance < evaderate) {
        sendMessage(message.channel, attackername + ", "+defendername + " has evaded the attack!")
        return 0
    }
    let attack = 0;
    if (attacker.isRaid != true) {
        if (defender.isRaid != true && hasSkill(defender, 23, skillenable)) {
            attack = calcStats(message, attacker, "attack", skillenable, true);
        } else {
            attack = calcStats(message, attacker, "attack", skillenable);
        }
    } else {
        attack = attacker.attack;
        if (attacker.name == "Hell Lord") {
            if (Math.random() > 0.75) {
                attack = attack * 2
                text += attackername +" just dealt critical damage!\n"
            }
        }
        
    }
    let defense = 0;
    if (defender.isRaid != true) {
        if (attacker.isRaid != true && hasSkill(attacker, 23, skillenable)) {
            defense = calcStats(message, defender, "defense", skillenable, true);
        } else {
            defense = calcStats(message, defender, "defense", skillenable);
        }
    }
    if (attacker.isRaid != true && defender.isRaid != true) {
        if ((attacker.triangleid - defender.triangleid) % 3 == 2) {
            if (hasSkill(attacker, 13, skillenable)) {
                attack *= 1.8
            } else {
                attack *= 1.4
            }
        }
        if (hasSkill(defender, 37) && attacker.speed > 0) {
            attacker.speed = 0
            text += attackername+"'s tempo was dispelled!\n"
        }
    }

    let weapon = (attacker.isRaid != true && attacker.weapon != false) ? attacker.weapon : false
    let dweapon = (defender.isRaid != true && defender.weapon != false) ? defender.weapon : false
    //attacker only skills
    let piercechance = Math.random()
    let piercerate = 0
    if (attacker.isRaid != true) {

        if (weapon != false && weapon.modifiers.pierce != undefined) { piercerate += weapon.modifiers.pierce }

        if (hasSkill(attacker, 6, skillenable)) {
            piercerate += 0.2;
        }
        if (hasSkill(attacker, 28, skillenable)) {
            piercerate += 0.05;
        }
        if (attacker.isRaid != true && attacker.guild != "None" && attacker.guildbuffs.pierce != undefined) {
            piercerate += attacker.guildbuffs.pierce.value
        }

    } else {
        if (attacker.name == "Godzilla") {
            piercerate += 1
        }
        if (attacker.name == "Hell Lord") {
            piercerate += 0.25
        }
    }
    if (piercechance < piercerate) {
        if (defender._id == undefined) {
            attack *= 1.5
        } else {
            defense = 0
        }
        text += attackername + " has pierced their opponents defense!\n"
        if (attacker.isRaid != true && hasSkill(attacker, 28, skillenable)) {
            attack *= 1.2
        }
    }

    //Both?
    let spikedmod = 0;
    if (dweapon != false && dweapon.modifiers.spikes != undefined) {
        spikedmod += dweapon.modifiers.spikes
    }
    if (defender.isRaid != true && defender.guild != "None" && defender.guildbuffs.spikes != undefined) {
        spikedmod += defender.guildbuffs.spikes.value
    }
    if (defender.isRaid != true) {
        if (hasSkill(defender, 7, skillenable)) {
            spikedmod += 0.5;
        }
        if (hasSkill(defender, 31, skillenable)) {
            spikedmod += 0.2;
        }
    }
    if (spikedmod > 0) {
        let spiked = Math.floor(defense * spikedmod)
        if (attacker.isRaid != true) {
            if (hasSkill(attacker, 37)) { text += defendername + "'s spikes was dispelled!\n" }
            else {
                attacker.currenthealth -= spiked
                text += attackername + " has been damaged for " + spiked + " health due to spikes!\n"
            }
            if (defender.isRaid != true) {
                if (hasSkill(defender, 31, skillenable)) {
                    if (hasSkill(attacker, 37)) { text += defendername + "'s burn was dispelled!\n" }
                    else {
                        if (attacker.burn == undefined) { attacker.burn = 0 }
                        attacker.burn += spikedmod * 5; //Burn status, if burning, have a chance to take 5% damage after talking.
                        text += attackername + " is now burning!"
                    }
                }
            }
        } else {
            attack += spiked;
            text += defendername + " has damaged the raid boss with spikes!\n"
        }
    }

    //burn check
    if (attacker.isRaid != true) {
        if (weapon != false && weapon.modifiers.burn != undefined) {
            burn += weapon.modifiers.burn
        }
        if (hasSkill(attacker, 36, skillenable)) {
            burn += 1;
        }
    } else {
        if (attacker.name == "Ignis") {
            burn += 5;
        }
    }
    if (defender.isRaid != true && hasSkill(defender, 37)) {
        text += attackername + "'s burn was dispelled!\n"
        burn = 0
    }
    if (burn > 0) {
        if (defender.isRaid != true) {
            if (defender.burn == undefined) { defender.burn = 0}
            defender.burn += burn;
            text += defendername + " is now burning!\n"
        } else {
            text += "Raid boss cannot be burned!\n"
        }
    }


    let blockrate = 0;
    let blockchance = Math.random()
    if (defender.isRaid != true && defender.guild != "None" && defender.guildbuffs.block != undefined) {
        blockrate += defender.guildbuffs.block.value
    }
    if (defender.isRaid != true && defender.dead == false) {
        if (dweapon != false && dweapon.modifiers.block != undefined) {
            blockrate += dweapon.modifiers.block
        }
        if (hasSkill(defender, 10, skillenable)) {
            blockrate += 0.15;
        }
        if (hasSkill(defender, 30, skillenable)) {
            blockrate += 0.05;
        }

    } else if (defender._id == undefined) {
        if (defender.name == "Baba Yaga") {
            blockrate += 0.2
        }
        if (defender.name == "Asmodeus") {
            blockrate += 0.2
        }
    }

    if (blockrate > blockchance) {
        if (piercechance < piercerate) {
            text += defendername + " has blocked the attack, but " + attackername + " pierced though anyway!\n"
        } else {
            text += defendername + " has blocked the attack!\n"
            attack = 0;
            if (defender.isRaid != true && hasSkill(defender, 30, skillenable)) {
                defender.bolster = true
                text += defendername + " was bolstered!\n"
            }
        }
    }

    
    if (attacker.isRaid != true) {
        if (hasSkill(attacker, 22, skillenable)) {
            let leech = 0
            if (defender.isRaid != true) {
                leech = Math.floor(0.05 * defender.currenthealth);
                attacker.currenthealth += leech
                defender.currenthealth -= leech
                text += attackername + " leeched **" + leech + "** health!\n";
            }
        }
    }
    //defender only skills
    let revmod = 0;
    let revengechance = Math.random()
    if (defender.isRaid != true) {
        if (attacker._id == initiator._id && dweapon != false && dweapon.modifiers.revenge != undefined) {
            revmod += dweapon.modifiers.revenge;
        }

        if (hasSkill(defender, 8, skillenable)) {
            revmod += 0.02;
        }
        if (hasSkill(defender, 32, skillenable)) {
            revmod += 0.005;
            revmod *= 2;
        }
        if (defender.isRaid != true && defender.guild != "None" && defender.guildbuffs.revenge != undefined) {
            revmod += defender.guildbuffs.revenge.value
        }
    }

    if (attacker.isRaid != true) {
        if (revengechance < revmod) {
            attacker.currenthealth = 0;
            text += defendername + " has avenged the attack!\n"
            //return false
        }
    } else {
        if (attacker.name == "Medusa" && revengechance < 0.15) {
            defender.currenthealth = 0;
            text += defendername + " has been turned to stone! (And killed)\n"
        }
        else if (attacker.name == "Asmodeus" && revengechance < 0.1) {
            defender.currenthealth = 0;
            text += defendername + " has been beheaded! (And killed)\n"
        }
        else if (attacker.name == "Godzilla" && revengechance < 0.2) {
            defender.currenthealth = 0;
            text += defendername + " has been squashed! (And killed)\n"
        }
    }

    //Percentage increases
    if (defender.isRaid != true && attacker._id == initiator._id) {
        if (hasSkill(defender, 19, skillenable)) {
            defense *= 1.2;
        }
    }
    if (attacker.isRaid != true && attacker._id == initiator._id) {
        if (hasSkill(attacker, 18, skillenable)) {
            attack *= 1.2;
        }
    }
    //console.log("Counter")
    let x = Math.floor(attack * 0.75 * roll + attack * 0.25);
    let defmult = 10;
    let truedamage = x;
    if (defmult * defense > x) {
        truedamage = Math.floor(x * Math.pow(1 - (Math.sqrt(defmult * defmult * defense * defense - x * x)/(defmult*defense)), (1/3)))
    }
    //Last Breath Check
    if (defender.isRaid != true) {
        if (hasSkill(defender, 25, skillenable) && !isCD(defender, message.createdTimestamp, "lastbreath")) {
            if (truedamage > defender.currenthealth && defender.currenthealth * 2 > defender.health) {
                defender.currenthealth = truedamage + 1
                text += defendername + " has activated Last Breath!"
                setCD(defender, message.createdTimestamp, 180, "lastbreath");
            }
        }
    }
    if (truedamage > defender.currenthealth && defender.isRaid) { truedamage = defender.currenthealth}
    if (attacker.isRaid != true) {
        let lifesteal = (attacker.triangleid == 11) ? 0.15 : 0;
        if (attacker.isRaid != true && attacker.guild != "None" && attacker.guildbuffs.lifeSteal != undefined) {
            lifesteal += attacker.guildbuffs.lifeSteal.value
        }
        if (weapon != false && weapon.modifiers.lifeSteal != undefined) {
            lifesteal += weapon.modifiers.lifeSteal
        }
        if (hasSkill(attacker, 3, skillenable)) {
            lifesteal += 0.1;
        }
        if (hasSkill(attacker, 21, skillenable)) {
            if (attacker.currenthealth >= attacker.health) {
                lifesteal += 0.5;
            }
        }
        if (lifesteal > 0) {
            let stealAmount = Math.abs(Math.floor(truedamage * lifesteal))
            if (stealAmount < 0) { stealAmount = 0 }
            attacker.currenthealth += stealAmount
            text += attackername + " lifestole **" + stealAmount + "** health!\n";
        }
    }
    if (text != "") { sendMessage(message.channel, text) }
    return truedamage
}
function calcStats(message, user, stat, skillenable,confused) {
    skillenable = (skillenable == false) ? false : true
    confused = (confused == true) ? true : false
    let text = ""
    let attack = user.attack
    let defense = user.defense
    if (confused) {
        attack = user.defense
        defense = user.attack
    }
    let buff = user.trianglemod;
    let dbuff = 1;
    let critrate = 0;
    critrate = (user.triangleid == 4) ? 0.08 : 0;
    let critdmg = (user.triangleid == 4) ? 3 : 2;
    let rage = (user.triangleid == 6) ? 1 : 0;
    let sacrifice = (user.triangleid == 311) ? 0.15 : 0;
    let tempo = 0;
    let antitempo = 0;
    if (user.guild != "None" && user.guildbuffs.attack != undefined) {
        buff += user.guildbuffs.attack.value
    }
    if (user.guild != "None" && user.guildbuffs.defense != undefined) {
        dbuff += user.guildbuffs.defense.value
    }
    if (user.guild != "None" && user.guildbuffs.critDamage != undefined) {
        critdmg += user.guildbuffs.critDamage.value
    }
    if (user.guild != "None" && user.guildbuffs.critRate != undefined) {
        critrate += user.guildbuffs.critRate.value
    }
    if (user.guild != "None" && user.guildbuffs.tempo != undefined) {
        tempo += user.guildbuffs.tempo.value
    }
    if (user.guild != "None" && user.guildbuffs.sacrifice != undefined) {
        sacrifice += user.guildbuffs.sacrifice.value
    }
    if (user.guild != "None" && user.guildbuffs.rage != undefined) {
        rage += user.guildbuffs.rage.value
    }
    if (user.weapon != false && user.weapon != undefined) {
        if (user.weapon.modifiers == undefined) { user.weapon.modifiers = {} }
        if (user.weapon.modifiers.critRate != undefined) {
            critrate += user.weapon.modifiers.critRate
        }
        if (user.weapon.modifiers.critDamage != undefined) {
            critdmg += user.weapon.modifiers.critDamage
        }

        if (user.weapon.modifiers.rage != undefined) {
            rage += user.weapon.modifiers.rage
        }
        if (user.weapon.modifiers.sacrifice != undefined) {
            sacrifice += user.weapon.modifiers.sacrifice
        }
        if (user.weapon.modifiers.tempo != undefined) {
            tempo += user.weapon.modifiers.tempo
        }
    }
    //if (user.skills == undefined) { user.skills = {} }
    if (hasSkill(user, 0, skillenable)) {
        attack += 20;
    }
    if (hasSkill(user, 1, skillenable)) {
        defense += 20;
    }
    if (hasSkill(user, 2, skillenable)) {
        rage += .7;
    }
    if (hasSkill(user, 4, skillenable)) {
        sacrifice += 0.2;
    }
    if (hasSkill(user, 5, skillenable)) {
        tempo += 1;
    }
    if (hasSkill(user, 9, skillenable)) {
        critrate += 0.06;
    }
    if (hasSkill(user, 12, skillenable)) {
        if (user.health == user.currenthealth) {
            buff += 0.5;
            /*buff += 1;
            dbuff += 1;*/
        }
    }
    if (hasSkill(user, 17, skillenable)) {
        attack += 50;
        defense -= 50;
    }
    if (hasSkill(user, 26, skillenable)) {
        sacrifice += 0.05
    }
    if (hasSkill(user, 27, skillenable)) {
        critrate += 0.01
        critdmg += 2
    }
    if (hasSkill(user, 29, skillenable)) {
        rage += 0.3
    }
    if (hasSkill(user, 33, skillenable)) {
        antitempo += 1;
    }

    if (user.bolster == true) {
        buff += 0.5;
        dbuff += 0.5;
        user.bolster = false;
    }

    if (stat == "attack") {

        if (user.weapon != false && user.weapon != undefined) {
            if (confused) {
                attack += user.weapon.defense + user.weapon.enhance.defense;
            } else {
                attack += user.weapon.attack+ user.weapon.enhance.defense;
            }
            
        }
        if (rage > 0) {
            let x = user.currenthealth / user.health
            if (hasSkill(user, 29, skillenable)) {
                x = user.currenthealth / (user.health * 2)
            }
            x = Math.sqrt(x)
            buff += (rage * -1 * (Math.log(x) + 0.15));
            
        }
        if (sacrifice > 0) {
            buff += sacrifice
            if (hasSkill(user, 26, skillenable)) {
                //user.currenthealth += Math.floor(buff * attack * sacrifice)
                text += "<@" + user._id + "> \"sacrificed\" **" + Math.floor(buff * attack * sacrifice) + "** Health, but mysteriously just didn't!\n";
            } else {
                user.currenthealth -= Math.floor(buff * attack * sacrifice)
                text += "<@" + user._id     + "> sacrificed **" + Math.floor(buff * attack * sacrifice) + "** Health!\n";
            }
        }

        let urspeed = user.speed
        if (tempo > 0) {

            if (urspeed > 25) {
                urspeed = 25
            }
            buff += ((urspeed * 0.05 * tempo));
            text += "<@" + user._id + "> has **" + urspeed + "** tempo\n";
        }
        if (antitempo > 0) {

            if (urspeed > 25) {
                urspeed = 25
            }
            dbuff += ((urspeed * 0.05 * antitempo));
            text += "<@" + user._id + "> has **" + urspeed + "** antitempo\n";
        }

        if (hasSkill(user, 20, skillenable)) {
            if (urspeed > 25) {
                urspeed = 25
            }
            critrate += 0.008 * urspeed;
            text += "<@" + user._id + "> has **" + (Math.floor(critrate * 1000) / 10) + "%** chance of hitting a critical\n"
        }

        let critchance = Math.random();
        if (critchance < critrate) {
            text += "<@" + user._id + "> just dealt critical damage!\n";
            buff += critdmg-1;
        }

        if (text != "") { sendMessage(message.channel, text) }
        return Math.floor(buff * attack)

    }
    if (stat == "defense") {
        if (user.weapon != false && user.weapon != undefined) {
            if (!confused) {
                defense += user.weapon.defense+user.weapon.enhance.defense;
            } else {
                defense += user.weapon.attack+user.weapon.enhance.attack;
            }

        }
        if (text != "") { sendMessage(message.channel, text) }
        return Math.floor(dbuff * defense)
    }
}
///---------------
async function voteItem(message, user, dm) {
    dm = dm == true ? true : false
    let ts = message.createdTimestamp
    let words = message.content.trim().split(/\s+/)
    return validate(message,user).then(target => {
        if (target == false) { return }
        let text = ""
        if (target.votestreak == undefined) { target.votestreak = 0 }
        if (target.votestreaktime == undefined) { target.votestreaktime = ts }
        if (calcTime(target.votestreaktime, ts) < 0) {
            text = "You lost your streak of " + target.votestreak + " :("
            target.votestreak = 0
        } else if (calcTime(target.votestreaktime, ts) > 11 * 60 * 60 && words[2] != "override") {
            return sendMessage(message.channel, "It hasn't been 12 hours yet... DBL broke down :(")
        } else {
            text = "You have a streak of " + (target.votestreak + 1) + "!"
        }
        target.votestreak += 1
        target.votestreaktime = ts + 24 * 60 * 60 * 1000
        let numboxes = Math.ceil((1 + target.ascension) * Math.sqrt(target.votestreak) / 2)

        if (target.glory != undefined && target.glory < 100) {
            target.glory += Math.random() * 0.5;
        }
        target.consum.box += numboxes
        completeQuest(target, "vote", {"votestreak":target.votestreak}, 1)
        sendMessage(message.channel, "<@" + target._id + "> has been given " + numboxes + " boxes!\n" + text)
        if (dm) dmUser(target, "Thank you for voting! You have been given " + numboxes + " boxes!\n" + text)
        setUser(target)
    })
}
function craftItems(message, owner, minrarity, maxrarity, amount) {
    amount = (isNaN(parseInt(amount))) ? 1 : parseInt(amount)
    if (amount > 1) {
        let getrarities = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let tasks = [];
        for (var i = 0; i < amount; i++) {
            let item = craftItem(message, owner, minrarity, maxrarity, false, true);
            tasks.push({
                insertOne:
                {
                    "document": item
                }
            })
            rarity = item.rarity
            getrarities[rarity] += 1
        }
        setObject("devData", devData);
        bulkWrite("itemData", tasks);
        let text = ""
        for (var i = 0; i < 9; i++) {
            if (getrarities[i] == 0) { continue }
            text += global.rarities[i] + ": " + getrarities[i] + "\n"
        }
        return text
    } else {
        let item = craftItem(message, owner, minrarity, maxrarity, true);
        return ""
    }
}
function craftItem(message,owner, minrarity, maxrarity, reply, isBulk) {
    reply = (reply == false) ? false : true
    let item;
    if (minrarity == -1 || maxrarity == -1 || minrarity == undefined || maxrarity == undefined) {
        item = generateRandomItem(owner,undefined,isBulk)
    } else {
        let rarity = Math.floor((maxrarity - minrarity + 1) * Math.random() + minrarity)
        item = generateRandomItem(owner, rarity, isBulk)
    }
    if (reply) sendMessage(message.channel, "<@" + owner._id + "> has recieved an item with id " + item._id + " and of rarity " + item.rarity)
    return item
}
function raidInfo(message, raid) {
    let itemRewardText = ""
    if (raid.itemReward != undefined) {
        itemRewardText = "\n**Item Reward Id:** " + raid.itemReward
    }
    let abilitytext = ""
    if (raid.ability != undefined) {
        abilitytext = "\n**Ability:** " + raid.ability
    }
    sendMessage(message.channel, {
        embed: {
            thumbnail: {
                "url": raid.url
            },
            color: 0xF1C40F,
            fields: [
                {
                    name: "Level " + raid.level + " " + raid.name,
                    value: "**Health Remaining:** " + raid.currenthealth + "\n**Max Attack:** " + raid.attack + "\n**Reward:** " + raid.reward + " Money and XP" + itemRewardText + abilitytext
                }
            ]
        }
    });
}


function summon(raid, level, minlevel, maxlevel, name, image, ability) {
    raid.isRaid = true;
    raid.alive = true;
    if (name != undefined) {
        raid.name = name;
    }
    if (minlevel != undefined) {
        raid.minlevel = minlevel;
    }
    if (maxlevel != undefined) {
        raid.maxlevel = maxlevel;
    }
    if (image != undefined) {
        raid.url = image;
        if (image == -1) {
            raid.url = 'https://i.imgur.com/NsBoS0u.jpg';
        }
    }
    if (ability != undefined) {
        raid.ability = ability;
    }
    let summonlevel = Math.floor((raid.minlevel) + (((raid.maxlevel) - (raid.minlevel)) * Math.random())) + 1
    if (level != undefined && !isNaN(level)) { summonlevel = level}
    if (raid._id == "world") { 
        //world boss
        raid.attack = Math.floor(summonlevel * 15);
        raid.currenthealth = summonlevel * 100 * (Math.floor(2 * summonlevel / 25) + 1);
        raid.maxhealth = summonlevel * 100 * (Math.floor(2 * summonlevel / 25) + 1);
        raid.reward = Math.floor(summonlevel * 5000);
        raid.level = summonlevel;
        raid.attacklist = {};
        raid.damagelist = {};
    } else {
        if (level != undefined) { summonlevel = level }
        raid.attack = summonlevel * 10;
        raid.currenthealth = summonlevel * 5 * (Math.floor(2 * summonlevel / 25) + 1);
        raid.maxhealth = summonlevel * 5 * (Math.floor(2 * summonlevel / 25) + 1);
        raid.reward = summonlevel * 500;
        raid.level = summonlevel;
        raid.attacklist = {};
        raid.damagelist = {};
    }
}
function checkProps(message,user) {
    let ts = message.createdTimestamp;
    if (user.username != message.author.username) user.username = message.author.username; //Creates object with name as username
    if (!user.money) user.money = 0; //gives money object
    if (!user.health) user.health = 10; //Health
    if (!user.currenthealth) user.currenthealth = 0; //Health
    if (!user.xp) user.xp = 0; //XP
    if (!user.level) user.level = 1; //XP
    if (!user.attack) user.attack = 0; //character's attack
    if (!user.defense) user.defense = 0; //character's defense
    if (!user.speed) user.speed = 0; //character's speed
    if (!user.dead) user.dead = false; //character's status (alive/dead)
    if (!user.start) user.start = false; //character's speed
    if (!user.triangle) user.triangle = "None"; //character's class
    if (!user.triangleid) user.triangleid = "0"; //character's class
    if (!user.trianglemod) user.trianglemod = 1.0; //character's class-based damage modifier.
    if (!user.weapon && user.weapon != 0) user.weapon = false;
    if (!user.ability) user.ability = "Ability";
    if (!user.inventory) user.inventory = {};
    if (!user.marry) user.marry = "None";
    if (!user.guild) user.guild = "None";
    if (!user.guildpos) user.guildpos = "None";
    if (!user.guildbuffs) user.guildbuffs = {};
    if (!user.bolster) user.bolster = false;
    if (!user.votestreak) user.votestreak = 0;
    if (!user.shield) user.shield = ts + 24 * 1000 * 60 * 60;
    if (!user.materials) user.materials = 0;
    if (!user.ascension) user.ascension = 0;
    if (!user.bounty) user.bounty = 0;
    if (!user.glory) user.glory = 0;
    if (!user.burn) user.burn = 0;
    if (!user.runes) user.runes = [0, 0, 0, 0, 0, 0, 0]
    while (user.runes.length < 7) { user.runes.push(0) }
    if (!user.cooldowns) user.cooldowns = {}
    if (!user.cooldowns.attack) user.cooldowns.attack = 1;
    if (!user.cooldowns.heal) user.cooldowns.heal = 1;
    if (!user.cooldowns.rez) user.cooldowns.rez = 1;
    if (!user.cooldowns.work) user.cooldowns.work = 1;
    if (!user.cooldowns.bolster) user.cooldowns.bolster = 1;
    if (!user.cooldowns.smeltall) user.cooldowns.smeltall = 1;
    if (!user.cooldowns.purchase) user.cooldowns.purchase = 1;
    if (!user.cooldowns.merge) user.cooldowns.merge = 1;
    if (!user.cooldowns.daily) user.cooldowns.daily = 1;
    if (!user.cooldowns.luckyshoprefresh) user.cooldowns.luckyshoprefresh = 1;
    if (!user.cooldowns.lastbreath) user.cooldowns.lastbreath = 1;
    if (!user.skills) user.skills = {}
    if (!user.skillA) user.skillA = "None";
    if (!user.skillB) user.skillB = "None";
    if (!user.skillC) user.skillC = "None";

    if (!user.consum) user.consum = {}
    if (!user.consum.explosion) user.consum.explosion = 0;
    if (!user.consum.egg) user.consum.egg = 0;
    if (!user.consum.eggsplosion) user.consum.eggsplosion = 0;
    if (!user.consum.box) user.consum.box = 0;
    if (!user.consum.sp) user.consum.sp = 0;
    if (!user.consum.phoenixfeather) user.consum.phoenixfeather = 0;
    if (!user.consum.nametag) user.consum.nametag = 0;
    if (!user.consum.reroll) user.consum.reroll = 0;

    if (!user.quests) user.quests = [];

    if (user.currenthealth > user.health) user.currenthealth = user.health;



    if (user.start === false) { //when you start, your currenthealth will be to 10;
        user.currenthealth = 10;
        user.start = true;
        //console.log(user.start);
    }
    if (admins.indexOf(user._id) == -1) {
        if (user.attack > user.level + calcExtraStat(user, "attack")) user.attack = user.level + calcExtraStat(user, "attack"); //prevents overleveling
        if (user.defense > user.level + calcExtraStat(user, "defense")) user.defense = user.level + calcExtraStat(user, "defense")
        //extrahp = (user.weapon != false && user.weapon.modifiers.maxhp != undefined) ? user.weapon.modifiers.maxhp : 0
        // if (user.health > user.level * 10 + extrahp) user.health = user.level * 10;
        if (user.health > user.level * 10 + calcExtraStat(user, "health")) user.health = user.level * 10 + calcExtraStat(user, "health")
    }
}
function checkStuff(message,user) {
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    checkProps(message,user)
    //user.xp += Math.floor(20 * Math.random() + 1); //whenever a message is sent, their experience increases by a random number 1-25.
    user.xp += 1 + Math.floor(Math.random() * user.level);
    let leveluptext = ""
    if (user.level >= 100) { user.xp = Math.min(checkxp(user) - 1, user.xp) }
    let extratext = ""
    while (user.xp >= checkxp(user) && user.level < 100) { //increases levels when xp>100*level
        user.xp -= checkxp(user)
        user.level += 1;
        leveluptext = "You leveled up to level " + user.level + "!\n"
        if (user.level === 5 && user.triangle == "None") {
            extratext +="You are level 5! Use !class to get information on how to choose a **class**!\n";
        }
        if (user.level === 15 && (user.triangle == "None" || user.triangleid < 4)) {
            extratext +="You are level 15! Use !class to get information on how to choose a **subclass**!\n";
        }
    }
    if (leveluptext != "") {
        replyMessage(message, leveluptext+extratext)
    }


    if (user.currenthealth <= 0) { //If health is 0, you are dead.
        user.currenthealth = 0;
        user.dead = true;
    }
}

function checkBurn(message,user) {
    //let ts = message.createdTimestamp;
    if (user.burn != undefined && user.dead == false && !isNaN(user.burn) && user.burn > 0) {
        let burndamage = Math.floor(user.health * .05)
        user.burn -= 1
        user.currenthealth -= burndamage
        let burntext = "You took **" + burndamage + "** from burning. (You will burn for "+user.burn+" more commands)"
        if (user.dead) {
            burntext += " You burned to death!"
            user.dead = true
            user.burn = 0
            burntext += " The flames have ceased."
        }
        if (user.burn <= 0 || user.dead == true || isNaN(user.burn)) {
            user.burn = 0
            burntext += " The flames have ceased."
        }
        replyMessage(message, burntext)
    } else if (isNaN(user.burn)) {
        user.burn = 0
    }
    return user
}

function raidAttack(message, user, raid, type, guild) { //raid attack
    if (type == undefined) { type = "raid"}
    let ts = message.createdTimestamp;
    if (!raid.attacklist) { raid.attacklist = {} }
    if (!raid.damagelist) { raid.damagelist = {} }
    if (user.dead === true) {
        replyMessage(message, "Corpses can\'t attack! Do !resurrect");
        return;
    }
    if (raid == false) {
        deleteMessage(message);
        replyMessage(message, "There is no raid right now!");
        return;
    }
    if (calcTime(user.cooldowns.attack, ts) > 0) {
        deleteMessage(message);
        replyMessage(message, 'You can\'t attack right now.\n You can attack again in ' + displayTime(user.cooldowns.attack, ts) + ".");
        return;
    }
    if (raid.alive == false) {
        replyMessage(message, "There is no raid going on right now!");
        return;
    }
    if (user.dead == true) {
        replyMessage(message, "Corpses can\'t attack! Do !resurrect");
        return;
    }
    /*
    if (user.level + user.ascension * 10 < raid.level - 15 && type == "raid") {
        replyMessage(message, "You can't attack bosses with more than 15 levels more than you!");
        return;
    }
    */
    if (user.shield > ts) {
        replyMessage(message, "You just attacked! You lost your shield :(");
        user.shield = 1
    }
    if (!raid.attacklist[user._id]) { raid.attacklist[user._id] = 0 }
    if (!raid.damagelist[user._id]) { raid.damagelist[user._id] = 0 }
    let luckybuff = calcLuckyBuff(user)
    let damage = calcDamage(message, user, raid, user);//ok...
    let counter = calcDamage(message, raid, user, user);//ok...
    if (raid.name == "Cerberus") {
        counter*=3;
    }
    if (damage < 0) {
        damage = 0;
    }
    if (damage > raid.currenthealth) { damage = raid.currenthealth}
    if (counter < 0) {
        counter = 0;
    }
    let damagereward = Math.floor(damage * Math.sqrt(raid.level) * Math.random() * luckybuff);
    if (type != "event") { damagereward *= 5 }
    user.currenthealth = user.currenthealth - counter;
    raid.currenthealth = raid.currenthealth - damage;
    let counterstolen = Math.floor((user.money) / 5);

    raid.attacklist[user._id] += damagereward
    raid.damagelist[user._id] += damage;
    //user.money += damagereward;
    user.xp += damagereward;
    if (user.currenthealth > user.health) {
        user.currenthealth = user.health
    }

    sendMessage(message.channel, {
        embed: {
            thumbnail: {
                url: raid.url
            },
            color: 0xF1C40F,
            fields: [
                /*{
                    name: "Attack Results",
                    value: '<@' + user._id + "> attacks a Lv." + raid.level + " " + raid.name + "!",
                },*/
                {
                    name: "Attack Results",
                    value: '<@' + user._id + "> attacks a Lv." + raid.level + " " + raid.name + "!\n" + raid.name + " took **" + damage + "** damage! It has " + raid.currenthealth + " Health remaining! You earned " + damagereward + " xp!",
                }, {
                    name: "Counter Results",
                    value: "<@" + user._id + "> took **" + counter + "** counterdamage! You have " + user.currenthealth + " Health remaining!",
                }
            ]
        }
    })
    let text = ""
    if (raid.currenthealth <= 0) {
        raid.alive = false;
        let keys = Object.keys(raid.attacklist);
        let tasks = [];
        let luckyperson = keys[Math.floor(Math.random() * keys.length)]
        if (type == "event" || type == "world") {
            sendMessage(bot.channels.get(devData.debugChannelId), "A level "+raid.level+" "+raid.name+" was killed by " + user.username + " (ID: "+user._id+")!")
            let listtotal = 0;
            for (var i = 0; i < keys.length; i++) {
                listtotal += raid.attacklist[keys[i]];
            }
            for (var i = 0; i < keys.length; i++) {
                if (user._id == keys[i]) { user.money += raid.attacklist[keys[i]]; user.glory += (raid.level / 25) * (raid.attacklist[keys[i]] / listtotal);continue}
                tasks.push({
                    updateOne:
                    {
                        "filter": { _id: keys[i] },
                        "update": {
                            $inc: {
                                "money": raid.attacklist[keys[i]],
                                "glory": (raid.level / 25) * (raid.attacklist[keys[i]] / listtotal)
                            }
                        }
                    }
                })
            }
            user.consum.reroll += 1;
            var i = Math.floor(Math.random() * keys.length)
            if (keys[i] == user._id) {
                user.consum.reroll += 1;
            } else {
                tasks.push({
                    updateOne:
                    {
                        "filter": { _id: keys[i] },
                        "update": {
                            $inc: {
                                "consum.reroll": 1
                            }
                        }
                    }
                })
            }
            text += "<@" + user._id + "> killed the boss and recieved a skill reroll!\n";
            text += "<@" + keys[i] + "> was lucky and recieved a skill reroll!\n";
            
        } else {
            for (var i = 0; i < keys.length; i++) {
                if (user._id == keys[i]) { user.money += raid.attacklist[keys[i]]; continue }
                tasks.push({
                    updateOne:
                    {
                        "filter": { _id: keys[i] },
                        "update": {
                            $inc: {
                                "money": raid.attacklist[keys[i]],
                            }
                        }
                    }
                })
            }
        }
        if (tasks != undefined && tasks != [] && tasks[0] != undefined) { bulkWrite("userData", tasks) }
        if (type != "guild") {
            let rarity = Math.floor(raid.level / 75) + Math.floor(Math.random() * (Math.min(raid.level, 75) / 15 - Math.floor(raid.level / 75)))
            if (raid.level > 75 && Math.random() < (raid.level - 75) / 1000) {
                rarity = 5
            }

            if (type == "event" || type == "world") {
                let roll = Math.random()
                if (roll > 0.9) {
                    rarity = 7
                } else if (roll > 0.7) {
                    rarity = 6
                } else {
                    rarity = 5
                }
            }
            //console.log(rarity)
            let item = generateRandomItem(user, rarity)
            let runeshardnum = Math.floor(2 * raid.level / 5 + 8 * raid.level / 5 * Math.random())
            let floating = runeshardnum % 100;
            let extra = Math.random() * 100 > floating ? 0 : 1
            runeshardnum = Math.floor(runeshardnum / 100) + extra;
            let runetext = "";
            if (runeshardnum > 0) {
                runetext = "They also received " + runeshardnum + " Rune Shards.\n"
                user.runes[0] += runeshardnum
            }
            let cruneinfo = {
                "Treant Boss": [0, 0, 0.02, 0, 0, 0, 0.015],
                "Kraken Boss": [0, 0, 0.02, 0, 0, 0.015, 0],
                "Dragon Boss": [0, 0, 0.02, 0, 0.015, 0, 0],
                "Deity Boss": [0, 0, 0.02, 0.005, 0.01, 0.01, 0.01],
                "Hell Lord": [0, 0, 0.02, 0.01, 0.02, 0.02, 0.02],
                "Fallen Angel": [0, 0.01, 1, 0.25, 0, 0, 0]
            }
            let runeprobs = cruneinfo[raid.name]
            for (let i = 0; i < runeprobs.length; i++) {
                if (Math.random() < runeprobs[i]) {
                    let damagechance = Math.random() * raid.maxhealth;
                    let damagetotal = 0;
                    let keys = Object.keys(raid.damagelist)
                    for (var key of keys) {
                        damagetotal += raid.damagelist[key];
                        if (damagetotal < damagechance) { continue; }
                        if (user._id == key) { user.runes[i] += 1 }
                        else {
                            let toSet = {}
                            toSet["runes." + i] = 1;
                            tasks.push({
                                updateOne:
                                {
                                    "filter": { _id: key },
                                    "update": {
                                        $inc: toSet
                                    }
                                }
                            })
                        }
                        runetext += "<@" + key + "> received a " + runeNames[i] + "!\n"
                        break;
                    }
                }
                
            }
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp and an item (ID: " + item._id + ") with rarity " + item.rarity + ".\n"+runetext;
        } else {
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp.\nThe guild was also given "+ raid.reward + " xp and "+raid.crystalreward+" crystals.\n"
            guild.xp += raid.reward
            guild.crystals += raid.crystalreward
        }
        user.money += Math.floor(luckybuff * raid.reward);
        user.xp += Math.floor(luckybuff * raid.reward);
        text += "Rewards have been given to everyone who participated in the raid!\n"
        if (user.currenthealth > 0 && hasSkill(user, 15)) { //soulsteal skill in raids.
            user.currenthealth += raid.maxhealth
            text += "Soulsteal activated. <@" + user._id + "> has stolen " + raid.maxhealth + " health.";
            user.currenthealth = Math.min(user.currenthealth, user.health)
        }
        if (type == "raid") {
            summon(raid)
            text += "Boss automatically summoned. It is level "+raid.level+"!"
        }
        if (type == "event") {
            bot.setTimeout(function () {
                message.channel.overwritePermissions(message.guild.roles.get("536599503608872961"), {
                    "READ_MESSAGES": false,
                    "SEND_MESSAGES": false
                }).catch(console.error);
            }, 30000)
        }
    }
    if (user.currenthealth <= 0) {
        user.dead = true;
        user.currenthealth = 0;
        user.money -= counterstolen;
        text += '<@' + user._id + '> was killed in the raid! He/she lost $' + counterstolen;
        if (user.glory != undefined) {
            user.glory *= 0.999
        }
    }
    if (text != "") { sendMessage(message.channel, text) }
    setCD(user, ts, attackcd * 60, "attack");
    user.speed += 1;
}
function smeltItem(user, item, givereward, isBulk) {
    givereward = (givereward == false) ? false : true
    let rarity = item.rarity
    let materials = 0
    let money = 0
    let xp = 0
    if (givereward) {
        materials = Math.pow(5, rarity)
        money = rarity * rarity * 1000
        xp = rarity * rarity * 1000
        user.materials += materials
        user.money += money
        user.xp += xp
    }
    delete user.inventory[item._id];
    if (isBulk != true) { deleteItem(item._id) }
    return [xp, money, materials]
}

async function itemFilter(message, user, defaults, filterJson) {
    if (filterJson == undefined) { filterJson = {} }
    if (defaults == undefined) { defaults = {} }
    let ts = message.createdTimestamp;
    let words = message.content.toLowerCase().trim().split(/\s+/)
    let minrarity = (defaults.minrarity == undefined) ? 0 : defaults.minrarity
    let maxrarity = (defaults.maxrarity == undefined) ? 9 : defaults.maxrarity
    let fav = (defaults.fav == undefined) ? "None" : defaults.fav
    let maxCost = (defaults.maxCost == undefined) ? undefined : defaults.maxCost
    if (words.indexOf("-min") != -1) {
        minrarity = parseInt(words[words.indexOf("-min") + 1])
        if (isNaN(minrarity)) {
            replyMessage(message, "Please enter an integer for the minimum rarity.")
            return false
        }
    }

    if (words.indexOf("-max") != -1) {
        maxrarity = parseInt(words[words.indexOf("-max") + 1])
        if (isNaN(maxrarity)) {
            replyMessage(message, "Please enter an integer for the maximum rarity.")
            return false
        }
    }
    if (words.indexOf("-maxcost") != -1) {
        maxCost = parseInt(words[words.indexOf("-maxcost") + 1])
        if (isNaN(maxCost)) {
            replyMessage(message, "Please enter an integer for the maximum cost.")
            return false
        }
    }
    let possibleRarities = [];
    for (var i = Math.max(0, minrarity); i <= Math.min(maxrarity, 9); i++) {
        possibleRarities.push(i)
    }
    if (words.indexOf("-fav") != -1) {
        fav = true
    }
    if (words.indexOf("-nofav") != -1) {
        fav = false
    }
    if (words.indexOf("-unique") != -1) {
        possibleRarities.push("Unique")
    }
    
    let displayItems = []

    if (filterJson.owner == undefined && defaults.owner != false) { filterJson.owner = user._id }
    if (filterJson.rarity == undefined && defaults.rarity != false) { filterJson.rarity = { $in: possibleRarities } }
    if (filterJson.favorite == undefined && fav != "None") { filterJson.favorite = fav }
    if (user.weapon != false && (filterJson.equip == undefined && defaults.equip != true)) {
        filterJson.equip = false
    }
    if (filterJson.price == undefined && maxCost != undefined) {
        filterJson.price = { $exists: true, $lte: maxCost }
    }
    return findItems(filterJson)
}
function getModifierText(modifierlist) {
    let modifiertext = ""
    for (var key in modifierlist) {
        modifiertext += key + ": " + modifierlist[key] + "\n"
    }
    if (modifiertext == "") { modifiertext = "None" }
    return modifiertext
}
function checkxp(user) {
    return 100 + Math.floor((3 * Math.pow((10 * (user.ascension) + user.level + 1), 2)) * Math.pow(1.5, user.ascension))
}

function addQuestCondition(condition, description, total, extra, type) {
    let ret = {}
    ret.description = description;
    if (extra == undefined) { extra = {} }
    if (type != "c") { type = "a"}
    extra.category = { "value": condition, "operator": "=" }
    ret.type = type
    ret.condition = extra
    ret.total = total
    ret.current = 0;
    return ret
}

function makeQuest(user, name, conditions, reward) {
    user.quests.push({
        "name": name,
        "conditions": conditions,
        "reward": reward
    })
}

function completeQuest(user, condition, extra, amount) {
    if (amount == null || amount == undefined) { amount = 1;}
    extra.category = condition;
    for (var i = 0; i < user.quests.length; i++) {
        for (var j = 0; j < user.quests[i].conditions.length; j++) {
            if (user.quests[i].conditions[j].type == "a") {
                let canClaim = true;
                for (var key in user.quests[i].conditions[j].condition) {
                    let curr = user.quests[i].conditions[j].condition;
                    while (key.indexOf(".") != -1) {
                        let index = key.indexOf(".");
                        let currkey = key.substring(0, index)
                        key = key.substring(index+1)
                        if (key == undefined || curr[key] == undefined) { return; }
                        curr = curr[key];
                    }
                    if (key == undefined || curr[key] == undefined) { return; }
                    curr = curr[key]; 
                    let op = curr.operator;
                    let value = curr.value;
                    if ((op == "=" && extra[key] == value) || (op == ">" && extra[key] > value) || (op == "<" && extra[key] < value) || (op == "<=" && extra[key] <= value) || (op == ">=" && extra[key] >= value)) { continue }
                    canClaim = false;
                    break;
                }
                if (canClaim) { user.quests[i].conditions[j].current += amount; }
            } else {
                if (user.quests[i].conditions[j].condition.category.value == condition) {
                    user.quests[i].conditions[j].current = extra[user.quests[i].conditions[j].condition.special]
                }
            }
        }
    }
}

function isCD(user, ts, cdtype) {
    return functions.calcTime(user.cooldowns[cdtype], ts) > 0
}

module.exports.clean = function (text) { return clean(text) }
module.exports.getUser = function (uid) { return getUser(uid) }
module.exports.findUsers = function (query,projection) { return findUsers(query,projection) }
module.exports.setUser = function (newuser) { return setUser(newuser) }
module.exports.deleteUser = function (uid) { return deleteUser(uid) }
module.exports.getItem = function (iid) { return getItem(iid) }
module.exports.getFloorMob = function (floor) { return getFloorMob(floor) }
module.exports.findItems = function (query, projection) { return findItems(query, projection) }
module.exports.setItem = function (newitem) { return setItem(newitem) }
module.exports.deleteItem = function (iid) { return deleteItem(iid) }
module.exports.getObject = function (coll, oid) { return getObject(coll, oid) }
module.exports.findObjects = function (coll, query, projection) { return findObjects(coll, query, projection) }
module.exports.setObject = function (coll,newobj) { return setObject(coll,newobj) }
module.exports.deleteObject = function (coll,oid) { return deleteObject(coll,oid) }
module.exports.setProp = function (coll, query, newvalue) { return setProp(coll, query, newvalue) }
module.exports.bulkWrite = function (coll, tasks) { return bulkWrite(coll, tasks) }
module.exports.deleteObjects = function (coll, filter) { return deleteObjects(coll, filter) }
module.exports.sendMessage = function (channel, text, override) { return sendMessage(channel, text, override) }
module.exports.replyMessage = function (message, text, override) { return replyMessage(message, text, override) }
module.exports.deleteMessage = function (message) { return deleteMessage(message) }
module.exports.dmUser = function (user, text) { return dmUser(user, text) }
module.exports.logCommand = function (message, extratext) { return logCommand(message, extratext) }
module.exports.validate = function (message, user, spot) { return validate(message, user, spot) }
module.exports.hasSkill = function (user, skillid, enable) { return hasSkill(user, skillid, enable) }
module.exports.generateWeaponTemplate = function (owner, weapon, current, total) { return generateWeaponTemplate(owner, weapon, current, total) }
module.exports.generateGuildTemplate = function (guild) { return generateGuildTemplate(guild) }
module.exports.generateItem = function (owner, itemid, attack, defense, rarity, name, modifiers, isBulk) { return generateItem(owner, itemid, attack, defense, rarity, name, modifiers, isBulk) }
module.exports.generateRandomItem = function (owner, rarity, isBulk) { return generateRandomItem(owner, rarity, isBulk) }
module.exports.calcExtraStat = function (user, stat) { return calcExtraStat(user, stat) }
module.exports.calcLuckyBuff = function (user) { return calcLuckyBuff(user) }
module.exports.errorlog = function (text) { return errorlog(text) }
module.exports.setCD = function (user, ts, cdsecs, cdname) { return setCD(user, ts, cdsecs, cdname) }
module.exports.calcTime = function (time1, time2) { return calcTime(time1, time2) }
module.exports.displayTime = function (time1, time2) { return displayTime(time1, time2) }
module.exports.extractTime = function (message,timeword) { return extractTime(message,timeword) }
module.exports.calcDamage = function (message, attacker, defender, initiator) { return calcDamage(message, attacker, defender, initiator) }
module.exports.calcStats = function (message, user, stat, skillenable, confused) { return calcStats(message, user, stat, skillenable, confused) }
module.exports.voteItem = function (message, user, dm) { return voteItem(message, user, dm) }
module.exports.craftItems = function (message, owner, minrarity, maxrarity, amount) { return craftItems(message, owner, minrarity, maxrarity, amount) }
module.exports.craftItem = function (message, owner, minrarity, maxrarity, reply, isBulk) { return craftItem(message, owner, minrarity, maxrarity, reply, isBulk) }
module.exports.raidInfo = function (message, raid) { return raidInfo(message, raid) }
module.exports.summon = function (raid, level, minlevel, maxlevel, name, image, ability) { return summon(raid, level, minlevel, maxlevel, name, image, ability) }
module.exports.checkProps = function (message,user) { return checkProps(message,user) }
module.exports.checkStuff = function (message,user) { return checkStuff(message,user) }
module.exports.checkBurn = function (message,user) { return checkBurn(message,user) }
module.exports.raidAttack = function (message, user, raid, type, guild) { return raidAttack(message, user, raid, type, guild) }
module.exports.smeltItem = function (user, item, giveReward, isBulk) { return smeltItem(user, item, giveReward, isBulk) }
module.exports.itemFilter = function (message, user, defaults) { return itemFilter(message, user, defaults) }
module.exports.getModifierText = function (modifierlist) { return getModifierText(modifierlist) }
module.exports.checkxp = function (user) { return checkxp(user) }
module.exports.makeQuest = function (user, name, conditions, reward) { return makeQuest(user, name, conditions, reward) }
module.exports.completeQuest = function (user, condition, extra, amount) { return completeQuest(user, condition, extra, amount) }
module.exports.addQuestCondition = function (condition, description, total, extra, type) { return addQuestCondition(condition, description, total, extra, type) }
module.exports.isCD = function (user, ts, cdtype) { return isCD(user, ts, cdtype)}
fs.readdir("./Utils/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //console.log(file)
        // If the file is not a JS file, ignore it (thanks, Apple)
        if (!file.endsWith(".js") || file == "js") { return };
        // Load the event file itself
        let commandname = file.split(".")[0];
        //console.log(commandname)
        module.exports[commandname] = require(`./${file}`)
        // Get just the event name from the file name
    });
})
