
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let stats = functions.calcEnchants(user);

    //text+="```"
    let categories = [
        ['attack', 'defense', 'buff', 'dbuff', 'lucky', 'haste'],
        ['critRate', 'critDamage', 'block', 'pierce', 'lifeSteal', 'sacrifice', 'rage'],
        ['tempo', 'antitempo', 'combo', 'revenge', 'burn', 'regen', 'evade', 'spikes', 'maxhp'],
        ['bleed', 'silence', 'vulnerable', 'weakness', 'stun', 'petrify'],
        ['defmult', 'reflect', 'guard', 'poison', 'survive', 'attackvariance'],
        ['resistance', 'critResist', 'pierceResist', 'silenceResist', 'stunResist', 'petrifyResist']
    ]
    let categorynames = ["Main Stats", "1st Gen Enchants", "2nd Gen Enchants", "3rd Gen Enchants", "4th Gen Enchants", "Resistances"]
    let pages = []
    for (let i = 0; i < categories.length; i++) {
        let text = ""
        for (let j = 0; j < categories.length; j++) {
            let enchantName = categories[i][j]
            text += "**" + enchantName + "**: " + stats[enchantName] + "\n"
        }
        let page = {
            "embed": {
                "title": user.username + "'s Stats",
                //"description": "Welcome to the blacksmith\nUse `!purchase [ID_of_Item]` to select the item you want to buy!\n",
                "color": 13498074,

                "fields": [
                    {
                        "name": categorynames[i],
                        "value": text
                        //"inline": true
                    }
                ]
            }
        }
        pages.push(page)
    }
    new functions.Paginator(message.channel, message.author, pages)
}