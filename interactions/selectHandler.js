const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

async function handleSelect(interaction, client) {
  if (interaction.customId === 'platform_select') {
    const platform = interaction.values[0]; 
    const modal = new ModalBuilder()
      .setCustomId(`username_modal_${platform}`)
      .setTitle('Username')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('username_input')
            .setLabel('Username (z.B. @entezx)')
            .setStyle(TextInputStyle.Short)
            .setRequired(true)
        )
      );
    await interaction.showModal(modal);
  }
}

module.exports = {
  handleSelect
};