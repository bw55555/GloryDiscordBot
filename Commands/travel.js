
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (words.length == 1) { return functions.replyMessage(message, "Please specify a place to travel to!") }
    let word2 = words[1].toLowerCase();
    if (word2 == "city") {
        user.location = word2
    } else if (word2 == "treant" || word2 == "kraken" || word2 == "dragon" || word2 == "deity" || word2 == "hell") {
        let key = words[2];
        if (key == undefined) { key = getRandomKey() }
        key = key.toUpperCase()
        let newloc = word2 + key
        functions.getObject("mobData", newloc).then(raid => {
            user.location = word2
            let text = "You have travelled to location "+newloc+"!\n"
            if (raid == false) {
                let raidnames = {
                    "treant": {
                        "name": "Treant Boss",
                        "uri": 'https://i.imgur.com/1fbm4us.jpg',
                        "minlevel": 0,
                        "maxlevel": 25
                    },
                    "kraken": {
                        "name": "Kraken Boss",
                        "uri": 'https://i.imgur.com/mGKIsnX.jpg',
                        "minlevel": 25,
                        "maxlevel": 50
                    },
                    "dragon": {
                        "name": "Dragon Boss",
                        "uri": 'https://i.imgur.com/YCdZZmT.jpg',
                        "minlevel": 50,
                        "maxlevel": 75
                    },
                    "deity": {
                        "name": "Deity Boss",
                        "uri": 'https://i.imgur.com/o842h20.jpg',
                        "minlevel": 75,
                        "maxlevel": 100
                    },
                    "hell": {
                        "name": "Hell Lord",
                        "uri": 'https://imgur.com/MbGhMkJ.jpg',
                        "minlevel": 100,
                        "maxlevel": 200,
                        "ability": { "pierce": 0.1, "critRate": 0.1 },
                        "abilitydesc": '10% chance to pierce, 10% chance to crit and deal 2x damage. '
                    },
                }
                functions.summon(raid, undefined, raidnames[word2].minlevel, raidnames[word2].maxlevel, raidnames[word2].name, raidnames[word2].uri, raidnames[word2].ability, raidnames[word2].abilitydesc)
                text += "A boss has been summoned! It is level " + raid.level + "!";
                functions.setObject("mobData", raid)
            }
            functions.replyMessage(message, text)
        })
        
    }
}
function getRandomKey() {
    let key = ""
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(55 + Math.random() * 36)
        if (x < 65) { x -= 7 }
        key += String.fromCharCode(x)
    }
}