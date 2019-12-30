var functions = require("../Utils/functions.js")
function upgradeStats(attributeToUpgrade, amount, user) {
    let cost = 0;
    let totalcost = 0
    //console.log(user[attributeToUpgrade])
    let attrcosts = { "attack": 1, "defense": 1, "health": 10 }
    let levelstop = false;
    let moneystop = false;
    let text = ""
    let extrastat = functions.calcExtraStat(user, attributeToUpgrade)
    while (amount > 0) {
        let basestat = user[attributeToUpgrade] - extrastat
        if (basestat < 0) {
            user[attributeToUpgrade] = functions.calcExtraStat(user, attributeToUpgrade)
            basestat = 0
        }
        cost = Math.floor(100 / attrcosts[attributeToUpgrade] * (basestat + attrcosts[attributeToUpgrade]));
        if (user.level <= Math.floor(basestat / attrcosts[attributeToUpgrade])) {
            levelstop = true;
            break
            //functions.replyMessage(message, 'You must be level ' + (Math.floor(user[attributeToUpgrade] / attrcosts[attributeToUpgrade]) + 1) + ' to level up your ' + attributeToUpgrade + ' to ' + (user[attributeToUpgrade] + attrcosts[attributeToUpgrade]) + '. You are level ' + user.level + '!');
        } else if (user.money < cost) {
            moneystop = true;
            break
            //functions.replyMessage(message, 'You need $' + cost + ' to level up your ' + attributeToUpgrade + ' to ' + (user[attributeToUpgrade] + attrcosts[attributeToUpgrade]) + '. You have $' + user.money);
        } else {
            user.money -= cost;
            user[attributeToUpgrade] += attrcosts[attributeToUpgrade];
            totalcost += cost
            amount -= 1;
        }
    }
    let basestat = user[attributeToUpgrade] - extrastat
    if (totalcost > 1) {
        text += 'You spent $' + totalcost + ' increasing your ' + attributeToUpgrade + ' to ' + basestat+"\n";
    }
    if (levelstop == true) {
        text += 'You must be level ' + (Math.floor(basestat / attrcosts[attributeToUpgrade]) + 1) + ' to level up your ' + attributeToUpgrade + ' to ' + (basestat + attrcosts[attributeToUpgrade]) + '. You are level ' + user.level + '!' + "\n";
    }
    if (moneystop == true) {
        text += 'You need $' + cost + ' to level up your ' + attributeToUpgrade + ' to ' + (basestat + attrcosts[attributeToUpgrade]) + '. You have $' + user.money + "\n";
    }
    return text;
}
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (admins.indexOf(id) == -1) { return functions.replyMessage(message,"This command is being temporarily disabled while we fix some bugs")}
    if (words.length == 1) {
        functions.replyMessage(message, "Please specify an attribute to upgrade.");
        return;
    }
    attributeToUpgrade = words[1].toUpperCase();
    var amount = 1;
    let text = ""
    if (words[2] != undefined) {
        amount = parseInt(words[2]);
    }
    if (words[2] == "all") {
        amount = 100;
    }
    if (isNaN(amount)) {
        functions.sendMessage(message.channel, "Please specify an integer amount.");
        return;
    }
    if (attributeToUpgrade == 'ATTACK' || attributeToUpgrade == 'ATK') { //Upgrade Atk
        text += upgradeStats("attack", amount, user)
    }
    else if (attributeToUpgrade == 'DEFENSE' || attributeToUpgrade == 'DEF') { //Upgrade Def
        text += upgradeStats("defense", amount, user)
    }
    else if (attributeToUpgrade == 'HEALTH' || attributeToUpgrade == 'HP') { //Upgrade Health
        text += upgradeStats("health", amount, user)
    }
    else if (attributeToUpgrade == 'ALL') { //Upgrade Health
        text += upgradeStats("attack", amount, user)
        text += upgradeStats("defense", amount, user)
        text += upgradeStats("health", amount, user)
    }
    else { return functions.replyMessage(message, "That is not a valid stat!") }
    functions.replyMessage(message, text)

}
