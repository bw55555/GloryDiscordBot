function consumGive(target, item, amount) {
    if (!userData[target].consum[item]) {
        userData[target].consum[item] = 0
    }

    if (amount < 0 && userData[target].consum[item] + amount < 0) {
        userData[target].consum[item] = 0;
    }
    userData[target].consum[item] += amount;
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
    if (user == bot.id || bot.users.get(user) == undefined) { return }
    if (userData[user].dmmute != true) bot.users.get(user).send(text).catch(function (err) { console.error(err) })
}

function logCommand(message, extratext) {
    if (message.author.bot) { return }
    if (extratext == undefined) { extratext = "" } else { extratext = "|" + extratext }
    sendMessage(bot.guilds.get(debugGuildId).channels.get(debugChannelId), clean(message.author.id + "|" + message.content + "|" + message.createdTimestamp + extratext))
}

function validate(message, spot) {
    if (isNaN(parseInt(spot))) { spot = 1 }
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
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
    if (userData[target] == undefined) {
        //Send fail message here
        sendMessage(message.channel, targetname + " is not a real person");
        return false;
    }

    return target
}
function gvalidate(message) {
    return validate(message, 2)
}
function hasSkill(id, skillid, enable) {
    enable = (enable == false) ? false : true
    if (userData[id].skillA == skillid || userData[id].skillB == skillid || userData[id].skillC == skillid) return enable
    else return false
}
function generateWeaponTemplate(weaponid, current, total) {
    weaponid = weaponid.toString();
    //let name = userData[itemData[weaponid].owner].username
    let mergetext = itemData[weaponid].merge //+ " (Merges until next rarity: " + (10-itemData[weaponid].merge) + ")";
    if (itemData[weaponid].rarity == 'Unique' || itemData[weaponid].rarity == 9) {
        mergetext = "This weapon can't be merged"
    }
    if (!itemData[weaponid].merge) {
        itemData[weaponid].merge = 0;
    }
    let name = ""
    if (itemData[weaponid].owner == "event") {
        name = "event"
    } else {
        if (userData[itemData[weaponid].owner] != undefined) {
            name = userData[itemData[weaponid].owner].username
        } else {
            name = "Name Error"
        }
    }
    return {
        embed: {
            title: "Weapon info for " + name + "\'s weapon",
            color: 0xF1C40F,
            fields: [{
                name: "Owner:",
                value: itemData[weaponid].owner,
                inline: false,
            }, {
                name: "Weapon Name and ID:",
                value: itemData[weaponid].name + " (" + weaponid + ")",
                inline: false,
            }, {
                name: "Attack:",
                value: itemData[weaponid].attack,
                inline: true,
            }, {
                name: "Defense:",
                value: itemData[weaponid].defense,
                inline: true,
            }, {
                name: "Rarity:",
                value: rarities[itemData[weaponid].rarity],
                inline: false,
            }, {
                name: "Modifiers:",
                value: JSON.stringify(itemData[weaponid].modifiers),
                inline: false,
            }, {
                name: "Merges:",
                value: mergetext,
                inline: false,
            }, {
                name: "Favorite:",
                value: JSON.stringify(itemData[weaponid].favorite),
                inline: false,
            }],
            "footer": {
                "text": "Page " + current + " of " + total
            },
        }
    }
}
function generateGuildTemplate(guild) {
    //let name = userData[itemData[weaponid].owner].username
    let xpleft = (Math.pow(guildData[guild].level + 1, 4) > guildData[guild].xp) ? (Math.pow(guildData[guild].level + 1, 4) - guildData[guild].xp) + " xp left to next level" : "Ready to upgrade!"
    xpleft = (guildData[guild].level == 100) ? "MAX level" : xpleft
    return {
        embed: {
            color: 0xF1C40F,
            thumbnail: {
                "url": guildData[guild].icon
            },
            fields: [
                {
                    name: "<:dragonbanner:542171281609457675> Guild Name <:dragonbanner:542171281609457675>",
                    value: guildData[guild].name,
                    inline: true
                },
                {
                    name: "<:guildlevel:542188803339845652> Guild Level <:guildlevel:542188803339845652>",
                    value: guildData[guild].level + " (" + guildData[guild].xp + " xp) (" + xpleft + ")",
                    inline: true
                },
                {
                    name: "<:PandaAdmireWizard:537831495243399168> Guild Leader <:PandaAdmireWizard:537831495243399168>",
                    value: "<@" + guildData[guild].leader + ">",
                    inline: true
                },
                {
                    name: "<:mallowhug:541663981895417866> Guild Members <:mallowhug:541663981895417866>",
                    value: guildData[guild].members.length,
                    inline: true
                },
                {
                    name: "<:guildbank:542186612964982805> Guild Bank <:guildbank:542186612964982805>",
                    value: guildData[guild].bank + " / " + guildData[guild].bankmax,
                    inline: true
                },
                {
                    name: "<:materialsgem:542178396474572805> Guild Materials <:materialsgem:542178396474572805>",
                    value: guildData[guild].materials + " / " + guildData[guild].materialmax,
                    inline: true
                },
                {
                    name: "<:guildcrystal:567335577645613057> Guild Crystals <:guildcrystal:567335577645613057>",
                    value: guildData[guild].crystals,
                    inline: true
                }
            ]
        }
    }
}
function generateItem(owner, itemid, attack, defense, rarity, name, modifiers) {
    if (modifiers == undefined) { modifiers = {} }
    if (name == undefined) {
        let items = ["Stick", "Pebble", "Rock", "Sling"]
        if (!isNaN(userData[owner].triangleid)) {
            if (userData[owner].triangleid % 3 == 1) {
                items = ["Bow", "Crossbow", "Longbow", "Recurve Bow", "Flatbow", "Rifle Crossbow", "Kunai", "Throwing Stars", "Shuriken", "Sniper", "Yumi", "Blow Darts", "Throwing Knife", "Rifle", "Pistol"]
            }
            else if (userData[owner].triangleid % 3 == 2) {
                items = ["Diamond", "Amulet", "Staff", "Wand", "Gem", "Talisman", "Spellblade", "Orb", "Tome", "Book", "Focus", "Flames", "Asta", "Crystal", "Runes", "Runestaff", "Ragnell", "Aura", "Arcanics", "Skull", "Rite"]
            }
            else if (userData[owner].triangleid % 3 == 0 && userData[owner].triangleid != 0) {
                items = ["Sword", "Axe", "Lance", "Spear", "Rapier", "Mace", "Scythe", "Hammer", "Longsword", "Claymore", "Dagger", "Knife", "Scimitar", "Broadsword", "Katana", "Falchion", "Cutlass", "Sabre", "Dao", "Khopesh", "Tachi"]
            }
            if (attack * 5 < defense) {
                items = ["Shield", "Plate", "Robes", "Armor", "Mail"];
            }
        }
        name = rarities[rarity] + " " + items[Math.floor(Math.random() * items.length)]

    }
    if (itemid == null || itemid == "" || itemid == undefined) {
        itemid = itemData.next;
    }
    if (owner != "event") { userData[owner].inventory[itemid] = itemid }
    let maxenhance = (rarity == "Unique") ? 1024 : Math.pow(2, rarity)
    let item = { "owner": owner, "id": itemid, "attack": attack, "defense": defense, "rarity": rarity, "modifiers": modifiers, "name": name, "enhancementlevel": 0, "maxenhancement": maxenhance, "enhancementattempts": 0, "favorite": false, "merge": 0 }
    itemData[itemid] = item;
    itemData.next++;
}

function generateRandomItem(owner, rarity) {
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
    let itemid = itemData.next
    let total = 0
    if (rarity == 0) {
        total = Math.floor((Math.random()) * 5 + 1)
    } else {
        total = Math.floor(raritystats[rarity - 1] + 1 + (raritystats[rarity] - raritystats[rarity - 1]) * Math.random())
    }
    let attack = Math.floor(Math.random() * (total + 1))
    let defense = total - attack

    generateItem(owner, itemid, attack, defense, rarity, undefined, undefined)
    return itemid
}
function calcExtraStat(id, stat) {
    const statlevels = { "health": 100, "attack": 10, "defense": 10 }
    let extrastat = userData[id].ascension * statlevels[stat]
    if (stat == "health") {
        if (userData[id].weapon != false && itemData[userData[id].weapon] != undefined && itemData[userData[id].weapon].modifiers.maxhp != undefined) extrastat += itemData[userData[id].weapon].modifiers.maxhp
    }
    return extrastat
}
function calcLuckyBuff(id) {
    let luckybuff = 1
    if (userData[id].weapon != false && userData[id].weapon != "None" && itemData[userData[id].weapon] != undefined) { //lucky enchant
        //console.log(userData[id].weapon)
        if (itemData[userData[id].weapon].modifiers.lucky != undefined) {
            luckybuff = itemData[userData[id].weapon].modifiers.lucky
        }
    }
    if (hasSkill(id, 16)) { //Royalty Skill
        luckybuff *= 1.5
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.lucky != undefined) {
        luckybuff *= (1 + guildData[userData[id].guild].buffs.lucky.value)
    }
    return luckybuff
}
function calcTime(time1, time2) {
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
///---------------------

function duelCheckDeath(message, id, otherID, ts) {
    if (userData[id].currenthealth <= 0) {
        userData[id].cooldowns.heal = ts + 60000;
        userData[otherID].cooldowns.heal = ts + 60000;
        duel = {};
        replyMessage(message, "" + userData[id].username + " has died. " + userData[otherID].username + " has won the duel!");
        return;
    }
}

function calcDamage(message, attacker, defender, initiator) {
    let text = ""
    let roll = Math.random()
    let burn = 0;
    let attack = 0;
    let skillenable = true;
    if (userData[defender] == undefined && defender.name == "Charybdis") { skillenable = false }
    if (userData[attacker] == undefined && attacker.name == "Charybdis") { skillenable = false }
    let evadechance = Math.random()
    let evaderate = 0;
    if (defender.name == "Will-o'-the-wisp") {
        evaderate += 0.95
    }
    if (evadechance < evaderate) {
        let defendername = defender.name
        if (userData[defender] != undefined) { defendername = "<@" + defender + ">" }
        replyMessage(message, defendername + " has evaded the attack!")
        return 0
    }
    if (userData[attacker] != undefined) {
        attack = 2 * calcStats(message, attacker, "attack", skillenable)
        if (userData[defender] != undefined && hasSkill(defender, 23, skillenable)) {
            attack = calcStats(message, defender, "defense", skillenable)
        }
    } else {
        attack = attacker.attack;
        if (attacker.name == "Hell Lord") {
            if (Math.random() > 0.75) {
                attack = attack * 2
                text += attacker.name +" just dealt critical damage!\n"
            }
        }
        
    }
    
    let defense = 0;
    if (userData[defender] != undefined) {
        defense = calcStats(message, defender, "defense", skillenable)
        if (userData[attacker] != undefined && hasSkill(attacker, 23, skillenable)) {
            defense = calcStats(message, defender, "attack", skillenable)
        }
    }
    if (userData[attacker] != undefined && userData[defender] != undefined) {
        if (userData[attacker].triangleid == 0 || userData[defender].triangleid == 0) {

        } else if ((userData[attacker].triangleid - userData[defender].triangleid) % 3 == 2) {

            if (hasSkill(attacker, 13, skillenable)) {
                attack *= 1.8
            } else {
                attack *= 1.4
            }
        } else {

        }
        if (hasSkill(defender, 37) && userData[attacker].speed > 0) {
            userData[attacker].speed = 0
            text += "<@" + attacker + ">'s tempo was dispelled!\n"
        }
    }

    let weapon = (userData[attacker] != undefined && userData[attacker].weapon != false) ? itemData[userData[attacker].weapon] : false
    let dweapon = (userData[defender] != undefined && userData[defender].weapon != false) ? itemData[userData[defender].weapon] : false
    //let weaponid = userData[attacker].weapon


    //attacker only skills
    let piercechance = Math.random()
    let piercerate = 0
    if (userData[attacker] != undefined) {

        if (weapon != false && weapon.modifiers.pierce != undefined) { piercerate += weapon.modifiers.pierce }

        if (hasSkill(attacker, 6, skillenable)) {
            piercerate += 0.2;
        }
        if (hasSkill(attacker, 28, skillenable)) {
            piercerate += 0.05;
        }
        if (userData[attacker] != undefined && userData[attacker].guild != "None" && guildData[userData[attacker].guild].buffs.pierce != undefined) {
            piercerate += guildData[userData[attacker].guild].buffs.pierce.value
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
        if (userData[defender] == undefined) {
            attack *= 1.5
        } else {
            defense = 0
        }
        let attackername = attacker.name
        if (userData[attacker] != undefined) { attackername = "<@" + attacker + ">" }
        text += attackername + " has pierced their opponents defense!\n"
        if (userData[attacker] != undefined && hasSkill(attacker, 28, skillenable)) {
            attack *= 1.4
        }
    }

    //Both?
    let spikedmod = 0;
    if (dweapon != false && dweapon.modifiers.spikes != undefined) {
        spikedmod += dweapon.modifiers.spikes
    }
    if (userData[defender] != undefined && userData[defender].guild != "None" && guildData[userData[defender].guild].buffs.spikes != undefined) {
        spikedmod += guildData[userData[defender].guild].buffs.spikes.value
    }
    if (userData[defender] != undefined) {
        if (hasSkill(defender, 7, skillenable)) {
            spikedmod += 0.5;
        }
        if (hasSkill(defender, 31, skillenable)) {
            spikedmod += 0.2;
        }
    }
    if (spikedmod > 0) {
        let spiked = Math.floor(defense * spikedmod)
        if (userData[attacker] != undefined) {
            if (hasSkill(attacker, 37)) { text += "<@" + defender + ">'s spikes was dispelled!\n" }
            else {
                userData[attacker].currenthealth -= spiked
                text += "<@" + attacker + "> has been damaged for " + spiked + " health due to spikes!\n"
            }
            if (userData[defender] != undefined) {
                if (hasSkill(defender, 31, skillenable)) {
                    if (hasSkill(attacker, 37)) { text += "<@" + defender + ">'s burn was dispelled!\n" }
                    else {
                        if (userData[attacker].burn == undefined) { userData[attacker].burn = 0 }
                        userData[attacker].burn += spikedmod * 5; //Burn status, if burning, have a chance to take 5% damage after talking.
                        text += "<@" + attacker + "> is now burning!"
                    }
                }
            }
        } else {
            attack += spiked;
            text += "<@" + defender + "> has damaged the raid boss with spikes!\n"
        }
    }

    //burn check
    if (userData[attacker] != undefined) {
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
    if (userData[defender] != undefined && hasSkill(defender, 37)) {
        text += "<@" + attacker + ">'s burn was dispelled!\n"
        burn = 0
    }
    if (burn > 0) {
        if (userData[defender] != undefined) {
            userData[defender].burn = burn;
            text += "<@" + defender + "> is now burning!\n"
        } else {
            text += "Raid boss cannot be burned!\n"
        }
    }


    let blockrate = 0;
    let blockchance = Math.random()
    if (userData[defender] != undefined && userData[defender].guild != "None" && guildData[userData[defender].guild].buffs.block != undefined) {
        blockrate += guildData[userData[defender].guild].buffs.block.value
    }
    if (userData[defender] != undefined && userData[defender].dead == false) {
        if (dweapon != false && dweapon.modifiers.block != undefined) {
            blockrate += dweapon.modifiers.block
        }
        if (hasSkill(defender, 10, skillenable)) {
            blockrate += 0.15;
        }
        if (hasSkill(defender, 30, skillenable)) {
            blockrate += 0.05;
        }

    } else if (userData[defender] == undefined) {
        if (defender.name == "Baba Yaga") {
            blockrate += 0.2
        }
        if (defender.name == "Asmodeus") {
            blockrate += 0.2
        }
    }

    if (blockrate > blockchance) {
        let defendername = defender.name
        if (userData[defender] != undefined) { defendername = "<@" + defender + ">" }
        let attackername = attacker.name
        if (userData[attacker] != undefined) { attackername = "<@" + attacker + ">" }
        if (piercechance < piercerate) {
            text += defendername + " has blocked the attack, but " + attackername + " pierced though anyway!\n"
        } else {
            text += defendername + " has blocked the attack!\n"
            attack = 0;
            if (userData[defender] != undefined && hasSkill(defender, 30, skillenable)) {
                userData[defender].bolster = true
                text += defendername + " was bolstered!\n"
            }
        }
    }

    if (userData[attacker] != undefined) {
        let lifesteal = (userData[attacker].triangleid == 11) ? 0.15 : 0;
        if (userData[attacker] != undefined && userData[attacker].guild != "None" && guildData[userData[attacker].guild].buffs.lifeSteal != undefined) {
            lifesteal += guildData[userData[attacker].guild].buffs.lifeSteal.value
        }
        if (weapon != false && weapon.modifiers.lifeSteal != undefined) {
            lifesteal += weapon.modifiers.lifeSteal
        }
        if (hasSkill(attacker, 3, skillenable)) {
            lifesteal += 0.1;
        }
        if (hasSkill(attacker, 21, skillenable)) {
            if (userData[attacker].currenthealth >= userData[attacker].health) {
                lifesteal += 0.5;
            }
        }
        if (lifesteal > 0) {
            let stealAmount = Math.abs(Math.floor((attack * 0.75 * roll + attack * 0.25 - defense) * lifesteal))
            if (stealAmount < 0) { stealAmount = 0 }
            userData[attacker].currenthealth += stealAmount
            text += "<@" + attacker + "> lifestole **" + stealAmount + "** health!\n";
        }
    }
    if (userData[attacker] != undefined) {

        if (hasSkill(attacker, 22, skillenable)) {
            let leech = 0
            if (userData[defender] != undefined) {
                leech = Math.floor(0.05 * userData[defender].currenthealth);
                userData[attacker].currenthealth += leech
                userData[defender].currenthealth -= leech
                text += "<@" + attacker + "> leeched **" + leech + "** health!\n";
            }
            else {
                //leech = Math.floor(0.05 * defender.currenthealth);
                //userData[attacker].currenthealth += leech;
                //defender.currenthealth -= leech;
            }
        }
    }
    //defender only skills
    let revmod = 0;
    let revengechance = Math.random()
    if (userData[defender] != undefined) {
        if (attacker == initiator && dweapon != false && dweapon.modifiers.revenge != undefined) {
            revmod += dweapon.modifiers.revenge;
        }

        if (hasSkill(defender, 8, skillenable)) {
            revmod += 0.02;
        }
        if (hasSkill(defender, 32, skillenable)) {
            revmod += 0.005;
            revmod *= 2;
        }
        if (userData[defender] != undefined && userData[defender].guild != "None" && guildData[userData[defender].guild].buffs.revenge != undefined) {
            revmod += guildData[userData[defender].guild].buffs.revenge.value
        }
    }

    if (userData[attacker] != undefined) {
        if (revengechance < revmod) {
            userData[attacker].currenthealth = 0;
            text += "<@" + defender + "> has avenged the attack!\n"
            //return false
        }
    } else {
        if (attacker.name == "Medusa" && revengechance < 0.15) {
            userData[defender].currenthealth = 0;
            text += "<@" + defender + "> has been turned to stone! (And killed)\n"
        }
        else if (attacker.name == "Asmodeus" && revengechance < 0.1) {
            userData[defender].currenthealth = 0;
            text += "<@" + defender + "> has been beheaded! (And killed)\n"
        }
        else if (attacker.name == "Godzilla" && revengechance < 0.2) {
            userData[defender].currenthealth = 0;
            text += "<@" + defender + "> has been squashed! (And killed)\n"
        }
    }

    //Percentage increases
    if (defender != -1 && attacker == initiator) {
        if (hasSkill(defender, 19, skillenable)) {
            defense *= 1.3;
        }
    }
    if (userData[attacker] != undefined && attacker == initiator) {
        if (hasSkill(attacker, 18, skillenable)) {
            attack *= 1.3;
        }
    }
    //console.log("Counter")

    truedamage = Math.floor(attack * 0.75 * roll + attack * 0.25 - defense)

    //Last Breath Check
    if (userData[defender] != undefined) {
        if (hasSkill(defender, 25, skillenable)) {
            if (truedamage > userData[defender].currenthealth && userData[defender].currenthealth * 2 > userData[defender].health) {
                userData[defender].currenthealth = truedamage + 1
                text += "<@" + defender + "> has activated Last Breath!"
            }
        }
    }



    if (text != "") { sendMessage(message.channel, text) }
    return truedamage
}
function calcStats(message, id, stat, skillenable) {
    skillenable = (skillenable == false) ? false : true
    let text = ""
    let attack = userData[id].attack
    let defense = userData[id].defense
    let buff = userData[id].trianglemod;
    let dbuff = 1;
    let critrate = 0;
    critrate = (userData[id].triangleid == 4) ? 0.08 : 0;
    let critdmg = (userData[id].triangleid == 4) ? 3 : 2;
    let rage = (userData[id].triangleid == 6) ? 1 : 0;
    let sacrifice = (userData[id].triangleid == 311) ? 0.15 : 0;
    let tempo = 0;
    let antitempo = 0;
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.attack != undefined) {
        buff += guildData[userData[id].guild].buffs.attack.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.defense != undefined) {
        dbuff += guildData[userData[id].guild].buffs.defense.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.critDamage != undefined) {
        critdmg += guildData[userData[id].guild].buffs.critDamage.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.critRate != undefined) {
        critrate += guildData[userData[id].guild].buffs.critRate.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.tempo != undefined) {
        tempo += guildData[userData[id].guild].buffs.tempo.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.sacrifice != undefined) {
        sacrifice += guildData[userData[id].guild].buffs.sacrifice.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.rage != undefined) {
        rage += guildData[userData[id].guild].buffs.rage.value
    }
    if (userData[id].weapon != false && userData[id].weapon != "None" && itemData[userData[id].weapon] != undefined) {
        //console.log(userData[id].weapon)
        if (itemData[userData[id].weapon].modifiers == undefined) { itemData[userData[id].weapon].modifiers = {} }
        if (itemData[userData[id].weapon].modifiers.critRate != undefined) {
            critrate += itemData[userData[id].weapon].modifiers.critRate
        }
        if (itemData[userData[id].weapon].modifiers.critDamage != undefined) {
            critdmg += itemData[userData[id].weapon].modifiers.critDamage
        }

        if (itemData[userData[id].weapon].modifiers.rage != undefined) {
            rage += itemData[userData[id].weapon].modifiers.rage
        }
        if (itemData[userData[id].weapon].modifiers.sacrifice != undefined) {
            sacrifice += itemData[userData[id].weapon].modifiers.sacrifice
        }
        if (itemData[userData[id].weapon].modifiers.tempo != undefined) {
            tempo += itemData[userData[id].weapon].modifiers.tempo
        }
    }
    //if (userData[id].skills == undefined) { userData[id].skills = {} }
    if (hasSkill(id, 0, skillenable)) {
        attack += 20;
    }
    if (hasSkill(id, 1, skillenable)) {
        defense += 20;
    }
    if (hasSkill(id, 2, skillenable)) {
        rage += .7;
    }
    if (hasSkill(id, 4, skillenable)) {
        sacrifice += 0.2;
    }
    if (hasSkill(id, 5, skillenable)) {
        tempo += 1;
    }
    if (hasSkill(id, 9, skillenable)) {
        critrate += 0.06;
    }
    if (hasSkill(id, 12, skillenable)) {
        if (userData[id].health == userData[id].currenthealth) {
            buff *= 1.5;
            /*buff += 1;
            dbuff += 1;*/
        }
    }
    if (hasSkill(id, 17, skillenable)) {
        attack += 50;
        defense -= 50;
    }
    if (hasSkill(id, 26, skillenable)) {
        sacrifice += 0.05
    }
    if (hasSkill(id, 27, skillenable)) {
        critrate += 0.01
        critdmg += 2
    }
    if (hasSkill(id, 28, skillenable)) {
        rage += 0.3
    }
    if (hasSkill(id, 33, skillenable)) {
        antitempo += 1;
    }

    if (userData[id].bolster == true) {
        buff *= 1.5;
        dbuff *= 1.5;
        userData[id].bolster = false;
    }

    if (stat == "attack") {

        if (userData[id].weapon != false && userData[id].weapon != "None" && itemData[userData[id].weapon] != undefined) {
            attack += itemData[userData[id].weapon].attack;
        }
        if (rage > 0) {
            let x = userData[id].currenthealth / userData[id].health
            if (hasSkill(id, 28, skillenable)) {
                x = userData[id].currenthealth / userData[id].health / 2
            }
            buff *= 1 + (rage * -1 * Math.log(x));
        }
        if (sacrifice > 0) {
            buff += sacrifice
            if (hasSkill(id, 26, skillenable)) {
                //userData[id].currenthealth += Math.floor(buff * attack * sacrifice)
                text += "<@" + id + "> \"sacrificed\" **" + Math.floor(buff * attack * sacrifice) + "** Health, but mysteriously just didn't!\n";
            } else {
                userData[id].currenthealth -= Math.floor(buff * attack * sacrifice)
                text += "<@" + id + "> sacrificed **" + Math.floor(buff * attack * sacrifice) + "** Health!\n";
            }
        }

        let urspeed = userData[id].speed
        if (tempo > 0) {

            if (urspeed > 25) {
                urspeed = 25
            }
            buff += ((urspeed * 0.05 * tempo));
            text += "<@" + id + "> has **" + urspeed + "** tempo\n";
        }
        if (antitempo > 0) {

            if (urspeed > 25) {
                urspeed = 25
            }
            dbuff += ((urspeed * 0.05 * antitempo));
            text += "<@" + id + "> has **" + urspeed + "** antitempo\n";
        }

        if (hasSkill(id, 20, skillenable)) {
            if (urspeed > 25) {
                urspeed = 25
            }
            critrate += 0.008 * urspeed;
            text += "<@" + id + "> has **" + (Math.floor(critrate * 1000) / 10) + "%** chance of hitting a critical\n"
        }

        let critchance = Math.random();
        if (critchance < critrate) {
            text += "<@" + id + "> just dealt critical damage!\n";
            buff *= critdmg;
        }

        if (text != "") { sendMessage(message.channel, text) }
        return Math.floor(buff * attack)

    }
    if (stat == "defense") {
        //console.log(userData[id].weapon)

        //console.log(userData[id].weapon)
        //console.log("ItemData length:" + currentItemList)
        if (userData[id].weapon != false && userData[id].weapon != "None" && itemData[userData[id].weapon] != undefined) {
            defense += itemData[userData[id].weapon].defense
        }
        if (text != "") { sendMessage(message.channel, text) }
        return Math.floor(dbuff * defense)
    }
}
///---------------
function voteItem(message, dm) {
    dm = dm == true ? true : false
    let ts = message.createdTimestamp
    let target = validate(message)
    if (target == false) { return }
    let text = ""
    if (userData[target].votestreak == undefined) { userData[target].votestreak = 0 }
    if (userData[target].votestreaktime == undefined) { userData[target].votestreaktime = ts + 24 * 60 * 60 * 1000 }
    if (calcTime(userData[target].votestreaktime, ts) < 0) {
        text = "You lost your streak... :("
        userData[target].votestreak = 0
    } else if (calcTime(userData[target].votestreaktime, ts) > 12 * 60 * 60) {
        return sendMessage(message.channel, "It hasn't been 12 hours yet... DBL broke down :(")
    } else {
        text = "You have a streak of " + (userData[target].votestreak+1)+"!"
    }
    userData[target].votestreak += 1
    userData[target].votestreaktime = ts + 24 * 60 * 60 * 1000
    let numboxes = Math.ceil((1 + userData[target].ascension) * Math.sqrt(userData[target].votestreak)/2)
    
    if (userData[target].glory != undefined && userData[target].glory < 100) {
        userData[target].glory += Math.random() * 0.5;
    }
    consumGive(target, "box",numboxes)
    sendMessage(message.channel, "<@" + target + "> has been given "+numboxes + " boxes!\n"+text)
    if (dm) dmUser(target, "Thank you for voting! You have been given " + numboxes + " boxes!\n" + text)
}
function craftItems(message, minrarity, maxrarity, amount) {
    amount = (isNaN(parseInt(amount))) ? 1 : parseInt(amount)
    if (amount > 1) {
        let id = message.author.id;
        let getrarities = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (var i = 0; i < amount; i++) {
            itemid = craftItem(message, minrarity, maxrarity, false);
            rarity = itemData[itemid].rarity
            getrarities[rarity] += 1
        }
        let text = ""
        for (var i = 0; i < 9; i++) {
            if (getrarities[i] == 0) { continue }
            text += global.rarities[i] + ": " + getrarities[i] + "\n"
        }
        return text
    } else {
        craftItem(message, minrarity, maxrarity, true)
        return ""
    }
}
function craftItem(message, minrarity, maxrarity, reply) {
    reply = (reply == false) ? false : true
    let target = message.author.id
    let itemid = 0
    if (minrarity == -1 || maxrarity == -1) {
        itemid = generateRandomItem(target)
    } else {
        let rarity = Math.floor((maxrarity - minrarity + 1) * Math.random() + minrarity)
        itemid = generateRandomItem(target, rarity)
    }
    if (reply) sendMessage(message.channel, "<@" + target + "> has recieved an item with id " + itemid + " and of rarity " + itemData[itemid].rarity)
    return itemid
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
                url: raid.url
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


function summon(channel, minlevel, maxlevel, name, image) {
    if (!mobData[message.channel.id]) {
        if (bot.guilds.get(message.guild.id).members.size < 50 && devs.indexOf(id) == -1) { return replyMessage(message, "You cannot summon a raid in a server with less than 50 members!") }
    }
    if (mobData[channel].raid == true) { return replyMessage(message, "You already have an ongoing raid in this server! Defeat it first!") }
    if (!mobData[message.channel.id]) mobData[message.channel.id] = {} //creates profile if none exists
    if (!mobData[message.channel.id].name) mobData[message.channel.id].name = name;
    if (!mobData[message.channel.id].attack) mobData[message.channel.id].attack = 0;
    if (!mobData[message.channel.id].id) mobData[message.channel.id].id = 1;
    if (!mobData[message.channel.id].currenthealth) mobData[message.channel.id].currenthealth = 0;
    if (!mobData[message.channel.id].reward) mobData[message.channel.id].reward = 0;
    if (!mobData[message.channel.id].alive) mobData[message.channel.id].alive = false;
    if (!mobData[message.channel.id].raid) mobData[message.channel.id].raid = false;
    if (!mobData[message.channel.id].level) mobData[message.channel.id].level = 0;
    if (!mobData[message.channel.id].minlevel) mobData[message.channel.id].minlevel = minlevel;
    if (!mobData[message.channel.id].maxlevel) mobData[message.channel.id].maxlevel = maxlevel;
    if (!mobData[message.channel.id].url) {
        mobData[message.channel.id].url = image;
        if (image == -1) {
            mobData[message.channel.id].url = 'https://i.imgur.com/NsBoS0u.jpg';
        }
    }

    let summonlevel = Math.floor((mobData[message.channel.id].minlevel) + (((mobData[message.channel.id].maxlevel) - (mobData[message.channel.id].minlevel)) * Math.random())) + 1

    mobData[message.channel.id].alive = true;
    mobData[message.channel.id].raid = true;
    mobData[message.channel.id].attack = summonlevel * 10;
    mobData[message.channel.id].currenthealth = summonlevel * 5;
    mobData[message.channel.id].maxhealth = summonlevel * 5;
    mobData[message.channel.id].reward = summonlevel * 500;
    mobData[message.channel.id].level = summonlevel;
    mobData[message.channel.id].attacklist = {};
    replyMessage(message, name + " has been summoned. It is level " + summonlevel + "!");
}
function checkProps(message) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    if (!userData[id]) userData[id] = {} //creates profile if none exists
    if (userData[id].username != message.author.username) userData[id].username = message.author.username; //Creates object with name as username
    if (!userData[id].id) userData[id].id = id; //sets id
    if (!userData[id].money) userData[id].money = 0; //gives money object
    if (!userData[id].lastDaily) userData[id].lastDaily = "Not Collected"; //check if daily collected
    if (!userData[id].health) userData[id].health = 10; //Health
    if (!userData[id].currenthealth) userData[id].currenthealth = 0; //Health
    if (!userData[id].xp) userData[id].xp = 0; //XP
    if (!userData[id].level) userData[id].level = 1; //XP
    if (!userData[id].attack) userData[id].attack = 0; //character's attack
    if (!userData[id].defense) userData[id].defense = 0; //character's defense
    if (!userData[id].speed) userData[id].speed = 0; //character's speed
    if (!userData[id].dead) userData[id].dead = false; //character's status (alive/dead)
    if (!userData[id].start) userData[id].start = false; //character's speed
    if (!userData[id].triangle) userData[id].triangle = "None"; //character's class
    if (!userData[id].triangleid) userData[id].triangleid = "0"; //character's class
    if (!userData[id].trianglemod) userData[id].trianglemod = 1.0; //character's class-based damage modifier.
    if (!userData[id].weapon && userData[id].weapon != 0) userData[id].weapon = false;
    if (!userData[id].ability) userData[id].ability = "Ability";
    if (!userData[id].inventory) userData[id].inventory = {};
    if (!userData[id].marry) userData[id].marry = "None";
    if (!userData[id].marrytarget) userData[id].marrytarget = "None";
    if (!userData[id].guild) userData[id].guild = "None";
    if (!userData[id].guildpos) userData[id].guildpos = "None";
    if (!userData[id].guildtarget) userData[id].guildtarget = "None";
    if (!userData[id].bolster) userData[id].bolster = false;
    if (!userData[id].shield) userData[id].shield = ts + 24 * 1000 * 60 * 60;
    if (!userData[id].materials) userData[id].materials = 0;
    //if (!userData[id].explosion) userData[id].explosion = 0;
    //if (!userData[id].box) userData[id].box = 0;
    if (!userData[id].ascension) userData[id].ascension = 0;
    if (!userData[id].bounty) userData[id].bounty = 0;
    //if (!userData[id].sp) userData[id].sp = 0;
    //if (!userData[id].phoenixfeather) userData[id].phoenixfeather = 0;
    //if (!userData[id].nametag) userData[id].nametag = 0;
    //if (!userData[id].reroll) userData[id].reroll = 0;

    if (!userData[id].glory) userData[id].glory = 0;

    if (!userData[id].buffs) userData[id].buffs = {};
    if (!userData[id].buffs.attack) userData[id].buffs.attack = 0;
    if (!userData[id].buffs.defense) userData[id].buffs.defense = 0;
    if (!userData[id].buffs.health) userData[id].buffs.health = 0;

    if (!userData[id].cooldowns) userData[id].cooldowns = {}
    if (!userData[id].cooldowns.normal) userData[id].cooldowns.normal = 1;
    if (!userData[id].cooldowns.attack) userData[id].cooldowns.attack = 1;
    if (!userData[id].cooldowns.heal) userData[id].cooldowns.heal = 1;
    if (!userData[id].cooldowns.rez) userData[id].cooldowns.rez = 1;
    if (!userData[id].cooldowns.work) userData[id].cooldowns.work = 1;
    if (!userData[id].cooldowns.bolster) userData[id].cooldowns.bolster = 1;
    if (!userData[id].cooldowns.smeltall) userData[id].cooldowns.smeltall = 1;
    if (!userData[id].cooldowns.purchase) userData[id].cooldowns.purchase = 1;
    if (!userData[id].cooldowns.merge) userData[id].cooldowns.merge = 1;

    if (!userData[id].skills) userData[id].skills = {}
    if (!userData[id].skillA) userData[id].skillA = "None";
    if (!userData[id].skillB) userData[id].skillB = "None";
    if (!userData[id].skillC) userData[id].skillC = "None";

    if (!userData[id].consum) userData[id].consum = {}
    if (!userData[id].consum.explosion) userData[id].consum.explosion = 0;
    if (!userData[id].consum.egg) userData[id].consum.egg = 0;
    if (!userData[id].consum.eggsplosion) userData[id].consum.eggsplosion = 0;
    if (!userData[id].consum.box) userData[id].consum.box = 0;
    if (!userData[id].consum.sp) userData[id].consum.sp = 0;
    if (!userData[id].consum.phoenixfeather) userData[id].consum.phoenixfeather = 0;
    if (!userData[id].consum.nametag) userData[id].consum.nametag = 0;
    if (!userData[id].consum.reroll) userData[id].consum.reroll = 0;
    /*
	if (userData[id].attack > userData[id].level) userData[id].attack = userData[id].level;
	if (userData[id].defense > userData[id].level) userData[id].defense = userData[id].level;
	if (userData[id].health > userData[id].level * 10) userData[id].health = userData[id].level * 10;
	*/
    if (userData[id].currenthealth > userData[id].health) userData[id].currenthealth = userData[id].health;

    if (userData[id].start === false) { //when you start, your currenthealth will be to 10;
        userData[id].currenthealth = 10;
        userData[id].start = true;
        //console.log(userData[id].start);
    }
    if (admins.indexOf(id) == -1) {
        if (userData[id].attack > userData[id].level + calcExtraStat(id, "attack")) userData[id].attack = userData[id].level + calcExtraStat(id, "attack"); //prevents overleveling
        if (userData[id].defense > userData[id].level + calcExtraStat(id, "defense")) userData[id].defense = userData[id].level + calcExtraStat(id, "defense")
        //extrahp = (userData[id].weapon != false && itemData[userData[id].weapon].modifiers.maxhp != undefined) ? itemData[userData[id].weapon].modifiers.maxhp : 0
        // if (userData[id].health > userData[id].level * 10 + extrahp) userData[id].health = userData[id].level * 10;
        if (userData[id].health > userData[id].level * 10 + calcExtraStat(id, "health")) userData[id].health = userData[id].level * 10 + calcExtraStat(id, "health")
    }
}
function checkStuff(message) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    checkProps(message)



    //userData[id].xp += Math.floor(20 * Math.random() + 1); //whenever a message is sent, their experience increases by a random number 1-25.
    userData[id].xp += 1 + Math.floor(Math.random() * userData[id].level);
    let leveluptext = ""
    while (userData[id].xp >= Math.floor((3 * Math.pow((userData[id].level + 1), 2) + 100) * Math.pow(1.5, userData[id].ascension)) && userData[id].level < 100) { //increases levels when xp>100*level
        userData[id].xp -= Math.floor((3 * Math.pow((userData[id].level + 1), 2) + 100) * Math.pow(1.5, userData[id].ascension))
        userData[id].level += 1;
        leveluptext += "You leveled up to level " + userData[id].level + "!\n"
        if (userData[id].level === 5 && userData[id].triangle == "None") {
            replyMessage(message, "You are level 5! Use !class to get information on how to choose a **class**!");
        }
        if (userData[id].level === 15 && (userData[id].triangle == "None" || userData[id].triangleid < 4)) {
            replyMessage(message, "You are level 15! Use !class to get information on how to choose a **subclass**!");
        }
        if (leveluptext.length > 1900) {
            replyMessage(message, leveluptext)
            leveluptext = ""
        }
    }
    if (leveluptext != "") {
        replyMessage(message, leveluptext)
    }


    if (userData[id].currenthealth <= 0) { //If health is 0, you are dead.
        userData[id].currenthealth = 0;
        userData[id].dead = true;
    }

}

function checkBurn(message) {
    let id = message.author.id
    //let ts = message.createdTimestamp;
    if (userData[id].burn != undefined && userData[id].dead == false && !isNaN(userData[id].burn)) {
        let burndamage = Math.floor(userData[id].health * .05)
        userData[id].burn -= 1
        userData[id].currenthealth -= burndamage
        let burntext = "You took **" + burndamage + "** from burning. (You will burn for "+userData[id].burn+" more commands)"
        if (userData[id].dead) {
            burntext += " You burned to death!"
            userData[id].dead = true
            delete userData[id].burn
            burntext += " The flames have ceased."
        }
        if (userData[id].burn < 0 || userData[id].dead == true || isNaN(userData[id].burn)) {
            delete userData[id].burn
            burntext += " The flames have ceased."
        }
        replyMessage(message, burntext)
    } else if (isNaN(userData[id].burn)) {
        delete userData[id].burn
    }
}

function raidAttack(message, raid, resummon, isguild, isevent) { //raid attack
    isguild = (isguild == true) ? true : false
    isevent = (isevent == true) ? true : false
    let id = message.author.id;
    let ts = message.createdTimestamp;
    if (raid == undefined || (!isguild && !isevent && message.channel.id == "542171947895881748")) { return }
    if (!raid.attacklist) { raid.attacklist = {} }
    if (!raid.attacklist[id]) { raid.attacklist[id] = 0 }
    if (userData[id].dead === true) {
        replyMessage(message, "Corpses can\'t attack! Do !resurrect");
        return false;
    }
    if (mobData.raid === false && !isguild && !isevent) {
        deleteMessage(message);
        replyMessage(message, "There is no raid right now!");
        return false;
    }
    if (calcTime(userData[id].cooldowns.attack, ts) > 0) {
        deleteMessage(message);
        replyMessage(message, 'You can\'t attack right now.\n You can attack again in ' + displayTime(userData[id].cooldowns.attack, ts) + ".");
        return false;
    }
    if (raid.alive === false) {
        replyMessage(message, "There is no raid going on right now!");
        return false;
    }
    if (userData[id].dead == true) {
        replyMessage(message, "Corpses can\'t attack! Do !resurrect");
        return false;
    }
    if (userData[id].level + userData[id].ascension * 10 < raid.level - 15 && !isguild && !isevent) {
        replyMessage(message, "You can't attack bosses with more than 15 levels more than you!");
        return false;
    }
    if (userData[id].shield > ts) {
        replyMessage(message, "You just attacked! You lost your shield :(");
        userData[id].shield = 1
    }
    let luckybuff = calcLuckyBuff(id)
    let damage = calcDamage(message, id, -1, id);//ok...
    damage = Math.floor(1 + 2 * Math.floor(Math.sqrt(damage)));
    /*let youratk = Math.floor(calcStats(message, id, "attack"));
    youratk=Math.floor(youratk*Math.random()*0.75+youratk*0.25)
    let theirdef = 0; //(Math.floor(mobData[message.channel.id].defense * Math.random()));
    let damage = Math.floor(1 + 2 * Math.floor(Math.sqrt(youratk)));*/


    //let theiratk = Math.floor((raid.attack) * Math.random());
    //let yourdef = (Math.floor(calcStats(message, id, "defense") * Math.random()));
    let counter = calcDamage(message, raid, id, id);
    if (raid.name == "Cerberus") {
        for (var i = 0; i < 2 * Math.random() ; i++) {
            counter += calcDamage(message, raid, id, id);
        }
        sendMessage(message.channel, "Cerberus attacked " + i + " times!")
    }

    if (damage < 0) {
        damage = 0;
    }
    if (counter < 0) {
        counter = 0;
    }
    let damagereward = Math.floor(damage * raid.level * Math.random() * luckybuff);
    if (!isevent) { damagereward *= 5 }
    userData[id].currenthealth = userData[id].currenthealth - counter;
    raid.currenthealth = raid.currenthealth - damage;
    let counterstolen = Math.floor((userData[id].money) / 5);
    if (!raid.attacklist[id]) { raid.attacklist[id] = 0 }
    raid.attacklist[id] += damagereward
    //userData[id].money += damagereward;
    userData[id].xp += damagereward;
    if (userData[id].currenthealth > userData[id].health) {
        userData[id].currenthealth = userData[id].health
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
                    value: '<@' + id + "> attacks a Lv." + raid.level + " " + raid.name + "!",
                },*/
                {
                    name: "Attack Results",
                    value: '<@' + id + "> attacks a Lv." + raid.level + " " + raid.name + "!\n" + raid.name + " took **" + damage + "** damage! It has " + raid.currenthealth + " Health remaining! You earned " + damagereward + " xp!",
                }, {
                    name: "Counter Results",
                    value: "<@" + id + "> took **" + counter + "** counterdamage! You have " + userData[id].currenthealth + " Health remaining!",
                }
            ]
        }
    })
    let text = ""
    if (raid.currenthealth <= 0) {
        raid.alive = false;
        //raid.raid = false;
        let keys = Object.keys(raid.attacklist);
        luckyperson = keys[Math.floor(keys.length * Math.random())]
        if (isevent) {
            let listtotal = 0;
            for (var i = 0; i < keys.length; i++) {
                let user = keys[i];
                userData[user].money += raid.attacklist[user];
                listtotal += raid.attacklist[user];
            }
            for (var i = 0; i < keys.length; i++) {
                if (userData[keys[i]].ascension > 0) {
                    userData[keys[i]].glory += (raid.level / 25) * (raid.attacklist[keys[i]] / listtotal);
                }
            }
            for (var k = 0; k < 2; k++) {
                var i = Math.floor(Math.random() * keys.length)
                consumGive(keys[i], "reroll", 1);
                text += "<@" + keys[i] + "> was lucky and recieved a skill reroll!\n"
            }
        } else {
            for (var i = 0; i < keys.length; i++) {
                let user = keys[i];
                userData[user].money += raid.attacklist[user];
            }
        }
        let itemfound = "none";
        if (!isguild) {
            let itemid = 0
            if (raid.itemReward == undefined) {
                let rarity = Math.floor(raid.level/75) + Math.floor(Math.random() * (Math.min(raid.level, 75) / 15 - Math.floor(raid.level/75)))
                if (raid.level > 75 && Math.random() < (raid.level - 75) / 1000) {
                    rarity = 5
                }
                
                if (isevent) {
                    rarity = Math.floor(5.5 + (2 * Math.random()))
                }
                if (raid.level > 75) {
                    let where = [" in the boss's corpse", " in a treasure chest", " randomly", " because they felt like it", " rotting in a pile", " in a tunnel", " in a cave", " in the boss's stomach", " hit them on the head", " drop from the sky"];
                    let roll = Math.random()
                    if (roll > 0.995) {
                        consumGive(luckyperson, "reroll", 1);
                        itemfound = 1 + " **SKILL REROLL** " + where[Math.floor(Math.random() * where.length)];
                    }
                    if (roll > 0.98) {
                        let feathersfound = Math.floor(1 + Math.random() * 3);
                        consumGive(luckyperson, "phoenixfeather", feathersfound);
                        itemfound = feathersfound + " Phoenix Feather(s) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (roll > 0.96) {
                        let boxesfound = Math.floor(1 + Math.random() * 5);
                        consumGive(luckyperson, "box", boxesfound);
                        itemfound = boxesfound + " Box(es) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (roll > 0.9) {
                        let materialsfound = Math.floor(1001 + Math.random() * 4000);
                        userData[luckyperson].materials += materialsfound;
                        itemfound = materialsfound + " Material(s) " + where[Math.floor(Math.random() * where.length)];
                    } else if (roll > 0.8) {
                        let materialsfound = Math.floor(10001 + Math.random() * 40000);
                        userData[luckyperson].money += materialsfound;
                        itemfound = materialsfound + " Money(s) " + where[Math.floor(Math.random() * where.length)];
                    } 
                }
                else if (raid.level >= 100) {
                    let where = [" in the boss's corpse", " in a treasure chest", " randomly", " because they felt like it", " rotting in a pile", " in a tunnel", " in a cave", " in the boss's stomach", " hit them on the head", " drop from the sky"];
                    let roll = Math.random()
                    if (roll > 0.99) {
                        let materialsfound = 1;
                        consumGive(luckyperson, "reroll", materialsfound);
                        itemfound = materialsfound + " **SKILL REROLL** " + where[Math.floor(Math.random() * where.length)];
                    }
                    if (roll > 0.97) {
                        let feathersfound = Math.floor(1 + Math.random() * 3);
                        consumGive(luckyperson, "phoenixfeather", feathersfound);
                        itemfound = feathersfound + " Phoenix Feather(s) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (roll > 0.9475) {
                        let boxesfound = Math.floor(1 + Math.random() * 5);
                        consumGive(luckyperson, "box", boxesfound);
                        itemfound = boxesfound + " Box(es) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (roll > 0.85) {
                        let materialsfound = Math.floor(1001 + Math.random() * 4000);
                        userData[luckyperson].materials += materialsfound;
                        itemfound = materialsfound + " Material(s) " + where[Math.floor(Math.random() * where.length)];
                    } else if (roll > 0.75) {
                        let materialsfound = Math.floor(10001 + Math.random() * 40000);
                        userData[luckyperson].money += materialsfound;
                        itemfound = materialsfound + " Money(s) " + where[Math.floor(Math.random() * where.length)];
                    }
                }
                else if (raid.level >= 150) {
                    let where = [" in the boss's corpse", " in a treasure chest", " randomly", " because they felt like it", " rotting in a pile", " in a tunnel", " in a cave", " in the boss's stomach", " hit them on the head", " drop from the sky"];
                    let roll = Math.random()
                    if (roll > 0.985) {
                        let materialsfound = 1;
                        consumGive(luckyperson, "reroll", materialsfound);
                        itemfound = materialsfound + " **SKILL REROLL** " + where[Math.floor(Math.random() * where.length)];
                    }
                    if (roll > 0.965) {
                        let feathersfound = Math.floor(1 + Math.random() * 3);
                        consumGive(luckyperson, "phoenixfeather", feathersfound);
                        itemfound = feathersfound + " Phoenix Feather(s) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (roll > 0.94) {
                        let boxesfound = Math.floor(1 + Math.random() * 5);
                        consumGive(luckyperson, "box", boxesfound);
                        itemfound = boxesfound + " Box(es) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (roll > 0.85) {
                        let materialsfound = Math.floor(1001 + Math.random() * 4000);
                        userData[luckyperson].materials += materialsfound;
                        itemfound = materialsfound + " Material(s) " + where[Math.floor(Math.random() * where.length)];
                    } else if (roll > 0.66666) {
                        let materialsfound = Math.floor(10001 + Math.random() * 40000);
                        userData[luckyperson].money += materialsfound;
                        itemfound = materialsfound + " Money(s) " + where[Math.floor(Math.random() * where.length)];
                    }
                }
                //console.log(rarity)
                itemid = generateRandomItem(id, rarity)
            } else {
                itemid = raid.itemReward
                userData[id].inventory[itemid] = itemid
                itemData[raid.itemReward].owner = id
            }
            //text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp and a " + rarities[itemData[itemid].rarity] + " " + itemData[itemid].attack + "/" + itemData[itemid].defense + " weapon (ID: " + itemid + ").\n";
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp and a " + itemData[itemid].attack + "/" + itemData[itemid].defense + " " + itemData[itemid].name + " (ID: " + itemid + ").\n";
        } else {
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp.\nThe guild was also given "+ raid.reward + " xp and "+raid.crystalreward+" crystals.\n"
            guildData[userData[id].guild].xp += raid.reward
            guildData[userData[id].guild].crystals += raid.crystalreward
        }

        userData[id].money += Math.floor(luckybuff * raid.reward);
        userData[id].xp += Math.floor(luckybuff * raid.reward);

        if (itemfound != "none") {
            text += "<@" + luckyperson + "> also found " + itemfound + "! "
        }

        text += "Rewards have been given to everyone who participated in the raid!\n"

        if (userData[id].currenthealth > 0 && hasSkill(id, 15)) { //soulsteal skill in raids.
            userData[id].currenthealth += raid.maxhealth
            text += "Soulsteal activated. <@" + id + "> has stolen " + raid.maxhealth + " health.";
            userData[id].currenthealth = Math.min(userData[id].currenthealth, userData[id].health)
        }

        //generateItem(id, itemid, weaponatk, weapondef, rarity, rarities[rarity] + " Sword", []) //I, as a Java student, am jealous of the lack of semicolons lmao
        if (message.channel.id != 542171947895881748 && !isguild && !isevent) {
            let summonlevel = Math.floor(raid.minlevel + ((raid.maxlevel - raid.minlevel) * Math.random())) + 1//what the...
            raid.alive = true;
            raid.raid = true;
            raid.attack = summonlevel * 10;
            raid.currenthealth = summonlevel * 5;
            raid.maxhealth = summonlevel * 5;
            raid.reward = summonlevel * 500;
            raid.level = summonlevel;
            raid.attacklist = {}
            text += "Boss automatically summoned. It is level " + summonlevel + "!\n";

        }
    }
    if (userData[id].currenthealth <= 0) {
        userData[id].dead = true;
        userData[id].currenthealth = 0;
        userData[id].money -= counterstolen;
        text += '<@' + id + '> was killed in the raid! He/she lost $' + counterstolen;
        if (userData[id].glory != undefined) {
            userData[id].glory *= 0.999
        }
    }
    if (text != "") { sendMessage(message.channel, text) }
    userData[id].cooldowns.attack = ts + attackcd * 60 * 1000;
    userData[id].speed += 1;
}
function smeltItem(id, weaponid, givereward) {
    givereward = (givereward == false) ? false : true
    let rarity = itemData[weaponid].rarity
    let materials = 0
    let money = 0
    let xp = 0
    if (givereward) {
        materials = Math.pow(5, rarity)
        money = rarity * rarity * 1000
        xp = rarity * rarity * 1000
        userData[id].materials += materials
        userData[id].money += money
        userData[id].xp += xp
    }
    delete userData[id].inventory[weaponid];
    delete itemData[weaponid];
    return [xp, money, materials]
}

function itemFilter(message, defaults) {
    if (defaults == undefined) { defaults = {} }
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let userInv = userData[id].inventory
    let minrarity = (defaults.minrarity == undefined) ? 0 : defaults.minrarity
    let maxrarity = (defaults.maxrarity == undefined) ? 9 : defaults.maxrarity
    let fav = (defaults.fav == undefined) ? "None" : defaults.fav
    let unique = (defaults.unique == undefined) ? false : defaults.unique
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
    if (words.indexOf("-fav") != -1) {
        fav = true
    }
    if (words.indexOf("-nofav") != -1) {
        fav = false
    }
    if (words.indexOf("-unique") != -1) {
        unique = true
    }
    //console.log(userData[id].weapon)
    displayItems = []
    if (userData[id].weapon != false && userData[id].weapon != "None" && defaults.equip != false) {
        displayItems.push(userData[id].weapon)
    }

    for (var item in userInv) {
        //console.log(item)
        //console.log(itemData[item])
        let itemID = item.toString();
        if (!unique && itemData[itemID].rarity == "Unique") { continue }
        if (itemData[itemID] == undefined || item == userData[id].weapon || userData[id].inventory[item] != item || itemData[itemID].rarity < minrarity || itemData[itemID].rarity > maxrarity) continue
        if (fav == true && itemData[itemID].favorite == false) { continue }
        if (fav == false && itemData[itemID].favorite == true) { continue }
        displayItems.push(item)
    }
    return displayItems
}
module.exports.clean = function (text) { return clean(text) }
module.exports.sendMessage = function (channel, text, override) { return sendMessage(channel, text, override) }
module.exports.replyMessage = function (message, text, override) { return replyMessage(message, text, override) }
module.exports.deleteMessage = function (message) { return deleteMessage(message) }
module.exports.dmUser = function (user, text) { return dmUser(user, text) }
module.exports.logCommand = function (message, extratext) { return logCommand(message, extratext) }
module.exports.validate = function (message, spot) { return validate(message, spot) }
module.exports.gvalidate = function (message) { return gvalidate(message) }
module.exports.generateWeaponTemplate = function (weaponid, current, total) { return generateWeaponTemplate(weaponid, current, total) }
module.exports.generateGuildTemplate = function (guild) { return generateGuildTemplate(guild) }
module.exports.generateItem = function (owner, itemid, attack, defense, rarity, name, modifiers) { return generateItem(owner, itemid, attack, defense, rarity, name, modifiers) }
module.exports.generateRandomItem = function (owner, rarity) { return generateRandomItem(owner, rarity) }
module.exports.calcExtraStat = function (id, stat) { return calcExtraStat(id, stat) }
module.exports.calcLuckyBuff = function (id) { return calcLuckyBuff(id) }
module.exports.calcTime = function (time1, time2) { return calcTime(time1, time2) }
module.exports.displayTime = function (time1, time2) { return displayTime(time1, time2) }
module.exports.calcDamage = function (message, attacker, defender, initiator) { return calcDamage(message, attacker, defender, initiator) }
module.exports.calcStats = function (message, id, stat, skillenable) { return calcStats(message, id, stat, skillenable) }
module.exports.voteItem = function (message, dm) { return voteItem(message, dm) }
module.exports.craftItems = function (message, minrarity, maxrarity, amount) { return craftItems(message, minrarity, maxrarity, amount) }
module.exports.craftItem = function (message, minrarity, maxrarity, reply) { return craftItem(message, minrarity, maxrarity, reply) }
module.exports.raidInfo = function (message, raid) { return raidInfo(message, raid) }
module.exports.summon = function (channel, minlevel, maxlevel, name, image) { return summon(channel, minlevel, maxlevel, name, image) }
module.exports.checkProps = function (message) { return checkProps(message) }
module.exports.checkStuff = function (message) { return checkStuff(message) }
module.exports.checkBurn = function (message) { return checkBurn(message) }
module.exports.raidAttack = function (message, raid, resummon, isguild, isevent) { return raidAttack(message, raid, resummon, isguild, isevent) }
module.exports.smeltItem = function (id, weaponid, giveReward) { return smeltItem(id, weaponid, giveReward) }
module.exports.duelCheckDeath = function (message, id, otherID, ts) { return duelCheckDeath(message, id, otherID, ts) }
module.exports.hasSkill = function (id, skillid) { return hasSkill(id, skillid) }
module.exports.itemFilter = function (message, defaults) { return itemFilter(message, defaults) }
module.exports.consumGive = function (target, item, amount) { return consumGive(target, item, amount) }
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