
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.isCD(user, ts, "daily")) {
        return functions.sendMessage(message.channel, 'Your next daily will be ready ' + functions.displayTime(user.cooldowns.daily, ts) + '.'); //already gotten, scammer
    }
    functions.setCD(user, ts, functions.secondsUntilReset(ts), "daily")//Sets daily as L
    let boxNumber = user.ascension + 1
    user.consum.box += boxNumber; //gives you one box
    functions.sendMessage(message.channel, "You received " + boxNumber + " mysterious box(es)... what could it contain?");
    functions.completeQuest(user, "daily", {}, 1)
    user.glory += 0.05
}
