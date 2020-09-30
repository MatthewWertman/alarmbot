exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!args[0] && args.length === 0) return message.channel.send(`Please input code. USAGE: ${exports.help.usage}`);
    const code = args.join(" ");
    try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);
        message.channel.send(`\`\`\`js\n${clean}\n\`\`\``);
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['exec', 'ex', 'ev'],
    permLevel: "Bot Owner"
};

exports.help = {
    name: "eval",
    category: "Administrator",
    description: "Evaluates arbitrary javascript. Caution: Kinda broken",
    usage: "eval <code>",
    aliases: ['exec', 'ex', 'ev']
};
