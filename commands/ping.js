exports.run = (client, message) => {
    message.channel.send('Ping?')
        .then(msg => {
            msg.edit(`Pong! ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
        });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: 'ping',
    category: "Miscellaneous",
    description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
    usage: 'ping',
    aliases: []
};
