
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        let attribute = words[2];
        if (attribute == undefined) { return functions.sendMessage(message.channel, "```\n" + JSON.stringify(target, null, 4) + "```"); }
        functions.sendMessage(message.channel, "```\n" + JSON.stringify(functions.JSONoperate(target, attribute, "get"), null, 4) + "```");
        functions.logCommand(message)
    })
}