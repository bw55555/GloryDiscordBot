var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.split(/\s+/)
  let stat = 0;
  let cds = 0;
  let rnd = 0;
  let dam = 0;
  let myDam = 0;
  let move = 0;  
  let otherID = 0;
  let reactTime = 2500;

  if (duel.happening == undefined) {return functions.replyMessage(message, "There is no duel currently!");}
  
  if (id != duel.opponent && id != duel.challenger) {return functions.replyMessage(message, "You are not part of the duel!");}
  stat = duel.cAtk;
  cds = duel.cCds;
  dam = duel.oDam;
  myDam = duel.cDam;
  otherID = duel.opponent;

  if (id == duel.opponent) {
      stat = duel.oAtk;
      cds = duel.oCds;
      dam = duel.cDam;
      myDam = duel.oDam;
      otherID = duel.challenger;
  }
  
  if (words.length < 2) {
      return functions.replyMessage(message, "Add an action");
  }
  
  let i = 0;
  for (i = dam.length - 1; i >= 0; i--) {
    if (ts - dam[i].time > reactTime) {
      userData[otherID].currenthealth -= dam[i].damage;
      functions.duelCheckDeath(message, otherID, id, ts);
      dam.splice(i, i+1);
    }
  }
  for (i = myDam.length - 1; i >= 0; i--) {
    if (ts - myDam[i].time > reactTime) {
      userData[id].currenthealth -= myDam[i].damage;
      functions.duelCheckDeath(message, id, otherID, ts);
      myDam.splice(i, i+1);
    }
  }

  rnd = Math.floor((Math.random() / 2 + 0.35) * stat);
  if (cds[0] == true) {rnd = Math.floor(rnd * 1.5); cds[0] = false;}

  if (words[1] == "a" || words[1] == "attack") {
    if (ts - cds[1] < 3000) {return functions.replyMessage(message, "On cooldown");}
    cds[1] = ts;
    move = {action: 1, time: ts, damage: rnd};
    dam.push(move);
    return functions.replyMessage(message, "Attack for " + rnd + " damage");
  }
  else if (words[1] == "p" || words[1] == "parry") {
    if (ts - cds[2] < 3000) {return functions.replyMessage(message, "On cooldown");}
    cds[2] = ts;
    move = {action: 2, time: ts, damage: 0};
    myDam.push(move);
    for (i = myDam.length - 1; i >= 0; i--) {
      if (myDam[i].action == 1 && ts - myDam[i].time < reactTime) {
        let calc = 0;
        let damage = 0;
        calc = Math.floor(100 - (ts - myDam[i].time) * 80 / reactTime);
        damage = Math.floor(myDam[i].damage * calc / 100);
        myDam.splice(i, i+1);
        userData[id].currenthealth -= damage;
        functions.replyMessage(message, "Parry for " + calc + "% damage reduction");
        return functions.duelCheckDeath(message, id, otherID, ts);
      }
      else if ((myDam[i].action == 3 || myDam[i].action == 5) && ts - myDam[i].time < reactTime) {
        let calc = 0;
        let damage = 0;
        calc = Math.floor(100 - (ts - myDam[i].time) * 40 / reactTime);
        damage = Math.floor(myDam[i].damage * calc / 100);
        myDam.splice(i, i+1);
        userData[id].currenthealth -= damage;
        functions.replyMessage(message, "Parry for " + calc + "% damage reduction");
        return functions.duelCheckDeath(message, id, otherID, ts);
      }
    } 
    return functions.replyMessage(message, "Parry failed. Too slow!");
  }
  else if (words[1] == "sh" || words[1] == "shoot") {
    if (ts - cds[3] < 5000) {return functions.replyMessage(message, "On cooldown");}
    cds[3] = ts;
    for (i = dam.length - 1; i >= 0; i--) {
      if (dam[i].action == 6) {
        rnd = Math.floor(rnd * 1.3);
        functions.replyMessage(message, "Shot for " + rnd + " damage with 30% damage boost after opponent evaded.");
        move = {action: 3, time: ts, damage: rnd};
        dam.push(move);
        return;
      }
    }
    move = {action: 3, time: ts, damage: rnd};
    dam.push(move);
    return functions.replyMessage(message, "Shot for " + rnd + " damage");
  }
  else if (words[1] == "d" || words[1] == "dodge") {
    if (ts - cds[4] < 5000) {return functions.replyMessage(message, "On cooldown");}
    cds[4] = ts;
    move = {action: 4, time: ts, damage: 0};
    myDam.push(move);
    for (i = myDam.length - 1; i >= 0; i--) {
      if (myDam[i].action == 3 && ts - myDam[i].time < reactTime) {
        let calc = 0;
        let damage = 0;
        calc = Math.floor(100 - (ts - myDam[i].time) * 100 / reactTime);
        damage = Math.floor(myDam[i].damage * calc / 100);
        myDam.splice(i, i+1);
        userData[id].currenthealth -= damage;
        functions.replyMessage(message, "Dodged the shot for " + calc + "% damage reduction");
        return functions.duelCheckDeath(message, id, otherID, ts);
      }
    }
    return functions.replyMessage(message, "Dodge from " + userData[id].username + " failed. Too slow!");
  }
  else if (words[1] == "st" || words[1] == "stab") {
    if (ts - cds[5] < 5000) {return functions.replyMessage(message, "On cooldown");}
    cds[5] = ts;  
    for (i = dam.length - 1; i >= 0; i--) {
      if (dam[i].action == 4) {
        rnd = Math.floor(rnd * 1.3);
        functions.replyMessage(message, "Stabbed for " + rnd + " damage with 30% damage boost after opponent dodged.");
        move = {action: 5, time: ts, damage: rnd};
        dam.push(move);
        return;
      }
    }
    move = {action: 5, time: ts, damage: rnd};
    dam.push(move);
    return functions.replyMessage(message, "Stab for " + rnd + " damage");
  }
  else if (words[1] == "e" || words[1] == "evade") {
    if (ts - cds[6] < 5000) {return functions.replyMessage(message, "On cooldown");}
    cds[6] = ts;
    move = {action: 6, time: ts, damage: 0};
    myDam.push(move);
    for (i = myDam.length - 1; i >= 0; i--) {
      if (myDam[i].action == 5 && ts - myDam[i].time < reactTime) {
        let calc = 0;
        let damage = 0;
        calc = Math.floor(100 - (ts - myDam[i].time) * 100 / reactTime);
        damage = Math.floor(myDam[i].damage * calc / 100);
        myDam.splice(i, i+1);
        userData[id].currenthealth -= damage;
        functions.replyMessage(message, "Evaded the stab for " + calc + "% damage reduction");
        return functions.duelCheckDeath(message, id, otherID, ts);
      }
    }
    return functions.replyMessage(message, "Evasion failed. Too slow!"); 
 }
 else if (words[1] == "r" || words[1] == "resign") {
    userData[id].cooldowns.heal = ts - 60000;
    userData[otherID].cooldowns.heal = ts - 60000;
    duel = {};
    return functions.replyMessage(message, "" + userData[id].username + " has resigned. " + userData[otherID].username + " won!"); 
 }

}
