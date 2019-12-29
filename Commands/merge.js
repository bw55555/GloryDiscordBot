var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Choose two IDs to merge them!")
        return
    }
    if (words.length == 2) {
        functions.replyMessage(message, "Choose another ID to merge the first item with!")
        return
    }
    if (functions.calcTime(user.cooldowns.merge, ts) > 0) { return functions.replyMessage(message, "You cannot merge now. Try again in " + functions.displayTime(user.cooldowns.merge, ts)) }
    let weaponid = words[1]
    let weaponid2 = words[2]
    if (weaponid == weaponid2) {
        functions.replyMessage(message, "You cannot merge an item with itself.")
    }
    return Promise.all([functions.getItem(weaponid), functions.getItem(weaponid2)]).then(ret => {
        let wep1 = ret[0]
        let wep2 = ret[1]
        if (wep1 == false) {
            functions.replyMessage(message, "The first item does not exist!")
            return
        }
        if (wep2 == false) {
            functions.replyMessage(message, "The second item does not exist!")
            return
        }
        if (user.inventory[wep1._id] != wep1._id) {
            functions.replyMessage(message, "You do not own the first item!")
            return
        }
        if (user.inventory[wep2._id] != wep2._id) {
            functions.replyMessage(message, "You do not own the second item!")
            return
        }
        if (wep1._id == user.weapon._id || wep2._id == user.weapon._id) {
            functions.replyMessage(message, "You cannot merge your equipped weapon!")
            return
        }
        let rarity = wep1.rarity
        let rarity2 = wep2.rarity
        if (rarity == "Unique" || rarity2 == "Unique") {
            functions.replyMessage(message, "You cannot merge an unique weapon!")
            return
        }
        if (rarity == 9 || rarity2 == 9) {
            functions.replyMessage(message, "You cannot merge a GLORY weapon!")
            return
        }
        if (rarity != rarity2) {
            functions.replyMessage(message, "You must merge weapons of the same rarity!")
            return
        }
        if (wep1.merge >= 10) {
            functions.replyMessage(message, "The first item cannot be upgraded any further!")
            return
        }
        if (raritystats[rarity] - (wepatk + wepdef))
        let extratime = (rarity < 2) ? 0 : Math.pow(2, rarity - 2) * 60 * 15
        let wepatk = wep1.attack
        let wepdef = wep2.defense
        let y = (raritystats[rarity] - (wepatk + wepdef)) / (10 - wep1.merge)
        wep1.merge += 1;
        if (wep1.merge >= 10 && wep1.rarity != 8) { y+=1 }
        for (let x = 0; x < y; x++) {
            let chance = Math.random()
            if (chance > 0.5) {
                wep1.attack += 1;
            } else {
                wep1.defense += 1;
            }
        }
        functions.replyMessage(message, wep1.name + " (" + wep1._id + ")'s stats has increased by " + (wep1.attack - wepatk) + " Attack and " + (wep1.defense - wepdef) + " Defense!")
        if (wep1.merge >= 10 && wep1.rarity != 8) {
            wep1.merge = 0
            wep1.rarity += 1;
            functions.sendMessage(message.channel, "It is now a " + wep1.rarity + " rarity weapon!")
        }
        delete user.inventory[weaponid2];
        functions.deleteItem(wep2._id)
        functions.setItem(wep1)
        functions.setCD(user, ts, extratime, "merge")
        if (functions.hasSkill(user, 35)) {
            functions.setCD(user, ts, extratime / 2, "merge")
        }
    })
}
