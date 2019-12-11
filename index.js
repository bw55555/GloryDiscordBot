const Discord = require('discord.js');
const asyncpkg = require("async")
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://GloryUser:GLORYmongodb@testthing-eaiqz.mongodb.net/test?retryWrites=true&w=majority";
global.client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
});
global.ready = false
global.bot = new Discord.Client();
global.botOnline = true
global.fs = require('fs')
var functions = require(`./Utils/functions.js`)

var commands = {}
var commandlist = {}
fs.readdir("./Commands/", (err, files) => {
    if (err) return console.error(err);
    console.log("Ran")
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
    //console.log(commandlist)
});

//const respond = require('./Utils/respond.js');
//const ability = require('./ability.js');
let config = require('./config.json')
global.talkedRecently = new Set();
global.globalcdlist = new Set();
const TOKEN = config.token;//woah woah woah woah whatcha

global.devData = JSON.parse(fs.readFileSync('Storage/devData.json', 'utf8'));

global.admins = devData.admins
global.devs = devData.devs
global.debugGuildId = devData.debugGuildId
global.debugChannelId = devData.debugChannelId
global.defaultPrefix = devData.defaultPrefix

global.moment = require('moment'); //moment package, lets you view date and time nicely
global.rarities = { "0": "Useless", "1": "Normal", "2": "Common", "3": "Uncommon", "4": "Rare", "5": "Super Rare", "6": "Epic", "7": "Legendary", "8": "Godly", "9": "GLORY", "Unique": "Unique" }
global.raritystats = [5, 10, 15, 25, 40, 60, 100, 150, 200, 500]
global.allowedmodifiers = ["critRate", "critDamage", "block", "lifeSteal", "pierce", "lucky", "spikes", "revenge", "rage", "sacrifice", "maxhp", "tempo", "burn","haste","evade"]
global.cdseconds = 1.5;
global.attackcd = 0.35;
global.rezcd = 1;
global.healcd = .8;
global.workcdseconds = 10;
global.smeltallcd = 1;
global.bolstercd = 2; //every 2 minute, you can do !bolster on another player or yourself. That adds 100 to their currenthealth regardless of max health.
global.userData = JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
global.itemData = JSON.parse(fs.readFileSync('Storage/itemData.json', 'utf8'));
global.mobData = JSON.parse(fs.readFileSync('Storage/mobData.json', 'utf8'));
global.guildData = JSON.parse(fs.readFileSync('Storage/guildData.json', 'utf8'));
global.serverData = JSON.parse(fs.readFileSync('Storage/serverData.json', 'utf8'));
//global.quizData = JSON.parse(fs.readFileSync('Storage/quizData.json', 'utf8'));
global.questData = JSON.parse(fs.readFileSync('Storage/questData.json', 'utf8'));
global.partyData = {}//JSON.parse(fs.readFileSync('Storage/partyData.json', 'utf8'));
//global.eggData = JSON.parse(fs.readFileSync('Storage/eggData.json', 'utf8'));
global.duel = {};

global.skillData = JSON.parse(fs.readFileSync('Assets/skillData.json', 'utf8'));
if (devData.dblenable) {
    const http = require('http');
    const DBL = require('dblapi.js');
    const server = http.createServer(function (req, res) {
        res.write("Recieved a post request");
        res.end();
    });
    const dbl = new DBL('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjYyMjAyMjcwOTYwODQ2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ5ODE3MTkxfQ.2pFz9ECHEzpi0OtneZ2LrP-_apXf5oXj2Tsv_OaUPTw', { webhookAuth: 'GLORYpassword', webhookServer: server }, bot);
}

function addServer(guild) {
    if (serverData[guild.id] == undefined) { serverData[guild.id] = {} }

    serverData[guild.id].prefix = defaultPrefix
    serverData[guild.id].disabledChannels = []
}

//console.log("Hello")
function evaluateMessage(message) {
    
    if (ready == false) { return }
    if (bot.user.id === message.author.id) { return }
    if (!devData.enable && devs.indexOf(message.author.id) == -1) {
        return;
    }
    //console.time("actual ping")
    //sendMessage(message.channel, "actual ping")
    if (devData.hardbans[message.author.id] && devs.indexOf(message.author.id) == -1) {
        return;
    }
    /*if (banlist.indexOf(message.author.id) != -1){
		return;
	}*/
    if (message.channel.type != "dm" && serverData[message.guild.id] == undefined) {
        addServer(message.guild)
    }
    message.content = message.content.trim().split(/\s+/).join(" ")
    let prefix = (message.channel.type == "dm") ? defaultPrefix : serverData[message.guild.id].prefix;
    if (message.content.startsWith("<@536622022709608468>")) prefix = "<@536622022709608468>"
    if (message.content.startsWith("<@!536622022709608468>")) prefix = "<@!536622022709608468>"
    if (message.content.startsWith("<@536622022709608468> ")) {
        let words = message.content.trim().split(/\s+/)
        words.splice(0, 1)
        message.content = prefix + words.join(" ")
    }
    if (message.content.startsWith("<@!536622022709608468> ")) {
        let words = message.content.trim().split(/\s+/)
        words.splice(0, 1)
        message.content = prefix + words.join(" ")
    }
    if (message.author.bot == true) {
        if (message.author.id == "537622416604528654" && (message.channel.id == "538800067507650590" || message.channel.id == "553385894183174165")) {
            let command = message.content.trim().split(/\s+/)
            if (command[0] == defaultPrefix + "vi") {
                message.content+= " override"
                functions.voteItem(message, true)
            }
            if (command[0] == defaultPrefix + "backup") { commands["backup"](message) }
        }
        return
    }
    if ((message.content.startsWith(prefix + "setcommandtimer") || message.content.startsWith(prefix + "sct")) && devs.indexOf(message.author.id) != -1) {
        let words = message.content.trim().split(/\s+/)
        let time = functions.extractTime(words[1])
        let ts = message.createdTimestamp;
        if (time == false) { return }
        words.splice(0, 2)
        message.content = prefix + words.join(" ")
        message.createdTimestamp+=time
        functions.replyMessage(message, "The command `" + prefix + words.join(" ")+"`" + " will be executed in "+ functions.displayTime(time, 0))
        bot.setTimeout(function () {
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
        if (userData[words[0]] == undefined || !bot.users.has(words[0])) {
            return functions.replyMessage(message, "That is an invalid user.")
        }
        message.author = bot.users.get(words[0])
        
        words.splice(0, 1)
        message.content = words.join(" ")
    }
    message.author.original = id
    functions.respond(message)
    if (!message.content.startsWith(prefix)) {
        return;
    }
    id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //here
    let command = words[0].toLowerCase()
    if (command.length <= prefix.length) { return }
    command = command.slice(prefix.length)
    //-----------------------------
    if (command == 'reload' && devs.indexOf(message.author.id) != -1) {
        if (words.length <= 1) return functions.replyMessage(message, "Must provide a command name to reload.");
        let commandName = words[1];
        // Check if the command exists and is valid
        if (commandName == "all") { commandName = "Utils" }
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
            functions.replyMessage(message, `The command ${commandName} has been reloaded!`);
        }
    }
    functions.getUser(message.author.id).then(user => {
        if (user==false && commandlist[command] != undefined && command != "start" && command != "create") {
            functions.replyMessage(message, 'Create a character with `' + prefix + 'start` first! (Use all lowercase)');
            return;
        } else if (command == "start" || command == "create") {
            commands.start(message)
            functions.checkStuff(message)
            return;
        } else if (commandlist[command] == undefined) {
            return;
        }
        functions.checkStuff(message)
        functions.checkBurn(message)
        functions.checkStuff(message)
        if (commandlist[command] == undefined) { return }
        if (!globalcdlist.has(message.author.id)) {
            globalcdlist.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                globalcdlist.delete(message.author.id);
            }, 1000);
        } else if (admins.indexOf(message.author.id) == -1) {
            functions.replyMessage(message, 'don\'t spam commands');
            functions.deleteMessage(message);
            return; //fml
        }
        console.log(message.author.id + "|" + message.content + "|" + ts)
        //sendMessage(bot.guilds.get("536599503608872961").channels.get("538710109241606154"), clean(message.author.id + "|" + message.content + "|" + ts))
        //console.time("run")
        commands[command](message)
        //console.timeEnd("run")
        functions.checkStuff(message)
        if (!talkedRecently.has(message.author.id)) {
            talkedRecently.add(message.author.id);
            setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(message.author.id);
            }, 15000);
        }
        //console.timeEnd("Command")
        //Command cooldowns
    });
}
bot.on("message", message => {
    evaluateMessage(message)
});


bot.on('ready', function () {
    console.log("GLORY ONLINE!");
    ready = true
    bot.user.setActivity(global.defaultPrefix + 'help', { type: 'PLAYING' });
    functions.sendMessage(bot.guilds.get(debugGuildId).channels.get(debugChannelId), {
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
    bot.setInterval(function () {
        functions.writeData("Storage")
    }, 30000)
    let resettimer = 86400000 - (Date.now() % 86400000)
    bot.setTimeout(function () {
        for (var resetGuild in guildData) {
            guildData[resetGuild].store = {}
        }
        functions.sendMessage(bot.channels.get(devData.debugChannelId), "The guild store has been reset for all guilds!")
        bot.setInterval(function () {
            for (var resetGuild in guildData) {
                guildData[resetGuild].store = {}
            }
            functions.sendMessage(bot.channels.get(devData.debugChannelId), "The guild store has been reset for all guilds!")
        }, 86400000)
    }, resettimer)
    //console.timeEnd("actual ping")
})
bot.on("guildCreate", guild => {
    console.log("Joined a new guild: " + guild.name);
    addServer(guild)
    
    var allowedchannels = guild.channels.filter(channel => channel.type == "text" && channel.memberPermissions(bot.user).has("SEND_MESSAGES") )
    if (allowedchannels.size == 0) { return }
    var channel = allowedchannels.find(channel => channel.name == "botspam" || channel.name == "general")
    if (channel == undefined) { channel = allowedchannels.first()}
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
                  "value": "There are higher leveled bosses in the support server. FInd the invite using `!info`."
              }
            ]
        }
    });

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
    functions.sendMessage(bot.guilds.get(debugGuildId).channels.get(debugChannelId), debug)
    //functions.sendMessage(bot.guilds.get("536599503608872961").channels.get("547538741699280914"), debug)
})
bot.login(TOKEN);

process.on('unhandledRejection', error => {
    console.error(`Uncaught Promise Error: \n${error.stack}`);
});