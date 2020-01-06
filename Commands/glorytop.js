var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    functions.findUsers({}, { "glory": 1, "username":1 }).then(arr => {
        arr.sort(function (a, b) { return parseFloat(b.glory) - parseFloat(a.glory) }) //what sorts the array. Search up array.sort() on w3schools.
        let numPerPage = 10
        let page = {
            "embed": { //displays guild stats
                "title": "Global Glory",
                "color": 0xF1C40F,
                "fields": [{
                    "name": "Highest Glory Accounts",
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
                        "title": "Global Glory",
                        "color": 0xF1C40F,
                        "fields": [{
                            "name": "Highest Glory Accounts",
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