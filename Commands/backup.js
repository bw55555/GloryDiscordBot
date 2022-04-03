
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    var FS = require('fs');
    var foldername = words.length == 1 ? ts : words[1]
    collections = ['userData', 'itemData', 'guildData', 'mobData', 'devData', 'serverData', 'auctionData', 'dungeonData', 'familiarData']
    for (let coll of collections) {
        functions.findObjects(coll, {}).then(ret => FS.writeFile('backup/' + foldername + '/' + coll + '.json', JSON.stringify(ret), (err) => {
            if (err) { console.log(err) } else { console.log("Backed up " + coll);}
        }));
    }
    functions.replyMessage(message, 'Backup created!')
    functions.logCommand(message)
}