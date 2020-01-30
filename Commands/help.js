
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) {
        let helptext = require("../Utils/helptext.js")
        //console.log(helptext)
        new functions.Paginator(message.channel, message.author, helptext)
    }
    if (words.length > 1) {
        let word2 = words[1].toUpperCase();
        let text = "";
        let prefix=defaultPrefix
        if (message.guild != undefined) { prefix = serverData[message.guild.id].prefix}

        if (word2 == "PROFILE" || word2 == "P") {
            //Profile text
            text += "```Opens the profile\nYou can open a profile of a target player too!\nSyntax: " + prefix + "profile <target> OR " + prefix + "profile (For your own profile)```"

        }
        else if (word2 == "WORK") {
            //work text
            text = "```Works for money and some xp!\nSyntax: " + prefix + "work```"
        }
        else if (word2 == "DAILY") {
            //daily text
            text = "```Receives the daily reward!\nSyntax: " + prefix + "daily```"
        }
        else if (word2 == "MONEY" || word2 == "E" || word2 == "BAL" || word2 == "ECONOMY") {
            //money text
            text = "```Checks curr en t money  count!\nSyntax: " + prefix + "money OR " + prefix + "e OR " + prefix + "economy OR " + prefix + "bal```"
        }
        else if (word2 == "STATS" || word2 == "GLOBAL" || word2 == "RICHEST") {
            //stats text
            text = "```Gives the richest players and stats about bot!\nSyntax: " + prefix + "richest OR " + prefix + "stats OR " + prefix + "global```"
        }
        else if (word2 == "HELP") {
            //help text
            text = "```Brings up the command list!\nSyntax: C'mon You Know How To Use It (" + prefix + "help)```"
        }
        else if (word2 == "INFO") {
            //info text
            text = "```Brings up info about the bot\nSyntax:  " + prefix + "info```"
        }
        else if (word2 == "TUTORIAL") {
            //tutorial text
            text = "```Links to the tutorial!\nSyntax: " + prefix + "tutorial```"
        }
        else if (word2 == "PING" || word2 == "PONG") {
            //ping text
            text = "```Checks the ping of the bot\nSyntax: " + prefix + "ping OR " + prefix + "pong```"
        }
        else if (word2 == "VOTE") {
            //vote text
            text = "```Gives the link for voting up the bot!\nSyntax: " + prefix + "vote```"
        }
        else if (word2 == "HEAL") {
            //heal text
            text = "```Restores health points to max\nHealers can heal other players too!\nSyntax: !heal (For yourself)\n" + prefix + "heal <target> (For healers)```"
        }
        else if (word2 == "REZ" || word2 == "RES" || word2 == "RESURRECT") {
            //rez text
            text = "```Restores you back to life!\nHealers can rez other players too!\nSyntax: " + prefix + "rez OR " + prefix + "res OR " + prefix + "resurrect (For yourself)\n" + prefix + "rez <target> OR " + prefix + "res <target> OR " + prefix + "resurrect <target> (For healers)```"
        }
        else if (word2 == "STORE") {
            //store text
            text = "```Open shop interface\nSyntax: " + prefix + "store```"
        }
        else if (word2 == "PURCHASE") {
            //purchase text
            text = "```Purchases selected item\nSyntax: " + prefix + "purchase <store id>```"
        }
        else if (word2 == "UPGRADE") {
            //upgrade text
            text = "```Upgrades selected stat (health/attack/defense) by 1 while max level being your current level.\nSyntax: " + prefix + "upgrade <health/attack/defense>```"
        }
        else if (word2 == "OPEN") {
            //open text
            text = "```Opens 1 mysterious box can be obtained by voting or DAILY command\nDo you ... wonder what it might contain\nSyntax: " + prefix + "open```"
        }
        else if (word2 == "COOLDOWNS") {
            //cooldowns text
            text = "```Displays active cooldowns other than daily.\nSyntax: " + prefix + "cooldowns```"
        }
        else if (word2 == "CLASS") {
            //class text
            text = "```Brings up the list of available classes\nSyntax: " + prefix + "class\nAppoints you to the chosen class\nSyntax: " + prefix + "class <class/subclass>```"
        }
        else if (word2 == "SWAP") {
            //swap text
            text = "```Swaps subclasses between life/blood weaver!\nSyntax: " + prefix + "swap```"
        }
        else if (word2 == "BOLSTER") {
            //bolster text
            text = "```Boosts selected players damage!\nSyntax: " + prefix + "bolster <target> (Works only with paladin class)```"
        }
        else if (word2 == "PREDICT") {
            //predict text
            text = "```AKA troll command works only for oracle class \n50% chance to predict the next outcome of flip correctly!\nSyntax: " + prefix + "predict```"
        }
        else if (word2 == "ATTACK") {
            //attack text
            text = "```Attacks the target player!\nSyntax: " + prefix + "attack <target>```"
        }
        else if (word2 == "GIVE") {
            //give text 
            text = "```Gives money to the other player!\nSyntax: " + prefix + "give <target>```"
        }
        else if (word2 == "EXPLOSION") {
            //explosion text
            text = "```Kills every person who talked in any server in presence of Glory in last few seconds BOOM!! EXPLSHN!!!\nSyntax: " + prefix + "explosion```"
        }
        else if (word2 == "GIVEITEM") {
            //giveitem text
            text = "```Gives a weapon to the other player!\nSyntax: " + prefix + "giveitem [@player/id] [weapon_id]```"
        }
        else if (word2 == "GIVEBOX") {
            //givebox text
            text = "```Gives a number of boxes to the other player!\nSyntax: " + prefix + "givebox [@player/id] [amount]```"
        }
        else if (word2 == "RAIDATTACK") {
            //raidattack text
            text = "```Attacks the boss!\nSyntax: " + prefix + "raidattack\nNote: Works only in a channel with a raid boss.```"
        }
        else if (word2 == "RAIDINFO") {
            //raidinfo text
            text = "```Brings up the info on the current boss!\nSyntax: " + prefix + "raidinfo\nNote: Works only in a channel with a raid boss.```"
        }
        else if (word2 == "SUMMON") {
            //summon text
            text = "```Summons a boss in your server!\nNOTE: Your server must contain more than 50 members AND the channel must named according to the boss to be summoned\nSyntax: " + prefix + "summon```"
        }
        else if (word2 == "INVENTORY" || word2 == "INV" || word2 == "I") {
            //inventory text
            text = "```Opens the inventory!\nSyntax: " + prefix + "i OR " + prefix + "inv OR " + prefix + "inventory```"
        }
        else if (word2 == "EASTEREGG") {
            //easteregg text
            text = "```There is no command called easteregg!\nHowever, there are a few eastereggs... It doesn't take ORACLES to find em.```"
        }
        else if (word2 == "EGG") {
            //easteregg text
            text = "```There are SECRETS hidden in the game and the support server. Use !egg (word) to claim them... See the support server for more details. ```"
        }
        else if (word2 == "BW5555") {
            //bw5555 text
            text = "```BW55555 (Five 5s not 4 as you typed) has probably the mo-- wait are you wondering why is there text when you typed wrong amount of 5s?\nProbably because this was bw's original name ;).```"
        }
        else if (word2 == "BW55555") {
            //bw55555 text
            text = "```BW55555 has probably the most contribtion in development of bot!\nHe is the god of the bot (literally and symbolically)\nTo know what I meant by literally... just ponder about it.```"
        }
        else if (word2 == "EQUIP") {
            //equip text
            text = "```Equips the selected weapon!\nSyntax: " + prefix + "equip <Weapon ID>```"
        }
        else if (word2 == "WEAPONINFO") {
            //weaponinfo text
            text = "```Gives info on the specified weapon!\nSyntax: " + prefix + "weaponinfo <Weapon ID>```"
        }
        else if (word2 == "SMELT") {
            //smelt text
            text = "```Smelts the specified weapon!\nSyntax: " + prefix + "smelt <Weapon ID>```"
        }
        else if (word2 == "SMELTALL") {
            //smeltall text
            text = "```Smelts all non equipped weapons!\nSyntax: " + prefix + "smeltall```"
        }
        else if (word2 == "FAVORITE") {
            //favorite text
            text = "```Adds a weapon to favorite (ignored by smeltall command)!\nSyntax: " + prefix + "favorite [weapon_id]```"
        }
        else if (word2 == "FLIP") {
            //flip text
            text = "```Flips a coin!\nSyntax: " + prefix + "flip <Heads/tails> <Money>```"
        }
        else if (word2 == "MARRY") {
            //marry text
            text = "```Propose to another player!\nSyntax: " + prefix + "marry <target>```"
        }
        else if (word2 == "CHILD") {
            //child text
            text = "```Try make a child!\nSyntax: " + prefix + "child```"
        }
        else if (word2 == "DIVORCE") {
            //divorce text
            text = "```Divorce your spouse!\nSyntax: " + prefix + "divorce```"
        }
        else if (word2 == "GUILD") {
            //guild text
            text = "```" + prefix + "guild create [name]\n" +
            "Creates a guild\n" +
            prefix + "guild\n" +
            "Gives info about the guild\n" +
            prefix + "guild info [name]\n" +
            "Gives info about the specified guild\n" +
            prefix + "guild members\n" +
            "Gives a list of guild members\n" +
            prefix + "guild invite [@player/id]\n" +
            "Invites a player to the guild\n" +
            prefix + "guild accept\n" +
            "Accept a request to join a guild\n" +
            prefix + "guild kick [@player/id]\n" +
            "Kicks the player from the guild\n" +
            prefix + "guild deposit/ invest [materials/money] [amount]\n" +
            "Deposits materials/money to the guild bank\n" +
            prefix + "guild pay/ give [amount] [@player/id]\n" +
            "Gives money to the specified player from the bank\n" +
            prefix + "guild promote [@player/id]\n" +
            "Promotes the player\n" +
            prefix + "guild demote [@player/id]\n" +
            "Demotes the player\n" +
            prefix + "guild leave\n" +
            "Makes the character leave the guild\n" +
            prefix + "guild disband\n" +
            "Deletes the guild\n```"
        }
	    else {
		    text = word2 + " is not an existing command"
	    }
	    console.log(text);
	    functions.sendMessage(message.channel, text);
    }
}