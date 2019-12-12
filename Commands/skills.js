var functions = require("../Utils/functions.js")
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  let target = message.author.id;
  let targetname = message.author;
 //return;
// if (admins.indexOf(id) == -1) { return}
/*
Basic Idea is this. Each person stores an ID for all the skills they have in 
  userData[id].skills
userData[id].skillA = "None";
This stores the ID equipped for skill A
SkillData stores the name, id and description of the skill.
*/

  skillnameA = "No Skill A"
  skillnameB = "No Skill B"
  skillnameC = "No Skill C"

  skilltextA = "None"
  skilltextB = "None"
  skilltextC = "None"

  if (userData[id].skillA != 'None') {
    skillnameA = skillData[userData[id].skillA].name;
    skilltextA = skillData[userData[id].skillA].description;
  }
  if (userData[id].skillB != 'None') {
    skillnameB = skillData[userData[id].skillB].name;
    skilltextB = skillData[userData[id].skillB].description;
  }
  if (userData[id].skillC != 'None') {
    skillnameC = skillData[userData[id].skillC].name;
    skilltextC = skillData[userData[id].skillC].description;
  }

  functions.sendMessage(message.channel, {
    embed: {
      color: 0x008080,
      /*thumbnail: {
        "url": "https://i.imgur.com/r39nI8f.jpg"
      },*/
      fields: [
        {
          name: skillnameA,
          value: skilltextA,
          inline: true
        }, {
          name: skillnameB,
          value: skilltextB,
          inline: true
        }, {
          name: skillnameC,
          value: skilltextC,
          inline: true
        }
      ]
    }
  });
}