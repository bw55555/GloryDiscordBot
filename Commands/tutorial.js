
module.exports = async function (message, user) {
    let id = message.author.id;
    let ts = message.createdTimestamp;
    let words = message.content.trim().split(/\s+/)
    functions.sendMessage(message.channel, "The tutorial can be found at https://docs.google.com/document/d/1dbv3F-7LouTyrXtBiVVNc5NIIXc-t_A4qpMkYzOhdmQ/edit?usp=sharing")
}