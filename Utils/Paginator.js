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
// const { MessageActionRow, MessageButton } = require('discord.js'); // New way for reaction buttons
class Paginator {
    constructor(channel, dad, pages) {
        this.current = 0;
        this.total = pages.length;
        this.pages = pages;
        this.pause = false;

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton().setCustomId('first').setLabel('⏮').setStyle('PRIMARY'),
                new MessageButton().setCustomId('back').setLabel('◀').setStyle('PRIMARY'),
                new MessageButton().setCustomId('stop').setLabel('⏹').setStyle('DANGER'),
                new MessageButton().setCustomId('next').setLabel('▶').setStyle('PRIMARY'),
                new MessageButton().setCustomId('last').setLabel('⏭').setStyle('PRIMARY'),
                new MessageButton().setCustomId('number').setLabel('🔢').setStyle('SECONDARY')
            );

        sendMessage(channel, pages[0]).then(async (msg) => {
            this.message = msg;
            await this.message.edit({ components: [buttons] });

            const filter = i => i.user.id === dad.original && i.user.id !== this.message.author.id;
            const collector = this.message.createMessageComponentCollector({ filter, time: 100000 });

            collector.on('collect', async i => {
                if (!this.pause) {
                    await i.deferUpdate();
                    switch (i.customId) {
                        case 'first':
                            this.current = 0;
                            break;
                        case 'last':
                            this.current = this.total - 1;
                            break;
                        case 'stop':
                            collector.stop();
                            await this.message.edit({ components: [] });
                            break;
                        case 'back':
                            this.current--;
                            if (this.current < 0) this.current = this.total - 1;
                            break;
                        case 'next':
                            this.current++;
                            if (this.current > this.total - 1) this.current = 0;
                            break;
                        case 'number':
                            this.pause = true;
                            MessageAwait(this.message.channel, dad.id, `Please enter a number between 1 and ${pages.length}.`,
                                function (response) {
                                    let number = parseInt(response);
                                    return !isNaN(number) && number >= 1 && number <= pages.length;
                                },
                                (response, currPaginator) => {
                                    if (currPaginator) {
                                        currPaginator.current = parseInt(response.content) - 1;
                                        currPaginator.pause = false;
                                        currPaginator.refresh();
                                    }
                                },
                                this,
                                (response, currPaginator) => {
                                    if (currPaginator) currPaginator.pause = false;
                                },
                                this
                            );
                            break;
                    }
                    this.refresh();
                }
            });
        }).catch(err => console.error(err));
    }

    refresh() {
        this.message.edit(this.pages[this.current]).catch(err => console.error(err));
    }
}

module.exports = Paginator;