module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (message.guild.id != "536599503608872961") { return functions.replyMessage(message, "You cannot do this outside the support server!") }
    let viproles = {
        "752760301065207818": 1,
        "560322482586910722": 1,
        "560325910855811120": 2,
        "560323135291785216": 3,
        "560323708321792003": 4
       };
    let vipbenefits = [
        { "level": 0, "lucky": 0, "extrarerolls": 0 },
        { "level": 1, "lucky": 0.05, "extrarerolls": 0 },
        { "level": 2, "lucky": 0.1, "extrarerolls": 1 },
        { "level": 3, "lucky": 0.2, "extrarerolls": 2 },
        { "level": 4, "lucky": 0.5, "extrarerolls": 3 },
    ]
    let viplevel = parseInt(words[1]);
    for (var viprole in viproles) {
        if (message.member.roles.cache.has(viprole)) {
            if (user.vip == undefined) { user.vip = {} }
            if (user.vipclaims == undefined) { user.vipclaims = {} }
            let viplevel = viproles[viprole]
            user.vip.lucky = vipbenefits[viplevel].lucky;
            user.vip.extrarerolls = vipbenefits[viplevel].extrarerolls;
            user.vip.level = vipbenefits[viplevel].level;
            functions.replyMessage(message, "Your vip level was set to " + (viplevel))
            break;
        }
    }
}