var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        textmessage = "<@" + target._id + "> has " + target.currenthealth + " / " + target.health + " Health!"
        functions.sendMessage(message.channel, textmessage);
    })
}