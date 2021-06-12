const Discord = require('discord.js');
require('dotenv').config();

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });

const fs = require('fs');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.once('ready', () => {
    console.log(`[LOG]: ${client.user.tag} SUCCESFULLY CONNECTED AT ${client.readyAt}`);
    client.user.setActivity(`test de cactus`);
});

client.on("error", (e) => console.log(e));
client.on("warn", (e) => console.log(e));
client.on("debug", (e) => console.log(e));

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.DISCORD_TOKEN);