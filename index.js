const Discord = require('discord.js');
const client = new Discord.Client();
client.config = require("./config.js");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(client.config.token);
