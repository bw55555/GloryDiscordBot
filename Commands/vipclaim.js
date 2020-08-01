module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user.vip == undefined) { return }
    if (user.vip.extrarerolls != undefined) {
        let rem = user.ascension * user.vip.extrarerolls - user.vip.rerollsclaimed
        if (rem > 0) {
            user.consum.reroll += rem
            user.vip.rerollsclaimed = user.ascension * user.vip.extrarerolls;
        }
        functions.replyMessage(message, "You have claimed "+rem+ " rerolls.")
    }
}