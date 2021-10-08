module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user.runes == undefined) { user.runes = [0, 0, 0, 0, 0, 0, 0] }
    while (user.runes.length < 7) { user.runes.push(0) }
    let text = "```\nYour Runes: \n";
    for (let i = 0; i < user.runes.length; i++) {
        text+=runeNames[i]+": "+user.runes[i]+"\n"
    }
    text+="```"
    functions.sendMessage(message.channel, text)
}