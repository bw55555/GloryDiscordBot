const guildRaidData=require("../Assets/guildRaidData.json")
var functions = require("../Utils/functions.js")
const guildStore = [
    { "name": "Common Scroll", "price": 50000, "levels": [0, 10, 20, 30, 40], "stocks": [1, 1, 1, 1, 1] },
    { "name": "Uncommon Scroll", "price": 250000, "levels": [10, 20, 30, 40], "stocks": [1, 1, 1, 1] },
    { "name": "Rare Scroll", "price": 1000000, "levels": [20, 30, 40], "stocks": [1, 1, 1] },
    { "name": "Epic Scroll", "price": 5000000, "levels": [30, 40], "stocks": [1, 1] },
    { "name": "Legendary Scroll", "price": 5000000, "levels": [40], "stocks": [1] },
    { "name": "Box", "level": 1, "stock": 10, "price": 20000, "id": 5, "levels": [0, 5, 10, 15, 20,25,30,35,40,45,50], "stocks": [25, 75, 150, 250, 500,1000,2000,3000,4000,5000,10000] }
]
const guildBuffStore = [
    { "name": "Attack +", "stat": "attack", "levels": [0,10,20,30,40,50,60,70,80,90,100], "bonus": [0,0.2,0.4,0.6,0.8,1,1.5,2,2.5,3,4]},
    { "name": "Defense +", "stat": "defense", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1, 1.5, 2, 2.5, 3, 4] },
    { "name": "CritDamage +", "stat": "critDamage", "levels": [0,20,40,60,80,100], "bonus": [0,2,4,6,8,10] },
    { "name": "CritRate +", "stat": "critRate", "levels": [0, 20, 40, 60, 80, 100], "bonus": [0, 0.02, 0.04, 0.06, 0.08, 0.1] },
    { "name": "LifeSteal +", "stat": "lifeSteal", "levels": [0,20,30,40,50,60], "bonus": [0,0.1,0.2,0.3,0.4,0.5] },
    { "name": "Spikes +", "stat": "spikes", "levels": [0,20,40,60,80,100], "bonus": [0,0.2,0.4,0.6,0.8,1] },
    { "name": "Block +", "stat": "spikes", "levels": [0,20,40,60,80,100], "bonus": [0,0.02,0.05,0.1,0.15,0.2] },
    { "name": "Revenge +", "stat": "revenge", "levels": [0,25,50,75,90,100], "bonus": [0,0.02,0.05,0.1,0.15,0.2] },
    { "name": "Tempo +", "stat": "tempo", "levels": [0,20,40,60,80,100], "bonus": [0,0.5,1,1.5,2,2.5] },
    { "name": "Sacrifice +", "stat": "sacrifice", "levels": [0,20,40,60,80,100], "bonus": [0,0.1,0.2,0.3,0.4,0.5] },
    { "name": "Lucky +", "stat": "lucky", "levels": [0,10,20,30,40,50,60,70,80,90,100], "bonus": [0,0.1,0.2,0.3,0.5,0.8,1.3,2.1,3.4,5.5,8.9] },
    { "name": "Revenge +", "stat": "revenge", "levels": [], "bonus": [] },
    { "name": "Rage +", "stat": "rage", "levels": [], "bonus": [] },
    { "name": "Pierce +", "stat": "pierce", "levels": [], "bonus": [] }
]
module.exports=function(message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  /*
  while (userData[id].guild != "None" && guildData[userData[id].guild].xp>=guildData[userData[id].guild].level*1000) {
	guildData[userData[id].guild].xp-=guildData[userData[id].guild].level*1000
	guildData[userData[id].guild].level+=1
	functions.replyMessage(message, userData[id].guild+ " leveled up to level "+guildData[userData[id].guild].level)
  }
  */
  let leveluptext=""
  while (userData[id].guild != "None" && guildData[userData[id].guild].level*200000+800000>guildData[userData[id].guild].bankmax) {
    guildData[userData[id].guild].bankmax+=200000
    guildData[userData[id].guild].materialmax+=200000
    leveluptext+=userData[id].guild+" had their guild bank max increased to "+guildData[userData[id].guild].bankmax+"\n"+userData[id].guild+" had their guild materials max increased to "+guildData[userData[id].guild].materialmax
    if (leveluptext.length > 1900) {
        functions.replyMessage(message, leveluptext)
        leveluptext=""
    }
  }
  if (leveluptext != "") { functions.replyMessage(message,leveluptext)}
  let guild = userData[id].guild;
  if (words.length == 1) {
    if (userData[id].guild == "None") {
      functions.replyMessage(message, "You don't have a guild!");
      return;
    }
    guild = userData[id].guild;
    functions.sendMessage(message.channel, functions.generateGuildTemplate(guild))
  }
  else if (words[1].toUpperCase() == "INFO") {
    if (words.length <= 2) { return functions.replyMessage(message, "Please specify a guild to view!") }
    guild = message.content.slice(message.content.indexOf(words[2]));
    if (guildData[guild] == undefined) { return functions.replyMessage(message, "That guild does not exist!") }
    functions.sendMessage(message.channel, functions.generateGuildTemplate(guild));
  }
  else if (words[1].toUpperCase() == "MEMBERS" || words[1].toUpperCase() == "MEMBER") {
    let messages = "**Guild Members** \n```\n"
    let guildmembers = guildData[userData[id].guild].members
    for (i = 0; i < guildData[userData[id].guild].members.length; i++) {
      messages += (userData[guildmembers[i]].username + " (" + userData[guildmembers[i]].guildpos + ")\n");
    }
    messages += "```"
    functions.sendMessage(message.channel, messages);
  }
  else if (words[1].toUpperCase() == "CREATE") {//guild creation
    if (userData[id].guild == "None") {
        if (userData[id].ascension < 3) { return functions.replyMessage(message, "You need to be at least ascension 3 to create a guild!") }
        if (userData[id].money <= 1000000) { return functions.replyMessage(message, "You need at least $1000000 to create a guild!") }
        if (userData[id].materials <= 10000) { return functions.replyMessage(message, "You need at least 10000 materials to create a guild!") }
      if (words.length <= 2) {
        functions.replyMessage(message, "Choose a name for your guild!");
        return;
      }
      /*
      let temp1 = message.content.slice(message.content.indexOf(words[2]));
      let temp2 = temp1.slice(temp1.indexOf("\"") + 1);
      if (message.content.indexOf("\"") == -1 || temp2.indexOf("\"") == -1) {
        functions.sendMessage(message.channel, "Name must be surrounded by quotation marks.")
        return;
      }
      let guildName = temp2.slice(0, temp2.indexOf("\""));
      */
      words.splice(0,2)
      let guildName = words.join(" ")
      if (guildName == "" || guildName == "None") {
        functions.sendMessage(message.channel, "The name cannot be blank!")
        return;
      }
      if (!guildData[guildName]) { //<:reaperroo:523812134128451586>
        guildData[guildName] = {};
        guildData[guildName].name = guildName;
        guildData[guildName].bank = 0;
        guildData[guildName].bankmax = 1000000;
        guildData[guildName].materials = 0;
        guildData[guildName].materialmax = 1000000;
        guildData[guildName].level = 1;
        guildData[guildName].icon = "https://i.imgur.com/r39nI8f.jpg";
        guildData[guildName].leader = id;
        guildData[guildName].members = []; //fml I can't figure out how to do this
        guildData[guildName].members.push(id);
        guildData[guildName].xp = 0; //For when you add new features to guilds
        guildData[guildName].scrolls = [0,0,0,0,0];
        guildData[guildName].raid = false;
        guildData[guildName].adminlog = false;
        guildData[guildName].store = {};
        guildData[guildName].buffs = {};
        guildData[guildName].quests = {};
        userData[id].guild = guildName;
        userData[id].guildpos = "Leader";
        userData[id].money -= 1000000
        userData[id].materials-= 10000
        functions.replyMessage(message, "You have created the guild " + guildName + "!");
      } else {
        functions.replyMessage(message, "That guild name is already taken!");
        return;
      }
    } else {
      functions.replyMessage(message, "You are already in a guild!");
      return;
    }
  }
  else if (words[1].toUpperCase() == "INVITE") {
    if (userData[id].guildpos != "Leader" && userData[id].guildpos != "Co-Leader") {
      functions.replyMessage(message, "You must be the Leader or a Co-Leader to invite someone!");
      return;
    }
    let target = functions.gvalidate(message);
    if (target == false) {
      functions.replyMessage(message, "You can't invite rocks!");
      return;
    }
    if (userData[target].guild != "None") {
      functions.replyMessage(message, "The are already in the guild " + userData[target].guild + "!");
      return;
    }
    userData[target].guildtarget = userData[id].guild;
    functions.sendMessage(message.channel, "<@" + target + ">, <@" + id + "> invites you to their guild! Type `!guild accept` to join");
   // if (guildData[userData[id].guild].adminlog) { functions.dmUser(guildData[userData[id].guild].leader, userData[id].username + " (id " + id + ") invited "+userData[target].username + " (id " + target + ") to your guild.") }
  }
  else if (words[1].toUpperCase() == "ACCEPT") {
    if (userData[id].guildtarget == "None") {
      functions.replyMessage(message, "No guild is trying to invite you!");
      return;
    }
    userData[id].guild = userData[id].guildtarget;
    guildData[userData[id].guildtarget].members.push(id);
    functions.replyMessage(message, "You joined " + userData[id].guildtarget + "!");
    userData[id].guildpos = "Member";
    userData[id].guildtarget = "None";
    //if (guildData[userData[id].guild].adminlog) { functions.dmUser(guildData[userData[id].guild].leader, userData[id].username +"(id "+id+") joined your guild.") }
  }
  else if (words[1].toUpperCase() == "LEAVE") {
    if (userData[id].guildpos == "Leader") {
      functions.replyMessage(message, "Guild leaders can't leave their guild! Disband it or appoint someone else!");
      return;
    }
    if (userData[id].guild == "None") {
      functions.replyMessage(message, "You can't leave a guild if you're not in one!");
    }
    let guildName = userData[id].guild;
    var place = guildData[guildName].members.indexOf(id);
    if (place > -1) {
      guildData[guildName].members.splice(place, 1);
    }
    userData[id].guild = "None";
    userData[id].guildpos = "None";
    userData[id].guildtarget = "None";
    functions.replyMessage(message, "You left your guild!");
    //if (guildData[userData[id].guild].adminlog) { functions.dmUser(guildData[userData[id].guild].leader, userData[id].username + "(id " + id + ") left your guild.") }
  }
  else if (words[1].toUpperCase() == "DISBAND") {
    if (userData[id].guild == "None") {
      functions.replyMessage(message, "You can't leave a guild if you're not in one!");
    }
    if (userData[id].guildpos != "Leader") {
      functions.replyMessage(message, "Only the leader can disband the guild!");
      return;
    }
    let guildName = userData[id].guild;
    for (var i = 0; i < guildData[guildName].members.length; i++) {
      userData[guildData[guildName].members[i]].guild = "None";
      userData[guildData[guildName].members[i]].guildpos = "None";
      userData[guildData[guildName].members[i]].guildtarget = "None";
    }
    userData[id].money += guildData[guildName].bank
    userData[id].materials += guildData[guildName].materials
    delete guildData[guildName];

    functions.replyMessage(message, "You disbanded your guild! Everyone in it is now guildless :(");
  }
  else if (words[1].toUpperCase() == "DEPOSIT" || words[1].toUpperCase() == "INVEST" || words[1].toUpperCase() == "DEP") {//It's enough already with youknowwhoafter me xD lmao
    if (userData[id].guild == "None") {
      return functions.replyMessage(message, "You're not in a guild!")
    }
    let type = ""
    let amount=0
    if (words.length == 3) {
        type = "money"
        amount = parseInt(words[2])
        if (words[2] == "all") { amount = userData[id].money }
        if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to deposit!") }
    } else {
        if (words.length < 3) {
            return functions.replyMessage(message, "Please specify something to deposit!(materials or money)!")
        }
        type = words[2]
        if (words[2] != "money" && words[2] != "materials") { return functions.replyMessage(message, "Please specify something to deposit!(materials or money)!") }
        if (words.length < 4) { return functions.replyMessage(message, "Please specify an amount to deposit!") }
        amount = parseInt(words[3])
        if (words[3] == "all") { amount=userData[id][type]}
        if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to deposit!") }
    }
    if (amount < 0) { return functions.replyMessage(message, "Don't steal from the bank!") }
    if (amount == 0) { return functions.replyMessage(message, "Why would you ever want to deposit nothing?") }
    if (amount > userData[id][type]) { return functions.replyMessage(message, "You can't deposit more than you own!") }
    if (type == "money" && (guildData[userData[id].guild].bank + amount) > guildData[userData[id].guild].bankmax) {
      functions.replyMessage(message, "The bank would be full!")
      return;
    }
    if (type == "materials" && (guildData[userData[id].guild].materials + amount) > guildData[userData[id].guild].materialsmax) {
      functions.replyMessage(message, "The bank would be full!")
      return;
    }
    if (type == "money") { guildData[userData[id].guild].bank += amount }
    if (type == "materials") { guildData[userData[id].guild].materials += amount }
    userData[id][type] -= amount
    if (type == "money") { functions.replyMessage(message, "You deposited $" + amount + " into " + userData[id].guild + "'s guild bank!"); }
    if (type == "materials") { functions.replyMessage(message, "You deposited " + amount + " materials into " + userData[id].guild + "'s guild bank!"); }
  //  if (guildData[userData[id].guild].adminlog) { functions.dmUser(guildData[userData[id].guild].leader, userData[id].username + "(id " + id + ") deposited " + amount + " " + type + " into " + userData[id].guild + "'s guild bank!") }
  }
  else if (words[1].toUpperCase() == "PAY" || words[1].toUpperCase() == "GIVE") { //I personally hate when if statements aren't written out, but it doesn't make a difference
    if (userData[id].guild == "None") {
      functions.replyMessage(message, "You're not in a guild!");
      return;
    }
    if (userData[id].guildpos != "Leader" && userData[id].guildpos != "Co-Leader") {//Honestly, there should be a better name for a "coleader"
      functions.replyMessage(message, "Only Leaders and Co-Leaders can give money from the guild bank!")
      return;
    }
    let target = functions.gvalidate(message);
    if (target == false) {
      functions.replyMessage(message, "You can't pay a rock!");
      return;
    }
    let type = ""
    let amount=0
    if (words.length == 4) {
        type = "money"
        amount = parseInt(words[3]);
        if (words[3] == "all") { amount = guildData[guild].bank }
        if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to pay!") }
    } else {
        type = words[3]
        if (type != "money" && type != "materials") { return functions.replyMessage(message, "Please specify something to pay!(materials or money)!") }
        amount = parseInt(words[4]);
        if (words[4] == "all" && type == "money") { amount = guildData[guild].bank }
        if (words[4] == "all" && type == "materials") { amount = guildData[guild].materials }
        if (isNaN(amount) == true) { return functions.replyMessage(message, "Please specify an integer amount to pay!") }
    }
    if (amount <= 0) {
        functions.replyMessage(message, "Don't try to scam the system!")
        return;
    }
    if (type == "money" && amount > guildData[userData[id].guild].bank) {
      functions.replyMessage(message, "Your guild doesn't have enough money in it! It only has $" + guildData[userData[id].guild].bank + "!");
      return;
    }
    if (type == "materials" && amount > guildData[userData[id].guild].materials) {
      functions.replyMessage(message, "Your guild doesn't have enough materials in it! It only has " + guildData[userData[id].guild].materials + "materials!");
      return;
    }
    userData[target][type] += amount;
    if (type == "money") {
      guildData[userData[id].guild].bank -= amount;
      functions.replyMessage(message, "You have paid <@" + target + "> $" + amount + " !");
    }
    if (type == "materials") {
      guildData[userData[id].guild].materials -= amount;
      functions.replyMessage(message, "You have paid <@" + target + "> " + amount + " materials!");
    }
   // if (guildData[userData[id].guild].adminlog) { functions.dmUser(guildData[userData[id].guild].leader, userData[id].username + "(id " + id + ") has paid " + amount + " " + type + " to "+userData[target].username + "(id " + target + ")") }
  }
  else if (words[1].toUpperCase() == "PROMOTE") {
    if (userData[id].guildpos != "Leader") {//Honestly, there should be a better name for a "coleader"
      functions.replyMessage(message, "Only Leaders can promote others!")
      return;
    }
    let target = functions.gvalidate(message);
    if (target == false) {
      functions.replyMessage(message, "You can't promote a rock!");
      return;
    }
    if (userData[target].guild != userData[id].guild) {
      functions.replyMessage(message, "You can't promote someone who's not in your guild!");
    }
    if (userData[target].guildpos == "Member") {
      userData[target].guildpos = "Co-Leader"
      functions.replyMessage(message, "You have promoted <@" + target + "> to Co-Leader!");
    } else {
      functions.replyMessage(message, "They can't be promoted any further!");
    }
  }
  else if (words[1].toUpperCase() == "DEMOTE") {
    if (userData[id].guildpos != "Leader") {//Honestly, there should be a better name for a "coleader"
      functions.replyMessage(message, "Only Leaders can demote others!")
      return;
    }
    let target = functions.gvalidate(message);
    if (target == false) {
      functions.replyMessage(message, "You can't demote a rock!");
      return;
    }
    if (userData[target].guild != userData[id].guild) {
      functions.replyMessage(message, "You can't demote someone who's not in your guild!");
      return;
    }
    if (userData[target].guildpos == "Co-Leader") {
      userData[target].guildpos = "Member"
      functions.replyMessage(message, "You have demoted <@" + target + "> to Member!");
    } else {
      functions.replyMessage(message, "They can't be demoted any further!");
      return;
    }
  }
  else if (words[1].toUpperCase() == "KICK") {
    if (userData[id].guildpos != "Leader" && userData[id].guildpos != "Co-Leader") {//Honestly, there should be a better name for a "coleader"
      functions.replyMessage(message, "Only Leaders and Co-Leaders can kick others!")
      return;
    }
    let target = functions.gvalidate(message);
    if (target == false) {
      functions.replyMessage(message, "You can't kick a rock! (Well you can, but I wouldn't)");
      return;
    }
    if (userData[target].guild != userData[id].guild) {
      functions.replyMessage(message, "You can't kick someone who's not in your guild!");
      return;
    }
    if (userData[id].guildpos == "Leader" || (userData[id].guildpos == "Co-Leader" && userData[target].guildpos == "Member")) {
      let guildName = userData[target].guild;
      var place = guildData[guildName].members.indexOf(target);
      if (place > -1) {
        guildData[guildName].members.splice(place, 1);
      }
      userData[target].guild = "None";
      userData[target].guildpos = "None";
      userData[target].guildtarget = "None";
      functions.sendMessage(message.channel, "<@" + target + "> was kicked from the guild!");
      //if (guildData[userData[id].guild].adminlog) { functions.dmUser(guildData[userData[id].guild].leader, userData[id].username + "(id " + id + ") has kicked "+userData[target].username + "(id " + target + ") from your guild.") }
    }

  }
  else if (words[1].toUpperCase() == "SUMMON") {
      let guild=userData[id].guild
      if (userData[id].guildpos != "Leader" && userData[id].guildpos != "Co-Leader") {//Honestly, there should be a better name for a "coleader"
          functions.replyMessage(message, "Only Leaders and Co-Leaders can summon bosses!")
          return;
      }
      //if (devs.indexOf(id)==-1) {return functions.replyMessage(message, "This feature is under development...")}
      if (isNaN(guildData[guild].raid)) {return functions.replyMessage(message, "You already have a raid going on!")}
      if (guildData[guild].raid>ts) {
	    functions.replyMessage(message, "You can next summon a raid boss in "+functions.displayTime(guildData[guild].raid,ts))
        return;
      }
      if (words[2] == undefined) { return functions.replyMessage(message,"Please specify a boss rarity!!!")}
      let summonrarity = words[2].toLowerCase()
      let scrollrarities = { "common": 0, "uncommon": 1, "rare": 2, "epic": 3, "legendary": 4 }
      if (summonrarity == undefined || summonrarity == "" || scrollrarities[summonrarity] == undefined) { return functions.replyMessage(message,"That rarity does not exist! See "+serverData[message.guild.id].prefix+"guild scrolls for a list of available rarities.") }
      if (guildData[guild].scrolls[scrollrarities[summonrarity]] < 1) { return functions.replyMessage(message,"Your guild does not have enough scrolls!") }
      guildData[guild].scrolls[scrollrarities[summonrarity]]-=1
      let raritylevels = [0,25,75,100,125,150]
      let summonlevel=Math.floor(Math.random()*(raritylevels[scrollrarities[summonrarity]+1]-raritylevels[scrollrarities[summonrarity]])+1+raritylevels[scrollrarities[summonrarity]])
      let rarityraids = guildRaidData[summonrarity]
      let raid=rarityraids[Math.floor(rarityraids.length*Math.random())]
      guildData[guild].raid={}
      guildData[guild].raid.url=raid.url
      guildData[guild].raid.name = raid.name;
      guildData[guild].raid.attack = raid.attack * summonlevel;
      guildData[guild].raid.id = 1;
      guildData[guild].raid.currenthealth = summonlevel * raid.health;
      guildData[guild].raid.maxhealth = summonlevel * raid.health;
      guildData[guild].raid.reward = summonlevel * raid.reward * 50;
      guildData[guild].raid.alive = true;
      guildData[guild].raid.attacklist = {};
      guildData[guild].raid.level = summonlevel;
      functions.replyMessage(message,"You have successfully summoned a "+raid.name+" at level "+summonlevel+"!")
      functions.raidInfo(message,guildData[guild].raid)
  }
  else if (words[1].toUpperCase() == "RAIDINFO" || words[1].toUpperCase() == "RI") {
      guild = userData[id].guild
      if (guild=="None") {return functions.replyMessage(message,"You do not have a guild!")}
      //if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
      if (guildData[guild].raid.alive != true) { return functions.replyMessage(message, "You don't have a raid going on!") }
      functions.raidInfo(message, guildData[guild].raid)
  }
  else if (words[1].toUpperCase() == "RAIDATTACK" || words[1].toUpperCase()=="RATK") {
      guild = userData[id].guild
      if (guild=="None") {return functions.replyMessage(message,"You do not have a guild!")}
      //if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
      if (guildData[guild].raid.alive != true) { return functions.replyMessage(message, "You don't have a raid going on!") }
      functions.raidAttack(message, guildData[guild].raid, false, true, false)
      if (guildData[guild].raid.alive == false) { guildData[guild].raid=ts + 1000 * 60 * guildData[guild].raid.level }
  }
  else if (words[1].toUpperCase() == "SCROLLS") {
      if (guild=="None") {return functions.replyMessage(message,"You do not have a guild!")}
      let text="Your guild has: \n"
      text += "<:Common:546173232764682241> Common Scrolls: " + guildData[guild].scrolls[0] + "\n"
      text += "<:Uncommon:546173232542384168> Uncommon Scrolls: " + guildData[guild].scrolls[1] + "\n"
      text += "<:Rare:546173232802299904> Rare Scrolls: " + guildData[guild].scrolls[2] + "\n"
      text += "<:Epic:546173232773070848> Epic Scrolls: " + guildData[guild].scrolls[3] + "\n"
      text += "<:Legendary:546170457548783627> Legendary Scrolls: " + guildData[guild].scrolls[4]
      functions.replyMessage(message,text)
  }
  else if (words[1].toUpperCase() == "UPGRADE") {
      if (guild == "None") { return functions.replyMessage(message, "You do not have a guild!") }
      if (userData[id].guildpos != "Leader" && userData[id].guildpos != "Co-Leader") { return functions.replyMessage(message,"You must be a Leader or a Co-Leader to upgrade the guild!")}
      if (Math.pow(guildData[guild].level + 1, 4) > guildData[guild].xp) { return functions.replyMessage(message, "Your guild does not have enough xp!") }
      let cost = ((guildData[guild].level % 5) == 4) ? (((guildData[guild].level % 10) == 9) ? guildData[guild].bankmax  : guildData[guild].bankmax / 5) : Math.floor(guildData[guild].bankmax / 10)
      let matscost = ((guildData[guild].level % 5) == 4) ? (((guildData[guild].level % 10) == 9) ? guildData[guild].materialmax / 100 : guildData[guild].materialmax / 500) : Math.floor(guildData[guild].materialmax / 1000)
      if (guildData[guild].bank < cost) { return functions.replyMessage(message, "Your guild does not have enough money! You need $" + cost) }
      if (guildData[guild].materials < matscost) { return functions.replyMessage(message, "Your guild does not have enough materials! You need " + matscost + " materials") }
      //functions.messageAwait(message.channel, id, )
      functions.replyMessage(message, "It costs $" + cost + " and " + matscost + " materials to level up your guild to level " + (guildData[guild].level + 1)+". Are you sure you want to do this? If so, type !guild upgradeconfirm")
  }
  else if (words[1].toUpperCase() == "UPGRADECONFIRM") {
      if (guild == "None") { return functions.replyMessage(message, "You do not have a guild!") }
      if (userData[id].guildpos != "Leader" && userData[id].guildpos != "Co-Leader") { return functions.replyMessage(message, "You must be a Leader or a Co-Leader to upgrade the guild!") }
      if (Math.pow(guildData[guild].level + 1, 4) > guildData[guild].xp) { return functions.replyMessage(message, "Your guild does not have enough xp!") }
      let cost = ((guildData[guild].level % 5) == 4) ? (((guildData[guild].level % 10) == 9) ? guildData[guild].bankmax : guildData[guild].bankmax / 5) : Math.floor(guildData[guild].bankmax / 10)
      let matscost = ((guildData[guild].level % 5) == 4) ? (((guildData[guild].level % 10) == 9) ? guildData[guild].materialmax / 100 : guildData[guild].materialmax / 500) : Math.floor(guildData[guild].materialmax / 1000)
      if (guildData[guild].bank < cost) { return functions.replyMessage(message, "Your guild does not have enough money! You need $" + cost) }
      if (guildData[guild].materials < matscost) { return functions.replyMessage(message, "Your guild does not have enough materials! You need " + matscost + " materials") }
      guildData[guild].xp -= Math.pow(guildData[guild].level + 1, 4)
      guildData[guild].bank -= cost
      guildData[guild].materials -= matscost
      guildData[guild].level += 1
      functions.replyMessage(message, "You have successfully upgraded your guild to level " + guildData[guild].level + "! It cost $" + cost + " and " + matscost + " materials.")
      let leveluptext = ""
      while (userData[id].guild != "None" && guildData[userData[id].guild].level * 200000 + 800000 > guildData[userData[id].guild].bankmax) {
          guildData[userData[id].guild].bankmax += 200000
          guildData[userData[id].guild].materialmax += 200000
          leveluptext += userData[id].guild + " had their guild bank max increased to " + guildData[userData[id].guild].bankmax + "\n" + userData[id].guild + " had their guild materials max increased to " + guildData[userData[id].guild].materialmax
          if (leveluptext.length > 1900) {
              functions.replyMessage(message, leveluptext)
              leveluptext = ""
          }
      }
      if (leveluptext != "") { functions.replyMessage(message, leveluptext) }
  }
  else if (words[1].toUpperCase() == "STORE") {
      let text = "Your guild's store: ```\n"
      if (guild=="None") {return functions.replyMessage(message,"You don't have a guild!")}
      let level=guildData[guild].level
      let pages = []
      for (var i = 0; i < guildStore.length; i++) {
          let alreadybought = (guildData[guild].store[i + ""] == undefined) ? 0 : guildData[guild].store[i + ""]
          //if (i==1) functions.replyMessage(message,alreadybought)
          text += "[" + i + "] " + guildStore[i].name
          let canbuy=0
          for (var j=0;j<guildStore[i].levels.length;j++) {
              if (level<guildStore[i].levels[j]) {
                  break
              }
              canbuy += guildStore[i].stocks[j]
          };
          text += " ($" + guildStore[i].price + ")"
          text += " (" + (canbuy-alreadybought) + " left)"
          if (level<guildStore[i].levels[j]) {
              text += " (Level " + guildStore[i].levels[j] + " to unlock " + guildStore[i].stocks[j] + " more)"
          } else {
              text += " (MAX amount)"
          }
          text+="\n"
      }
      text += "Buy an item with !guild purchase {id} [amount]```"
      functions.replyMessage(message, text)
      /*
      pages.push(text)
      text = "Your guild's store: ```\n"
      for (var i = 0; i < guildBuffStore.length; i++) {
          let buff = guildBuffStore[i]
          let currbufflevel = (guildData[guild].buffs[i + ""] == undefined) ? 0 : guildData[guild].buffs[buff.stat]
          //if (i==1) functions.replyMessage(message,alreadybought)
          text += "[" + i + "] " + guildStore[i].name
          let canbuy = 0
          for (var j = 0; j < guildStore[i].levels.length; j++) {
              if (level < guildStore[i].levels[j]) {
                  break
              }
              canbuy += guildStore[i].stocks[j]
          };
          text += " ($" + guildStore[i].price + ")"
          text += " (" + (canbuy - alreadybought) + " left)"
          if (level < guildStore[i].levels[j]) {
              text += " (Level " + guildStore[i].levels[j] + " to unlock " + guildStore[i].stocks[j] + " more)"
          } else {
              text += " (MAX amount)"
          }
          text += "\n"
      }
      */
      //functions.Paginator(message.channel,message.author,pages)
      
  }
  else if (words[1].toUpperCase() == "PURCHASE" || words[1].toUpperCase() == "BUY" || words[1].toUpperCase() == "B") {
      //if (admins.indexOf(id) == -1) { return }
      if (guild == "None") { return functions.replyMessage(message, "You don't have a guild!") }
      let level = guildData[guild].level
      
      
      let item = parseInt(words[2])
      if (isNaN(item) || item < 0 || guildStore[item] == undefined) return functions.replyMessage(message, "This item does not exist!")
      let amount = parseInt(words[3])
      if (isNaN(amount) || amount < 0) amount = 1

      let canbuy = 0
      for (var j = 0; j < guildStore[item].levels.length; j++) {
          if (level < guildStore[item].levels[j]) {
              break
          }
          canbuy += guildStore[item].stocks[j]
      };

      if (guildData[guild].store[item] == undefined) { guildData[guild].store[item] = 0 }
      let alreadybought = guildData[guild].store[item]
      if (alreadybought + amount > canbuy) { return functions.replyMessage(message, "You don't have enough of this item in the store left!") }
      if (userData[id].money < guildStore[item].price * amount) { return functions.replyMessage(message, "You don't have enough money to buy this item!") }
      guildData[guild].store[item] += amount
      userData[id].money -= guildStore[item].price * amount
      if (item >= 0 && item <=4) { guildData[guild].scrolls[item] += amount }
      if (item == 5) { userData[id].box += amount }
      functions.replyMessage(message,"You have successfully bought "+amount+" "+guildStore[item].name+" for $"+guildStore[item].price*amount)
  }
  else if (words[1].toUpperCase() == "RESET") {
      let time = 0
      let regexp = /\b([0-9]+h)?([0-9]+m)?([0-9]+s)?\b/
      if (words[3] != undefined && regexp.test(words[3])) {
          let timeword = words[3]
          let ishour = timeword.split("h")
          if (!isNaN(ishour[0])) {time +=1000*60*60*ishour[0];timeword = ishour[1]}
          let ismin = timeword.split("m")
          if (!isNaN(ismin[0])) { time += 1000 * 60 * ismin[0]; timeword = ismin[1] }
          console.log(timeword)
          let issec = timeword.split("s")
          if (!isNaN(issec[0])) {time +=1000*issec[0]}
      }
      bot.setTimeout(function () {
          if (admins.indexOf(id) == -1) { return}
          if (words[2].toUpperCase() == "ALL") {
              for (var resetGuild in guildData) {
                  guildData[resetGuild].store = {}
              }
              return functions.replyMessage(message, "The guild store has been reset for all guilds!")
          }
          if (words[2] == undefined || guildData[words[2]] == undefined) { return functions.replyMessage(message, "Please specify a valid guild! (or all for all guilds)") }
          guildData[words[2]].store = {}
          functions.replyMessage(message,words[2]+"'s guild store has been reset!")
      }, time)
      functions.replyMessage(message,"Guild store will reset in "+time+" ms.")
  }
  else if (words[1].toUpperCase() == "BUFFS") {
      if (devs.indexOf(id) == -1) { return functions.replyMessage(message,"This feature is under development...")}
      let text = "Your guild's buffs: ```\n"
      if (guild == "None") { return functions.replyMessage(message, "You don't have a guild!") }
      for (var buff in guildData[guild].buffs) {
          text += buff + ": " + (100 * guildData[guild].buffs[buff].value) + "% (level " + guildData[guild].buffs[buff].level + ")\n"
      }
      text += "Upgrade a buff with !guild purchase buff [buff]```"
      if (text == "Your guild's buffs: ```\nUpgrade a buff with !guild purchase buff [buff]```") { text = "Your guild has no buffs! Purchase one with !guild purchase buff [buff]" }
      functions.replyMessage(message, text)
  }
  else if (words[1].toUpperCase() == "QUEST") {
      if (devs.indexOf(id) == -1) { return functions.replyMessage(message, "This feature is under development...") }
  }
  else if (words[1].toUpperCase() == "DELETE") {
      if (admins.indexOf(id) == -1) { return }
      words.splice(0,2)
      let guildName = words.join(" ")
      if (guildName == undefined || guildData[guildName] == undefined) { return functions.replyMessage(message,"Please specify a valid guild.")}
      for (var i = 0; i < guildData[guildName].members.length; i++) {
          userData[guildData[guildName].members[i]].guild = "None";
          userData[guildData[guildName].members[i]].guildpos = "None";
          userData[guildData[guildName].members[i]].guildtarget = "None";
      }
      userData[guildData[guildName].leader].money += guildData[guildName].bank
      userData[guildData[guildName].leader].materials += guildData[guildName].materials
      delete guildData[guildName];

      functions.replyMessage(message, guildName+" was disbanded! Everyone in it is now guildless :(");
  }
  else {
      if (guild=="None") {return functions.replyMessage(message,"You don't have a guild!")}
      functions.sendMessage(message.channel, functions.generateGuildTemplate(guild))
  }
}