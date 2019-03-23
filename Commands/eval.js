var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (devs.indexOf(id) == -1) return;
  let prefix = global.defaultPrefix
  //console.log(message.channel.type)
  if (message.channel.type != "dm" && message.channel.type != "group") {prefix = serverData[message.guild.id].prefix}
  try {
    const code = message.content.slice(prefix.length+5)
    let evaled = eval(code);
    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
    message.channel.send(functions.clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n`+functions.clean(err)+`\n\`\`\``);
  }
} 