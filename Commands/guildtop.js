var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let globalGuilds = 0
    let xparrtosort = []
    functions.findObjects("guildData", {}, { "level": 1 }).then(guildArr => {
        guildArr.sort(function (a, b) { return b.level - a.level }) //what sorts the array. Search up array.sort() on w3schools.
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
        for (var i = 0; i < guildArr.length; i++) {
            //let leveltext = parseInt(user[0]) - 100 * asctext
            page.embed.fields[0].value += "**" + (i + 1) + ". " + guildArr[i]._id + "** at level **" + guildArr[i].level + "**"
            if (i % numPerPage == numPerPage - 1) { // separate pages
                page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + guildArr.length //add footer to display where you are
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
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (guildArr.length) + " out of " + guildArr.length
            pages.push(page)
        }
        new functions.Paginator(message.channel, message.author, pages)
    })
}