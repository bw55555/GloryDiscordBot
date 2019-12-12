var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return user }
    return Promise.all([functions.validate(message)]).then(ret => {
        let target = ret[0]
        if (target == false) { return user}
        let rarity = parseInt(words[2])
        if (isNaN(rarity) || rarity < 0 || rarity > 9) { rarity = undefined }
        let arr = functions.generateRandomItem(target, rarity)
        let itemid = arr[1]
        target = arr[0]
        functions.setUser(target)
        functions.sendMessage(message.channel, "<@" + target._id + "> has been given an item with id " + itemid + " and of rarity " + itemData[itemid].rarity)
        functions.logCommand(message)
        return user
    })
}