
module.exports = async function (message, user) {
    if (user.location == "city" || user.location == "guild") { return functions.replyMessage(message, "You cannot do this in the city!") }
    return Promise.all([functions.getObject("mobData", user.location)]).then(ret => {
        let raid = ret[0]
        if (raid == false) {
            functions.deleteMessage(message);
            functions.replyMessage(message, "There is no raid where you are!");
            return;
        }
        let type = "raid"
        if (user.location == "world" || user.location == "event") { type = user.location}
        functions.raidAttack(message, user, raid, type)
        functions.setObject("mobData", raid)
    })
}