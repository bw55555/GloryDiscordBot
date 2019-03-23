var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.toUpperCase().split(/\s+/)
    if (quizData[0] == false) { return functions.replyMessage(message, "There is no quiz going on right now...") }
    
    if (words[1] == "WORD") {
        if (words[2] == quizData[0]) {
            functions.replyMessage(message, "Correct! Quiz ended. ")
            quizData[0] = false
        }
        functions.sendMessage(bot.guilds.get("536599503608872961").channels.get("549403807767855112"), id + "|" + message.content.toUpperCase())
        functions.sendMessage(bot.guilds.get("536599503608872961").channels.get("549403807767855112"), "Quiz ended. Claimed by: "+id)
        return
    }
    let quizanswers = ("~" + quizData[0]).split("")
    let qno = parseInt(words[1])
    if (isNaN(qno)) { return functions.replyMessage(message, "The question number must be an integer!") }
    if (qno < 1 || qno >= quizanswers.length) { return functions.replyMessage(message, "The question number must be valid!") }
    if (quizData[qno][id] == undefined) {
        quizData[qno][id] = 0
    }
    if (quizData[qno][id] > 3) {
        return functions.replyMessage(message, "You have already guessed 3 times for this question :(")
    }
    quizData[qno][id] += 1
    if (words[2] == undefined || words[2].length>1 || !(/^[a-zA-Z]/.test(words[2]))) {
        return functions.replyMessage(message, "The answer to each question is a single character. ")
    }

    if (words[2] == quizanswers[qno]) {
        functions.replyMessage(message, "Correct!")
        if (quizData[qno].claim==undefined && quizData[qno][id]==1) {
            quizData[qno].claim=id
        }
    }
    else {
        functions.replyMessage(message,"Wrong!")
    }
    
}