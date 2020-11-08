
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    let time = 0;
    if (words[1] == "-time") {
        time = functions.extractTime(message, words[2])
        if (time === false) { return }
        words.splice(1, 2)
    }
    if (time > 0) { functions.replyMessage(message, "Boss will be summoned in " + functions.displayTime(time, 0)) }
    bot.setTimeout(function () {
        return Promise.all([functions.getObject("mobData", "world")]).then(ret => {
            let raid = ret[0];
            if (raid == false) {
                raid = { "_id": "world" };
                let level = undefined
                if (words.length > 1) {
                    level = parseInt(words[1])
                    if (isNaN(level) || level <= 0) { return functions.replyMessage(message, "Please specify a level.") }
                }
                functions.summon(raid, level, 200, 400, "Fallen Angel", 'https://i.imgur.com/InedjHz.jpg')
            } else if (words.length == 1) {
                functions.summon(raid);
            } else {
                    let level = parseInt(words[1])
                    if (isNaN(level) || level <= 0) { return functions.replyMessage(message, "Please specify a level.") }
                    functions.summon(raid, level)
            }
            functions.setObject("mobData", raid)
            functions.replyMessage(message, "World boss summoned. It is level " + raid.level + "!")
        })
    }, time)
}