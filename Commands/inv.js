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
        let infoText = ""
        let totalText = ""
        for (var i = 0; i < wepsra.length; i += 1) {
            if ((i % numPerPage) != (numPerPage - 1)) {
                if (wepsra[i] != undefined) {
                    infoText = displayWeaponText(wepsra[i])
                    infoText += "\n"
                    totalText += infoText
                }
            } else {
                if (wepsra[i] != undefined) {
                    infoText = displayWeaponText(wepsra[i])
                    infoText += "\n"
                    totalText += infoText
                }
                if (totalText != "") {
                    page = {
                        "embed": {
                            //"title": "Global Wealth",
                            "color": 0xffffff,
                            "fields": [
                                {
                                    "name": user.username + "'s Inventory",
                                    "value": totalText,
                                    "inline": true
                                }
                            ],
                            "footer": {
                                "text": "Page " + (pages.length + 1) + " of " + (1 + Math.floor(wepsra.length / 5))
                            },
                        }
                    }
                    pages.push(page)
                    totalText = ""
                }
            }
            if (totalText != "") {
                page = {
                    "embed": {
                        //"title": "Global Wealth",
                        "color": 0xffffff,
                        "fields": [
                            {
                                "name": user.username + "'s Inventory",
                                "value": totalText,
                                "inline": true
                            }
                        ],
                        "footer": {
                            "text": "Page " + (pages.length + 1) + " of " + (1 + Math.floor(wepsra.length / 5))
                        },
                    }
                }
                pages.push(page)
                totalText = ""
            }
        }
    }
    new functions.Paginator(message.channel, message.author, pages)
}

function displayWeaponText(id) {
    let infoText = ""
    infoText += "**" + itemData[id].name + "** (" + itemData[id].id + ")\n"
    infoText += "Rarity: " + itemData[id].rarity + "\n"
    infoText += "Atk +" + itemData[id].attack + " / Def +" + itemData[id].defense + "\n"
    if (itemData[id].modifiers != undefined && itemData[id].modifiers.length > 0) {
        infoText += "*Modifiers:* " + itemData[id].modifiers + "\n"
    }
    return infoText
}