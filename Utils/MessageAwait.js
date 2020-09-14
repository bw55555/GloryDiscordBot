function sendMessage(channel, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) { return; }
    if (channel.type != "dm" && channel.type != "group" && (channel.permissionsFor(bot.user) != null && !channel.permissionsFor(bot.user).has("SEND_MESSAGES"))) { return }
    while (text.indexOf != undefined && text.indexOf("@everyone") != -1) {
        text.replace("@everyone", "everyone")
    }
    while (text.indexOf != undefined && text.indexOf("@here") != -1) {
        text.replace("@here", "here")
    }
    return channel.send(text).catch(function (err) {
        if (err.errno == "ENOBUFS") {
            if (channel.retry == undefined) {
                bot.setTimeout(function () { sendMessage(channel, text, override) }, 100)
            } else {
                console.error(err)
                sendMessage(bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData.errorChannelId), "```\n" + err.stack + "\n```")
            }
            channel.retry = true;
        } else {
            console.error(err)
            sendMessage(bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData.errorChannelId), "```\n" + err.stack + "\n```")
        }
    })
}
async function MessageAwait(channel, userid, initialTextToSend, compareFunc, onSuccess, argsForSuccess, onFail, argsForFail) {
    if (compareFunc == undefined || compareFunc == null) {
        compareFunc = function (response) { return true }
    }
    else if (typeof compareFunc == "string") {
        let save = compareFunc
        compareFunc = function (response) {
            if (response == save) { return true }
            else { return false }
        }
    }
    if (onSuccess == undefined || onSuccess == null) { onSuccess = function (response) { return response } }
    if (waitList[userid] > Date.now()+30000) { return sendMessage(channel, "<@"+userid+"> already has a message awaiting confirmation.")}
    waitList[userid] = Date.now();
    let msgsent = sendMessage(channel, initialTextToSend)
    if (msgsent != undefined) {
        return msgsent.then(() => {
            return channel.awaitMessages(response => response.author.id == userid && response.channel.id == channel.id, {
                max: 1,
                time: 30000,
                errors: ['time'],
            })
        }).then((collected) => {
            if (compareFunc(collected.first().content) != true) {
                if (onFail == undefined || onFail == null) { onFail = "`Error`" }
                if (typeof onFail == "string") { sendMessage(channel, onFail) }
                else { onFail(argsForFail) }
                delete waitList[userid]
                return
            }
            onSuccess(collected.first(), argsForSuccess)
            delete waitList[userid]
            //collected.reply("It worked")
            //console.log(collected.first)
        }).catch((err) => {
            console.log(err)
            //console.log(err.size())
            console.log(err.first())
            if (onFail == undefined || onFail == null) { onFail = "`Timeout`" }
            if (typeof onFail == "string") { sendMessage(channel, onFail) }
            else { onFail(argsForFail) }
            delete waitList[userid]
        });
    }
}

module.exports = MessageAwait