var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  //return functions.replyMessage(message,"This will be here later...")
  let text=""
	if (userData[id].lastDaily == moment().format('L')){
text += '**Next Daily:** ' + moment().endOf('day').fromNow() + "\n"
}
  let cooldowns=Object.keys(userData[id].cooldowns)
  for (var i=0;i<cooldowns.length;i++) {
     if (functions.calcTime(userData[id].cooldowns[cooldowns[i]],ts)<0) {continue}
     text+="**"+cooldowns[i]+"**: "+functions.displayTime(userData[id].cooldowns[cooldowns[i]],ts)+"\n"
  }
  //text+="```"
if (text == ""){
	text = "You have no ongoing cooldowns."
}
      functions.sendMessage(message.channel, {
      "embed": {
        //"title": userData[id].username + "'s Cooldowns",
        //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
        "color": 13498074,

        "fields": [
          {
            "name": userData[id].username + "'s Cooldowns",
            "value": text
            //"inline": true
          }
        ]
      }
    })
}
