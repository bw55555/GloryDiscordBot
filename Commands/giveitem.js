
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.dead == true) {
        functions.replyMessage(message, "You can't give items while you are a corpse!");
        return;
    }
    //console.log(words);
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        //console.log(target);
        //console.log(target);
        //console.log('targetname: '+targetname);
        //console.log(check);
        if (target._id == user._id) {
            functions.replyMessage(message, "You can't give yourself items");
            return;
        }
        if (user.dead == true) {
            functions.replyMessage(message, "Unfortunately, you are dead.");
            return;
        }
        if (target.dead == true) {
            functions.replyMessage(message, "You can't give items to a corpse!");
            return;
        }
        if (words.length < 3) {
            functions.replyMessage(message, "Please specify an item ID.");
            return;
        }
        var weaponid = parseInt(words[2]);
        if (isNaN(weaponid)) {
            functions.replyMessage(message, "Please specify an integer item ID.");
            return;
        }
        
        if (user.inventory[weaponid] != weaponid) {
            functions.replyMessage(message, "You do not own this item!")
            return
        }
        if (weaponid == user.weapon._id) {
            functions.replyMessage(message, "You cannot give away your equipped weapon!")
            return
        }
        return Promise.all([functions.getItem(weaponid)]).then(ret => {
            let item = ret[0]
            rarity = item.rarity

            if (rarity == "Unique" && admins.indexOf(user._id) == -1) {
                functions.replyMessage(message, "You cannot trade an Unique weapon!")
                return
            }
            if (rarity == "GLORY" && admins.indexOf(user._id) == -1) {
                functions.replyMessage(message, "You cannot trade a GLORY weapon!")
                return
            }
            delete user.inventory[weaponid]
            target.inventory[weaponid] = weaponid
            item.owner = target._id
            functions.sendMessage(message.channel, "<@" + target._id + "> recieved " + item._id + " from <@" + user._id + ">");
            functions.setUser(target)
            functions.setItem(item)
        })
    })
}