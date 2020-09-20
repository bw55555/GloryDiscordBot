
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        let leveltext = target.level;
        let xpleft = (functions.checkxp(target) - target.xp)
        if (xpleft < 0) {
            xpleft = 0;
        }
        let xptext = "(" + xpleft + "(" + (1000 - Math.floor(target.xp / functions.checkxp(target) * 1000) / 10)+"%) xp until next lvl)"
        if (target.level == 100) {
            xptext = "(MAX LEVEL +" + (Math.floor(target.xp / functions.checkxp(target) * 1000) / 10) + "%)";
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