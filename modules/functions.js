const moment = require('moment');
require("moment-duration-format");
require('moment-timer');
const log = message => {console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`)};
const config = require('../config.js');
const fs = require('fs');

module.exports = (client) => {
    client.permlevel = message => {
        let permlvl = 0;

        const permOrder = client.config.permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

        while (permOrder.length) {
            const currentLevel = permOrder.shift();
            if (message.guild && currentLevel.guildOnly) continue;
            if (currentLevel.check(message)) {
                permlvl = currentLevel.level;
                break;
            }
        }
        return permlvl;
    };

    client.awaitReply = async (msg, question, limit = 60000) => {
        const filter = m => m.author.id === msg.author.id;
        await msg.channel.send(question);
        try {
            const collected = await msg.channel.awaitMessages(filter, {
                max: 1,
                time: limit,
                errors: ["time"]
            });
            return collected.first().content;
        } catch (e) {
            return false;
        }
    };

    client.clean = async (client, text) => {
        if (text && text.constructor.name == "Promise")
            text = await text;
        if (typeof evaled !== "string")
            text = require("util").inspect(text, {
                depth: 1
            });

        text = text
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
            .replace(client.config.token, "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0");

        return text;
    };

    client.reload = command => {
        return new Promise((resolve, reject) => {
            try {
                delete require.cache[require.resolve(`../commands/${command}`)];
                let cmd = require(`../commands/${command}`);
                client.commands.delete(command);
                client.aliases.forEach((cmd, alias) => {
                    if (cmd === command) client.aliases.delete(alias);
                });
                client.commands.set(command, cmd);
                cmd.conf.aliases.forEach(alias => {
                    client.aliases.set(alias, cmd.help.name);
                });
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    };

    client.unloadCommand = async (commandName) => {
        let command;
        if (client.commands.has(commandName)) {
            command = client.commands.get(commandName);
        } else if (client.aliases.has(commandName)) {
            command = client.commands.get(client.aliases.get(commandName));
        }
        if (!command) return `The command \`${commandName}\` doesn"t seem to exist, nor is it an alias. Try again!`;

        if (command.shutdown) {
            await command.shutdown(client);
        }
        const mod = require.cache[require.resolve(`../commands/${commandName}`)];
        delete require.cache[require.resolve(`../commands/${commandName}.js`)];
        for (let i = 0; i < mod.parent.children.length; i++) {
            if (mod.parent.children[i] === mod) {
                mod.parent.children.splice(i, 1);
                break;
            }
        }
        return false;
    };

    Object.defineProperty(Array.prototype, "random", {
        value: function() {
            return this[Math.floor(Math.random() * this.length)];
        }
    });

    client.wait = require("util").promisify(setTimeout);

    client.setTimer = (msg, n) => {
        if (!Number.isSafeInteger(n) || isNaN(n)) return false;
        let t = new moment.duration(n, "seconds").timer(() => {
            msg.reply('Timer has expired!');
        });
        return t;
    };

    // These 2 process methods will catch exceptions and give *more details* about the error and stack trace.
    process.on("uncaughtException", (err) => {
        const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
        log(`Uncaught Exception: ${errorMsg}`);
        // Always best practice to let the code crash on uncaught exceptions.
        // Because you should be catching them anyway.
        process.exit(1);
    });

    process.on("unhandledRejection", err => {
        log(`Unhandled rejection: ${err}`);
    });
};
