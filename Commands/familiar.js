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
    if (word2 == "profile") {
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
    if (word2 == "contract") {
        let raritychances = [0, 0, 0, 0, 0, 1]
        let contractrarity = functions.getRandomByChances(raritychances)
        let contractlist = familiarData.filter(x => x.rarity == contractrarity)
        let contractfamiliar = contractlist[Math.floor(Math.random() * contractlist.length)]
        let familiar = { "_id": devData.nextFamiliarId }
        familiar.level = 1;
        familiar.xp = 0;
        familiar.race = contractfamiliar.race;
        familiar.element = contractfamiliar.element;
        familiar.substat = contractfamiliar.substat
        familiar[familiar.substat] = contractfamiliar[familiar.substat]
        familiar.abilities = [];
        familiar.abilities.push({ "ability": contractfamiliar.rability, "abilitydesc": contractfamiliar.rabilitydesc })
        familiar.rarity = contractrarity
        familiar.traits = contractfamiliar.traits
        familiar.traits.push(familiarpersonalitytraits[Math.floor(Math.random() * familiarpersonalitytraits.length)])
        let healthminmax = contractfamiliar.health.split("-")
        familiar.health = Math.floor(Math.random() * (healthminmax[1] - healthminmax[0]) + healthminmax[0])
        devData.nextFamiliarId++;
        functions.setObject("devData", devData)
        user.familiar = familiar
        functions.setObject("familiarData", familiar)
        functions.replyMessage(message, "You have successfully contracted a "+familiarraritynumbers[familiar.rarity] + " "+ familiar.name + " ("+familiar.element+")!")
    }
}
function checkfamiliarxp(familiar) {
    return 20*(familiar.level*familiar.level)
}