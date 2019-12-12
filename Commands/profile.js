var functions=require("../Utils/functions.js")
module.exports = async function (message,user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let target = message.author.id;
    let targetname = message.author;
    //console.log(words)
    if (words.length != 1) {
        target = functions.validate(message)
        if (target == false) { return }
    }
    functions.getUser(target).then(user => {
        let weapon = (user.weapon == false) ? "None" : itemData[user.weapon].name + " (" + user.weapon + ")"
        let weaponatk = 0
        let weapondef = 0
        if (user.weapon != false && user.weapon != "None" && user.weapon != undefined && user.weapon < itemData.next) {
            weaponatk = itemData[user.weapon].attack
            weapondef = itemData[user.weapon].defense
        }
        let guildtext = "None";
        if (user.guild != "None") {
            guildtext = user.guildpos + " of " + user.guild;
        }
        let marrytext = user.marry;
        if (user.marry != "None") {
            marrytext = "<@" + user.marry + ">"
            if (userData[user.marry].glory != undefined) {
                marrytext += " (" + parseInt(userData[user.marry].glory) + " Glory)"
            }
        }
        let leveltext = user.level;
        let xpleft = (Math.floor((3 * Math.pow((user.level + 1), 2) + 100) * Math.pow(1.5, user.ascension)) - user.xp)
        if (xpleft < 1) {
            xpleft = 1;
        }
        let xptext = "(" + xpleft + " xp until next lvl)"
        if (user.level == 100) {
            xptext = "(MAX LEVEL)";
        }
        let nametext = "<@" + target + ">"
        if (user.glory != undefined && user.glory != null && !isNaN(parseInt(user.glory))) {
            nametext += " (" + parseInt(user.glory) + " Glory)"
        }
        functions.sendMessage(message.channel, {
            embed: {
                color: 0xF1C40F,
                /*thumbnail: {
                    "url": "https://i.imgur.com/r39nI8f.jpg"
                },*/
                fields: [
                    {
                        name: "Gloryseeker Name",
                        value: nametext,
                        inline: true
                    }, {
                        name: "Married to <:weddingring:542186031957540874>",
                        value: marrytext,
                        inline: true
                    }, {
                        name: "Guild <:dragonbanner:542171281609457675>",
                        value: guildtext,
                        inline: true
                    }, {
                        name: "Class <:class2:543790955199725578>",
                        value: user.triangle,
                        inline: true
                    }, {
                        name: "Level <:guildlevel:542188803339845652>",
                        value: leveltext + " " + xptext + "\nAscension: " + user.ascension,
                        inline: true
                    }, {
                        name: "Account Balance <:accountbalance:542160800492683295><:materialsgem:542178396474572805>",
                        value: user.money + " Money\n" + user.materials + " Materials",
                        inline: true
                    }, {
                        name: "Health <:nixheart:506240330916429837>",
                        value: user.currenthealth + ' / ' + user.health,
                        inline: true
                    }, {
                        name: "Attack <:attack:542134564391223321>",
                        value: user.attack + " (+" + weaponatk + ")",
                        inline: true
                    }, {
                        name: "Defense <:defence:542134628421468181>",
                        value: user.defense + " (+" + weapondef + ")",
                        inline: true
                    }, {
                        name: "Weapon <:weaponicon:542069411817717780>",
                        value: weapon,
                        inline: true
                    }
                ]
            }
        });
    });
}