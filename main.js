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

client.on('guildMemberAdd', guildMember => { // doesnt work
    const welcomeChannel = process.env.WELCOME_CHANNEL;
    let userRole = process.env.USER_ROLE
    let rulesChannel = process.env.RULES_CHANNEL;

    try {
        guildMember.roles.add(userRole);
        guildMember.guild.channels.cache.get(welcomeChannel).send(`Bienvenido <@${guildMember.user.id}> al servidor. Leete las <#${rulesChannel}>`);    
    } catch (err){
        console.log(err);
    }
});

client.on("error", (e) => console.log(e));
client.on("warn", (e) => console.log(e));
client.on("debug", (e) => console.log(e));

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.DISCORD_TOKEN);