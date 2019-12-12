var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (admins.indexOf(id) == -1) { return}
    if (words.length == 1) {
        skillnameC = "No Skill C"
        skilltextC = "Use `!skillC [skill id]` to equip a skill"
        if (userData[id].skillC != "None") {
            skillnameC = skillData[userData[id].skillC].name;
            skilltextC = skillData[userData[id].skillC].description;
            //skilltextC += "\n**Type**: " + skillData[userData[id].skillC].type;
        }
        functions.sendMessage(message.channel, {
            embed: {
                color: 0x008080,
                /*thumbnail: {
                  "url": "https://i.imgur.com/r39nI8f.jpg"
                },*/
                fields: [
                    {
                        name: skillnameC,
                        value: skilltextC,
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
            userData[id].skillC = "None"
            functions.replyMessage(message, "You have removed SkillC!");
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
            userData[id].skillC = skillid;
            functions.replyMessage(message, "You equipped the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
        }
    } else {
        functions.sendMessage(message.channel, "Incorrect Argument.\nTry doing `!skillC` if you want to view your current Skill C. Do `!skillC [id]` to equip a skill you own")
    }
}