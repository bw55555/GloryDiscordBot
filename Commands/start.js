var mainQuestData = Assets.mainQuestData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user != false && user != undefined){
        functions.replyMessage(message, "You already have an account!")
        return;
    }
    user = JSON.parse(JSON.stringify(templateUser))
    user.startts = ts;
    user.money += 1000;
    user.shield = ts + 24 * 60 * 60 * 1000
    user._id = message.author.id
    user.username = message.author.username
    user.cooldowns.normal = ts;
    let text = "Welcome to Glory!\nTo get started type `!help` to see all the commands available, or use `!tutorial` to see the official glory tutorial!\n Go obtain your Glory!\n**Warning: Please note that macros(automating commands) are forbidden.**"
    text += "\n" +functions.adminQuest(mainQuestData[0].quest, user)
    functions.setUser(user)
    functions.replyMessage(message, text)
}
