module.exports = async function (message, user) {

    const https = require('https');

    const options = {
        hostname: 'top.gg',
        port: 443,
        path: '/api/bots/536622022709608468/check?userId=444564799913721876',
        method: 'GET',
        headers: {
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjYyMjAyMjcwOTYwODQ2OCIsImJvdCI6dHJ1ZSwiaWF0IjoxNTQ5ODE3MTkxfQ.2pFz9ECHEzpi0OtneZ2LrP-_apXf5oXj2Tsv_OaUPTw',
            'content-type' 'application/json'
        }
    };

    const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);

    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
    

});

    req.on('error', (e) => {
        console.error(e);
});
    req.end();
    


}