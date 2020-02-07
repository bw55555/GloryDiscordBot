module.exports = async function (message, user, guild) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let floor = user.floorlevel;

    functions.floorAttack(message, user, guild);

    return Promise.all([functions.getFloorMob(floor)]).then(ret => {

    let mobinfo = ret[0]

    functions.sendMessage(message.channel, {
        embed: {
            title: "Floorattack ",
            color: 0xF1C40F,
            fields: [
                {
                    name: "Name",
                    value: mobinfo.name,
                    inline: true
                },
                {
                    name: "Level",
                    value: mobinfo.bossId,
                    inline: true
                }
            ]
        }
    });
})
    if (devs.indexOf(id) == -1) {return}
}