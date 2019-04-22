
//PAGE 1 STARTS
let page1 = {
    "content": "Make sure to use your server prefix for the bot before every command below\nBy default, the prefix is !\nUse `help <Command>` to get detailed information about a specific command!",
    "embed": {
        "title": "\b General Commands. (1st Half) \b Page 1 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "profile | p",
              "value": "Opens the profile."
          },
          {
              "name": "work",
              "value": "Works for money"
          },
          {
              "name": "daily",
              "value": "Receives the daily reward"
          },
          {
              "name": "money | economy | bal | e",
              "value": "Checks current money count"
          },
          {
              "name": "stats | richest | global",
              "value": "Gives the richest players and stats about bot"
          },
          {
              "name": "help",
              "value": "Brings up the command list"
          },
          {
              "name": "info",
              "value": "Brings up info about the bot"
          },
          {
              "name": "tutorial",
              "value": "Links to the tutorial"
          },
          {
              "name": "botstats",
              "value": "Displays stats related to bot's popularity"
          }
        ]
    }
}
//PAGE 1 ENDS

//PAGE 2 STARTS
let page2 = {
    "embed": {
        "title": "\b General Commands. (2nd Half) \b Page 2 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "ping | pong",
              "value": "Checks the ping of the bot"
          },
          {
              "name": "start",
              "value": "Creates an account for the player"
          },
          {
              "name": "heal",
              "value": "Restores health points to max"
          },
          {
              "name": "resurrect | res | rez",
              "value": "Restores you back to life"
          },
          {
              "name": "ascend",
              "value": "Gives one ascension point can only be used when all the stats are at 100"
          },
          {
              "name": "health | h | hp | hitpoints",
              "value": "Shows current hitpoints/health of your character"
          },
          {
              "name": "upgrade [health/attack/defense] | u [health/attack/defense]",
              "value": "Upgrades the selected stat by 1"
          },
          {
              "name": "cooldowns | cds",
              "value": "Displays active cooldowns other than daily."
          },
          {
              "name": "level | xp",
              "value": "Displays current xp and scension points of the player"
          },
          {
              "name": "inventory | inv | i",
              "value": "Opens the inventory"
          }
        ]
    }
}
//PAGE 2 ENDS

//PAGE 3 STARTS
let page3 = {
    "embed": {
        "title": "\b Class Commands \b Page 3 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "class | classes",
              "value": "Brings up the list of available classes"
          },
          {
              "name": "class [class/subclass]",
              "value": "Appoints you to the chosen class"
          },
          {
              "name": "classstats",
              "value": "Displays a few stats about classes"
          },
          {
              "name": "rez [@player/id]",
              "value": "Brings back the target back to life, could be used by healers only"
          },
          {
              "name": "heal [@player/id]",
              "value": "Heals the target to some extent, could be used by healers only"
          },
          {
              "name": "swap",
              "value": "Swaps subclasses between life/blood weaver"
          },
          {
              "name": "BOLSTER [@player/id]",
              "value": "Boosts selected players damage, could be used by paladin only"
          },
          {
              "name": "predict",
              "value": "AKA troll command (by unlucky people) works only for oracle class \n50% chance to predict the next outcome of flip correctly"
          }
        ]
    }
}
//PAGE 3 ENDS

//PAGE 4 STARTS
let page4 = {
    "embed": {
        "title": "\b Player interaction commands \b Page 4 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "attack [@player/id] | atk [@player/id]",
              "value": "Attacks the player"
          },
          {
              "name": "mgive [@player/id] [amount of materials]",
              "value": "Gives materials to the target player"
          },
          {
              "name": "bounty [@player/id] [amount]",
              "value": "Puts bounty on the target player for the selected amount\nYou may use bounty top command to display top bountied players"
          },
          {
              "name": "give [amount] [@player/id]",
              "value": "Gives money to the other player"
          },
          {
              "name": "explosion",
              "value": "Deals 1500 damage every person who talked in any server in presence of Glory in last 15 seconds!"
          },
          {
              "name": "giveitem [@player/id] [weapon_id]",
              "value": "Gives a weapon to the other player"
          },
          {
              "name": "givebox [@player/id] [amount]",
              "value": "Gives a number of boxes to the other player"
          }
        ]
    }
}
//PAGE 4 ENDS

//PAGE 5 STARTS
let page5 = {
    "embed": {
        "title": "\b Event And Raid commands \b Page 5 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "raidinfo | rinfo | ri",
              "value": "Brings up the info on the current boss"
          },
          {
              "name": "answer [question] [answer]",
              "value": "Answers a question during quiz events in the support server"
          },
          {
              "name": "raidattack | rattack | ratk ",
              "value": "Attacks the boss"
          },
          {
              "name": "summon",
              "value": "Summons a boss in your server for more info try doing help on it"
          },
          {
              "name": "eventattack",
              "value": "Attacks the event boss when used in event-raid channel of the support server"
          }
        ]
    }
}
//PAGE 5 ENDS

//PAGE 6 STARTS
let page6 = {
    "embed": {
        "title": "\b Item commands \b Page 6 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "store",
              "value": "Opens shop interface"
          },
          {
              "name": "blacksmith | bs",
              "value": "Opens blacksmith's shop interface"
          },
          {
              "name": "purchase [store id] | buy [store id] | b [store id]",
              "value": "Purchases selected item"
          },
          {
              "name": "equip [id]",
              "value": "Equips the selected weapon"
          },
          {
              "name": "weaponinfo [id] | wepinfo [id] | wi [id]",
              "value": "Gives info on the specified weapon"
          },
          {
              "name": "smelt [id]",
              "value": "Smelts the specified weapon"
          },
          {
              "name": "smeltall",
              "value": "Smelts all non equipped and nonfavorited weapons"
          },
          {
              "name": "favorite [weapon_id]",
              "value": "Toggles the favorite status of a weapon"
          },
          {
              "name": "boxes",
              "value": "Displays the total number of mysterious boxes you have"
          },
          {
              "name": "open",
              "value": "Opens 1 mysterious box... wonder what it might contain"
          }
        ]
    }
}
//PAGE 6 ENDS

//PAGE 7 STARTS 
let page7 = {
    "embed": {
        "title": "\b Gambling and misc. commands \b Page 7 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "flip [heads/tails] [amount]",
              "value": "Flips a coin"
          },
          {
              "name": "c | consumable | consumables",
              "value": "Displays the consumables that you have"
          },
          {
              "name": "settings [setting to be changed] [new value]",
              "value": "Changes settings for the bot on the server for e.g prefix"
          },
          {
              "name": "phoenixfeather | feather",
              "value": "uses a phoenix feather to revive urself immediately"
          },
          {
              "name": "vote",
              "value": "Gives the link for voting up the bot"
          },
          {
              "name": "invite",
              "value": "Displays the invite link for the bot"
          }
        ]
    }
}
//PAGE 7 ENDS

//PAGE 8 STARTS
let page8 = {
    "embed": {
        "title": "\b Couple commands \b Page 8 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "marry [@player/id]",
              "value": "Propose or accept a propose from another player"
          },
          {
              "name": "child",
              "value": "Try to make a child with your partner (In development)"
          },
          {
              "name": "divorce",
              "value": "Divorce your spouse"
          }
        ]
    }
}
//PAGE 8 ENDS

//PAGE 9 STARTS
let page9 = {
    "embed": {
        "title": "\b Guild commands (1st Half) \b Page 9 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "guild create [name]",
              "value": "Creates a guild"
          },
          {
              "name": "guild | g",
              "value": "Gives info about your guild"
          },
          {
              "name": "guild info [name]",
              "value": "Gives info about the specified guild"
          },
          {
              "name": "guild members",
              "value": "Gives a list of guild members"
          },
          {
              "name": "guild invite [@player/id]",
              "value": "Invites a player to the guild"
          },
          {
              "name": "guild accept",
              "value": "Accept a request to join a guild"
          },
          {
              "name": "guild kick [@player/id]",
              "value": "Kicks the player from the guild"
          }
        ]
    }
}
//PAGE 9 ENDS

//PAGE 10 STARTS
let page10 = {
    "embed": {
        "title": "\b Guild commands (2nd Half) \b Page 10 of 10",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
          {
              "name": "guild deposit/ invest [materials/money] [amount]",
              "value": "Deposits materials/money to the guild bank"
          },
          {
              "name": "guild pay/ give [amount] [@player/id]",
              "value": "Gives money to the specified player from the bank"
          },
          {
              "name": "guild promote [@player/id]",
              "value": "Promotes the player"
          },
          {
              "name": "guild demote [@player/id]",
              "value": "Demotes the player"
          },
          {
              "name": "guild leave",
              "value": "Makes the character leave the guild"
          },
          {
              "name": "guild disband",
              "value": "Deletes the guild"
          }
        ]
    }
}
//PAGE 10 ENDS

let pages=[page1, page2, page3, page4, page5, page6, page7, page8, page9, page10];
//console.log(pages)
module.exports=pages