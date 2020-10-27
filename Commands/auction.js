
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
        let timeover = alist.filter(x => x.time - ts <= 0)
        for (let endaitem of timeover) {
            endAuction(endaitem)
        }
        if (word2 == "list") {
            alist = alist.filter(x => x.time - ts > 0)
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
                            value: "**Highest Bid**: " + aitem.current + " " + aitem.currency + " by " + aitem.bidowner + "\n**Time Remaining**: " + functions.displayTime(aitem.time, ts),
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
            if (isNaN(amount) || amount < aitem.current * 1.05) { return functions.replyMessage(message, "This bid is not high enough! it must be at least " + Math.ceil(aitem.current * 1.05)) + " " + aitem.currency }
            let bidtotal = alist.filter(x => x.bidowner == "<@" + user._id + ">" && x.currency == aitem.currency).reduce((t, p) => t + p.current, 0)
            if (amount + bidtotal > user[aitem.currency]) {
                return functions.replyMessage(message, "You do not have enough to bid :( You only have " + (user[aitem.currency] - bidtotal) + " " + aitem.currency)
            }
            if (aitem.bidowner.startsWith("<@")) {
                functions.dmUser(aitem.bidowner.slice(2, -1), "Someone has outbid you on item " + aitem._id + " (" + aitem.desc + ")")
            }
            if (aitem.time - ts < 0) { return functions.replyMessage(message, "This auction is already over!") }
            aitem.bidowner = "<@" + user._id + ">"
            aitem.current = amount;
            aitem.history.push({ "bidowner": "<@" + user._id + ">", "current": amount })
            if (aitem.time - ts < 300000) { aitem.time = ts + 300000 }
            functions.setObject("auctionData", aitem)
            functions.replyMessage(message, "You have successfully bid!")
        } else if (word2 == "sell") {
            if (admins.indexOf(id) == -1) { return }
            let options = functions.extractOptions(message, true, "-desc", "-item", "-amount", "-price", "-currency", "-time")
            if (options.desc == undefined) { return functions.replyMessage(message, "Please specify a description!") }
            if (options.item == undefined) { return functions.replyMessage(message, "Please specify an item type!") }
            if (options.amount == undefined) { options.amount = 1 }
            if (typeof options.amount == "string") { options.amount = parseInt(options.amount) }
            if (isNaN(options.amount)) { return functions.replyMessage(message, "Please specify a number for the amount!")}
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
            aitem.item = {
                "type": options.item,
                "amount": options.amount
            }
            aitem._id = devData.nextAuctionId
            aitem.history = [];
            devData.nextAuctionId++;
            functions.setObject("devData", devData)
            functions.setObject("auctionData", aitem)
            functions.replyMessage(message, "Item put up for auction. ")
            functions.logCommand(message)
        } else if (word2 == "claim") {
            let aid = parseInt(words[2])
            let amount = parseInt(words[3]);
            if (isNaN(aid) || aid < 0) { return functions.replyMessage(message, "Please specify a positive auction id to bid for. ") }
            let aitem = alist.find(x => x._id == aid)
            if (aitem == undefined) { return functions.replyMessage(message, "This auction item does not exist!") }
            if (ts - aitem.time < 0) { return functions.replyMessage(message, "This auction is not over yet!") }
            if (aitem.end == false) { endAuction(aitem) }
            if (aitem.bidowner != "<@" + user._id + ">") { return functions.replyMessage(message, "This item is not yours to claim. ") }
            let type = aitem.item.type
            if (type == "item") {
                
            } else {
                if (functions.JSONoperate(user, type, "get") == undefined) {
                    return functions.replyMessage(message, "There was an error. Contact an admin through the support server. ");
                }
                if (functions.JSONoperate(user, type, "add", aitem.item.amount) == undefined) {
                    return functions.replyMessage(message, "There was an error. Contact an admin through the support server. ");
                }
            }
            return functions.replyMessage(message, "You have successfully claimed your item!");
            functions.deleteObject("auctionData", aitem._id)
        }
    })
}
async function endAuction(aitem) {
    if (aitem.end) { return; }
    for (let i = aitem.history.length - 1; i >= 0; i--) {
        let bidset = aitem.history[i];
        let id = aitem.bidowner.slice(2, -1)
        await functions.getUser(id).then(payer => {
            if (payer[aitem.currency] < bidset.current) {
                return;
            }
            payer[aitem.currency] -= bidset.current
            aitem.bidowner = "<@" + id + ">";
            aitem.end = true;
            functions.dmUser(payer, "You have successfully won item "+aitem._id+" ("+aitem.desc+") for "+bidset.current+" "+aitem.currency+"!" )
            functions.setUser(payer)
            return;
        })
        if (aitem.end) { return; }
    }
    functions.deleteObject("auctionData", aitem._id)
}