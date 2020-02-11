
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.calcTime(user.cooldowns.smeltall, ts) > 0) { return functions.replyMessage(message, "Be patient! Wait " + functions.displayTime(user.cooldowns.smeltall, ts)) }
    let prevmats = user.materials
    let prevmoney = user.money
    let prevxp = user.xp
    if (Object.keys(user.inventory).length == 0) { return functions.sendMessage(message.channel, "There's nothing in your inventory that matches the selected filters... ") }
    functions.setCD(user, ts, smeltallcd * 60, "smeltall")
    return functions.itemFilter(message, user, { "fav": false }).then(smeltItems => {
        if (smeltItems == false) { return }
        let delarr = []
        let count = 0
        for (var i = 0; i < smeltItems.length; i++) {
            let weapon = smeltItems[i]
            if (weapon.rarity == "Unique" || weapon.rarity == 9 || user.weapon._id == weapon._id) { continue }
            delarr.push(weapon._id)
            functions.smeltItem(user, weapon, true, true)
            count += 1
        }
        functions.deleteObjects("itemData", { "_id": {$in: delarr}})
        if (count == 0) { return functions.replyMessage(message, "You do not have any items to smelt!") }
        functions.sendMessage(message.channel, "You have smelted " + count + " items for " + user.materials-prevmats + " materials, $" + user.money - prevmoney + ", and " + user.xp-prevxp + " xp.")
    })
}