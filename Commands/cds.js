var alias=require("./cooldowns.js")
module.exports = async function (message, user) {
  return alias(message,user)
}
//test alias template