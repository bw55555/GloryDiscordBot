var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (admins.indexOf(id) == -1) { return}
    if (words.length == 1) {
        skillnameA = "No Skill A"
        skilltextA = "Use `!skillA [skill id]` to equip a skill"
        if (userData[id].skillA != "None") {
            skillnameA = skillData[userData[id].skillA].name;
            skilltextA = skillData[userData[id].skillA].description;
            //skilltextA += "\n**Type**: " + skillData[userData[id].skillA].type;
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
                    }
                ]
            }
        });
        return;
    }

    if (words.length == 2) {
        var skillid = words[1]
        if (skillid.toUpperCase() == `NONE`) {
            userData[id].skillA = "None"
            functions.replyMessage(message, "You have removed SkillA!");
        } else {
            if (isNaN(skillid)) { //checks if skill is a number
                functions.replyMessage(message, "The Skill ID must be an integer");
                return;
            }
            if (userData[id].skills[skillid] != skillid) { //checks if you own skill
                functions.replyMessage(message, "You don't own this skill!")
                return;
            }
            if (functions.hasSkill(id, skillid)) {
                functions.replyMessage(message, "You already have this skill equipped!")
                return;
            }
            userData[id].skillA = skillid;
            functions.replyMessage(message, "You equipped the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
        }
    } else {
        functions.sendMessage(message.channel, "Incorrect Argument.\nTry doing `!skillA` if you want to view your current Skill A. Do `!skillA [id]` to equip a skill you own")
    }
}