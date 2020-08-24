global.runeNames = ["Rune Shard", "Wisdom Rune", "Energy Rune", "Arcane Rune", "Force Rune", "Guard Rune", "Life Rune"]
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is currently under development!") }
    if (user.runes == undefined) { user.runes = [0, 0, 0, 0, 0, 0, 0] }
    while (user.runes.length < 7) { user.runes.push(0) }
    let text = "```\nYour Runes: \n";
    for (let i = 0; i < user.runes.length; i++) {
        text+=runeNames[i]+": "+user.runes[i]+"\n"
    }
    text+="```"
    functions.sendMessage(message.channel, text)
}