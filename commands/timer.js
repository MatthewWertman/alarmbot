//TODO: Add & Subtract time,
//start, stop, and reset timer duration,
//check timer duration,

const moment = require("moment");
require("moment-duration-format");
require('moment-timer');

exports.run = (client, message, args) => {
    if (!args[0] && args.length === 0) return message.channel.send(`Please enter an valid duration in seconds. USAGE: ${exports.help.usage}`);
    //if (args.length > 1) return message.channel.send(`Too many agruments! USAGE: ${exports.help.usage}`);
    let n = Number(args[0]);
    if (!Number.isSafeInteger(n) || isNaN(n)) return message.channel.send('Please enter a valid number as the duration.');
    let timer = new moment.duration(n, "seconds").timer(() => {
        message.reply('Timer has expired!');
    });
    message.channel.send(`Started timer for ${n} seconds...`);
    timer.start();
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stopwatch', 'tr', 'sw'],
    permLevel: "User"
};

exports.help = {
    name: "timer",
    category: "Miscelaneous",
    description: "timer",
    usage: "timer <duration in seconds>",
    aliases: ['stopwatch', 'tr', 'sw']
};
