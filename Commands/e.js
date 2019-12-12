var alias=require("./money.js")
module.exports = async function (message,user) {
  return alias(message,user)
}