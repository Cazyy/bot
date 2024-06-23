// commands/team.js
const { MessageEmbed } = require('discord.js');

const positions = {
    'gk': 'GK',
    'lb': 'LB',
    'rb': 'RB',
    'cm': 'CM',
    'lw': 'LW',
    'rw': 'RW'
};

module.exports = {
    name: 'team',
    description: 'Configura la posición en el equipo.',
    execute(message, args) {
        if (args.length !== 1) {
            return message.reply('El comando debe estar seguido de una posición válida.');
        }

        const position = args[0].toLowerCase();

        if (!positions[position]) {
            return message.reply('La posición especificada no es válida.');
        }

        updateEmbed(message, position);
    },
};

function updateEmbed(message, position) {
    const authorName = `**${message.author.username}**`;

    const embed1 = new MessageEmbed()
        .setColor('#3498db')
        .setTitle('⚽ Equipo 1')
        .setDescription(`GK:❔ LB:❔ RB:❔ CM:❔ LW:❔ RW:❔`)
        .setTimestamp()
        .setFooter({ text: 'Pedido por ' + message.author.tag, iconURL: message.author.displayAvatarURL() });

    const embed2 = new MessageEmbed()
        .setColor('#ed4245')
        .setTitle('⚽ Equipo 2')
        .setDescription('GK:❔ LB:❔ RB:❔ CM:❔ LW:❔ RW:❔')
        .setTimestamp()
        .setFooter({ text: 'Pedido por ' + message.author.tag, iconURL: message.author.displayAvatarURL() });

    switch (position) {
        case 'gk':
            embed1.setDescription(`GK:${authorName} LB:❔ RB:❔ CM:❔ LW:❔ RW:❔`);
            break;
        case 'lb':
            embed1.setDescription(`GK:❔ LB:${authorName} RB:❔ CM:❔ LW:❔ RW:❔`);
            break;
        case 'rb':
            embed1.setDescription(`GK:❔ LB:❔ RB:${authorName} CM:❔ LW:❔ RW:❔`);
            break;
        case 'cm':
            embed1.setDescription(`GK:❔ LB:❔ RB:❔ CM:${authorName} LW:❔ RW:❔`);
            break;
        case 'lw':
            embed1.setDescription(`GK:❔ LB:❔ RB:❔ CM:❔ LW:${authorName} RW:❔`);
            break;
        case 'rw':
            embed1.setDescription(`GK:❔ LB:❔ RB:❔ CM:❔ LW:❔ RW:${authorName}`);
            break;
        default:
            break;
    }

    message.channel.send({ embeds: [embed1] });
    message.channel.send({ embeds: [embed2] });
}