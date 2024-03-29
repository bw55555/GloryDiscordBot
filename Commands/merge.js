
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Choose two IDs to merge them! ex. !merge 12345 67890")
        return
    }
    if (words.length == 2) {
        functions.replyMessage(message, "Choose another ID to merge the first item with!")
        return
    }
    if (functions.isCD(user, ts, "merge")) { return functions.replyMessage(message, "You cannot merge now. Try again in " + functions.displayTime(user.cooldowns.merge, ts)) }
    let weaponid = parseInt(words[1])
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The first weapon id must be an integer"); return; }
    let weaponid2 = parseInt(words[2])
    if (isNaN(weaponid2)) { return functions.replyMessage(message, "The second weapon id must be an integer"); return; }
    if (weaponid == weaponid2) {
        return functions.replyMessage(message, "You cannot merge an item with itself."); return;
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
        if (wep1.owner != user._id) {
            functions.replyMessage(message, "You do not own the first item!")
            return
        }
        if (wep2.owner != user._id) {
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
        
        let extratime = (rarity < 2) ? 0 : Math.pow(2, rarity - 2) * 60 * 15
        let wepatk = wep1.attack
        let wepdef = wep1.defense
        if (wep1.merge >= 10 || (raritystats[rarity] - (wepatk + wepdef) == 0 && rarity == 8)) {
            functions.replyMessage(message, "The first item cannot be upgraded any further!")
            return
        } 
        let y = Math.ceil((raritystats[rarity] - (wepatk + wepdef)) / (10 - wep1.merge))
        wep1.merge += 1;
        if ((raritystats[rarity] - (wepatk + wepdef) == 0 || wep1.merge >= 10) && wep1.rarity != 8) { y += 1; }
        let amt = Math.floor(Math.random() * (y + 1));
        wep1.attack += amt;
        wep1.defense += y - amt;
        functions.replyMessage(message, wep1.name + " (" + wep1._id + ")'s stats has increased by " + (wep1.attack - wepatk) + " Attack and " + (wep1.defense - wepdef) + " Defense!")
        if ((raritystats[rarity] - (wep1.attack + wep1.defense) < 0 || wep1.merge >= 10) && wep1.rarity != 8) {
            wep1.merge = 0
            wep1.rarity += 1;
            functions.sendMessage(message.channel, "It is now a " + rarities[wep1.rarity] + " weapon!")
        }
        functions.completeQuest(user, "merge", { "item": wep1, "sacrifice": wep2 }, 1)
        functions.deleteItem(wep2._id)
        functions.setItem(wep1)
        if (functions.hasSkill(user, 35)) {
            functions.setCD(user, ts, extratime / 2, "merge")
        } else {
            functions.setCD(user, ts, extratime, "merge")
        }
    })
}
