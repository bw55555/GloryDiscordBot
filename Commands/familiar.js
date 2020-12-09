global.familiarraritynumbers = ["???", "Common", "Rare", "Epic", "Legendary", "Divine"]
global.familiarpersonalitytraits = ["Reckless", "Determined", "Curious", "Careless", "Lazy", "Persistent"]
let familiarData = Assets.familiarData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    let word2 = words[1];
    if (word2 == undefined) { word2 = "" }
    word2 = word2.toLowerCase();
    if (word2 == `help`) {
        /*
        let page = {
            "embed": {
                "color": 0x458B00,
                "fields": [
                    {
                        "name": "The Auction House",
                        "value": "- List auction items with `!auction list`.\n"
                            + "- Bid on items from the auction with `!auction bid [itemid] [price]`\n"
                    }
                ],
                "footer": {
                    "text": "Items bid through the auction will not be refunded under any circumstances."
                }
            }
        }
        functions.sendMessage(message.channel, page)
        return
        */
    }
    if (word2 == "profile" || word2 == "p") {
        if (user.familiar == undefined) { return functions.replyMessage(message, "You do not yet have a pet!") }
        let familiar = user.familiar
        let levelmsg = familiar.level + "/" + (familiar.rarity*20);
        if (levelmsg == 100) { levelmsg += " (MAX LEVEL)" }
        else { levelmsg += " (" + familiar.xp + "/" + checkfamiliarxp(familiar) + " xp to next level)" }
        let gitext = "**Name: **" + familiar.name + "\n";
        gitext += "**Race: **" + familiar.race + " (" + familiar.element + ") (" + familiarraritynumbers[familiar.rarity] + ")\n"
        gitext += "**Level: **" + levelmsg + "\n"
        let satext = "**health: **" + familiar.health + "\n"
        satext += "**" + familiar.substat + ": **" + familiar[familiar.substat] + "\n"
        let traitstext = familiar.traits.join(", ")
        if (traitstext == "") { traitstext = "No Traits"}
        return functions.sendMessage(message.channel, {
            "embed": {
                "color": 5251510,
                "title": "Familiar Profile",
                "fields": [
                    {
                        "name": "General Info",
                        "value": gitext,
                        "inline": false
                    },
                    {
                        "name": "Stats and Abilities",
                        "value": satext,
                        "inline": false
                    },
                    {
                        "name": "Traits",
                        "value": traitstext,
                        "inline": false
                    }
                ]
            }
        });
    }
    if (word2 == "contract"|| word2 == "c") {
        let raritychances = [0, 0, 0, 0, 0, 1]
        let contractrarity = functions.getRandomByChances(raritychances)
        let contractlist = familiarData.filter(x => x.rarity == contractrarity)
        let contractfamiliar = contractlist[Math.floor(Math.random() * contractlist.length)]
        let familiar = { "_id": devData.nextFamiliarId }
        familiar.owner = user._id
        familiar.level = 1;
        familiar.xp = 0;
        familiar.race = contractfamiliar.race;
        familiar.element = contractfamiliar.element;
        familiar.substat = contractfamiliar.substat
        familiar[familiar.substat] = contractfamiliar[familiar.substat]
        familiar.abilities = [];
        familiar.abilities.push({ "ability": contractfamiliar.rability, "abilitydesc": contractfamiliar.rabilitydesc })
        familiar.rarity = contractrarity
        familiar.traits = contractfamiliar.traits.filter(x => true)
        familiar.traits.push(familiarpersonalitytraits[Math.floor(Math.random() * familiarpersonalitytraits.length)])
        familiar.name = familiar.race
        familiar.url = contractfamiliar.url
        let healthminmax = contractfamiliar.health.split("-")
        familiar.health = Math.floor(Math.random() * (parseInt(healthminmax[1]) - parseInt(healthminmax[0])) + parseInt(healthminmax[0]))
        familiar.healthpotential = familiar.health
        devData.nextFamiliarId++;
        functions.setObject("devData", devData)
        user.familiar = familiar
        functions.setObject("familiarData", familiar)
        functions.replyMessage(message, "You have successfully contracted a "+familiarraritynumbers[familiar.rarity] + " "+ familiar.race + " ("+familiar.element+")!")
    }
    if (word2 == "list") {
        functions.findObjects("familiarData", { "owner": user._id }).then(familiars => {
            if (familiars.length == 0) {return functions.replyMessage(message, "You have no familiars!")}
            functions.createPages(message, user, familiars, user.username + "'s Familiars", x => x.name + " (" + x._id + ")", x => "**Race: **" + x.race + " (" + x.element + ") (" + familiarraritynumbers[x.rarity] + ")\n**Level: **" + x.level + "\n", {"includeNumbering": true})
        })
    }
    if (word2 == "mission") {
        let word3 = words[2];
        if (word3 == undefined) { word3 = "list" }
        word3 = word3.toLowerCase()
        if (word3 == "refresh") {
            let nummissions = 5;
            let elementlist = ["Fire", "Water", "Earth", "Wind"]
            let raritylist = ["Common", "Uncommon", "Rare", "Epic", "Legendary"]
            let raritychances = [0.36, 0.28, 0.2, 0.12, 0.04]
            let timearr = {
                "Common": [5*60*1000, 10*60*1000, 20*60*1000],
                "Uncommon": [15*60*1000, 30*60*1000, 45*60*1000],
                "Rare": [40*60*1000, 60*60*1000, 90*60*1000],
                "Epic": [60*60*1000, 90*60*1000, 120*60*1000],
                "Legendary": [120*60*1000, 180*60*1000, 240*60*1000]
            }
            let terrainlist = {
                "Fire": ["Volcano", "Lavafield", "Hell"],
                "Water": ["River", "Ocean", "Deep Ocean"],
                "Earth": ["Mountains", "Caves", "Underground"],
                "Wind": ["Canyon", "Mountains", "Clouds"]
            }
            let chancelist = {
                "Common": [1],
                "Uncommon": [1],
                "Rare": [1],
                "Epic": [1],
                "Legendary": [1]
            }
            for (let i = 0; i < nummissions; i++) {
                let mr = functions.getRandomArrayElement(raritylist, raritychances)
                let ele = functions.getRandomArrayElement(elementlist)
                let mission = {
                    "name": "Random Name",
                    "rarity": mr,
                    "element": ele,
                    "time": functions.getRandomArrayElement(timearr[mr]),
                    "level": 10 * Math.floor(10 * Math.random()),
                    "terrain": functions.getRandomArrayElement(terrainlist[ele]),
                    "chance": functions.getRandomArrayElement(chancelist[mr]),
                    "rewards": "500 xp"
                }
            }
        } else {
            let fields = []
            for (let mission of user.missions) {
                fields.push({
                    "name": mission.name + " (" + mission.rarity + ")",
                    "value": "🕐 Time: " + functions.displayTime(mission.time, 0) + "\n⚠️Recommended Level: " + mission.level + "\n⚠️Recommended Element: " + mission.element + "\n⚠️Terrain: " + mission.terrain + "\n✅Base Success Rate: " + mission.chance + "\nRewards: " + mission.rewards
                })
            }
            functions.sendMessage(message.channel, {
                "embed": {
                    //"color": 5251510,
                    "title": "Mission List",
                    "fields": fields
                }
            });
        }
    }
}
function checkfamiliarxp(familiar) {
    return 20*(familiar.level*familiar.level)
}