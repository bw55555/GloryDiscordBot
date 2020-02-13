
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return}
    if (words.length == 1) {
        let helptext = require("../Utils/ahelptext.js")
        //console.log(helptext)
        new functions.Paginator(message.channel, message.author, helptext)
    }
    if (words.length > 1) {
        let word2 = words[1].toLowerCase();
        let text = "";
        let prefix = defaultPrefix
        if (message.guild != undefined) { prefix = serverData[message.guild.id].prefix }
        if (word2 == "abox" || word2 == "adminbox") {
            text += "```Gives a person boxes!\nSyntax: " + prefix + word2 + " <target> <amount> ```"
        } else if (word2 == "ac" || word2 == "acheck" || word2 == "admincheck") {
            text = "```Check someone's account property!\nSyntax: " + prefix + word2 + " <target> <property> [property2]```"
        } else if (word2 == "aconsum" || word2 == "adminconsum") {
            text = "```Check someone's account property!\nSyntax: " + prefix + word2 + " <target> <consumname> [amount]```"
        } else if (word2 == "acheckvote") {
            text = "```Check if someone voted in the last 12 hours!\nSyntax: " + prefix + word2 + " <target>```"
        } else if (word2 == "adelete" || word2 == "admindelete") {
            text = "```Delete someone's account!\nSyntax: " + prefix + word2 + " <target>```"
        } else if (word2 == "agive" || word2 == "admingive") {
            text = "```Give someone money!\nSyntax: " + prefix + word2 + " <target> <amount>```"
        } else if (word2 == "ahelp" || word2 == "adminhelp") {
            text = "```Show this message!\nSyntax: " + prefix + word2 + " <command>```"
        } else if (word2 == "aitem" || word2 == "adminitem") {
            text = "```Give someone an item!\nSyntax: " + prefix + word2 + " <target> <itemattack> <itemdefense> <itemrarity> [-name <name>] [-mod <<modifiername> <modifieramount>>...]```"
        } else if (word2 == "akill" || word2 == "adminkill") {
            text = "```Kill someone!\nSyntax: " + prefix + word2 + " <target>```"
        } else if (word2 == "amats" || word2 == "adminmats" || word2 == "adminmaterials") {
            text = "```Give someone materials!\nSyntax: " + prefix + word2 + " <target> <amount>```"
        } else if (word2 == "ari" || word2 == "adminrandomitem") {
            text = "```Give someone a random item!\nSyntax: " + prefix + word2 + " <target> [rarity]```"
        } else if (word2 == "arename" || word2 == "adminrename") {
            text = "```Rename someone's item!\nSyntax: " + prefix + word2 + " <itemid> <newname>```"
        } else if (word2 == "arez" || word2 == "ares" || word2 == "adminrez") {
            text = "```Resurrect someone without the xp penalty!\nSyntax: " + prefix + word2 + " <target>```"
        } else if (word2 == "aset" || word2 == "adminset") {
            text = "```Set a property of someone!\nSyntax: " + prefix + word2 + " <target> <property> [property2] <amount>```"
        } else if (word2 == "asmelt" || word2 == "adminsmelt") {
            text = "```Forcibly smelt someone's item. It will not give them rewards!\nSyntax: " + prefix + word2 + " <itemid>```"
        } else if (word2 == "axp" || word2 == "adminxp") {
            text = "```Give someone xp!\nSyntax: " + prefix + word2 + " <target> <amount>```"
        } else if (word2 == "enchant") {
            text = "```Enchant an item!\nSyntax: " + prefix + word2 + " <itemid> <modname> <modamount>```"
        } else if (word2 == "vi" || word2 == "voteitem") {
            text = "```Simulate a vote!\nSyntax: " + prefix + word2 + " <target>```"
        } else if (word2 == "summon" || word2 == "worldsummon" || word2 == "wsummon") {
            text = "```Forcibly summon a boss!\nSyntax: " + prefix + word2 + " [level]```"
        } 
        else {
            text = word2 + " is not an existing command"
        }
        functions.sendMessage(message.channel, text);
    }
}