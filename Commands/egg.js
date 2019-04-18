var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    functions.deleteMessage(message);
    if (words[1] == undefined) { return functions.replyMessage(message, "All easter eggs are 7 characters long!") }
    let attempt = words[1].toUpperCase()
    if (attempt.length != 7) {
        return functions.replyMessage(message, "All easter eggs are 7 characters long!")
    }
    if (eggData[attempt] == undefined) { return functions.replyMessage(message, "You tried this code... and nothing happened") }
    let reward = eggData[attempt].reward
    if (eggData[attempt].claimed == true) { return functions.replyMessage(message, "This code has been claimed already!") }
    if (reward == "item") {}
    if (userData[id][reward] != undefined) { userData[id][reward] += eggData[attempt].amount }
    if (userData[id].consum[reward] != undefined) { userData[id].consum[reward] += eggData[attempt].amount }
    if (attempt != "EXAMPLE") { eggData[attempt].claimed = true }
    functions.dmUser(message, text)
}