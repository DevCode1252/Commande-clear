const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un certain nombre de messages dans le salon')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de messages à supprimer')
                .setRequired(true)),
    async execute(interaction) {
        const { member, channel } = interaction;
        const amount = interaction.options.getInteger('nombre');

        if (amount <= 0 || amount > 95) {
            return interaction.reply('Le nombre de messages à supprimer doit être compris entre 1 et 95.');
        }

        try {
            await channel.bulkDelete(amount + 1);
            interaction.reply(`**${amount}** messages ont été supprimés.`);
        } catch (error) {
            console.error(error);
            interaction.reply('Une erreur s\'est produite lors de la suppression des messages.');
        }
    },
};
