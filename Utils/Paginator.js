function sendMessage(channel, text, override) {
    //console.time("Message Send")
    override = (override == true) ? true : false
    if (!override && channel.guild != undefined && serverData[channel.guild.id] != undefined && serverData[channel.guild.id].disabledChannels.indexOf(channel.id) != -1) { return; }
    if (channel.type != "dm" && channel.type != "group" && (channel.permissionsFor(bot.user) != null && !channel.permissionsFor(bot.user).has("SEND_MESSAGES"))) { return }
    while (text.indexOf != undefined && text.indexOf("@everyone") != -1) {
        text.replace("@everyone", "everyone")
    }
    while (text.indexOf != undefined && text.indexOf("@here") != -1) {
        text.replace("@here", "here")
    }
    return channel.send(text).catch(function (err) {
        if (err.errno == "ENOBUFS") {
            if (channel.retry == undefined) {
                bot.setTimeout(function () { sendMessage(channel, text, override) }, 100)
            } else {
                console.error(err)
                sendMessage(bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData.errorChannelId), "```\n" + err.stack + "\n```")
            }
            channel.retry = true;
        } else {
            console.error(err)
            sendMessage(bot.guilds.cache.get(devData.debugGuildId).channels.cache.get(devData.errorChannelId), "```\n" + err.stack + "\n```")
        }
    })
}
var MessageAwait = require("./MessageAwait.js")
class Paginator {
    constructor(channel, dad, pages) {
        this.current = 0;
        this.total = pages.length;
        this.pages = pages;
        this.first = "⏮";
        this.back = "◀"
        this.stop = "⏹";
        this.next = "▶";
        this.last = "⏭";
        this.number = "🔢";
        this.pause = false
        let sendmsg = sendMessage(channel,pages[0])
        if (sendmsg == undefined) { return }
        sendmsg.then(async (msg) => {
            /**
			 * Message sent
			 * @type {Message}
			 */
            this.message = msg;
            if (channel.type == "dm" || channel.type == "group" || channel.permissionsFor(bot.user) != null || channel.permissionsFor(bot.user).has("ADD_REACTIONS")) {
                await this.message.react(this.first).catch(function (err) { console.error(err) });
                await this.message.react(this.back).catch(function (err) { console.error(err) });
                await this.message.react(this.stop).catch(function (err) { console.error(err) });
                await this.message.react(this.next).catch(function (err) { console.error(err) });
                await this.message.react(this.last).catch(function (err) { console.error(err) });
                await this.message.react(this.number).catch(function (err) { console.error(err) });
            }
            this.collector = this.message.createReactionCollector((reaction, user) => reaction.me && user.id === dad.original && user.id !== this.message.author.id, { time: 100000 });
            this.collector.on("collect", (reaction, user) => {
                if (!this.pause) {
                    if (this.message.channel.type != "dm" && this.message.channel.type != "group" && (this.message.channel.permissionsFor(bot.user) == null || this.message.channel.permissionsFor(bot.user).has("MANAGE_MESSAGES"))) {reaction.users.remove(dad)};
                    switch (reaction.emoji.toString()) {
                        case this.first:
                            this.current = 0;
                            break;
                        case this.last:
                            this.current = this.total - 1;
                            break;
                        case this.stop:
                            this.collector.stop();
                            this.message.reactions.removeAll();
                            break;
                        case this.back:
                            this.current--;
                            if (this.current < 0) this.current = this.total - 1;
                            break;
                        case this.next:
                            this.current++;
                            if (this.current > this.total - 1) this.current = 0;
                            break;
                        case this.number:
                            this.pause = true;
                            MessageAwait(this.message.channel,dad.id, "Please enter a number between 1 and "+pages.length+".",
                            function(response) {
                                let number = parseInt(response);
                                if (!isNaN(number) && number>=1 && number <= pages.length) {
                                    return true
                                } else {
                                    return false
                                }
                            }, 
                            function (response, currPaginator) { 
                                if (currPaginator != undefined) {
                                    currPaginator.current = parseInt(response.content) - 1;
                                    currPaginator.pause = false;
                                    currPaginator.refresh()
                                }
                            },
                            this,
                            function (response, currPaginator) {
                                if (currPaginator != undefined) { currPaginator.pause = false };
                            },
                            this)
                    }
                    this.refresh();
                }
            })
        }).catch(function (err) { console.error(err) });
    }
    refresh() {
        this.message.edit(this.pages[this.current]).catch(function (err) { console.error(err) });
    }
}

module.exports=Paginator