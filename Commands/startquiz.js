var functions=require("../Utils/functions.js")
module.exports = function (message) {
    return;
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    let answer = words[1]
    if (answer == undefined) { return functions.replyMessage(message, "You must specify something for the answer!") }
    quizData = [answer]
    for (var i = 0; i < answer.length; i++) {
        quizData.push({})
    }
    functions.replyMessage(message,"Quiz started!")
}