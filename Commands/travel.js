
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) { return functions.replyMessage(message, "Please specify a place to travel to!") }
    let word2 = words[1].toLowerCase();
    if (functions.isCD(user, ts, "travel")) { return functions.replyMessage(message, "The teleport network is still cooling down... Please try again in "+functions.displayTime(user.cooldowns.travel, ts))}
    if (word2 == "city") {
        user.location = word2
        functions.replyMessage(message, "You have returned to the city!")
    } else if (word2 == "guild") {
        user.location = word2
        functions.replyMessage(message, "Welcome to the guild hall!")
    } else if (word2 == "world") {
        user.location = word2
        functions.replyMessage(message, "Welcome to the world boss!")
    } else if (word2 == "event") {
        user.location = word2
        functions.replyMessage(message, "Welcome to the event raid!")
    } else if (word2 == "forest" || word2 == "sea" || word2 == "mountain" || word2 == "heaven" || word2 == "hell") {
        let key = words[2];
        if (key == undefined) { key = getRandomKey() }
        key = key.toUpperCase()
        if (key.length != 7) { return functions.replyMessage(message, "The key must have 7 characters!") }
        if (!isChar(key)) { return functions.replyMessage(message, "The key must consist of characters A-Z or 0-9!") }
        let newloc = word2 + "-" + key
        return functions.getObject("mobData", newloc).then(raid => {
            user.location = newloc
            let text = "You have travelled to location " + newloc + "!\n"
            if (raid == false) {
                
                raid = {}
                raid._id = user.location
                raid.location = word2
                functions.locationsummon(raid)
                text += "A boss has been summoned! It is level " + raid.level + "!";
                functions.setObject("mobData", raid)
            }
            functions.replyMessage(message, text)
        })
    } else {
        return functions.replyMessage(message, "This location does not exist!")
    }
    functions.setCD(user, ts, 30, "travel")
}
function isChar(s) {
    for (let i = 0; i < s.length; i++) {
        let x = s.charCodeAt(i)
        if (x < 48 || (x > 57 && x < 65) || x > 90) { return false}
    }
    return true;
    
}
function getRandomKey() {
    let key = ""
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(55 + Math.random() * 36)
        if (x < 65) { x -= 7 }
        key += String.fromCharCode(x)
    }
    return key
}