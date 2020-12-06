var Paginator = require("./Paginator.js")
module.exports = function createPages(message, user, arr, title, fnamefunc, fvaluefunc, options) {
    if (options == undefined) { options = {} }
    let numPerPage = options.numPerPage == undefined ? 5 : options.numPerPage
    let pages = []
    if (arr.length == 0) {
        return false
    } else {
        let fields = [];
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] != undefined) {
                let prename = ""
                if (options.includeNumbering == true) {
                    prename = "**" + (i + 1) + ". **"
                }
                fields.push({
                    name: prename+fnamefunc(arr[i]),
                    value: fvaluefunc(arr[i]),
                    inline: false,
                })
            }
            if ((i % numPerPage) == (numPerPage - 1)) {
                if (fields.length > 0) {
                    page = {
                        "embed": {
                            //"title": "Global Wealth",
                            "color": 0xffffff,
                            "title": title,
                            "fields": fields,
                            "footer": {
                                "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(arr.length / numPerPage))
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
                    "title": title,
                    "fields": fields,
                    "footer": {
                        "text": "Page " + (pages.length + 1) + " of " + (Math.ceil(arr.length / numPerPage))
                    },
                }
            }
            pages.push(page)
            fields = []
        }
    }
    new Paginator(message.channel, message.author, pages)
}