var functions=require("../Utils/functions.js")
module.exports=function(message) {
    functions.raidAttack(message, mobData[message.channel.id], true,false,false)
}