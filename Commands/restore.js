
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    var FS = require('fs');
    if (words.length == 1) {return functions.replyMessage(message, "Please specify a folder name!")}
    folder = words[1];
    collections = ['userData', 'itemData', 'guildData', 'mobData', 'devData', 'serverData', 'auctionData', 'dungeonData', 'familiarData']
    for (let coll of collections) {
        let data = FS.readFileSync('backup/' + folder + '/' + coll + '.json', 'utf8')
        if (data) {
            let parsed = JSON.parse(data)
            
            functions.deleteObjects(coll, {}).then(res => {
                if (res) {
                    let tasks = []
                    for (let backupobj of parsed) {
                        tasks.push({
                            insertOne: {
                                document: backupobj
                            }
                        })
                    }
                    console.log("Updating " + coll);
                    if (tasks.length > 0) functions.bulkWrite(coll, tasks);
                }
            })
            
        } else {
            return functions.replyMessage(message, "Missing collection: "+coll)
        }
    }
    functions.replyMessage(message, 'Backup created!')
    functions.logCommand(message)
}