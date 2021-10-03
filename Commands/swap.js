
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.triangleid % 300 == 11) {
        user.triangleid += 3;
        functions.replyMessage(message, 'You are now a Bloodweaver! You sacrifice life to deal more damage!');
    }
    else if (user.triangleid % 300 == 14) {
        user.triangleid -= 3;
        functions.replyMessage(message, 'You are now a Lifeweaver! Steal some of your opponent\'s life whenever you damage them!');
    }
}