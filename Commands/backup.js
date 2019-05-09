var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  functions.replyMessage(message, "Backing up data...")
  fs.mkdirSync('AutoBackup/'+ts)
  functions.writeData('AutoBackup/' + ts)
  functions.replyMessage(message, "Data backed up!")
  functions.logCommand(message)
}