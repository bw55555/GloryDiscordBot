var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  functions.replyMessage(message, "Backing up data...")
  fs.writeFileSync('AutoBackup/userData.json', JSON.stringify(userData, null, 4))//.then(sendMessage(message.channel,"userData backed up!"))
  fs.writeFileSync('AutoBackup/itemData.json', JSON.stringify(itemData, null, 4))//.then(sendMessage(message.channel,"itemData backed up!"))
  fs.writeFileSync('AutoBackup/mobData.json', JSON.stringify(mobData, null, 4))//.then(sendMessage(message.channel,"mobData backed up!"))
  fs.writeFileSync('AutoBackup/guildData.json', JSON.stringify(guildData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/serverData.json', JSON.stringify(serverData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/devData.json', JSON.stringify(devData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/skillData.json', JSON.stringify(skillData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/questData.json', JSON.stringify(questData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))

  functions.replyMessage(message, "Data backed up!")
  functions.logCommand(message)
}