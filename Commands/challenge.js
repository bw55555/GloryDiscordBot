var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let target = 0;
  let challenged = 0;
  
   if (words.length < 2) {
      return functions.replyMessage(message, "Please specify a user to challenge. If you want to issue an open challenge, use '!challenge any'.")
   }
   words.splice(0, 1)

   if (words[0] == "accept") {         
      if (duel.opponent == undefined) {
          return functions.replyMessage(message, "No challenges are open right now. Start one with '!challenge' followed by your opponent or 'any'!");
      }
      if (duel.challenger == id) {
          return functions.replyMessage(message, "You cannot accept your own challenge!");
      }
      if (duel.opponent == "any" || duel.opponent == id) {
          duel.duelStart = ts;
          functions.sendMessage(message.channel, "The duel begins now!");
      }
   }
   else if (words[0] == "any") {
      if (duel.opponent != undefined && (ts - duel.chalStart) <= 6000) {
           let timeLeft = 0;
           timeLeft = Math.ceil((ts - duel.chalStart)/1000);
           return functions.replyMessage(message, "There is a challenge currently being given. Try again in " + timeLeft + " seconds once the previous challenge expires!");
      }
      challenged = "any";
      duel.opponent = challenged.id;
      duel.challenger = id;
      duel.chalStart = ts;
      functions.sendMessage(message.channel, "You have started an open challenge to duel. Anyone can respond with '!challenge accept'!");
   }
   else {
     target = validate(message);
     if (target == false) {return functions.sendMessage(message.channel, "This is not a valid user!");}
     challenged = target;
     duel.opponent = challenged.id;
     duel.challenger = id;
     duel.chalStart = ts;
     functions.sendMessage(message.channel, "You have challenged " + challenged + " to a duel! Accept this challenge with '!challenge accept'.")
   }
 
}
}
