
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.sendMessage(message.channel, {
        embed: {
            /*thumbnail: {
              "url": "https://i.imgur.com/Hdprtma.jpg"
            },*/
            title: "Your Money",
            color: 0xF1C40F,
            fields: [
                {
                    name: "Account Holder",
                    value: message.author.username,
                    inline: true
                },
                {
                    name: "Account Balance",
                    value: user.money,
                    inline: true
                },
                {
                    name: "Material Balance",
                    value: user.materials,
                    inline: true
                },
                {
                    name: "Honor Balance",
                    value: user.honor,
                    inline: true
                }
            ]
        }
    });
}