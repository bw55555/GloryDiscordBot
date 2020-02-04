module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let floor = user.floorlevel;

    return Promise.all([functions.getFloorMob(floor)]).then(ret => {

    let _id = 0;
    let mobinfo = ret[0]
    let damage = functions.calcDamage(message, user, user);
    let counter = functions.calcDamage(message, user, user);

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
                },
                {
                    name: "Damage",
                    value: damage,
                    inline: true
                },
                {
                    name: "Counter",
                    value: counter,
                    inline: true
                }
            ]
        }
    });
})
    if (devs.indexOf(id) == -1) {return}
}