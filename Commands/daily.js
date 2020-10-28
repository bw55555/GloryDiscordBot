
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (functions.isCD(user, ts, "daily")) {
        return functions.sendMessage(message.channel, 'Your next daily will be ready ' + functions.displayTime(user.cooldowns.daily, ts) + '.'); //already gotten, scammer
    }
    functions.setCD(user, ts, "daily", "daily")//Sets daily as L
    let boxNumber = user.ascension + 1
    user.consum.box += boxNumber; //gives you one box
    let honorget = 10 * Math.floor(user.ascension / 5);
    if (honorget <= 0) { honorget = 1 }
    user.honor += honorget;
    functions.sendMessage(message.channel, "You received " + boxNumber + " mysterious box(es) and "+honorget + " honor!");
    functions.completeQuest(user, "daily", {}, 1)
    user.glory += 0.05
}
