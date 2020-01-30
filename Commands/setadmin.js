
function isFloat(arg) {
  for (var i=0;i<arg.length;i++) {
    if (arg.slice(i,i+1)==".") {continue}
    if (isNaN(parseInt(arg.slice(i,i+1)))) {return false}
  }
  return true
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return }
        if (devData.admins.indexOf(target._id) != -1) {return functions.replyMessage(message,"<@"+target._id+"> is already an admin!")}
        admins.push(target._id)
        functions.sendMessage(message.channel, "<@" + target._id + "> was set as admin")
        functions.logCommand(message)
        functions.setObject("devData", devData)
    })
}