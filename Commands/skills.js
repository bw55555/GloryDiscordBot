
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let target = message.author.id;
    let targetname = message.author;
    let fields = [];
    let command = words[1];
    if (command == undefined) { command = "LIST" }
    command = command.toUpperCase();
    if (words.length >= 2) {
        words.splice(0, 2)
    }
    if (command == "LIST") {
        let fields = [];
        for (var i in user.equippedSkills) {
            let skillname = "No Skill " + i
            let skilltext = "None"
            if (user.equippedSkills[i] != "None") {
                skillname = skillData[user.equippedSkills[i]].name
                skilltext = skillData[user.equippedSkills[i]].description
            }
            fields.push({
                name: skillname,
                value: skilltext
            })
        }
        functions.sendMessage(message.channel, {
            embed: {
                color: 0x008080,
                title: user.username + "'s Skills",
                /*thumbnail: {
                  "url": "https://i.imgur.com/r39nI8f.jpg"
                },*/
                fields: fields
            }
        });
    }
    else if (command == "A" || command == "B" || command == "C" || user.equippedSkills[command] != undefined) {
        let i = command
        var skillid = words.join(" ");
        if (words.length == 0) {
            let skillname = "No Skill " + i
            let skilltext = "Use `!skill equip " + i + " [skill id]` to equip a skill"
            if (user.equippedSkills[i] != "None") {
                skillname = skillData[user.equippedSkills[i]].name
                skilltext = skillData[user.equippedSkills[i]].description
            }
            functions.sendMessage(message.channel, {
                embed: {
                    color: 0x008080,
                    title: user.username + "'s Skill " +i+ " (" + user.equippedSkills[i] + ")",
                    /*thumbnail: {
                      "url": "https://i.imgur.com/r39nI8f.jpg"
                    },*/
                    fields: [
                        {
                            name: skillname,
                            value: skilltext,
                            inline: true
                        }
                    ]
                }
            });
        } else {
            if (skillid.toUpperCase() == `NONE`) {
                user.equippedSkills[i] = "None"
                functions.replyMessage(message, "You have removed Skill "+i+"!");
            } else {
                if (!isNaN(parseInt(skillid))) { skillid = parseInt(skillid) }
                else { skillid = skillData.findIndex(item => item.name == skillid) }
                if (isNaN(skillid)) { //checks if skill is a number
                    functions.replyMessage(message, "The argument must be an integer or a skill name!");
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
                user.equippedSkills[i] = skillid;
                functions.replyMessage(message, "You equipped the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
            }
        }
    } else if (command == "INFO") {
        if (words.length == 0) {
            functions.sendMessage(message.channel, "Choose a skill ID");
            return;
        }
        let skillid = words.join(" ").toLowerCase();
        if (skillid == "all") {
            functions.Createlist(message, user, skillData, "All Skills", (x) => x.name + " ("+x.id+")", (x) => x.description)

        } else {
            if (!isNaN(parseInt(skillid))) { skillid = parseInt(skillid) }
            else { skillid = skillData.findIndex(item => item.name.toLowerCase() == skillid) }
            if (isNaN(skillid)) {
                functions.sendMessage(message.channel, "Please type an integer skill ID");
                return;
            }
            if (skillid < 0 || skillid >= skillData.length) {
                functions.sendMessage(message.channel, "Please select an existing skill ID");
                return;
            }
            if (skillid == undefined) {
                return;
            }
            skillname = skillData[skillid].name
            skilltext = skillData[skillid].description
            functions.sendMessage(message.channel, {
                embed: {
                    color: 0x008080,
                    title: "Skill Info" + " (" + skillid + ")",
                    /*thumbnail: {
                        "url": "https://i.imgur.com/r39nI8f.jpg"
                    },*/
                    fields: [
                        {
                            name: skillname,
                            value: skilltext,
                            inline: true
                        }
                    ]
                }
            });
        }
    } else if (command == "I" || command == "INV" || command == "INVENTORY") {
        let text = "**Your Skills**\n"
        //let skills = user.skills;
        for (var i in user.skills) {
            //functions.sendMessage(message.channel, "hi");
            text += skillData[user.skills[i]].name + " (" + skillData[user.skills[i]].id + ")\n";
        }
        //messages += "```"
        if (text == "**Your Skills**\n") {
            text = "You have no skills. Get them with skill points";
        }
        functions.sendMessage(message.channel, text);
    }
}