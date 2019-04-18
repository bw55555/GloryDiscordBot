var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (userData[id] != undefined){
        functions.replyMessage(message, "You already have an account!")
        return;
    }
//creates profile if none exists
    functions.checkProps(message)

functions.replyMessage(message, "Welcome to Glory!\nTo get started type `!help` to see all the commands available, or use `!tutorial` to see the official glory tutorial!\n Go obtain your Glory!")

}
