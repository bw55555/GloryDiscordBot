
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)

    if (user.dead === true) {
        functions.replyMessage(message, "You're dead. Do !resurrect");
        return;
    }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) {
            return;
        }
        if (target.dead == true) {
            functions.replyMessage(message, "Don't burn corpses... that's just bad taste.");
            return;
        }
        if (target._id == user._id) {
            functions.replyMessage(message, "Please don't set yourself on fire...");
            return;
        }
        functions.sendMessage(message.channel, "https://images-ext-2.discordapp.net/external/dojOhwEHXtz0SHhaypep01Eg3YvXrXAktzGjqybEDvw/https/media.discordapp.net/attachments/557601299663814666/570454010130333696/unknown.gif")
        functions.sendMessage(message.channel, user.username + " burnt " + target.username + "!");
    });
}
