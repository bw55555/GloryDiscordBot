
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        words.splice(0, 2);
        const filter = m => m.author.id == message.author.id
        const collector = message.channel.createMessageCollector(filter, { idle: 60000, time:300000 });
        var curr = "name"
        var name, conditions = [], reward;
        var condition, description, total, extra;
        functions.sendMessage(message.channel, "At any time, type `exit` to stop. \nPlease enter a name for the quest.");
        collector.on('collect', m => {
            let text = "";
            if (m.content == "exit") {
                collector.stop("User Terminated")
                return
            }
            if (curr == "name") {
                curr = "condition"
                text = "Please enter a condition. (ex. vote)";
                name = m.content;
            } else if (curr == "condition") {
                curr = "description"
                text = "Please enter a description for the condition. (ex. Vote 7 times in a row.) ";
                condition = m.content;
            } else if (curr == "description") {
                curr = "total"
                text = "Please enter the number of times the condition needs to be completed. (ex. 1)";
                description = m.content;
            } else if (curr == "total") {
                curr = "nextra"
                text = "Do you want to add a special condition? (yes or no)";
                total = m.content;
            } else if (curr == "nextra") {
                conditions.push(functions.addQuestCondition(condition, description, total, extra));
                if (m.content.toLowerCase() == "yes") {
                    curr = "extra"
                    text = "Please enter a special condition. (ex. votestreak >= 7) ";
                }
                else {
                    curr = "next"
                    text = "Do you want to add another condition? (yes or no)"
                }
            } else if (curr == "extra") {
                curr = "nextra"
                text = "Do you want to add another special condition? (yes or no)";
                let questwords = message.content.trim().split(/\s+/)
                if (words.length < 3) { text = "The special condition must follow [conditionName] [operator] [value]. Do you want to add another special condition? (yes or no)"; }
                else if (["=", ">", "<", "<=", ">="].indexOf(questwords[1]) == -1) { text = "Incorrect operator. Do you want to add another special condition? (yes or no)"; }
                else {
                    extra[words[0]] = { "value": words[2], "operator": words[1] }
                }
            } else if (curr == "next") {
                conditions.push(functions.addQuestCondition(condition, description, total, extra));
                if (m.content.toLowerCase() == "yes") {
                    curr = "condition"
                    text = "Please enter a condition. (ex. vote)";
                }
                else {
                    curr = "reward"
                    text = "Please enter a reward in JSON format. (ex. {\"money\":100})"
                }
            } else if (curr == "reward") {
                reward = JSON.parse(m.content);
                functions.getUser(target._id).then(t => { functions.makeQuest(t, name, conditions, reward); functions.setUser(t) })
                collector.stop("complete")
            } 
            functions.sendMessage(message.channel, text)
            //console.log(collector)
            //collector.resetTimer({"time": 60000, "idle": 60000})
        });
        collector.on('end', (collected, reason) => {
            if (reason == "complete") { functions.sendMessage(message.channel, "The quest was given.") }
            else { functions.sendMessage(message.channel, "Failed to make a quest. Please try again. \nReason: " + reason) }
        });
        functions.setUser(target)
        return
    });
}