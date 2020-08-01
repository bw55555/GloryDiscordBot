module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user.vip == undefined) { return }
    if (user.vip.extrarerolls != undefined) {
        if (user.vip.rerollsclaimed < user.ascension * user.vip.extrarerolls) {
            user.consum.reroll += user.ascension * user.vip.extrarerolls - user.vip.rerollsclaimed
            user.vip.rerollsclaimed = user.ascension * user.vip.extrarerolls;
        }
    }
}