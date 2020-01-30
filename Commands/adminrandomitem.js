
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0]
        if (target == false) { return user}
        let rarity = parseInt(words[2])
        if (isNaN(rarity) || rarity < 0 || rarity > 9) { rarity = undefined }
        let item = functions.generateRandomItem(target, rarity)
        functions.setUser(target)
        functions.sendMessage(message.channel, "<@" + target._id + "> has been given an item with id " + item._id + " and of rarity " + item.rarity)
        functions.logCommand(message)
        return user
    })
}