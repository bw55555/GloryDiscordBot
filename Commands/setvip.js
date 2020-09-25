module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (message.guild.id != "536599503608872961") { return functions.replyMessage(message, "You cannot do this outside the support server!") }
    let viproles = [
        { role: "560323708321792003", level: 4 },
        { role: "560323135291785216", level: 3 },
        { role: "560325910855811120", level: 2 },
        { role: "752760301065207818", level: 1 },
        { role: "560322482586910722", level: 1 }
    ];
    let vipbenefits = [
        { "level": 0, "lucky": 0, "extrarerolls": 0 },
        { "level": 1, "lucky": 0.05, "extrarerolls": 0 },
        { "level": 2, "lucky": 0.1, "extrarerolls": 1 },
        { "level": 3, "lucky": 0.2, "extrarerolls": 2 },
        { "level": 4, "lucky": 0.5, "extrarerolls": 3 },
    ]
    for (var viprole of viproles) {
        if (message.member.roles.cache.has(viprole)) {
            if (user.vip == undefined) { user.vip = {} }
            if (user.vipclaims == undefined) { user.vipclaims = {} }
            user.vipclaims.rerolls = 0;
            let viplevel = viproles[viprole]
            user.vip.lucky = vipbenefits[viplevel].lucky;
            user.vip.extrarerolls = vipbenefits[viplevel].extrarerolls;
            user.vip.level = vipbenefits[viplevel].level;
            functions.replyMessage(message, "Your vip level was set to " + (viplevel))
            break;
        }
    }
}