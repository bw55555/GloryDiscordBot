
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    return Promise.all([functions.validate(message, user)]).then(ret => {
        let target = ret[0];
        if (target == false) { return }
        if (devData.hardbans[target._id] == undefined) { return functions.replyMessage(message, "<@" + target._id + "> is not hardbanned!") }
        devData.hardbans[target._id] = undefined
        functions.replyMessage(message, "<@" + target._id + "> has been unbanned... Welcome back!")
        functions.logCommand(message)
        functions.setObject("devData", devData)
    })
}