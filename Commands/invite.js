
module.exports = async function (message, user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.sendMessage(message.channel, {
    "embed": {
          "description": "Invite the bot to your server by clicking [here!](https://discord.com/api/oauth2/authorize?client_id=542757501179789322&permissions=277025392704&scope=bot) ",
      "color": 5251510,
      "timestamp": "2019-01-23T21:42:00.210Z",
      "footer": {
        "icon_url": "https://i.imgur.com/NI4HDRs.jpg",
        "text": "Made by Nix#6340 and bw55555#5977"
      },
      "image": {
        "url": "https://i.imgur.com/PvgaUH6.png"
      },
      "author": {
        "name": "Glory - An Discord RPG Bot",
          "url": "https://top.gg/bot/542757501179789322",
        "icon_url": "https://imgur.com/afYUwxM.jpg"
      }
    }
  });
}