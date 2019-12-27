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
    let wepsra = functions.itemFilter(message, user)
    let numPerPage = 5
    let pages = []
    if (wepsra.length == 0) {
        page = {
            "embed": {
                //"title": "Global Wealth",
                "color": 0xffffff,
                "fields": [
                    {
                        "name": "Empty Inventory",
                        "value": "Why don't you go get some weapons?",
                        "inline": true
                    }
                ],
                "footer": {
                    "text": "Page 1 of 1"
                }
            }
        }
    } else {
        let fields = [];
        for (var i = 0; i < wepsra.length; i++) {
            if ((i % numPerPage) != (numPerPage - 1)) {
                if (wepsra[i] != undefined) {
                    fields.push({
                        name: itemData[wepsra[i]].name + "(" + wepsra[i]+")",
                        value: "Rarity: " + rarities[itemData[wepsra[i]].rarity] + "\nAtk +" + itemData[wepsra[i]].attack + " / Def +" + itemData[wepsra[i]].defense,
                        inline: true,
                    })
                }
            } else {
                if (wepsra[i] != undefined) {
                    fields.push({
                        name: itemData[wepsra[i]].name + "(" + wepsra[i] + ")",
                        value: "Rarity: " + rarities[itemData[wepsra[i]].rarity] + "\nAtk +" + itemData[wepsra[i]].attack + " / Def +" + itemData[wepsra[i]].defense,
                        inline: true,
                    })
                }
                if (fields.length > 0) {
                    page = {
                        "embed": {
                            //"title": "Global Wealth",
                            "color": 0xffffff,
                            "title": user.username + "'s Inventory",
                            "fields": fields,
                            "footer": {
                                "text": "Page " + (pages.length + 1) + " of " + (1 + Math.floor(wepsra.length / numPerPage))
                            },
                        }
                    }
                    pages.push(page)
                    fields = []
                }
            }
            if (fields.length>0) {
                page = {
                    "embed": {
                        //"title": "Global Wealth",
                        "color": 0xffffff,
                        "title": user.username + "'s Inventory",
                        "fields": fields,
                        "footer": {
                            "text": "Page " + (pages.length + 1) + " of " + (1 + Math.floor(wepsra.length / numPerPage))
                        },
                    }
                }
                pages.push(page)
                fields = []
            }
        }
    }
    new functions.Paginator(message.channel, message.author, pages)
}