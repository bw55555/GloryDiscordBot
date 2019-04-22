var functions = require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    personskills = userData[id].skills
    /*
    if (admins.indexOf(id) == -1) {//Soo nobody but admins can use it (for now)
        functions.replyMessage(message, "This feature is still being developed.");
        return
    }
    */
    if (userData[id].consum.reroll <= 0) {//Checks if user has skill points
        functions.replyMessage(message, "You have no more rerolls. Get them by buying in the shop.");
        return;
    }

    if (Object.keys(personskills).length == skillData.length) {//Have all skills
        functions.replyMessage(message, "You already have all the skills.")
        return;
    }

    let removalid = words[1]
    if (removalid == undefined || personskills[removalid] == undefined) { return functions.replyMessage(message, "Please choose a valid skill that you own!") }
    if (functions.hasSkill(id, removalid)) { return functions.replyMessage(message, "You cannot reroll a skill you have equipped!") }
    let skillid = Math.floor(skillData.length * Math.random());
    //while (userData[id].inventory[skillid] != skillid) {
    //    skillrecieved = Math.floor(skillData.length * Math.random);
    //}

    /*if (personskills.length == skillData.length){
        functions.replyMessage(message, "You have all the skills already.");
        return;
    }*/
    delete userData[id].skills[removalid]
    let count = 0;
    while (personskills[skillid] == skillid && skillid != removalid) {
        skillid = Math.floor(skillData.length * Math.random());
        count += 1;
        if (count > 1000) {
            functions.replyMessage(message, "An error has occured. Try it again.");
            userData[id].skills[removalid] = removalid
            return;
        }
    }

    if (skillid > skillData.length) {//Something went wrong
        functions.replyMessage(message, "An error has occured");
        userData[id].skills[removalid] = removalid
        return;
    }
    
    userData[id].skills[skillid] = skillid;
    functions.replyMessage(message, "You replaced the skill " + skillData[removalid].name + " (" + skillData[removalid].id + ") with the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
    functions.consumGive(id, "reroll", -1);
}