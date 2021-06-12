require('dotenv').config();
module.exports = {
    name: 'kick',
    description: 'Echa a gente del servidor con una patada en el culo',
    aliases: [],
    execute (client, message, args, Discord){
        if (message.channel.type === 'dm') {
            return message.reply('No se puede ejecutar ese comando en los mensajes privados.');
        }

        if(message.member.hasPermission('KICK_MEMBERS')){
            const member = message.mentions.users.first();
            if(member){
                const memberTarget = message.guild.members.cache.get(member.id);
                memberTarget.kick();
                message.channel.send(`El usuario **${member.tag}** ha sido expulsado.`)
            } else {
                message.reply("No se ha podido expulsar a ese miembro.");
            }
        } else {
            message.reply("Tu no puedes hacer eso!");
        }
    }
}