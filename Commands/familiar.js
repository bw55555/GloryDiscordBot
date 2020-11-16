
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
        let levelmsg = user.familiar.level;
        if (levelmsg == 100) { levelmsg += " (MAX LEVEL)" }
        else { levelmsg += " (" + user.familiar.xp + "/" + checkfamiliarxp(user.familiar) + " xp to next level)"}
        return functions.sendMessage(message.channel, {
            "embed": {
                "color": 5251510,
                "title": "Pet Profile",
                "fields": [
                    {
                        "name": "Name",
                        "value": user.familiar.name + "(" + user.familiar.race + ")",
                        "inline": false
                    },
                    {
                        "name": "Level",
                        "value": levelmsg,
                        "inline": true
                    },
                    {
                        "name": "Stats",
                        "value": "Health: " +user.familiar.health,
                        "inline": false
                    },
                    {
                        "name": "Traits",
                        "value": user.familiar.traits.join(", "),
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