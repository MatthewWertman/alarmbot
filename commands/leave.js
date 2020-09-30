exports.run = async (client, message, args, level) => {
    if (!message.member.voice.channel) return message.channel.send('Please connect to a voice channel.');
    if (!message.guild.me.voice.channel) return message.channel.send('the bot is not connected to the guild.');
    if (message.guild.me.voice.channelID !== message.member.voice.channelID) return message.channel.send('You are not connected to the same channel.');
    message.guild.me.voice.channel.leave();
    message.channel.send('Leaving channel...');
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Bot Owner"
};

exports.help = {
    name: 'leave',
    category: "Miscellaneous",
    description: "Disconnects the bot",
    usage: 'leave',
    aliases: []
};
