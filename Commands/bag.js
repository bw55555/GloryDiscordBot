let bagItems = Assets.bagItemsData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1] == undefined ? "list" : words[1].toLowerCase()
    if (word2 == "list") {
        let text = "Your bag: \n"
        for (let bagitem in user.bag) {
            itemname = displayBagItem(bagitem)
            text += "**" + itemname + "**: " + user.bag[bagitem] + "\n"
        }
        functions.replyMessage(message, text)
    } else if (word2 == "use") {
        let itemid = words[2];
        let amount = parseInt(words[3])
        if (amount == undefined) { amount = 1 }
        if (itemid == undefined || functions.JSONoperate(bagItems, itemid, "get") == undefined) { return functions.replyMessage(message, "This item does not exist!") }
        if (user.bag[itemid] == undefined) { return functions.replyMessage(message, "You do not have any " + displayBagItem(itemid) + "!") }
        if (isNaN(amount) || amount < 0 || amount > 10000) {return functions.replyMessage(message, "Please specify an amount between 1 and 10000. ")}
        let arr = itemid.split("_")
        let gid = arr[0]
        user.bag[itemid] -= amount;
        if (gid == "g0") {
            let text = "You opened " + amount + " boxes and got:\n"
            text += functions.craftItems(message, user, parseInt(arr[1]) - 1, parseInt(arr[2]) - 1, amount, "box")
            if (amount != 1) { functions.replyMessage(message, text) }
        }
    }
}
function displayBagItem(bagitem) {
    let arr = bagitem.split("_")
    let bagitemid = arr[0]
    arr.splice(0, 1)
    return bagItems[bagitemid].name + " " + arr.map((x, i) => bagItems[bagitemid].sub[i][x] == "" ? "" : "(" + bagItems[bagitemid].sub[i][x] + ")").filter(x => x != "").join(" ")
}