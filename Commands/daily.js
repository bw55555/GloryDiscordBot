
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.calcTime(user.cooldowns.daily, ts) < 0) {//Checks if last daily object is L
        user.cooldowns.daily = ts + 24 * 60 * 60 * 1000//Sets daily as L
        let boxNumber = user.ascension + 1
        user.consum.box += boxNumber; //gives you one box
        functions.sendMessage(message.channel, "You received " + boxNumber + " mysterious box(es)... what could it contain?");
        user.glory += 0.05
    } else {
        functions.sendMessage(message.channel, 'Your next daily will be ready ' + functions.displayTime(user.cooldowns.daily, ts) + '.'); //already gotten, scammer
        //also, wait time.
    }
}
