var functions=require("../Utils/functions.js")
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (userData[id].level < 5) {
    functions.replyMessage(message, 'You must be level 5 to choose a class!');
    return;
  }
  let text = message.content.toUpperCase().split(" ");
  if (text.length == 1) {
    functions.sendMessage(message.channel,
      "`!class [Pick a class!]` - At level 5, you can choose a class!\n" +
      "<:archer:542178096246423594> Archer - Deal increased damage against Mages.\n" +
      "<:mage:542093501660266497> Mage - Deal increased damage against Warriors.\n" +
      "<:warrior:542061062405750795> Warrior - Deal increased damage against Archers.\n" +
      "\n" +
      "Warning: You can only choose this at level 5+, and will lose 1 level.\n" +
      "----------------------------------------------------------------\n" +
      "<:assassin:542178120141373440> Assassin - Archer subclass; Chance of critical damage while attacking\n" +
      "<:Merchant:541741539991486465> Merchant - Archer subclass; Earn more from `!work`!\n" +
      "<:Healer:541737142376857601> Healer - Mage subclass; Gain the ability to rez others at the cost of your own life\n" +
      "<:oracle:542183480558092308> Oracle - Mage subclass; Gain the ability to `!predict`\n" +
      "<:bloodlifeweaver:542188575333023754> Life/Bloodweaver - Mage subclass; `!swap` between Lifeweaver and Bloodweaver, gaining lifesteal or life sacrifice!\n" +
      "<:berserker:541748571662188549> Berserker - Warrior Subclass; Deals increased damage while damaged\n" +
      "<:paladin:542093280930824202> Paladin - Warrior Subclass; `!bolster` other players! They are buffed during their next attack!\n" +
      "\n" +
      "Warning: You can only choose this at level 15+, and will lose 1 level."

    );
    return;
  }
  let classpick = text[1];
  //console.log(classpick);
  if (classpick === 'ARCHER') {
    userData[id].triangle = '<:archer:542178096246423594> Archer';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "1";
    userData[id].trianglemod = 1.4; //People with classes automatically deal increased damage.
    functions.replyMessage(message, 'You are now an Archer!');
  }
  else if (classpick === 'MAGE') {
    userData[id].triangle = '<:mage:542093501660266497> Mage';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "2";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now a Mage!');
  }
  else if (classpick === 'WARRIOR') {
    userData[id].triangle = '<:warrior:542061062405750795> Warrior';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "3";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now a Warrior!');
  } else if (classpick === 'ASSASSIN') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 !== 1) {
      functions.replyMessage(message, "You must be level 15 Archer to choose this subclass");
      return;
    }
    userData[id].triangle = '<:assassin:542178120141373440> Assassin';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "4";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now an Assassin!');
  } else if (classpick === 'MERCHANT') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 !== 1) {
      functions.replyMessage(message, "You must be level 15 Archer to choose this subclass");
      return;
    }
    userData[id].triangle = '<:Merchant:541741539991486465> Merchant';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "7";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now a Merchant!');
  } else if (classpick === 'HEALER') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 !== 2) {
      functions.replyMessage(message, "You must be level 15 Mage to choose this subclass");
      return;
    }
    userData[id].triangle = '<:Healer:541737142376857601> Healer';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "5";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now a Healer!');
  } else if (classpick === 'ORACLE') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 !== 2) {
      functions.replyMessage(message, "You must be level 15 Mage to choose this subclass");
      return;
    }
    userData[id].triangle = '<:oracle:542183480558092308> Oracle';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "8";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now an Oracle!');
  } else if (classpick === 'LIFEWEAVER' || classpick === 'BLOODWEAVER' || classpick === 'WEAVER') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 !== 2) {
      functions.replyMessage(message, "You must be level 15 Mage to choose this subclass");
      return;
    }
    userData[id].triangle = '<:bloodlifeweaver:542188575333023754> Life/Bloodweaver';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "11";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now an Lifeweaver!');
  } else if (classpick === 'BERSERKER') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 != 0) {
      functions.replyMessage(message, "You must be level 15 Warrior to choose this subclass");
      return;
    }
    userData[id].triangle = '<:berserker:541748571662188549> Berserker';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "6";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now a Berserker!');
  } else if (classpick === 'PALADIN') {
    if (userData[id].level < 15 || (userData[id].triangleid) % 3 != 0) {
      functions.replyMessage(message, "You must be level 15 Warrior to choose this subclass");
      return;
    }
    userData[id].triangle = '<:paladin:542093280930824202> Paladin';
    userData[id].xp = 0;
    userData[id].level -= 1;
    userData[id].triangleid = "9";
    userData[id].trianglemod = 1.4;
    functions.replyMessage(message, 'You are now a Paladin!');
  } else {
    functions.replyMessage(message, 'That is not an available class!');
  }
}