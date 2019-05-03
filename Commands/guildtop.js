var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let globalGuilds = 0
    let xparrtosort = []
    for (var guild in guildData) {//loops through user data to check. //w/o if statement, it checks everyone
        if (guild == "Incompetence" || guild == "Oranitz Kingdom") { continue}
        xparrtosort.push(guildData[guild].level + "-_-|-_-" + guild) // push level + 100*ascensions for sorting purposes. Add the " " and the id for identification.
        globalGuilds += 1
    }
    xparrtosort.sort(function (a, b) { return parseInt(b.split("-_-|-_-")[0]) - parseInt(a.split("-_-|-_-")[0]) }) //what sorts the array. Search up array.sort() on w3schools.
    let numPerPage = 10
    let page = {
        "embed": { //displays guild stats
            "title": "Global Guilds",
            "color": 0xF1C40F,
            "fields": [{
                "name": "Highest Level Guilds",
                "value": ""
            }],
            "footer": {
                "text": ""
            },
        }
    }
    let pages = []
    for (var i = 0; i < globalGuilds; i++) {
        let user = xparrtosort[i].split("-_-|-_-")
        let text = parseInt(user[0])
        let guild = user[1]
        //let leveltext = parseInt(user[0]) - 100 * asctext
        page.embed.fields[0].value += "**" + (i + 1) + ". " + guild + "** at level **" + text + "**"
        if (i % numPerPage == numPerPage - 1) { // separate pages
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalGuilds //add footer to display where you are
            pages.push(page)
            page = {
                "embed": { //displays guild stats
                    "title": "Global Guilds",
                    "color": 0xF1C40F,
                    "fields": [{
                        "name": "Highest Level Guilds",
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
        page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + globalGuilds
        pages.push(page)
    }
    new functions.Paginator(message.channel, message.author, pages)
}