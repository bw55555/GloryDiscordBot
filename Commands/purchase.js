
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    shieldtimes = [1, 2, 4, 6, 8, 12]
    shieldprices = [20000, 40000, 100000, 160000, 240000, 400000]
    let purchaseID = parseInt(words[1])
    let amount = parseInt(words[2])
    if (isNaN(amount) || amount < 0) amount = 1
    if (isNaN(purchaseID) == true) {
        functions.replyMessage(message, "Make sure you're selecting a real item!")
        return;
    }

    if (purchaseID >= 0 && purchaseID <= 5) {
        if (functions.calcTime(user.cooldowns.purchase, ts) > 0) { return functions.replyMessage(message, "Please wait " + functions.displayTime(user.cooldowns.purchase, ts)) }
        if (user.money < shieldprices[purchaseID]) {
            functions.replyMessage(message, "You do not have enough money to buy this!")
            return;
        }
        user.money -= shieldprices[purchaseID]
        user.shield = ts + shieldtimes[purchaseID] * 1000 * 60 * 60
        functions.setCD(user, ts, shieldtimes[purchaseID] * 3600, "purchase");//+1000*60*60
        functions.replyMessage(message, "You successfully bought a " + shieldtimes[purchaseID] + " hour shield for $" + shieldprices[purchaseID] + "!")
    }
    else if (purchaseID == 101) {
        if (user.materials < 400 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 400 * amount
        text = "You successfully spent " + 400 * amount + " materials for RANDOM ITEMS...\n"
        text += functions.craftItems(message, user, -1, -1, amount)
        if (amount != 1) { functions.replyMessage(message, text) }
    }

    else if (purchaseID == 102) {
        if (user.materials < 125 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 125 * amount
        let text = "You successfully spent " + 125 * amount + " materials for SIMPLE CRAFTING...\n"
        text += functions.craftItems(message, user, 0, 2, amount)
        if (amount != 1) { functions.replyMessage(message, text) }

    }

    else if (purchaseID == 103) {
        if (user.materials < 3125 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 3125 * amount
        let text = "You successfully spent " + 3125 * amount + " materials for MODERATE CRAFTING and got:\n"
        text += functions.craftItems(message, user, 2, 4, amount)
        if (amount != 1) { functions.replyMessage(message, text) }
    }

    else if (purchaseID == 104) {
        if (user.materials < 78125 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 78125 * amount
        let text = "You successfully spent " + 78125 * amount + " materials for EXQUISITE CRAFTING...\n"
        text += functions.craftItem(message, user, 4, 6, amount)
        if (amount != 1) { functions.replyMessage(message, text) }
    }

    else if (purchaseID == 200) {
        if (user.materials < 100000 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 100000 * amount
        functions.replyMessage(message, "You successfully spent " + 100000 * amount + " materials for an Explosion! Use !explosion to cast it!")
        user.consum.explosion += amount;

    }

    else if (purchaseID == 201) {
        if (user.materials < 5000 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 5000 * amount
        functions.replyMessage(message, "You successfully spent " + 5000 * amount + " materials for a Phoenix Feather! Use `!feather` to rez yourself!")
        user.consum.phoenixfeather += amount;
    }

    else if (purchaseID == 202) {
        if (user.materials < 10000 * amount) {
            functions.replyMessage(message, "You do not have enough materials to buy this!")
            return;
        }
        user.materials -= 10000 * amount
        functions.replyMessage(message, "You successfully spent " + 10000 * amount + " materials for a weapon nametag! Use `!nametag` to rename something!")
        user.consum.nametag += amount;
    }

    else if (purchaseID == 20) {

        functions.replyMessage(message, "This feature is on hold!")
        return;

        /*if (user.money < 500000*amount) {
            functions.replyMessage(message, "You do not have enough money to buy this!")
            return;
        }
        user.money -= 500000*amount
        functions.replyMessage(message, "You successfully spent $" + 500000*amount + " for a skill reroll! Use `!reroll [id]` to transform a skill back into a skillpint!")
        user.consum.reroll += amount;*/

    }
    else {
        functions.replyMessage(message, "Make sure you're selecting a real item!")
    }
}
