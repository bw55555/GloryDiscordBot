var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.sendMessage(message.channel, "The tutorial can be found at https://docs.google.com/document/d/1OtNO65uXrREcPiBi8Bn59yYDci4w2hwcSrRrGID5HAY/edit")
}