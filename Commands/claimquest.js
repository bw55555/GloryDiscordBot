var mainQuestData = Assets.mainQuestData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.quests.length == 0) { return functions.replyMessage(message, "You have no quests!") }
    let claimid = parseInt(words[1])
    if (isNaN(words[1])) { return functions.replyMessage(message, "Please give a positive integer id!") }
    claimid--;
    if (claimid < 0 || claimid >= user.quests.length) { return functions.replyMessage(message, "This quest id does not exist!") }
    if (admins.indexOf(message.author.original) == -1 || words[2] != "override") {
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
    }
    for (var key in user.quests[claimid].reward) {
        functions.JSONoperate(user, key, "add", user.quests[claimid].reward[key])
    }
    if (user.quests[claimid].event) { devData.numEventQuests += 1; devData.numEventPresents += user.quests[claimid].reward.present}
    let text = "You have completed the quest `" + user.quests[claimid].name + "`!"
    let mqid = user.quests[claimid].mqid
    user.quests.splice(claimid, 1);
    if (mqid != undefined && mqid != null && mqid < mainQuestData.length - 1) {
        for (let nqid of mainQuestData[mqid].next) {
            text += "\n" + functions.adminQuest(mainQuestData[nqid].quest, user)
        }
    }
    functions.completeQuest(user, "claimquest", {}, 1)
    functions.replyMessage(message, text)
    
}