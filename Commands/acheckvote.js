module.exports = async function (message, user) {

    if (admins.indexOf(id) == -1) { return user}

    let words = message.content.trim().split(/\s+/)
    let id = words[1]
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
                functions.replyMessage(message, 'User has been voted on top.gg')

                if (functions.calcTime(user.votestreaktime, ts) < 0) {

                    user.votestreak += 1
                    let numboxes = Math.ceil((1 + user.ascension) * Math.sqrt(user.votestreak) / 2)

                    if (user.glory != undefined && user.glory < 100) {
                        user.glory += Math.random() * 0.5;
                    }
                    user.consum.box += numboxes
                    functions.sendMessage(message.channel, "<@" + user._id + "> has been given " + numboxes + " boxes!\n" + text)
                    if (dm) functions.dmUser(user, "Thank you for voting! You have been given " + numboxes + " boxes!\n" + text)

                    user.votestreaktime = ts + 24 * 60 * 60 * 1000
                    functions.setUser(user)
                }

                if (functions.calcTime(user.votestreaktime, ts) >
                    0) {

                    functions.replyMessage(message, 'Rewarded already been given')
                }
            }

            if (obj.voted == 0) {
                functions.replyMessage(message, 'User not voted last 12h on top.gg')
            }

        });

});

    req.on('error', (e) => {
        console.error(e);
});
    req.end();
}