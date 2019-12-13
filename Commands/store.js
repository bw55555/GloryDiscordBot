var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let text = "```\n0: 1 hour shield ($20000)\n"
    text += "1: 2 hour shield ($40000)\n"
    text += "2: 4 hour shield ($100000)\n"
    text += "3: 6 hour shield ($160000)\n"
    text += "4: 8 hour shield ($240000)\n"
    text += "5: 12 hour shield ($400000)\n\n"
    /*text += "10: One Mysterious Box ($25000)\n"
    text += "11: Ten Mysterious Boxes ($250000)\n"
    text += "12: Hundred Mysterious Boxes ($2500000)\n"*/
    //text += "20: Transform a skill back into a skill point ($100000000)\n"
    text += "Buy something with !purchase [itemNumber]```"
    functions.sendMessage(message.channel, text)
}