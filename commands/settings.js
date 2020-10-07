const {MessageEmbed} = require('discord.js');
const fs = require('fs');
const config = require('../config.js');
var configFile = fs.readFileSync('./config.js', 'utf-8');

exports.run = async (client, message, args) => {
    const configEmbed = new MessageEmbed()
        .setTitle('Current Settings')
        .setColor('#d64027')
        .setDescription('There are the current settings for Alarmbot.')
        .addField('Prefix', config.prefix)
        .addField('OwnerID', config.ownerID)
        .addField('GuildID', config.guildID)
        .addField('SystemNotice', config.defaultSettings.systemNotice)

    message.channel.send(configEmbed);
    var configEmbedJSON = configEmbed.toJSON();
    var times = 0;
    var numOfChanges = Number(args[0]);
    let newValue;

    if (args.length > 1) {
        return message.channel.send(`Too many agruments! USAGE: ${exports.help.usage}`);
    } else if (!args[0] && args.length === 0) {
        numOfChanges = 1;
    }
    while (times < numOfChanges) {
        const setting = await client.awaitReply(message, "What setting do you want to change?");
        for (var i = 0; i < configEmbedJSON.fields.length; i++) {
            if (setting === configEmbedJSON.fields[i].name || setting === configEmbedJSON.fields[i].name.toLowerCase()) {
                var value = await client.awaitReply(message, `What value should ${setting} be? NOTE: AlarmBot will restart afterwards`);
                if (value === false) {
                    const retry = await client.awaitReply(message, 'It seems that something went wrong or you took too long to respond. Do you want to retry? (y/n)');
                    if (retry === 'y') {
                        value = await client.awaitReply(message, `What value should ${setting} be?`);
                        newValue = configFile.replace(new RegExp(`"${configEmbedJSON.fields[i].value}"`), `"${value}"`)
                        fs.writeFileSync('./config.js', newValue);
                        console.log('Updated config file');
                    } else {
                        return message.channel.send(`Alright. ${setting} set back to default.`);
                    }
                } else {
                    newValue = configFile.replace(new RegExp(`"${configEmbedJSON.fields[i].value}"`), `"${value}"`)
                    fs.writeFileSync('./config.js', newValue);
                    console.log('Updated config file');
                }
            }
        }
        times++;
    }
    client.commands.forEach(async cmd => {
        await client.unloadCommand(cmd);
    });
    process.exit(1);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['set', 'config'],
    permLevel: "Server Owner"
};

exports.help = {
    name: 'settings',
    category: "Administrator",
    description: "Shows the default settings and allows you to change them.",
    usage: 'settings [numberOfChanges]',
    aliases: ['set', 'config']
};
