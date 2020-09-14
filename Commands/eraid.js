var alias = require("./eventraid.js")
module.exports = async function (message, user) {
    return alias(message, user)
}