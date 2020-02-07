module.exports = async function (message, user, guild) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let floor = user.floorlevel;

    return Promise.all([functions.getFloorMob(floor)]).then(ret => {

    let mobinfo = ret[0]

     functions.floorAttack(message, user, guild, mobinfo);

})
    if (devs.indexOf(id) == -1) {return}
}