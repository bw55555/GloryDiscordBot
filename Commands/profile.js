
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return; }
        let weapon = (target.weapon == false) ? "None" : target.weapon.name + " (" + target.weapon._id + ")"
        let weaponatk = 0
        let weapondef = 0
        if (target.weapon != false && target.weapon) {
            weaponatk = target.weapon.attack
            weapondef = target.weapon.defense
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
        let xpleft = (functions.checkxp(target) - target.xp)
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
        let attack = target.attack + " (+" + weaponatk + ")" 
        let defense = target.defense + " (+" + weapondef + ")"
        if (target.weapon.enhance != undefined) {
            attack += " (+" + target.weapon.enhance.attack + ")"
            defense += " (+" + target.weapon.enhance.defense + ")"
        }
        
        
        functions.sendMessage(message.channel, {
            embed: {
                color: 0xF1C40F,
                title: target.username+"'s Profile",
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
                        value: attack,
                        inline: true
                    }, {
                        name: "Defense <:defence:542134628421468181>",
                        value: defense,
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