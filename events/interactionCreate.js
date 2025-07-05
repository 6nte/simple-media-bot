module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Fehler beim Ausführen des Commands!', ephemeral: true });
      }
    } else if (interaction.isButton()) {
      const { handleButton } = require('../interactions/buttonHandler');
      await handleButton(interaction, client);
    } else if (interaction.isStringSelectMenu()) {
      const { handleSelect } = require('../interactions/selectHandler');
      await handleSelect(interaction, client);
    } else if (interaction.isModalSubmit()) {
      const { handleModal } = require('../interactions/modalHandler');
      await handleModal(interaction, client);
    }
  }
};