
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let triangleids = {
        11: "<:bloodlifeweaver:542188575333023754> Lifeweaver",
        14: "<:bloodlifeweaver:542188575333023754> Bloodweaver",
        311: "Life Vampire",
        314: "Blood Vampire"
    }
    if (user.triangleid % 300 == 11) {
        user.triangleid += 3;
        functions.replyMessage(message, 'You are now a '+triangleids[user.triangleid]+' You sacrifice life to deal more damage!');
    }
    else if (user.triangleid % 300 == 14) {
        user.triangleid -= 3;
        functions.replyMessage(message, 'You are now a ' + triangleids[user.triangleid] + '! Steal some of your opponent\'s life whenever you damage them!');
    }
}