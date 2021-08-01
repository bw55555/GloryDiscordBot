
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    if (words.length < 4) {
        functions.sendMessage(message.channel, "Syntax: !adminadd user attribute value");
        return user;
    }
    let amount = words[2];
    if (amount == undefined) { return functions.replyMessage(message, "This amount is not defined!") }
    amount = amount.replace(/\_/g, " ")
    if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
    if (amount == "true") { amount = true; }
    if (amount == "false") { amount = false; }
    if (amount == "undefined") { amount = undefined; }
    let attribute = words[1];
    if (attribute == "_id") { return functions.replyMessage(message, "This is not allowed, don't break my bot") }
    //console.log(attribute)
    if (attribute == undefined) { return functions.replyMessage(message, "This attribute is not defined!") }
    let obj = functions.JSONoperate(user, attribute, "get")
    if (obj == undefined) { return functions.replyMessage(message, "This selection is not defined!") }
    if (typeof obj == "object") { return functions.replyMessage(message, "This selection is an object!") }
    let toSet = { "$set": {} }
    toSet["$set"][attribute] = amount
    functions.JSONoperate(user, attribute, "set", amount)
    functions.setProp("userData", {}, toSet)
    functions.replyMessage(message, "Everyone's " + attribute + " was set to " + amount)
    return user
}