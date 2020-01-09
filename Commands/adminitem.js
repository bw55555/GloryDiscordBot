var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id)==-1) {return user}
    let attack = 0
    let defense = 0
    let rarity = 0
    //console.log("Ran")
    if (words.length == 1) {
        functions.sendMessage(message.channel, "Please specify a user.")
        return user
    }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0]
        if (words[1] == "event") { target = "event"}
        if (target == false) { return user }
        let place = 2
        if (words.length < place + 2) {
            functions.sendMessage(message.channel, "Please specify an attack and a defense stat.")
            return user
        }
        attack = parseInt(words[place])
        defense = parseInt(words[place + 1])
        if (isNaN(attack) || isNaN(defense)) {
            functions.sendMessage(message.channel, "Please specify an integer for the attack and defense stats.")
            return user
        }
        if (words.length < place + 3) {
            functions.sendMessage(message.channel, "Please specify a rarity.")
            return user
        }
        rarity = parseInt(words[place + 2])
        if (words[place + 2] == "Unique") { rarity = "Unique" }
        if (words[place + 2] != "Unique" && (isNaN(rarity) || rarity < 0 || rarity > 9)) {
            functions.sendMessage(message.channel, "Please specify an integer between 0 and 9 for the rarity.")
            return user
        }
        let name = rarities[rarity] + " Sword"
        if (words[place + 3] == "-name") {
            let temp1 = message.content.slice(message.content.indexOf("-name"))
            let temp2 = temp1.slice(temp1.indexOf("\"") + 1)
            if (message.content.indexOf("\"") == -1 || temp2.indexOf("\"") == -1) {
                functions.sendMessage(message.channel, "Name must be surrounded by quotation marks.")
                return user
            }
            name = temp2.slice(0, temp2.indexOf("\""))
            if (name == "") {
                functions.sendMessage(message.channel, "The name cannot be blank!")
                return user
            }
        }
        let modifiers = {}
        if (admins.indexOf(id) != -1 && message.content.indexOf("-mod") != -1 && message.content.slice(message.content.indexOf("-mod")).split(" ")[0] == "-mod") {
            let wordsmodifiers = message.content.slice(message.content.indexOf("-mod") + 5).split(" ")
            if (wordsmodifiers.length % 2 == 1) {
                functions.sendMessage(message.channel, "Every modifier must have a corresponding number!")
                return user
            }
            let iterations = wordsmodifiers.length / 2
            for (let i = 0; i < iterations; i++) {
                let modifier = wordsmodifiers[2 * i]
                let modifierstat = parseFloat(wordsmodifiers[2 * i + 1])
                if (allowedmodifiers.indexOf(modifier) == -1) { functions.sendMessage(message.channel, modifier + " is not an allowed modifier.");return user;  }
                if (isNaN(modifierstat)) {
                    functions.sendMessage(message.channel, "Every modifier must have a corresponding float!")
                    return user
                }
                modifiers[modifier] = modifierstat
            }
        }
        let item = functions.generateItem(target, null, attack, defense, rarity, name, modifiers)
        functions.sendMessage(message.channel, "Gave item with id " + item._id + ", attack " + attack + ", defense " + defense + ", rarity " + rarity + ", name " + name + " to <@" + target._id + ">")
        functions.logCommand(message)
        functions.setUser(target)
        return user
    })
}