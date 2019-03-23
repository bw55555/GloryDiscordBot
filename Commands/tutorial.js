var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.sendMessage(message.channel, "The tutorial can be found at https://1drv.ms/w/s!AoBnNmSCqpWMaiCEqZmE6ecm2PQ")
}