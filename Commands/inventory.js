var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    pages = []
    page = ""
    functions.itemFilter(message, user, {"equip":true}).then(displayItems => {
        if (displayItems.length == 0) { return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ") }
        if (displayItems == false) { return }
        for (var i = 0; i < displayItems.length; i++) {
            page = functions.generateWeaponTemplate(user, displayItems[i], i + 1, displayItems.length)
            pages.push(page)
        }
        new functions.Paginator(message.channel, message.author, pages)
    })
}