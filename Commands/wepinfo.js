var alias=require("./weaponinfo.js")
module.exports = async function (message, user) {
    return alias(message, user)
}