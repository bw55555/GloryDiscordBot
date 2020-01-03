var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (devs.indexOf(id) == -1) return;
  let prefix = global.defaultPrefix
  //console.log(message.channel.type)
  if (message.channel.type != "dm" && message.channel.type != "group") {prefix = serverData[message.guild.id].prefix}
  try {
      let code = message.content.slice(prefix.length + 5)
      
      let braceindex = code.lastIndexOf("}")
      if (braceindex == code.length - 1) {
          code += ";"
      }
      let colonindex = code.lastIndexOf(";")
      let ret = code.slice(colonindex + 1)
      if (!ret.trim().startsWith("return ")) { ret = "return " + ret }
      code = code.slice(0,colonindex+1)+ret
      //let evaled = eval(code);
      let evaled = eval('(message) => {' + code + '}')(message);
      if (typeof evaled.then == "function") {
          evaled.then(ret => {
              if (typeof ret !== "string") ret = require("util").inspect(ret);
              message.channel.send(functions.clean(ret), { code: "xl" });
          })
      }
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      message.channel.send(functions.clean(evaled), { code: "xl" });
  } catch (err) {
    message.channel.send(`\`ERROR\` \`\`\`xl\n`+functions.clean(err)+`\n\`\`\``);
  }
} 