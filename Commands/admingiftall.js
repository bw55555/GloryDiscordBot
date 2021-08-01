
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    if (words.length < 3) {
        functions.sendMessage(message.channel, "Syntax: !admingiftall attribute value");
        return user;
    }
    let amount = parseInt(words[2]);
    if (isNaN(amount)) { return functions.replyMessage(message, "This amount is not defined!") }
    let attribute = words[1];
    if (attribute == "_id") { return functions.replyMessage(message, "This is not allowed, don't break my bot") }
    //console.log(attribute)
    if (attribute == undefined) { return functions.replyMessage(message, "This attribute is not defined!") }
    let obj = functions.JSONoperate(user, attribute, "get")
    if (obj == undefined) { return functions.replyMessage(message, "This selection is not defined!") }
    if (typeof obj != "number") { return functions.replyMessage(message, "This selection is not a number!") }
    let toSet = { "$inc": {} }
    toSet["$inc"][attribute] = amount
    functions.setProp("userData", {}, toSet)
    functions.replyMessage(message, "Gave everyone "+amount +" "+ attribute +"!")
    return user
}