var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  var globalMoney = 0;
  var globalUsers = 0;
  var globalRichest = '';
  var globalRichestId = '';
  var globalRichestMoney = 0;
  var globalRichest2 = '';
  var globalRichestId2 = '';
  var globalRichestMoney2 = 0;
  var globalRichest3 = '';
  var globalRichestId3 = '';
  var globalRichestMoney3 = 0;
  var globalRichest4 = '';
  var globalRichestId4 = '';
  var globalRichestMoney4 = 0;
  for (var i in userData) {//loops through user data to check. //w/o if statement, it checks everyone
    globalMoney += userData[i].money; //adds money to total money
    globalUsers += 1; //checks guilds
    if (userData[i].money > globalRichestMoney) { //checks if user money is greater than richest
      globalRichestMoney4 = globalRichestMoney3;
      globalRichestId4 = globalRichestId3;
      globalRichest4 = globalRichest3;

      globalRichestMoney3 = globalRichestMoney2;
      globalRichestId3 = globalRichestId2;
      globalRichest3 = globalRichest2;

      globalRichestMoney2 = globalRichestMoney;
      globalRichestId2 = globalRichestId;
      globalRichest2 = globalRichest;

      globalRichestMoney = userData[i].money;
      globalRichestId = i;
      globalRichest = userData[i].username;
    }
    else if (userData[i].money > globalRichestMoney2) {
      globalRichestMoney4 = globalRichestMoney3;
      globalRichestId4 = globalRichestId3;
      globalRichest4 = globalRichest3;

      globalRichestMoney3 = globalRichestMoney2;
      globalRichestId3 = globalRichestId2;
      globalRichest3 = globalRichest2;

      globalRichestMoney2 = userData[i].money;
      globalRichestId2 = i;
      globalRichest2 = userData[i].username;
    }
    else if (userData[i].money > globalRichestMoney3) {
      globalRichestMoney4 = globalRichestMoney3;
      globalRichestId4 = globalRichestId3;
      globalRichest4 = globalRichest3;

      globalRichestMoney3 = userData[i].money;
      globalRichestId3 = i;
      globalRichest3 = userData[i].username;
    }
    else if (userData[i].money > globalRichestMoney4) {
      globalRichestMoney4 = userData[i].money;
      globalRichestId4 = i;
      globalRichest4 = userData[i].username;
    }
  }

  for (var i in guildData){
    globalMoney += guildData[i].bank;
  }

  //closes if statements

  functions.sendMessage(message.channel, {
    embed: { //displays guild stats
      title: "GlobalStats",
      color: 0xF1C40F,
      fields: [{ //displays variables
        name: "Total Accounts",
        value: globalUsers,
        inline: true
      },
      {
        name: "Money in Economy",
        value: `$` + globalMoney,
        inline: true
      }, {
        name: "Richest Account",
        value: `**${globalRichest}** with id ${globalRichestId} and **$${globalRichestMoney}**\n` +
          `**${globalRichest2}** with id ${globalRichestId2} and **$${globalRichestMoney2}**\n` +
          `**${globalRichest3}** with id ${globalRichestId3} and **$${globalRichestMoney3}**\n` +
          `**${globalRichest4}** with id ${globalRichestId4} and **$${globalRichestMoney4}**\n` //displays richest person.
      }
      ]
    }
  });
}