var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    functions.deleteMessage(message);
    if (words[1] == undefined) { return functions.dmUser(message, "All easter eggs are 7 characters long!") }
    let attempt = words[1].toUpperCase()
    if (attempt.length != 7) {
        return functions.dmUser(message, "All easter eggs are 7 characters long!")
    }
    if (eggData[attempt] == undefined) { return functions.dmUser(message, "You tried this code... and nothing happened") }
    let reward = eggData[attempt].reward
    if (eggData[attempt].claimed == true) { return functions.dmUser(message, "This code has been claimed already!") }
    if (reward == "item") {
        let rewardItemData = eggData[attempt].amount
        functions.generateItem(id, itemData.next, rewardItemData.attack, rewardItemData.defense, rewardItemData.rarity, rewardItemData.name, rewardItemData.modifiers)
    }
    if (userData[id][reward] != undefined) { userData[id][reward] += eggData[attempt].amount }
    if (userData[id].consum[reward] != undefined) { userData[id].consum[reward] += eggData[attempt].amount }
    if (attempt != "EXAMPLE") { eggData[attempt].claimed = true }
    functions.dmUser(message, text)
}