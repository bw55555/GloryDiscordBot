
//PAGE 1 STARTS
let page1 = {
    "content": "Make sure to use your server prefix for the bot before every command below\nBy default, the prefix is !\nUse `help <Command>` to get detailed information about a specific command!",
    "embed": {
        "title": "General Commands. (1st Half)",
        "color": 16312092,

        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "help",
                "value": "Brings up the command list, but you already know that don't you."
            },
            {
                "name": "start",
                "value": "Creates an account for the player"
            },
            {
                "name": "profile | p",
                "value": "Opens the profile."
            },
            {
                "name": "work | w",
                "value": "Works for money"
            },
            {
                "name": "daily",
                "value": "Claim Daily rewards. Resets everyday at 0:00 UTC"
            },
            {
                "name": "money | economy | bal | e",
                "value": "Check your current money and materials"
            },
            {
                "name": "info",
                "value": "What is Glory? type '!info' to find out"
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
        "title": "General Commands. (2nd Half)",
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
                "name": "richest | global",
                "value": "Check richest gloryseekers"
            },
            {
                "name": "heal",
                "value": "Restores health points to max"
            },
            {
                "name": "ascend",
                "value": "Ascend to next ascension point when you reach level 100. Check tutorial for more information."
            },
            {
                "name": "health | h | hp | hitpoints",
                "value": "Shows current hitpoints/health of your character"
            },
            {
                "name": "upgrade [health/attack/defense/all] | u [health/attack/defense/all]",
                "value": "Upgrades level of atk/def/hp/all by 1 level. Check tutorial for examples"
            },
            {
                "name": "cooldowns | cds",
                "value": "Displays active cooldowns"
            },
            {
                "name": "level | xp",
                "value": "Displays current level, xp and ascension points of the player"
            },
            {
                "name": "donotdm",
                "value": "Toggle glory dms on/off"
            }
        ]
    }
}
//PAGE 2 ENDS

//PAGE 3 STARTS
let page3 = {
    "embed": {
        "title": "Class Commands",
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
                "name": "resurrect | res | rez [@player/id]",
                "value": "Brings back the target back to life, could be used by healers only. The target needs to 'confirm' to resurrect."
            },
            {
                "name": "heal [@player/id]",
                "value": "Heals the target at the cost of your life, could be used by healers only. Healing someone will reset their tempo."
            },
            {
                "name": "swap",
                "value": "Swaps subclasses between life/blood weaver. Does not consumes xp."
            },
            {
                "name": "bolster [@player/id]",
                "value": "Boosts selected players attack and defense, could be used by paladin only"
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
        "title": "Player interaction commands",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "attack [@player/id] | atk [@player/id]",
                "value": "Attacks the player."
            },
            {
                "name": "mgive [@player/id] [amount of materials]",
                "value": "Gives materials to the target player"
            },
            {
                "name": "bounty [@player/id] [amount]",
                "value": "Puts bounty on the target player for the selected amount\nYou may use `!bounty top` command to display players with highest bounty"
            },
            {
                "name": "give [@player/id]  [amount]",
                "value": "Gives money to the other player"
            },
            {
                "name": "explosion",
                "value": "Deals huge damage to every person who talked in any server in presence of Glory in last 15 seconds!\n`15 secs before the command`.~~Bombs can malfunction~~"
            },
            {
                "name": "giveitem [@player/id] [weapon_id]",
                "value": "Gives a weapon to the other player"
            },
            {
                "name": "givebox [@player/id] [amount]",
                "value": "Gives a number of boxes to the other player"
            },
            {
                "name": "market",
                "value": "Check weapons put up by other players for sale"
            },
            {
                "name": "sell [weapon_id] [amount]",
                "value": "Sell a weapon in market"
            }
        ]
    }
}
//PAGE 4 ENDS

//PAGE 5 STARTS
let page5 = {
    "embed": {
        "title": "Event And Raid commands",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "summon",
                "value": "Summons a boss in your server for more info try doing help on it"
            },
            {
                "name": "raidinfo | rinfo | ri",
                "value": "Brings up the info on the current boss"
            },
            {
                "name": "raidattack | rattack | ratk ",
                "value": "Attacks the boss"
            },
            {
                "name": "er",
                "value": "Brings up the info on the event raid"
            },
            {
                "name": "eventattack | eatk",
                "value": "Attacks the event boss when used in event-raid channel of the support server"
            },
            {
                "name": "wr",
                "value": "Check status of world boss"
            },
            {
                "name": "watk",
                "value": "Attack worldboss"
            }
        ]
    }
}
//PAGE 5 ENDS

//PAGE 6 STARTS
let page6 = {
    "embed": {
        "title": "Item commands",
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
                "value": "Opens blacksmith's interface"
            },
            {
                "name": "purchase [store id] | buy [store id] | b [store id]",
                "value": "Purchases selected item"
            },
            {
                "name": "inventory | inv | i",
                "value": "Show a list of weapons you own. Check tutorial for more information"
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
                "name": "smelt [id/all]",
                "value": "Smelts the specified/all weapons. Remeber to favorite your weapons before using this command. Check tutorial for more info"
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
        "title": "Gambling and misc. commands",
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
            },
            {
                "name": "ls",
                "values": "Opens Lucky Shop interface. The items in ls can be refreshed everyday at 00:00 UTC. To refresh ls do `!ls r`"
            }
        ]
    }
}
//PAGE 7 ENDS

//PAGE 8 STARTS
let page8 = {
    "embed": {
        "title": "Couple commands",
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
        "title": "Guild commands (1st Part)",
        "color": 16312092,
        "footer": {
            "text": "Page 9 of 14"
        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "guild | g",
                "value": "Gives info about your guild"
            },
            {
                "name": "guild create [name]",
                "value": "Creates a guild"
            },
            {
                "name": "guild info [name]",
                "value": "Gives info about the specified guild"
            },
            {
                "name": "guild members",
                "value": "Gives a list of guild members. Cannot be used by anoyone outside of guild"
            },
            {
                "name": "guild invite [@player/id]",
                "value": "Invites a player to the guild"
            },
            {
                "name": "accept",
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
        "title": "Guild commands (2nd Part)",
        "color": 16312092,
        "footer": {
            "text": "Page 10 of 13"
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
            },
            {
                "name": "guild buffs",
                "value": "Check your guild buffs"
            },
            {
                "name": "guild upgrade buff [id]",
                "value": "Upgrade a particular guild buff"
            }
        ]
    }
}
//PAGE 10 ENDS

//PAGE 11 STARTS
let page11 = {
    "embed": {
        "title": "Guild commands (3rd Part)",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "g summon c/u/r/e/l",
                "value": "Summon a guild boss. To check for scrolls do `g scrolls`"
            },
            {
                "name": "g ri",
                "value": "Check stats on guild raid"
            },
            {
                "name": "g ratk",
                "value": "Attack guild raid"
            },
            {
                "name": "g forge",
                "value": "Show guild forge interface"
            },
            {
                "name": "g forge donate [materials/money] [amount]",
                "value": "Donate money to guild forge"
            },
            {
                "name": "g forge upgrade level",
                "value": "Upgrade forge level"
            },
            {
                "name": "g forge upgrade [enchant/enhance] [id]",
                "value": "Upgrade sub-properties of guild forge enhance/enchant"
            },
            {
                "name": "g update buffs | g update buff [id] [level]",
                "value": "Update all buffs or update a buff to a particular level, where level cannot be more than max level of guild buff"
            },
            {
                "name": "g store",
                "value": "Opens guild shop."
            }
        ]
    }
}
//PAGE 11 ENDS

//PAGE 12 STARTS
let page12 = {
    "embed": {
        "title": "Dungeon Commands",
        "color": 16312092,
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "dungeon permit | d permit",
                "value": "Acquire permission to enter the mines. Check tutorial for more information. Doing this command resets your max floor."
            },
            {
                "name": "d start",
                "value": "Enter the dungeon"
            },
            {
                "name": "d atk | d a",
                "value": "Attack the boss"
            },
            {
                "name": "d next",
                "value": "Proceed to next floor"
            },
            {
                "name": "d exit",
                "value": "Exit the dungeon. You cannot exit if a boss is encountered"
            },
            {
                "name": "dungeontop",
                "value": "Shows best dungeon explorers"
            },
            {
                "name": "d info",
                "value": "Shows the current floor stat"
            },
            {
                "name": "d sweep",
                "value": "Sweep your `max_floor-10` floors and enter the dungeon"
            }
        ]
    }
}
//PAGE 12 ENDS

//PAGE 13 STARTS
let page13 = {
    "embed": {
        "title": "Item Upgrading",
        "color": 16312092,
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "enchant [weapon_ID] [enchantment] [energyrunes]",
                "value": "Enchant a weapon. You need to unequip your weapon before enchanting"
            },
            {
                "name": "enhance [weapon_ID] [attack/defense/random] [count]",
                "value": "Enhance a weapon stat. You need to unequip your weapon before enhancing"
            },
            {
                "name": "merge [weapon_ID] [weapon_ID_2]",
                "value": "Merge 2 weapons together. They need to be the same rarity"
            },
            {
                "name": "runes",
                "value": "See how many runes you have. These are needed to enchant items. "
            },
            {
                "name": "fuse list",
                "value": "Opens smith's interface. Use fusion reactor to fuse runes from  rune shards."
            },
            {
                "name": "fuse [item_ID] [number of items]",
                "value": "Fuse runes from runeshards using the fusion reactor"
            }
        ]
    }
}
//PAGE 13 ENDS

//PAGE 14 STARTS
let page14 = {
    "embed": {
        "title": "Skills and stats",
        "color": 16312092,
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "skill[a/b/c] [skill_ID] | s[a/b/c] [skill_ID] ",
                "value": "Choose skills. You can also enter skill name instead of ID"
            },
            {
                "name": "skills | s",
                "value": "Check equiped skills"
            },
            {
                "name": "skillpoint | sp",
                "value": "Get a skill using skillpoint. You earn 1 skill point everytime you ascend."
            },
            {
                "name": "si",
                "value": "List of skills you own"
            },
            {
                "name": "skillinfo [skill_ID]",
                "value": "See information of that particular skill. You can also use skill name instead of ID"
            },
            {
                "name": "reroll [skill_ID]",
                "value": "Reroll a skill you don't like"
            },
            {
                "name": "stat",
                "value": "Check all modifiers acting on your character"
            }
        ]
    }
}
//PAGE 14 ENDS

//PAGE 15 STARTS
let page15 = {
    "embed": {
        "title": "Quests commands",
        "color": 16312092,
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "quests | q",
                "value": "Check current quests"
            },
            {
                "name": "claimquest [ID] | cq [ID]",
                "value": "Claim quest rewards"
            }
        ]
    }
}
//PAGE 15 ENDS

let pages = [page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12, page13, page14, page15];

for (let i = 0; i < pages.length; i++) {
    pages[i].embed.footer = {
        "text": "Page " + (i + 1) + " of " + pages.length
    }
}

//console.log(pages)
module.exports = pages