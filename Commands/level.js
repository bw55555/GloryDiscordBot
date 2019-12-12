var functions=require("../Utils/functions.js")
module.exports = function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let target = id;
    if (words.length > 1) {
        target = functions.validate(message)
        if (target == false) { return; }
    }
    let leveltext = userData[target].level;
    let xpleft = (Math.floor((3 * Math.pow((userData[target].level + 1), 2) + 100) * Math.pow(1.5, userData[target].ascension)) - userData[target].xp)
    if (xpleft < 0){
        xpleft = 0;
      }
      let xptext = "(" + xpleft + " xp until next lvl)"
    if (userData[target].level == 100) {
        xptext = "(MAX LEVEL)";
    }
    functions.sendMessage(message.channel, {
        embed: {
            /*thumbnail: {
              "url": "https://i.imgur.com/Hdprtma.jpg"
            },*/
            title: "Your Experience",
            color: 0xF1C40F,
            fields: [{
                name: "Name",
                value: userData[target].username,
                inline: true
            },
            {
                name: "Level",
                value: leveltext+" "+xptext+"\nAscension: "+userData[target].ascension,
                inline: true
            }]
        }
    });
}