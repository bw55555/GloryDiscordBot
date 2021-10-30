
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (words.length < 5) {
        functions.sendMessage(message.channel, "Syntax: !dataset collection id attribute value");
        return user;
    }
    let coll = words[1];
    let setId = words[2];
    if (allowedcollections.indexOf(coll) == -1) { return }
    let options = functions.extractOptions(message, false, ["-isNumber"])
    if (options.isNumber != undefined) { setId = parseInt(setId); if (isNaN(setId)) { return functions.replyMessage(message, "The id must be a number to use the -isNumber option!") } }

    return functions.getObject(coll, setId).then(target => {
        if (target == false) { return functions.replyMessage(message, "This data does not exist!"); }
        let attribute = words[3];
        if (attribute == "_id" && devs.indexOf(id) == -1) { return functions.replyMessage(message, "This is not allowed, don't break my bot") }
        //console.log(attribute)
        if (attribute == undefined) { return functions.sendMessage(message.channel, "```\n" + JSON.stringify(target, null, 4) + "```"); }
        functions.sendMessage(message.channel, "```\n" + JSON.stringify(functions.JSONoperate(target, attribute, "get"), null, 4) + "```");
        functions.logCommand(message)
        return user
    })
}