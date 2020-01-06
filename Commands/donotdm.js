var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    if (user.dmmute != true) {
        user.dmmute = true;
        functions.replyMessage(message, "Glory will no longer DM you for any reason")
    }
    else {
        user.dmmute = false
        functions.replyMessage(message, "Glory will once again DM you for voting and incoming attacks")
    }
}