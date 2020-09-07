const mainQuestData = require("../Assets/mainQuestData.json")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.quests.length == 0) { return functions.replyMessage(message, "You have no quests!") }
    let claimid = parseInt(words[1])
    if (isNaN(words[1])) { return functions.replyMessage(message, "Please give a positive integer id!") }
    claimid--;
    if (claimid < 0 || claimid >= user.quests.length) { return functions.replyMessage(message, "This quest id does not exist!") }
    for (var j = 0; j < user.quests[claimid].conditions.length; j++) {
        let op = user.quests[claimid].conditions[j].operator
        let c = user.quests[claimid].conditions[j].current
        let t = user.quests[claimid].conditions[j].total
        if (op == "=" && !(c == t)) { return functions.replyMessage(message, "You have not completed this quest yet!") }
        if (op == ">=" && !(c >= t)) { return functions.replyMessage(message, "You have not completed this quest yet!") }
        if (op == "<=" && !(c <= t)) { return functions.replyMessage(message, "You have not completed this quest yet!") }
        if (op == "<" && !(c < t)) { return functions.replyMessage(message, "You have not completed this quest yet!") }
        if (op == ">" && !(c > t)) { return functions.replyMessage(message, "You have not completed this quest yet!") }
    }

    for (var key in user.quests[claimid].reward) {
        functions.JSONoperate(user, key, "add", user.quests[claimid].reward[key])
    }
    user.quests.splice(claimid, 1);
    let text = "You have completed the quest `" + user.quests[claimid].name + "`!"
    if (user.quests[claimid].mqid != undefined && user.quests[claimid].mqid < mainQuestData.length - 1) {
        text += "\n"+ functions.adminQuest(mainQuestData[user.quests[claimid].mqid+1], user)
    }
    functions.completeQuest(user, "claimquest", {}, 1)
    functions.replyMessage(message, text)
    
}