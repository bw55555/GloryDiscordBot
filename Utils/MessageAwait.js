class MessageAwait {
    constructor(channel, userid, initialTextToSend, compareFunc, onSuccess, argsForSuccess, onFail, argsForFail) {
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
        if (onFail == undefined || onFail == null) { onFail = "`Timeout`" }
        if (channel.type == "dm" || channel.type == "group" || channel.memberPermissions(bot.user) == null || channel.memberPermissions(bot.user).has("SEND_MESSAGES")) {
            channel.send(initialTextToSend).then(() => {
                channel.awaitMessages(response => response.author.id == userid && response.channel.id == channel.id, {
                    max: 1,
                    time: 30000,
                    errors: ['time'],
                })
                .then((collected) => {
                    if (compareFunc(collected.first()) != true) {
                        if (typeof onFail == "string") { channel.send(onFail).catch(function (err) { console.error(err) }); }
                        else { onFail(argsForFail) }
                    }
                    onSuccess(collected.first(), argsForSuccess)
                    //collected.reply("It worked")
                    //console.log(collected.first)
                })
                .catch(() => {
                    if (typeof onFail == "string") { channel.send(onFail).catch(function (err) { console.error(err) }); }
                    else { onFail(argsForFail) }
                });
            });
        }
    }
}
module.exports = MessageAwait