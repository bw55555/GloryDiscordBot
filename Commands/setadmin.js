var functions=require("../Utils/functions.js")
function isFloat(arg) {
  for (var i=0;i<arg.length;i++) {
    if (arg.slice(i,i+1)==".") {continue}
    if (isNaN(parseInt(arg.slice(i,i+1)))) {return false}
  }
  return true
}
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (devs.indexOf(id)==-1){return}
  let target = functions.validate(message)
  if (target == false) {return}
  devData.admins.push(target)
  admins.push(target)
  functions.sendMessage(message.channel, "<@" + target + "> was set as admin")
  functions.logCommand(message)
}