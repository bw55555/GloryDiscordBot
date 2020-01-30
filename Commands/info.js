
module.exports = async function (message, user) {
  functions.sendMessage(message.channel, {
    "embed": {
      "description": "Join the Glory Support server by clicking [here!](https://discord.gg/QsdmhgX) ",
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
        "name": "Glory - A Discord RPG Bot",
        "url": "https://discordapp.com",
        "icon_url": "https://imgur.com/afYUwxM.jpg"
      },
      "fields": [
        {
          "name": "🏹",
          "value": "Level up your character to get the strongest character!"
        },
        {
          "name": "🗡",
          "value": "Fight one another for money and power!"
        },
        {
          "name": "💸",
          "value": "Earn money by working or gamble it away!"
        },
        {
          "name": "🥇",
          "value": "Will you achieve glorious victory...",
          "inline": true
        },
        {
          "name": "😭",
          "value": "...or disastrous defeat?",
          "inline": true
        }
      ]
    }
  });
}