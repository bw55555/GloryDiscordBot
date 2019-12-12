var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {

    let actions = ""

    actions += "!d a or !d attack --"
    actions += "This is the basic attack action. It has a 3 sec cooldown." + "\n"
    actions += "!d b or !d block --"
    actions += "A block reduces damage after all attacks. It is most effective for defending after an attack, but it also reduces damage at half rate for other attacks. It has a 3 sec cooldown." + "\n"
    actions += "!d sh or !d shoot -- "
    actions += "Shooting similarly to the attack, but it has 30% more damage if done right after the opponent 'evades'. It has a 5 sec cooldown" + "\n"
    actions += "!d d or !d dodge -- "
    actions += "Dodging reduces damage only after being shot, and it is twice as effective as a parry. It has a 5 sec cooldown. Be careful, being stabbed after dodging results in taking 30% more damage. " + "\n"
    actions += "!d st or !d stab -- "
    actions += "Stabbing works similarly to the attack, but it has 30% more damage if done right after the opponent 'dodges'. It has a 5 sec cooldown" + "\n"
    actions += "!d e or !d evade -- "
    actions += "Evading reduces damage only after being stabbed, and it is twice as effective as a parry. It has a 5 sec cooldown. Be careful, being shot after evading results in taking 30% more damage. " + "\n"
    actions += "!d br or !d bolster -- "
    actions += "Bolster any next attack by 25%." + "\n"
    actions += "!d r or !d resign -- "
    actions += "A true fighter knows when a battle is lost. Resign from a duel to avoid imminent death." + "\n"

    functions.sendMessage(message.channel, "To start a duel use '!challenge'. \nIn dueling, the effectiveness of blocks depend on the speed of reaction. So, it is recommended that during duels, users should copy/paste '!d ' for greater speed. \nSkills and modifiers are not factored in for dueling. Players also cannot heal during duels. This is a test of skill, not brute strength. Think fast!\n");
    return functions.sendMessage(message.channel, actions);

}