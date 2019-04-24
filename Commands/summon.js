var functions = require("../Utils/functions.js")
function countMembers(guild) {
    let members = guild.members
    let count = 0
    let keys = members.keys()
    for (let value of keys) {
        if (!members.get(value).user.bot) {
            count++
        } 
    }
    return count
}
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)

  if (!mobData[message.channel.id]) {
      if (message.channel.type == "dm" || message.channel.type == "group" || message.guild == undefined || message.guild == null || (countMembers(message.guild) < 50 && devs.indexOf(id) == -1)) { return functions.replyMessage(message, "You cannot summon a raid in a server with less than 50 members!") }
  }
  if (message.channel.type!="dm" && message.channel.name=="treant-raid") {
    if (serverData[message.guild.id].treant != undefined && (serverData[message.guild.id].treant==message.channel.id && admins.indexOf(id)==-1)) { return functions.replyMessage(message, "You already have a treant raid in this server!") }
    else {serverData[message.guild.id].treant=message.channel.id}
    if (!mobData[message.channel.id]) mobData[message.channel.id] = {} //creates profile if none exists
    if (!mobData[message.channel.id].name) mobData[message.channel.id].name = "Treant Boss";
    if (!mobData[message.channel.id].attack) mobData[message.channel.id].attack = 0;
    if (!mobData[message.channel.id].id) mobData[message.channel.id].id = 1;
    if (!mobData[message.channel.id].currenthealth) mobData[message.channel.id].currenthealth = 0;
    if (!mobData[message.channel.id].reward) mobData[message.channel.id].reward = 0;
    if (!mobData[message.channel.id].alive) mobData[message.channel.id].alive = false;
    if (!mobData[message.channel.id].raid) mobData[message.channel.id].raid = false;
    if (!mobData[message.channel.id].level) mobData[message.channel.id].level = 0;
    if (!mobData[message.channel.id].minlevel) mobData[message.channel.id].minlevel = 0;
    if (!mobData[message.channel.id].maxlevel) mobData[message.channel.id].maxlevel = 25;
    if (!mobData[message.channel.id].url) mobData[message.channel.id].url = 'https://i.imgur.com/1fbm4us.jpg';
  }
  else if (message.channel.type!="dm" && message.channel.name=="kraken-raid") {
    if (serverData[message.guild.id].kraken != undefined && (serverData[message.guild.id].kraken == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a kraken raid in this server!") }
    else {serverData[message.guild.id].kraken=message.channel.id}
    if (!mobData[message.channel.id]) mobData[message.channel.id] = {} //creates profile if none exists
    if (!mobData[message.channel.id].name) mobData[message.channel.id].name = "Kraken Boss";
    if (!mobData[message.channel.id].attack) mobData[message.channel.id].attack = 0;
    if (!mobData[message.channel.id].id) mobData[message.channel.id].id = 1;
    if (!mobData[message.channel.id].currenthealth) mobData[message.channel.id].currenthealth = 0;
    if (!mobData[message.channel.id].reward) mobData[message.channel.id].reward = 0;
    if (!mobData[message.channel.id].alive) mobData[message.channel.id].alive = false;
    if (!mobData[message.channel.id].raid) mobData[message.channel.id].raid = false;
    if (!mobData[message.channel.id].level) mobData[message.channel.id].level = 0;
    if (!mobData[message.channel.id].minlevel) mobData[message.channel.id].minlevel = 25;
    if (!mobData[message.channel.id].maxlevel) mobData[message.channel.id].maxlevel = 50;
    if (!mobData[message.channel.id].url) mobData[message.channel.id].url = 'https://i.imgur.com/mGKIsnX.jpg';
  }
  else if (message.channel.type!="dm" && message.channel.name=="dragon-raid") {
    if (serverData[message.guild.id].dragon != undefined && (serverData[message.guild.id].dragon == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a dragon raid in this server!") }
    else {serverData[message.guild.id].dragon=message.channel.id}
    if (!mobData[message.channel.id]) mobData[message.channel.id] = {} //creates profile if none exists
    if (!mobData[message.channel.id].name) mobData[message.channel.id].name = "Dragon Boss";
    if (!mobData[message.channel.id].attack) mobData[message.channel.id].attack = 0;
    if (!mobData[message.channel.id].id) mobData[message.channel.id].id = 1;
    if (!mobData[message.channel.id].currenthealth) mobData[message.channel.id].currenthealth = 0;
    if (!mobData[message.channel.id].reward) mobData[message.channel.id].reward = 0;
    if (!mobData[message.channel.id].alive) mobData[message.channel.id].alive = false;
    if (!mobData[message.channel.id].raid) mobData[message.channel.id].raid = false;
    if (!mobData[message.channel.id].level) mobData[message.channel.id].level = 0;
    if (!mobData[message.channel.id].minlevel) mobData[message.channel.id].minlevel = 50;
    if (!mobData[message.channel.id].maxlevel) mobData[message.channel.id].maxlevel = 75;
    if (!mobData[message.channel.id].url) mobData[message.channel.id].url = 'https://i.imgur.com/YCdZZmT.jpg';
  }
  else if (message.channel.type!="dm" && message.channel.name=="deity-raid") {
    if (message.channel.id != 544708347190837251) { return functions.replyMessage(message, "This is for the support server only!") }
    if (serverData[message.guild.id].deity != undefined && (serverData[message.guild.id].deity == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a deity raid in this server!")}
    else { serverData[message.guild.id].deity = message.channel.id }
    if (!mobData[message.channel.id]) mobData[message.channel.id] = {} //creates profile if none exists
    if (!mobData[message.channel.id].name) mobData[message.channel.id].name = "Deity Boss";
    if (!mobData[message.channel.id].attack) mobData[message.channel.id].attack = 0;
    if (!mobData[message.channel.id].id) mobData[message.channel.id].id = 1;
    if (!mobData[message.channel.id].currenthealth) mobData[message.channel.id].currenthealth = 0;
    if (!mobData[message.channel.id].reward) mobData[message.channel.id].reward = 0;
    if (!mobData[message.channel.id].alive) mobData[message.channel.id].alive = false;
    if (!mobData[message.channel.id].raid) mobData[message.channel.id].raid = false;
    if (!mobData[message.channel.id].level) mobData[message.channel.id].level = 0;
    if (!mobData[message.channel.id].minlevel) mobData[message.channel.id].minlevel = 75;
    if (!mobData[message.channel.id].maxlevel) mobData[message.channel.id].maxlevel = 100;
    if (!mobData[message.channel.id].url) mobData[message.channel.id].url = 'https://i.imgur.com/o842h20.jpg';
  }
  else if (message.channel.type != "dm" && message.channel.name == "hell-raid") {
      if (message.channel.id != 570356602843168769) { return functions.replyMessage(message, "This is for the support server only!") }
      if (admins.indexOf(id) == -1) { return functions.replyMessage(message, "Admin-only")}
      if (serverData[message.guild.id].hell != undefined && (serverData[message.guild.id].hell == message.channel.id && admins.indexOf(id) == -1)) { return functions.replyMessage(message, "You already have a deity raid in this server!") }
      else { serverData[message.guild.id].deity = message.channel.id }
      if (!mobData[message.channel.id]) mobData[message.channel.id] = {} //creates profile if none exists
      if (!mobData[message.channel.id].name) mobData[message.channel.id].name = "Hell Lord";
      if (!mobData[message.channel.id].attack) mobData[message.channel.id].attack = 0;
      if (!mobData[message.channel.id].id) mobData[message.channel.id].id = 1;
      if (!mobData[message.channel.id].currenthealth) mobData[message.channel.id].currenthealth = 0;
      if (!mobData[message.channel.id].reward) mobData[message.channel.id].reward = 0;
      if (!mobData[message.channel.id].alive) mobData[message.channel.id].alive = false;
      if (!mobData[message.channel.id].raid) mobData[message.channel.id].raid = false;
      if (!mobData[message.channel.id].level) mobData[message.channel.id].level = 0;
      if (!mobData[message.channel.id].minlevel) mobData[message.channel.id].minlevel = 100;
      if (!mobData[message.channel.id].maxlevel) mobData[message.channel.id].maxlevel = 200;
      if (!mobData[message.channel.id].url) mobData[message.channel.id].url = 'https://imgur.com/MbGhMkJ.jpg';
      if (!mobData[message.channel.id].ability) mobData[message.channel.id].ability = '25% chance to pierce, 25% chance to crit and deal 2x damage. ';
  }
  else {return functions.replyMessage(message,"Please name the channel either #treant-raid, #kraken-raid, or #dragon-raid.")}
  let summonlevel = Math.floor((mobData[message.channel.id].minlevel) + (((mobData[message.channel.id].maxlevel) - (mobData[message.channel.id].minlevel)) * Math.random())) + 1
  mobData[message.channel.id].alive = true;
  mobData[message.channel.id].raid = true;
  mobData[message.channel.id].attack = summonlevel * 10;
  mobData[message.channel.id].currenthealth = summonlevel * 5;
  mobData[message.channel.id].maxhealth = summonlevel * 5;
  mobData[message.channel.id].reward = summonlevel * 500;
  mobData[message.channel.id].level = summonlevel
  mobData[message.channel.id].attacklist = {}
  functions.replyMessage(message, "Boss summoned. It is level " + summonlevel + "!");
}