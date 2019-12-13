var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //if (admins.indexOf(id)==-1){return}
    if (user.consum.phoenixfeather == 0) {
        functions.replyMessage(message, "You have no Phoenix Feathers!");

        return
    }
    if (words.length == 1) {
        if (user.dead === false) {
            functions.replyMessage(message, "You're not dead. Why do you need to rez?");
            return;
        }
        //user.xp = 0;
        user.currenthealth = user.health;
        user.dead = false;
        //user.shield = ts + 60000
        functions.replyMessage(message, "You have used a Phoenixfeather and rezzed yourself!");
        user.consum.phoenixfeather -= 1
    }
}