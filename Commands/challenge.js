var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let challenged = 0;
  let words = message.content.trim().split(/\s+/)
     if (words.length < 2) {
        return functions.replyMessage(message, "Please specify a user to challenge.")
     }
     words.splice(0, 1)
     if (words[0].startsWith("<@") && words[0].endsWith(">")) {
        words[0] = words[0].slice(2, -1)
     }
     if (words[0].startsWith("!")) {
        words[0] = words[0].slice(1)
     }
     if (userData[words[0]] == undefined || !bot.users.has(words[0])) {
        return functions.replyMessage(message, "That is an invalid user.")
     }
     challenged = bot.users.get(words[0])
     duel.opponent = challenged;
     functions.sendMessage(message.channel, "You have challenged " + challenged + " to a duel!")
 
}