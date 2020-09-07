
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", "world")]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.deleteMessage(message);
            functions.replyMessage(message, "There is no raid right now!");
            return;
        }
        functions.raidAttack(message, user, raid, "world")
        functions.setObject("mobData", raid)
    })
}