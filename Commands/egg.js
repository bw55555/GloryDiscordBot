var functions = require("../Utils/functions.js")
module.exports = function (message) {
    return;
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    functions.deleteMessage(message);
    if (words[1] == undefined) { return functions.dmUser(id, "All easter eggs are 7 characters long!") }
    let attempt = words[1].toUpperCase()
    if (attempt.length == 0){
        return functions.dmUser(id, "Find easter eggs before everyone else does to get prizes!")
    }
    if (attempt.length != 7) {
        return functions.dmUser(id, "All easter eggs are 7 characters long!")
    }
    if (eggData[attempt] == undefined) { return functions.dmUser(id, "You tried this code... and nothing happened") }
    let reward = eggData[attempt].reward
    if (eggData[attempt].claimed == true) { return functions.dmUser(id, "This code has been claimed already!") }

    if (eggData[attempt][id] == true) { return functions.dmUser(id, "You have already claimed this egg!") }
    let extratext = ""
    eggData[attempt][id] = true
    if (reward == "item") {
        extratext = "You won an item!"
        let rewardItemData = eggData[attempt].amount
        functions.generateItem(id, itemData.next, rewardItemData.attack, rewardItemData.defense, rewardItemData.rarity, rewardItemData.name, rewardItemData.modifiers)
    } else {
        extratext = "You won " + eggData[attempt].amount + " " +reward+"!"
    }
    if (userData[id][reward] != undefined) { userData[id][reward] += eggData[attempt].amount }
    if (userData[id].consum[reward] != undefined) { functions.consumGive(id, reward, eggData[attempt].amount) }
    if (attempt != "EXAMPLE") { eggData[attempt].claimed = true }
    
    functions.dmUser(id, eggData[attempt].text+"\n"+extratext)
    if (devData.debugenable) { functions.logCommand(message) }
}