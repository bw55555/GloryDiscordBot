const guildRaidData = require("../Assets/guildRaidData.json")

const guildStore = [
    { "name": "Common Scroll", "price": 50000, "levels": [0, 10, 20, 30, 40], "stocks": [1, 1, 1, 1, 1] },
    { "name": "Uncommon Scroll", "price": 250000, "levels": [10, 20, 30, 40], "stocks": [1, 1, 1, 1] },
    { "name": "Rare Scroll", "price": 1000000, "levels": [20, 30, 40], "stocks": [1, 1, 1] },
    { "name": "Epic Scroll", "price": 2500000, "levels": [30, 40], "stocks": [1, 1] },
    { "name": "Legendary Scroll", "price": 5000000, "levels": [40], "stocks": [1] },
    { "name": "Box", "level": 1, "stock": 10, "price": 125000, "id": 5, "levels": [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50], "stocks": [25, 75, 150, 250, 500, 1000, 2000, 3000, 4000, 5000, 10000] }
]
const guildBuffStore = [
    { "name": "Attack +", "stat": "attack", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2, 2.5, 3, 4], "prices": [0, 400, 1500, 10000, 50000, 150000, 500000, 1500000, 5000000, 15000000, 50000000] },
    { "name": "Defense +", "stat": "defense", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2, 2.5, 3, 4], "prices": [0, 400, 1500, 10000, 50000, 150000, 500000, 1500000, 5000000, 15000000, 50000000] },
    { "name": "CritDamage +", "stat": "critDamage", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 2, 4, 6, 8, 10], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "CritRate +", "stat": "critRate", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.02, 0.04, 0.06, 0.08, 0.1], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "LifeSteal +", "stat": "lifeSteal", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.1, 0.2, 0.3, 0.4, 0.5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Spikes +", "stat": "spikes", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Block +", "stat": "block", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.02, 0.05, 0.1, 0.15, 0.2], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Tempo +", "stat": "tempo", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.5, 1, 1.5, 2, 2.5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Sacrifice +", "stat": "sacrifice", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.1, 0.2, 0.3, 0.4, 0.5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Lucky +", "stat": "lucky", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.1, 0.2, 0.3, 0.5, 0.8, 1.3, 2.1, 3.4, 5.5, 8.9], "prices": [0, 1000, 5000, 25000, 100000, 300000, 1000000, 3000000, 10000000, 30000000, 100000000] },
    { "name": "Revenge +", "stat": "revenge", "levels": [0, 30, 60, 90, 100], "bonus": [0, 0.01, 0.02, 0.04, 0.05], "prices": [0, 100000, 3000000, 90000000, 100000000] },
    { "name": "Rage +", "stat": "rage", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Pierce +", "stat": "pierce", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.04, 0.08, 0.12, 0.16, 0.2], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] }
]

global.guildForgePrices = {
    "level": [
        { "money": 0, "materials": 0, "guildlevel": 0},
        { "money": 100000000, "materials": 1000000, "guildlevel": 20 },
        { "money": 150000000, "materials": 1500000, "guildlevel": 25 },
        { "money": 250000000, "materials": 2500000, "guildlevel": 30 },
        { "money": 500000000, "materials": 5000000, "guildlevel": 35 },
        { "money": 750000000, "materials": 7500000, "guildlevel": 40 },
        { "money": 1000000000, "materials": 10000000, "guildlevel": 45 },
        { "money": 2000000000, "materials": 20000000, "guildlevel": 50 },
        { "money": 5000000000, "materials": 50000000, "guildlevel": 55 },
        { "money": 10000000000, "materials": 100000000, "guildlevel": 60 }
    ], 
    "enchant": [
        { "name": "Max Level", "bonus": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "prices": [0,20000,50000,100000,200000, 500000, 1000000, 2000000, 5000000, 10000000] },
        { "name": "Cost Down", "bonus": [0, 0.6, 0.8, 0.90, 0.96, 0.98, 0.99, 0.996, 0.998, 0.999], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] },
        { "name": "Rate Up", "bonus": [0, 0.01, 0.02, 0.04, 0.08, 0.14, 0.22, 0.32, 0.44, 0.58], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000]}
    ],
    "enhance": [
        { "name": "Max Level", "bonus": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] },
        { "name": "Cost Down", "bonus": [0, 0.6, 0.8, 0.90, 0.96, 0.98, 0.99, 0.996, 0.998, 0.999], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] },
        { "name": "Rate Up", "bonus": [0, 0.01, 0.02, 0.04, 0.08, 0.14, 0.22, 0.32, 0.44, 0.58], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] }
    ]
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let command = (words.length == 1) ? "" : words[1].toUpperCase()
    let leveluptext = ""
    let guildName = user.guild;
    if (guildName == "None" && words.length == 1) {
        functions.replyMessage(message, "You don't have a guild!");
        return;
    }
    else if (guildName == "None" && command != "CREATE" && command != "INFO") { return functions.replyMessage(message, "You don't have a guild! Ask a guild leader to invite you or create one with !guild create") }
    else if (command == "INFO") {
        if (words.length <= 2) { return functions.replyMessage(message, "Please specify a guild to view!") }
        let guildName = words[2];
        return Promise.all([functions.getObject("guildData", guildName)]).then(ret => {
            let guild = ret[0]
            if (guild == false) { return functions.replyMessage(message, "That guild does not exist!") }
            functions.sendMessage(message.channel, functions.generateGuildTemplate(guild));
        })
    }
    else if (command == "CREATE") {//guild creation
        if (guildName == "None") {
            if (user.ascension < 3) { return functions.replyMessage(message, "You need to be at least ascension 3 to create a guild!") }
            if (user.money < 1000000) { return functions.replyMessage(message, "You need at least $1000000 to create a guild!") }
            if (user.materials < 10000) { return functions.replyMessage(message, "You need at least 10000 materials to create a guild!") }
            if (words.length <= 2) {
                functions.replyMessage(message, "Choose a name for your guild!");
                return;
            }
            let tempVar = words;
            tempVar.splice(0, 2);
            let guildName = tempVar.join("");
            if (guildName == "" || guildName == "None") {
                functions.sendMessage(message.channel, "The name cannot be blank!")
                return;
            }
            return Promise.all([functions.getObject("guildData", guildName)]).then(ret => {
                let guild = ret[0]
                if (guild != false) { return functions.replyMessage(message, "That guild name is already taken!"); }
                guild = {};
                guild._id = guildName;
                guild.bank = 0;
                guild.bankmax = 1000000;
                guild.materials = 0;
                guild.materialmax = 1000000;
                guild.level = 1;
                guild.icon = "https://i.imgur.com/r39nI8f.jpg";
                guild.leader = id;
                guild.members = [];
                guild.members.push(id);
                guild.xp = 0;
                guild.scrolls = [0, 0, 0, 0, 0];
                guild.raid = false;
                guild.adminlog = false;
                guild.store = {};
                guild.buffs = {};
                guild.quests = {};
                //guild.forge = {};
                guild.crystals = 0;
                user.guild = guildName;
                user.guildpos = "Leader";
                user.money -= 1000000
                user.materials -= 10000
                functions.replyMessage(message, "You have created the guild " + guildName + "!");
                functions.sendMessage(message.channel, functions.generateGuildTemplate(guild));
                functions.setObject("guildData",guild)
            })
        } else {
            functions.replyMessage(message, "You are already in a guild!");
            return;
        }
    }
    //user must have a guild here
    return Promise.all([functions.getObject("guildData", guildName)]).then(ret => {
        let guild = ret[0]
        while (guild.level * 200000 + 800000 > guild.bankmax) {
            guild.bankmax += 200000
            guild.materialmax += 200000
        }
        if (words.length == 1) {
            functions.sendMessage(message.channel, functions.generateGuildTemplate(guild))
        }
        else if (command == "MEMBERS" || command == "MEMBER") {
            let messages = "**Guild Members** \n```\n"
            return functions.findUsers({ _id: { $in: guild.members } }, { username: 1, guildpos: 1 }).then(guildmembers => {
                for (i = 0; i < guildmembers.length; i++) {
                    messages += (guildmembers[i].username + " (" + guildmembers[i].guildpos + ")\n");
                }
                messages += "```"
                functions.sendMessage(message.channel, messages);
            })

        }
        else if (command == "INVITE") {
            if (user.guildpos != "Leader" && user.guildpos != "Co-Leader") {
                functions.replyMessage(message, "You must be the Leader or a Co-Leader to invite someone!");
                return;
            }
            if (guild.members.length >= Math.floor(guild.level / 2 + 20)) { return functions.replyMessage(message, "This guild is already full!")}
            return Promise.all([functions.validate(message, user, 2)]).then(ret => {
                let target = ret[0];

                if (target == false) {
                    functions.replyMessage(message, "You can't invite rocks!");
                    return;
                }
                if (target.guild != "None") {
                    functions.replyMessage(message, "They are already in the guild " + target.guild + "!");
                    return;
                }
                //functions.sendMessage(message.channel, "<@" + target._id + ">, <@" + id + "> invites you to their guild! Type `!guild accept` to join");
                functions.MessageAwait(message.channel, target._id, "<@" + target._id + ">, <@" + user._id + "> has invited you to their guild! Type `accept` to join!", "accept",
                    function (response, extraArgs) {
                        return Promise.all([functions.getUser(extraArgs[1]._id), functions.getUser(extraArgs[2]._id), functions.getObject("guildData", extraArgs[0]._id)]).then(ret => {
                            let guild = ret[2]
                            let user = ret[1]
                            let target = ret[0]
                            let message = extraArgs[3]
                            if (user.guildpos != "Leader" && user.guildpos != "Co-Leader") {
                                functions.replyMessage(message, "You must be the Leader or a Co-Leader to invite someone!");
                                return;
                            }
                            if (guild.members.length >= Math.floor(guild.level / 2 + 20)) { return functions.replyMessage(message, "This guild is already full!") }
                            if (target == false) {
                                functions.replyMessage(message, "You can't invite rocks!");
                                return;
                            }
                            if (target.guild != "None") {
                                functions.replyMessage(message, "They are already in the guild " + target.guild + "!");
                                return;
                            }
                            functions.setProp("guildData", { "_id": guild._id }, { $push: { "members": target._id } })
                            functions.setProp("userData", { "_id": target._id }, { $set: { "guild": guild._id, "guildpos": "Member", "guildbuffs":  guild.buffs} })
                            functions.sendMessage(message.channel, "<@" + target._id + "> has joined " + guild._id + "!");
                        })
                    },
                    [guild, target, user, message],
                    "They didn't want to join your guild..."
                );
                //if (guildData[guild].adminlog) { functions.dmUser(guildData[guild].leader, user.username + " (id " + id + ") invited "+target.username + " (id " + target._id + ") to your guild.") }
            })
        }
        else if (command == "LEAVE") {
            if (user.guildpos == "Leader") {
                functions.replyMessage(message, "Guild leaders can't leave their guild! Disband it or appoint someone else!");
                return;
            }
            functions.setProp("guildData", { "_id": guild._id }, { $pull: {"members": user._id}})
            user.guild = "None";
            user.guildpos = "None";
            user.guildbuffs = {}
            guild.members.splice(guild.members.indexOf(user._id),1)
            functions.replyMessage(message, "You left your guild!");
        }
        else if (command == "DISBAND") {
            if (user.guildpos != "Leader") {
                functions.replyMessage(message, "Only the leader can disband the guild!");
                return;
            }
            client.db(db).collection("userData").updateMany({ "guild": guild._id }, { $set: { "guild": "None", "guildpos": "None", "guildbuffs": {} } })
            user.guild = "None"
            user.guildpos = "None"
            user.guildbuffs = {}
            user.money += guild.bank
            user.materials += guild.materials
            functions.deleteObject("guildData",guild._id);

            functions.replyMessage(message, "You disbanded your guild! Everyone in it is now guildless :(");
            return 
        }
        else if (command == "DEPOSIT" || command == "INVEST" || command == "DEP") {//It's enough already with youknowwhoafter me xD lmao
            let type = ""
            let amount = 0
            if (words.length == 3) {
                type = "money"
                amount = parseInt(words[2])
                if (words[2] == "all") { amount = user.money }
                if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to deposit!") }
            } else {
                if (words.length < 3) {
                    return functions.replyMessage(message, "Please specify something to deposit!(materials or money)!")
                }
                type = words[2]
                if (words[2] != "money" && words[2] != "materials") { return functions.replyMessage(message, "Please specify something to deposit!(materials or money)!") }
                if (words.length < 4) { return functions.replyMessage(message, "Please specify an amount to deposit!") }
                amount = parseInt(words[3])
                if (words[3] == "all") { amount = user[type] }
                if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to deposit!") }
            }
            if (amount < 0) { return functions.replyMessage(message, "Don't steal from the bank!") }
            if (amount == 0) { return functions.replyMessage(message, "Why would you ever want to deposit nothing?") }
            if (amount > user[type]) { return functions.replyMessage(message, "You can't deposit more than you own!") }
            if (type == "money" && (guild.bank + amount) > guild.bankmax) {
                functions.replyMessage(message, "The bank would be full!")
                return;
            }
            if (type == "materials" && (guild.materials + amount) > guild.materialmax) {
                functions.replyMessage(message, "The bank would be full!")
                return;
            }
            if (type == "money") { guild.bank += amount }
            if (type == "materials") { guild.materials += amount }
            user[type] -= amount
            if (type == "money") { functions.replyMessage(message, "You deposited $" + amount + " into " + guild._id + "'s guild bank!"); }
            if (type == "materials") { functions.replyMessage(message, "You deposited " + amount + " materials into " + guild._id + "'s guild bank!"); }
            //  if (guildData[guild].adminlog) { functions.dmUser(guildData[guild].leader, user.username + "(id " + id + ") deposited " + amount + " " + type + " into " + guild + "'s guild bank!") }
        }
        else if (command == "PAY" || command == "GIVE") { //I personally hate when if statements aren't written out, but it doesn't make a difference
            if (user.guildpos != "Leader" && user.guildpos != "Co-Leader") {//Honestly, there should be a better name for a "coleader"
                functions.replyMessage(message, "Only Leaders and Co-Leaders can give money from the guild bank!")
                return;
            }
            return Promise.all([functions.validate(message, user, 2)]).then(ret => {
                let target = ret[0];
                if (target == false) {
                    functions.replyMessage(message, "You can't pay a rock!");
                    return;
                }
                let type = ""
                let amount = 0
                if (words.length == 4) {
                    type = "money"
                    amount = parseInt(words[3]);
                    if (words[3] == "all") { amount = guild.bank }
                    if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to pay!") }
                } else {
                    type = words[3]
                    if (type != "money" && type != "materials") { return functions.replyMessage(message, "Please specify something to pay!(materials or money)!") }
                    amount = parseInt(words[4]);
                    if (words[4] == "all" && type == "money") { amount = guild.bank }
                    if (words[4] == "all" && type == "materials") { amount = guild.materials }
                    if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to pay!") }
                }
                if (amount <= 0) {
                    functions.replyMessage(message, "Don't try to scam the system!")
                    return;
                }
                if (type == "money" && amount > guild.bank) {
                    functions.replyMessage(message, "Your guild doesn't have enough money in it! It only has $" + guild.bank + "!");
                    return;
                }
                if (type == "materials" && amount > guild.materials) {
                    functions.replyMessage(message, "Your guild doesn't have enough materials in it! It only has " + guild.materials + "materials!");
                    return;
                }
                target[type] += amount;
                if (type == "money") {
                    guild.bank -= amount;
                    functions.replyMessage(message, "You have paid <@" + target._id + "> $" + amount + " !");
                }
                if (type == "materials") {
                    guild.materials -= amount;
                    functions.replyMessage(message, "You have paid <@" + target._id + "> " + amount + " materials!");
                }
                functions.setObject("guildData", guild)
                functions.setUser(target)
                // if (guildData[guild].adminlog) { functions.dmUser(guildData[guild].leader, user.username + "(id " + id + ") has paid " + amount + " " + type + " to "+target.username + "(id " + target._id + ")") }
            })
        }
        else if (command == "PROMOTE") {
            if (user.guildpos != "Leader") {//Honestly, there should be a better name for a "coleader"
                functions.replyMessage(message, "Only Leaders can promote others!")
                return;
            }
            return Promise.all([functions.validate(message, user, 2)]).then(ret => {
                let target = ret[0];
                if (target == false) {
                    functions.replyMessage(message, "You can't promote a rock!");
                    return;
                }
                if (target.guild != guild._id) {
                    functions.replyMessage(message, "You can't promote someone who's not in your guild!");
                }
                if (target.guildpos == "Member") {
                    target.guildpos = "Co-Leader"
                    functions.replyMessage(message, "You have promoted <@" + target._id + "> to Co-Leader!");
                } else {
                    functions.replyMessage(message, "They can't be promoted any further!");
                }
                functions.setUser(target)
            })
        }
        else if (command == "DEMOTE") {
            if (user.guildpos != "Leader") {//Honestly, there should be a better name for a "coleader"
                functions.replyMessage(message, "Only Leaders can demote others!")
                return;
            }
            return Promise.all([functions.validate(message, user, 2)]).then(ret => {
                let target = ret[0];
                if (target == false) {
                    functions.replyMessage(message, "You can't demote a rock!");
                    return;
                }
                if (target.guild != guild._id) {
                    functions.replyMessage(message, "You can't demote someone who's not in your guild!");
                    return;
                }
                if (target.guildpos == "Co-Leader") {
                    target.guildpos = "Member"
                    functions.replyMessage(message, "You have demoted <@" + target._id + "> to Member!");
                } else {
                    functions.replyMessage(message, "They can't be demoted any further!");
                    return;
                }
                functions.setUser(target)
            })
        }
        else if (command == "KICK") {
            if (user.guildpos != "Leader" && user.guildpos != "Co-Leader") {//Honestly, there should be a better name for a "coleader"
                functions.replyMessage(message, "Only Leaders and Co-Leaders can kick others!")
                return;
            }
            return Promise.all([functions.validate(message, user, 2)]).then(ret => {
                let target = ret[0];
                if (target == false) {
                    functions.replyMessage(message, "You can't kick a rock! (Well you can, but I wouldn't)");
                    return;
                }
                if (target._id == user._id) { return functions.replyMessage(message,"You can't kick yourself!")}
                if (target.guild != guild._id) {
                    functions.replyMessage(message, "You can't kick someone who's not in your guild!");
                    return;
                }
                if (user.guildpos == "Leader" || (user.guildpos == "Co-Leader" && target.guildpos == "Member")) {
                    functions.setProp("guildData", { "_id": guild._id }, { $pull: {"members": target._id}})
                    target.guild = "None";
                    target.guildpos = "None";
                    target.guildbuffs = {};
                    guild.members.splice(guild.members.indexOf(target._id), 1)
                    functions.sendMessage(message.channel, "<@" + target._id + "> was kicked from the guild!");
                    functions.setUser(target)
                    //if (guildData[guild].adminlog) { functions.dmUser(guildData[guild].leader, user.username + "(id " + id + ") has kicked "+target.username + "(id " + target._id + ") from your guild.") }
                }
            })
        }
        else if (command == "SUMMON" || command == "S") {
            if (user.guildpos != "Leader" && user.guildpos != "Co-Leader") {//Honestly, there should be a better name for a "coleader"
                functions.replyMessage(message, "Only Leaders and Co-Leaders can summon bosses!")
                return;
            }
            //if (devs.indexOf(id)==-1) {return functions.replyMessage(message, "This feature is under development...")}
            if (isNaN(guild.raid)) { return functions.replyMessage(message, "You already have a raid going on!") }
            if (guild.raid > ts) {
                functions.replyMessage(message, "You can next summon a raid boss in " + functions.displayTime(guild.raid, ts))
                return;
            }
            if (words[2] == undefined) { return functions.replyMessage(message, "Please specify a boss rarity!!!") }
            let summonrarity = words[2].toLowerCase()
            let raritytoscroll = { "0": "common", "1": "uncommon", "2": "rare", "3": "epic", "4": "legendary", "c": "common", "u": "uncommon", "r": "rare", "e": "epic", "l": "legendary" }
            if (raritytoscroll[summonrarity] != undefined) { summonrarity = raritytoscroll[summonrarity] }
            let scrollrarities = { "common": 0, "uncommon": 1, "rare": 2, "epic": 3, "legendary": 4 }
            if (summonrarity == undefined || summonrarity == "" || scrollrarities[summonrarity] == undefined) { return functions.replyMessage(message, "That rarity does not exist! See " + serverData[message.guild.id].prefix + "guild scrolls for a list of available rarities.") }
            if (guild.scrolls[scrollrarities[summonrarity]] < 1) { return functions.replyMessage(message, "Your guild does not have enough scrolls!") }
            guild.scrolls[scrollrarities[summonrarity]] -= 1
            let raritylevels = [0, 25, 75, 100, 125, 150]
            let summonlevel = Math.floor(Math.random() * (raritylevels[scrollrarities[summonrarity] + 1] - raritylevels[scrollrarities[summonrarity]]) + 1 + raritylevels[scrollrarities[summonrarity]])
            let rarityraids = guildRaidData[summonrarity]
            let raid = rarityraids[Math.floor(rarityraids.length * Math.random())]
            guild.raid = {}
            guild.raid._id = "GRaid"+guild._id
            guild.raid.isRaid = true
            guild.raid.url = raid.url
            guild.raid.name = raid.name;
            guild.raid.attack = raid.attack * summonlevel * 2;
            guild.raid.currenthealth = summonlevel * raid.health * 10;
            guild.raid.maxhealth = summonlevel * raid.health * 10;
            guild.raid.reward = summonlevel * raid.reward * 50;
            guild.raid.crystalreward = Math.floor(summonlevel * raid.crystalreward / 2);
            guild.raid.alive = true;
            guild.raid.attacklist = {};
            guild.raid.level = summonlevel;
            if (raid.ability != undefined) { guild.raid.ability = raid.ability; }
            functions.replyMessage(message, "You have successfully summoned a " + raid.name + " at level " + summonlevel + "!")
            functions.raidInfo(message, guild.raid)
        }
        else if (command == "RAIDINFO" || command == "RI") {
            //if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
            if (guild.raid.alive != true) { return functions.replyMessage(message, "You don't have a raid going on!") }
            functions.raidInfo(message, guild.raid)
        }
        else if (command == "RAIDATTACK" || command == "RATK") {
            //if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
            if (guild.raid.alive != true) { return functions.replyMessage(message, "You don't have a raid going on!") }
            functions.raidAttack(message, user, guild.raid, "guild", guild)
            if (guild.raid.alive == false) { guild.raid = ts + 1000 * 60 * guild.raid.level }
        }
        else if (command == "SCROLLS") {
            let text = "Your guild has: \n"
            text += "<:Common:546173232764682241> Common Scrolls: " + guild.scrolls[0] + "\n"
            text += "<:Uncommon:546173232542384168> Uncommon Scrolls: " + guild.scrolls[1] + "\n"
            text += "<:Rare:546173232802299904> Rare Scrolls: " + guild.scrolls[2] + "\n"
            text += "<:Epic:546173232773070848> Epic Scrolls: " + guild.scrolls[3] + "\n"
            text += "<:Legendary:546170457548783627> Legendary Scrolls: " + guild.scrolls[4]
            functions.replyMessage(message, text)
        }
        else if (command == "UPGRADE") {
            if (user.guildpos != "Leader" && user.guildpos != "Co-Leader") { return functions.replyMessage(message, "You must be a Leader or a Co-Leader to upgrade the guild!") }
            if (words.length == 2 || words[2].toLowerCase == "base") {
                if (guild.level >= 100) { return functions.replyMessage(message, "Your guild is already at maximum level!") }
                if (Math.pow(guild.level + 1, 4) > guild.xp) { return functions.replyMessage(message, "Your guild does not have enough xp!") }
                let cost = ((guild.level % 5) == 4) ? (((guild.level % 10) == 9) ? guild.bankmax : guild.bankmax / 5) : Math.floor(guild.bankmax / 10)
                let matscost = ((guild.level % 5) == 4) ? (((guild.level % 10) == 9) ? guild.materialmax / 100 : guild.materialmax / 500) : Math.floor(guild.materialmax / 1000)
                if (guild.bank < cost) { return functions.replyMessage(message, "Your guild does not have enough money! You need $" + cost) }
                if (guild.materials < matscost) { return functions.replyMessage(message, "Your guild does not have enough materials! You need " + matscost + " materials") }
                functions.setObject("guildData", guild)
                functions.MessageAwait(message.channel, id, "It costs $" + cost + " and " + matscost + " materials to level up your guild to level " + (guild.level + 1) + ". Are you sure you want to do this? If so, type confirm.", "confirm",
                    function (response, guild) {
                        return Promise.all([functions.getObject("guildData", guild._id)]).then(ret => {
                            let guild = ret[0]
                            if (guild.level >= 100) { return functions.replyMessage(message, "Your guild is already at maximum level!") }
                            if (Math.pow(guild.level + 1, 4) > guild.xp) { return functions.replyMessage(message, "Your guild does not have enough xp!") }
                            let cost = ((guild.level % 5) == 4) ? (((guild.level % 10) == 9) ? guild.bankmax : guild.bankmax / 5) : Math.floor(guild.bankmax / 10)
                            let matscost = ((guild.level % 5) == 4) ? (((guild.level % 10) == 9) ? guild.materialmax / 100 : guild.materialmax / 500) : Math.floor(guild.materialmax / 1000)
                            if (guild.bank < cost) { return functions.replyMessage(message, "Your guild does not have enough money! You need $" + cost) }
                            if (guild.materials < matscost) { return functions.replyMessage(message, "Your guild does not have enough materials! You need " + matscost + " materials") }
                            guild.xp -= Math.pow(guild.level + 1, 4)
                            guild.bank -= cost
                            guild.materials -= matscost
                            guild.level += 1
                            let leveluptext = ""
                            leveluptext += "You have successfully upgraded your guild to level " + guild.level + "! It cost $" + cost + " and " + matscost + " materials.\n"

                            while (guild.level * 200000 + 800000 > guild.bankmax) {
                                guild.bankmax += 200000
                                guild.materialmax += 200000
                                leveluptext += guild._id + " had their guild bank max increased to " + guild.bankmax + "\n" + guild._id + " had their guild materials max increased to " + guild.materialmax
                                if (leveluptext.length > 1900) {
                                    functions.replyMessage(message, leveluptext)
                                    leveluptext = ""
                                }
                            }
                            if (leveluptext != "") { functions.replyMessage(message, leveluptext) }
                            functions.setObject("guildData", guild)
                        })
                    }, guild)
                return
            }
            else if (words[2].toLowerCase() == "buff") {
                let buff = parseInt(words[3])
                if (isNaN(buff) || guildBuffStore[buff] == undefined) { return functions.replyMessage(message, "This buff does not exist!") }
                let buffname = guildBuffStore[buff].stat
                let bufflevel = guild.buffs[buffname] == undefined ? 0 : guild.buffs[buffname].level
                if (bufflevel >= guildBuffStore[buff].bonus.length - 1) { return functions.replyMessage(message, "This buff is at the maximum level!") }
                if (guildBuffStore[buff].levels[bufflevel + 1] > guild.level) { return functions.replyMessage(message, "You cannot upgrade this buff since your guild is not at a high enough level!") }
                if (guild.crystals < guildBuffStore[buff].prices[bufflevel + 1]) { return functions.replyMessage(message, "Your guild does not have enough crystals!") }
                guild.crystals -= guildBuffStore[buff].prices[bufflevel + 1]
                if (guild.buffs[buffname] == undefined) { guild.buffs[buffname] = { "level": 0, "value": guildBuffStore[buff].bonus[0] } }
                guild.buffs[buffname].level = bufflevel + 1
                guild.buffs[buffname].value = guildBuffStore[buff].bonus[bufflevel + 1]
                let setJsonObj = {}
                setJsonObj["guildbuffs." + buffname + ".level"] = bufflevel + 1
                setJsonObj["guildbuffs." + buffname + ".value"] = guildBuffStore[buff].bonus[bufflevel + 1]
                user.guildbuffs[buffname] = {}
                user.guildbuffs[buffname].level = bufflevel + 1
                user.guildbuffs[buffname].value = guildBuffStore[buff].bonus[bufflevel + 1]
                functions.setProp("userData", { "guild": guild._id }, { $set: setJsonObj}) 
                functions.replyMessage(message, "You have successfully upgraded " + buffname + " to level " + (bufflevel + 1))
            }
        }
        else if (command == "STORE") {
            let text = "Your guild's store: ```\n"
            let level = guild.level
            let pages = []
            for (var i = 0; i < guildStore.length; i++) {
                let alreadybought = (guild.store[i + ""] == undefined) ? 0 : guild.store[i + ""]
                //if (i==1) functions.replyMessage(message,alreadybought)
                text += "[" + i + "] " + guildStore[i].name
                let canbuy = 0
                for (var j = 0; j < guildStore[i].levels.length; j++) {
                    if (level < guildStore[i].levels[j]) {
                        break
                    }
                    canbuy += guildStore[i].stocks[j]
                };
                text += " ($" + guildStore[i].price + ")"
                text += " (" + (canbuy - alreadybought) + " left)"
                if (level < guildStore[i].levels[j]) {
                    text += " (Level " + guildStore[i].levels[j] + " to unlock " + guildStore[i].stocks[j] + " more)"
                } else {
                    text += " (MAX amount)"
                }
                text += "\n"
            }
            text += "Buy an item with !guild purchase {id} [amount]```"
            functions.replyMessage(message, text)
            /*
            pages.push(text)
            text = "Your guild's store: ```\n"
            for (var i = 0; i < guildBuffStore.length; i++) {
                let buff = guildBuffStore[i]
                let currbufflevel = (guild.buffs[i + ""] == undefined) ? 0 : guild.buffs[buff.stat]
                //if (i==1) functions.replyMessage(message,alreadybought)
                text += "[" + i + "] " + guildStore[i].name
                let canbuy = 0
                for (var j = 0; j < guildStore[i].levels.length; j++) {
                    if (level < guildStore[i].levels[j]) {
                        break
                    }
                    canbuy += guildStore[i].stocks[j]
                };
                text += " ($" + guildStore[i].price + ")"
                text += " (" + (canbuy - alreadybought) + " left)"
                if (level < guildStore[i].levels[j]) {
                    text += " (Level " + guildStore[i].levels[j] + " to unlock " + guildStore[i].stocks[j] + " more)"
                } else {
                    text += " (MAX amount)"
                }
                text += "\n"
            }
            */
            //functions.Paginator(message.channel,message.author,pages)

        }
        else if (command == "PURCHASE" || command == "BUY" || command == "B") {
            //if (admins.indexOf(id) == -1) { return }
            let level = guild.level
            let item = parseInt(words[2])
            if (isNaN(item) || item < 0 || guildStore[item] == undefined) return functions.replyMessage(message, "This item does not exist!")
            let amount = parseInt(words[3])
            if (isNaN(amount) || amount < 0) amount = 1

            let canbuy = 0
            for (var j = 0; j < guildStore[item].levels.length; j++) {
                if (level < guildStore[item].levels[j]) {
                    break
                }
                canbuy += guildStore[item].stocks[j]
            };

            if (guild.store[item] == undefined) { guild.store[item] = 0 }
            let alreadybought = guild.store[item]
            if (alreadybought + amount > canbuy) { return functions.replyMessage(message, "You don't have enough of this item in the store left!") }
            if (user.money < guildStore[item].price * amount) { return functions.replyMessage(message, "You don't have enough money to buy this item!") }
            guild.store[item] += amount
            user.money -= guildStore[item].price * amount
            if (item >= 0 && item <= 4) { guild.scrolls[item] += amount }
            if (item == 5) { user.consum.box += amount }
            functions.replyMessage(message, "You have successfully bought " + amount + " " + guildStore[item].name + " for $" + guildStore[item].price * amount)
        }
        else if (command == "RESET") {
            if (admins.indexOf(id) == -1) { return }
            let time = functions.extractTime(message,words[3])
            if (time === false) { return; }
            bot.setTimeout(function () {
                let guildName = words[2]
                if (guildName == undefined) { return functions.replyMessage(message, "Please enter a guild name!") }
                if (words[2].toUpperCase() == "ALL") {
                    functions.setProp("guildData", {}, { $set: { "store": {} } })
                    return functions.replyMessage(message, "The guild store has been reset for all guilds!")
                }
                return Promise.all([functions.getObject("guildData", guildName)]).then(ret => {
                    let guild = ret[0]
                    if (guild == false) { return functions.replyMessage(message, "Please specify a valid guild! (or all for all guilds)") }
                    guild.store = {}
                    functions.setObject("guildData", guild)
                    functions.replyMessage(message, words[2] + "'s guild store has been reset!")
                })
            }, time)
            return functions.replyMessage(message, "Guild store will reset in " + functions.displayTime(time, 0))
        }
        else if (command == "BUFFS") {
            let text = "Your guild's buffs: ```\n"
            for (var buffno in guildBuffStore) {
                let buff = guildBuffStore[buffno].stat
                let bufflevel = guild.buffs[buff] == undefined ? 0 : guild.buffs[buff].level

                let numspaces = 15 - guildBuffStore[buffno].name.length - buffno.length
                let leveltext = (guildBuffStore[buffno].levels[bufflevel + 1] > guild.level) ? " (guild level " + guildBuffStore[buffno].levels[bufflevel + 1] + " required for next upgrade)" : "(Ready to upgrade to " + (100 * guildBuffStore[buffno].bonus[bufflevel + 1]) + "% for " + guildBuffStore[buffno].prices[bufflevel + 1] + " crystals)"
                if (guildBuffStore[buffno].bonus.length <= bufflevel + 1) { leveltext = " (MAX LEVEL)" }
                text += "[" + buffno + "] " + guildBuffStore[buffno].name + " ".repeat(numspaces) + ": " + (100 * guildBuffStore[buffno].bonus[bufflevel]) + "% (level " + bufflevel + ")" + leveltext + "\n"
            }
            text += "Upgrade a buff with !guild upgrade buff [id]```"
            if (text == "Your guild's buffs: ```\nUpgrade a buff with !guild upgrade buff [buff]```") { text = "Your guild has no buffs! Purchase one with !guild upgrade buff [buff]" }
            functions.replyMessage(message, text)
        }
        else if (command == "FORGE") {
            if (admins.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
            if (guild.forge == undefined) {
                guild.forge = {
                    "level": 0, "enchant": [0, 0, 0], "enhance": [0, 0, 0], "donate": { "money": 0, "materials": 0 }
                }
            }
            if (guild.forge.level == undefined) { guild.forge.level = 0 }
            if (guild.forge.enchant == undefined) { guild.forge.enchant = [0,0,0] }
            if (guild.forge.enhance == undefined) { guild.forge.enhance = [0,0,0] }
            if (guild.forge.donate == undefined) { guild.forge.donate = { "money": 0, "materials": 0 } }
            let scmd = words.length < 3 ? "" : words[2].toUpperCase()
            if (scmd == "DONATE") {
                if (guild.forge.level == 9) { return functions.replyMessage(message, "The guild forge is at max level!") }
                let option = words.length < 4 ? "undefined" : words[3].toLowerCase();
                let amt = words.length < 5 ? -1 : parseInt(words[4])
                if (guild.forge.donate[option] == undefined) { return functions.replyMessage(message, "Please specify either money or materials!") }
                if (isNaN(amt) || amt <= 0) { return functions.replyMessage(message, "Please specify a positive integer amount!") }
                if (user[option] < amt) { return functions.replyMessage(message, "You do not have enough to donate!") }
                guild.forge.donate[option] += amt;
                user[option] -= amt;
                functions.replyMessage(message, "You have donated " + amt + " " + option + " to the guild forge!")
            } else if (scmd == "UPGRADE") {
                let option = words.length < 4 ? "" : words[3].toLowerCase();
                let option2 = words.length < 5 ? -1 : parseInt(words[4])
                if (option == "level") {
                    if (guild.forge.level == 9) { return functions.replyMessage(message, "The guild forge is already max level!") }
                    let moneydiff = Math.max(0, guildForgePrices.level[guild.forge.level + 1].money - guild.forge.donate.money)
                    let matsdiff = Math.max(0, guildForgePrices.level[guild.forge.level + 1].materials - guild.forge.donate.materials)
                    if (guild.level < guildForgePrices.level[guild.forge.level + 1].guildlevel) { return functions.replyMessage(message, "Your guild is not high enough level to upgrade the forge!") }
                    if (moneydiff > 0 && matsdiff > 0) { return functions.replyMessage(message, "You do not have enough money and/or materials to upgrade the forge!") }
                    guild.forge.donate.money -= guildForgePrices.level[guild.forge.level + 1].money
                    guild.forge.donate.materials -= guildForgePrices.level[guild.forge.level + 1].materials
                    guild.forge.level += 1;
                    functions.replyMessage(message, "You have upgraded the guild forge to level " + guild.forge.level + " for $" + guildForgePrices.level[guild.forge.level].money + " and " + guildForgePrices.level[guild.forge.level].materials + " materials!")
                }
                else if (option == "enchant" || option == "enhance") {
                    if (isNaN(option2) || option2 < 0 || option2 > guildForgePrices[option].length) { return functions.replyMessage(message, "This is not a valid option!") }
                    if (guild.forge[option][option2] == 9) { return functions.replyMessage(message, "This option is currently at max level!")}
                    if (guild.forge.level <= guild.forge[option][option2]) { return functions.replyMessage(message, "Your forge needs to be level " + guild.forge[option][option2] + 1 + " to upgrade this!") }
                    if (guild.crystals < guildForgePrices[option][option2].prices[guild.forge[option][option2] + 1]) { return functions.replyMessage(message, "Your guild does not have enough crystals!")}
                    guild.crystals -= guildForgePrices[option][option2].prices[guild.forge[option][option2] + 1]
                    guild.forge[option][option2] += 1;
                    functions.replyMessage(message, "You have upgraded " + option + ":" + guildForgePrices[option][option2].name + " to level " + guild.forge[option][option2])

                } else {
                    return functions.replyMessage(message, "This is not a valid option!")
                }
            } else {
                let text = "```"
                let forgeupgradetext = ""
                if (guild.forge.level == 9) { forgeupgradetext = "(MAX LEVEL)" }
                else {
                    let moneydiff = Math.max(0, guildForgePrices.level[guild.forge.level + 1].money - guild.forge.donate.money)
                    let matsdiff = Math.max(0, guildForgePrices.level[guild.forge.level + 1].materials - guild.forge.donate.materials)
                    if (moneydiff == 0 && matsdiff == 0) {
                        if (guild.level < guildForgePrices.level[guild.forge.level + 1].guildlevel) { forgeupgradetext = "(guild level " + guildForgePrices.level[guild.forge.level + 1].guildlevel + " required for next upgrade)" }
                        else { forgeupgradetext = "(Ready to upgrade!)" }
                    }
                    else { forgeupgradetext = "($" + moneydiff + " and " + matsdiff + " materials needed for next upgrade)" }
                }
                
                text+="Forge Level "+guild.forge.level+ " "+forgeupgradetext + "\n"

                text+="\nEnchantment \n"
                for (let i = 0; i < guildForgePrices.enchant.length; i++) {
                    let item = guildForgePrices.enchant[i];
                    let spaces = " ".repeat(10 - item.name.length)
                    let upgradetext = "(MAX LEVEL)"
                    if (guild.forge.enchant[i] < 9) {
                        upgradetext = guild.forge.level <= guild.forge.enchant[i] ? "(Forge level " + (guild.forge.enchant[i] + 1) + " required for next upgrade)" : "(Ready to upgrade to " + (100 * item.bonus[guild.forge.enchant[i]+1]) + "% for "+item.prices[guild.forge.enchant[i]+1]+" crystals)"
                    }
                    
                    text += "[" + i + "] " + item.name + spaces + ": " + (100 * item.bonus[guild.forge.enchant[i]]) + "% (level "+guild.forge.enchant[i]+") "+upgradetext+"\n";
                }

                text += "\nEnhancement \n"
                for (let i = 0; i < guildForgePrices.enhance.length; i++) {
                    let item = guildForgePrices.enhance[i];
                    let spaces = " ".repeat(10 - item.name.length)
                    let upgradetext = "(MAX LEVEL)"
                    if (guild.forge.enhance[i] < 9) {
                        upgradetext = guild.forge.level <= guild.forge.enhance[i] ? "(Forge level " + (guild.forge.enhance[i] + 1) + " required for next upgrade)" : "(Ready to upgrade to " + (100 * item.bonus[guild.forge.enhance[i]+1]) + "% for " + item.prices[guild.forge.enhance[i]+1] + " crystals)"
                    }

                    text += "[" + i + "] " + item.name + spaces + ": " + (100 * item.bonus[guild.forge.enhance[i]]) + "% (level " + guild.forge.enhance[i] + ") " + upgradetext + "\n";
                }

                text += "```"
                functions.sendMessage(message.channel, text)
            }
        }
        else if (command == "QUEST") {
            if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
        }
        else if (command == "RESETRAID") {
            if (admins.indexOf(id) == -1) {
                if (guild.raid.alive == true) { guild.raid = ts + 1000 * 60 * guild.raid.level; functions.setObject("guildData", guild); return functions.replyMessage(message, "Your raid was reset!") }
                return functions.replyMessage(message, "This feature is admin only...")
            }
            guild.raid = 1
            functions.replyMessage(message, guild._id + " had their raid reset!");
        }
        else if (command == "ADMINSET" || command == "ASET") {
            if (admins.indexOf(id) == -1) { return }
            if (words.length == 2) { return functions.replyMessage(message, "!g aset [guildName] [attribute] [amount]")}
            let newGuildName = words[2];
            if (newGuildName == undefined) { return functions.replyMessage(message,"Please specify a valid guild name. ")}
            return Promise.all([functions.getObject("guildData", newGuildName)]).then(ret => {
                let setGuild = ret[0]
                if (setGuild == false) { return functions.replyMessage(message, "Please specify a valid guild name. ") }
                let amount = words[4];
                if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
                let attribute = words[3];
                if (attribute == "_id") { return functions.replyMessage(message, "This is not allowed, don't break my bot") }
                //console.log(attribute)
                if (setGuild[attribute] == undefined) {
                    functions.sendMessage(message.channel, attribute + " is not a defined attribute");
                    return;
                }
                if (typeof setGuild[attribute] == "object") {
                    if (words.length > 5) {
                        let secondattribute = words[4]
                        let amount = parseInt(words[5]);
                        if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
                        if (setGuild[attribute][secondattribute] == undefined) {
                            functions.sendMessage(message.channel, attribute + ":" + secondattribute + " is not a defined attribute");
                            return
                        }
                        functions.sendMessage(message.channel, 'Set ' + setGuild._id+"\'s " + attribute + ":" + secondattribute + " to " + amount);
                        setGuild[attribute][secondattribute] = amount;
                        functions.logCommand(message)
                        functions.setObject("guildData", setGuild)
                        return
                    }
                    functions.sendMessage(message.channel, attribute + " is an object. Try setting one of its properties.")
                    return;
                }
                functions.sendMessage(message.channel, 'Set ' + setGuild._id + "\'s " + attribute + " to " + amount);
                setGuild[attribute] = amount;
                functions.setObject("guildData", setGuild)
                functions.logCommand(message)
                return
            })
        }
        else {
            functions.sendMessage(message.channel, functions.generateGuildTemplate(guild))
        }
        functions.setObject("guildData", guild)
    })
}