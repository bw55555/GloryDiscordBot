var functions = require("../Utils/functions.js")
module.exports = function (message) {
    functions.replyMessage(message, "Let's pray it works");

    let id = message.author.id;
    let ts = message.createdTimestamp;
    if (admins.indexOf(id)==-1){return}
    for (var i in userData) {
        functions.consumGive(i, "box", userData[i].box);
        functions.consumGive(i, "explosion", userData[i].explosion);
        functions.consumGive(i, "nametag", userData[i].nametag);
        functions.consumGive(i, "sp", userData[i].sp);
        functions.consumGive(i, "phoenixfeather", userData[i].phoenixfeather);
        functions.consumGive(i, "reroll", userData[i].reroll);

        delete userData[i].box;
        delete userData[i].explosion;
        delete userData[i].nametag;
        delete userData[i].sp;
        delete userData[i].phoenixfeather;
        delete userData[i].reroll;
    }
    functions.replyMessage(message, "Chaos Complete! 1234567");
}