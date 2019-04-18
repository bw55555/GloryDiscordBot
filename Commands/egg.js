var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (!userData[id].eggs){
        userData[id].eggs = {};
    }
    let attempt = words[1].toUpperCase()
    if (attempt.length != 7){
        return functions.replyMessage(message, "All easter eggs are 8 characters long!")
    }
    
    functions.deleteMessage(message);

    if (attempt == 'EXAMPLE'){
        consumGive(id, box, 1);
        return functions.replyMessage(message, "Well that was easy! You get a box!")
    }
    else if (attempt == 'EGGHUNT'){
        consumGive(id, box, 3);;
        return functions.replyMessage(message, "You're getting the hang of things! You get 3 boxes!")
    }
    else if (attempt == 'NIXOLIA'){
        functions.consumGive(id, phoenixfeather, 3);
        return functions.replyMessage(message, "You got 3 phoenix feathers! They tickle a bit.")
    }
    else if (attempt == 'BW55555'){
        userData[id].money += 55555;
        return functions.replyMessage(message, "Not only did you ping BW, you also recieved $55555")
    }
    else if (attempt == 'QUACKEN'){
        userData[id].materials += 3;
        return functions.replyMessage(message, "You got 3 phoenix feathers! They tickle a bit.")
    }
    else if (attempt == 'LOOKSUP'){
        functions.generateItem(id, itemData.next, 15, 15, 4, "Magic Easter Egg", {Lucky: 1.2});
        return functions.replyMessage(message, "You recieved a 15/15 Magic Easter Egg! It will improve your luck!")
    }
    else if (attempt == 'EXPLSHN'){
        functions.consumGive(id, explosion, 1);
        return functions.replyMessage(message, "**BOOOOOOM!** (You recieved an explosion)")
    }
    else if (attempt == '1234567'){
        userData[id].money += 123456;
        return functions.replyMessage(message, "FREE 123456 MONEY!!!")
    }
    else if (attempt == 'NAMETAG'){
        functions.consumGive(id, nametag, 2);
        return functions.replyMessage(message, "EZ! 2 nametags given!")
    }
}