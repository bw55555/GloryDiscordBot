
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (user.level < 5) {
        functions.replyMessage(message, 'You must be level 5 to choose a class!');
        return;
    }
    let text = message.content.toUpperCase().split(" ");
    if (text.length == 1) {
        functions.sendMessage(message.channel,
            "`!class [Pick a class!]` - At level 5, you can choose a class!\n" +
            "<:archer:542178096246423594> Archer - Deal increased damage against Mages.\n" +
            "<:mage:542093501660266497> Mage - Deal increased damage against Warriors.\n" +
            "<:warrior:542061062405750795> Warrior - Deal increased damage against Archers.\n" +
            "\n" +
            "Warning: You can only choose this at level 5+, and will lose 1 level.\n" +
            "----------------------------------------------------------------\n" +
            "<:assassin:542178120141373440> Assassin - Archer subclass; Chance of critical damage while attacking\n" +
            "<:Merchant:541741539991486465> Merchant - Archer subclass; Earn more from `!work`!\n" +
            "<:Healer:541737142376857601> Healer - Mage subclass; Gain the ability to rez others at the cost of your own life. Also reduces heal cooldowns by 25%\n" +
            "<:oracle:542183480558092308> Oracle - Mage subclass; Gain the ability to `!predict`\n" +
            "<:bloodlifeweaver:542188575333023754> Life/Bloodweaver - Mage subclass; `!swap` between Lifeweaver and Bloodweaver, gaining lifesteal or life sacrifice!\n" +
            "<:berserker:541748571662188549> Berserker - Warrior Subclass; Deals increased damage while damaged\n" +
            "<:paladin:542093280930824202> Paladin - Warrior Subclass; `!bolster` other players! They are buffed during their next attack!\n" +
            "\n" +
            "Warning: You can only choose this at level 15+, and will lose 1 level."

        );
        return;
    }
    let classpick = text[1];
    //console.log(classpick);
    let oldid = user.triangleid
    if (classpick === 'ARCHER') {
        user.triangle = '<:archer:542178096246423594> Archer';
        user.triangleid = 1;
        user.trianglemod = 1.2; //People with classes automatically deal increased damage.
        functions.replyMessage(message, 'You are now an Archer!');
    }
    else if (classpick === 'MAGE') {
        user.triangle = '<:mage:542093501660266497> Mage';
        user.triangleid = 2;
        user.trianglemod = 1.2;
        functions.replyMessage(message, 'You are now a Mage!');
    }
    else if (classpick === 'WARRIOR') {
        user.triangle = '<:warrior:542061062405750795> Warrior';
        user.triangleid = 3;
        user.trianglemod = 1.2;
        functions.replyMessage(message, 'You are now a Warrior!');
    } else if (classpick === 'ASSASSIN') {
        if (user.level < 15 || (user.triangleid) % 3 !== 1) {
            functions.replyMessage(message, "You must be level 15 Archer to choose this subclass");
            return;
        }
        user.triangle = '<:assassin:542178120141373440> Assassin';
        user.triangleid = 4;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now an Assassin!');
    } else if (classpick === 'MERCHANT') {
        if (user.level < 15 || (user.triangleid) % 3 !== 1) {
            functions.replyMessage(message, "You must be level 15 Archer to choose this subclass");
            return;
        }
        user.triangle = '<:Merchant:541741539991486465> Merchant';
        user.triangleid = 7;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now a Merchant!');
    } else if (classpick === 'HEALER') {
        if (user.level < 15 || (user.triangleid) % 3 !== 2) {
            functions.replyMessage(message, "You must be level 15 Mage to choose this subclass");
            return;
        }
        user.triangle = '<:Healer:541737142376857601> Healer';
        user.triangleid = 5;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now a Healer!');
    } else if (classpick === 'ORACLE') {
        if (user.level < 15 || (user.triangleid) % 3 !== 2) {
            functions.replyMessage(message, "You must be level 15 Mage to choose this subclass");
            return;
        }
        user.triangle = '<:oracle:542183480558092308> Oracle';
        user.triangleid = 8;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now an Oracle!');
    } else if (classpick === 'LIFEWEAVER' || classpick === 'BLOODWEAVER' || classpick === 'WEAVER') {
        if (user.level < 15 || (user.triangleid) % 3 !== 2) {
            functions.replyMessage(message, "You must be level 15 Mage to choose this subclass");
            return;
        }
        user.triangle = '<:bloodlifeweaver:542188575333023754> Life/Bloodweaver';
        user.triangleid = 11;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now an Lifeweaver!');
    } else if (classpick === 'BERSERKER') {
        if (user.level < 15 || (user.triangleid) % 3 != 0) {
            functions.replyMessage(message, "You must be level 15 Warrior to choose this subclass");
            return;
        }
        user.triangle = '<:berserker:541748571662188549> Berserker';
        user.triangleid = 6;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now a Berserker!');
    } else if (classpick === 'PALADIN') {
        if (user.level < 15 || (user.triangleid) % 3 != 0) {
            functions.replyMessage(message, "You must be level 15 Warrior to choose this subclass");
            return;
        }
        user.triangle = '<:paladin:542093280930824202> Paladin';
        user.triangleid = 9;
        user.trianglemod = 1.4;
        functions.replyMessage(message, 'You are now a Paladin!');
    } else {
        functions.replyMessage(message, 'That is not an available class!');
        return
    }
    if (oldid != 0) {
        if (!(user.triangleid > 3 && oldid <= 3)) {
            user.level -= 1;
            user.xp = 0;
        }
    }
}