var alias = require("./eventinfo.js")
module.exports = async function (message, user) {
    return alias(message, user)
}