var functions = require("../Utils/functions.js")
module.exports = function (message) {
functions.replyMessage(message, "Let's pray it works");

let id = message.author.id;
    let ts = message.createdTimestamp;
    if (admins.indexOf(id) == -1) {//Soo nobody but admins can use it (for now)
        functions.replyMessage(message, "Admin only");
        return
    }
    for (var i in userData) {
        functions.consumGive(i, "box", userData[id].box);
        functions.consumGive(i, "explosion", userData[id].explosion);
        functions.consumGive(i, "nametag", userData[id].nametag);
        functions.consumGive(i, "sp", userData[id].sp);
        functions.consumGive(i, "phoenixfeather", userData[id].phoenixfeather);
        functions.consumGive(i, "reroll", userData[id].reroll);

        delete userData[i].box;
        delete userData[i].explosion;
        delete userData[i].nametag;
        delete userData[i].sp;
        delete userData[i].phoenixfeather;
        delete userData[i].reroll;
    }
    functions.replyMessage(message, "Chaos Complete! 1234567");
}