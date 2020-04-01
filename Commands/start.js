
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let prefix = serverData[message.guild.id].prefix;
    let words = message.content.split(/\s+/)
    if (user != false && user != undefined){
        functions.replyMessage(message, "You already have an account!")
        return;
    }
    user = {
        _id: message.author.id,
        username: message.author.username,
        money: 0,
        health: 10,
        currenthealth: 0,
        xp: 0,
        level: 1,
        attack: 0,
        defense: 0,
        speed: 0,
        dead: false,
        start: false,
        triangle: "None",
        triangleid: 0,
        trianglemod: 1,
        weapon: false,
        ability: "Ability",
        inventory: {},
        marry: "None",
        guild: "None",
        guildpos: "None",
        guildbuffs: {},
        bolster: false,
        shield: ts + 24 * 1000 * 60 * 60,
        materials: 0,
        ascension: 0,
        bounty: 0,
        glory: 0,
        burn: 0,
        cooldowns: { normal: 1, attack: 1, heal: 1, rez: 1, work: 1, bolster: 1, smeltall: 1, purchase: 1, merge: 1, daily: 1 },
        skills: {},
        skillA: "None",
        skillB: "None",
        skillC: "None",
        consum: { explosion: 0, box: 0, sp: 0, phoenixfeather: 0, nametag: 0, reroll: 0 },
        quests: []
    }

    user.money += 1000;

    functions.setUser(user)
    functions.replyMessage(message, "Welcome to Glory!\nTo get started type `" + prefix + "help` to see all the commands available, or use `" + prefix + "tutorial` to see the official glory tutorial!\n Go obtain your Glory!")
}
