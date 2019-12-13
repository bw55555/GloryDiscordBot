var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        if (target._id == user._id) {
            functions.sendMessage(message.channel, "Poor kid with no friends...");
            return;
        }
        if (target.marry != "None") {
            functions.sendMessage(message.channel, "<@" + target._id + "> is already married 😭");
        }
        if (user.marry != "None") {
            functions.sendMessage(message.channel, "You are already married 😭");
        }
        else if (target.marry == "None") {
            return functions.MessageAwait(message.channel, target._id, "<@" + target._id + ">, <@" + user._id + "> wishes to marry you! Type `I do` become married!", "I do",
                function (response, extraArgs) {
                    let user = extraArgs[0]
                    let target = extraArgs[1]
                    let message = extraArgs[2]
                    user.marry = target._id;
                    target.marry = user._id;
                    functions.setUser(target)
                    functions.sendMessage(message.channel, "<:nixheart:506240330916429837><:nixheart:506240330916429837><:nixheart:506240330916429837>🎉🎉🎉Congradulations! <@" + target._id + "> and <@" + user._id + "> are now married!🎉🎉🎉<:nixheart:506240330916429837><:nixheart:506240330916429837><:nixheart:506240330916429837>");
                },
                [user, target, message],
                "They didn't want to marry 😭"
            );
        }
    }
}