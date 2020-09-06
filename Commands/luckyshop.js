let storeitems = [
    { "type": "boxes", "min": 10, "max": 200, "price": 50000, "chance": 1000000 },
    { "type": "reroll", "min": 1, "max": 1, "price": 20000000, "chance": 10000 },
    { "type": "skill point", "min": 1, "max": 1, "price": 500000000, "chance":1 },
    { "type": "materials", "min": 1000, "max": 20000, "price": 1500, "chance": 500000 },
    { "type": "crystals", "min": 100, "max": 1000, "price": 100000, "chance": 100000 },
    { "type": "Arcane rune", "min": 1, "max": 10, "price": 10000000, "chance": 2000 },
    { "type": "Force rune", "min": 1, "max": 10, "price": 5000000, "chance": 5000 },
    { "type": "Guard rune", "min": 1, "max": 10, "price": 5000000, "chance": 5000 },
    { "type": "Life rune", "min": 1, "max": 10, "price": 5000000, "chance": 5000 },
    { "type": "Energy rune", "min": 1, "max": 10, "price": 2000000, "chance": 10000 },
    { "type": "Wisdom rune", "min": 1, "max": 10, "price": 200000000, "chance": 5 },
    { "type": "Rune shard", "min": 25, "max":150, "price": 200000, "chance": 200000 }
]
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    let scmd = words[1];
    if (user.luckyshop == undefined) { user.luckyshop = []; }
    if (scmd == "buy" || scmd == "b") {
        let item = parseInt(words[2])-1;
        if (isNaN(item) || item < 0 || item >= user.luckyshop.length) {
            return functions.replyMessage(message, "This item is not defined")
        }
        let temp = user.luckyshop[item].split(/\s+/)
        let type = storeitems[temp[0]].type;
        let amt = parseInt(temp[1]);
        let unitprice = parseInt(temp[2]);
        let totalprice = unitprice * amt;
        if (user.money < totalprice) {
            return functions.replyMessage(message, "You do not have enough money to buy this!")
        }

        if (type == "boxes") {
            user.consum.box += amt;
        } else if (type == "reroll") {
            user.consum.reroll += amt;
        } else if (type == "skill point") {
            user.consum.sp += amt;
        } else if (type == "materials") {
            user.materials += amt;
        } else if (type == "Arcane rune") {
            user.runes[3] += amt;
        } else if (type == "Force rune") {
            user.runes[4] += amt;
        } else if (type == "Guard rune") {
            user.runes[5] += amt;
        } else if (type == "Life rune") {
            user.runes[6] += amt;
        } else if (type == "Energy rune") {
            user.runes[2] += amt;
        } else if (type == "Wisdom rune") {
            user.runes[1] += amt;
        } else if (type == "Rune shard") {
            user.runes[0] += amt;
        } else if (type == "crystals") {
            if (user.guild == "None") { return functions.replyMessage(message, "Since you are currently not in a guild, you cannot buy this. ")}
            functions.getObject("guildData", user.guild).then(guild => { guild.crystals += amt; functions.setObject("guildData", guild) });
        } else {
            return functions.replyMessage(message, "There was an error. Please report it in the support server. The link is in !info")
        }
        user.money -= totalprice;
        user.luckyshop.splice(item, 1)
        functions.replyMessage(message, "You have bought " + amt + " " + type + " for $" + totalprice)
    }
    else if (scmd == "refresh" || scmd == "r") {
        if (functions.isCD(user, ts, "luckyshoprefresh")) {
            return functions.replyMessage(message, 'You can refresh the lucky shop in ' + functions.displayTime(user.cooldowns.luckyshoprefresh, ts));
        }
        let totalchance = storeitems.reduce((tot, next) => tot + next.chance, 0)
        user.luckyshop = [];
        for (let item = 0; item < 4; item++) {
            let currtot = 0;
            let randomchance = Math.floor(Math.random() * totalchance);
            for (let i = 0; i < storeitems.length; i++) {
                currtot += storeitems[i].chance;
                if (randomchance < currtot) {
                    let amt = storeitems[i].min + Math.floor(Math.pow(Math.random(), 4) * (storeitems[i].max - storeitems[i].min + 1))
                    let price = storeitems[i].price * (1-Math.pow(Math.random(), 4))
                    if (user.vip != undefined) { price *= (1 - user.vip.level / 10) }
                    price = Math.floor(price)
                    user.luckyshop.push(i + " "+amt +" "+price)
                    break;
                }
            }
        }
        functions.setCD(user, ts, functions.secondsUntilReset(ts), "luckyshoprefresh")
        functions.replyMessage(message, "The lucky shop was successfully refreshed!")
    }
    else {
        if (user.luckyshop.length == 0) { return functions.replyMessage(message, "The lucky shop is currently empty...") }
        let fields = [];
        for (let i = 0; i < user.luckyshop.length; i++) {
            let item = user.luckyshop[i].split(" ").map(x=> parseInt(x));
            fields.push({
                name: "**"+(i+1)+". **"+storeitems[item[0]].type + " ("+item[1]+")",
                value: "**Price**: $" + item[1]*item[2] + " (~~"+storeitems[item[0]].price+"~~ "+item[2]+" ea)",
                inline: false,
            })
        }
        functions.sendMessage(message.channel, {
            "embed": {
                //"title": "Global Wealth",
                "color": 0xffffff,
                "title": user.username + "'s Lucky Shop",
                "fields": fields
            }
        })
    }
}