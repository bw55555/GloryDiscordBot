var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  functions.sendMessage(message.channel, "Da heck u do dis for?");
}
