var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (userData[id].dead == true) { return functions.replyMessage(message, "You can't eggsplode something while dead!") }
    if (userData[id].shield > ts) { return functions.replyMessage(message, "You can't eggsplode something while shielded!") }
    if (userData[id].consum.eggsplosion == 0) {
        functions.replyMessage(message, "You have no eggsplosions! Go buy one from the `!blacksmith`")
    }
    if (userData[id].consum.eggsplosion > 0) {
        functions.consumGive(id, "eggsplosion", -1);
        functions.sendMessage(message.channel, "https://tenor.com/view/japan-running-can-bomb-explosion-gif-5949801")
        let count = 0
        for (var target in userData) {
            if (talkedRecently.has(target) && target != id) {
                if (userData[id].dead == true) { continue }
                count++;
                let luck = Math.random();
                let rmessage = ""
                
                if (luck > 0.9) {
                    userData[target].bolster = true;
                    rmessage += "It was a Strong Egg! <@" + target + "> became Bolstered"
                }
                else if (luck > 0.8) {
                    functions.consumGive(target, "phoenixfeather", 1)
                    rmessage += "It was a Fluffy Egg! <@" + target + "> found a feather in the egg! (Don't question it)"
                }
                else if (luck > 0.7) {
                    functions.consumGive(target, "box", 5)
                    rmessage += "It was a Cubed Egg! <@" + target + "> found a 5 boxes in the egg! (Don't question it)"
                }
                else if (luck > 0.6) {
                    functions.generateItem(target, itemData.next, 10, 10, 4, "Egg")
                    rmessage += "It was a Sharp Egg! <@" + target + "> can now use it as a Rare 10/10 Egg weapon!"
                }
                else if (luck > 0.5) {
                    if (userData[target].burn == undefined) { userData[target].burn = 0 }
                    userData[target].burn += 4;
                    rmessage += "It was a Flaming Egg! <@" + target + "> has been set on fire!"
                }
                else if (luck > 0.4) {
                    userData[target].currenthealth -= Math.floor(userData[target].health / 7)
                    if (userData.currenthealth < 0) {
                        userData.currenthealth = 1;
                    }
                    rmessage += "It was a Poisonous Egg! <@" + target + "> took **" + Math.floor(userData[target].health / 7) + "** damage!"
                }
                else if (luck > 0.3) {
                    userData[target].currenthealth -= 1
                    rmessage += "It was just an Egg! <@" + target + "> took 1 damage!"
                }
                else if (luck > 0.15){
                    functions.consumGive(target, "egg", 1)
                    rmessage += "It was just an Egg! <@" + target + "> caught it and looks awkwardly at you!"
                }
                else {
                    if (userData[target].dead == false) {
                        userData[target].currenthealth = 0
                        userData[target].dead = true;
                    }
                    rmessage += "It was just an Egg! An evil bunny hatched from the egg and attacked <@" + target + ">. They died in a flurry of claws."
                }
                text += "<@" + id + "> pelted <@" + target + "> with an egg!\n" + rmessage
                functions.dmUser(target, "https://tenor.com/view/japan-running-can-bomb-explosion-gif-5949801 \n<@" + id + "> pelted you with an egg!\n" + rmessage)
            }
            if (text.length > 1800) {
                functions.sendMessage(message.channel, text)
                text = ""
            }
        }
        functions.sendMessage(message.channel, text + "You've egged " + count + " people!")
    }
}
