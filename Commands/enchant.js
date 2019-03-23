var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  if (words[1]==undefined || itemData[words[1]]==undefined || itemData[words[1]]==0) {return functions.replyMessage(message,"That item does not exist!")}
  if (words[2]==undefined || allowedmodifiers.indexOf(words[2])==-1) {return functions.replyMessage(message, "That is not an allowed modifier!")}
  if (isNaN(parseFloat(words[3]))) {return functions.replyMessage(message, "The modifier must be a float!")}
  itemData[words[1]].modifiers[words[2]]=parseFloat(words[3])
  functions.replyMessage(message,"You have successfully enchanted item "+words[1]+" with modifier "+words[2]+" at level "+words[3])
  functions.logCommand(message)
}