
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.triangleid % 300 != 8) { return functions.replyMessage(message, "You must be an Oracle to use this command!") }
    let truth = Math.random();
    if (truth > 0.50) {
        functions.replyMessage(message, 'Your next flip has a 50% chance of being heads');
        return;
    }
    else if (truth > 0.05) {
        functions.replyMessage(message, 'Your next flip has a 50% chance of being tails');
        return;
    }
    else if (truth > 0.02) {
        functions.replyMessage(message, 'Some secrets were made to be discovered...');
        return;
    } else {
        //functions.replyMessage(message, "You have discovered the secret of the Oracle Class! Dm Nix#6340 to receive a unique item!");
        functions.replyMessage(message, "?????????");
        return;
    }
}