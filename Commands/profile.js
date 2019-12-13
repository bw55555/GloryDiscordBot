var functions=require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    let target = message.author.id;
    let targetname = message.author;
    //console.log(words)
    return Promise.all([functions.validate(message)]).then(ret => {
        let target = ret[0];
        if (words.length == 1) { target = user}
        if (target == false) { return; }
        let weapon = (target.weapon == false) ? "None" : itemData[target.weapon].name + " (" + target.weapon + ")"
        let weaponatk = 0
        let weapondef = 0
        if (target.weapon != false && target.weapon != "None" && target.weapon != undefined && target.weapon < itemData.next) {
            weaponatk = itemData[target.weapon].attack
            weapondef = itemData[target.weapon].defense
        }
        let guildtext = "None";
        if (target.guild != "None") {
            guildtext = target.guildpos + " of " + target.guild;
        }
        let marrytext = target.marry;
        if (target.marry != "None") {
            marrytext = "<@" + target.marry + ">"
        }
        let leveltext = target.level;
        let xpleft = (Math.floor((3 * Math.pow((target.level + 1), 2) + 100) * Math.pow(1.5, target.ascension)) - target.xp)
        if (xpleft < 1) {
            xpleft = 1;
        }
        let xptext = "(" + xpleft + " xp until next lvl)"
        if (target.level == 100) {
            xptext = "(MAX LEVEL)";
        }
        let nametext = "<@" + target._id + ">"
        if (target.glory != undefined && target.glory != null && !isNaN(parseInt(target.glory))) {
            nametext += " (" + parseInt(target.glory) + " Glory)"
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
                        value: target.triangle,
                        inline: true
                    }, {
                        name: "Level <:guildlevel:542188803339845652>",
                        value: leveltext + " " + xptext + "\nAscension: " + target.ascension,
                        inline: true
                    }, {
                        name: "Account Balance <:accountbalance:542160800492683295><:materialsgem:542178396474572805>",
                        value: target.money + " Money\n" + target.materials + " Materials",
                        inline: true
                    }, {
                        name: "Health <:nixheart:506240330916429837>",
                        value: target.currenthealth + ' / ' + target.health,
                        inline: true
                    }, {
                        name: "Attack <:attack:542134564391223321>",
                        value: target.attack + " (+" + weaponatk + ")",
                        inline: true
                    }, {
                        name: "Defense <:defence:542134628421468181>",
                        value: target.defense + " (+" + weapondef + ")",
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