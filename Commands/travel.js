
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) { return functions.replyMessage(message, "Please specify a place to travel to!") }
    let word2 = words[1].toLowerCase();
    if (functions.isCD(user, ts, "travel")) { return functions.replyMessage(message, "The teleport network is still cooling down... Please try again in " + functions.displayTime(user.cooldowns.travel, ts)) }
    if (user.dead) { return functions.replyMessage(message, "You cannot teleport while dead!") }
    let text = ""
    if (word2 == "list") {
        let toSendEmbed = {
            embed: {
                title: "Locations",
                color: 0xF1C40F,
                fields: [
                    {
                        name: "Free Areas",
                        value: "City: The city\nGuild: The guild raid\nWorld: The world raid\nEvent: The event raid",
                    },
                    {
                        name: "Instanced Areas",
                        value: "Graveyard: Recommended Level 5\nForest: Recommended Level 25\nCaves: Recommended Level 50\nSea: Recommended Level 75\nTundra: Recommended Level 100\nMountain: Recommended Level 125\nHeaven: Recommended Level 200\nHell: Recommended Level 250\nArena: Custom Level"
                    }
                ]
            }
        }
        return functions.sendMessage(message.channel,toSendEmbed )
    }
    else if (word2 == "city") {
        user.location = word2
        text += "You have returned to the city!"
    } else if (word2 == "guild") {
        if (user.guild == "None") { return functions.replyMessage(message, "You are not in a guild!")}
        user.location = word2
        text += "Welcome to the guild hall!"
    } else if (word2 == "world") {
        user.location = word2
        text += "Welcome to the world boss!"
    } else if (word2 == "event") {
        user.location = word2
        text += "Welcome to the event raid!"
    } else if (Assets.locationraidData[word2] != undefined) {
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
                text += "You have encountered a level " + raid.level + " "+raid.name+"!";
                functions.setObject("mobData", raid)
            }
            functions.completeQuest(user, "travel", {"location": word2}, 1)
            functions.setCD(user, ts, 30, "travel")
            if (!functions.isCD(user, ts, "savestate") && functions.hasSkill(user, 42)) { text += "\nYou have kept your tempo!"; functions.setCD(user, ts, 180, "savestate") } else { user.speed = 0; }
            functions.replyMessage(message, text)
        })
    } else {
        return functions.replyMessage(message, "This location does not exist!")
    }
    if (!functions.isCD(user, ts, "savestate") && functions.hasSkill(user, 42)) { text += "\nYou have kept your tempo!"; functions.setCD(user, ts, 180, "savestate") } else { user.speed = 0; }
    if (text != "") {functions.replyMessage(message, text)}
    functions.completeQuest(user, "travel", { "location": word2 }, 1)
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