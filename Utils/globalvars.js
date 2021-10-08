global.possibleModifiers = [
    { name: 'attack', default: 0 },
    { name: 'defense', default: 0 },
    { name: 'buff', default: 1 },
    { name: 'dbuff', default: 1 },
    { name: 'critRate', default: 0 },
    { name: 'critDamage', default: 2 },
    { name: 'rage', default: 0 },
    { name: 'sacrifice', default: 0 },
    { name: 'lifeSteal', default: 0 },
    { name: 'tempo', default: 0 },
    { name: 'antitempo', default: 0 },
    { name: 'combo', default: 0 },
    { name: 'pierce', default: 0 },
    { name: 'block', default: 0 },
    { name: 'spikes', default: 0 },
    { name: 'revenge', default: 0 },
    { name: 'burn', default: 0 },
    { name: 'regen', default: 0 },
    { name: 'lucky', default: 1 },
    { name: 'haste', default: 0 },
    { name: 'evade', default: 0 },
    { name: 'bleed', default: 0 },
    { name: 'silence', default: 0 },
    { name: 'vulnerable', default: 0 },
    { name: 'weakness', default: 0 },
    { name: 'stun', default: 0 },
    { name: 'petrify', default: 0 },
    { name: 'resistance', default: 0 },
    { name: 'defmult', default: 10 },
    { name: 'guard', default: 0 },
    { name: 'reflect', default: 0 },
    { name: 'poison', default: 0 },
    { name: 'survive', default: 0 },
    { name: 'critResist', default: 0 },
    { name: 'pierceResist', default: 0 },
    { name: 'silenceResist', default: 0 },
    { name: 'stunResist', default: 0 },
    { name: 'petrifyResist', default: 0 },
    { name: 'attackvariance', default: 0 },
    { name: 'maxhp', default: 0 }
]
global.allowedmodifiers = [
    'attack', 'defense', 'buff',
    'dbuff', 'critRate', 'critDamage',
    'rage', 'sacrifice', 'lifeSteal',
    'tempo', 'antitempo', 'combo',
    'pierce', 'block', 'spikes',
    'revenge', 'burn', 'regen',
    'lucky', 'haste', 'evade',
    'silence', 'stun', 'petrify',
    'resistance', 'defmult', 'guard',
    'reflect', 'poison', 'critResist',
    'pierceResist', 'silenceResist', 'stunResist',
    'petrifyResist', 'survive', 'attackvariance'
]
global.enchantData = {
    "critRate": { "start": 0.01, "level": 0.01, "end": 0.02, "cost": [6, 4, 0, 0] },
    "critDamage": { "start": 0.4, "level": 0.3, "end": 0.5, "cost": [7, 3, 0, 0] },
    "lifeSteal": { "start": 0.04, "level": 0.03, "end": 0.05, "cost": [3, 2, 0, 5] },
    "lucky": { "start": 0.6, "level": 0.4, "end": 0.6, "cost": [10, 0, 0, 0] },
    "sacrifice": { "start": 0.04, "level": 0.03, "end": 0.05, "cost": [3, 5, 0, 2] },
    "revenge": { "start": 0.005, "level": 0.005, "end": 0.01, "cost": [6, 3, 1, 0] },
    "rage": { "start": 0.2, "level": 0.2, "end": 0.4, "cost": [6, 3, 0, 1] },
    "burn": { "start": 2, "level": 1, "end": 3, "cost": [6, 4, 0, 0] },
    "haste": { "start": 1, "level": 1, "end": 2, "cost": [10, 0, 0, 0] },
    "evade": { "start": 0.01, "level": 0.01, "end": 0.02, "cost": [8, 0, 2, 0] },
    "tempo": { "start": 0.2, "level": 0.3, "end": 0.4, "cost": [8, 2, 0, 0] },
    "antitempo": { "start": 0.2, "level": 0.3, "end": 0.4, "cost": [8, 0, 2, 0] },
    "combo": { "start": 0.2, "level": 0.3, "end": 0.4, "cost": [10, 0, 0, 0] },
    "regen": { "start": 0.5, "level": 0.2, "end": 0.6, "cost": [2, 0, 0, 8] },
    "pierce": { "start": 0.02, "level": 0.02, "end": 0.04, "cost": [0, 10, 0, 0] },
    "spikes": { "start": 0.1, "level": 0.1, "end": 0.2, "cost": [0, 5, 5, 0] },
    "block": { "start": 0.02, "level": 0.01, "end": 0.03, "cost": [0, 0, 10, 0] },
    "maxhp": { "start": 20.0, "level": 40.0, "end": 100.0, "cost": [0, 0, 0, 10] }
}
global.guildStore = [
    { "name": "Common Scroll", "type": "guild", "item": "scrolls.0", "price": 50000, "levels": [0, 10, 20, 30, 40, 50], "stocks": [1, 1, 1, 1, 1, 1] },
    { "name": "Uncommon Scroll", "type": "guild", "item": "scrolls.1", "price": 250000, "levels": [10, 20, 30, 40, 50], "stocks": [1, 1, 1, 1, 1] },
    { "name": "Rare Scroll", "type": "guild", "item": "scrolls.2", "price": 1000000, "levels": [20, 30, 40, 50], "stocks": [1, 1, 1, 1] },
    { "name": "Epic Scroll", "type": "guild", "item": "scrolls.3", "price": 2500000, "levels": [30, 40, 50], "stocks": [1, 1, 1] },
    { "name": "Legendary Scroll", "type": "guild", "item": "scrolls.4", "price": 5000000, "levels": [40, 50], "stocks": [1, 1] },
    { "name": "Mythical Scroll", "type": "guild", "item": "scrolls.5", "price": 20000000, "levels": [50], "stocks": [1] },
    { "name": "Box", "type": "individual", "item": "consum.box", "price": 50000, "levels": [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70], "stocks": [25, 75, 150, 250, 500, 1000, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 30000, 40000] },
    //{ "name": "Reroll", "type": "individual", "item": "consum.box", "price": 20000000, "levels": [50, 100], "stocks": [1, 2] }
]
global.guildBuffStore = [
    { "name": "Attack +", "stat": "buff", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.1, 0.2, 0.4, 0.6, 1, 1.5, 2, 2.5, 3, 4], "prices": [0, 400, 1500, 10000, 50000, 150000, 500000, 1500000, 5000000, 15000000, 50000000] },
    { "name": "Defense +", "stat": "dbuff", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.1, 0.2, 0.4, 0.6, 1, 1.5, 2, 2.5, 3, 4], "prices": [0, 400, 1500, 10000, 50000, 150000, 500000, 1500000, 5000000, 15000000, 50000000] },
    { "name": "CritDamage +", "stat": "critDamage", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.5, 1, 2, 3, 5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "CritRate +", "stat": "critRate", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.02, 0.04, 0.06, 0.08, 0.1], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "LifeSteal +", "stat": "lifeSteal", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.1, 0.2, 0.3, 0.4, 0.5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Spikes +", "stat": "spikes", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Block +", "stat": "block", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.02, 0.05, 0.1, 0.15, 0.2], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Tempo +", "stat": "tempo", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.5, 1, 1.5, 2, 2.5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Sacrifice +", "stat": "sacrifice", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.1, 0.2, 0.3, 0.4, 0.5], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Lucky +", "stat": "lucky", "levels": [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], "bonus": [0, 0.1, 0.2, 0.3, 0.5, 0.8, 1.3, 2.1, 3.4, 5.5, 8.9], "prices": [0, 1000, 5000, 25000, 100000, 300000, 1000000, 3000000, 10000000, 30000000, 100000000] },
    { "name": "Revenge +", "stat": "revenge", "levels": [0, 30, 60, 90, 100], "bonus": [0, 0.01, 0.02, 0.03, 0.05], "prices": [0, 100000, 3000000, 90000000, 100000000] },
    { "name": "Rage +", "stat": "rage", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.2, 0.4, 0.6, 0.8, 1], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] },
    { "name": "Pierce +", "stat": "pierce", "levels": [0, 10, 40, 60, 80, 100], "bonus": [0, 0.01, 0.03, 0.06, 0.10, 0.15], "prices": [0, 5000, 100000, 1000000, 10000000, 100000000] }
]
global.guildForgePrices = {
    "level": [
        { "money": 0, "materials": 0, "guildlevel": 0 },
        { "money": 100000000, "materials": 1000000, "guildlevel": 20 },
        { "money": 150000000, "materials": 1500000, "guildlevel": 25 },
        { "money": 250000000, "materials": 2500000, "guildlevel": 30 },
        { "money": 500000000, "materials": 5000000, "guildlevel": 35 },
        { "money": 750000000, "materials": 7500000, "guildlevel": 40 },
        { "money": 1000000000, "materials": 10000000, "guildlevel": 45 },
        { "money": 2000000000, "materials": 20000000, "guildlevel": 50 },
        { "money": 5000000000, "materials": 50000000, "guildlevel": 55 },
        { "money": 10000000000, "materials": 100000000, "guildlevel": 60 }
    ],
    "enchant": [
        { "name": "Max Level", "bonus": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] },
        { "name": "Cost Down", "bonus": [0, 0.6, 0.8, 0.90, 0.96, 0.98, 0.99, 0.996, 0.998, 0.999], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] },
        { "name": "Rate Up", "bonus": [0, 0.01, 0.02, 0.04, 0.08, 0.14, 0.22, 0.32, 0.44, 0.58], "prices": [0, 20000, 50000, 100000, 200000, 500000, 1000000, 2000000, 5000000, 10000000] }
    ],
    "enhance": [
        { "name": "Max Level", "bonus": [0, 20, 50, 100, 150, 200, 300, 450, 700, 1024], "prices": [0, 1000, 2000, 4000, 8000, 20000, 50000, 100000, 200000, 500000] },
        { "name": "Cost Down", "bonus": [0, 0.1, 0.25, 0.5, 0.75, 0.9, 0.95, 0.98, 0.995, 0.999], "prices": [0, 1000, 5000, 20000, 50000, 200000, 500000, 2000000, 5000000, 10000000] },
        { "name": "Rate Up", "bonus": [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9], "prices": [0, 20000, 60000, 120000, 200000, 300000, 420000, 560000, 720000, 9000000] }
    ]
}
global.templateUser = {
    money: 0,
    health: 10,
    currenthealth: 10,
    xp: 0,
    level: 1,
    attack: 1,
    defense: 1,
    basehealth: 10,
    baseattack: 1,
    basedefense: 1,
    speed: 0,
    dead: false,
    start: false,
    triangle: "None",
    triangleid: 0,
    trianglemod: 1,
    weapon: false,
    ability: {},
    inventory: {},
    marry: "None",
    guild: "None",
    guildpos: "None",
    guildbuffs: {},
    votestreak: 0,
    shield: 0,
    materials: 0,
    ascension: 0,
    bounty: 0,
    glory: 0,
    contribution: 0,
    votestreak: 0,
    honor: 0,
    dailyhonor: 0,
    runes: [0, 0, 0, 0, 0, 0, 0],
    cooldowns: {},
    skills: {},
    equippedSkills: { "A": "None", "B": "None", "C": "None" },
    consum: { explosion: 0, box: 0, sp: 0, phoenixfeather: 0, nametag: 0, reroll: 0 },
    quests: [],
    cnumbers: [0, 0],
    statusEffects: {},
    startts: 0,
    location: "city",
    missions: [],
    bag: {},
    guildperms: {},
    present: 0,
    luckycoin: 0,
    luckycointotal: 0,
    eventClass: {}
}
global.runeNames = ["Rune Shard", "Wisdom Rune", "Energy Rune", "Arcane Rune", "Force Rune", "Guard Rune", "Life Rune"]
global.allowedcollections = ["userData", "itemData", "guildData", "auctionData", "dungeonData", "mobData"]
global.rarities = { "0": "Useless", "1": "Normal", "2": "Common", "3": "Uncommon", "4": "Rare", "5": "Super Rare", "6": "Epic", "7": "Legendary", "8": "Godly", "9": "GLORY", "Unique": "Unique" }
global.raritystats = [5, 10, 15, 25, 40, 60, 100, 150, 200, 500]
global.cdseconds = 1.5;
global.attackcd = 0.35;
global.rezcd = 1;
global.workcdseconds = 10;
global.smeltallcd = 1;
global.bolstercd = 1; //every 2 minute, you can do !bolster on another player or yourself. That adds 100 to their currenthealth regardless of max health.
global.userData = "userData"//JSON.parse(fs.readFileSync('Storage/userData.json', 'utf8'));
global.itemData = "itemData"//JSON.parse(fs.readFileSync('Storage/itemData.json', 'utf8'));
global.mobData = "mobData"//JSON.parse(fs.readFileSync('Storage/mobData.json', 'utf8'));
global.guildData = "guildData"//JSON.parse(fs.readFileSync('Storage/guildData.json', 'utf8'));
global.questData = "questData"//JSON.parse(fs.readFileSync('Storage/questData.json', 'utf8'));
global.partyData = "partyData"
global.dailyrefresh = null;
global.talkedRecently = {};
global.nctlist = {};
global.msperday = 24 * 60 * 60 * 1000;
module.exports = null