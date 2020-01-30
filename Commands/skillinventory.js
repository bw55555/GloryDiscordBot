
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)

    let messages = "**Your Skills**\n"
    //let skills = user.skills;
    for (var i in user.skills) {
        //functions.sendMessage(message.channel, "hi");
        messages += skillData[user.skills[i]].name + " (" + skillData[user.skills[i]].id + ")\n";
    }
    //messages += "```"
    if (messages == "**Your Skills**\n") {
        messages = "You have no skills. Get them with skill points";
    }
    functions.sendMessage(message.channel, messages);

}