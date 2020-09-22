
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (admins.indexOf(id) == -1) { return}
    if (words.length == 1) {
        skillnameC = "No Skill C"
        skilltextC = "Use `!skillC [skill id]` to equip a skill"
        if (user.skillC != "None") {
            skillnameC = skillData[user.skillC].name;
            skilltextC = skillData[user.skillC].description;
            //skilltextC += "\n**Type**: " + skillData[user.skillC].type;
        }
        functions.sendMessage(message.channel, {
            embed: {
                color: 0x008080,
                title: user.username + "'s Skill C" + " (" + skillid + ")",
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

    if (words.length >= 2) {
        words.splice(0, 1);
        var skillid = words.join(" ");
        if (skillid.toUpperCase() == `NONE`) {
            user.skillC = "None"
            functions.replyMessage(message, "You have removed SkillC!");
        } else {
            if (!isNaN(parseInt(skillid))) { skillid = parseInt(skillid) }
            else { skillid = skillData.findIndex(item => item.name == skillid) }
            if (isNaN(skillid)) { //checks if skill is a number
                functions.replyMessage(message, "The argument must be an integer or a skill name");
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
            user.skillC = skillid;
            functions.replyMessage(message, "You equipped the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
        }
    } else {
        functions.sendMessage(message.channel, "Incorrect Argument.\nTry doing `!skillC` if you want to view your current Skill C. Do `!skillC [id]` to equip a skill you own")
    }
}