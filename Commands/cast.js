var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
  let id = message.author.id;
  let words = message.content.trim().split(/\s+/)
  let spellID = parseInt(words[1])
  return functions.replyMessage(message,"This function is under development.")
  if (spellID == undefined || spellID == null)
  {
    functions.sendMessage(message.channel, "Please specify which spell you want to cast! If you don't know the ID, check !spells")
  }
  if (spellID >= 1000 && spellID <= 1005)
  {
    if (user.spells[spellID - 1000] == 0)
    {
      functions.sendMessage(message.channel, "You do not have this spell. Brew one up at the witchery or continue on your quests to unlock more spells!")
    }
    else
    {
      user.spells[spellID - 1000]--;

    }

  }
}