var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;

    if (devs.indexOf(id) == -1) {return}
    functions.sendMessage(message.channel, {
        embed: {
            title: "Floorattack ",
            color: 0xF1C40F,
            fields: [{
                name: "Name",
                value: user.username,
                inline: true
            },
                {
                    name: "Level",
                    value: user.floorlevel,
                    inline: true
                }]
        }
    });

}
