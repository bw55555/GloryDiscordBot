
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    if (words.length < 4) {
        functions.sendMessage(message.channel, "Syntax: !adminadd user attribute value");
        return user;
    }
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        let amount = words[3];
        if (amount == undefined) { return functions.replyMessage(message, "This amount is not defined!") }
        amount = amount.replace(/\_/g, " ")
        if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
        if (amount == "true") { amount = true; }
        if (amount == "false") { amount = false; }
        if (amount == "undefined") { amount = undefined; }
        let attribute = words[2];
        if (attribute == "_id") { return functions.replyMessage(message, "This is not allowed, don't break my bot") }
        //console.log(attribute)
        if (attribute == undefined) { return functions.replyMessage(message, "This attribute is not defined!") }
        let obj = functions.JSONoperate(target, attribute, "get")
        if (obj == undefined) { return functions.replyMessage(message, "This selection is not defined!") }
        if (typeof obj != "number") { return functions.replyMessage(message, "This selection is not a number!") }
        functions.JSONoperate(target, attribute, "add", amount)
        functions.replyMessage(message, "Added " + amount + " to <@" + target._id + ">'s " + attribute)
        functions.setUser(target)
        functions.logCommand(message)
        return user
    })
}