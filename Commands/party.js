var functions = require("../Utils/functions.js")

module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (admins.indexOf(id)==-1) {functions.replyMessage(message, "Still under development. Sorry...");}
    let command = (words.length == 1) ? "" : words[1].toUpperCase()
    let party = userData[id].party;

    if((party == "None" || party == undefined || partyData[party] == undefined) && (words.length > 1 && command != "CREATE" && command != "INFO")) { return functions.replyMessage(message, "You aren't in a party! Create on right now or join someone else's party!") }

    if (words.length == 1) {
        if (party == "None") {
            functions.replyMessage(message, "You aren't in a party!");
            return;
        }
        functions.sendMessage(message.channel, functions.generatePartyTemplate(party))
    }
    else if (command == "INFO") {

        if (words.length <= 2) { return functions.replyMessage(message, "Please specify a party to view!") }
        party = message.content.slice(message.content.indexOf(words[2]));
        if (partyData[party] == undefined) { return functions.replyMessage(message, "That party does not exist!") }
        functions.sendMessage(message.channel, functions.generatePartyTemplate(party));
    }
    else if (command == "MEMBERS" || command == "MEMBER") {
        let messages = "**Party Members** \n```\n"
        let partymembers = partyData[party].members
        messages += (userData[partymembers[0]].username + " (Leader)\n");
        for (i = 1; i < partyData[party].members.length; i++) {
            messages += (userData[partymembers[i]].username + "\n");
        }
        messages += "```"
        functions.sendMessage(message.channel, messages);
    }
    else if (command == "CREATE") {//party creation
        if (party == "None") {
            if (userData[id].ascension < 1) { return functions.replyMessage(message, "You need to be at least ascension 1 to create a party!") }
            if (words.length <= 2) {
                functions.replyMessage(message, "Choose a name for your party!");
                return;
            }
            /*
            let temp1 = message.content.slice(message.content.indexOf(words[2]));
            let temp2 = temp1.slice(temp1.indexOf("\"") + 1);
            if (message.content.indexOf("\"") == -1 || temp2.indexOf("\"") == -1) {
              functions.sendMessage(message.channel, "Name must be surrounded by quotation marks.")
              return;
            }
            let partyName = temp2.slice(0, temp2.indexOf("\""));
            */
            words.splice(0, 2)
            let partyName = words.join(" ")
            if (partyName == "" || partyName == "None") {
                functions.sendMessage(message.channel, "The name cannot be blank!")
                return;
            }
            if (!partyData[partyName]) { 
                partyData[partyName] = {};
                partyData[partyName].name = partyName;
                partyData[partyName].leader = id;
                partyData[partyName].members = []; 
                partyData[partyName].members.push(id);
                userData[id].party = partyName;
                functions.replyMessage(message, "You have created the party " + partyName + "!");
            } else {
                functions.replyMessage(message, "That party name is already taken!");
                return;
            }
        } else {
            functions.replyMessage(message, "You are already in a party!");
            return;
        }
    }
    else if (command == "INVITE") {
        if (partyData[party].leader != id) {
            functions.replyMessage(message, "You must be the leader to invite someone!");
            return;
        }
        let target = functions.validate(message,2);
        if (target == false) {
            functions.replyMessage(message, "You can't invite rocks!");
            return;
        }
        if (userData[target].party != "None") {
            functions.replyMessage(message, "They are already in the party " + userData[target].party + "!");
            return;
        }
        if (Math.abs(userData[id].ascension - userData[target].ascension) > 2) {
            functions.replyMessage(message, "You can't invite someone higher or lower than you by two ascensions!");
            return;
        }
        if (partyData[party].members.length > 3) {
            functions.replyMessage(message, "You can't have more than 4 people in a party!");
            return;
        }
        new functions.MessageAwait(message.channel, target, "<@" + target + ">, <@" + id + "> has invited you to their party! Type `accept` to join!", "accept",
            function (response, extraArgs) {
                let party = extraArgs[0]
                let id = extraArgs[1]
                let message = extraArgs[2]
                if (userData[id].party != "None") { return;}
                userData[id].party = party;
                partyData[party].members.push(id);
                functions.sendMessage(message.channel, "<@" + target + "> has joined " + party + "!");
            },
            [party, target, message],
            "They didn't want to join your party..."
        );
    }
    else if (command == "LEAVE") {
        if (partyData[party].leader == id) {
            functions.replyMessage(message, "Party leaders can't leave their party! Disband it or appoint someone else!");
            return;
        }
        if (party == "None") {
            functions.replyMessage(message, "You can't leave a party if you're not in one!");
        }
        var place = partyData[party].members.indexOf(id);
        if (place > -1) {
            partyData[party].members.splice(place, 1);
        }
        userData[id].party = "None";
        functions.replyMessage(message, "You left your party!");
    }
    else if (command == "DISBAND") {
        if (party == "None") {
            functions.replyMessage(message, "You can't disband a party if you're not in one!");
        }
        if (partyData[party].leader != id) {
            functions.replyMessage(message, "Only the leader can disband the party!");
            return;
        }
        for (var i = 0; i < partyData[party].members.length; i++) {
            userData[partyData[party].members[i]].party = "None";
        }
        delete partyData[party];

        functions.replyMessage(message, "You disbanded your party! Everyone in it is now lonely :(");
    }
    else if (command == "KICK") {
        if (partyData[party].leader != id) {
            functions.replyMessage(message, "Only the leader can kick others!")
            return;
        }
        let target = functions.validate(message,2);
        if (target == false) {
            functions.replyMessage(message, "You can't kick a rock! (Well you can, but I wouldn't)");
            return;
        }
        if (userData[target].party != party) {
            functions.replyMessage(message, "You can't kick someone who's not in your party!");
            return;
        }
        if (target == id) {
            functions.replyMessage(message, "You can't kick yourself from the party!");
            return;
        }
       
        let partyName = userData[target].party;
        var place = partyData[partyName].members.indexOf(target);
        if (place > -1) {
            partyData[partyName].members.splice(place, 1);
        }
        userData[target].party = "None";
        functions.sendMessage(message.channel, "<@" + target + "> was kicked from the party!");
    }
    else if (command == "DELETE") {
        if (admins.indexOf(id) == -1) { return }
        words.splice(0, 2)
        let partyName = words.join(" ")
        if (partyName == undefined || partyData[partyName] == undefined) { return functions.replyMessage(message, "Please specify a valid party.") }
        for (var i = 0; i < partyData[partyName].members.length; i++) {
            userData[partyData[partyName].members[i]].party = "None";
        }
        delete partyData[partyName];

        functions.replyMessage(message, partyName + " was disbanded! Everyone in it is now lonely :(");
        return;
    }
}