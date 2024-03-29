
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    return Promise.all([client.db(db).collection("userData").count({}), client.db(db).collection("guildData").count({})]).then(ret => {
        functions.sendMessage(message.channel, {
            embed: { //displays guild stats
                title: "Bot Stats",
                color: 0xF1C40F,
                fields: [{ //displays variables
                    name: "Total Accounts",
                    value: ret[0],
                    inline: true
                }, { //displays variables
                    name: "Total Guilds",
                    value: ret[1],
                    inline: true
                }, {
                    name: "Total Servers",
                    value: Object.keys(serverData).length,
                    inline: true
                }]
            }
        });
    });
}