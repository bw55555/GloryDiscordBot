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
    if (message.channel.type == "dm" || message.channel.type == "group" || (message.channel.memberPermissions(bot.user) != null && !message.channel.memberPermissions(bot.user).has("MANAGE_MESSAGES"))) { return }
    message.delete().catch(function (err) {
        console.error(err)
    })
}

function dmUser(user, text) {
    if (userData[user].dmmute != true) bot.users.get(user).send(text).catch(function (err) { console.error(err) })
}

function logCommand(message, extratext) {
    if (message.author.bot) { return }
    if (extratext == undefined) { extratext = "" } else { extratext = "|" + extratext }
    sendMessage(bot.guilds.get(debugGuildId).channels.get(debugChannelId), clean(message.author.id + "|" + message.content + "|" + message.createdTimestamp + extratext))
}

function validate(message) {
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        sendMessage(message.channel, "Choose a target!")
        return false;
    }
    let target = words[1];
    let targetname = words[1];
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
    let words = message.content.trim().split(/\s+/)
    if (words.length < 3) {
        sendMessage(message.channel, "Choose a target!")
        return false;
    }
    let target = words[2];
    let targetname = words[2];
    if (target.startsWith('<@') && target.endsWith('>')) {
        target = target.slice(2, -1);
    }
    if (target.startsWith('!')) {
        target = target.slice(1);
    }
    if (userData[target] == undefined) {
        //Send fail message here
        sendMessage(message.channel, targetname + " is not a real person");
        return false;
    }

    return target
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
                }
            ]
        }
    }
}
function generateItem(owner, itemid, attack, defense, rarity, name, modifiers) {
    if (itemid == null || itemid == "") {
        itemid = currentItemList;
    }
    if (owner != "event") { userData[owner].inventory[itemid] = itemid }
    let maxenhance = (rarity == "Unique") ? 1024 : Math.pow(2, rarity)
    let item = { "owner": owner, "id": itemid, "attack": attack, "defense": defense, "rarity": rarity, "modifiers": modifiers, "name": name, "enhancementlevel": 0, "maxenhancement": maxenhance, "enhancementattempts": 0, "favorite": false, "merge": 0 }
    itemData[itemid] = item;
    currentItemList++;
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
    let itemid = currentItemList
    let total = 0
    if (rarity == 0) {
        total = Math.floor((Math.random()) * 5 + 1)
    } else {
        total = Math.floor(raritystats[rarity - 1] + 1 + (raritystats[rarity] - raritystats[rarity - 1]) * Math.random())
    }
    let attack = Math.floor(Math.random() * (total + 1))
    let defense = total - attack
    let items = ["Stick", "Pebble", "Rock", "Sling"]
    if (!isNaN(userData[owner].triangleid)) {
        if (userData[owner].triangleid % 3 == 1) {
            items = ["Bow", "Crossbow", "Longbow", "Recurve Bow", "Flatbow", "Rifle Crossbow", "Kunai", "Throwing Stars", "Shuriken", "Sniper", "Yumi", "Blow Darts", "Throwing Knife", "Rifle", "Pistol"]
        }
        if (userData[owner].triangleid % 3 == 2) {
            items = ["Staff", "Wand", "Gem", "Talisman", "Spellblade", "Orb", "Tome", "Book", "Focus", "Flames", "Asta", "Crystal", "Runes", "Runestaff", "Ragnell", "Aura", "Arcanics", "Skull", "Rite"]
        }
        if (userData[owner].triangleid % 3 == 0 && userData[owner].triangleid != 0) {
            items = ["Sword", "Axe", "Lance", "Spear", "Rapier", "Mace", "Scythe", "Hammer", "Longsword", "Claymore", "Dagger", "Knife", "Scimitar", "Broadsword", "Katana", "Falchion", "Cutlass", "Sabre", "Dao", "Khopesh", "Tachi"]
        }
    }
    let name = rarities[rarity] + " " + items[Math.floor(Math.random() * items.length)]
    generateItem(owner, itemid, attack, defense, rarity, name, {})
    currentItemList++;
    return itemid
}

function calcLuckyBuff(id) {
    let luckybuff = 1
    if (userData[id].weapon != false && userData[id].weapon != "None" && itemData[userData[id].weapon] != undefined) { //lucky enchant
        //console.log(userData[id].weapon)
        if (itemData[userData[id].weapon].modifiers.lucky != undefined) {
            luckybuff = itemData[userData[id].weapon].modifiers.lucky
        }
    }
    if (userData[id].skillA == 16 || userData[id].skillB == 16 || userData[id].skillC == 16) { //Royalty Skill
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
function calcDamage(message, attacker, defender, initiator) {
    let text = ""
    let roll = Math.random()
    let burn = 0;
    let attack = 0;
    if (userData[attacker] != undefined) {
        attack = 2 * calcStats(message, attacker, "attack")
        if (userData[defender] != undefined && (userData[defender].skillA == 23 || userData[defender].skillB == 23 || userData[defender].skillC == 23)) {
            attack = calcStats(message, defender, "defense")
        }
    } else {
        attack = attacker.attack;
    }
    let defense = 0;
    if (defender != -1) {
        defense = calcStats(message, defender, "defense")
        if (userData[attacker] != undefined && (userData[attacker].skillA == 23 || userData[attacker].skillB == 23 || userData[attacker].skillC == 23)) {
            defense = calcStats(message, defender, "attack")
        }
    }
    if (userData[attacker] != undefined && userData[defender] != undefined) {
        if (userData[attacker].triangleid == 0 || userData[defender].triangleid == 0) {

        } else if ((userData[attacker].triangleid - userData[defender].triangleid) % 3 == 2) {

            if (userData[attacker].skillA == 13 || userData[attacker].skillB == 13 || userData[attacker].skillC == 13) {
                attack *= 1.8
            } else {
                attack *= 1.4
            }
        } else {

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

        if (userData[attacker].skillA == 6 || userData[attacker].skillB == 6 || userData[attacker].skillC == 6) {
            piercerate += 0.2;
        }
        if (userData[attacker].skillA == 28 || userData[attacker].skillB == 28 || userData[attacker].skillC == 28) {
            piercerate += 0.05;
        }

        if (piercechance < piercerate) {
            if (userData[defender] == undefined) {
                attack *= 1.8
            } else {
                defense = 0
            }

            text += "<@" + attacker + ">" + " has pierced their opponents defense!\n"
            if (userData[attacker].skillA == 28 || userData[attacker].skillB == 28 || userData[attacker].skillC == 28) {
                attack *= 1.4
            }
        }
    }

    //Both?
    let spikedmod = 0;
    if (dweapon != false && dweapon.modifiers.spikes != undefined) {
        spikedmod += dweapon.modifiers.spikes
    }
    if (userData[defender] != undefined) {
        if (userData[defender].skillA == 7 || userData[defender].skillB == 7 || userData[defender].skillC == 7) {
            spikedmod += 0.5;
        }
        if (userData[defender].skillA == 31 || userData[defender].skillB == 31 || userData[defender].skillC == 31) {
            spikedmod += 0.2;
        }
    }
    if (spikedmod > 0) {
        let spiked = Math.floor(defense * spikedmod)
        if (userData[attacker] != undefined) {
            userData[attacker].currenthealth -= spiked
            text += "<@" + attacker + "> has been damaged for " + spiked + " health due to spikes!\n"
            if (userData[defender] != undefined) {
                if (userData[defender].skillA == 31 || userData[defender].skillB == 31 || userData[defender].skillC == 31) {
                    userData[attacker].burn += spikemod * 5; //Burn status, if burning, have a chance to take 5% damage after talking.
                    text += "<@" + attacker + "> is now burning!"
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
        if (userData[attacker].skillA == 36 || userData[attacker].skillB == 36 || userData[defender].skillC == 36) {
            burn += 1;
        }
    }
    if (burn > 0) {
        if (userData[defender] != undefined) {
            userData[attacker].burn = burn;
            text += "<@" + defnder + "> is now burning!"
        } else {
            text += "Raid boss cannot be burned!"
        }
    }


    let blockrate = 0;
    let blockchance = Math.random()
    if (userData[defender] != undefined && userData[defender].dead == false) {
        if (dweapon != false && dweapon.modifiers.block != undefined) {
            blockrate += dweapon.modifiers.block
        }
        if (userData[defender].skillA == 10 || userData[defender].skillB == 10 || userData[defender].skillC == 10) {
            blockrate += 0.15;
        }
        if (userData[defender].skillA == 30 || userData[defender].skillB == 30 || userData[defender].skillC == 30) {
            blockrate += 0.05;
        }
    }

    if (blockrate > blockchance) {
        if (piercechance < piercerate) {
            text += "<@" + defender + "> has blocked the attack, but" + attacker + "pierced though anyway!\n"
        } else {
            text += "<@" + defender + "> has blocked the attack!\n"
            attack = 0;
            if (userData[defender].skillA == 30 || userData[defender].skillB == 30 || userData[defender].skillC == 30) {
                userData[defender].bolster = true
            }
        }
    }

    if (userData[attacker] != undefined) {
        let lifesteal = (userData[attacker].triangleid == 11) ? 0.15 : 0;
        if (weapon != false && weapon.modifiers.lifeSteal != undefined) {
            lifesteal += weapon.modifiers.lifeSteal
        }
        if (userData[attacker].skillA == 3 || userData[attacker].skillB == 3 || userData[attacker].skillC == 3) {
            lifesteal += 0.1;
        }
        if (userData[attacker].skillA == 21 || userData[attacker].skillB == 21 || userData[attacker].skillC == 21) {
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

        if (userData[attacker].skillA == 22 || userData[attacker].skillB == 22 || userData[attacker].skillC == 22) {
            let leech = 0
            if (userData[attacker] != undefined) {
                leech = Math.floor(0.05 * userData[defender].currenthealth);
                userData[attacker].currenthealth += leech
                userData[defender].currenthealth -= leech
            }
            else {
                leech = Math.floor(0.05 * defender.currenthealth);
                userData[attacker].currenthealth += leech;
                defender.currenthealth -= leech;
            }
            text += "<@" + attacker + "> leeched **" + leech + "** health!\n";
        }
    }
    //defender only skills
    let revmod = 0;
    let revengechance = Math.random()
    if (userData[defender] != undefined) {
        if (attacker == initiator && dweapon != false && dweapon.modifiers.revenge != undefined) {
            revmod += dweapon.modifiers.revenge;
        }

        if (userData[defender].skillA == 8 || userData[defender].skillB == 8 || userData[defender].skillC == 8) {
            revmod += 0.02;
        }
        if (userData[defender].skillA == 32 || userData[defender].skillB == 32 || userData[defender].skillC == 32) {
            revmod += 0.005;
            revmod *= 2;
        }
    }

    if (userData[attacker] != undefined) {
        if (revengechance < revmod) {
            userData[attacker].currenthealth = 0;
            text += "<@" + defender + "> has avenged the attack!"
            //return false
        }
    }

    //Percentage increases
    if (defender != -1 && attacker == initiator) {
        if (userData[defender].skillA == 19 || userData[defender].skillB == 19 || userData[defender].skillC == 19) {
            defense *= 1.3;
        }
    }
    if (userData[attacker] != undefined && attacker == initiator) {
        if (userData[attacker].skillA == 18 || userData[attacker].skillB == 18 || userData[attacker].skillC == 18) {
            attack *= 1.3;
        }
    }
    //console.log("Counter")

    truedamage = Math.floor(attack * 0.75 * roll + attack * 0.25 - defense)

    //Last Breath Check
    if (userData[defender] != undefined) {
        if (userData[defender].skillA == 25 || userData[defender].skillB == 25 || userData[defender].skillC == 25) {
            if (truedamage > userData[defender].currenthealth && userData[defender].currenthealth * 2 > userData[defender].health) {
                userData[defender].currenthealth = truedamage + 1
                text += "<@" + defender + "> has activated Last Breath!"
            }
        }
    }



    if (text != "") { sendMessage(message.channel, text) }
    return truedamage
}
function calcStats(message, id, stat) {
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
    let skillA = userData[id].skillA;
    let skillB = userData[id].skillB;
    let skillC = userData[id].skillC;
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.attack != undefined) {
        buff += guildData[userData[id].guild].buffs.attack.value
    }
    if (userData[id].guild != "None" && guildData[userData[id].guild].buffs.defense != undefined) {
        dbuff += guildData[userData[id].guild].buffs.defense.value
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
    if (skillA != 'None' || userData[id].skillB != 'None' || userData[id].skillC != 'None') {

        if (skillA == 0 || skillB == 0 || skillC == 0) {
            attack += 20;
        }
        if (skillA == 1 || skillB == 1 || skillC == 1) {
            defense += 20;
        }
        if (skillA == 2 || skillB == 2 || skillC == 2) {
            rage += .7;
        }
        if (skillA == 4 || skillB == 4 || skillC == 4) {
            sacrifice += 0.2;
        }
        if (skillA == 5 || skillB == 5 || skillC == 5) {
            tempo += 1;
        }
        if (skillA == 9 || skillB == 9 || skillC == 9) {
            critrate += 0.06;
        }
        if (skillA == 12 || skillB == 12 || skillC == 12) {
            if (userData[id].health == userData[id].currenthealth) {
                buff *= 1.5;
                /*buff += 1;
                dbuff += 1;*/
            }
        }
        if (skillA == 17 || skillB == 17 || skillC == 17) {
            attack += 50;
            defense -= 50;
        }
        if (skillA == 26 || skillB == 26 || skillC == 26) {
            sacrifice += 0.05
        }
        if (skillA == 27 || skillB == 27 || skillC == 27) {
            critrate += 0.01
            critdmg += 2
        }
        if (skillA == 28 || skillB == 28 || skillC == 28) {
            rage += 0.3
        }
        if (skillA == 33 || skillB == 33 || skillC == 33) {
            antitempo += 1;
        }

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
            if (skillA == 28 || skillB == 28 || skillC == 28) {
                x = userData[id].currenthealth / userData[id].health / 2
            }
            buff *= 1 + (rage * -1 * Math.log(x));
        }
        if (sacrifice > 0) {
            buff += sacrifice
            if (skillA == 26 || skillB == 26 || skillC == 26) {
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

        if (skillA == 20 || skillB == 20 || skillC == 20) {
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
    let target = validate(message)
    if (target == false) { return }

    let itemid = generateRandomItem(target)

    if (userData[target].glory != undefined && userData[target].glory < 100) {
        userData[target].glory += Math.random() * 0.5;
    }

    sendMessage(message.channel, "<@" + target + "> has been given an item with id " + itemid + " and of rarity " + itemData[itemid].rarity)
    if (dm) dmUser(target, "Thank you for voting! You have been given an item with id " + itemid + " and of rarity " + itemData[itemid].rarity)
    return itemid
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
    sendMessage(message.channel, {
        embed: {
            thumbnail: {
                url: raid.url
            },
            color: 0xF1C40F,
            fields: [
                {
                    name: "Level " + raid.level + " " + raid.name,
                    value: "**Health Remaining:** " + raid.currenthealth + "\n**Max Attack:** " + raid.attack + "\n**Reward:** " + raid.reward + " Money and XP" + itemRewardText
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
function checkStuff(message) {
    let id = message.author.id
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (!userData[id]) userData[id] = {} //creates profile if none exists
    if (userData[id].username != message.author.username) userData[id].username = message.author.username; //Creates object with name as username
    if (!userData[id].id) userData[id].id = id; //sets id
    if (!userData[id].money) userData[id].money = 0; //gives money object
    if (!userData[id].lastDaily) userData[id].lastDaily = "Not Collected"; //check if daily collected
    if (!userData[id].health) userData[id].health = 10; //Health
    if (!userData[id].currenthealth) userData[id].currenthealth = 0; //Health
    if (!userData[id].xp) userData[id].xp = 0; //XP
    if (!userData[id].level) userData[id].level = 1; //XP
    if (!userData[id].attack) userData[id].attack = 1; //character's attack
    if (!userData[id].defense) userData[id].defense = 1; //character's defense
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
    if (!userData[id].explosion) userData[id].explosion = 0;
    if (!userData[id].box) userData[id].box = 0;
    if (!userData[id].ascension) userData[id].ascension = 0;
    if (!userData[id].bounty) userData[id].bounty = 0;
    if (!userData[id].sp) userData[id].sp = 0;
    if (!userData[id].phoenixfeather) userData[id].phoenixfeather = 0;
    if (!userData[id].nametag) userData[id].nametag = 0;
    if (!userData[id].reroll) userData[id].reroll = 0;

    //if (!userData[id].glory) userData[id].glory = 0;

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

    if (admins.indexOf(message.author.id) == -1) {
        if (userData[id].attack > userData[id].level) userData[id].attack = userData[id].level; //prevents overleveling
        if (userData[id].defense > userData[id].level) userData[id].defense = userData[id].level;
        //extrahp = (userData[id].weapon != false && itemData[userData[id].weapon].modifiers.maxhp != undefined) ? itemData[userData[id].weapon].modifiers.maxhp : 0
        // if (userData[id].health > userData[id].level * 10 + extrahp) userData[id].health = userData[id].level * 10;
        if (userData[id].health > userData[id].level * 10) userData[id].health = userData[id].level * 10;
    }

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

    if (userData[id].burn != undefined && userData[id].dead == false) {
        let burndamage = Math.floor(userData[id].health * .05)
        userData[id].burn -= Math.floor(Math.random() + 0.3)
        userData[id].currenthealth -= burndamage
        let burntext = "You took **" + burndamage + "** from burning."
        if (userData[id].dead){
            burntext += " You burned to death!"
        }
        if (userData[id].burn < 0 || userData[id].dead == true) {
            userData[id].burn = undefined
            burntext += " The flames have ceased."
        }
        replyMessage(message, burntext)
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
    if (userData[id].cooldowns.attack > ts) {
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
    if (userData[id].level < raid.level - 15 && !isguild && !isevent) {
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
    if (damage < 0) {
        damage = 0;
    }
    if (counter < 0) {
        counter = 0;
    }
    let damagereward = Math.floor(damage * 5 * raid.level * Math.random() * luckybuff);
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
        if (isevent) {
            let listtotal = 0;
            for (var i = 0; i < keys.length; i++) {
                let user = keys[i];
                userData[user].money += raid.attacklist[user];
                listtotal += raid.attacklist[user];
            }
            for (var i = 0; i < keys.length; i++) {
                userData[keys[i]].glory += (raid.level / 15) * (raid.attacklist[keys[i]] / listtotal);
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
                let rarity = Math.floor(Math.random() * Math.min(raid.level, 75) / 15)
                if (raid.level > 75 && Math.random() < (raid.level - 75) / 1000) {
                    rarity = 5
                }
                if (isevent) {
                    rarity = Math.floor(5.5 + (Math.random()))
                }
                if (raid.level > 75) {
                    let where = [" in the boss's corpse", " in a treasure chest", " randomly", " because they felt like it", " rotting in a pile", " in a tunnel", " in a cave", " in the boss's stomach", " hit them on the head", " drop from the sky"];
                    if (Math.random() > 0.90) {
                        let boxesfound = Math.floor(1 + Math.random() * 5);
                        userData[id].box += boxesfound;
                        itemfound = boxesfound + " Box(es) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (Math.random() > 0.95) {
                        let feathersfound = Math.floor(1 + Math.random() * 3);
                        userData[id].phoenixfeather += feathersfound;
                        itemfound = feathersfound + " Phoenix Feather(s) " + where[Math.floor(Math.random() * where.length)];
                    }
                    else if (Math.random() > 0.8) {
                        let materialsfound = Math.floor(1001 + Math.random() * 4000);
                        userData[id].materials += materialsfound;
                        itemfound = materialsfound + " Material(s) " + where[Math.floor(Math.random() * where.length)];
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
            text += "Raid defeated. The player who dealt the last hit was given $" + raid.reward + " and " + raid.reward + " xp.\n"
            guildData[userData[id].guild].xp += raid.reward
        }

        userData[id].money += Math.floor(luckybuff * raid.reward);
        userData[id].xp += Math.floor(luckybuff * raid.reward);

        if (itemfound != "none") {
            text += userData[id].username + " also found " + itemfound + "! "
        }

        text += "Rewards have been given to everyone who participated in the raid!\n"

        if (userData[id].currenthealth > 0 && (userData[id].skillA == 15 || userData[id].skillB == 15 || userData[id].skillC == 15)) { //soulsteal skill in raids.
            userData[id].currenthealth = userData[id].health
            text += "Soulsteal activated. <@" + id + "> has been restored to full health. ";
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
function smeltItem(id, weaponid) {
    let rarity = itemData[weaponid].rarity
    let materials = Math.pow(5, rarity)
    let money = rarity * rarity * 1000
    let xp = rarity * rarity * 1000
    userData[id].materials += materials
    userData[id].money += money
    userData[id].xp += xp
    delete userData[id].inventory[weaponid];
    itemData[weaponid] = 0
    return [xp, money, materials]
}
module.exports.clean = function (text) { return clean(text) }
module.exports.sendMessage = function (channel, text, override) { return sendMessage(channel, text, override) }
module.exports.replyMessage = function (message, text, override) { return replyMessage(message, text, override) }
module.exports.deleteMessage = function (message) { return deleteMessage(message) }
module.exports.dmUser = function (user, text) { return dmUser(user, text) }
module.exports.logCommand = function (message, extratext) { return logCommand(message, extratext) }
module.exports.validate = function (message) { return validate(message) }
module.exports.gvalidate = function (message) { return gvalidate(message) }
module.exports.generateWeaponTemplate = function (weaponid, current, total) { return generateWeaponTemplate(weaponid, current, total) }
module.exports.generateGuildTemplate = function (guild) { return generateGuildTemplate(guild) }
module.exports.generateItem = function (owner, itemid, attack, defense, rarity, name, modifiers) { return generateItem(owner, itemid, attack, defense, rarity, name, modifiers) }
module.exports.generateRandomItem = function (owner, rarity) { return generateRandomItem(owner, rarity) }
module.exports.calcLuckyBuff = function (id) { return calcLuckyBuff(id) }
module.exports.calcTime = function (time1, time2) { return calcTime(time1, time2) }
module.exports.displayTime = function (time1, time2) { return displayTime(time1, time2) }
module.exports.calcDamage = function (message, attacker, defender, initiator) { return calcDamage(message, attacker, defender, initiator) }
module.exports.calcStats = function (message, id, stat) { return calcStats(message, id, stat) }
module.exports.voteItem = function (message, dm) { return voteItem(message, dm) }
module.exports.craftItem = function (message, minrarity, maxrarity, reply) { return craftItem(message, minrarity, maxrarity, reply) }
module.exports.raidInfo = function (message, raid) { return raidInfo(message, raid) }
module.exports.summon = function (channel, minlevel, maxlevel, name, image) { return summon(channel, minlevel, maxlevel, name, image) }
module.exports.checkStuff = function (message) { return checkStuff(message) }
module.exports.raidAttack = function (message, raid, resummon, isguild, isevent) { return raidAttack(message, raid, resummon, isguild, isevent) }
module.exports.smeltItem = function (id, weaponid) { return smeltItem(id, weaponid) }
fs.readdir("./Utils/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        //console.log(file)
        // If the file is not a JS file, ignore it (thanks, Apple)
        if (!file.endsWith(".js") || file == "functions.js") { return };
        // Load the event file itself
        let commandname = file.split(".")[0];
        //console.log(commandname)
        module.exports[commandname] = require(`./${file}`)
        // Get just the event name from the file name
    });
})