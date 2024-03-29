
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

    return functions.findObjects("auctionData", {}).then(alist => {
        
        let word2 = words[1];
        if (word2 == undefined) { word2 = "list" }
        word2 = word2.toLowerCase();
        let timeover = alist.filter(x => x.time - ts <= 0 && x.end != true)
        for (let endaitem of timeover) {
            endAuction(endaitem, user)
        }
        alist = alist.filter(x => x.end != true)
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
            if (aitem.time - ts < 0) { return functions.replyMessage(message, "This auction is already over!") }
            if (aitem.bidowner == "<@" + user._id + ">") { return functions.replyMessage(message, "You cannot outbid yourself :/") }
            if (isNaN(amount) || amount < aitem.current * 1.05) { return functions.replyMessage(message, "This bid is not high enough! it must be at least " + Math.ceil(aitem.current * 1.05)) + " " + aitem.currency }
            let bidtotal = alist.filter(x => x.bidowner == "<@" + user._id + ">" && x.currency == aitem.currency).reduce((t, p) => t + p.current, 0)
            if (amount + bidtotal > user[aitem.currency]) {
                return functions.replyMessage(message, "You do not have enough to bid :( You only have " + (user[aitem.currency] - bidtotal) + " " + aitem.currency)
            }
            if (aitem.bidowner.startsWith("<@")) {
                functions.dmUser(aitem.bidowner.slice(2, -1), "Someone has outbid you on item " + aitem._id + " (" + aitem.desc + ")")
            }
            
            aitem.bidowner = "<@" + user._id + ">"
            aitem.current = amount;
            aitem.history.push({ "bidowner": "<@" + user._id + ">", "current": amount })
            if (aitem.time - ts < 300000) { aitem.time = ts + 300000 }
            functions.setObject("auctionData", aitem)
            functions.replyMessage(message, "You have successfully bid!")
        } else if (word2 == "sell") {
            if (admins.indexOf(id) == -1) { return }
            let options = functions.extractOptions(message, false, ["-desc", "-item", "-amount", "-price", "-currency", "-time"])
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
            functions.sendAsEmbed(functions.getLogChannel("auctionChannelId"), "List - " + aitem._id, "**Description**: " + aitem.desc + "\n**Starting Bid**: " + aitem.current + " " + aitem.currency, "Auction Log").then(x => x.crosspost())
            functions.logCommand(message)
        } else if (word2 == "claim") {
            let aid = parseInt(words[2])
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
            functions.replyMessage(message, "You have successfully claimed your item!");
            functions.deleteObject("auctionData", aitem._id)
        } else if (word2 == "edit") {
            if (admins.indexOf(id) == -1) {return}
            let aid = parseInt(words[2])
            if (isNaN(aid) || aid < 0) { return functions.replyMessage(message, "Please specify a positive auction id to extend. ") }
            let aitem = alist.find(x => x._id == aid)
            if (aitem == undefined) { return functions.replyMessage(message, "This auction item does not exist!") }
            if (ts - aitem.time > 0) { return functions.replyMessage(message, "This auction is already over!") }
            let options = functions.extractOptions(message, true, ["-desc", "-item", "-amount", "-time"])
            if (options.time != undefined) {
                options.time = functions.extractTime(message, options.time)
                if (options.time == false) { return }
                aitem.time = ts + options.time
            }
            if (options.desc != undefined) { aitem.desc = options.desc }
            if (options.item != undefined) {
                aitem.item.type = options.item
            }
            if (options.amount != undefined) {
                options.amount = parseInt(options.amount)
                if (isNaN(options.amount)) { return functions.replyMessage(message, "Please specify a number for the amount!") }
                aitem.item.amount = options.amount
            }
            functions.setObject("auctionData", aitem)
            functions.replyMessage(message, "Edited auction item "+aid)
            
            
        }
    })
}
async function endAuction(aitem, user) {
    if (aitem.end) { return; }
    if (aitem.bidowner == "None") { aitem.end = true; }
    for (let i = aitem.history.length - 1; i >= 0; i--) {
        let bidset = aitem.history[i];
        let id = aitem.bidowner.slice(2, -1)
        if (id == user._id) {
            checkPayment(aitem, bidset, user)
        } else {
            await functions.getUser(id).then(payer => {
                checkPayment(aitem, bidset, payer)
                functions.setUser(payer)
                return;
            })
        }
        if (aitem.end) {
            functions.sendAsEmbed(functions.getLogChannel("auctionChannelId"), "Buy - " + aitem._id, "**Description**: " + aitem.desc + "\n**Price**: " + aitem.current + " " + aitem.currency + " by <@" + aitem.bidowner+"> ("+aitem.bidowner+")", "Auction Log").then(x => x.crosspost())
            return functions.deleteObject("auctionData", aitem._id);
        }
    }
    
}
function checkPayment(aitem, bidset, payer) {
    if (payer[aitem.currency] < bidset.current) {
        return;
    }
    payer[aitem.currency] -= bidset.current
    aitem.bidowner = "<@" + payer._id + ">";
    aitem.end = true;
    aitem.current = bidset.current;
    let type = aitem.item.type
    let text = "You have successfully won item " + aitem._id + " (" + aitem.desc + ") for " + bidset.current + " " + aitem.currency + "!\n"
    aitem.bidowner = payer._id
    if (type == "item") {

    } else {
        if (functions.JSONoperate(payer, type, "get") == undefined) {
            text += "There was an error. Contact an admin through the support server. ";
        } else if (functions.JSONoperate(payer, type, "add", aitem.item.amount) == undefined) {
            text += "There was an error. Contact an admin through the support server. ";
        }
    }
    functions.dmUser(payer, text)
    functions.setObject("auctionData", aitem)
}