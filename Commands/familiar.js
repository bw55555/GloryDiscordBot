familiarraritynumbers = ["???", "Common", "Rare", "Epic", "Legendary", "Divine"]
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
        gitext += "**Race: **" + familiar.race + "(" + familiar.element + ") (" + familiarraritynumbers[familiar.rarity] + ")\n"
        gitext += "**Level: **" + levelmsg
        let satext = "**health: **" + familiar.health + "\n"
        satext += "**" + familiar.substat + ": **" + familiar[familiar.substat]
        let traitstext = familiar.traits.join(", ")
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
    
}
function checkfamiliarxp(familiar) {
    return 20*(familiar.level*familiar.level)
}