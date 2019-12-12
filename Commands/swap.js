var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].triangleid == 11) {
    userData[id].triangleid = 311;
    userData[id].trianglemod = 1.4; //This top part turns you into a bloodweaver, setting the mod to 1.7
    functions.replyMessage(message, 'You are now a Bloodweaver! You sacrifice life to deal more damage!');
  }
  else if (userData[id].triangleid == 311) {
    userData[id].triangleid = 11;
    userData[id].trianglemod = 1.4;//turns you into a lifeweaver, setting the mod to 1.4
    functions.replyMessage(message, 'You are now a Lifeweaver! Steal some of your opponent\'s life whenever you damage them!');
  }
}