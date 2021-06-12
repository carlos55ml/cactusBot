require('dotenv').config();
module.exports = {
    name: 'purge',
    description: 'Borra mensajes del chat.',
    aliases: ['clear'],
    async execute (client, message, args, Discord){
        if (message.channel.type === 'dm') {
            return message.reply('No se puede ejecutar ese comando en los mensajes privados.');
        }

        if(message.member.hasPermission('MANAGE_MESSAGES')){
            if(!args[0]) return message.reply("Especifica la cantidad de mensajes que quieres borrar.");
            if(isNaN(args[0])) return message.reply("El argumento tiene que ser un numero real.");

            if(args[0] >= 101) return message.reply("No puedes borrar tantos mensajes de una vez.");
            if(args[0] < 1) return message.reply("El numero tiene que ser mayor que 0.");

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages);
            });
        } else {
            message.reply("Tu no tienes permisos para hacer eso.");
        }

    }
}