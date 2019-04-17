var functions = require("../Utils/functions.js")
module.exports = function (message) {
  let id = message.author.id;
  let ts = message.createdTimestamp;
  let words = message.content.trim().split(/\s+/)
  shieldtimes = [1, 2, 4, 6, 8, 12]
  shieldprices = [20000, 40000, 100000, 160000, 240000, 400000]
  let purchaseID = parseInt(words[1])
  let amount = parseInt(words[2])
  if (isNaN(amount) || amount < 0) amount = 1
  if (isNaN(purchaseID) == true) {
    functions.replyMessage(message, "Make sure you're selecting a real item!")
    return;
  }
  
  if (purchaseID >= 0 && purchaseID <= 5) {
    if (userData[id].cooldowns.purchase > ts) { return functions.replyMessage(message, "Please wait " + functions.displayTime(userData[id].cooldowns.purchase, ts)) }
    if (userData[id].money < shieldprices[purchaseID]) {
      functions.replyMessage(message, "You do not have enough money to buy this!")
      return;
    }
    userData[id].money -= shieldprices[purchaseID]
    userData[id].shield = ts + shieldtimes[purchaseID] * 1000 * 60 * 60
    userData[id].cooldowns.purchase = ts + shieldtimes[purchaseID] * 1000 * 60 * 60//+1000*60*60
    functions.replyMessage(message, "You successfully bought a " + shieldtimes[purchaseID] + " hour shield for $" + shieldprices[purchaseID] + "!")
  }
  else if (purchaseID == 101) {
      if (userData[id].materials < 400*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 400*amount
      functions.replyMessage(message, "You successfully spent " + 400*amount + " materials for a RANDOM ITEM!")
      for (var i = 0; i < amount; i++) {
        functions.craftItem(message, -1, -1)
      }
  }

  else if (purchaseID == 102) {
      if (userData[id].materials < 200*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 200*amount
      functions.replyMessage(message, "You successfully spent " + 200*amount + " materials for SIMPLE CRAFTING...")
      for (var i = 0; i < amount; i++) {
        functions.craftItem(message, 0, 2)
      }
  }

  else if (purchaseID == 103) {
      if (userData[id].materials < 5000*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 5000*amount
      functions.replyMessage(message, "You successfully spent " + 5000*amount + " materials for MODERATE CRAFTING...")
      for (var i = 0; i < amount; i++) {
        functions.craftItem(message, 2, 4)
      }
  }

  else if (purchaseID == 104) {
      if (userData[id].materials < 100000*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 100000*amount
      functions.replyMessage(message, "You successfully spent " + 100000*amount + " materials for EXQUISITE CRAFTING...")
      for (var i = 0; i < amount; i++) {
        functions.craftItem(message, 4, 6)
      }
  }

  else if (purchaseID == 200) {
      if (userData[id].materials < 100000*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 100000*amount
      functions.replyMessage(message, "You successfully spent " + 100000*amount + " materials for an Explosion! Use !explosion to cast it!")
      userData[id].explosion += amount;

  }

  else if (purchaseID == 201) {
      if (userData[id].materials < 5000*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 5000*amount
      functions.replyMessage(message, "You successfully spent " + 5000*amount + " materials for a Phoenix Feather! Use `!feather` to rez yourself!")
      userData[id].phoenixfeather += amount;
  }

  else if (purchaseID == 202) {
      if (userData[id].materials < 10000*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].materials -= 10000*amount
      functions.replyMessage(message, "You successfully spent " + 10000*amount + " materials for a weapon nametag! Use `!nametag` to rename something!")
      userData[id].nametag += amount;
  }

  else if (purchaseID == 20) {

      functions.replyMessage(message, "This feature is on hold!")
      return;

      if (userData[id].money < 500000*amount) {
          functions.replyMessage(message, "You do not have enough materials to buy this!")
          return;
      }
      userData[id].money -= 500000*amount
      functions.replyMessage(message, "You successfully spent $" + 500000*amount + " for a skill reroll! Use `!reroll [id]` to transform a skill back into a skillpint!")
      userData[id].reroll += amount;

  } else {
      functions.replyMessage(message, "Make sure you're selecting a real item!")
  }
}