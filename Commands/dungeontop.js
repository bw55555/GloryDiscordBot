
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    let globalGuilds = 0
    let xparrtosort = []
    functions.findObjects("dungeonData", {}, { "maxFloor": 1 }).then(dungeonArr => {
        dungeonArr.sort(function (a, b) { return b.level - a.level }) //what sorts the array. Search up array.sort() on w3schools.
        let numPerPage = 10
        let page = {
            "embed": { //displays guild stats
                "title": "Dungeon Stats",
                "color": 0xF1C40F,
                "fields": [{
                    "name": "Best Dungeon Explorers",
                    "value": ""
                }],
                "footer": {
                    "text": ""
                },
            }
        }
        let pages = []
        for (var i = 0; i < dungeonArr.length; i++) {
            //let leveltext = parseInt(user[0]) - 100 * asctext
            page.embed.fields[0].value += "**" + (i + 1) + ". " + dungeonArr[i]._id + "** at floor **" + dungeonArr[i].level + "**"
            if (i % numPerPage == numPerPage - 1) { // separate pages
                page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (i + 1) + " out of " + dungeonArr.length //add footer to display where you are
                pages.push(page)
                page = {
                    "embed": { //displays guild stats
                        "title": "Dungeon Stats",
                        "color": 0xF1C40F,
                        "fields": [{
                            "name": "Best Dungeon Explorers",
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
            page.embed.footer.text = (pages.length * numPerPage + 1) + "-" + (dungeonArr.length) + " out of " + dungeonArr.length
            pages.push(page)
        }
        new functions.Paginator(message.channel, message.author, pages)
    })
}