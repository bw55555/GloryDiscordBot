
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.deleteMessage(message);
            functions.replyMessage(message, "There is no raid right now!");
            return;
        }
        functions.raidAttack(message, user, raid, "raid")
        functions.setObject("mobData", raid)
    })
    
}