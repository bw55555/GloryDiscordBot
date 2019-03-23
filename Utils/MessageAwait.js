class MessageAwait {
    constructor(channel, userid, initialTextToSend, compareFunc, onSuccess, argsForSuccess) {
        channel.send(initialTextToSend).then(() => {
            channel.awaitMessages(response => compareFunc(response) === 'true' && response.author.id==userid && response.channel.id==channel.id, {
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