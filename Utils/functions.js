async function importObject(db1, coll, oid) {
    return client.db(db1).collection(coll).find({ _id: oid }).toArray().then(r => {
        if (r[0] == undefined) { return false }
        return r[0];
    }).catch(err => {
        console.error(err)
        errorlog(err)
        return false
    })
}
async function getUser(uid) {
    return getObject("userData", uid)
}
async function findUsers(query,projection) {
    return findObjects("userData", query, projection)
}
async function setUser(newuser) {
    return setObject("userData", newuser)
}
async function deleteUser(uid) {
    return deleteObject("userData", uid)
}
async function getItem(iid) {
    return getObject("itemData", iid)
}
async function findItems(query, projection) {
    return findObjects("itemData", query, projection)
}
async function setItem(newitem) {
    return setObject("itemData", newitem)
}
async function deleteItem(iid) {
    return deleteObject("itemData", iid)
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
async function getObject(coll, oid) {
    //return throttle(function () {
        return client.db(db).collection(coll).find({ _id: oid }).toArray().then(r => {
            if (r[0] == undefined) { return false }
            return r[0];
        }).catch(err => {
            console.error(err)
            errorlog(err)
            return false
        })
    //})
}
async function findObjects(coll, query, projection) {
    //return throttle(function () {
        return client.db(db).collection(coll).find(query, { "projection": projection }).toArray().then(r => {
            if (r == []) { return false }
            return r;
        }).catch(err => {
            console.error(err)
            errorlog(err)
            return false
        })
    //})
}
async function setObject(coll, newobj) {
    //return throttle(function () {
        return client.db(db).collection(coll).replaceOne({ _id: newobj._id }, newobj, { upsert: true }).then(function (r) {
            return true;
        }).catch(function (err) {
            console.error(err)
            errorlog(err)
            return false;
        })
    //})
}
async function deleteObject(coll, oid) {
    //return throttle(function () {
        return client.db(db).collection(coll).deleteOne({ _id: oid }).then(function (r) {
            return true;
        }).catch(function (err) {
            console.error(err)
            errorlog(err)
            return false;
        })
    //})
}
async function setProp(coll, query, newvalue) {
    //return throttle(function () {
        return client.db(db).collection(coll).updateMany(query, newvalue).then(function (r) {
            return true;
        }).catch(function (err) {
            console.error(err)
            errorlog(err)
            return false;
        })
    //})
}
async function bulkWrite(coll, tasks) {
    //return throttle(function () {
        return client.db(db).collection(coll).bulkWrite(tasks).then(function (r) {
            return true;
        }).catch(function (err) {
            console.error(err)
            errorlog(err)
            return false;
        })
    //})
}
async function deleteObjects(coll, filter) {
    //return throttle(function () {
        return client.db(db).collection(coll).deleteMany(filter).then(function (r) {
            return true;
        }).catch(function (err) {
            console.error(err)
            errorlog(err)
            return false;
        })
    //})
}
function clean(text) {
    if (typeof (text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}
function sendMessage(channel, text, override) {
    //console.time("Message Send")
    if (text == undefined) { text = "undefined"}
    override = (override == true) ? true : false
    if (!override && channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) { return; }
    if (channel.type != "dm" && channel.type != "group" && (channel.permissionsFor(bot.user) != null && !channel.permissionsFor(bot.user).has("SEND_MESSAGES"))) { return }
    if (text.embed != undefined && channel.type != "dm" && channel.type != "group" && (channel.permissionsFor(bot.user) != null && !channel.permissionsFor(bot.user).has("EMBED_LINKS"))) { text = "Uh Oh! The bot does not have permission to send embers here!" }
    while (text.indexOf != undefined && text.indexOf("@everyone") != -1) {
        text.replace("@everyone", "everyone")
    }
    while (text.indexOf != undefined && text.indexOf("@here") != -1) {
        text.replace("@here", "here")
    }
    return channel.send(text).catch(function (err) {
        if (err.errno == "ENOBUFS") {
            if (channel.retry == undefined) {
                bot.setTimeout(function () { sendMessage(channel, text, override) }, 100)
            } else {
                console.error(err)
                errorlog(err)
            }
            channel.retry = true;
        } else {
            console.error(err)
            errorlog(err)
        }
    })
}
function replyMessage(message, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && message.channel.guild != undefined && serverData[message.guild.id] != undefined && serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) { return; }
    if (message.channel.type != "dm" && message.channel.type != "group" && message.channel.permissionsFor(bot.user) != null && !message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) { return }
    return sendMessage(message.channel, "<@"+message.author.id+">, "+text, override )
    //console.timeEnd("Message Send")
}
function sendAsEmbed(channel, name, text, title) {
    return sendMessage(channel, {
        "embed": {
            "color": 5251510,
            "title": title,
            "fields": [
                {
                    "name": name,
                    "value": text
                }
            ]
        }
    });
}
function deleteMessage(message) {
    if (message.channel.guild != undefined && serverData[message.guild.id] != undefined && serverData[message.guild.id].disabledChannels.indexOf(message.channel.id) != -1) { return; }
    if (!message.deletable) { return }
    message.delete().catch(function (err) {
        console.error(err)
    })
}

function dmUser(user, text) {
    if (typeof user == "string") {
        user = {"_id": user}}
    if (user._id == bot.id || bot.users.cache.get(user._id) == undefined) { return }
    if (user.dmmute != true) bot.users.cache.get(user._id).send(text).catch(function (err) { console.error(err) })
}


function logCommand(message, title, extratext, gid, cid) {
    if (gid == undefined) { gid = debugGuildId }
    if (cid == undefined) { cid = debugChannelId}
    if (title == undefined) { title = "LOG" }
    if (message.author.bot) { return }
    if (extratext == undefined) { extratext = "" } else { extratext = "|" + extratext }
    let textlength = title + "|"+message.author.id + "||" + message.createdTimestamp + extratext + " ..."
    let mcontent = message.content
    if (mcontent.length >= 500) { mcontent = mcontent.slice(0, 500) + " ..." + (mcontent.length - 500) + " chars not shown" }
    if (title == "MACRO" || title == "FLAG") { cid = devData.flagChannelId }
    sendMessage(bot.guilds.cache.get(gid).channels.cache.get(cid), clean(title + "|"+message.author.id + "|" + mcontent + "|" + message.createdTimestamp + extratext))
}

async function validate(message, user, spot, userdefault) {
    if (isNaN(parseInt(spot))) { spot = 1}
    if (spot == 0) { return false; }
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) { return user; }
    if (words.length <= spot) {
        if (userdefault == true) {return user}
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
        temptarget = bot.users.cache.find(val => val.discriminator == target.slice(target.length - 4) && val.username == target.slice(0, target.length - 5));
    } else {
        temptarget = bot.users.cache.find(val => val.username == target)
    }
    if (temptarget != undefined) {
        target = temptarget.id
        targetname = temptarget
    }
    if (target == user._id) { return user }
    if (user.dungeonts != undefined && devs.indexOf(user._id) == -1) {
        sendMessage(message.channel, "You cannot target someone else while in a dungeon!");
        return false
    }
    return getUser(target).then(ret => {
        if (ret == false) {
            //Send fail message here
            sendMessage(message.channel, targetname + " is not a real person");
            return false;
        }
        //let command = message.content.trim().split(/\s+/)[0].toLowerCase().slice(prefix.length)
        if (ret.dungeonts != undefined && calcTime(message.createdTimestamp, ret.dungeonts) < 600 && admins.indexOf(user._id) == -1) {
            sendMessage(message.channel, targetname + " is currently in a dungeon.");
            return false;
        }
        return ret
    })
}
function hasSkill(user, skillid, enable) {
    enable = (enable == false) ? false : true
    if (user.isRaid == undefined && user.equippedSkills != undefined && Object.values(user.equippedSkills) != undefined && Object.values(user.equippedSkills).indexOf(skillid) != -1) return enable
    else return false
}
function getGuildBuff(user, buffname) {
    if (user.isRaid) { return 0 }
    if (user.guildbuffs != undefined && user.guildbuffs[buffname] != undefined) {
        return guildBuffStore.find(x => x.stat == buffname).bonus[user.guildbuffs[buffname]];
    }
    return 0;
}
function getWeaponEnchant(user, buffname) {
    if (user.isRaid) { return 0 }
    if (user.weapon != undefined && user.weapon != false && user.weapon.modifiers[buffname] != undefined) {
        return user.weapon.modifiers[buffname]
    }
    return 0;
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
        name = "Event"
    } else {
        name = "<@" + weapon.owner + ">"
    }
    return {
        embed: {
            title: "Weapon info",
            color: 0xF1C40F,
            fields: [{
                name: "Owner:",
                value: name+" ("+weapon.owner+")",
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
            title: "Guild Info",
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
                    name: "<:mallowhug:542482607716171799> Guild Members <:mallowhug:542482607716171799>",
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
function generateItem(owner, itemid, attack, defense, rarity, name, modifiers, isBulk, source) {
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
    devData.nextItem++;
    let item = {
        "owner": owner._id, "_id": itemid, "equip": false, "attack": attack, "defense": defense, "rarity": rarity, "modifiers": modifiers, "name": name, "enhance": {"level": 0, "attack": 0, "defense": 0}, "enchantlevel": 0, "numenchants": 0, "favorite": false, "merge": 0 }
    if (isBulk != true) {
        setItem(item)
        setObject("devData", devData)
    }
    if (source == undefined) { source = "craft"}
    completeQuest(owner, "getItem", { "item": item, "source": source }, 1)
    return item;
}

function generateRandomItem(owner, rarity, isBulk, source) {
    isBulk = (isBulk == true) ? true : false;
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

    let item = generateItem(owner, null, attack, defense, rarity, undefined, undefined, isBulk, source)
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
    let lb = calcEnchants(user).lucky
    if (isGameEvent("starevent", "lucky")) {lb += user.luckycointotal*0.01}
    if (devData.luckymult != undefined) { lb *= devData.luckymult}
    return lb
}
function errorlog(err, extratext) {
    if (extratext == undefined) { extratext = ""}
    sendMessage(getLogChannel("errorChannelId"), "```\n" + err.stack + "\n```\n"+extratext)
}
function getLogChannel(devDatavname) {
    return bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData[devDatavname])
}
function secondsUntilReset(ts) {
    let x = ts % (24 * 60 * 60 * 1000)
    return 24*60*60-Math.floor(x/1000)
}
function setCD(user, ts, cdsecs, cdname, nohaste) {
    //if (user.cooldowns[cdname] == undefined) { errorlog("Something went wrong with setCD. " + cdname + " not defined." + user._id + "|" + ts) }
    let hastesecs = calcEnchants(user).haste
    if (cdsecs == "daily") { cdsecs = secondsUntilReset(ts) }
    else if (hastesecs != undefined && nohaste != true) { cdsecs -= parseInt(hastesecs) }
    if (user.cooldowns[cdname] == undefined || isNaN(user.cooldowns[cdname])) { user.cooldowns[cdname] = 1;}
    user.cooldowns[cdname] = Math.max(ts + cdsecs * 1000, user.cooldowns[cdname])
}
function calcTime(time1, time2) {
    if (time1 == undefined || time2 == undefined) { return -1;}
    return Math.floor((time1 - time2) / 1000)
}
function displayTime(time1, time2) {
    let totalseconds = calcTime(time1, time2)
    if (totalseconds < 0) { return "Done"}
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
function calcDamage(message, attacker, defender, initiator, astatus, dstatus) {
    if (astatus == undefined) { astatus = {} }
    if (dstatus == undefined) { dstatus = {} }
    
    let text = ""
    let counter = 0;
    let roll = Math.random()
    let burn = 0;
    let skillenable = true;
    if (defender.name == "Charybdis") { skillenable = false }
    if (attacker.name == "Charybdis") { skillenable = false }
    let defendername = defender.isRaid ? defender.name : "<@" + defender._id + ">"
    let attackername = attacker.isRaid ? attacker.name : "<@" + attacker._id + ">"
    if (astatus.petrify) { return [attackername + " was petrified and cannot attack! \n", 0, 0] }
    if (astatus.stun) { return [attackername + " was stunned and cannot attack! \n", 0, 0] }
    let attack = 0;
    let aoptions = {};
    aoptions.skillenable = skillenable
    aoptions.hasConfusion = defender.isRaid != true && hasSkill(defender, 23, skillenable)
    if (hasSkill(defender, 37, skillenable) && attacker.speed != undefined && attacker.speed > 0) {
        aoptions.hasDispel = true;
        text += attackername + "'s speed was dispelled!\n"
    }
    if (astatus.silence) { aoptions.silence = true; text += attackername + " was silenced!\n"}
    let aenchants = calcEnchants(attacker, defender, aoptions)
    aoptions.enchants = aenchants;
    aoptions.status = astatus;
    let attackarr = calcStats(message, attacker, "attack", aoptions);
    attack = attackarr[1];
    text += attackarr[0];
    
    let defense = 0;

    let doptions = {};
    doptions.skillenable = skillenable
    doptions.hasConfusion = attacker.isRaid != true && hasSkill(attacker, 23, skillenable)
    if (hasSkill(attacker, 37, skillenable) && defender.speed != undefined && defender.speed > 0) {
        doptions.hasDispel = true; 
        text += defendername + "'s speed was dispelled!\n"
    }
    if (dstatus.petrify) { doptions.silence = true; text += defendername + " was petrified and silenced! \n" }
    else if (dstatus.silence) { doptions.silence = true; text += defendername + " was silenced! \n"}
    let denchants = calcEnchants(defender, attacker, doptions)
    doptions.enchants = denchants;
    doptions.status = dstatus;
    let defensearr = calcStats(message, defender, "defense", doptions);
    defense = defensearr[1]; 
    text += defensearr[0]; 
    if (Math.random() < denchants.evade) {
        text = attackername + ", " + defendername + " has evaded the attack!\n"
        return [text, 0, 0]
    }
    if (attacker.isRaid != true && defender.isRaid != true) {
        if ((attacker.triangleid - defender.triangleid) % 3 == 2) {
            if (hasSkill(attacker, 13, skillenable)) {
                attack *= 1.8
            } else {
                attack *= 1.4
            }
        }
    }
    if (aenchants.bleed > 0) {
        if (defender.statusEffects.bleed == undefined) { defender.statusEffects.bleed = 0 }
        defender.statusEffects.bleed += aenchants.bleed;
    }
    if (astatus.bleed != undefined) {
        let amt = astatus.bleed * 0.02;
        if (amt >= 1) {
            attacker.currenthealth = 0;
            attacker.dead = true;
            return [attackername + " bled to death...\n", 0, 0]
        }
        text += attackername + " is bleeding and will do " + Math.floor(amt * 100) + "% less damage. \n"
        attack *= (1 - amt)
    }
    if (dstatus.bleed != undefined) {
        let amt = dstatus.bleed * 0.02;
        if (amt >= 1) {
            defender.currenthealth = 0;
            defender.dead = true;
            return [defendername + " bled to death...\n", 0, 0]
        }
        text += defendername + " is bleeding and will lose " + Math.floor(amt * 100) + "% of their defense." + defendername + " has " + defender.statusEffects.bleed + " stacks of bleed.\n"
        defense *= (1 - amt)
    } else if (defender.statusEffects.bleed != undefined && defender.statusEffects.bleed > 0) {
        text += defendername + " is starting to bleed!"+defendername+" has " + defender.statusEffects.bleed + " stacks of bleed.\n"
    }
    let piercechance = Math.random()
    if (piercechance < aenchants.pierce) {
        if (defender.isRaid) {
            attack *= 1.25
        } else {
            defense = Math.floor(defense/2)
        }
        text += attackername + " has pierced their opponents defense!\n"
        if (attacker.isRaid != true && hasSkill(attacker, 28, skillenable)) {
            attack *= 1.25
        }
    }

    //Both?
    if (aenchants.burn > 0) {
        if (defender.isRaid) {
            text += "Raid boss cannot be burned!\n"
        } else if (hasSkill(defender, 38, skillenable)) {
            text += attackername +"'s flame was dispelled!\n"
        } else {
            if (defender.statusEffects.burn == undefined) { defender.statusEffects.burn = 0 }
            defender.statusEffects.burn += aenchants.burn;
            text += defendername + " is now burning!\n"
        }
    }
    let blockchance = Math.random();
    if (denchants.block > blockchance) {
        if (piercechance < aenchants.pierce) {
            text += defendername + " has blocked the attack, but " + attackername + " pierced though anyway!\n"
        } else {
            text += defendername + " has blocked the attack!\n"
            attack = 0;
            if (defender.isRaid != true && hasSkill(defender, 30, skillenable)) {
                defender.statusEffects.bolster = defender.ascension * 0.03
                text += defendername + " was bolstered!\n"
            }
        }
    }
    if (attacker.isRaid != true) {
        if (Math.random() < denchants.revenge) {
            attacker.currenthealth = 0;
            text += defendername + " has avenged the attack!\n"
            //return false
        }
    }
    //console.log("Counter")
    let attackvariance = 0.4;
    attackvariance -= getWeaponEnchant(attacker, "attackvariance")
    let x = Math.floor(attack * (attackvariance * roll + 1-attackvariance));
    let defmult = 0;
    if (denchants.defmult != undefined) {defmult += denchants.defmult}
    x -= defense;
    let truedamage = Math.floor(x);
    if (x < 0) { truedamage = 0 }
    else {
        if (defense <= 0) {
            truedamage = Math.floor(x*(1 - defense / 50))
        }
        if ((!defender.isRaid || !attacker.isRaid) && defmult * defense > x) {
            truedamage = Math.floor(x * Math.pow(1 - (Math.sqrt(defmult * defmult * defense * defense - x * x) / (defmult * defense)), (1 / 3)))
        }
    }
    //Last Breath Check
    
    if (defender.isRaid != true) {
        if (hasSkill(defender, 25, skillenable) && !isCD(defender, message.createdTimestamp, "lastbreath")) {
            if (truedamage > defender.currenthealth && defender.currenthealth * 2 > defender.health) {
                defender.currenthealth = truedamage + 1
                text += defendername + " has activated Last Breath!\n"
                setCD(defender, message.createdTimestamp, 180, "lastbreath");
            }
        }
    }
    if (aenchants.lifeSteal > 0) {
        if (hasSkill(attacker, 44, skillenable) && attacker.currenthealth < 0.1 * attacker.health) { aenchants.lifeSteal *= 1.5 }
        let stealAmount = Math.abs(Math.floor(truedamage * aenchants.lifeSteal))
        
        if (stealAmount < 0) { stealAmount = 0 }
        if (defender.isRaid && stealAmount > defender.health) { stealAmount = defender.health;}
        attacker.currenthealth += stealAmount
        text += attackername + " lifestole **" + stealAmount + "** health!\n";
    }
    if (hasSkill(attacker, 22, skillenable)) {
        let leech = 0
        if (defender.isRaid != true) {
            leech = Math.floor(0.05 * defender.health);
            if (truedamage > defender.currenthealth) {
                leech = 0;
            }
            if (truedamage < defender.currenthealth && truedamage + leech > defender.currenthealth) {
                leech = (defender.currenthealth - truedamage) - 1
            }
            truedamage += leech
            attacker.currenthealth += leech
            text += attackername + " leeched **" + leech + "** health!\n";
        }
    }
    if (denchants.spikes > 0) {
        let spiked = Math.floor(defense * denchants.spikes * Math.max(0, 1 - aenchants.resistance))
        if (hasSkill(attacker, 40, skillenable)) { text += defendername + "'s spikes was dispelled!\n" } else {
            counter += spiked
            text += attackername + " has been damaged for " + spiked + " health due to spikes!\n"
        }
    }
    truedamage *= Math.max(0, 1 - denchants.resistance) 
    return [text, truedamage, counter]
}
function calcStatusEffects(attacker, defender, aenchants, astatus, denchants, dstatus) {
    if (attacker.statusEffects == undefined) {
        attacker.statusEffects = {}
    }
    if (aenchants.petrify > Math.random()) { dstatus.petrify = true; }
    if (aenchants.stun > Math.random()) { dstatus.stun = true }
    if (aenchants.silence > Math.random()) { dstatus.silence = true }
    if (attacker.statusEffects.bleed > 0) {
        astatus.bleed = attacker.statusEffects.bleed
        attacker.statusEffects.bleed -= 1;
        if (attacker.statusEffects.bleed <= 0) { attacker.statusEffects.bleed = undefined }
    }
    if (attacker.statusEffects.bolster > 0) {
        astatus.bolster = attacker.statusEffects.bolster;
        attacker.statusEffects.bolster = undefined
    }
}
function simulateAttack(message, attacker, defender) {
    let aenchants = calcEnchants(attacker, defender)
    let denchants = calcEnchants(defender, attacker)
    let astatus = {};
    let dstatus = {};
    let defendername = defender.isRaid ? defender.name : "<@" + defender._id + ">"
    let attackername = attacker.isRaid ? attacker.name : "<@" + attacker._id + ">"
    calcStatusEffects(attacker, defender, aenchants, astatus, denchants, dstatus)
    calcStatusEffects(defender, attacker, denchants, dstatus, aenchants, astatus)
    let damage = 0;
    let counter = 0;
    let damagearr = calcDamage(message, attacker, defender, attacker, astatus, dstatus);//ok...
    let damagetext = damagearr[0];
    damage += damagearr[1]
    counter += damagearr[2]
    let counterarr = calcDamage(message, defender, attacker, attacker, dstatus, astatus);//ok...
    let countertext = counterarr[0];
    counter += counterarr[1];
    damage += counterarr[2];
    damage = Math.floor(damage)
    counter = Math.floor(counter)
    let skillenable = true;
    if (defender.name == "Charybdis") { skillenable = false }
    if (attacker.name == "Charybdis") { skillenable = false }
    if (defender.name == "Cerberus") {
        counter *= 3;
    }
    let attackerkill = hasSkill(attacker, 48, skillenable) && defender.currenthealth - damage <= 0
    let defenderkill = hasSkill(defender, 48, skillenable) && attacker.currenthealth - counter <= 0
    if (attackerkill && defenderkill) {}
    else if (attackerkill) { damagetext += "Swift Strike was activated! "+attackername+" is immune to damage! ";counter = 0}
    else if (defenderkill) { countertext += "Swift Strike was activated! "+defendername+" is immune to damage! "; damage = 0}
    if (damage < 0) {
        damage = 0;
    }
    if (counter < 0) {
        counter = 0;
    }
    return {
        damagetext: damagetext,
        damage: damage,
        countertext: countertext,
        counter: counter
    }
}
function calcEnchants(user, defender, options) {
    if (defender == undefined) {defender = {}}
    if (options == undefined) { options = {} }
    
    skillenable = (options.skillenable === false) ? false : true
    let possibleModifiers = [
        { name: 'attack', default: 0 },
        { name: 'defense', default: 0 },
        { name: 'buff', default: 1 },
        { name: 'dbuff', default: 1 },
        { name: 'critRate', default: 0 },
        { name: 'critDamage', default: 2 },
        { name: 'rage', default: 0 },
        { name: 'sacrifice', default: 0 },
        { name: 'lifeSteal', default: 0 },
        { name: 'tempo', default: 0 },
        { name: 'antitempo', default: 0 },
        { name: 'combo', default: 0 },
        { name: 'pierce', default: 0 },
        { name: 'block', default: 0 },
        { name: 'spikes', default: 0 },
        { name: 'revenge', default: 0 },
        { name: 'burn', default: 0 },
        { name: 'regen', default: 0 },
        { name: 'lucky', default: 1 },
        { name: 'haste', default: 0 },
        { name: 'evade', default: 0 },
        { name: 'bleed', default: 0 },
        { name: 'silence', default: 0 },
        { name: 'vulnerable', default: 0 },
        { name: 'weakness', default: 0 },
        { name: 'stun', default: 0 },
        { name: 'petrify', default: 0 },
        { name: 'resistance', default: 0 },
        { name: 'defmult', default: 10 }
    ]
    let enchants = {};
    for (let mod of possibleModifiers) {
        enchants[mod.name] = mod.default
    }
    if (options.silence) { return enchants;}
    if (user.trianglemod != undefined) { enchants.buff = user.trianglemod}
    if (user.ability != undefined && user.ability != "None") {
        for (let key in user.ability) {
            if (enchants[key] == undefined) { enchants[key] = 0 }
            enchants[key] += user.ability[key]
        }
    }
    if (user.isRaid) { return enchants}
    for (let key in enchants) {
        enchants[key] += getGuildBuff(user, key) + getWeaponEnchant(user, key)
    }
    if (skillenable == true) {
        for (let key in user.equippedSkills) {
            let sid = user.equippedSkills[key];
            if (sid == "None") { continue }
            for (let i in skillData[sid].effect) {
                enchants[i] += skillData[sid].effect[i]
            }
            if (skillData[sid].conditional != undefined) {
                for (let condition in skillData[sid].conditional) {
                    let cwords = condition.split(" ")
                    let vA = JSONoperate(user, cwords[0], "get")
                    let vB = JSONoperate(user, cwords[2], "get")
                    let op = cwords[1];
                    if ((op == ">=" && vA >= vB) || (op == "<=" && vA <= vB) || (op == "=" && vA == vB) || (op == ">" && vA > vB) || (op == "<" && vA < vB)) {
                        for (let effect in skillData[sid].conditional[condition]) {
                            enchants[effect] += skillData[sid].conditional[condition][effect]
                        }
                    }
                }
            }
        }
        if (hasSkill(user, 32)) {
            enchants.revenge += 0.005;
            enchants.revenge *= 2;
        }
    }
    enchants.lucky += Math.floor(user.glory) * 0.01;
    if (user.vip != undefined) {
        enchants.lucky += user.vip.lucky;
    }
    switch (user.triangleid) {
        case 4:
            enchants.critRate += 0.08;
            enchants.critDamage += 1;
            break;
        case 6:
            enchants.rage += 1;
            break;
        case 7:
            enchants.lucky += 0.5;
            break;
        case 11:
            enchants.lifeSteal += 0.15;
            break;
        case 311:
            enchants.sacrifice += 0.15;
            break;
        case 2000:
            enchants.evade += 0.05
            break;
        case 2001:
            enchants.attack += 30
            enchants.defense += 30
            enchants.regen += 3
            break;
    }
    return enchants
}
function calcStats(message, user, stat, options) {
    if (user.defense == undefined) { user.defense = 0;}
    if (options == undefined) {options = {}}
    let skillenable = (options.skillenable == false) ? false : true
    let enchants = (options.enchants == undefined) ? functions.calcEnchants(user, {}, options) : options.enchants
    let status = options.status == undefined ? {} : options.status
    let dispel = (options.hasDispel == true) ? true : false
    let confused = (options.hasConfusion == true) ? true : false
    let text = ""
    let nametext = user.isRaid ? user.name : "<@"+user._id+">"
    let attack = user.attack
    let defense = user.defense
    if (user.isRaid != true && confused) {
        attack = user.defense
        defense = user.attack
    }
    if (status.bolster) {
        enchants.buff += status.bolster;
        enchants.dbuff += status.bolster;
    }
    attack += enchants.attack
    defense += enchants.defense
    if (user.weapon != false && user.weapon != undefined) {
        if (confused) {
            attack += user.weapon.defense + user.weapon.enhance.defense;
            defense += user.weapon.attack + user.weapon.enhance.attack;
        } else {
            attack += user.weapon.attack + user.weapon.enhance.attack;
            defense += user.weapon.defense + user.weapon.enhance.defense;
        }
    }
    let urspeed = user.speed
    if (urspeed > 20) {
        urspeed = 20
    }
    if (options.hasDispel) { urspeed = 0; }
    if (stat == "attack") {
        if (enchants.rage > 0) {
            let x = user.currenthealth / user.health
            if (hasSkill(user, 29, skillenable)) {
                x = 7 * user.currenthealth / (8 * user.health)
            }
            x = Math.sqrt(x)
            enchants.buff += Math.min(enchants.rage + 1.5, (enchants.rage * -1 * (Math.log(x) + 0.15)))
        }
        if (enchants.sacrifice > 0) {
            if (hasSkill(user, 45, skillenable) && user.health <= user.currenthealth) {enchants.sacrifice *= 1.5}
            if (hasSkill(user, 26, skillenable)) {
                //user.currenthealth += Math.floor(buff * attack * sacrifice)
                enchants.buff += 4 * enchants.sacrifice
                text += nametext + " \"sacrificed\" **" + Math.floor(attack * 4 * enchants.sacrifice) + "** Health, but mysteriously just didn't!\n";
            } else {
                enchants.buff += 5 * enchants.sacrifice
                user.currenthealth -= Math.floor(attack * 5 * enchants.sacrifice)
                text += nametext + " sacrificed **" + Math.floor(attack * 5 * enchants.sacrifice) + "** Health!\n";
            }
        }
        if (enchants.combo > 0) {
            enchants.critRate += 0.01 * urspeed * enchants.combo;
            text += nametext + " has **" + (Math.floor(enchants.critRate * 1000) / 10) + "%** chance of hitting a critical\n"
        }
        let critchance = Math.random();
        if (critchance < enchants.critRate) {
            text += nametext + " just dealt critical damage!\n";
            enchants.buff += enchants.critDamage - 1;
        }
        if (enchants.tempo > 0) {
            enchants.buff += ((urspeed * 0.05 * enchants.tempo));
            text += nametext + " has **" + urspeed + "** tempo\n";
        }
        return [text, Math.floor(enchants.buff * attack)]
    }
    if (stat == "defense") {
        if (enchants.antitempo > 0) {
            enchants.dbuff += ((urspeed * 0.05 * enchants.antitempo));
            text += nametext + " has **" + urspeed + "** antitempo\n";
        }
        return [text, Math.floor(enchants.dbuff * defense)]
    }
}
///---------------
async function voteItem(message, user, dm) {
    dm = dm == true ? true : false
    let ts = message.createdTimestamp
    let words = message.content.trim().split(/\s+/)
    let keepstreak = words.indexOf("-keepstreak")
    return validate(message,user).then(target => {
        if (target == false) { return }
        let text = ""
        if (target.votestreak == undefined) { target.votestreak = 0 }
        if (target.votestreaktime == undefined) { target.votestreaktime = ts }
        if (calcTime(target.votestreaktime, ts) < 0 && keepstreak < 0) {
            text = "You lost your streak of " + target.votestreak + " :("
            target.votestreak = 0
        } else if (isCD(target, ts, "vote") && words[2] != "override") {
            return sendMessage(message.channel, "It hasn't been 12 hours yet... DBL broke down :(")
        } else {
            text = "You have a streak of " + (target.votestreak + 1) + "!"
        }
        target.votestreak += 1
        target.votestreaktime = ts + 24 * 60 * 60 * 1000
        let numboxes = Math.ceil(2 * (1 + target.ascension) * Math.sqrt(target.votestreak))

        if (target.glory != undefined) {
            target.glory += 0.1 + 0.1 * Math.sqrt(target.votestreak);
        }
        target.consum.box += numboxes
        let honorget = 10 * Math.floor(target.ascension / 5);
        if (honorget <= 0) { honorget = 1}
        target.honor += honorget;
        setCD(target, ts, 12 * 60 * 60, "vote", true)
        completeQuest(target, "vote", {"votestreak":target.votestreak}, 1)
        sendMessage(message.channel, "<@" + target._id + "> has been given " + numboxes + " boxes and " + honorget + " honor!\n" + text);
        if (dm) dmUser(target, "Thank you for voting! You have been given " + numboxes + " boxes and " + honorget + " honor!\n" + text)
        setUser(target)
    })
}
function craftItems(message, owner, minrarity, maxrarity, amount, source) {
    if (source == undefined) { source = "craft"}
    amount = (isNaN(parseInt(amount))) ? 1 : parseInt(amount)
    if (amount > 1) {
        let getrarities = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        let tasks = [];
        for (var i = 0; i < amount; i++) {
            let item = craftItem(message, owner, minrarity, maxrarity, false, true, source);
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
        let item = craftItem(message, owner, minrarity, maxrarity, true, false, source);
        return ""
    }
}
function craftItem(message, owner, minrarity, maxrarity, reply, isBulk, source) {
    if (source == undefined) { source = "craft"}
    reply = (reply == false) ? false : true
    let item;
    if (minrarity == -1 || maxrarity == -1 || minrarity == undefined || maxrarity == undefined) {
        item = generateRandomItem(owner,undefined,isBulk, source)
    } else {
        let rarity = Math.floor((maxrarity - minrarity + 1) * Math.random() + minrarity)
        item = generateRandomItem(owner, rarity, isBulk, source)
    }
    if (reply) sendMessage(message.channel, "<@" + owner._id + "> has recieved an item with id " + item._id + " and rarity " + item.rarity)
    return item
}
function raidInfo(message, raid, extratext, footer) {
    if (extratext == undefined) { extratext = "" }
    else { extratext = "\n"+extratext}
    let itemRewardText = ""
    if (raid.itemReward != undefined) {
        itemRewardText = "\n**Item Reward Id:** " + raid.itemReward
    }
    let abilitytext = ""
    if (raid.ability != undefined) {
        abilitytext = "\n**Ability:** " + raid.abilitydesc
    }
    
    let toSendEmbed = {
        embed: {
            thumbnail: {
                "url": raid.url
            },
            title: "Raid Info",
            color: 0xF1C40F,
            fields: [
                {
                    name: "Level " + raid.level + " " + raid.name,
                    value: "**Health Remaining:** " + raid.currenthealth + "\n**Max Attack:** " + raid.attack + "\n**Reward:** " + raid.reward + " Money and XP" + itemRewardText + abilitytext + extratext
                }
            ]
        }
    }
    let ts = message.createdTimestamp;
    /*
    if (devData.halloweenevent != undefined && ts > devData.halloweenevent.start && ts < devData.halloweenevent.end) {
        toSendEmbed.embed.footer = {
            "text": "The ghosts will leave in " + functions.displayTime(devData.halloweenevent.end, ts)
        }
    } 
    */
    if (footer != undefined) {
        toSendEmbed.embed.footer = { text: footer }
    } else if (raid.location != undefined) {
        toSendEmbed.embed.footer = {
            "text": "ID: "+raid._id
        }
    }
    sendMessage(message.channel, toSendEmbed);
}
function customsummon(raid, options) {
    raid.isRaid = true;
    raid.alive = true;
    raid.statusEffects = {}
    raid.attacklist = {};
    raid.damagelist = {};
    raid.ability = undefined;
    raid.abilitydesc = undefined;
    if (options == undefined) {
        options = {}
    }
    for (let key in options) {
        raid[key] = options[key]
    }
    if (raid.level == undefined) { raid.level = 1;}
    if (raid.attack == undefined) { raid.attack = 0; }
    if (raid.defense == undefined) { raid.defense = 0; }
    if (raid.health == undefined) { raid.health = 0; }
    if (options.currenthealth == undefined || raid.currenthealth == undefined) { raid.currenthealth = raid.health; }
}
function locationsummon(raid) {
    if (raid.areabosssummon == undefined) { raid.areabosssummon = 0}
    let loc = raid.location
    let rng = Math.random();
    let rnum;
    
    if (rng < 0.2) {
        rnum = 1;
        raid.areabosssummon += 0.02
    } else if (rng < 0.2 + raid.areabosssummon) {
        rnum = 2;
        raid.areabosssummon = 0
    } else {
        rnum = 0;
        raid.areabosssummon += 0.01
    }
    let raidref = Assets.locationraidData[loc][rnum]
    if (Math.random() < devData.starevent.starchance && isGameEvent("starevent")) {
        if (rnum == 2) {
            summon(raid, undefined, raidref.minlevel, raidref.maxlevel, "Star Lord", "https://cdn.discordapp.com/attachments/744331762146082837/793249129592913931/61bb291900bcb0d35b083323617bab51.jpg")
            raid.stareventmob = true
        } else {
            summon(raid, undefined, raidref.minlevel, raidref.maxlevel, "Star Beast", "https://cdn.discordapp.com/attachments/547415056065757194/792922164700512316/images_2_1.jpeg")
            raid.stareventmob = true
        }
        return 
    }
    summon(raid, undefined, raidref.minlevel, raidref.maxlevel, raidref.name, raidref.url, raidref.ability, raidref.abilitydesc)
}
function summon(raid, level, minlevel, maxlevel, name, image, ability, abilitydesc) {
    raid.isRaid = true;
    raid.alive = true;
    raid.statusEffects = {}
    raid.attacklist = {};
    raid.damagelist = {};
    raid.ability = undefined;
    raid.abilitydesc = undefined;
    raid.stareventmob = undefined
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
        raid.abilitydesc = (abilitydesc == undefined) ? JSON.stringify(ability) : abilitydesc
    }
    let summonlevel = Math.floor((raid.minlevel) + (((raid.maxlevel) - (raid.minlevel)) * Math.random())) + 1
    if (level != undefined && !isNaN(level)) { summonlevel = level}
    if (raid._id == "world") { 
        //world boss
        raid.attack = Math.floor(summonlevel * 15);
        raid.currenthealth = summonlevel * 100 * (Math.floor(2 * summonlevel / 25) + 1);
        raid.health = raid.currenthealth
        raid.reward = Math.floor(summonlevel * 5000);
        raid.level = summonlevel;
    } else {
        if (level != undefined) { summonlevel = level }
        raid.attack = summonlevel * (15+Math.floor(summonlevel/25));
        raid.currenthealth = summonlevel * 10 * (Math.floor(summonlevel / 25) + 1);
        raid.health = raid.currenthealth
        raid.reward = summonlevel * Math.pow(Math.floor(summonlevel/50)+1, 2) * 200;
        raid.level = summonlevel;
    }
}
function checkProps(message,user) {
    let ts = message.createdTimestamp;
    if (user.username != message.author.username) user.username = message.author.username; //Creates object with name as username
    if (user.money == undefined) user.money = 0; //gives money object
    if (user.health == undefined) user.health = 10; //Health
    if (user.currenthealth == undefined) user.currenthealth = 0; //Health
    if (user.xp == undefined) user.xp = 0; //XP
    if (user.level == undefined) user.level = 1; //XP
    if (user.attack == undefined) user.attack = 0; //character's attack
    if (user.defense == undefined) user.defense = 0; //character's defense
    if (user.speed == undefined) user.speed = 0; //character's speed
    if (user.dead == undefined) user.dead = false; //character's status (alive/dead)
    if (user.start == undefined) user.start = false; //character's speed
    if (user.triangle == undefined) user.triangle = "None"; //character's class
    if (user.triangleid == undefined) user.triangleid = 0; //character's class
    if (user.trianglemod == undefined) user.trianglemod = 1.0; //character's class-based damage modifier.
    if (user.weapon == undefined) user.weapon = false;
    if (user.marry == undefined) user.marry = "None";
    if (user.guild == undefined) user.guild = "None";
    if (user.guildpos == undefined) user.guildpos = "None";
    if (user.guildbuffs == undefined) user.guildbuffs = {};
    if (user.votestreak == undefined) user.votestreak = 0;
    if (user.shield == undefined) user.shield = ts + 24 * 1000 * 60 * 60;
    if (user.materials == undefined) user.materials = 0;
    if (user.ascension == undefined) user.ascension = 0;
    if (user.bounty == undefined) user.bounty = 0;
    if (user.glory == undefined) user.glory = 0;
    if (user.runes == undefined) user.runes = [0, 0, 0, 0, 0, 0, 0]
    while (user.runes.length < 7) { user.runes.push(0) }
    if (user.cooldowns == undefined) user.cooldowns = {}
    if (user.cooldowns.attack == undefined) user.cooldowns.attack = 1;
    if (user.cooldowns.heal == undefined) user.cooldowns.heal = 1;
    if (user.cooldowns.rez == undefined) user.cooldowns.rez = 1;
    if (user.cooldowns.work == undefined) user.cooldowns.work = 1;
    if (user.cooldowns.bolster == undefined) user.cooldowns.bolster = 1;
    if (user.cooldowns.smeltall == undefined) user.cooldowns.smeltall = 1;
    if (user.cooldowns.purchase == undefined) user.cooldowns.purchase = 1;
    if (user.cooldowns.merge == undefined) user.cooldowns.merge = 1;
    if (user.cooldowns.daily == undefined) user.cooldowns.daily = 1;
    if (user.cooldowns.luckyshoprefresh == undefined) user.cooldowns.luckyshoprefresh = 1;
    if (user.cooldowns.lastbreath == undefined) user.cooldowns.lastbreath = 1;
    if (user.skills == undefined) user.skills = {}
    if (user.equippedSkills == undefined) user.equippedSkills = {"A":"None", "B": "None", "C": "None"}
    if (!user.consum == undefined) user.consum = {}
    if (user.quests == undefined) user.quests = [];
    if (user.honor == undefined) user.honor = 0;
    if (user.dailyhonor == undefined) user.dailyhonor = 0;
    if (user.statusEffects == undefined) user.statusEffects = {};
    if (user.currenthealth > user.health) user.currenthealth = user.health
    if (user.location == undefined) { user.location = "city"}
    if (user.missions == undefined) { user.missions = [] }
    if (user.present == undefined) { user.present = 0 }
    if (user.bag == undefined) { user.bag = {} }
    if (user.guildperms == undefined) { user.guildperms = {} }
    if (user.luckycoin == undefined) { user.luckycoin = 0 }
    if (user.luckycointotal == undefined) { user.luckycointotal = 0 }
    if (user.start === false) { //when you start, your currenthealth will be to 10;
        user.currenthealth = 10;
        user.start = true;
    }
    if (admins.indexOf(user._id) == -1) {
        if (user.attack > user.level + calcExtraStat(user, "attack")) user.attack = user.level + calcExtraStat(user, "attack"); //prevents overleveling
        if (user.defense > user.level + calcExtraStat(user, "defense")) user.defense = user.level + calcExtraStat(user, "defense")
        //extrahp = (user.weapon != false && user.weapon.modifiers.maxhp != undefined) ? user.weapon.modifiers.maxhp : 0
        // if (user.health > user.level * 10 + extrahp) user.health = user.level * 10;
        if (user.health > user.level * 10 + calcExtraStat(user, "health")) user.health = user.level * 10 + calcExtraStat(user, "health")
    }
}
function postCommandCheck(message, user) {
    let leveluptext = ""
    if (user.level >= 100) { user.xp = Math.min(checkxp(user), user.xp) }
    let extratext = ""
    while (user.xp >= checkxp(user) && user.level < 100) { //increases levels when xp>100*level
        user.xp -= checkxp(user)
        user.level += 1;
        leveluptext = "You leveled up to level " + user.level + "!\n"
        if (user.level === 5 && user.triangle == "None") {
            extratext += "You are level 5! Use !class to get information on how to choose a **class**!\n";
        }
        if (user.ascension === 1 && user.level == 10) {
            extratext += "You are level 15! Use !class to get information on how to choose a **subclass**!\n";
        }
    }
    if (leveluptext != "") {
        replyMessage(message, leveluptext + extratext)
    }
    if (user.currenthealth <= 0) { //If health is 0, you are dead.
        user.currenthealth = 0;
        user.statusEffects = {}
        user.dead = true;
    }
}
function checkStuff(message,user) {
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    checkProps(message, user)
    if (message.content.indexOf("@everyone") != -1 || message.content.indexOf("@here") != -1) {
        if (message.guild != undefined && message.guild.id != devData.debugGuildId) {
            replyMessage(message, "Don't be sneaky and try to ping everyone!")
            return false;
        } else {
            replyMessage(message, "Don't be sneaky and try to ping everyone! <@266984067059154944> ban " + message.author.id)
            return false;
        }
    }
    if (checkCommand(message, user) == false) {
        return false;
    }
    //user.xp += Math.floor(20 * Math.random() + 1); //whenever a message is sent, their experience increases by a random number 1-25.
    user.xp += 1 + Math.floor(Math.random() * user.level);
    postCommandCheck(message, user)
    if (user.currenthealth <= 0) { user.currenthealth = 0; user.dead = true; }
    //regen
    let regenpersec = calcEnchants(user).regen
    if (user.dead == false && regenpersec > 0) {
        user.currenthealth = Math.min(Math.floor(user.currenthealth + regenpersec* calcTime(message.createdTimestamp, user.cooldowns.normal)), user.health)
    }

    //burn
    if (user.statusEffects.burn != undefined && user.dead == false) {
        let burndamage = Math.floor(user.health * .05)
        user.statusEffects.burn -= 1
        user.currenthealth -= burndamage
        let burntext = "You took **" + burndamage + "** from burning. (You will burn for " + user.statusEffects.burn + " more commands)"
        if (user.currenthealth <= 0) { user.currenthealth = 0; user.dead = true; }
        if (user.dead) {
            burntext += " You burned to death!"
            user.dead = true
            user.statusEffects.burn = undefined
            burntext += " The flames have ceased."
        }
        if (user.statusEffects.burn <= 0 || user.dead == true || isNaN(parseInt(user.statusEffects.burn))) {
            user.statusEffects.burn = undefined
            burntext += " The flames have ceased."
        }
        replyMessage(message, burntext)
    }
    if (user.currenthealth <= 0) { //If health is 0, you are dead.
        user.currenthealth = 0;
        user.statusEffects = {}
        user.dead = true;
    }
    completeQuest(user, "user", user, 1)
}

function checkCommand(message, user) {
    let aliaslist = {
        "ratk": "raidattack",
        "rattack": "raidattack",
        "eatk": "eventattack",
        "watk": "worldattack",
        "worldatk": "worldattack",
        "g": "guild",
        "rez": "revive",
        "res": "revive",
        "resurrect": "revive",
        "feather": "phoenixfeather"
    }
    let command = message.command
    if (aliaslist[command] != undefined) { command = aliaslist[command]}
    let dungeonbannedcommands = ["raidattack", "eventattack", "worldattack", "guild", "revive", "phoenixfeather", "travel"]
    if (user.dungeonts != undefined && dungeonbannedcommands.indexOf(command) != -1 && devs.indexOf(user._id) == -1) { replyMessage(message, "You cannot do this in a dungeon!");return false; }
    return true; 
}

function raidAttack(message, user, raid, type, extra) { //raid attack
    if (type == undefined) { type = "raid" }
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
    if (isCD(user, ts,"attack")) {
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
    if (!raid.attacklist[user._id]) { raid.attacklist[user._id] = 0 }
    if (!raid.damagelist[user._id]) { raid.damagelist[user._id] = 0 }
    let luckybuff = calcLuckyBuff(user)
    let atkres = simulateAttack(message, user, raid)
    let damage = atkres.damage;
    let counter = atkres.counter;
    let damagetext = atkres.damagetext
    let countertext = atkres.countertext
    let damagereward = Math.floor(5 * damage * Math.sqrt(raid.level) * (0.5 + 0.5*Math.random()));
    if (damage > raid.currenthealth) { damage = raid.currenthealth }
    user.currenthealth = user.currenthealth - counter;
    raid.currenthealth = raid.currenthealth - damage;
    let counterstolen = Math.floor((user.money) / 5);
    raid.attacklist[user._id] += Math.floor(damagereward * (1+(luckybuff-1)/1)/2)
    raid.damagelist[user._id] += damage;
    //user.money += damagereward;
    damagereward = Math.floor(damagereward * luckybuff)
    user.xp += damagereward;
    if (user.currenthealth > user.health) {
        user.currenthealth = user.health
    }
    let raidResultEmbed = {
        embed: {
            thumbnail: {
                url: raid.url
            },
            title: user.username + " attacks a Lv." + raid.level + " " + raid.name,
            color: 0xF1C40F,
            fields: [
                /*{
                    name: "Attack Results",
                    value: '<@' + user._id + "> attacks a Lv." + raid.level + " " + raid.name + "!",
                },*/
                {
                    name: "Attack Results",
                    value: damagetext + raid.name + " took **" + damage + "** damage! It has **" + raid.currenthealth + "** Health remaining! You earned **" + damagereward + "** xp!",
                }, {
                    name: "Counter Results",
                    value: countertext + "<@" + user._id + "> took **" + counter + "** counterdamage! You have **" + user.currenthealth + "** Health remaining!",
                }
            ]
        }
    }
    completeQuest(user, "raidAttack", {"raid": raid, "counter": counter, "damage": damage, "reward": damagereward}, 1)
    let text = ""
    let archivetext = []
    if (raid.currenthealth <= 0) {
        raid.alive = false;
        let keys = Object.keys(raid.attacklist);
        let tasks = [];
        let luckyperson = keys[Math.floor(Math.random() * keys.length)]
        if (type == "event" || type == "world") {
            sendMessage(bot.channels.cache.get(devData.debugChannelId), "A level " + raid.level + " " + raid.name + " was killed by " + user.username + " (ID: " + user._id + ")!")
            let totalglory = (raid.health / 200000)
            for (var i = 0; i < keys.length; i++) {
                if (user._id == keys[i]) { user.money += raid.attacklist[keys[i]]; user.glory += totalglory * (raid.damagelist[keys[i]] / raid.health);continue}
                tasks.push({
                    updateOne:
                    {
                        "filter": { _id: keys[i] },
                        "update": {
                            $inc: {
                                "money": raid.attacklist[keys[i]],
                                "glory": totalglory * (raid.damagelist[keys[i]] / raid.health)
                            }
                        }
                    }
                })
            }
            user.consum.reroll += 1;
            text += "<@" + user._id + "> killed the boss and recieved a skill reroll!\n";
            let rerollnum = 1;
            if (raid.name == "Starmie Pinata") { rerollnum = 6;}
            for (let inc = 0; inc < rerollnum; inc++) {
                let key = getRandomByDamage(raid)
                if (key == user._id) {
                    user.consum.reroll += 1;
                } else {
                    tasks.push({
                        updateOne:
                        {
                            "filter": { _id: key },
                            "update": {
                                $inc: {
                                    "consum.reroll": 1
                                }
                            }
                        }
                    })
                }
                text += "<@" + key + "> was lucky and recieved a skill reroll!\n";
            }
            
            
            
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
        
        if (type != "guild" && type != "dungeon") {
            let rarity = Math.floor(raid.level / 75) + Math.floor(Math.random() * (Math.min(2*raid.level/75, 5)- Math.floor(raid.level / 75)))
            if (raid.level > 200 && Math.random() < (raid.level - 200) / 1000) {
                rarity = 5
            }

            if (type == "event" || type == "world") {
                let roll = Math.random()
                if (type == "world") {roll = roll - 0.25}
                if (roll > 1 - Math.floor(raid.level/500)) {
                    rarity = 7
                } else if (roll > 1 - Math.floor(raid.level / 500) - Math.floor(raid.level/400)) {
                    rarity = 6
                } else {
                    rarity = 5
                }
            }
            if (raid.name == "Starmie Pinata") {
                rarity = 7;
            }
            if (raid.stareventmob || raid.name == "Star Queen") {
                let lcrewards = {}
                let lcamt = raid.level / 50
                if (raid.name == "Star Lord") { lcamt *= 2 }
                if (raid.name == "Star Queen") { lcamt = 600 }
                let num = randint(Math.floor(lcamt), lcamt)
                while (num > 0) {
                    let person = getRandomByDamage(raid)
                    if (lcrewards[person] == undefined) { lcrewards[person] = 0 }
                    lcrewards[person] += 1;
                    num -= 1;
                }
                for (let person in lcrewards) {
                    if (user._id == person) { user.luckycoin += lcrewards[person]; user.luckycointotal += lcrewards[person] }
                    else {
                        let toSet = {};
                        toSet["luckycoin"] = lcrewards[person];
                        toSet["luckycointotal"] = lcrewards[person];
                        tasks.push({
                            updateOne:
                            {
                                "filter": { _id: person },
                                "update": {
                                    $inc: toSet
                                }
                            }
                        })
                    }
                    text += "<@" + person + "> received: " + lcrewards[person] + " Lucky Coin(s)" + "!\n"
                    if (text.length > 900) {
                        archivetext.push(text)
                        text = ""
                    }
                }
            }
            if (type == "ghost") {
                let candyrewards = {};
                let num = randint(Math.floor(raid.candyreward), raid.candyreward)
                while (num > 0) {
                    let person = getRandomByDamage(raid)
                    if (candyrewards[person] == undefined) { candyrewards[person] = 0 }
                    candyrewards[person] += 1;
                    num -= 1;
                }
                for (let person in candyrewards) {
                    if (user._id == person) { user.candy += candyrewards[person] }
                    else {
                        let toSet = {};
                        toSet["candy"] = candyrewards[person];
                        tasks.push({
                            updateOne:
                            {
                                "filter": { _id: person },
                                "update": {
                                    $inc: toSet
                                }
                            }
                        })
                    }
                    text += "<@" + person + "> received: " + candyrewards[person] + " Candy" + "!\n"
                    if (text.length > 900) {
                        archivetext.push(text)
                        text = ""
                    }
                }
            }
            //console.log(rarity)
            let item = generateRandomItem(user, rarity, false, "raid")
            let runeshardnum = Math.floor(raid.level / 5 + 4 * raid.level / 5 * Math.random())
            let floating = runeshardnum % 100;
            let extra = Math.random() * 100 > floating ? 0 : 1
            runeshardnum = Math.floor(runeshardnum / 100) + extra;
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp and an item (ID: " + item._id + ") with rarity " + item.rarity + ".\n";
            if (runeshardnum > 0) {
                text += "They also received " + runeshardnum + " Rune Shards.\n"
                user.runes[0] += runeshardnum
            }
            let cruneinfo = {
                "Area Boss - Necromancer": [5, 0, 0, 0, 0, 0, 0],
                "Area Boss - Treant": [10, 0, 0.1, 0, 0, 0, 0],
                "Area Boss - Troll": [20, 0, 0.15, 0, 0, 0, 0],
                "Area Boss - Kraken": [30, 0, 0.2, 0, 0, 0, 0],
                "Area Boss - Frost Giant": [40, 0, 0.25, 0, 0, 0, 0],
                "Area Boss - Dragon": [50, 0, 0.3, 0, 0, 0, 0],
                "Area Boss - Deity": [75, 0, 0.4, 0.1, 0.2, 0.2, 0.2],
                "Area Boss - Hell Lord": [100, 0, 0.4, 0.2, 0.4, 0.4, 0.4],
                "Fallen Angel": [2500, 0.05, 0, 0, 0, 0, 0],
                "Treant King": [1000, 0.2, 0, 0, 0, 0, 0],
                "Leviathan": [2000, 0.4, 0, 0, 0, 0, 0],
                "Dragonlord": [3000, 0.6, 0, 0, 0, 0, 0],
                "Godking": [4000, 0.8, 0, 0, 0, 0, 0],
                "Lord of the Abyss": [5000, 1, 0, 0, 0, 0, 0],
                "Starmie Pinata": [7777, 7, 77, 7, 7, 7, 7],
                "Star Queen": [3000, 1, 0, 0, 0, 0, 0]
            }
            let runeprobs = cruneinfo[raid.name]
            if (runeprobs == undefined) { runeprobs = [0,0,0,0,0,0,0]}
            let runerewards = {};
            for (let i = 0; i < runeprobs.length; i++) {
                let num = randint(Math.floor(runeprobs[i]), runeprobs[i])
                while (num > 0) {
                    let person = getRandomByDamage(raid)
                    if (runerewards[person] == undefined) { runerewards[person] = [0,0,0,0,0,0,0] }
                    runerewards[person][i] += 1;
                    num -= 1;
                }
            }
            
            for (let person in runerewards) {
                text += "<@" + person + "> received: "
                let personrunetext = [];
                for (let i = 0; i < runerewards[person].length; i++) {
                    if (runerewards[person][i] == 0) { continue }
                    if (user._id == person) { user.runes[i] += runerewards[person][i] }
                    else {
                        let toSet = {};
                        toSet["runes." + i] = runerewards[person][i];
                        tasks.push({
                            updateOne:
                            {
                                "filter": { _id: person },
                                "update": {
                                    $inc: toSet
                                }
                            }
                        })
                    }
                    let currtext = runerewards[person][i] + " " + runeNames[i]
                    if (runerewards[person][i] > 1) { currtext += "s" }
                    personrunetext.push(currtext)                    
                }
                text += personrunetext.join(", ") + "!\n"
                if (text.length > 900) {
                    archivetext.push(text)
                    text = ""
                }
            }
            
            if (tasks != undefined && tasks.length > 0) { bulkWrite("userData", tasks) }
        } else if (type == "guild") {
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp.\nThe guild was also given " + raid.reward + " xp and " + raid.crystalreward + " crystals.\n"
            extra.xp += raid.reward
            extra.crystals += raid.crystalreward
        } else if (type == "dungeon") {
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp.\nYou collected " + raid.reward + " guild xp and " + raid.crystalreward + " crystals.\nYou may now go deeper into the mines... \n"
            extra.xp += raid.reward
            extra.crystals += raid.crystalreward
        }
        user.money += Math.floor(luckybuff * raid.reward);
        user.xp += Math.floor(luckybuff * raid.reward);
        if (type != "dungeon") { text += "Rewards have been given to everyone who participated in the raid!\n" }
        if (user.currenthealth > 0 && hasSkill(user, 15)) { //soulsteal skill in raids.
            user.currenthealth += raid.health
            text += "Soulsteal activated. <@" + user._id + "> has stolen " + raid.health + " health. \n";
            user.currenthealth = Math.min(user.currenthealth, user.health)
        }
        if (type == "raid") {
            locationsummon(raid)
            text += "You have encountered a level "+raid.level+" "+raid.name+"!\n"
        }
        if (type == "event") {
            bot.setTimeout(function () {
                erc.updateOverwrite(erc.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).catch(console.error);
            }, 30000)
        }
        if (type == "ghost") {
            raid.ghostcurrent += 1
            if (raid.ghostcurrent <= raid.ghosttotal) {
                let ro = {};
                let gm = raid.ghostmultiplier
                let mm = 1;
                if (raid.ghostcurrent == raid.ghosttotal) {
                    ro.name = "Ghost King"
                    ro.level = Math.floor(200 * gm)
                    raid.ghostmultiplier += 0.5
                    mm = 100;
                    ro.ability = { "evade": 0.2 }
                    ro.abilitydesc = "20% chance to evade an attack. "
                } else if (raid.ghostcurrent % 100 == 0) {
                    ro.name = "Ghost General"
                    ro.level = Math.floor(150 * gm)
                    raid.ghostmultiplier += 0.00505
                    ro.ability = { "evade": 0.1 }
                    ro.abilitydesc = "10% chance to evade an attack. "
                    mm = 10;
                } else {
                    ro.name = "Ghost"
                    ro.level = Math.floor(100 * gm);
                    raid.ghostmultiplier += 0.00005
                    ro.ability = { "evade": 0.05 }
                    ro.abilitydesc = "5% chance to evade an attack. "
                    mm = 1;
                }
                ro.attack = Math.floor(10 * ro.level * gm)
                ro.health = Math.floor(50 * ro.level * gm * mm)
                ro.reward = Math.floor(1000 * ro.level * gm * mm)
                ro.candyreward = Math.floor(ro.level / 100 * gm *mm)
                customsummon(raid, ro)
                text += "There are " + (raid.ghosttotal - raid.ghostcurrent) + " ghosts left.\n"
            }
            
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
    if (archivetext.length == 0) {
        if (text != "") {
            raidResultEmbed.embed.fields.push({
                name: "Raid Results",
                value: text,
            })
        }
        sendMessage(message.channel, raidResultEmbed)
    } else {
        sendMessage(message.channel, raidResultEmbed)
        archivetext.push(text)
        let collatedarchivetext = archivetext.map((v, i) => i % 2 == 0 ? "" : archivetext[i - 1] + archivetext[i] )
        if (archivetext.length % 2 == 1) {collatedarchivetext.push(archivetext[archivetext.length -1])}
        for (let textpart of collatedarchivetext) {
            if (textpart != "") {
                sendMessage(message.channel, textpart)
            }
        }
    }
    
    if (type == "event") {
        var erc = bot.channels.cache.get(devData.eventRaidChannel)
        if (erc.id != message.channel.id) {
            sendMessage(erc, raidResultEmbed)
        }
    }
    setCD(user, ts, attackcd * 60, "attack");
    user.speed += 1;
}
function randint(a, b) {
    let num = Math.random() * (b - a) + a;
    let extra = Math.random() < num - Math.floor(num) ? 1 : 0
    return Math.floor(num) + extra;
}
function getRandomByChances(arr) {
    let s = arr.reduce((t, c) => t + c, 0)
    let chance = Math.random() * s;
    let curr = 0;
    for (let i = 0; i < arr.length; i++) {
        curr += arr[i];
        if (curr > chance) {return i}
    }
    return arr.length-1
}
function getRandomArrayElement(arr, chances) {
    if (chances == undefined || chances.length != arr.length) {
        return arr[Math.floor(arr.length * Math.random())]
    } else if (chances.length == arr.length) {
        return arr[getRandomByChances(chances)]
    }
}
function getRandomByDamage(raid) {
    let damagechance = Math.random() * raid.health;
    let damagetotal = 0;
    for (var key in raid.damagelist) {
        damagetotal += raid.damagelist[key];
        if (damagetotal > damagechance) { return key; }
    }
    return key;
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
    completeQuest(user, "smelt", {"item": item, "money": money, "xp":xp, "materials": materials}, 1)
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
function checkxp(user, extralevels) {
    if (extralevels == undefined || extralevels == 0) {
        return 100 + Math.floor((3 * Math.pow((10 * (user.ascension) + user.level + 1), 2)) * Math.pow(1.5, user.ascension))
    }

    return checkxp({"level": user.level % 100 + 1 , "ascension": user.ascension + Math.floor((user.level + 1)/101)}, extralevels - 1)+checkxp(user)
}

function addQuestCondition(condition, operator, description, total, extra, type) {
    let ret = {}
    ret.description = description;
    if (extra == undefined) { extra = {} }
    if (type != "c") { type = "a" }
    let measure = "";
    let index = condition.indexOf(".")
    if (index != -1) { measure = condition.substring(index + 1); condition = condition.substring(0,index)}
    extra.category = { "value": condition, "operator": "=" }
    ret.measure = measure;
    ret.type = type
    ret.condition = extra
    ret.operator = operator
    ret.total = total
    ret.current = 0;
    return ret
}

function makeQuest(user, name, flavortext, conditions, reward, mqid) {
    if (user == undefined) {
        return {
            "name": name,
            "flavortext": flavortext,
            "conditions": conditions,
            "reward": reward,
            "mqid": mqid
        }}
    user.quests.push({
        "name": name,
        "flavortext": flavortext, 
        "conditions": conditions,
        "reward": reward,
        "mqid": mqid
    })
}

function JSONoperate(json, key, op, obj, mustexist) {
    if (mustexist != false) {mustexist = true}
    if (op == undefined) { op = "get"}
    let curr = json
    let skey = key;
    if (key == undefined) { return}
    while (skey.indexOf(".") != -1) {
        let index = skey.indexOf(".");
        let currkey = skey.substring(0, index)
        skey = skey.substring(index + 1)
        if (skey == undefined || (mustexist && curr[currkey] == undefined)) { return; }
        if (curr[currkey] == undefined) { curr[currkey] = {}}
        curr = curr[currkey];
    }
    if (skey == undefined || (mustexist && curr[skey] == undefined)) { return; }
    if (op == "get") {
        return curr[skey];
    } else if (op == "set") {
        curr[skey] = obj;
        return true;
    } else if (op == "add") {
        if (curr[skey] == undefined) {curr[skey] = 0}
        if (typeof curr[skey] != "number") { return; }
        curr[skey] += obj;
        return true;
    }
}

function completeQuest(user, condition, extra, amount, qnum) {
    if (amount == null || amount == undefined) { amount = 1; }
    if (condition != "user") { extra.user = user; }
    extra.category = condition;
    if (user.quests == undefined) { return;}
    for (var i = 0; i < user.quests.length; i++) {
        if (qnum != undefined && i != qnum) {continue}
        for (var j = 0; j < user.quests[i].conditions.length; j++) {
            let setAmount = amount;
            if (user.quests[i].conditions[j].measure != "" && user.quests[i].conditions[j].measure != undefined) {
                setAmount = parseFloat(JSONoperate(extra, user.quests[i].conditions[j].measure, "get"));
                if (isNaN(setAmount)) { continue; }
            }
            if (user.quests[i].conditions[j].type == "a") {
                let canClaim = true;
                for (var key in user.quests[i].conditions[j].condition) {
                    let curr = JSONoperate(extra, key)
                    if (curr == undefined) { canClaim = false;break;}
                    let op = user.quests[i].conditions[j].condition[key].operator;
                    let value = user.quests[i].conditions[j].condition[key].value;
                    if ((op == "=" && curr == value) || (op == ">" && curr > value) || (op == "<" && curr < value) || (op == "<=" && curr <= value) || (op == ">=" && curr >= value)) { continue }
                    canClaim = false;
                    break;
                }
                if (canClaim) { user.quests[i].conditions[j].current += setAmount; }
            } else {
                let canClaim = true;
                for (var key in user.quests[i].conditions[j].condition) {
                    let curr = JSONoperate(extra, key)
                    if (curr == undefined) { canClaim = false; break; }
                    let op = user.quests[i].conditions[j].condition[key].operator;
                    let value = user.quests[i].conditions[j].condition[key].value;
                    if ((op == "=" && curr == value) || (op == ">" && curr > value) || (op == "<" && curr < value) || (op == "<=" && curr <= value) || (op == ">=" && curr >= value)) { continue }
                    canClaim = false;
                    break;
                }
                if (canClaim) { user.quests[i].conditions[j].current = Math.max(user.quests[i].conditions[j].current,setAmount); }
            }
        }
        if (qnum == i) {break}
    }
}

function adminQuest(text, target) {
    let words = text.trim().split(/\s+/)
    let name, flavortext = "", conditions = [], reward = {};
    let condition, description, total, extra = {};
    let type;
    let operator;
    let mqid;
    let index = words.indexOf("-mqid")
    if (index != -1) {
        mqid = parseInt(words[index + 1]);
        if (isNaN(mqid)) { return "The main quest id must be an integer."}
        words.splice(0, index + 2)
    }
    index = words.indexOf("-name")
    if (index == -1) { return "Please enter a quest name." }
    words.splice(0, index + 1)
    index = words.indexOf("-flavortext")
    if (index != -1) {
        name = words.splice(0, index).join(" ")
        words.splice(0,1)
        index = words.indexOf("-condition")
        if (index == -1) { return "Please enter a quest condition." }
        flavortext = words.splice(0, index).join(" ")
    } else {
        index = words.indexOf("-condition")
        if (index == -1) { return "Please enter a quest condition." }
        name = words.splice(0, index).join(" ")
    }
    while (words.indexOf("-condition") != -1) {
        if (words.length < 5) { return "Please enter a quest condition." }
        type = words[1]
        if (type != "a" && type != "c") { return "Incorrect quest type (" + type + "). Please enter a quest type (`a` or `c`)" }
        condition = words[2]
        operator = words[3]
        if (operator != ">=" && operator != "<=") { return "Incorrect Operator " + operator + " in quest condition. Please enter `>=` or `<=`" }
        total = parseInt(words[4])
        if (isNaN(total)) { return "Total (" + words[4] + ") must be an integer." }
        index = words.indexOf("-desc")
        if (index == -1) { return "Please enter a description for the condition." }
        words.splice(0, index + 1)
        index = words.findIndex(x => ["-special", "-condition", "-reward"].indexOf(x) != -1)
        if (index == -1) { return "Please enter a quest reward." }
        description = words.splice(0, index).join(" ")
        while (words[0] == "-special") {
            if (words.length < 3) { return "Please enter a special condition. The special condition must follow [conditionName] [operator] [value]." }
            let key = words[1];
            let op = words[2];
            if (["=", ">", "<", "<=", ">="].indexOf(op) == -1) { return "Incorrect operator (" + op + "). Please enter `=`, `>`, `<`, `>= or `<=`"; }
            words.splice(0, 3)
            index = words.findIndex(x => ["-special", "-condition", "-reward"].indexOf(x) != -1)
            if (index == -1) { return "Please enter a quest reward." }
            let value = words.splice(0, index).join(" ")
            extra[key] = { "value": value, "operator": op }
        }
        conditions.push(addQuestCondition(condition, operator, description, total, extra, type))
        extra = {}
    }
    index = words.indexOf("-reward")
    if (index == -1) { return "Please enter a quest reward." }
    words.splice(0, index + 1)
    if (words.length % 2 != 0) { return "Please enter a correct quest reward. There must be an amount for every property. " }
    for (let i = 0; i < words.length / 2; i++) {
        let key = words[2 * i];
        let value = parseInt(words[2 * i + 1]);
        if (isNaN(value)) { return "Please enter a correct quest reward. The amount of property " + key + " must be an integer." }
        reward[key] = value;
    }
    makeQuest(target, name, flavortext, conditions, reward, mqid);
    return "The quest `"+name+"` was assigned! Use `!quests` to see it!"
}

function isCD(user, ts, cdtype) {
    if (user.cooldowns[cdtype] == undefined) { return false}
    return calcTime(user.cooldowns[cdtype], ts) > 0
}

function canUseCommand(message, user, cmd) {
    let alias = {"g": "guild", "ratk": "raidAttack"}
    if (user.dungeonts != undefined) {
        if (cmd == "guild" || cmd == "raidattack") { }
    }
}

function extractOptionsAdvanced(message, inorder, ...optionnames) {
    //notes: options must be different. Repeated options should be in an array, like [optionname]
    let words = message.content.split(/\s+/)
    let optioncopy = JSON.parse(JSON.stringify(optionnames))
    if (inorder) {
        return extractWordsInOrder(words, optioncopy, false)
    } else {
        let i = 0
        let ret = {}
        let currIndex = -1;
        let currOption = undefined;
        while (i < words.length) {
            let x = searchNestedArray(optioncopy, words[i])
            if (x != -1) {
                if (currIndex != -1) {
                    if (typeof currOption == "object") {
                        if (ret[currOption[0]] == undefined) { ret[currOption[0]] = [] }
                        ret[currOption[0]].push(words.slice(currIndex + 1, i).join(" "))
                    } else {
                        ret[currOption] = words.slice(currIndex + 1, i).join(" ")
                    }
                }
                currOption = optioncopy[x];
                currIndex = i;
                if (typeof optioncopy[x] == "string") {
                    optioncopy.splice(x, 1)
                }
            }
            i++
        }
        if (currIndex != -1) {
            if (typeof currOption == "object") {
                if (ret[currOption[0]] == undefined) { ret[currOption[0]] = [] }
                ret[currOption[0]].push(words.slice(currIndex + 1, i).join(" "))
            } else {
                ret[currOption] = words.slice(currIndex + 1, i).join(" ")
            }
        }
        return ret
    }
}

function extractWordsInOrder(words, options, canRepeat) {
    if (canRepeat != true) { canRepeat = false; }
    if (typeof options == "string") { return words.slice(1, words.length).join(" ") }
    let ret = []
    let final = []
    for (let i = 0; i < options.length; i++) {
        ret.push(undefined)
    }
    let i = 0;
    let currOption = -1;
    let currIndex = -1;
    while (i < words.length) {
        let x = searchNestedArray(options, words[i])
        let xRepeat = 0;
        if (typeof options[x] == "object") { xRepeat = 1 }
        //console.log(i, currIndex, x, currOption, words, words.length)
        if (x > currOption) {
            if (currOption != -1) {
                ret[currOption] = extractWordsInOrder(words.slice(currIndex, i), options[currOption], true)
            }
            currOption = x;
            currIndex = i;
        } else if (canRepeat && x > -1 && x <= currOption - xRepeat) {
            if (currOption != -1) {
                ret[currOption] = extractWordsInOrder(words.slice(currIndex, i), options[currOption], true)
            }
            currOption = x;
            currIndex = i;
            final.push(ret)
            ret = []
            for (let i = 0; i < options.length; i++) {
                ret.push(undefined)
            }
        }
        i++
    }
    if (currOption != -1) {
        //console.log("Ran", i, currIndex, words.slice(currIndex, i).join(" "))
        ret[currOption] = extractWordsInOrder(words.slice(currIndex, i), options[currOption], true)
        if (canRepeat) { final.push(ret) }
    }
    if (final.length > 0) { return final }
    return ret
}
function searchNestedArray(nestedArray, value) {
    if (nestedArray == value) { return 0 }
    if (typeof nestedArray != "object" || nestedArray.length == undefined) { return -1 }
    for (let i = 0; i < nestedArray.length; i++) {
        if (nestedArray[i] == value) { return i }
        let x = searchNestedArray(nestedArray[i], value)
        if (x != -1) { return i }
    }
    return -1
}
function extractOptions(message, inorder, ...optionnames) {
    let words = message.content.split(/\s+/)
    let ret = {};
    let i = 0;
    if (inorder) {
        while (i < optionnames.length) {
            let option = optionnames[i]
            if (typeof option == "string") {
                let index = words.indexOf(option)
                if (index == -1) { i++; continue }
                words.splice(0, index + 1)
                let nextindex = -1
                while (nextindex == -1) {
                    i++;
                    nextindex = (i == optionnames.length) ? words.length : words.indexOf(optionnames[i])
                }
                if (option.startsWith("-")) { option = option.slice(1) }
                ret[option] = words.splice(0, nextindex).join(" ")
            }
        }
    } else {
        let optioncopy = JSON.parse(JSON.stringify(optionnames))
        let currIndex = -1;
        let currOption = undefined;
        while (i < words.length) {
            let x = optioncopy.indexOf(words[i])
            if (x != -1) {
                if (currIndex != -1) {
                    if (currOption.startsWith("-")) { currOption = currOption.slice(1) }
                    ret[currOption] = words.slice(currIndex + 1, i).join(" ")
                }
                currOption = optioncopy[x];
                currIndex = i;
                if (typeof optioncopy[x] == "string") {
                    optioncopy.splice(x, 1)
                }
            }
            i++
        }
        if (currIndex != -1) {
            if (currOption.startsWith("-")) { currOption = currOption.slice(1) }
            ret[currOption] = words.slice(currIndex + 1, i).join(" ")
        }
    }
    return ret;
}
async function antimacro(message, user) {
    
    let reacts = ["549652727744167936", "💰", "🏳️", "🏃‍♂️"]
    reacts = shuffle(reacts)
    let x = replyMessage(message, "Your way was blocked by a gang of robbers. What will you do? \n <:pvpattack:549652727744167936>: Fight the robbers\n 💰: Bribe the robbers \n🏳️: Surrender to the robbers \n🏃‍♂️: Run away from the robbers")
    if (x == undefined) { return; }
    user.macro = true
    x.then(async msg => {
        if (msg == undefined) { logCommand(message, undefined, "Error with macro message");return; }
        
        if (msg.channel.type == "dm" || msg.channel.type == "group" || (msg.channel.permissionsFor(bot.user) != null && msg.channel.permissionsFor(bot.user).has("ADD_REACTIONS") && msg.channel.permissionsFor(bot.user).has("USE_EXTERNAL_EMOJIS"))) {
            for (let reaction of reacts) {
                console.log(reaction)
                msg.react(reaction).catch(function (err) { errorlog(err); console.log(err) });
            }
        } else {
            return functions.replyMessage(message, "The bot is missing either the `add reactions` permission or the `use external emoji` permission. Please fight robbers in a channel that has these permissions. (or dms with the bot)")
        }
        this.collector = msg.createReactionCollector((reaction, u) => reaction.me && u.id === user._id && u.id !== msg.author.id, { max: 1, time: 10000, errors: ['time'] });
        this.collector.on("collect", (reaction, person) => {
            if (reaction.emoji.toString() == "<:pvpattack:549652727744167936>") {
                getObject("userData", user._id).then(honorguy => {
                    if (honorguy.macro == undefined) { return; }
                    let honorget = Math.floor(1 + Math.random() * 2 * Math.floor(user.ascension / 5))
                    if (honorguy.dailyhonor + honorget > 20 * (1+Math.floor(user.ascension / 5))) { honorget = 20 * (1+Math.floor(user.ascension / 5)) - honorguy.dailyhonor }
                    setProp("userData", {"_id": honorguy._id}, { $inc: { "honor": honorget, "dailyhonor": honorget }, $unset: { "macro": ""} })
                    return replyMessage(message, "The robbers were fought off. You received " + honorget + " honor for keeping the peace.")
                })
            } else if (reaction.emoji.toString() == "💰") {
                replyMessage(message, "Bribery? This is a robbery!")
            } else if (reaction.emoji.toString() == "🏳️") {
                replyMessage(message, "Surrendering is probably a bad idea...")
            } else if (reaction.emoji.toString() == "🏃‍♂️") {
                replyMessage(message, "You tried to run. But unfortunately, the robbers are faster than you.")
            }
        })
    }).catch((err) => {
        console.log(err)
        //console.log(err.size())
        replyMessage(message, "If you wait too long, the robbers will attack you!")
    });
    
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
async function dailyReset() {
    setProp("guildData", {}, { $set: { "store": {} } })
    setProp("userData", {}, { $set: {"dailyhonor": 0}})
    sendMessage(bot.channels.cache.get(devData.debugChannelId), "The guild store has been reset for all guilds!")
    await Promise.all([getObject("mobData", "world")]).then(ret => {
        let raid = ret[0];
        summon(raid)
        sendMessage(bot.channels.cache.get(devData.debugChannelId), "World boss summoned. It is level " + raid.level + "!")
        setObject("mobData", raid);
    })
}
function isGameEvent(ename, second) {
    if (second == undefined) {second = "ongoing"}
    return ename != undefined && devData[ename] != undefined && devData[ename][second]
}
module.exports.clean = clean
module.exports.importObject = importObject
module.exports.getUser = getUser
module.exports.findUsers = findUsers
module.exports.setUser = setUser
module.exports.deleteUser = deleteUser
module.exports.getItem = getItem
module.exports.getFloorMob = getFloorMob
module.exports.findItems = findItems
module.exports.setItem = setItem
module.exports.deleteItem = deleteItem
module.exports.getObject = getObject
module.exports.findObjects = findObjects
module.exports.setObject = setObject
module.exports.deleteObject = deleteObject
module.exports.setProp = setProp
module.exports.bulkWrite = bulkWrite
module.exports.deleteObjects = deleteObjects
module.exports.sendMessage = sendMessage
module.exports.replyMessage = replyMessage
module.exports.deleteMessage = deleteMessage
module.exports.dmUser = dmUser
module.exports.logCommand = logCommand
module.exports.validate = validate
module.exports.getGuildBuff = getGuildBuff
module.exports.hasSkill = hasSkill
module.exports.generateWeaponTemplate = generateWeaponTemplate
module.exports.generateGuildTemplate = generateGuildTemplate
module.exports.generateItem = generateItem
module.exports.generateRandomItem = generateRandomItem
module.exports.calcExtraStat = calcExtraStat
module.exports.calcLuckyBuff = calcLuckyBuff
module.exports.getLogChannel = getLogChannel
module.exports.errorlog = errorlog
module.exports.setCD = setCD
module.exports.calcTime = calcTime
module.exports.displayTime = displayTime
module.exports.extractTime = extractTime
module.exports.simulateAttack = simulateAttack
module.exports.calcDamage = calcDamage
module.exports.calcStats = calcStats
module.exports.calcEnchants = calcEnchants
module.exports.voteItem = voteItem
module.exports.craftItems = craftItems
module.exports.craftItem = craftItem
module.exports.raidInfo = raidInfo
module.exports.customsummon = customsummon
module.exports.locationsummon = locationsummon
module.exports.summon = summon
module.exports.checkProps = checkProps
module.exports.checkStuff = checkStuff
module.exports.postCommandCheck = postCommandCheck
module.exports.raidAttack = raidAttack
module.exports.randint = randint
module.exports.getRandomByDamage = getRandomByDamage
module.exports.getRandomByChances = getRandomByChances
module.exports.getRandomArrayElement = getRandomArrayElement
module.exports.smeltItem = smeltItem
module.exports.itemFilter = itemFilter
module.exports.getModifierText = getModifierText
module.exports.checkxp = checkxp
module.exports.makeQuest = makeQuest
module.exports.completeQuest = completeQuest
module.exports.addQuestCondition = addQuestCondition
module.exports.isCD = isCD
module.exports.secondsUntilReset = secondsUntilReset
module.exports.JSONoperate = JSONoperate
module.exports.adminQuest = adminQuest
module.exports.extractOptions = extractOptions
module.exports.extractOptionsAdvanced = extractOptionsAdvanced
module.exports.searchNestedArray = searchNestedArray
module.exports.antimacro = antimacro
module.exports.shuffle = shuffle
module.exports.dailyReset = dailyReset
module.exports.sendAsEmbed = sendAsEmbed
module.exports.isGameEvent = isGameEvent
fs.readdir("./Utils/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //console.log(file)
        // If the file is not a JS file, ignore it (thanks, Apple)
        if (!file.endsWith(".js") || file == ".js" || file == "functions.js") { return };
        // Load the event file itself
        let commandname = file.split(".")[0];
        //console.log(commandname)
        module.exports[commandname] = require(`./${file}`)
        // Get just the event name from the file name
    });
})
