
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.sendMessage(message.channel, {
        embed: {
            /*thumbnail: {
              "url": "https://i.imgur.com/Hdprtma.jpg"
            },*/
            title: "Your Location",
            color: 0xF1C40F,
            fields: [
                {
                    name: "Location",
                    value: user.location,
                    inline: true
                }
            ]
        }
    });
}