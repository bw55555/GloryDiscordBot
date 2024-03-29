packagelocation = '../../modules/'
global.config = require('./config.json')
global.Discord = require('discord.js');
const asyncpkg = require("async")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb://localhost/glory?retryWrites=true&w=majority";
global.throttledQueue = require("throttled-queue");
global.throttle = throttledQueue(1000, 1000);
global.client = new MongoClient(uri, { useNewUrlParser: true });
global.db = config.db
global.fs = require('fs')
global.util = require("util");
const http = require('http');
const DBL = require('dblapi.js');
//global.runeNames in runes.js, global.guildForgePrices in guild.js
global.functions = require(`./Utils/functions.js`)
require(`./Utils/globalvars.js`)
global.bot = new Discord.Client();
global.ready = false
global.botOnline = true
global.waitList = {}

const TOKEN = config.token;//woah woah woah woah whatcha
let channelnum = 0;
let iterchannel = 0;
client.connect((err) => {
    console.log(err);
    Promise.all([functions.findObjects("serverData", {}), functions.getObject("devData", "devData")]).then(someDataReturn => {
        global.serverData = {};
        let serverArr = someDataReturn[0];
        for (var server of serverArr) {
            serverData[server._id] = server;
        }
        global.devData = someDataReturn[1];
        if (devData == undefined || devData == false || devData == {}) {
            global.devData = { "_id": "devData", "enable": true, "dblenable": false, "debugenable": false, "defaultPrefix": "!", "debugGuildId": "536599503608872961", "debugChannelId": "538710109241606154", "hardbans": { "290244794255409157": true, "459929384355102733": true, "438307010774302730": true, "725748689926225990": true, "552682571746639902": true, "266984067059154944": true, "478571413465202698": true, "714676015238086656": true, "559289581363658752": null, "743852168309768293": true, "728394648174723192": true, "753229290929127496": true, "658677095634829322": true, "621125483823890440": null, "689593810711609370": null, "645843010512224267": null, "222090331003420672": true, "322596582488932354": true, "652445902983659531": null, "142063063607017474": null, "559191628867305490": null, "338516768005947392": true, "494673902228865054": null, "835916982497968180": true, "723901010908676096": true }, "admins": ["444564799913721876", "266984067059154944", "388333939414269974", "537622416604528654", "691740256063455247", "488174250809753622", "754648471100981341", "500503360018055169", "666236502937829396", "510240935913979926", "429375818779852800", "525139442663424011"], "devs": ["266984067059154944", "444564799913721876", "388333939414269974", "691740256063455247", "666236502937829396"], "nextItem": 14746839, "heartbeatChannelId": "547538741699280914", "errorChannelId": "752027915570511942", "eventRaidChannel": "542171947895881748", "flagChannelId": "763949162517364747", "security": 0.01, "halloweenevent": { "start": 1635638400000, "end": 1636416000000 }, "nextAuctionId": 115, "luckymult": 1, "auctionChannelId": "775670815013470239", "commandLogChannels": ["783555918276853781", "783555946332028928", "783556016184885280", "783556016566042634", "783556017249058816", "783556020294385664", "783556131502555168", "783556159227428914", "783556186234552351", "783556213505261568"], "commandLogGuild": "770144064930316288", "numEventQuests": 2062, "numEventPresents": 4493, "christmasevent": { "start": 1608681600000, "refresh": 1608993000000, "end": 0 }, "starevent": { "starchance": 0.1, "ongoing": false, "lucky": false, "store": true }, "questevent": { "start": 1627862400000, "end": 1628295004800, "refresh": 1628468100000 }, "maintenancetext": "Welcome back to GLORY!" }
        }
        console.log("devData:");
        console.log(devData);
        global.globalcdlist = new Set();
        global.admins = devData.admins
        global.devs = devData.devs
        global.debugGuildId = devData.debugGuildId
        global.debugChannelId = devData.debugChannelId
        if (devData.security == undefined) { devData.security = 0.01 }
        if (devData.commandLogChannels == undefined) {devData.commandLogChannels = []}
        if (devData.dblenable) {
            const server = http.createServer(function (req, res) {
                res.write("Recieved a post request");
                res.end();
            });
            const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjYyMjAyMjcwOTYwODQ2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ5ODE3MTkxfQ.2pFz9ECHEzpi0OtneZ2LrP-_apXf5oXj2Tsv_OaUPTw', { webhookAuth: 'GLORYpassword', webhookServer: server }, bot);
        }
        console.log("Bot Logging In...")
        bot.login(TOKEN).catch(console.error);
    })
})
var commands = {}
var commandlist = {}
global.Assets = {}
var assetList = {}
async function loadFiles() {
    await fs.readdir("./Assets/", (err, files) => {
        if (err) return console.error(err);
        console.log("Reading Assets")
        files.forEach(file => {
            //console.log(file)
            // If the file is not a JS file, ignore it (thanks, Apple)
            if (!file.endsWith(".json")) { return };
            // Load the event file itself
            let assetname = file.split(".")[0];
            //console.log(commandname)
            Assets[assetname] = require(`./Assets/${file}`);
            assetList[assetname] = "exists"
            // Get just the event name from the file name
            delete require.cache[require.resolve(`./Assets/${file}`)];

        });
        console.log("Done Reading Assets")
        global.skillData = Assets.skillData;
        //console.log(commandlist)
    });
    await fs.readdir("./Commands/", (err, files) => {
        if (err) return console.error(err);
        console.log("Reading Commands")
        files.forEach(file => {
            //console.log(file)
            // If the file is not a JS file, ignore it (thanks, Apple)
            if (!file.endsWith(".js")) { return };
            // Load the event file itself
            let commandname = file.split(".")[0];
            //console.log(commandname)
            commands[commandname] = require(`./Commands/${file}`);
            commandlist[commandname] = "exists"
            // Get just the event name from the file name
            delete require.cache[require.resolve(`./Commands/${file}`)];

        });
        console.log("Done Reading Commands")
        //console.log(commandlist)
    });
}
loadFiles()
function addServer(guild) {
    if (serverData[guild.id] == undefined) { serverData[guild.id] = {} }
    serverData[guild.id]._id = guild.id
    serverData[guild.id].prefix = devData.defaultPrefix
    serverData[guild.id].disabledChannels = []
    functions.setObject("serverData", serverData[guild.id])
}

//console.log("Hello")
function evaluateMessage(message) {
    if (ready == false) { console.log("Not Ready"); return }

    //console.log("ts: " + message.createdTimestamp + ", ChannelId: " + message.channel.id + ", Author:" + message.author.id + ", Text: " + message.content);

    if (bot.user.id === message.author.id) { return }
    functions.respond(message)
    if (!devData.enable && devs.indexOf(message.author.id) == -1) {
        return;
    }
    if (devData.hardbans[message.author.id] && devs.indexOf(message.author.id) == -1) {
        return;
    }
    if (message.channel.type != "dm" && serverData[message.guild.id] == undefined) {
        addServer(message.guild)
    }
    message.content = message.content.trim()//.split(/\s+/).join(" ")

    let prefix = (message.channel.type == "dm") ? devData.defaultPrefix : serverData[message.guild.id].prefix;
    if (message.content.startsWith("<@" + bot.user.id + ">")) prefix = "<@" + bot.user.id +">"
    if (message.content.startsWith("<@!" + bot.user.id + ">")) prefix = "<@!" + bot.user.id +">"
    if (message.content.startsWith("<@" + bot.user.id +"> ")) {
        let words = message.content.trim().split(/\s+/)
        words.splice(0, 1)
        message.content = prefix + words.join(" ")
    }
    if (message.content.startsWith("<@!536622022709608468> ")) {
        let words = message.content.trim().split(/\s+/)
        words.splice(0, 1)
        message.content = prefix + words.join(" ")
    }

    

    let ts = message.createdTimestamp;
    let chid = message.channel.id
    if (talkedRecently[chid] == undefined) { talkedRecently[chid] = {} }
    talkedRecently[chid][message.author.id] = ts;
    for (let key in talkedRecently[chid]) {
        if (functions.calcTime(ts, talkedRecently[chid][key]) > 15) { delete talkedRecently[chid][key]}
    }
    if (nctlist[message.author.id] == undefined) { nctlist[message.author.id] = 0; }
    if (!message.content.startsWith(prefix)) {
        nctlist[message.author.id] += 1;
        return;
    }
    if (message.author.bot == true) {
        if (message.author.id == "537622416604528654" && (message.channel.id == "538800067507650590" || message.channel.id == "553385894183174165")) {
            let command = message.content.trim().split(/\s+/)
            if (command[0] == "!vi") {
                message.content += " override"
                functions.voteItem(message, {}, true)
            }
            if (command[0] == "!backup") { commands["backup"](message) }
        }
        return
    }
    if ((message.content.startsWith(prefix + "setcommandtimer") || message.content.startsWith(prefix + "sct")) && devs.indexOf(message.author.id) != -1) {
        let words = message.content.trim().split(/\s+/)
        let time = functions.extractTime(message, words[1])
        
        if (time === false) { return }
        words.splice(0, 2)
        message.content = prefix + words.join(" ")
        message.createdTimestamp += time
        functions.replyMessage(message, "The command `" + message.content + "`" + " will be executed in " + functions.displayTime(time, 0))
        bot.setTimeout(function () {
            functions.replyMessage(message, "The command + `" + message.content+"` will be executed.")
            evaluateMessage(message)
        }, time)
        return
    }
    let id = message.author.id;
    if (message.content.startsWith(prefix + "runas") && devs.indexOf(message.author.id) != -1) {
        let words = message.content.trim().split(/\s+/)
        if (words.length < 3) {
            return functions.replyMessage(message, "Please specify a user and a command.")
        }
        words.splice(0, 1)
        if (words[0].startsWith("<@") && words[0].endsWith(">")) {
            words[0] = words[0].slice(2, -1)
        }
        if (words[0].startsWith("!")) {
            words[0] = words[0].slice(1)
        }
        if (!bot.users.cache.has(words[0])) {
            return functions.replyMessage(message, "That is an invalid user.")
        }
        message.author = bot.users.cache.get(words[0])

        words.splice(0, 1)
        message.content = words.join(" ")
    }
    message.author.original = id
    
    
    id = message.author.id;
    let words = message.content.trim().split(/\s+/)
    //here
    let command = words[0].toLowerCase()
    if (command.length <= prefix.length) { return }
    command = command.slice(prefix.length)
    message.command = command;
    if (message.channel.type != "dm" && message.channel.type != "group" && message.channel.permissionsFor(bot.user) != null && !message.channel.permissionsFor(bot.user).has("SEND_MESSAGES")) { return }
    if (message.channel.guild != undefined && serverData[message.channel.guild.id] != undefined && serverData[message.channel.guild.id].disabledChannels.indexOf(message.channel.id) != -1 && command != "settings") { return; }
    //-----------------------------
    if (command == 'reload' && devs.indexOf(message.author.id) != -1) {
        if (words.length <= 1) return functions.replyMessage(message, "Must provide a command name to reload.");
        let commandName = words[1];
        // Check if the command exists and is valid
        if (commandName == "all") { commandName = "Assets" }
        if (commandName == "Assets") {
            fs.readdir("./Assets/", (err, files) => {
                if (err) return console.error(err);
                //console.log("Reading Assets")
                files.forEach(file => {
                    //console.log(file)
                    // If the file is not a JS file, ignore it (thanks, Apple)
                    if (!file.endsWith(".json")) { return };
                    // Load the event file itself
                    let assetname = file.split(".")[0];
                    //console.log(commandname)
                    Assets[assetname] = require(`./Assets/${file}`);
                    assetList[assetname] = "exists"
                    // Get just the event name from the file name
                    delete require.cache[require.resolve(`./Assets/${file}`)];

                });
                //console.log("Done Reading Assets")
                //console.log(commandlist)
                global.skillData = Assets.skillData;
            });
            functions.replyMessage(message, "You have successfully reloaded all Assets!")
            commandName = "Utils"
        }
        if (commandName == "Utils") {
            fs.readdir("./Utils/", (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    //console.log(file)
                    // If the file is not a JS file, ignore it (thanks, Apple)
                    if (!file.endsWith(".js")) { return };
                    // Load the event file itself
                    let commandname = file.split(".")[0];
                    //console.log(commandname)
                    delete require.cache[require.resolve(`./Utils/${file}`)];
                    // Get just the event name from the file name
                });
            })
            functions.replyMessage(message, "You have successfully reloaded all Utils!")
            commandName = "functions"
        }
        if (commandName == "functions") {
            delete require.cache[require.resolve(`./Utils/functions.js`)];
            functions = require(`./Utils/functions.js`)
            delete require.cache[require.resolve(`./Utils/functions.js`)];
            //delete require.cache[require.resolve(`./index.js`)]
            commandName = "Commands"
            functions.replyMessage(message, "You have successfully reloaded all functions.")
        }
        if (commandName == "Commands") {
            fs.readdir("./Commands/", (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    //console.log(file)
                    // If the file is not a JS file, ignore it (thanks, Apple)
                    if (!file.endsWith(".js")) { return };
                    // Load the event file itself
                    let commandname = file.split(".")[0];
                    //console.log(commandname)
                    delete require.cache[require.resolve(`./Commands/${file}`)];
                    commands[commandname] = require(`./Commands/${file}`);
                    commandlist[commandname] = "exists"
                    // Get just the event name from the file name
                    delete require.cache[require.resolve(`./Commands/${file}`)];

                });
                //console.log(commandlist)

            });
            functions.replyMessage(message, "All commands have been reloaded!")
        } else {
            if (!commandName.endsWith(".js")) { return functions.replyMessage(message, "The file needs to end with .js (e.g. attack.js)") }
            if (commands[commandName.split(".")[0]] == undefined) {
                return functions.replyMessage(message, "That command does not exist");
            }
            // the path is relative to the *current folder*, so just ./filename.js
            delete require.cache[require.resolve(`./Commands/${commandName}`)];
            delete commands[commandName.split(".")[0]];
            commands[commandName.split(".")[0]] = require(`./Commands/${commandName}`);
            commandlist[commandname] = "exists"
            functions.replyMessage(message, `The command ${commandName} has been reloaded!`);
        }
    }
    try {
        functions.getUser(message.author.id).then(user => {
            if (user == false && commandlist[command] != undefined && command != "start" && command != "create") {
                functions.replyMessage(message, 'Create a character with `' + prefix + 'start` first! (Use all lowercase)');
                return;
            } else if (command == "start" || command == "create") {
                commands.start(message, user)
                return;
            } else if (commandlist[command] == undefined) {
                return;
            }
            if (functions.checkStuff(message, user) == false) { return }
            if (commandlist[command] == undefined) { return }
            if (user.cnumbers == undefined) { user.cnumbers = [0, 0] }
            if (admins.indexOf(message.author.id) == -1 && functions.calcTime(ts, user.cooldowns.normal) < 1) {
                functions.replyMessage(message, 'don\'t spam commands');
                functions.deleteMessage(message);
                return; //fml
            }
            if (user.maintenance) {
                delete user.maintenance
                if (devData.maintenancetext != undefined && devData.maintenancetext != "") {
                    functions.sendMessage(message.channel, devData.maintenancetext)
                }
            }
            if (devs.indexOf(id) == -1) {
                if (user.macro) {
                    functions.logCommand(message, "MACRO")
                }
                if (Math.random() < devData.security || user.macro) {
                    functions.antimacro(message, user)
                    functions.setUser(user)
                    return;
                }
            }
            user.cnumbers[0] += nctlist[message.author.id]
            user.cnumbers[1] += 1
            nctlist[message.author.id] = 0;

            user.cooldowns.normal = ts;
            if (user.flag == true) {
                functions.logCommand(message, "FLAG")
            }

            //sendMessage(bot.guilds.cache.get("536599503608872961").channels.cache.get("538710109241606154"), message.author.id + "|" + message.content + "|" + ts)
            //console.time("run")
            if (devData.commandLogGuild != undefined) {
                iterchannel++;
                if (iterchannel % 5 == 0) { channelnum++; iterchannel = 0; }
                if (channelnum >= devData.commandLogChannels.length) { channelnum = 0; }
                functions.logCommand(message, "CLOG", undefined, devData.commandLogGuild, devData.commandLogChannels[channelnum])
            }
            commands[command](message, user).then(ret => {
                functions.postCommandCheck(message, user);
                if (command == 'restore' || command == 'eval') {
                    return;
                }
                functions.setUser(user)
            })
            //console.timeEnd("run")
            //console.timeEnd("Command")
            //Command cooldowns
        });
    } catch (e) {
        console.log(e);
    }
}
bot.on("message", message => {
    evaluateMessage(message)
});

bot.on('ready', function () {
    console.log("GLORY ONLINE!");
    ready = true
    bot.user.setActivity(devData.defaultPrefix + 'help', { type: 'PLAYING' });
    functions.sendMessage(bot.guilds.cache.get(debugGuildId).channels.cache.get(debugChannelId), {
        embed: {
            color: 0x00ffff,
            /*thumbnail: {
            "url": "https://i.imgur.com/r39nI8f.jpg"
            },*/
            fields: [
                {
                    name: "ONLINE",
                    value: "GLORY ONLINE!",
                    inline: true
                }
            ]
        }
    })
    let resettimer = 86400000 - (Date.now() % 86400000)
    
    if (dailyrefresh == null) {
        dailyrefresh = bot.setTimeout(function () {
            functions.dailyReset()
            dailyrefresh = bot.setInterval(function () {
                functions.dailyReset()
            }, 86400000)
        }, resettimer)
    }
    //console.timeEnd("actual ping")
})
bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    addServer(guild)
    /*
    var allowedchannels = guild.channels.cache.filter(channel => channel.type == "text" && channel.permissionsFor(bot.user).has("SEND_MESSAGES"))
    if (allowedchannels.size == 0) { return }
    var channel = allowedchannels.find(channel => channel.name == "botspam" || channel.name == "general")
    if (channel == undefined) { channel = allowedchannels.first() }
    functions.sendMessage(channel, {
        "embed": {
            "description": "Join the Glory Support server by clicking [here!](https://discord.gg/QsdmhgX) ",
            "color": 5251510,
            "timestamp": "2019-01-23T21:42:00.210Z",
            "footer": {
                "icon_url": "https://i.imgur.com/NI4HDRs.jpg",
                "text": "Made by Nix#6340 and bw55555#5977"
            },
            "image": {
                "url": "https://i.imgur.com/RfbvLJg.jpg"
            },
            "author": {
                "name": "Glory - A Discord RPG Bot",
                "url": "https://discordapp.com",
                "icon_url": "https://imgur.com/afYUwxM.jpg"
            },
            "fields": [
                {
                    "name": "Getting Started",
                    "value": "To get started, type `!start`"
                },
                {
                    "name": "Prefix",
                    "value": "Admin of the server? Have too many other bots with the same prefix? Use `!settings prefix <newprefix>` to change the prefix."
                },
                {
                    "name": "Disabling Channels",
                    "value": "Don't want glory to send messages in a certain channel? Use `!settings disable` in that channel (or `!settings enable`)"
                },
                {
                    "name": "Forgot your prefix?",
                    "value": "Mention the bot as another prefix, or kicking and readding the bot will reset it's prefix to `!`"
                },
                {
                    "name": "Halp plz? How do I play? ",
                    "value": "Check out `!tutorial`."
                },
                {
                    "name": "Raid bosses too easy? ",
                    "value": "There are higher leveled bosses in the support server. Find the invite using `!info`."
                },
                {
                    "name": "Want to support the bot? ",
                    "value": "You may donate using patreon. See `!donate` for the link."
                }
            ]
        }
    });
    */

})
bot.on("disconnect", event => {
    console.log("Bot disconnected");
})
bot.on("error", error => {
    console.log(error.message + "\nFile name:" + error.fileName + "\nLine number:" + error.lineNumber);
})
bot.on("debug", debug => {
    if (devData.debugenable == false) { return }
    if (debug.indexOf(config.token) != -1) { return }
    if (ready == false) { console.log(debug); return }
    functions.sendMessage(bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData.heartbeatChannelId), debug)
})
process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Error: \n${error.stack}`);
    if (bot != undefined && bot.guilds != undefined && devData != undefined && devData.errorChannelId != undefined && devData.debugGuildId != undefined) {
        functions.sendMessage(bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData.errorChannelId), "```\n"+error.stack+"\n```")
    }
});