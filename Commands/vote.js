
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.sendMessage(message.channel, {
        "embed": {
            "description": "Vote for the bot by clicking [here!](https://top.gg/bot/542757501179789322/vote) ",
            "color": 5251510,
            "timestamp": "2019-01-23T21:42:00.210Z",
            "footer": {
                "icon_url": "https://i.imgur.com/NI4HDRs.jpg",
                "text": "Made by Nix#6340 and bw55555#5977"
            },
            "image": {
                "url": "https://i.imgur.com/RfbvLJg.jpg"
            },
            "author": {
                "name": "Glory - An Discord RPG Bot",
                "url": "https://top.gg/bot/542757501179789322",
                "icon_url": "https://imgur.com/afYUwxM.jpg"
            }
        }
    });
}