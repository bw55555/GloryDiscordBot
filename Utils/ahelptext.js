//PAGE 1 STARTS
let page1 = {
    "content": "Glory Support Server Admin commands for admin or higher use only!",
    "embed": {
        "title": "\b Page 1 \b Page 1 of 1",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "abox | adminbox",
                "value": "Gives specified number of boxes to the target user."
            },
            {
                "name": "ac | acheck | admincheck",
                "value": "Checks value of the specified attribute (stat) of the specified user."
            },
            {
                "name": "aconsum | adminconsum",
                "value": "Gives specified number of specified consumable item to the specified user."
            },
            {
                "name": "agive | admingive",
                "value": "Gives the specified user the specified amount of money."
            },
            {
                "name": "akill | adminkill",
                "value": "Kills specified user. Doesn't work on an admin."
            },
            {
                "name": "amats | adminmats | adminmaterials",
                "value": "Gives the specified user the specified amount of materials."
            },
            {
                "name": "arez | adminrez",
                "value": "Revives the specified user."
            },
            {
                "name": "aset | adminset",
                "value": "Set's an attribute's value to specified of the mentioned user."
            },
            {
                "name": "axp | adminxp",
                "value": "Gives the specified user specified amount of xp."
            }
        ]
    }
}

let page2 = {
    "content": "Glory Support Server Admin commands for admin or higher use only!",
    "embed": {
        "title": "\b Page 1 \b Page 1 of 1",
        "color": 16312092,
        "footer": {

        },
        "thumbnail": {
            "url": "https://i.imgur.com/r39nI8f.jpg"
        },


        "fields": [
            {
                "name": "aitem | adminitem",
                "value": "Gives the specified user an item with specified stats and perks."
            },
            {
                "name": "ari | adminrandomitem",
                "value": "Gives a vote item to the specified user."
            },
            {
                "name": "asmelt | adminsmelt",
                "value": "Smelts a specified item."
            },
            {
                "name": "arename | adminrename",
                "value": "Renames a specified item to the specified name."
            },
            {
                "name": "enchant",
                "value": "Enchants an item."
            },
            {
                "name": "summon | wsummon | worldsummon",
                "value": "Forcibly summon a world/raid boss."
            },
            {
                "name": "vi | voteitem",
                "value": "Simulates a vote."
            },
            {
                "name": "adelete | admindelete",
                "value": "EXTREME CAUTION! DELETES A USER ACCOUNT!"
            }
        ]
    }
}
  //PAGE 1 ENDS
let pages = [page1,page2];
//console.log(pages)
module.exports = pages