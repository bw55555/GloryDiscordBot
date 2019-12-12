var alias=require("./blacksmith.js")
module.exports = async function (message,user) {
  return alias(message,user)
}