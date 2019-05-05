var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let rarity = 0;
    let cd = 0;
    while (rarity < 9) {
        if (rarAmount(id, rarity) > 1) {
            let k = largestStatSum(id, rarity);
            if (k == -1 || isNaN(k)) {
                continue;
            } else {
                //merge function with everything of same rarity.
            }
        } else {
            rarity++;
        }
    }
}

function rarAmount(userid, rarity) {
    let k = 0
    let inv = userData[userid].inventory
    for (let i = 0; i < inv.length; i++) {
        if (inv[i].rarity == rarity) {
            k++;
        }
    }
    return k;
}

function statSum(itemid) {
    if (itemData[itemid] != undefined) {
        return itemData[itemid].attack + itemData[itemid].defense;
    } else {
        return -1;
    }
}

function largestStatSum(userid, rarity) {
    let k = -1
    let inv = userData[userid].inventory
    for (let i = 0; i < inv.length; i++) {
        if (inv[i].rarity == rarity) {
            if (k = -1) {
                k = inv[i];
            } else {
                if (statSum(k) < statSum(userData[userid].inventory[i])) {
                    k = inv[i];
                }
            }
        }
    }
    return k;
}

function merge(userid, itemid1, itemid2) {
    //to be implimented
}