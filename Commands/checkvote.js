module.exports = async function (message, user) {

    let id = message.author.id;
    let ts = message.createdTimestamp

    const https = require('https');

    const options = {
        hostname: 'top.gg',
        port: 443,
        path: '/api/bots/536622022709608468/check?userId=' + id,
        method: 'GET',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjYyMjAyMjcwOTYwODQ2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ5ODE3MTkxfQ.2pFz9ECHEzpi0OtneZ2LrP-_apXf5oXj2Tsv_OaUPTw'

        }
    };

    const req = https.request(options, (res) => {

    res.on('data', function (chunk) {

            const obj = JSON.parse(chunk);
            console.log(obj.voted);
            let text = "";
            dm = true;

            if (obj.voted == 1) {
                functions.replyMessage(message, 'Voted')
                functions.replyMessage(message, functions.calcTime(user.votestreaktime, ts))

                if (functions.calcTime(user.votestreaktime, ts) < 0) {

                    user.votestreak += 1
                    user.votestreaktime = ts + 24 * 60 * 60 * 1000
                    let numboxes = Math.ceil((1 + user.ascension) * Math.sqrt(user.votestreak) / 2)

                    if (user.glory != undefined && user.glory < 100) {
                        user.glory += Math.random() * 0.5;
                    }
                    user.consum.box += numboxes
                    functions.
                    sendMessage(message.channel, "<@" + user._id + "> has been given " + numboxes + " boxes!\n" + text)
                    if (dm) functions.dmUser(user, "Thank you for voting! You have been given " + numboxes + " boxes!\n" + text)
                }
            }
            if (obj.voted == 0) {
                functions.replyMessage(message, 'Not Voted')
            }

    });

});

    req.on('error', (e) => {
        console.error(e);
});
    req.end();
}