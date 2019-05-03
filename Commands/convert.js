var functions = require("../Utils/functions.js")
module.exports = function (message) {
    return;
    functions.replyMessage(message, "Let's pray it works");
    
    let id = message.author.id;
    let ts = message.createdTimestamp;
    if (devs.indexOf(id)==-1){return}
    for (var i in userData) {
        userData[i].consum = {};
        functions.consumGive(i, "box", userData[i].box);
        functions.consumGive(i, "explosion", userData[i].explosion);
        functions.consumGive(i, "nametag", userData[i].nametag);
        functions.consumGive(i, "sp", userData[i].sp);
        functions.consumGive(i, "phoenixfeather", userData[i].phoenixfeather);
        functions.consumGive(i, "reroll", userData[i].reroll);
        userData[i].consum.egg = 0
        userData[i].consum.eggsplosion = 0
        userData[i].attack += userData[i].ascension * 10;
        userData[i].defense += userData[i].ascension * 10;
        userData[i].health += userData[i].ascension * 100
        delete userData[i].box;
        delete userData[i].explosion;
        delete userData[i].nametag;
        delete userData[i].sp;
        delete userData[i].phoenixfeather;
        delete userData[i].reroll;
    }
    functions.replyMessage(message, "Chaos Complete! 1234567");
}