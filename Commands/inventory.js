var functions=require("../Utils/functions.js")

module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    pages = []
    page = ""
    displayItems = functions.itemFilter(message)
    if (displayItems == false) {return }
    for (var i = 0; i < displayItems.length;i++) {
        let itemID = displayItems[i].toString();
        page = functions.generateWeaponTemplate(itemID, i+1, displayItems.length)
        pages.push(page)
    }
    if (pages.length == 0) {
        functions.sendMessage(message.channel, "There's nothing in your inventory...")
    } else {
        new functions.Paginator(message.channel, message.author, pages)
    }
}