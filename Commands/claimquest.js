
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
        if (user.quests[claimid].conditions[j].current < user.quests[claimid].conditions[j].total) { return functions.replyMessage(message, "You have not completed this quest yet!") }
    }
    for (var key in user.quests[claimid].reward) {
        user[key] += user.quests[claimid].reward[key];
    }
    functions.replyMessage(message, "You have completed the quest `" + user.quests[claimid].name + "`!")
    user.quests.splice(claimid, 1);
}