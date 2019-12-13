var moment=require("moment")
var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.lastDaily != moment().format('L')) {//Checks if last daily object is L
        user.lastDaily = moment().format('L') //Sets daily as L
        let boxNumber = user.ascension + 1
        user.consum.box += boxNumber; //gives you one box
        functions.sendMessage(message.channel, "You received " + boxNumber + " mysterious box(es)... what could it contain?");
        user.glory += 0.05
    } else {
        functions.sendMessage(message.channel, 'Your next daily will be ready ' + moment().endOf('day').fromNow() + '.'); //already gotten, scammer
        //also, wait time.
    }
}
