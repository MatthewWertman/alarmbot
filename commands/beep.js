exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.channel.send('Please connect to a voice channel.');
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play('./sfx/beep.mp3');
    dispatcher.on('finish', () => {
        console.log('Finished playing'); // notifies that stream is done
        dispatcher.destroy(); // destroys stream
        connection.disconnect() // disconnect
    });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: 'beep',
  category: "Miscellaneous",
  description: "Testing playing local files",
  usage: 'beep',
  aliases: []
};
