var mainQuestData = Assets.mainQuestData
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (user != false && user != undefined){
        functions.replyMessage(message, "You already have an account!")
        return;
    }
    user = {
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
        ability: "None",
        inventory: {},
        marry: "None",
        guild: "None",
        guildpos: "None",
        guildbuffs: {},
        bolster: false,
        votestreak: 0,
        shield: 0,
        materials: 0,
        ascension: 0,
        bounty: 0,
        glory: 0,
        burn: 0,
        contribution: 0,
        honor: 0,
        runes: [0, 0, 0, 0, 0, 0, 0],
        cooldowns: {},
        skills: {},
        equippedSkills: { "A": "None", "B": "None", "C": "None" },
        consum: { explosion: 0, box: 0, sp: 0, phoenixfeather: 0, nametag: 0, reroll: 0 },
        quests: [],
        cnumbers: [0, 0],
        statusEffects: {},
        candy: 0,
        startts: 0,
        location: "city"
    }
    user.startts = ts;
    user.money += 1000;
    user.shield = ts + 24 * 60 * 60 * 1000
    user._id = message.author.id
    user.username = message.author.username
    user.cooldowns.normal = ts;
    let text = "Welcome to Glory!\nTo get started type `!help` to see all the commands available, or use `!tutorial` to see the official glory tutorial!\n Go obtain your Glory!"
    text += "\n" +functions.adminQuest(mainQuestData[0].quest, user)
    functions.setUser(user)
    functions.replyMessage(message, text)
}
