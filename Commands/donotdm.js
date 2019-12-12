var functions = require("../Utils/functions.js")
module.exports = function (message,user) {
    let id = message.author.id;
    if (userData[id].dmmute != true) {
        userData[id].dmmute = true;
        functions.replyMessage(message, "Glory will no longer DM you for any reason")
    }
    else {
        userData[id].dmmute = false
        functions.replyMessage(message, "Glory will once again DM you for voting and incoming attacks")
    }
}