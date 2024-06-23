const { MessageEmbed } = require('discord.js');

let equipo = {
    GK: '❔',
    LB: '❔',
    RB: '❔',
    CM: '❔',
    LW: '❔',
    RW: '❔'
};

module.exports = {
    name: 'equipo',
    description: 'Comandos para actualizar las posiciones del equipo.',
    execute(message, args) {
        const command = args[0];
        
        switch (command) {
            case 'gk':
                actualizarPosicionEquipo(message, 'GK');
                break;
            case 'lb':
                actualizarPosicionEquipo(message, 'LB');
                break;
            case 'rb':
                actualizarPosicionEquipo(message, 'RB');
                break;
            case 'cm':
                actualizarPosicionEquipo(message, 'CM');
                break;
            case 'lw':
                actualizarPosicionEquipo(message, 'LW');
                break;
            case 'rw':
                actualizarPosicionEquipo(message, 'RW');
                break;
            default:
                message.channel.send('Comando no reconocido.');
                break;
        }
    },
};

function actualizarPosicionEquipo(message, posicion) {
    equipo[posicion] = message.author.username;

    const embed = new MessageEmbed()
        .setColor('#3498db')
        .setTitle('⚽ Team List')
        .setDescription(`GK: ${equipo.GK} LB: ${equipo.LB} RB: ${equipo.RB} CM: ${equipo.CM} LW: ${equipo.LW} RW: ${equipo.RW}`)
        .setTimestamp()
        .setFooter(`Pedido por ${message.author.tag}`, message.author.displayAvatarURL());

    message.channel.send({ embeds: [embed] });
}