var alias=require("./inventory.js")
module.exports = async function (message, user) {
  return alias(message,user)
}