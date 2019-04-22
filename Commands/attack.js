var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.split(/\s+/)
  if (userData[id].cooldowns.attack > ts) {
    functions.deleteMessage(message);
    functions.replyMessage(message, 'You can\'t attack right now. You can attack again in ' + functions.displayTime(userData[id].cooldowns.attack, ts));
    return;
  }

  if (userData[id].dead === true) {
    functions.replyMessage(message, "Corpses can\'t attack! Do !resurrect");
    return;
  }
  let target = functions.validate(message)
  if (target == false) {
    return;
  }
  if (userData[target].dead === true) {
    functions.replyMessage(message, "Don't attack corpses!");
    return;
  }
  if (target === id) {
    functions.replyMessage(message, "Don't attack yourself!");
    return;
  }
  if (userData[target].shield > ts) {
    functions.replyMessage(message, "They are protected from attacks! Try again in " + functions.displayTime(userData[target].shield, ts));
    return;
  }
  if (userData[id].ascension * 10 + userData[id].level > userData[target].ascension * 10 + userData[target].level + 100) {
    functions.replyMessage(message, "You can't attack anyone that's less than 25 levels less than you!");
    return;
  }
  if (userData[id].ascension * 10 + userData[id].level < userData[target].ascension * 10 + userData[target].level - 100) {
    functions.replyMessage(message, "You can't attack anyone that's more than 25 levels higher than you!");
    return;
  }
  if (userData[id].shield > ts) {
    functions.replyMessage(message, "You just attacked! You lost your shield :(");
    userData[id].shield = 1
  }
  functions.dmUser(target, "You have been attacked by " + userData[id].username + "! Their id is " + id)
  let damage = functions.calcDamage(message, id, target, id);//ok...
  let counter = functions.calcDamage(message, target, id, id);

  if (damage < 0) {
    damage = 0;
  }
  if (counter < 0) {
    counter = 0;
  }
  userData[id].currenthealth = userData[id].currenthealth - counter;
  userData[target].currenthealth = userData[target].currenthealth - damage;
  //console.log('targethealth: ' + userData[target].currenthealth);
  let stolen = Math.floor((userData[target].money) / 5);
  let counterstolen = Math.floor((userData[id].money) / 5);
  /*
  userData[target].xp += counter * userData[id].level;
  userData[id].xp += damage * userData[target].level;
  */
  if (userData[id].currenthealth > userData[id].health) {
    userData[id].currenthealth = userData[id].health
  }

  if (userData[target].currenthealth > userData[target].health) {
    userData[target].currenthealth = userData[target].health
  }

  functions.sendMessage(message.channel, {
    embed: {
      title: '<:pvpattack:549652727744167936>' + message.author.username + " attacks " + userData[target].username + "!",
      color: 0xF1C40F,
      fields: [
        {
          name: "Attack Results",
          value: "<@" + target + "> took " + damage + " damage! They have " + userData[target].currenthealth + " Health remaining!",
        }, {
          name: "Counter Results",
          value: "<@" + id + "> took " + counter + " counterdamage! You have " + userData[id].currenthealth + " Health remaining!",
        }
      ]
    }
  });

  if (userData[target].currenthealth <= 0 && userData[id].currenthealth <= 0) {
    userData[target].dead = true;
    userData[target].currenthealth = 0;
    userData[id].dead = true;
    userData[id].currenthealth = 0;
    userData[id].xp = 0
    userData[target].xp = 0
    userData[target].money -= stolen;
    userData[id].money -= counterstolen;
    functions.sendMessage(message.channel, '<@' + id + '> and <@' + target + '> was killed! Both lost 10% of their money.');
    if (userData[id].bounty > 0) {
      functions.sendMessage(message.channel, '<@' + target + "> collected your bounty of $" + userData[id].bounty);
      userData[target].money += userData[id].bounty;
      userData[id].bounty = 0;
    }
    if (userData[target].bounty > 0) {
      functions.sendMessage(message.channel, 'You collected <@' + target + ">'s bounty of $" + userData[target].bounty);
      userData[id].money += userData[target].bounty;
      userData[target].bounty = 0;
    }

    if (questData.questInfo.current == 2 && target == "290980432382787585") {
      questData.questInfo.questList[2].completed++;
    }
  }
  else if (userData[target].currenthealth <= 0) {
    userData[target].dead = true;
    userData[target].currenthealth = 0;
    userData[target].money -= stolen;
    userData[id].money += stolen;
    functions.sendMessage(message.channel, '<@' + target + '> was killed! You stole $' + stolen + ' from their body.');
    if (userData[target].bounty > 0) {
      functions.sendMessage(message.channel, 'You collected <@' + target + ">'s bounty of $" + userData[target].bounty);
      userData[id].money += userData[target].bounty;
      userData[target].bounty = 0;
    }

    userData[id].xp += userData[target].xp
    userData[target].xp = 0

    if (userData[id].glory != undefined && userData[target].glory != undefined) {
      let glorywon = (userData[target].level / userData[id].level) * userData[target].glory * 0.005
      if (glorywon > 1.5) {
        glorywon = 1.5
      }
      userData[target].glory -= glorywon
      userData[id].glory += glorywon
    }

    if (userData[id].currenthealth > 0 && functions.hasSkill(id, 15)) {
      userData[id].currenthealth = userData[id].health
      functions.sendMessage(message.channel, "Soulsteal activated. <@" + id + "> has been restored to full health.");
    }

  } else if (userData[id].currenthealth <= 0) {
    userData[id].dead = true;
    userData[id].currenthealth = 0;
    userData[id].money -= counterstolen;
    userData[target].money += counterstolen;
    functions.sendMessage(message.channel, '<@' + id + '> (you) were killed! <@' + target + '> stole $' + counterstolen + ' from your body.');
    if (userData[id].bounty > 0) {
      functions.sendMessage(message.channel, '<@' + target + "> collected your bounty of $" + userData[id].bounty);
      userData[target].money += userData[id].bounty;
      userData[id].bounty = 0;
    }
    userData[target].xp += userData[id].xp
    userData[id].xp = 0

    if (userData[id].glory != undefined && userData[target].glory != undefined) {
      let glorywon = (userData[id].level / userData[target].level) * userData[id].glory * 0.005
      if (glorywon > 1.5) {
        glorywon = 1.5
      }
      userData[target].glory += glorywon
      userData[id].glory -= glorywon
    }


    if (userData[target].currenthealth > 0 && functions.hasSkill(target, 15)) {
      userData[target].currenthealth = userData[target].health
      functions.sendMessage(message.channel, "Soulsteal activated. <@" + target + "> has been restored to full health.");
    }
  }
  userData[id].cooldowns.attack = ts + attackcd * 60 * 1000
  userData[id].cooldowns.heal = ts + healcd * 60 * 1000
  userData[target].cooldowns.heal = ts + healcd * 60 * 1000
  userData[id].cooldowns.purchase = ts + 1000 * 60
  userData[target].cooldowns.purchase = ts + 1000 * 60
  userData[id].speed += 1;
  userData[target].speed += 1;
}
