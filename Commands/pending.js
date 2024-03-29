
module.exports = async function (message, user) {

    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)

    if (words[1] != undefined && words[1].toUpperCase() == `HELP`) {
        let page = {
            "embed": {
                "color": 0x458B00,
                "fields": [
                    {
                        "name": "The Market",
                        "value": "- Shop in the market with `market {filters} {-maxcost [price]}`.\n"
                            + "- Put up items for sale to other players with `sell [weaponid] [price]`.\n"
                            + "- Buy items from the market with `buy [weaponid]`\n"
                            + "- View items you've put in the market with `pending`\n"
                            + "- Remove items you've put in the market with `unsell`\n"
                    }
                ],
                "footer": {
                    "text": "Weapons sold through the market cannot be stolen nor refunded under any circumstances."
                }
            }
        }
        functions.sendMessage(message.channel, page)
        return
    }
    let maxCost = 1000000000;
    functions.itemFilter(message, user, { "maxCost": maxCost }).then(wepsra => {
        if (wepsra == false) { return functions.sendMessage(message.channel, "There's nothing in the pending list that matches the selected filters... ") }
        let numPerPage = 5
        let pages = []
        if (wepsra.length == 0) {
            return functions.sendMessage(message.channel, "There's nothing in the pending list that matches the selected filters... ")
        } else {
            let fields = [];
            for (var i = 0; i < wepsra.length; i++) {
                if (wepsra[i] != undefined) {
                    fields.push({
                        name: wepsra[i].name + " (" + wepsra[i]._id + ")",
                        value: "**Rarity**: " + rarities[wepsra[i].rarity] + "\n**Atk**: " + wepsra[i].attack + " / **Def**: " + wepsra[i].defense + "\n**Price**: $" + wepsra[i].price + "\n**Modifiers**: \n" + functions.getModifierText(wepsra[i].modifiers),
                        inline: false,
                    })
                }
                if ((i % numPerPage) == (numPerPage - 1)) {
                    if (fields.length > 0) {
                        page = {
                            "embed": {
                                "color": 0xffffff,
                                "title": user.username + "'s Pending List",
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
                        "title": user.username + "'s Pending List",
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

function displayWeaponText(id) {
    let infoText = ""
    infoText += "**" + itemData[id].name + "** (" + itemData[id].id + ")\n"
    infoText += "Rarity: " + itemData[id].rarity + "\n"
    infoText += "Atk +" + itemData[id].attack + " / Def +" + itemData[id].defense + "\n"
    if (itemData[id].modifiers != undefined && itemData[id].modifiers.length > 0) {
        infoText += "*Modifiers:* " + itemData[id].modifiers + "\n"
    }
    if (itemData[id].price != undefined) {
        infoText += "**Price: " + itemData[id].price + "**\n"
    }
    return infoText
}