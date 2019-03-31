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
    if (ts - dam[i].time > 2000) {
      userData[otherID].currenthealth -= dam[i].damage;
      functions.replyMessage(message, "" + dam[i].damage + " damage taken.");
      if (userData[otherID].currenthealth <= 0) {
        duel = {};
        functions.replyMessage(message, "" + userData[otherID].username + " has died. " + userData[id].username + " has won the duel!");
        return;
      }
      dam.splice(i, i+1);
    }
  }
  for (i = myDam.length - 1; i >= 0; i--) {
    if (ts - myDam[i].time > 2000) {
      userData[id].currenthealth -= myDam[i].damage;
      functions.replyMessage(message, "" + myDam[i].damage + " damage taken.");
      if (userData[id].currenthealth <= 0) {
        duel = {};
        functions.replyMessage(message, "" + userData[id].username + " has died. " + userData[otherID].username + " has won the duel!");
        return;
      }
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
    functions.replyMessage(message, "Attack for " + rnd + " damage");
  }
  else if (words[1] == "p" || words[1] == "parry") {
    if (ts - cds[2] < 3000) {return functions.replyMessage(message, "On cooldown");}
    cds[2] = ts;
    for (i = myDam.length - 1; i >= 0; i--) {
      if (myDam[i].action == 1 && ts - myDam[i].time < 2000) {
        let calc = 0;
        let damage = 0;
        calc = Math.floor(100 - (ts - myDam[i].time) / 25);
        damage = Math.floor(myDam[i].damage * calc / 100);
        myDam.splice(i, i+1);
        userData[id].currenthealth -= damage;
        functions.replyMessage(message, "" + damage + " damage taken after attack with parry for " + calc + "% damage reduction");
        if (userData[id].currenthealth <= 0) {
          duel = {};
          functions.replyMessage(message, "" + userData[id].username + " has died. " + userData[otherID].username + " has won the duel!");
          return;
        }
      }
    }  
  }

}
