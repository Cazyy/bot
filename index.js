const {Client, Collection, Events, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, SlashCommandBuilder} = require("discord.js");
const fs = require("fs")
const { token, prefix } = require('./data/config.json');
const client = new Client({
    intents: 65315
});

client.on(Events.ClientReady, async () => {
    console.log('conectado')
});

// Comandos

client.commands = new Collection()

const commandFiles = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"))

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', async message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Hubo un error al ejecutar el comando.');
    }
});
////////////////////////////////////////////////////////////////

///embed///////////////////////////////////////////////////////

client.on(Events.MessageCreate, async (message) => {
    if(message.content === "holi"){

        const embed = new EmbedBuilder()
        .setColor(0x3498db)
        .setTitle('⚽ Equipo 1')
        .setDescription('GK:❔ LB:❔ RB:❔ CM:❔ LW:❔ RW:❔')
        .setTimestamp()
        .setFooter({ text: 'Pedido por ' + message.author.tag, iconURL: message.author.displayAvatarURL()});

        const unsignearboton = new ButtonBuilder()
        .setCustomId('unsign')
        .setLabel('❌Unsign')
        .setStyle(ButtonStyle.Danger);

        const signearboton = new ButtonBuilder()
            .setCustomId('sign')
            .setLabel('✔️Sign')
            .setStyle(ButtonStyle.Success);

        const row = new ActionRowBuilder()
            .addComponents(signearboton, unsignearboton);

        const embed2 = new EmbedBuilder()
        .setColor(0xed4245)
        .setTitle('⚽ Equipo 2')
        .setDescription('GK:❔ LB:❔ RB:❔ CM:❔ LW:❔ RW:❔')
        .setTimestamp()
        .setFooter({ text: 'Pedido por ' + message.author.tag, iconURL: message.author.displayAvatarURL()});

        await message.channel.send({ embeds: [embed], components: [row] });
        await message.channel.send({ embeds: [embed2], components: [row] });
    }
});

/////////////////////////////

client.login(token);