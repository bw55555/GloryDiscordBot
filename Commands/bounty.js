var functions = require("../Utils/functions.js")
module.exports = function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        functions.replyMessage(message, "Select a person to place a bounty on or do write `!bounty top`");
        return;
    }
    if (words[1].toUpperCase() == `TOP`) {
    var globalMoney = 0;
    var globalUsers = 0;
    var globalRichest = '';
    var globalRichestId = '';
    var globalRichestMoney = 0;
    var globalRichest2 = '';
    var globalRichestId2 = '';
    var globalRichestMoney2 = 0;
    var globalRichest3 = '';
    var globalRichestId3 = '';
    var globalRichestMoney3 = 0;
    var globalRichest4 = '';
    var globalRichestId4 = '';
    var globalRichestMoney4 = 0;
    for (var i in userData) {//loops through user data to check. //w/o if statement, it checks everyone
	if(userData[i].dead == false && userData[i].shield < ts){
        globalMoney += userData[i].bounty; //adds money to total money
        globalUsers += 1; //checks guilds
        if (userData[i].bounty > globalRichestMoney) { //checks if user money is greater than richest
        globalRichestMoney4 = globalRichestMoney3;
        globalRichestId4 = globalRichestId3;
        globalRichest4 = globalRichest3;

        globalRichestMoney3 = globalRichestMoney2;
        globalRichestId3 = globalRichestId2;
        globalRichest3 = globalRichest2;

        globalRichestMoney2 = globalRichestMoney;
        globalRichestId2 = globalRichestId;
        globalRichest2 = globalRichest;

        globalRichestMoney = userData[i].bounty;
        globalRichestId = i;
        globalRichest = userData[i].username;
        }
        else if (userData[i].bounty > globalRichestMoney2) {
        globalRichestMoney4 = globalRichestMoney3;
        globalRichestId4 = globalRichestId3;
        globalRichest4 = globalRichest3;

        globalRichestMoney3 = globalRichestMoney2;
        globalRichestId3 = globalRichestId2;
        globalRichest3 = globalRichest2;

        globalRichestMoney2 = userData[i].bounty;
        globalRichestId2 = i;
        globalRichest2 = userData[i].username;
        }
        else if (userData[i].bounty > globalRichestMoney3) {
        globalRichestMoney4 = globalRichestMoney3;
        globalRichestId4 = globalRichestId3;
        globalRichest4 = globalRichest3;

        globalRichestMoney3 = userData[i].bounty;
        globalRichestId3 = i;
        globalRichest3 = userData[i].username;
        }
        else if (userData[i].bounty > globalRichestMoney4) {
        globalRichestMoney4 = userData[i].bounty;
        globalRichestId4 = i;
        globalRichest4 = userData[i].username;
        }
    }
}
        functions.sendMessage(message.channel, {
    embed: { //displays guild stats
        title: "Glory's Most Wanted List",
        color: 0xF1C40F,
        fields: [{ //displays variables
        name: "Attack-able Accounts",
        value: globalUsers,
        inline: true
        },
        {
        name: "Total Bounties",
        value: `$` + globalMoney,
        inline: true
        }, {
        name: "Largest Bounties",
        value: `${globalRichest} with id ${globalRichestId} and $${globalRichestMoney}\n` +
            `${globalRichest2} with id ${globalRichestId2} and $${globalRichestMoney2}\n` +
            `${globalRichest3} with id ${globalRichestId3} and $${globalRichestMoney3}\n` +
            `${globalRichest4} with id ${globalRichestId4} and $${globalRichestMoney4}\n` //displays richest person.
        }
        ]
    }
    });
    return;
    }

    if (user.dead === true) {
    functions.replyMessage(message, "Corpses can't place bounties!");
    return;
    }
    //console.log(words);
    let spot = 1
    if (words.length == 1) { spot = 0 }
    return Promise.all([functions.validate(message, user, spot)]).then(ret => {
        let target = ret[0];
        if (words.length == 1) { target = user }
        if (target == false) { return; }
        //console.log(target);
        //console.log(target);
        //console.log('targetname: '+targetname);
        //console.log(check);
        if (words.length < 3) {
            functions.sendMessage(message.channel, target.bounty);
            return;
        }
        if (target.dead == true) {
            functions.replyMessage(message, "You can't place a bounty on corpses!");
            return;
        }
        var amount = parseInt(words[2]);
        if (isNaN(amount)) {
            functions.sendMessage(message.channel, "Please specify an integer amount.");
            return;
        }
        //console.log(amount);
        if (user.money >= amount && amount > 0) {
            functions.sendMessage(message.channel, 'Placed a $' + amount + ' on <@' + target._id + ">'s head.");
            target.bounty += amount;
            user.money -= amount;
        } else if (user.money < amount) {
            functions.sendMessage(message.channel, "You can't offer more than you own.");
        } else {
            functions.sendMessage(message.channel, 'Incorrect Argument');
        }
        functions.setUser(target);
    })
}