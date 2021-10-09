
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) != -1) {
        if (words[1] != undefined && words[1].toLowerCase() == "help") {
            return functions.sendMessage(message, "-name [Name] -level [Level] -attack [Attack] -defense [Defense] -health [Health] -reward [Reward] -ability [Ability] -abilitydesc [Desc]")
        }
        if (user.location == "city" || user.location == "guild") { return functions.replyMessage(message, "You cannot do this here!") }
        return Promise.all([functions.getObject("mobData", user.location)]).then(ret => {
            let raid = ret[0]
            if (raid == false) {
                functions.deleteMessage(message);
                functions.replyMessage(message, "There is no raid where you are!");
                return;
            }
            let generalLoc = user.location.split("-")[0]
            let defaults = {}
            if (generalLoc == "arena") {
                defaults = Assets.locationraidData[generalLoc][0]
                defaults.level = 1

            } else if (Assets.locationraidData[generalLoc] != undefined) {
                defaults = Assets.locationraidData[generalLoc][0]
                defaults.level = Math.floor((defaults.minlevel) + (((defaults.maxlevel) - (defaults.minlevel)) * Math.random())) + 1
            }

            let wordoptions = functions.extractOptions(message, false, ["-name", "-level", "-attack", "-defense", "-health", "-reward", "-ability", "-abilitydesc"])
            if (wordoptions.name == undefined) { wordoptions.name = defaults.name }
            if (wordoptions.name == undefined) { return functions.replyMessage(message, "Please specify a name!") }
            if (wordoptions.level == undefined) { wordoptions.level = defaults.level }
            wordoptions.level = parseInt(wordoptions.level)
            if (isNaN(wordoptions.level)) { return functions.replyMessage(message, "Please specify an integer level!") }

            if (generalLoc == "arena") {
                defaults.attack = wordoptions.level
                defaults.health = 999999999
                defaults.reward = 0
            } else if (Assets.locationraidData[generalLoc] != undefined) {
                defaults.attack = Math.floor(defaults.level * 15);
                defaults.health = defaults.level * 100 * (Math.floor(2 * defaults.level / 25) + 1);
                defaults.reward = Math.floor(defaults.level * 5000);
            }

            if (wordoptions.attack == undefined) { wordoptions.attack = defaults.attack }
            wordoptions.attack = parseInt(wordoptions.attack)
            if (isNaN(wordoptions.attack)) { return functions.replyMessage(message, "Please specify an integer level!") }
            if (wordoptions.health == undefined) { wordoptions.health = defaults.health }
            wordoptions.health = parseInt(wordoptions.health)
            if (isNaN(wordoptions.health)) { return functions.replyMessage(message, "Please specify an integer health!") }
            if (wordoptions.reward == undefined) { wordoptions.reward = defaults.reward }
            wordoptions.reward = parseInt(wordoptions.reward)
            if (isNaN(wordoptions.reward)) { return functions.replyMessage(message, "Please specify an integer reward!") }
            if (wordoptions.ability != undefined) {
                wordoptions.ability = functions.extractOptions(wordoptions.ability, false, allowedmodifiers)
                for (let modname of Object.keys(wordoptions.ability)) {
                    wordoptions.ability[modname] = parseFloat(wordoptions.ability[modname])
                    if (isNaN(wordoptions.ability[modname])) { return functions.replyMessage(message, "The value of modifier " + modname + " is not a float!") }
                }
            }
            if (wordoptions.ability == undefined) {
                wordoptions.ability = defaults.ability
                wordoptions.abilitydesc = defaults.abilitydesc
            }

            if (wordoptions.abilitydesc == undefined && wordoptions.ability != undefined) { wordoptions.abilitydesc = JSON.stringify(wordoptions.ability) }

            functions.customsummon(raid, wordoptions)
            functions.replyMessage(message, "You have summoned a level " + raid.level + " " + raid.name + "!\n")
            functions.setObject("mobData", raid)
        })
    } else {
        if (user.location != "arena") { return functions.replyMessage(message, "You cannot do this here!") }
        return Promise.all([functions.getObject("mobData", user.location)]).then(ret => {
            let raid = ret[0]
            if (raid == false) {
                functions.deleteMessage(message);
                functions.replyMessage(message, "There is no raid where you are!");
                return;
            }
            let ro = {}
            ro = Assets.locationraidData[generalLoc][0]
            ro.level = 1
            let wordoptions = functions.extractOptions(message, false, ["-level"])
            if (wordoptions.level != undefined) { ro.level = parseInt(wordoptions.level) }
            if (isNaN(ro.level) || ro.level > ro.maxlevel || ro.level < ro.minlevel) { return functions.replyMessage(message, "Please specify a level between " + ro.minlevel + " and " + ro.maxlevel) }
            ro.attack = wordoptions.level
            ro.health = 999999999
            ro.reward = 0

            functions.customsummon(raid, ro)
            functions.replyMessage(message, "You have summoned a level " + raid.level + " " + raid.name + "!\n")
            functions.setObject("mobData", raid)
        })
    }
}