global.allowedcollections = ["userData", "itemData", "guildData", "auctionData", "dungeonData", "mobData"]
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
    let options = functions.extractOptions(message, false, "-isNumber")
    if (options.isNumber != undefined) { setId = parseInt(setId); if (isNaN(setId)) { return functions.replyMessage(message, "The id must be a number to use the -isNumber option!") } }
    
    return functions.getObject(coll, setId).then(target => {
        if (target == false) { return functions.replyMessage(message, "This data does not exist!"); }
        let amount = words[4];
        if (amount == undefined) { return functions.replyMessage(message, "This amount is not defined!") }
        amount = amount.replace(/\_/g, " ")
        if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
        if (amount == "true") { amount = true; }
        if (amount == "false") { amount = false; }
        if (amount == "undefined") { amount = undefined; }
        let attribute = words[3];
        if (attribute == "_id") { return functions.replyMessage(message, "This is not allowed, don't break my bot") }
        //console.log(attribute)
        if (attribute == undefined) { return functions.replyMessage(message, "This attribute is not defined!") }
        let obj = functions.JSONoperate(target, attribute, "get")
        if (obj == undefined) { return functions.replyMessage(message, "This selection is not defined!") }
        if (typeof obj == "object") { return functions.replyMessage(message, "This selection is an object!") }
        functions.JSONoperate(target, attribute, "set", amount)
        functions.replyMessage(message, "<@" + target._id + ">'s " + attribute + " was set to " + amount)
        functions.setObject(coll, target)
        functions.logCommand(message)
        return user
    })
}