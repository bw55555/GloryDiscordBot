
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (admins.indexOf(id) == -1) { return }
    var FS = require('fs');
    functions.findObjects('userData', {}).then(ret => FS.writeFile('backup/' + ts + '/userData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('itemData', {}).then(ret => FS.writeFile('backup/' + ts + '/itemData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('guildData', {}).then(ret => FS.writeFile('backup/' + ts + '/guildData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('mobData', {}).then(ret => FS.writeFile('backup/' + ts + '/mobData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('devData', {}).then(ret => FS.writeFile('backup/' + ts + '/devData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('serverData', {}).then(ret => FS.writeFile('backup/' + ts + '/serverData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('auctionData', {}).then(ret => FS.writeFile('backup/' + ts + '/auctionData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('dungeonData', {}).then(ret => FS.writeFile('backup/' + ts + '/dungeonData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.findObjects('familiarData', {}).then(ret => FS.writeFile('backup/' + ts + '/familiarData.json', JSON.stringify(ret), (err) => console.log(err)));
    functions.replyMessage(message, 'Backup created!')
    functions.logCommand(message)
}