const config = require('../config.js');
const moment = require("moment");
require("moment-duration-format");

exports.run = (client, message) => {
    message.channel.send(moment().format('MMMM Do YYYY, h:mm:ss a'));
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['clock', 't'],
    permLevel: "User"
};

exports.help = {
    name: "time",
    category: "Miscelaneous",
    description: "Gives the time",
    usage: "time",
    aliases: ['clock', 't']
};
