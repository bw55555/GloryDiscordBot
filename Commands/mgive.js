
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.dead === true) {
        functions.replyMessage(message, "Corpses can't give materials!");
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
            functions.sendMessage(message.channel, "You're a funny person trying to give yourself materials");
            return;
        }

        if (words.length < 3) {
            functions.sendMessage(message.channel, "Please specify an amount.");
            return;
        }
        var amount = parseInt(words[2]);
        if (isNaN(amount)) {
            functions.sendMessage(message.channel, "Please specify an integer amount.");
            return;
        }
        if (target.dead === true) {
            functions.replyMessage(message, "You can't give materials to corpses!");
            return;
        }
        //console.log(amount);
        if (user.materials >= amount && amount > 0) {
            functions.sendMessage(message.channel, 'Sent ' + amount + ' materials to <@' + target._id + ">");
            target.materials += amount;
            user.materials -= amount;
            functions.setUser(target)
        } else if (user.materials < amount) {
            functions.sendMessage(message.channel, 'You can\'t give more materials than you own');
        } else {
            functions.sendMessage(message.channel, 'Incorrect Argument');
        }
    })
}