var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let roll = Math.floor(6 * Math.random() + 1);
    if (words.length == 1){
        functions.replyMessage(message, 'You rolled a ' + roll + '!');
        return
    }
    if (words.length < 3) {
        functions.sendMessage(message.channel, 'You are missing some arguments. `!dice [1-6] [amount]`.');
        return;
    }
    if (words.length > 5){
        functions.sendMessage(message.channel, 'Too many arguments. `!dice [1-6] [amount]`.');
        return
    }
    face = parseInt(words[1])
    if (isNaN(face)){
        functions.replyMessage(message, 'Choose an integer to guess!');
        return;
    }
    if (face < 1 || face > 6) {
        functions.sendMessage(message.channel, 'This is a six sided die! You must choose a number between 1 and 6!');
        return;
    }

    amount = parseInt(words[2]);
    if (isNaN(face)){
        functions.replyMessage(message, 'Choose an integer to bet!');
        return;
    }
    if (amount > user.money){
        functions.replyMessage(message, 'You can\'t roll more than you own! (or a negative amount)');
        return 
    }
    if (amount > 0) {
        if (face == roll) {
            functions.replyMessage(message, 'It was ' + roll + '! You won $' + (amount*5) + '!');
            user.money += amount*5;
        } else {
            functions.replyMessage(message, 'It was ' + roll + '! You lost $' + amount + '!');
            user.money -= amount;
        }
    } else {
        functions.replyMessage(message, "You can't bet a negative amount!");
    }
}
