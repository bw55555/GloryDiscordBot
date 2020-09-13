
module.exports = async function (message, user) {
    return Promise.all([functions.getObject("mobData", "event")]).then(ret => {
        let raid = ret[0]
        functions.raidAttack(message, user, raid, "event")
        functions.setObject("mobData", raid)
    })
    
}