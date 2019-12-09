var functions=require("../Utils/functions.js")
module.exports = function (message) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (userData[id] != undefined){
        functions.replyMessage(message, "You already have an account!")
        return;
    }
    functions.checkProps(message)
    client.db("current").collection("userData").insertOne(
        {
            _id: message.author.id,
            username: message.author.username,
            money: 0,
            lastDaily: 0,
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
            marrytarget: "None",
            guild: "None",
            guildpos: "None",
            guildtarget: "None",
            bolster: false,
            shield: ts + 24 * 1000 * 60 * 60,
            materials: 0,
            ascension: 0,
            bounty: 0,
            glory: 0,
            cooldowns: { normal: 1, attack: 1, heal: 1, rez: 1, work: 1, bolster: 1, smeltall: 1, purchase: 1, merge: 1 },
            skills: {},
            skillA: "None" ,
            skillB: "None" ,
            skillC: "None" ,
            consum: { explosion: 0, box: 0, sp: 0, phoenixfeather: 0, nametag: 0, reroll: 0 }
        }
    )
    functions.replyMessage(message, "Welcome to Glory!\nTo get started type `!help` to see all the commands available, or use `!tutorial` to see the official glory tutorial!\n Go obtain your Glory!")
}
