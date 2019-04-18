var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (!userData[id].eggs) {
        userData[id].eggs = {};
    }
    let attempt = words[1].toUpperCase()
    if (attempt.length != 7) {
        return functions.replyMessage(message, "All easter eggs are 8 characters long!")
    }

    functions.deleteMessage(message);

    if (attempt == 'EXAMPLE') {
        if (check(id, 1)) { return; }
        functions.consumGive(id, box, 1);
        return functions.replyMessage(message, "Well that was easy! You get a box!")
    }
    else if (attempt == 'EGGHUNT') {
        if (check(id, 2)) { return; }
        functions.consumGive(id, box, 3);;
        return functions.replyMessage(message, "You're getting the hang of things! You get 3 boxes!")
    }
    else if (attempt == 'NIXOLIA') {
        if (check(id, 3)) { return; }
        functions.consumGive(id, phoenixfeather, 3);
        return functions.replyMessage(message, "You got 3 phoenix feathers! They tickle a bit.")
    }
    else if (attempt == 'BW55555') {
        if (check(id, 4)) { return; }
        userData[id].money += 55555;
        return functions.replyMessage(message, "Not only did you ping BW, you also recieved $55555")
    }
    else if (attempt == 'QUACKEN') {
        if (check(id, 5)) { return; }
        userData[id].materials += 3;
        return functions.replyMessage(message, "You got 3 phoenix feathers! They tickle a bit.")
    }
    else if (attempt == 'LOOKSUP') {
        if (check(id, 6)) { return; }
        functions.generateItem(id, itemData.next, 15, 15, 4, "Magic Easter Egg", { Lucky: 1.2 });
        return functions.replyMessage(message, "You recieved a 15/15 Magic Easter Egg! It will improve your luck!")
    }
    else if (attempt == 'EXPLSHN') {
        if (check(id, 7)) { return; }
        functions.consumGive(id, explosion, 1);
        return functions.replyMessage(message, "**BOOOOOOM!** (You recieved an explosion)")
    }
    else if (attempt == '1234567') {
        if (check(id, 8)) { return; }
        userData[id].money += 123456;
        return functions.replyMessage(message, "FREE 123456 MONEY!!!")
    }
    else if (attempt == 'NAMETAG') {
        if (check(id, 9)) { return; }
        functions.consumGive(id, nametag, 2);
        return functions.replyMessage(message, "EZ! 2 nametags given!")
    }
    else {
        functions.replyMessage(message, "You tried this code... and nothing happened")
        return;
    }
}

function check(id, eggid) {
    if (userData[id].eggs[eggid] == undefined) {
        userData[id].eggs[eggid] = eggid;
        return false;
    } else {
        functions.replyMessage(message, "You've already found this egg!")
        return true;
    }
}