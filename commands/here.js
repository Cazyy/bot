
const cooldowns = new Map();

module.exports = {
    name: 'here',
    description: 'Menciona @here en el canal actual',
    execute(message) {
        if (cooldowns.has(message.author.id)) {
            const cooldownEnd = cooldowns.get(message.author.id);
            const remainingTime = cooldownEnd - Date.now();

            const minutes = Math.ceil(remainingTime / (1000 * 60));

            if (remainingTime > 0) {
                return message.reply(`Debes esperar ${minutes} minutos antes de usar este comando de nuevo.`);
            }
        }

        const cooldownTime = 5 * 60 * 1000;
        const cooldownEnd = Date.now() + cooldownTime;
        cooldowns.set(message.author.id, cooldownEnd);

        message.channel.send('@here');
    },
};