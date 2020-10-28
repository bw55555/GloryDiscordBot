let storeitems = {
    "102": { "name": "Energy Rune", "cost": "10 Rune Shards" },
    "103": { "name": "Arcane Rune", "cost": "50 Rune Shards" },
    "104": { "name": "Force Rune", "cost": "25 Rune Shards" },
    "105": { "name": "Guard Rune", "cost": "25 Rune Shards" },
    "106": { "name": "Life Rune", "cost": "25 Rune Shards" }
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let word2 = words[1]
    if (word2 == undefined) { word2 = "" }
    if (word2 == "store") {

    } else {
        functions.replyMessage(message, "You have "+user.candy+" candy. ")
    }
}