var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if(id == "290980432382787585" && userData[id].explosion == 0){
    functions.sendMessage(message.channel, "https://tenor.com/view/explosion-gif-9488133")
    let count = 0
    let text = ""
    for (var i in userData) {
      if (talkedRecently.has(i) && i != id) {
        if (userData[id].dead == true) {continue}
        count ++;
        let blast = (Math.floor(Math.random() * 1500)+2000);
        let trueblast = Math.floor(blast - userData[i].defense);
        text+="<@" + i + "> was caught in the explosion and took " + trueblast + " damage!\n"
        functions.dmUser(i,"https://tenor.com/view/explosion-gif-9488133 \nYou were caught in <@" + id + ">\'s explosion and took " + trueblast + " damage!")
        let stolen = Math.floor(userData[i].money / 5)
        text+='<@' + i + '> was Meme-Maged for $' + stolen + '!\n';
      }
      if (text.length > 1800) {
          functions.sendMessage(message.channel, text)
          text=""
      }
    }
    functions.sendMessage(message.channel, text+"You've Meme-Maged " + count + " people!")
    return;
  }
  if (userData[id].dead == true) { return functions.replyMessage(message, "You can't explode something while dead!") }
  if (userData[id].shield > ts) { return functions.replyMessage(message, "You can't explode something while shielded!") }
  if (userData[id].explosion == 0) {
    functions.replyMessage(message, "You have no explosions! Go buy one from the `!blacksmith`")
  }
  if (userData[id].explosion > 0) {
    userData[id].explosion -= 1;
    functions.sendMessage(message.channel, "https://tenor.com/view/explosion-gif-9488133")
    let count = 0
    let text = ""
    for (var i in userData) {
      if (talkedRecently.has(i) && i != id) {
        if (userData[id].dead == true) {continue}
        count ++;
        let blast = (Math.floor(Math.random() * 1500));
        //let blast = 0;
        let trueblast = Math.floor(blast - userData[i].defense);
        text+="<@" + i + "> was caught in the explosion and took " + trueblast + " damage!\n"
        userData[i].currenthealth -= trueblast
        functions.dmUser(i,"https://tenor.com/view/explosion-gif-9488133 \nYou were caught in <@" + id + ">\'s explosion and took " + trueblast + " damage!")
        if (userData[i].currenthealth <= 0) {
          userData[i].dead = true;
          userData[i].currenthealth = 0;
          let stolen = Math.floor(userData[i].money / 5)
          userData[i].money -= stolen;
          userData[id].money += stolen;
          text+='<@' + i + '> was Meme-Maged for $' + stolen + '!\n';
        }
      }
      if (text.length > 1800) {
          functions.sendMessage(message.channel, text)
          text=""
      }
    }
    functions.sendMessage(message.channel, text+"You've Meme-Maged " + count + " people!")
  }
}
