const moment = require("moment");

exports.run = async (client, message, args) => {
    if (!args[0] && args.length === 0) return message.channel.send(`Please enter an valid duration in seconds. USAGE: ${exports.help.usage}`);
    if (args.length > 1) return message.channel.send(`Too many agruments! USAGE: ${exports.help.usage}`);
    let n = Number(args[0]);
    let timer = await client.setTimer(message, n);
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
