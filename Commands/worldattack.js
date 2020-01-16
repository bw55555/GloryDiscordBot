var functions = require("../Utils/functions.js")
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", "world")]).then(ret => {
        let raid = ret[0]
        functions.raidAttack(message, user, raid, true, false, true)
        functions.setObject("mobData", raid)
    })
}