
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        let curr = "name"
        let name, flavortext ="", conditions = [], reward = {};
        let condition, description, total, extra = {};
        let type;
        let operator;
        if (words.length <= 2) {
            const filter = m => m.author.id == message.author.id
            const collector = message.channel.createMessageCollector(filter, { idle: 60000, time: 300000 });
            functions.sendMessage(message.channel, "At any time, type `exit` to stop. \nPlease enter a name for the quest.");
            collector.on('collect', m => {
                let text = "";  
                if (m.content == "exit") {
                    collector.stop("User Terminated")
                    return
                }
                if (curr == "name") {
                    curr = "flavortext"
                    text = "Please enter flavortext for the quest. (or -noft for no flavortext)";
                    name = m.content;
                } else if (curr == "flavortext") {
                    curr = "type"
                    text = "Is the quest continuous (`c`) or accumulated (`a`). (ex. `have a votestreak of 7` would be continuous and `vote 7 times` would be accumulated.)";
                    if (m.content != "-noft") { flavortext = m.content; }
                }
                else if (curr == "type") {
                    curr = "condition"
                    text = "Please enter a condition. (ex. vote.votestreak >= 7)";
                    if (m.content != "c" && m.content != "a") { text = "Error: Please enter `c` or `a`. \nIs the quest continuous (`c`) or accumulated (`a`). (ex. `have a votestreak of 7` would be continuous and `vote 7 times` would be accumulated.)"; curr = "type"; } else { type = m.content; }

                } else if (curr == "condition") {
                    curr = "description"
                    text = "Please enter a description for the condition. (ex. Vote 7 times in a row.) ";
                    let questwords = m.content.trim().split(/\s+/)
                    if (questwords.length < 3) { text = "The condition must follow [conditionName] [operator] [value]. Please try again."; curr = "condition"; }
                    else if (["<=", ">="].indexOf(questwords[1]) == -1) { text = "Incorrect operator. Please try again."; curr = "condition" }
                    else if (isNaN(parseInt(questwords[2]))) { text = "The total must be an integer. Please try again."; curr = "condition"}
                    else {
                        condition = questwords[0];
                        operator = questwords[1];
                        total = questwords[2];
                    }
                } else if (curr == "description") {
                    curr = "nextra"
                    text = "Do you want to add a special condition? (`yes` or `no`)";
                    description = m.content;
                } else if (curr == "cextra") {
                    curr = "next"
                    text = "Do you want to add another condition? (`yes` or `no`)"
                    extra.special = m.content;
                } else if (curr == "nextra") {
                    if (m.content.toLowerCase() == "yes") {
                        curr = "extra"
                        text = "Please enter a special condition. (ex. votestreak >= 7) ";
                    }
                    else if ((m.content.toLowerCase() == "no")) {
                        curr = "next"
                        text = "Do you want to add another condition? (`yes` or `no`)"
                    } else {
                        text = "Please enter `yes` or `no`."
                    }
                } else if (curr == "extra") {
                    curr = "nextra"
                    text = "Do you want to add another special condition? (`yes` or `no`)";
                    let questwords = m.content.trim().split(/\s+/)
                    if (questwords.length < 3) { text = "The special condition must follow [conditionName] [operator] [value]. Please try again."; curr = "extra"; }
                    else if (["=", ">", "<", "<=", ">="].indexOf(questwords[1]) == -1) { text = "Incorrect operator. Please try again."; curr = "extra" }
                    else {
                        let key = questwords[0]
                        let op = questwords[1]
                        questwords.splice(0, 2)
                        let value = questwords.join(" ");
                        if (value == "true") { value = true }
                        if (value == "false") { value = false }
                        extra[key] = { "value": value, "operator": op }
                    }
                } else if (curr == "next") {
                    conditions.push(functions.addQuestCondition(condition, operator, description, total, extra, type));
                    extra = null;
                    extra = {};
                    if (m.content.toLowerCase() == "yes") {
                        curr = "condition"
                        text = "Please enter a condition. (ex. vote)";
                    }
                    else {
                        curr = "reward"
                        text = "Please enter a reward in property value format. (ex. money 100))"
                    }
                } else if (curr == "reward") {
                    curr = "complete"
                    let questwords = m.content.trim().split(/\s+/)
                    if (questwords.length % 2 != 0) { text = "Please enter a correct quest reward. There must be an amount for every property. "; curr = "reward" }
                    else {
                        for (let i = 0; i < questwords.length / 2; i++) {
                            let key = questwords[2 * i];
                            let value = parseInt(questwords[2 * i + 1]);
                            if (isNaN(value)) { text += "Please enter a correct quest reward. The amount of property " + key + " must be an integer."; curr = "reward"; break}
                            reward[key] = value;
                        }
                        if (curr == "complete") {
                            functions.getUser(target._id).then(t => { functions.makeQuest(t, name, flavortext, conditions, reward, type); functions.setUser(t) })
                            collector.stop("complete")
                        }
                    }
                }
                if (text != "") { functions.sendMessage(message.channel, text) }
                //console.log(collector)
                //collector.resetTimer({"time": 60000, "idle": 60000})
            });
            collector.on('end', (collected, reason) => {
                if (reason == "complete") { functions.sendMessage(message.channel, "The quest was given.") }
                else { functions.sendMessage(message.channel, "Failed to make a quest. Please try again. \nReason: " + reason) }
            });
            functions.setUser(target)
            return
        } else {
            functions.replyMessage(message, functions.adminQuest(words, target))
        }
    });
}