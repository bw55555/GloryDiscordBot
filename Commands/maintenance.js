module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.split(/\s+/)
    if (devs.indexOf(id) == -1) { return }
    if (devData.enable) { return functions.replyMessage(message, "You cannot do this while the bot is enabled!")}
    functions.MessageAwait(message.channel, id, "Are you sure you want to start maintenance?\nIf you are sure, type `confirm`", "confirm", async function (response, extraArgs) {
        let message = extraArgs[0];
        /*
        await functions.setProp("userData", {}, {
            $set: {
                "maintenance": true
            },
            $inc: {
                "consum.box": 500
            }
        })
        //await functions.deleteObjects("mobData", {})
        */
        functions.findUsers({}).then(res => {
            let tasks = []
            for (let user in res) {
                tasks.push({
                    updateOne:
                    {
                        "filter": user._id,
                        "update": {
                            $set: {
                                "basehealth": user.health - functions.calcExtraStat(user, "health"),
                                "baseattack": user.attack,
                                "basedefense": user.defense
                            }
                        }
                    }
                })
            }
            functions.bulkWrite(userData, tasks)
        })
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
    

        
}