var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (userData[id].dead === true) {
        functions.replyMessage(message, "Corpses can't pelt others with eggs!");
        return;
    }
    if (userData[id].shield > ts) { return functions.replyMessage(message, "You can't pelt someone while shielded!") }
    //console.log(words);
    console.log(message + "|" + id)
    let target = functions.validate(message)
    if (target == false) { return; }
    if (userData[id].consum.egg <= 0) {
        functions.replyMessage(message, "You have no eggs! Buy them in the shop!");
        return;
    }
    if (target == id) {
        functions.replyMessage(message, "You just SMACKED an egg into your own face! :/");
    }
    functions.consumGive(id, "egg", -1);
    userData[target].currenthealth -= 1;
    rmessage = ""

    let luck = Math.random();
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
        if (userData[target].burn == undefined) { userData[target].burn = 0}
        userData[target].burn += 4;
        rmessage += "It was a Flaming Egg! <@" + target + "> has been set on fire!"
    }
    else if (luck > 0.4){
        userData[target].currenthealth -= Math.floor(userData[target].health/7)
        if (userData.currenthealth < 0){
            userData.currenthealth = 1;
        }
        rmessage += "It was a Poisonous Egg! <@" + target + "> took **" + Math.floor(userData[target].health/7) + "** damage!"
    }
    else if (luck > 0.3){
        rmessage += "It was just an Egg! <@" + target + "> took 1 damage!"
    }
    else if (luck > 0.15){
        functions.consumGive(target, "egg", 1)
        rmessage += "It was just an Egg! <@" + target + "> caught it and looks awkwardly at you!"
    }
    else {
        if (target == bot.user.id) { target = id}
        if (userData[target].dead == false) {
            userData[target].currenthealth = 0
            userData[target].dead = true;
        }
        rmessage += "It was just an Egg! An evil bunny hatched from the egg and attacked <@" + target + ">. They died in a flurry of claws."
    }
    functions.sendMessage(message.channel, "https://tenor.com/view/miripaskal-purim2018-egg-gif-11229487" + "\n<@" + id + "> pelted <@" + target + "> with an egg!\n" + rmessage
    )
    functions.dmUser(target, "https://tenor.com/view/miripaskal-purim2018-egg-gif-11229487" + "\n<@" + id + "> pelted you with an egg!\n" + rmessage)
}