exports.run = async (client, message) => {
    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();
    } else {
        message.reply('You need to be in a voice channel first.');
    }
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: 'join',
    category: "Voice",
    description: "Joins the bot to connected voice channel.",
    usage: 'join',
    aliases: []
};
