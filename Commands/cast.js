var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
  let id = message.author.id;
  let words = message.content.trim().split(/\s+/)
  let spellID = parseInt(words[1])

  if (spellID == undefined || spellID == null)
  {
    functions.sendMessage(message.channel, "Please specify which spell you want to cast! If you don't know the ID, check !spells")
  }
  if (spellID >= 1000 && spellID <= 1005)
  {
    if (userData[id].spells[spellID - 1000] == 0)
    {
      functions.sendMessage(message.channel, "You do not have this spell. Brew one up at the witchery or continue on your quests to unlock more spells!")
    }
    else
    {
      userData[id].spells[spellID - 1000]--;

    }

  }
}

/*
  let x = 0;
  for (x in userData)
  {
      userData[x].spellcraft = 0;
      userData[x].casting = 0;
      userData[x].spells = [0,0,0,0,0];
      userData[x].spellLevel = [0,0,0,0,0];
  }
 */