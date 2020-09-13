
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    //functions.logCommand(message)
    if (words.indexOf("-nobackup") == -1) {
        //this.backup(message)
    }
    message.reply('GLORY has shut down!').then(function (session) {
        bot.destroy()
        setTimeout(function () {
            process.exit(2)
        }, 2000)
    }).catch(function (err) { console.error(err) })
}