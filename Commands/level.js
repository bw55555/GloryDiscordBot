var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        if (words.length == 1) {
            target = user
        }
        let leveltext = target.level;
        let xpleft = (Math.floor((3 * Math.pow((target.level + 1), 2) + 100) * Math.pow(1.5, target.ascension)) - target.xp)
        if (xpleft < 0) {
            xpleft = 0;
        }
        let xptext = "(" + xpleft + " xp until next lvl)"
        if (target.level == 100) {
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
                    value: target.username,
                    inline: true
                },
                {
                    name: "Level",
                    value: leveltext + " " + xptext + "\nAscension: " + target.ascension,
                    inline: true
                }]
            }
        });
    })
}