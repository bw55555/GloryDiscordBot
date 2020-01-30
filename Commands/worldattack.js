
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", "world")]).then(ret => {
        let raid = ret[0]
        functions.raidAttack(message, user, raid, "world")
        functions.setObject("mobData", raid)
    })
}