
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    //return functions.replyMessage(message, "Explosions are disabled. ")
    if (user.consum.explosion <= 0) { return functions.replyMessage(message, "You don't have any bombs left!") }
    if (user.dead) { return functions.replyMessage(message, "You can't throw a bomb while dead!") }
    if (user.money <= 10000000) { return functions.replyMessage(message, "You need $10000000 to be able to throw a bomb!")}
    let chance = Math.random();
    user.consum.explosion -= 1;
    if (chance < 0.25 && devs.indexOf(id) == -1) { user.currenthealth -= 10000; return functions.replyMessage(message, "The bomb malfunctioned and exploded in your hands... "); }
    else if (chance < 0.5 && devs.indexOf(id) == -1) { return functions.replyMessage(message, "The bomb malfunctioned and refused to explode...") }
    else {
        let inchannel = talkedRecently[message.channel.id];
        let nearby = [];
        for (person in inchannel) {
            if (functions.calcTime(ts, inchannel[person]) < 15 && person!=id && devs.indexOf(person) == -1) {
                nearby.push(person)
            }
        }

        user.money -= 10000000
        if (nearby.length == 0) { return functions.replyMessage(message, "The bomb exploded, but no one got hit... ") }
        functions.findUsers({ "_id": { $in: nearby }, "dead": false }).then(ret => {
            if (ret.length == 0) { return functions.replyMessage(message, "The bomb exploded, but no one got hit... ")}
            let text = "https://tenor.com/view/explosion-gif-9488133 \n";
            let count = 0;
            let total = 0;
            let tasks = [];
            for (let person of ret) {
                count++;
                let blast = (Math.floor(Math.random() * 4000));
                text += "<@" + person._id + "> was caught in the explosion and took " + blast + " damage!\n"
                person.currenthealth -= blast
                functions.dmUser(person, "https://tenor.com/view/explosion-gif-9488133 \nYou were caught in <@" + id + ">\'s explosion and took " + blast + " damage!")
                if (person.currenthealth <= 0) {
                    person.dead = true;
                    person.currenthealth = 0;
                    let stolen = Math.floor(person.money / 5)
                    person.money -= stolen;
                    user.money += stolen;
                    total+=stolen
                    text += '<@' + person._id + '> was Meme-Maged for $' + stolen + '!\n';
                }
                tasks.push({
                    replaceOne:
                    {
                        "filter": { _id: person._id },
                        "replacement": person
                    }
                })
            }
            functions.sendMessage(message.channel, text)
            functions.bulkWrite("userData", tasks)
        })
    }
}
