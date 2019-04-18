var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let globalUsers = 0
    let globalWealth = 0;
    let xparrtosort = []
    for (var i in guildData){
      globalWealth += guildData[i].bank;
    }
    for (var userid in userData) {//loops through user data to check. //w/o if statement, it checks everyone
        if (userData[userid].money != undefined) {
            xparrtosort.push(userData[userid].money + " " + userid) // push level + 100*ascensions for sorting purposes. Add the " " and the id for identification.
            globalUsers += 1;
            globalWealth += userData[userid].money;
        }
    }
    xparrtosort.sort(function (a, b) { return parseInt(b.split(" ")[0]) - parseInt(a.split(" ")[0]) }) //what sorts the array. Search up array.sort() on w3schools.
    let numPerPage = 10
    let page = {
        "embed": { //displays guild stats
            "title": "Global Levels",
            "color": 0xF1C40F,
            "fields": [{
                "name": "Highest Level Accounts",
                "value": ""
            }],
            "footer": {
                "text": ""
            },
        }
    }
    let pages = []
    for (var i = 0; i < globalUsers; i++) {
        let user = xparrtosort[i].split(" ")
        let text = parseInt(user[0])
        //let leveltext = parseInt(user[0]) - 100 * asctext
        let username = userData[user[1]].username
        page.embed.fields[0].value += "**" + (i + 1) + ". " + username + "** (ID: " + user[1] + ") with **$" + text + "**"
        if (i % numPerPage == numPerPage - 1) { // separate pages
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalUsers //add footer to display where you are
            pages.push(page)
            page = {
                "embed": { //displays guild stats
                    "title": "Global Wealth",
                    "color": 0xF1C40F,
                    "fields": [{
                        name: "Money in Economy",
                        value: globalWealth,
                        inline: true
                     },{
                        "name": "Richest Accounts",
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
        page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalUsers
        pages.push(page)
        page = {
            "embed": { //displays guild stats
                "title": "Global Wealth",
                "color": 0xF1C40F,
                "fields": [{
                    "name": "Richest Accounts",
                    "value": ""
                }],
                "footer": {
                    "text": ""
                },
            }
        }
    }
    new functions.Paginator(message.channel, message.author, pages)
}
