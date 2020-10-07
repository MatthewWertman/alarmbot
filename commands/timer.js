const moment = require("moment");

exports.run = async (client, message, args) => {
    if (!args[0] && args.length === 0) return message.channel.send(`Please enter an valid duration in seconds. USAGE: ${exports.help.usage}`);
    if (args.length > 1) return message.channel.send(`Too many agruments! USAGE: ${exports.help.usage}`);
    let n = Number(args[0]);
    let timer = await client.setTimer(message, n);
    if (timer) {
        message.channel.send(`Started timer for ${n} seconds... type 'stop' to stop the timer`);
        timer.start();
        //filters
        const t_ch = m => m.content === 'tcheck';
        const t_st = m => m.content === 'tstop';
        const t_r = m => m.content === 'treset';
        //Collectors
        const chCollector = message.channel.createMessageCollector(t_ch, {time: timer.getDuration()});
        const stCollector = message.channel.createMessageCollector(t_st, {max: 1});
        const rCollector = message.channel.createMessageCollector(t_r, {time: timer.getDuration()});

        chCollector.on('collect', m => {
            message.channel.send(`Timer has ${timer.getRemainingDuration() / 1000} seconds remaining.`);
        });

        stCollector.on('collect', m => {
            if (timer.isStopped()) {
                message.channel.send('Timer is already stopped.');
            } else {
                timer.stop();
                message.channel.send('Timer stopped.');
            }
        });

        rCollector.on('collect', m => {
            timer.clearTimer(); //equal to clearTimeout/clearInterval.
            timer = client.setTimer(message, n); //Reinitialize timer
            message.channel.send(`Timer has been reset back to ${n} seconds.`);
            //Reset Collector timers
            chCollector.resetTimer();
            stCollector.resetTimer();
            rCollector.resetTimer();
            timer.start();
        });

    } else {
        return message.channel.send("Timer creation failed. Try again by running '-timer <seconds>'");
    }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['stopwatch', 'tr', 'sw'],
    permLevel: "User"
};

exports.help = {
    name: "timer",
    category: "Alarmbot",
    description: "timer",
    usage: "timer <duration in seconds>",
    aliases: ['stopwatch', 'tr', 'sw']
};
