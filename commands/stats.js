const {
    version
} = require("discord.js");
const {MessageEmbed} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    const embed = new MessageEmbed()
        .setColor(0x00ff00)
        .setTitle('STATISTICS')
        .addField('🤓', `• Mem Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n• Uptime: ${duration}\n• Users: ${client.users.cache.size.toLocaleString()}\n• Servers: ${client.guilds.cache.size.toLocaleString()}\n• Channels: ${client.channels.cache.size.toLocaleString()}\n• Discord.js: v${version}\n• Node: ${process.version}`)
    message.channel.send(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stat', 's'],
    permLevel: "User"
};

exports.help = {
    name: "stats",
    category: "Miscelaneous",
    description: "Gives some useful bot statistics",
    usage: "stats",
    aliases: ['stat', 's']
};
