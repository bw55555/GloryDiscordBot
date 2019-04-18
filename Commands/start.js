var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (userData[id] != undefined){
        functions.replyMessage(message, "You already have an account!")
        return;
    }
//creates profile if none exists
let id = message.author.id
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (!userData[id]) userData[id] = {} //creates profile if none exists
    if (userData[id].username != message.author.username) userData[id].username = message.author.username; //Creates object with name as username
    if (!userData[id].id) userData[id].id = id; //sets id
    if (!userData[id].money) userData[id].money = 0; //gives money object
    if (!userData[id].lastDaily) userData[id].lastDaily = "Not Collected"; //check if daily collected
    if (!userData[id].health) userData[id].health = 10; //Health
    if (!userData[id].currenthealth) userData[id].currenthealth = 0; //Health
    if (!userData[id].xp) userData[id].xp = 0; //XP
    if (!userData[id].level) userData[id].level = 1; //XP
    if (!userData[id].attack) userData[id].attack = 0; //character's attack
    if (!userData[id].defense) userData[id].defense = 0; //character's defense
    if (!userData[id].speed) userData[id].speed = 0; //character's speed
    if (!userData[id].dead) userData[id].dead = false; //character's status (alive/dead)
    if (!userData[id].start) userData[id].start = false; //character's speed
    if (!userData[id].triangle) userData[id].triangle = "None"; //character's class
    if (!userData[id].triangleid) userData[id].triangleid = "0"; //character's class
    if (!userData[id].trianglemod) userData[id].trianglemod = 1.0; //character's class-based damage modifier.
    if (!userData[id].weapon && userData[id].weapon != 0) userData[id].weapon = false;
    if (!userData[id].ability) userData[id].ability = "Ability";
    if (!userData[id].inventory) userData[id].inventory = {};
    if (!userData[id].marry) userData[id].marry = "None";
    if (!userData[id].marrytarget) userData[id].marrytarget = "None";
    if (!userData[id].guild) userData[id].guild = "None";
    if (!userData[id].guildpos) userData[id].guildpos = "None";
    if (!userData[id].guildtarget) userData[id].guildtarget = "None";
    if (!userData[id].bolster) userData[id].bolster = false;
    if (!userData[id].shield) userData[id].shield = ts + 24 * 1000 * 60 * 60;
    if (!userData[id].materials) userData[id].materials = 0;
    //if (!userData[id].explosion) userData[id].explosion = 0;
    //if (!userData[id].box) userData[id].box = 0;
    if (!userData[id].ascension) userData[id].ascension = 0;
    if (!userData[id].bounty) userData[id].bounty = 0;
    //if (!userData[id].sp) userData[id].sp = 0;
    //if (!userData[id].phoenixfeather) userData[id].phoenixfeather = 0;
    //if (!userData[id].nametag) userData[id].nametag = 0;
    //if (!userData[id].reroll) userData[id].reroll = 0;
//test
    if (!userData[id].glory) userData[id].glory = 0;

    if (!userData[id].buffs) userData[id].buffs = {};
    if (!userData[id].buffs.attack) userData[id].buffs.attack = 0;
    if (!userData[id].buffs.defense) userData[id].buffs.defense = 0;
    if (!userData[id].buffs.health) userData[id].buffs.health = 0;

    if (!userData[id].cooldowns) userData[id].cooldowns = {}
    if (!userData[id].cooldowns.normal) userData[id].cooldowns.normal = 1;
    if (!userData[id].cooldowns.attack) userData[id].cooldowns.attack = 1;
    if (!userData[id].cooldowns.heal) userData[id].cooldowns.heal = 1;
    if (!userData[id].cooldowns.rez) userData[id].cooldowns.rez = 1;
    if (!userData[id].cooldowns.work) userData[id].cooldowns.work = 1;
    if (!userData[id].cooldowns.bolster) userData[id].cooldowns.bolster = 1;
    if (!userData[id].cooldowns.smeltall) userData[id].cooldowns.smeltall = 1;
    if (!userData[id].cooldowns.purchase) userData[id].cooldowns.purchase = 1;
    if (!userData[id].cooldowns.merge) userData[id].cooldowns.merge = 1;

    if (!userData[id].skills) userData[id].skills = {}
    if (!userData[id].skillA) userData[id].skillA = "None";
    if (!userData[id].skillB) userData[id].skillB = "None";
    if (!userData[id].skillC) userData[id].skillC = "None";

    if (!userData[id].consum) userData[id].consum = {}

	/*
	if (userData[id].attack > userData[id].level) userData[id].attack = userData[id].level;
	if (userData[id].defense > userData[id].level) userData[id].defense = userData[id].level;
	if (userData[id].health > userData[id].level * 10) userData[id].health = userData[id].level * 10;
	*/
  if (userData[id].currenthealth > userData[id].health) userData[id].currenthealth = userData[id].health;

  if (userData[id].start === false) { //when you start, your currenthealth will be to 10;
    userData[id].currenthealth = 10;
    userData[id].start = true;
    //console.log(userData[id].start);
  }

functions.replyMessage(message, "Welcome to Glory!\nTo get started type \"!help\" to see all the commands available! Go obtain your Glory!")

}
