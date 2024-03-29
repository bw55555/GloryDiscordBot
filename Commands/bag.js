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
            text += bagitem +" - **" + itemname + "**: " + user.bag[bagitem] + "\n"
        }
        functions.replyMessage(message, text)
    } else if (word2 == "use") {
        let itemid = words[2];
        let amount = parseInt(words[3])
        if (isNaN(amount)) { amount = 1 }
        let arr = itemid.split("_")
        let gid = arr.splice(0, 1)
        if (!validateBagItem(itemid)) { return functions.replyMessage(message, "This item does not exist!") }
        if (user.bag[itemid] == undefined) { return functions.replyMessage(message, "You do not have any " + displayBagItem(itemid) + "!") }
        if (isNaN(amount) || amount < 0 || amount > 10000) {return functions.replyMessage(message, "Please specify an amount between 1 and 10000. ")}
        if (user.bag[itemid] < amount) { return functions.replyMessage(message, "You do not have enough " + displayBagItem(itemid) + "! You only have " + user.bag[itemid])}
        
        
        if (gid == "g0") {
            let text = "You opened " + amount + " boxes and got:\n"
            text += functions.craftItems(message, user, parseInt(arr[0]) - 1, parseInt(arr[1]) - 1, amount, "box")
            if (amount != 1) { functions.replyMessage(message, text) }
            user.bag[itemid] -= amount;
        }
    }
}
function displayBagItem(bagitem) {
    let arr = bagitem.split("_")
    let bagitemid = arr[0]
    arr.splice(0, 1)
    return bagItems[bagitemid].name + " " + arr.map((x, i) => bagItems[bagitemid].sub[i][x] == "" ? "" : "(" + bagItems[bagitemid].sub[i][x] + ")").filter(x => x != "").join(" ")
}
function validateBagItem(itemid) {
    if (itemid == undefined) {return false}
    let arr = itemid.split("_")
    let gid = arr.splice(0, 1)
    if (bagItems[gid] == undefined) { return false }
    let sub = bagItems[gid].sub
    for (let i = 0; i < arr.length; i++) {
        if (sub[i] == undefined || arr[i] == undefined || sub[i][arr[i]] == undefined) {return false}
    }
    return true
}