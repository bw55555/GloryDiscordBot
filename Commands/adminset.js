var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user}
    if (words.length < 4) {
        functions.sendMessage(message.channel, "Syntax: !adminset user attribute value");
        return user;
    }
    return Promise.all([functions.validate(message)]).then(ret => {
        let target = ret[0];
        if (target == false) { return user; }
        let amount = words[3];
        if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
        let attribute = words[2];
        //console.log(attribute)
        if (target[attribute] == undefined) {
            functions.sendMessage(message.channel, attribute + " is not a defined attribute");
            return user;
        }
        if (typeof target[attribute] == "object") {
            if (words.length > 4) {
                let secondattribute = words[3]
                let amount = parseInt(words[4]);
                if (!isNaN(parseInt(amount))) { amount = parseInt(amount) }
                if (target[attribute][secondattribute] == undefined) {
                    functions.sendMessage(message.channel, attribute + ":" + secondattribute + " is not a defined attribute");
                    return user
                }
                functions.sendMessage(message.channel, 'Set <@' + target + ">\'s " + attribute + ":" + secondattribute + " to " + amount);
                target[attribute][secondattribute] = amount;
                functions.logCommand(message)
                functions.setUser(target)
                return user
            }
            functions.sendMessage(message.channel, attribute + " is an object. Try setting one of its properties.")
            return user;
        }
        functions.sendMessage(message.channel, 'Set <@' + target + ">\'s " + attribute + " to " + amount);
        target[attribute] = amount;
        functions.setUser(target)
        functions.logCommand(message)
        return user
    })
}