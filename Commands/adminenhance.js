module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let weaponid = parseInt(words[1])
    if (admins.indexOf(id) == -1) { return }
    if (isNaN(weaponid)) { return functions.replyMessage(message, "The weapon id must be an integer"); return; }
    let stat = words[2];
    if (stat == undefined) { return functions.replyMessage(message, "Please specify a stat(random, attack, or defense)!") }
    stat = stat.toLowerCase();
    if (stat != "random" && stat != "attack" && stat != "defense") { return functions.replyMessage(message, "Please specify attack, defense, or random. ") }
    let num = words[3];
    let enhanceToLevel = false;
    if (words[3] == "level") { num = words[4]; enhanceToLevel = true; }
    if (num == undefined) { num = 1; }
    num = parseInt(num);
    if (isNaN(num) || num < 0) { return functions.replyMessage(message, "Please specify a positive integer number!") }
    return Promise.all([functions.getItem(weaponid)]).then(ret => {
        let item = ret[0]
        if (item == false) { return functions.replyMessage(message, "That item does not exist!") }
        if (item.enhance == undefined) {
            item.enhance = { "level": 0, "attack": 0, "defense": 0 }
        }
        if (item.enhance.level + 1 > Math.pow(2, item.rarity)) { return functions.replyMessage(message, "Your weapon is not strong enough to withstand another enhancement!") }
        if (num == 1) {
            let ret = adminEnhanceWeapon(user, guild, item, stat);
            if (ret.text) {
                functions.replyMessage(message, text);
            }
            if (!ret.success) {
                functions.replyMessage(message, "Oh no! It failed...")
            }
            if (ret.success) {
                functions.replyMessage(message, "You have successfully enhanced your weapon to level " + item.enhance.level)
            }
        } else {
            let text = "";
            let i = 0;
            for (i = 0; i < min(num, 1000); i++) {
                if (enhanceToLevel && item.enhance.level >= num) { break; }
                let ret = adminEnhanceWeapon(user, guild, item, stat)
                if (ret.text != undefined) { text += ret.text; break }
                if (ret.cost != undefined) { totalcost += ret.cost }
            }
            text = "You have successfully enhanced your weapon to level " + item.enhance.level + "!\n" + text;
            functions.replyMessage(message, text);
            functions.setItem(item);
        }
    })
}
function adminEnhanceWeapon(item, stat) {
    if (stat == "attack" || stat == "defense") { cost *= 2 }
    if (item.enhance.level + 1 > Math.pow(2, item.rarity)) { return { "text": "Your weapon is not strong enough to withstand another enhancement!\n" } }
    item.enhance.level += 1;
    let tu = stat;
    if (stat == "random") {
        if (Math.random() > 0.5) {
            tu = "attack"
        } else {
            tu = "defense"
        }
    }
    item.enhance[tu] += 1;
    functions.completeQuest(user, "enhance", { "success": success, "item": item }, 1)
    return { "cost": cost, "success": true }
}