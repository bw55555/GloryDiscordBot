var functions = require("../Utils/functions.js")
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
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
  for (var i in userData) {//loops through user data to check. //w/o if statement, it checks everyone
    let triangle = userData[i].triangleid; //adds money to total money
    if (triangle == 1) { Archers += 1 }
    else if (triangle == 2) { Mages += 1 }
    else if (triangle == 3) { Warriors += 1 }
    else if (triangle == 4) { Assassins += 1 }
    else if (triangle == 7) { Merchants += 1 }
    else if (triangle == 5) { Healers += 1 }
    else if (triangle == 8) { Oracles += 1 }
    else if (triangle == 11) { LWeavers += 1 }
    else if (triangle == 311) { BWeavers += 1 }
    else if (triangle == 6) { Berserkers += 1 }
    else if (triangle == 9) { Paladins += 1 }
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
}