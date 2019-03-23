var functions = require("../Utils/functions.js")
var backup=require("./backup.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  if (admins.indexOf(id) == -1) { return }
    //functions.logCommand(message)
  fs.writeFileSync('Storage/userData.json', JSON.stringify(userData, null, 4))//.then(sendMessage(message.channel,"userData backed up!"))
  fs.writeFileSync('Storage/itemData.json', JSON.stringify(itemData, null, 4))//.then(sendMessage(message.channel,"itemData backed up!"))
  fs.writeFileSync('Storage/mobData.json', JSON.stringify(mobData, null, 4))//.then(sendMessage(message.channel,"mobData backed up!"))
  fs.writeFileSync('Storage/guildData.json', JSON.stringify(guildData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('Storage/serverData.json', JSON.stringify(serverData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('Storage/devData.json', JSON.stringify(devData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('Storage/skillData.json', JSON.stringify(skillData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  fs.writeFileSync('Storage/questData.json', JSON.stringify(questData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
  backup(message)
  message.reply('GLORY is shutting down...').then(function (session) {
      bot.destroy().then(function (destruct) {
          setTimeout(function () {
              process.exit(2)
          }, 2000)
      })
  }).catch(function (err) { console.error(err) })
}