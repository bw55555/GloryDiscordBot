var functions = require("../Utils/functions.js")
module.exports = async function (message,user) {
    if (message.channel.id != "542171947895881748") { return }
    return Promise.all([functions.getObject("mobData", message.channel.id)]).then(ret => {
        let raid = ret[0]
        functions.raidAttack(message, user, raid, true, false, true)
        functions.setObject("mobData", raid)
    })
    
}