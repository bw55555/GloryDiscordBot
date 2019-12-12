var functions=require("../Utils/functions.js")

module.exports = function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    pages = []
    page = ""
    displayItems = functions.itemFilter(message)
    if (displayItems.length == 0) { return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ") }
    if (displayItems == false) { return }
    for (var i = 0; i < displayItems.length;i++) {
        let itemID = displayItems[i].toString();
        page = functions.generateWeaponTemplate(itemID, i+1, displayItems.length)
        pages.push(page)
    }
    new functions.Paginator(message.channel, message.author, pages)
}