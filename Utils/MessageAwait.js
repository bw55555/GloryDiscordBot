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
        channel.send(initialTextToSend).then(() => {
            channel.awaitMessages(response => compareFunc(response) == true && response.author.id==userid && response.channel.id==channel.id, {
                max: 1,
                time: 30000,
                errors: ['time'],
            })
            .then((collected) => {
                onSuccess(collected.first(),argsForSuccess)
                //collected.reply("It worked")
                //console.log(collected.first)
            })
            .catch(() => {
                if (typeof onFail == "string") { channel.send(onFail); }
                else {onFail(argsForFail)}
            });
        });
    }
}
module.exports = MessageAwait