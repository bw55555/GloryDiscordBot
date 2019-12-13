var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user}
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0]
        if (target == false) { return user }
        if (admins.indexOf(target._id) != -1) {
            functions.sendMessage(message.channel, "You cannot adminkill an admin!");
            return user;
        }
        target.currenthealth = 0;
        target.dead = true;
        functions.setUser(target);
        functions.sendMessage(message.channel, "I guess /kill really does exist... <@" + target._id + "> has been killed!");
        functions.logCommand(message)
        return user
    })
}