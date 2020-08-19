const runeNames = ["Arcane Rune", "Force Rune", "Guard Rune", "Life Rune", "Energy Rune", "Rune Shard"]
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is currently under development!") }
    if (user.runes == undefined) { user.runes = [0, 0, 0, 0, 0, 0] }
    let text = "```\nYour Runes: \n";
    for (let i = 0; i < user.runes.length; i++) {
        text+=runeNames[i]+": "+user.runes[i]+"\n"
    }
    text+="```"
    functions.sendMessage(message.channel, text)
}