
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Choose an id!")
        return
    }

    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return;}
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item == false) {
            functions.replyMessage(message, "This item does not exist!")
            return
        }
        functions.sendMessage(message.channel, functions.generateWeaponTemplate(user, item, 1, 1))
    })
}