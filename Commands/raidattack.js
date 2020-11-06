
module.exports = async function (message, user) {
    if (user.location == "city") { return functions.replyMessage(message, "You cannot do this in the city!") }
    return Promise.all([functions.getObject("mobData", user.location)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.deleteMessage(message);
            functions.replyMessage(message, "There is no raid where you are!");
            return;
        }
        functions.raidAttack(message, user, raid, "raid")
        functions.setObject("mobData", raid)
    })
    
}