var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (admins.indexOf(id) == -1) { return}
    if (words.length == 1) {
        skillnameB = "No Skill B"
        skilltextB = "Use `!skillB [skill id]` to equip a skill"
        if (user.skillB != "None") {
            skillnameB = skillData[user.skillB].name;
            skilltextB = skillData[user.skillB].description;
            //skilltextB += "\n**Type**: " + skillData[user.skillB].type;
        }
        functions.sendMessage(message.channel, {
            embed: {
                color: 0x008080,
                /*thumbnail: {
                  "url": "https://i.imgur.com/r39nI8f.jpg"
                },*/
                fields: [
                    {
                        name: skillnameB,
                        value: skilltextB,
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
            user.skillB = "None"
            functions.replyMessage(message, "You have removed SkillB!");
        } else {
            if (isNaN(skillid)) { //checks if skill is a number
                functions.replyMessage(message, "The Skill ID must be an integer");
                return;
            }
            if (user.skills[skillid] != skillid) { //checks if you own skill
                functions.replyMessage(message, "You don't own this skill!")
                return;
            }
            if (functions.hasSkill(user, skillid)) {
                functions.replyMessage(message, "You already have this skill equipped!")
                return;
            }
            user.skillB = skillid;
            functions.replyMessage(message, "You equipped the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
        }
    } else {
        functions.sendMessage(message.channel, "Incorrect Argument.\nTry doing `!skillB` if you want to view your current Skill B. Do `!skillB [id]` to equip a skill you own")
    }
}