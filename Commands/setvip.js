module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (message.guild.id != "536599503608872961") { return functions.replyMessage(message, "You cannot do this outside the support server!") }
    let viproles = ["560322482586910722", "560325910855811120", "560323135291785216", "560323708321792003"];
    let vipbenefits = [
        { "lucky": 0.05, "extrarerolls": 0 },
        { "lucky": 0.1, "extrarerolls": 1 },
        { "lucky": 0.2, "extrarerolls": 2 },
        { "lucky": 0.5, "extrarerolls": 3 },
    ]
    let viplevel = parseInt(words[1]);
    for (var i = viproles.length - 1; i >= 0; i--) {
        if (message.member.roles.has(viproles[i])) {
            if (user.vip == undefined) { user.vip = {} }
            if (user.vip.rerollsclaimed == undefined) { user.vip.rerollsclaimed = 0;}
            user.vip.lucky = vipbenefits[i].lucky;
            user.vip.extrarerolls = vipbenefits[i].extrarerolls;
            break;
        }
    }
}