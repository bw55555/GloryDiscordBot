
module.exports = async function (message, user) {

    let id = message.author.id;
    if (user.status == 0) { return; }
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (words.length != 2) {
        functions.replyMessage(message, "`buy [weaponid]`")
        return
    }
    if (isNaN(words[1])) {
        functions.replyMessage(message, "Choose a real weapon id.")
        return;
    }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item.price == undefined) {
            functions.replyMessage(message, "This item is not for sale.")
            return
        } else if (user.money < item.price) {
            functions.replyMessage(message, "You don't have enough money to buy this item.")
            return
        }
        user.money -= parseInt(item.price)
        return Promise.all([functions.getUser(item.owner)]).then(ret => {
            let previousOwner = ret[0];
            if (previousOwner != false && previousOwner._id != user._id) { 
                previousOwner.money += parseInt(item.price); 
                functions.setUser(previousOwner); 
                functions.dmUser(previousOwner, "<@" + user._id + "> bought " + item.name + " (" + item._id + ") for $" + item.price)
            }
            if (previousOwner != false && previousOwner._id == user._id) {
                user.money += parseInt(item.price);
            }
            item.owner = user._id //weapon ownerid transfer
            functions.sendMessage(message.channel, "You bought " + item._id + " for $" + item.price)
            delete item.price;
            functions.setItem(item)
        })
    })
}