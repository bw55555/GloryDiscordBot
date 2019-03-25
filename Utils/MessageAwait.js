class MessageAwait {
    constructor(channel, userid, initialTextToSend, compareFunc, onSuccess, argsForSuccess) {
        if (compareFunc == undefined || compareFunc == "" || compareFunc == "confirm") {
            compareFunc = function (response) {
                if (response == "confirm") { return true }
                else { return false }
            }
        }
        channel.send(initialTextToSend).then(() => {
            channel.awaitMessages(response => compareFunc(response) == true && response.author.id==userid && response.channel.id==channel.id, {
                max: 1,
                time: 30000,
                errors: ['time'],
            })
            .then((collected) => {
                console.log("Ran this")
                onSuccess(collected.first(),argsForSuccess)
                //collected.reply("It worked")
                //console.log(collected.first)
            })
            .catch(() => {
                channel.send("`Timeout`");
            });
        });
    }
}
module.exports = MessageAwait