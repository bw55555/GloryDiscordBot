
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        words.splice(0, 2);
        const filter = m => m.author.id == message.author.id
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        var curr = "name"
        var name, conditions, reward;
        var condition, description, total, extra;
        functions.sendMessage(message.channel, "Please enter a name for the quest.");
        collector.on('collect', m => {
            if (m.content == "exit") {
                collector.stop("User Terminated")
                return
            }
            if (curr == "name") {
                curr = "condition"
                functions.sendMessage(message.channel, "Please enter a condition. (ex. vote)");
                name = m.content;
            } else if (curr == "condition") {
                curr = "description"
                functions.sendMessage(message.channel, "Please enter a description for the condition. (ex. Vote 7 times in a row.) ");
                condition = m.content;
            } else if (curr == "description") {
                curr = "total"
                functions.sendMessage(message.channel, "Please enter the number of times the condition needs to be completed. (ex. 1)");
                condition = m.content;
            } else if (curr == "total") {
                curr = "extra"
                functions.sendMessage(message.channel, "Please enter special conditions in JSON format. (ex. {\"votestreak\": 7}) ");
                condition = JSON.parse(m.content);
            } else if (curr == "extra") {
                curr = "next"
                functions.sendMessage(message.channel, "Do you want to add another condition? (yes or no)");
                extra = m.content;
            } else if (curr == "next") {
                if (m.content == "yes") {
                    curr = "condition"
                    functions.sendMessage(message.channel, "Please enter a condition. (ex. vote)");
                    conditions.push(functions.addQuestCondition(condition, description, total, extra));
                }
                else {
                    curr == "reward"
                    functions.sendMessage(message.channel, "Please enter a reward in JSON format. (ex. {\"money\":100})")
                }
            } else if (curr == "reward") {
                reward = m.content;
                functions.getUser(target._id).then(t => { functions.makeQuest(t, name, conditions, reward); functions.setUser(t) })
            } 
            console.log(collector)
            collector.resetTimer({"time": 60000, "idle": 60000})
        });
        collector.on('end', (collected,reason) => {
            functions.sendMessage(message.channel,"Failed to make a quest. Please try again. \nReason: "+reason)
        });
        functions.setUser(target)
        return
    });
}