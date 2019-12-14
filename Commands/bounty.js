var functions = require("../Utils/functions.js")
module.exports = function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Select a person to place a bounty on or do write `!bounty top`");
        return;
    }
    if (words[1].toUpperCase() == `TOP`) {
        return functions.findUsers({}, { "bounty": 1, "username": 1 }).then(arr => {
            arr.sort(function (a, b) { return parseFloat(b.bounty) - parseFloat(a.bounty) }) //what sorts the array. Search up array.sort() on w3schools.
            let numPerPage = 10
            let page = {
                "embed": { //displays guild stats
                    "title": "Global Bounties",
                    "color": 0xF1C40F,
                    "fields": [{
                        "name": "Most Wanted Accounts",
                        "value": ""
                    }],
                    "footer": {
                        "text": ""
                    },
                }
            }
            let pages = []
            for (var i = 0; i < arr.length; i++) {
                page.embed.fields[0].value += "**" + (i + 1) + ". " + arr[i].username + "** (ID: " + arr[i]._id + ") with **" + parseInt(arr[i].glory) + "** Glory"
                if (i % numPerPage == numPerPage - 1) { // separate pages
                    page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + arr.length //add footer to display where you are
                    pages.push(page)
                    page = {
                        "embed": { //displays guild stats
                            "title": "Global Bounties",
                            "color": 0xF1C40F,
                            "fields": [{
                                "name": "Most Wanted Accounts",
                                "value": ""
                            }],
                            "footer": {
                                "text": ""
                            },
                        }
                    }
                } else {
                    page.embed.fields[0].value += "\n"
                }
            }
            if (page.embed.fields[0] != "") {
                page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + arr.length
                pages.push(page)
                page = {
                    "embed": { //displays guild stats
                        "title": "Global Bounties",
                        "color": 0xF1C40F,
                        "fields": [{
                            "name": "Most Wanted Accounts",
                            "value": ""
                        }],
                        "footer": {
                            "text": ""
                        },
                    }
                }
            }
            new functions.Paginator(message.channel, message.author, pages)
        })
    }
    if (user.dead === true) {
        functions.replyMessage(message, "Corpses can't place bounties!");
        return;
    }
    //console.log(words);
    let spot = 1
    if (words.length == 1) { spot = 0 }
    return Promise.all([functions.validate(message, user, spot)]).then(ret => {
        let target = ret[0];
        if (words.length == 1) { target = user }
        if (target == false) { return; }
        //console.log(target);
        //console.log(target);
        //console.log('targetname: '+targetname);
        //console.log(check);
        if (words.length < 3) {
            functions.sendMessage(message.channel, target.bounty);
            return;
        }
        if (target.dead == true) {
            functions.replyMessage(message, "You can't place a bounty on corpses!");
            return;
        }
        var amount = parseInt(words[2]);
        if (isNaN(amount)) {
            functions.sendMessage(message.channel, "Please specify an integer amount.");
            return;
        }
        //console.log(amount);
        if (user.money >= amount && amount > 0) {
            functions.sendMessage(message.channel, 'Placed a $' + amount + ' on <@' + target._id + ">'s head.");
            target.bounty += amount;
            user.money -= amount;
        } else if (user.money < amount) {
            functions.sendMessage(message.channel, "You can't offer more than you own.");
        } else {
            functions.sendMessage(message.channel, 'Incorrect Argument');
        }
        functions.setUser(target);
    })
}