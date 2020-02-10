module.exports = async function (message, user) {

    let id = message.author.id;

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
            console.log(obj.voted)

            if (obj.voted == 1) {
                functions.replyMessage(message, 'Voted')
                functions.replyMessage(message, user.votestreaktime)
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