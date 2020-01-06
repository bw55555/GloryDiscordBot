var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    return Promise.all([functions.validate(message,user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return }
        global.devData.hardbans[target._id] = true
        functions.replyMessage(message, "<@" + target._id + "> has been hardbanned... Bye")
        functions.logCommand(message)
        fs.writeFileSync('Storage/devData.json', JSON.stringify(devData, null, 4))
    })
}