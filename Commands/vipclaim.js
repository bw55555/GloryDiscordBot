module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user.vip == undefined) { return }
    if (user.vip.extrarerolls != undefined) {
        if (user.vipclaims == undefined) {
            user.vipclaims = {}
        }
        if (user.vipclaims.rerolls == undefined) { user.vipclaims.rerolls = 0}
        let rem = user.ascension * user.vip.extrarerolls - user.vipclaims.rerolls
        if (rem > 0) {
            user.consum.reroll += rem
            user.vipclaims.rerolls = user.ascension * user.vip.extrarerolls;
            functions.replyMessage(message, "You have claimed " + rem + " rerolls.")
        }
        functions.replyMessage(message, "You don't have any rerolls left to claim!")
    }
}