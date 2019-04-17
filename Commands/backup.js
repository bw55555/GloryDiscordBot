var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  functions.replyMessage(message, "Backing up data...")
  fs.mkdirSync(ts)
  fs.writeFileSync('AutoBackup/' + ts + '/userData.json', JSON.stringify(userData, null, 4))//.then(sendMessage(message.channel,"userData backed up!"))
  fs.writeFileSync('AutoBackup/' + ts + '/itemData.json', JSON.stringify(itemData, null, 4))//.then(sendMessage(message.channel,"itemData backed up!"))
  fs.writeFileSync('AutoBackup/' + ts + '/mobData.json', JSON.stringify(mobData, null, 4))//.then(sendMessage(message.channel,"mobData backed up!"))
  fs.writeFileSync('AutoBackup/' + ts + '/guildData.json', JSON.stringify(guildData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/' + ts + '/serverData.json', JSON.stringify(serverData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/' + ts + '/devData.json', JSON.stringify(devData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('AutoBackup/' + ts + '/questData.json', JSON.stringify(questData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  functions.replyMessage(message, "Data backed up!")
  functions.logCommand(message)
}