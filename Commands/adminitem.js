var functions=require("../Utils/functions.js")
function isFloat(arg) {
  for (var i=0;i<arg.length;i++) {
    if (arg.slice(i,i+1)==".") {continue}
    if (isNaN(parseInt(arg.slice(i,i+1)))) {return false}
  }
  return true
}
module.exports = function (message,user) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  if (admins.indexOf(id)==-1){return}
  let itemid = 0
  let attack = 0
  let defense = 0
  let rarity = 0
  let target="event"
  //console.log("Ran")
  if (words.length == 1) {
    functions.sendMessage(message.channel, "Please specify a user.")
    return
  }
  if (words[1] != "event") {
      target = functions.validate(message)
      if (target == false) { return }
  }
  let place = 2
  if (words[2] == "-id") {
    if (words.length == 3) {
      functions.sendMessage(message.channel, "Please specify an id.")
      return
    }
    itemid = parseInt(words[3])
    if (isNaN(itemid) || itemid <=0 || itemid >= itemData.next) {
      functions.sendMessage(message.channel, "You can only generate existing items!")
      return
    }
    if (itemData[itemid] != undefined && itemData[itemid].owner != undefined && itemData[itemid].owner != target) {
      functions.sendMessage(message.channel, "Someone owns this item!")
      return
    }
    place = 4
  } else { itemid = itemData.next }
  if (words.length < place + 2) {
    functions.sendMessage(message.channel, "Please specify an attack and a defense stat.")
    return
  }
  attack = parseInt(words[place])
  defense = parseInt(words[place + 1])
  if (isNaN(attack) || isNaN(defense)) {
    functions.sendMessage(message.channel, "Please specify an integer for the attack and defense stats.")
    return
  }
  if (words.length < place + 3) {
    functions.sendMessage(message.channel, "Please specify a rarity.")
    return
  }
  rarity = parseInt(words[place + 2])
  if (words[place + 2] == "Unique") { rarity = "Unique" }
  if (words[place + 2] != "Unique" && (isNaN(rarity) || rarity < 0 || rarity > 9)) {
    functions.sendMessage(message.channel, "Please specify an integer between 0 and 9 for the rarity.")
    return
  }
  let name = rarities[rarity] + " Sword"
  if (words[place + 3] == "-name") {
    let temp1 = message.content.slice(message.content.indexOf("-name"))
    let temp2 = temp1.slice(temp1.indexOf("\"") + 1)
    if (message.content.indexOf("\"") == -1 || temp2.indexOf("\"") == -1) {
      functions.sendMessage(message.channel, "Name must be surrounded by quotation marks.")
      return
    }
    name = temp2.slice(0, temp2.indexOf("\""))
    if (name == "") {
      functions.sendMessage(message.channel, "The name cannot be blank!")
      return
    }
  }
  let modifiers = {}
  if (devs.indexOf(id) != -1 && message.content.indexOf("-mod") != -1 && message.content.slice(message.content.indexOf("-mod")).split(" ")[0] == "-mod") {
    let wordsmodifiers = message.content.slice(message.content.indexOf("-mod") + 5).split(" ")
    if (wordsmodifiers.length % 2 == 1) {
      functions.sendMessage(message.channel, "Every modifier must have a corresponding number!")
      return
    }
    let iterations = wordsmodifiers.length / 2
    for (let i = 0; i < iterations; i++) {
      let modifier = wordsmodifiers[2 * i]
      let modifierstat = parseFloat(wordsmodifiers[2 * i + 1])
      if (allowedmodifiers.indexOf(modifier) == -1) { return functions.sendMessage(message.channel, modifier + " is not an allowed modifier.") }
      if (isNaN(modifierstat)) {
        functions.sendMessage(message.channel, "Every modifier must have a corresponding float!")
        return
      }
      modifiers[modifier] = modifierstat
    }
  }
  //console.log(userData[target])
  //console.log(userData[target].inventory)

  functions.generateItem(target, itemid, attack, defense, rarity, name, modifiers)
  functions.sendMessage(message.channel, "Gave item with id " + itemid + ", attack " + attack + ", defense " + defense + ", rarity " + rarity + ", name " + name + " to <@" + target + ">")
  functions.logCommand(message)
}