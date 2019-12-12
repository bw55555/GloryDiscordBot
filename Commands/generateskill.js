var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)

    if (admins.indexOf(id) == -1) {//Soo nobody but admins can use it (for now)
        functions.replyMessage(message, "This feature is still being developed.");
        return
    }

    //!generateskill id, name, description
    if (words.length < 4) {
        functions.replyMessage(message, "!generateskill [skillid] [name] [description]");
        return
    }
    var skillid = parseInt(words[1])
    if (isNaN(skillid)) {
        functions.sendMessage(message.channel, "The Skill ID must be an integer");
        return;
    }
    let name = (words[2]);
    let description = message.content.slice(message.content.indexOf(words[3]));
    if (description == "" || description == "None") {
        functions.sendMessage(message.channel, "The description cannot be blank!")
        return;
    }

    skill = { "name": name, "id": skillid, "description": description }
    skillData[skillid] = skill;
    functions.replyMessage(message, "You created the skill " + name + " (" + skillid + ")!\nIt's effect is: `" + description + "`");
    fs.writeFileSync('Assets/skillData.json', JSON.stringify(skillData, null, 4))//.then(sendMessage(message.channel,"guildData backed up!"))
}