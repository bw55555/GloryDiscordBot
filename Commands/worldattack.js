var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        functions.raidAttack(message, user, raid, true, false, false)
        functions.setObject("mobData", raid)
    })
}