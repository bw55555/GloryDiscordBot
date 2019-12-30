var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.calcTime(user.cooldowns.smeltall, ts) > 0) { return functions.replyMessage(message, "Be patient! Wait " + functions.displayTime(user.cooldowns.smeltall, ts)) }
    let totalmaterials = 0
    let totalmoney = 0
    let totalxp = 0
    functions.setCD(user, ts, smeltallcd * 60, "smeltall")
    return functions.itemFilter(message, user, { "fav": false }).then(smeltItems => {
        if (smeltItems == false) { return }
        let count = 0
        for (var i = 0; i < smeltItems.length; i++) {
            let weapon = smeltItems[i]
            if (weapon.rarity == "Unique" || weapon.rarity == 9 || user.weapon._id == weapon._id) { continue }
            let itemRewards = functions.smeltItem(user, weapon)
            if (isNaN(itemRewards[0]) || isNaN(itemRewards[1]) || isNaN(itemRewards[2])) {
                continue
            }
            totalxp += itemRewards[0]
            totalmoney += itemRewards[1]
            totalmaterials += itemRewards[2]
            count += 1
        }
        if (count == 0) { return functions.replyMessage(message, "You do not have any items to smelt!") }
        functions.sendMessage(message.channel, "You have smelted " + count + " items for " + totalmaterials + " materials, $" + totalmoney + ", and " + totalxp + " xp.")
    })
}