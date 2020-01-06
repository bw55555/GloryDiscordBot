var alias=require("./health.js")
module.exports = async function (message, user) {
  return alias(message,user)
}