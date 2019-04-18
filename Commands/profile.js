var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let target = message.author.id;
  let targetname = message.author;
  //console.log(words)
  if (words.length == 1) {
      target = message.author.id;
  } else {
      target = functions.validate(message)
      if (target == false) { return }
  }
  //console.log(words);
  //console.log(userData[target].weapon)
  let weapon = (userData[target].weapon == false) ? "None" : itemData[userData[target].weapon].name + " (" + userData[target].weapon + ")"
  let weaponatk = 0
  let weapondef = 0
  if (userData[target].weapon != false && userData[target].weapon != "None" && userData[target].weapon != undefined && userData[target].weapon < itemData.next) {
    weaponatk = itemData[userData[target].weapon].attack
    weapondef = itemData[userData[target].weapon].defense
  }
  let guildtext = "None";
  if (userData[target].guild != "None") {
    guildtext = userData[target].guildpos + " of " + userData[target].guild;
  }
  let marrytext = userData[target].marry;
  if (userData[target].marry != "None") {
    marrytext = "<@" + userData[target].marry + ">"
    if (userData[userData[target].marry].glory != undefined){
      marrytext += " (" + parseInt(userData[userData[target].marry].glory) + " Glory)"
    }
  }
  let leveltext = userData[target].level;
  let xpleft = (Math.floor((3 * Math.pow((userData[target].level + 1), 2) + 100) * Math.pow(1.5, userData[target].ascension)) - userData[target].xp)
  if (xpleft < 1){
    xpleft = 1;
  }
  let xptext = "(" + xpleft + " xp until next lvl)"
  if (userData[target].level == 100) {
    xptext = "(MAX LEVEL)";
  }
  let nametext = "<@" + target + ">"
  if (userData[target].glory != undefined && userData[target].glory != null && !isNaN(parseInt(userData[target].glory))) {
    nametext +=  " (" + parseInt(userData[target].glory) + " Glory)"
  }
  functions.sendMessage(message.channel, {
    embed: {
      color: 0xF1C40F,
      /*thumbnail: {
        "url": "https://i.imgur.com/r39nI8f.jpg"
      },*/
      fields: [
        {
          name: "Gloryseeker Name",
          value: nametext,
          inline: true
        }, {
          name: "Married to <:weddingring:542186031957540874>",
          value: marrytext,
          inline: true
        }, {
          name: "Guild <:dragonbanner:542171281609457675>",
          value: guildtext,
          inline: true
        }, {
          name: "Class <:class2:543790955199725578>",
          value: userData[target].triangle,
          inline: true
        }, {
          name: "Level <:guildlevel:542188803339845652>",
          value: leveltext + " " + xptext+"\nAscension: "+userData[target].ascension,
          inline: true
        }, {
          name: "Account Balance <:accountbalance:542160800492683295><:materialsgem:542178396474572805>",
          value: userData[target].money + " Money\n" + userData[target].materials + " Materials",
          inline: true
        }, {
          name: "Health <:nixheart:506240330916429837>",
          value: userData[target].currenthealth + ' / ' + userData[target].health,
          inline: true
        }, {
          name: "Attack <:attack:542134564391223321>",
          value: userData[target].attack + " (+" + weaponatk + ")",
          inline: true
        }, {
          name: "Defense <:defence:542134628421468181>",
          value: userData[target].defense + " (+" + weapondef + ")",
          inline: true
        }, {
          name: "Weapon <:weaponicon:542069411817717780>",
          value: weapon,
          inline: true
        }
      ]
    }
  });
}