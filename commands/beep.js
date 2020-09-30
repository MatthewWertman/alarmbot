exports.run = async (client, message) => {
    if (!message.member.voice.channel) return message.channel.send('Please connect to a voice channel.');
    const connection = await message.member.voice.channel.join();
    const dispatcher = connection.play('./sfx/beep.mp3');
    dispatcher.on('finish', () => {
        console.log('Finished playing'); //Notifies that stream is done
        dispatcher.destroy(); //Destroys stream
        connection.disconnect() //disconnect
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
