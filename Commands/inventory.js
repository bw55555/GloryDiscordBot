
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let pages = []
    let page = ""
    if (words.indexOf("-detailed") == -1) {
        functions.itemFilter(message, user, { "equip": true }).then(wepsra => {
            if (wepsra == false) { return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ") }
            let numPerPage = 5
            let pages = []
            if (wepsra.length == 0) {
                return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ")
            } else {
                let fields = [];
                for (var i = 0; i < wepsra.length; i++) {
                    if (wepsra[i] != undefined) {
                        let fav = "";
                        if (wepsra[i].favorite == true) { fav = " ⭐"}
                        fields.push({
                            name: wepsra[i].name + " (" + wepsra[i]._id + ")" + fav,
                            value: "**Rarity**: " + rarities[wepsra[i].rarity] + "\n**Atk**: " + wepsra[i].attack + " / **Def**: " + wepsra[i].defense + "\n**Modifiers**: \n" + functions.getModifierText(wepsra[i].modifiers),
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
    } else {
        functions.itemFilter(message, user, { "equip": true }).then(displayItems => {
            if (displayItems == false) { return }
            if (displayItems.length == 0) { return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ") }
            if (displayItems == false) { return }
            for (var i = 0; i < displayItems.length; i++) {
                page = functions.generateWeaponTemplate(user, displayItems[i], i + 1, displayItems.length)
                pages.push(page)
            }
            new functions.Paginator(message.channel, message.author, pages)
        })
    }
}