
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
                        "name": "The Auction House",
                        "value": "- List auction items with `!auction list`.\n"
                            + "- Bid on items from the auction with `!auction bid [itemid] [price]`\n"
                    }
                ],
                "footer": {
                    "text": "Items bid through the auction will not be refunded under any circumstances."
                }
            }
        }
        functions.sendMessage(message.channel, page)
        return
    }

    functions.findObjects("auctionData", {}).then(alist => {
        let word2 = words[1];
        if (word2 == undefined) { word2 = "" }
        word2 = word2.toLowerCase();
        if (word2 == "list") {
            let numPerPage = 5
            let pages = []
            if (alist == false || alist.length == 0) {
                return functions.sendMessage(message.channel, "There's nothing being sold in the auction...")
            } else {
                let fields = [];
                for (var i = 0; i < alist.length; i++) {
                    let aitem = alist[i];
                    if (aitem != undefined) {
                        fields.push({
                            name: "[" + aitem._id + "]: " + aitem.desc,
                            value: "**Highest Bid**: " + aitem.current + " " + aitem.currency + " by " + aitem.bidowner+"\n**Time Remaining**: "+functions.displayTime(aitem.time, ts),
                            inline: false
                        })
                    }
                    if ((i % numPerPage) == (numPerPage - 1)) {
                        if (fields.length > 0) {
                            page = {
                                "embed": {
                                    "color": 0xffffff,
                                    "title": "The Auction House",
                                    "fields": fields,
                                    "footer": {
                                        "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(alist.length / numPerPage))
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
                            "title": "The Market",
                            "fields": fields,
                            "footer": {
                                "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(alist.length / numPerPage))
                            },
                        }
                    }
                    pages.push(page)
                    fields = []
                }
            }
            new functions.Paginator(message.channel, message.author, pages)
        } else if (word2 == "bid") {
            let aid = parseInt(words[2])
            let amount = parseInt(words[3]);
            if (isNaN(aid) || aid < 0) { return functions.replyMessage(message, "Please specify a positive auction id to bid for. ") }
            let aitem = alist.find(x => x._id == aid)
            if (aitem == undefined) { return functions.replyMessage(message, "This auction item does not exist!") }
            if (aitem.bidowner == "<@" + user._id + ">") { return functions.replyMessage(message, "You cannot outbid yourself :/") }
            if (isNaN(amount) || amount < aitem.current * 1.05) { return functions.replyMessage(message, "This bid is not high enough! it must be at least " + Math.floor(aitem.current * 1.05)) + " " + aitem.currency }
            let bidtotal = alist.filter(x => x.bidowner == "<@" + user._id + ">" && x.currency == alist.currency).reduce((p, t) => t + p.current, 0)
            if (amount + bidtotal > user[aitem.currency]) {
                return functions.replyMessage(message, "You do not have enough to bid :(")
            }
            if (aitem.bidowner.startsWith("<@")) {
                functions.dmUser(aitem.bidowner.slice(2, aitem.bidowner.length - 1), "Someone has outbid you on item " + aitem._id + "(" + aitem.desc + ")")
            }
            if (ts - aitem.time < 0) { return functions.replyMessage(message, "This auction is already over!") }
            aitem.bidowner = "<@" + user._id + ">"
            aitem.current = amount;
            aitem.history.push({ "bidowner": "<@" + user._id + ">", "current": amount })
            if (ts - aitem.time < 300000) { aitem.time = ts + 300000}
            functions.setObject("auctionData", aitem)
            functions.replyMessage(message, "You have successfully bid!")
        } else if (word2 == "sell") {
            if (admins.indexOf(id) == -1) { return }
            let options = functions.extractOptions(message, true, "-desc", "-price", "-currency", "-time")
            if (options.desc == undefined) { return functions.replyMessage(message, "Please specify a description!") }
            options.price = parseInt(options.price)
            if (isNaN(options.price) || options.price < 0) { return functions.replyMessage(message, "Please specify a price!") }
            if (options.currency == undefined || typeof user[options.currency] != "number") { options.currency = "honor" }
            if (options.time == undefined) { options.time = "12h" }
            options.time = functions.extractTime(message, options.time)
            if (options.time == false) { return }
            let aitem = {}
            aitem.desc = options.desc
            aitem.current = options.price
            aitem.currency = options.currency
            aitem.time = ts + options.time
            aitem.bidowner = "None"
            aitem._id = devData.nextAuctionId
            aitem.history = [];
            devData.nextAuctionId++;
            functions.setObject("devData", devData)
            functions.setObject("auctionData", aitem)
            functions.replyMessage(message, "Item put up for auction. ")
        }
    })
}