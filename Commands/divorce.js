var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let divorcee = user.marry;
    if (user.marry == "None") {
        return;
    }
    user.marry = "None";
    functions.setProp("userData", { _id: divorcee }, { $set: {"marry": "None"} })
    functions.sendMessage(message.channel, "<@" + divorcee + ">, <@" + id + "> has divorced you. Although you were probably going to do it if they weren't. 💔");
}