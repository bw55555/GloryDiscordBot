
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let item = words[1];
    let arrayitem = words[2] == undefined ? "": "." + words[2]
    if (admins.indexOf(id) == -1) { return }
    if (typeof functions.JSONoperate(user, item+arrayitem, "get") != "number") {
        return functions.replyMessage(message, "This does not resolve to a number...")
    }
    let filterproject = { "username": 1 }
    filterproject[item] = 1
    functions.findUsers({}, filterproject).then(arr => {
        arr.sort(function (a, b) {
            if (functions.JSONoperate(b, item + arrayitem, "get") == undefined) { return -1 }
            if (functions.JSONoperate(a, item + arrayitem, "get") == undefined) { return 1 }
            return functions.JSONoperate(b, item + arrayitem, "get") - functions.JSONoperate(a, item + arrayitem, "get")
        }) //what sorts the array. Search up array.sort() on w3schools.
        let numPerPage = 10
        let page = {
            "embed": { //displays guild stats
                "title": "Leaderboard for "+item,
                "color": 0xF1C40F,
                "fields": [{
                    "name": "Best Accounts",
                    "value": ""
                }],
                "footer": {
                    "text": ""
                },
            }
        }
        let pages = []
        for (var i = 0; i < arr.length; i++) {
            page.embed.fields[0].value += "**" + (i + 1) + ". " + arr[i].username + "** (ID: " + arr[i]._id + ") with **" + functions.JSONoperate(arr[i], item+arrayitem, "get") + "** " + item+arrayitem
            if (i % numPerPage == numPerPage - 1) { // separate pages
                page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + arr.length //add footer to display where you are
                pages.push(page)
                page = {
                    "embed": { //displays guild stats
                        "title": "Leaderboard for " + item,
                        "color": 0xF1C40F,
                        "fields": [{
                            "name": "Best Accounts",
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
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (arr.length) + " out of " + arr.length
            pages.push(page)
        }
        new functions.Paginator(message.channel, message.author, pages)
    })
}