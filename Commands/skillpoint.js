var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    //let ts = message.createdTimestamp;
    //let words = message.content.trim().split(/\s+/)
    personskills = userData[id].skills
    /*if (admins.indexOf(id) == -1) {//Soo nobody but admins can use it (for now)
        functions.replyMessage(message, "This feature is still being developed.");
        return
    }*/
    if (userData[id].consum.sp <= 0) {//Checks if user has skill points
        functions.replyMessage(message, "You have no more skill points. Get them by Ascending.");
        return;
    }
    if (Object.keys(personskills).length == skillData.length) {//Have all skills
        functions.replyMessage(message, "You already have all the skills.")
        return;
    }
    let skillid = Math.floor(skillData.length * Math.random());
    //while (userData[id].inventory[skillid] != skillid) {
    //    skillrecieved = Math.floor(skillData.length * Math.random);
    //}

    /*if (personskills.length == skillData.length){
        functions.replyMessage(message, "You have all the skills already.");
        return;
    }*/

    let count = 0;
    while (personskills[skillid] == skillid) {
        skillid = Math.floor(skillData.length * Math.random());
        count += 1;
        if (count > 1000) {
            functions.replyMessage(message, "An error has occured. Try it again.");
            return;
        }
    } 

    if (skillid > skillData.length) {//Something went wrong
        functions.replyMessage(message, "An error has occured");
        return;
    }
    userData[id].skills[skillid] = skillid
    functions.replyMessage(message, "You earned the skill " + skillData[skillid].name + " (" + skillData[skillid].id + ")!");
    functions.consumGive(id, "sp", -1);
}