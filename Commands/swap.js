
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.triangleid == 11) {
        user.triangleid = 14;
        user.trianglemod = 1.4; //This top part turns you into a bloodweaver, setting the mod to 1.7
        functions.replyMessage(message, 'You are now a Bloodweaver! You sacrifice life to deal more damage!');
    }
    else if (user.triangleid == 14) {
        user.triangleid = 11;
        user.trianglemod = 1.4;//turns you into a lifeweaver, setting the mod to 1.4
        functions.replyMessage(message, 'You are now a Lifeweaver! Steal some of your opponent\'s life whenever you damage them!');
    }
}