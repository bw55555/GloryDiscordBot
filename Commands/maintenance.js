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
            for (let thisuser of res) {
                let gloryinc = 20 * thisuser.ascension - 15 - 10 - 5
                if (thisuser.ascension <= 3) { gloryinc = Math.floor(5 * (thisuser.ascension) * (thisuser.ascension + 1) / 2) }
                gloryinc -= 150;
                if (gloryinc + thisuser.glory < 0) {gloryinc = thisuser.glory * -1}
                let toSet = {
                    $set: {
                        "eventClass": {},
                        'maintenance': true
                    },
                    $inc: {
                        "glory": gloryinc
                    }
                }
                if (thisuser.boughtghost || thisuser.triangleid == 2000) { toSet.$set.eventClass.ghost = true; }
                if (thisuser.boughtstar || thisuser.triangleid == 2001) { toSet.$set.eventClass.celestial = true; }
                if (thisuser.startts == undefined) {toSet.$set.startts = ts}
                tasks.push({
                    updateOne:
                    {
                        "filter": { _id: thisuser._id },
                        "update": toSet
                    }
                })
            }
            functions.bulkWrite("userData", tasks)
        })
        functions.replyMessage(message, "Maintenance was completed!")
    }, [message])
    

        
}