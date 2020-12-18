let bagItems = Assets.bagItemsData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let text = "Your bag: \n"
    for (let bagitem in user.bag) {
        let arr = bagitem.split("_")
        let bagitemid = arr[0]
        arr.splice(0, 1)
        itemname = bagItems[bagitemid].name + " " + arr.map((x, i) => bagItems[bagitemid].sub[i][x] == "" ? "" : "("+bagItems[bagitemid].sub[i][x]+")").join(" ")
        text += "**" +itemname + "**: "+user.bag[bagitem]+"\n"
    }
    functions.replyMessage(message, text)
}