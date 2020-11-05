if (Number(process.version.slice(1).split(".")[0]) < 12) throw new Error("Node 12.0.0 or higher is required. Update Node on your system.");

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
client.config = require("./config.js");
require("./modules/functions.js")(client);
const log = message => {
    console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

const init = async () => {
    //Commands
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    fs.readdir("./commands/", (err, files) => {
        if (err) console.error(err);
        log(`Loading a total of ${files.length} commands.`);
        files.forEach(f => {
            const props = require(`./commands/${f}`);
            client.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
        });
    });
    //Events
    fs.readdir("./events/", (err, evtFiles) => {
        if (err) console.error(err);
        log(`Loading a total of ${evtFiles.length} events.`);
        evtFiles.forEach(file => {
            const eventName = file.split(".")[0];
            const event = require(`./events/${file}`);
            client.on(eventName, event.bind(null, client));
        });
    });
    //Level Cache
    client.levelCache = {};
    for (let i = 0; i < client.config.permLevels.length; i++) {
        const thisLevel = client.config.permLevels[i];
        client.levelCache[thisLevel.name] = thisLevel.level;
    }

    client.on("warn", console.warn);
    client.on("error", console.error);

    client.login(client.config.token);
};

init();
