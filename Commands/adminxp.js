var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id)==-1){return}
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        var amount = parseInt(words[2]);
        if (amount > 0) {
            functions.sendMessage(message.channel, 'Sent ' + amount + ' xp to <@' + target._id + ">");
            target.xp += amount;
        } else {
            functions.sendMessage(message.channel, 'Incorrect Argument');
        }
        functions.logCommand(message)
        functions.setUser(target)
        return;
    });
}