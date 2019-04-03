var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let target = 0;
    let challenged = 0;
    if (duel.happening != undefined && duel.happening == true && ts - duel.duelStart <= 600000) {
        return functions.sendMessage(message.channel, "A duel is already in session, check back later!");
    }
    if (duel.happening == true && ts - duel.duelStart > 600000) {
        duel = {};
        return functions.sendMessage(message.channel, "The last duel exceeded the ten minute limit. A new one may begin.");
    }
    if (userData[id].dead == true) { return functions.sendMessage(message.channel, "You cannot engage in a duel while dead!"); }

    if (words.length < 2) {
        return functions.replyMessage(message, "Please specify a user to challenge. If you want to issue an open challenge, use '!challenge any'.")
    }
    words.splice(0, 1)

    if (words[0] == "accept") {
        if (duel.chalStart != undefined && (ts - duel.chalStart) >= 60000) {
            return functions.replyMessage(message, "This challenge has expired after a minute without response. Start a new one with '!challenge' followed by your opponent or 'any'!");
        }
        if (duel.opponent == undefined) {
            return functions.replyMessage(message, "No challenges are open right now. Start one with '!challenge' followed by your opponent or 'any'!");
        }
        if (duel.challenger == id) {
            return functions.replyMessage(message, "You cannot accept your own challenge!");
        }
        if (duel.opponent == "any" || duel.opponent == id) {
            duel.opponent = id;
            duel.duelStart = ts;
            duel.happening = true;

            duel.cAtk = userData[duel.challenger].attack;
            duel.cDef = userData[duel.challenger].defense;
            duel.oAtk = userData[duel.opponent].attack;
            duel.oDef = userData[duel.opponent].defense;
            if (userData[duel.opponent].weapon != false && itemData[userData[duel.opponent]] != undefined) {
                duel.oAtk += itemData[userData[duel.opponent]].attack;
                duel.oDef += itemData[userData[duel.opponent]].defense;
            }
            if (userData[duel.challenger].weapon != false && itemData[userData[duel.challenger]] != undefined) {
                duel.cAtk += itemData[userData[duel.challenger]].attack;
                duel.cDef += itemData[userData[duel.challenger]].defense;
            }

            userData[id].cooldowns.heal = Infinity;
            userData[duel.challenger].cooldowns.heal = Infinity;
            return functions.sendMessage(message.channel, "The duel begins now!");
        }
    }
    else if (duel.chalStart != undefined && (ts - duel.chalStart) <= 60000) {
        let timeLeft = 0;
        timeLeft = 60000 - Math.floor((ts - duel.chalStart) / 1000);
        return functions.replyMessage(message, "There is a challenge currently being given. Try again in " + timeLeft + " seconds once the previous challenge expires!");
    }
    if (words[0] == "any") {
        duel.opponent = "any";
        duel.challenger = id;
        duel.chalStart = ts;
        functions.sendMessage(message.channel, "You have started an open challenge to duel. Anyone can respond with '!challenge accept'!");
    }
    else {
        target = functions.validate(message).toString();
        if (target == false) { return functions.sendMessage(message.channel, "This is not a valid user!"); }
        if (target == id) { return functions.sendMessage(message.channel, "You cannot challenge yourself!"); }
        challenged = userData[target];
        if (challenged == undefined) { return functions.sendMessage(message.channel, "This is not a valid user!"); }
        duel.opponent = challenged.id;
        duel.challenger = id;
        duel.chalStart = ts;
        functions.sendMessage(message.channel, "You have challenged " + words[0] + " to a duel! Accept this challenge with '!challenge accept'.")
    }
}