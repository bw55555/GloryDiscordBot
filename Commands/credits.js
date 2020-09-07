
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.sendMessage(message.channel, {
        "embed": {
            "description": "This wouldn't be possible without the Glory Moderator team, whom have helped us every step of the way.",
            "color": 16712680,
            /*"timestamp": "2019-01-23T21:42:00.210Z",*/
            "footer": {
                "icon_url": "https://i.imgur.com/NI4HDRs.jpg",
                "text": "Join the Glory Support server at `https://discord.gg/QsdmhgX` "
            },
            "image": {
                "url": "https://i.imgur.com/RfbvLJg.jpg"
            },/*
      "author": {
        "name": "Glory - An Discord RPG Bot",
        "url": "https://discordapp.com",
        "icon_url": "https://imgur.com/afYUwxM.jpg"
      },*/
            "fields": [
                {
                    "name": "Developers",
                    "value": "Nix#6340 (Kinda just here)\nbw55555#5977 (Hosting and Digitechnics)\nDosei#4141 (Backing Up and Doublehosting)\n3628800#4251 (Artwork and Probability and Crashing Things)\nRazoreign#6576 (Just ignore me)\nSpooky#0001 (Database and Network Troubleshooting))"
                },
                {
                    "name": "Administrators",
                    "value": "Pheenix#7022 \nReaper#6365 \nSlay#0622"
                },
                {
                    "name": "Other Helpful People",
                    "value": "Death Angel#6488 (Emojis)\nAngelic Wolf#2240 (Emojis)\nJashan#0001 (Thanks for the Coffee)"
                }
            ]
        }
    });
}