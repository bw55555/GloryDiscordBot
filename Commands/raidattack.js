
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.deleteMessage(message);
            functions.replyMessage(message, "There is no raid right now!");
            return;
        }
        if (user.dungeonts != undefined) {
            functions.sendMessage(message.channel, "You cannot do this while in a dungeon!");
            return
        }
        functions.raidAttack(message, user, raid, "raid")
        functions.setObject("mobData", raid)
    })
    
}