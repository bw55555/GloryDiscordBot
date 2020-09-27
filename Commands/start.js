const mainQuestData = Assets.mainQuestData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
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
        currenthealth: 10,
        xp: 0,
        level: 1,
        attack: 1,
        defense: 1,
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
        votestreak: 0,
        shield: ts + 24 * 1000 * 60 * 60,
        materials: 0,
        ascension: 0,
        bounty: 0,
        glory: 0,
        burn: 0,
        contribution: 0,
        runes: [0, 0, 0, 0, 0, 0, 0],
        cooldowns: { normal: 1, attack: 1, heal: 1, rez: 1, work: 1, bolster: 1, smeltall: 1, purchase: 1, merge: 1, daily: 1, luckyshoprefresh: 1, lastbreath: 1 },
        skills: {},
        equippedskills: {},
        consum: { explosion: 0, box: 0, sp: 0, phoenixfeather: 0, nametag: 0, reroll: 0 },
        quests: [],
        cnumbers: [0,0]
    }

    user.money += 1000;
    let text = "Welcome to Glory!\nTo get started type `!help` to see all the commands available, or use `!tutorial` to see the official glory tutorial!\n Go obtain your Glory!"
    text += "\n" +functions.adminQuest(mainQuestData[0].quest, user)
    functions.setUser(user)
    functions.replyMessage(message, text)
}
