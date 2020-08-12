
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.sendMessage(message.channel, "Choose a skill ID");
        return;
    }
    if (words.length == 2) {
        words.splice(0, 1);
        let skillid = words.join(" ");
        if (!isNaN(parseInt(skillid))) { skillid = parseInt(skillid) }
        else { skillid = skillData.findIndex(item => item.name == skillid) }
        if (isNaN(skillid)) {
            functions.sendMessage(message.channel, "Please type an integer skill ID");
            return;
        }
        if (skillid < 0 || skillid >= skillData.length){
            functions.sendMessage(message.channel, "Please select an existing skill ID");
            return;
        }
        if (skillid == undefined){
            return;
        }
        skillnameA = skillData[skillid].name
        skilltextA = skillData[skillid].description
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
    else {
        return;
    }
}