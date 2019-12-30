/*var functions = require("../Utils/functions.js")
var display = require("../Utils/display.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    display.generateWeapon(id, "Test Spear", 16, -1, "This is a test sword.", -1)
}*/

var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    functions.itemFilter(message, user, { "equip": true }, { _id: {$in: Object.keys(user.inventory)}}).then(wepsra => {
        if (wepsra == false) { return }
        let numPerPage = 5
        let pages = []
        if (wepsra.length == 0) {
            return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ")
        } else {
            let fields = [];
            for (var i = 0; i < wepsra.length; i++) {
                if (wepsra[i] != undefined) {
                    fields.push({
                        name: wepsra[i].name + " (" + wepsra[i]._id + ")",
                        value: "Rarity: " + rarities[wepsra[i].rarity] + "\nAtk: " + wepsra[i].attack + " / Def: " + wepsra[i].defense,
                        inline: false,
                    })
                }
                if ((i % numPerPage) == (numPerPage - 1)) {
                    if (fields.length > 0) {
                        page = {
                            "embed": {
                                //"title": "Global Wealth",
                                "color": 0xffffff,
                                "title": user.username + "'s Inventory",
                                "fields": fields,
                                "footer": {
                                    "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(wepsra.length / numPerPage))
                                },
                            }
                        }
                        pages.push(page)
                        fields = []
                    }
                }
            }
            if (fields.length > 0) {
                page = {
                    "embed": {
                        //"title": "Global Wealth",
                        "color": 0xffffff,
                        "title": user.username + "'s Inventory",
                        "fields": fields,
                        "footer": {
                            "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(wepsra.length / numPerPage))
                        },
                    }
                }
                pages.push(page)
                fields = []
            }
        }
        new functions.Paginator(message.channel, message.author, pages)
    })
}