
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.findUsers({}, { "triangleid": 1 }).then(arr => {
        var NoClass = 0;
        var Archers = 0;
        var Mages = 0;
        var Warriors = 0;
        var Assassins = 0;
        var Merchants = 0;
        var Healers = 0;
        var Oracles = 0;
        var LWeavers = 0;
        var BWeavers = 0;
        var Berserkers = 0;
        var Paladins = 0;
        var totalclasses = 0;
        for (var i = 0; i < arr.length;i++) {//loops through user data to check. //w/o if statement, it checks everyone
            let triangle = arr[i].triangleid; //adds money to total money
            if (triangle == 0) { NoClass +=1}
            else if (triangle == 1) { Archers += 1 }
            else if (triangle == 2) { Mages += 1 }
            else if (triangle == 3) { Warriors += 1 }
            else if (triangle % 30 == 4) { Assassins += 1 }
            else if (triangle % 30 == 7) { Merchants += 1 }
            else if (triangle % 30 == 5) { Healers += 1 }
            else if (triangle % 30 == 8) { Oracles += 1 }
            else if (triangle % 30 == 11) { LWeavers += 1 }
            else if (triangle % 30 == 14) { BWeavers += 1 }
            else if (triangle % 30 == 6) { Berserkers += 1 }
            else if (triangle % 30 == 9) { Paladins += 1 }
            totalclasses += 1;
        }
        //closes if statements

        functions.sendMessage(message.channel, {
            embed: { //displays guild stats
                title: "Class Stats",
                color: 0xF1C40F,
                fields: [{ //displays variables
                    name: "Total Accounts",
                    value: totalclasses
                },
                {
                    name: "Richest Account",
                    value:
                        "No Class: " + NoClass + "\n" +
                        "Archers: " + Archers + "\n" +
                        "Mages: " + Mages + "\n" +
                        "Warriors: " + Warriors + "\n" +
                        "Assassins: " + Assassins + "\n" +
                        "Merchants: " + Merchants + "\n" +
                        "Healers: " + Healers + "\n" +
                        "Oracles: " + Oracles + "\n" +
                        "Weavers (L/B): " + LWeavers + "/" + BWeavers + "\n" +
                        "Berserkers: " + Berserkers + "\n" +
                        "Paladins: " + Paladins + "\n"
                }
                ]
            }
        });
    })
}