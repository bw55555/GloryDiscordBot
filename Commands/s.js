var alias = require("./skills.js")
module.exports = async function (message, user) {
    return alias(message,user)
}