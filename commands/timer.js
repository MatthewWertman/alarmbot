exports.run = async (client, message, args) => {
    if (!args[0] && args.length === 0) return message.channel.send(`Please enter an valid duration in seconds. USAGE: ${exports.help.usage}`);
    if (args.length > 1) return message.channel.send(`Too many agruments! USAGE: ${exports.help.usage}`);
    let n = Number(args[0]);
    let timer = await client.setTimer(message, n);
    if (timer) {
        message.channel.send(`Started timer for ${n} seconds... type 'tstop' to stop the timer`);
        timer.start();
        //filters
        const t_ch = m => m.content === 'tcheck';
        const t_st = m => m.content === 'tstop';
        const t_res = m => m.content === 'tresume';
        const t_r = m => m.content === 'treset';
        const t_clr = m => m.content === 'tclear';

        //Collectors
        const chCollector = message.channel.createMessageCollector(t_ch, {time: timer.getDuration()});
        const stCollector = message.channel.createMessageCollector(t_st);
        const resCollector = message.channel.createMessageCollector(t_res);
        const rCollector = message.channel.createMessageCollector(t_r);
        const clrCollector = message.channel.createMessageCollector(t_clr, {max: 1});

        // Collection events
        //tcheck
        chCollector.on('collect', m => {
            message.channel.send(`Timer has ${timer.getRemainingDuration() / 1000} seconds remaining.`);
        });

        //tstop
        stCollector.on('collect', m => {
            if (timer.isStopped()) {
                message.channel.send('Timer is already stopped.');
            } else {
                timer.stop();
                message.channel.send('Timer stopped.');
            }
        });

        //tresume
        resCollector.on('collect', m => {
            if (timer.isStopped()) {
                timer.clearTimer();
                timer.duration(timer.getRemainingDuration());
                timer.start();
            } else {
                message.channel.send("Timer has not been stopped. Use 'tstop' to stop timer.");
            }
        });

        //treset
        rCollector.on('collect', m => {
            timer.clearTimer(); //equal to clearTimeout/clearInterval.
            timer = client.setTimer(message, n); //Reinitialize timer
            message.channel.send(`Timer has been reset back to ${n} seconds.`);
            chCollector.resetTimer();
            timer.start();
        });

        //tclear
        clrCollector.on('collect', m => {
            timer.clearTimer();
            chCollector.stop();
            stCollector.stop();
            rCollector.stop();
            message.channel.send('Timer has been destroyed.');
        });

    } else {
        return message.channel.send("Timer creation failed. Try again by running '-timer <seconds>'");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['tr'],
    permLevel: "User"
};

exports.help = {
    name: "timer",
    category: "Alarmbot",
    description: "timer",
    usage: "timer <duration in seconds>",
    aliases: ['tr']
};
