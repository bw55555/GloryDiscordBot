var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  //if (admins.indexOf(id)==-1){return}
    if (userData[id].phoenixfeather==0){
        functions.replyMessage(message, "You have no Phoenix Feathers!");

        return
    }
  if (words.length == 1) {
    if (userData[id].dead === false) {
      functions.replyMessage(message, "You're not dead. Why do you need to rez?");
      return;
    }
    //userData[id].xp = 0;
    userData[id].currenthealth = userData[id].health;
    userData[id].dead = false;
    //userData[id].shield = ts + 60000
    functions.replyMessage(message, "You have used a Phoenixfeather and rezzed yourself!");
	userData[id].phoenixfeather-=1
  }
}