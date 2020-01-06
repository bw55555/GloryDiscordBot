var alias = require("./admincheck.js")
module.exports = async function (message, user) {
    return alias(message,user)
}