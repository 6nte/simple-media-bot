const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const createMediaChannel = require('../utils/createMediaChannel');

async function handleModal(interaction, client) {
  const config = require('../config.json');
  if (interaction.customId.startsWith('username_modal_')) {
    const platform = interaction.customId.split('_').pop();
    const username = interaction.fields.getTextInputValue('username_input');
    const user = interaction.user;

    const channel = await createMediaChannel(interaction.guild, user, username, platform, config);
    if (!channel) {
      await interaction.reply({ content: 'Fehler beim Erstellen des Kanals!', ephemeral: true });
      return;
    }

    const logChannel = await client.channels.fetch(config.logchannel);
    if (logChannel) {
      await logChannel.send({
        content: `Neue Bewerbung von ${user.tag} (${user.id}) für ${platform} (${username})`
      });
    }

    await interaction.reply({
      content: `Dein Bewerbungskanal wurde erstellt: ${channel}`,
      ephemeral: true
    });
  }

  if (interaction.customId.startsWith('decline_modal:')) {
    const parts = interaction.customId.split(':');
    const userId = parts[1];
    const platform = parts[2];
    const username = parts.slice(3).join(':');
    const reason = interaction.fields.getTextInputValue('reason') || '/';
    const targetUser = await interaction.guild.members.fetch(userId);
    const config = require('../config.json');
    const embed = new EmbedBuilder()
      .setColor('Red')
      .setTitle('Bewerbung abgelehnt')
      .setDescription(`Hallo <@${userId}>, deine Bewerbung auf ${interaction.guild.name} wurde **abgelehnt**.\nGrund: ${reason}`);
    if (config.embedThumbnail) embed.setThumbnail(config.embedThumbnail);
    if (config.embedImage) embed.setImage(config.embedImage);

    await interaction.reply({ content: 'Bewerbung abgelehnt! Der Kanal wird in 5 Sekunden geschlossen.', ephemeral: true });

    await targetUser.send({ embeds: [embed] });

    const logChannel = await client.channels.fetch(config.logchannel);
    if (logChannel) {
      await logChannel.send({ content: `Bewerbung von <@${userId}> wurde **abgelehnt**. Grund: ${reason}` });
    }
    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 5000);
  }
}

async function handleAdminButtons(interaction, client) {
  const config = require('../config.json');
  const adminRoleId = config.adminrole;
  const member = await interaction.guild.members.fetch(interaction.user.id);

  if (!member.roles.cache.has(adminRoleId)) {
    await interaction.reply({ content: 'Nur Admins dürfen diese Buttons benutzen!', ephemeral: true });
    return;
  }

  const customId = interaction.customId;
  if (customId.startsWith('bewerbung_accept:')) {
    const parts = customId.split(':');
    const userId = parts[1];
    const platform = parts[2];
    const username = parts.slice(3).join(':');
    const targetUser = await interaction.guild.members.fetch(userId);
    const embed = new EmbedBuilder()
      .setColor('Green')
      .setTitle('Bewerbung angenommen!')
      .setDescription(`Hallo <@${userId}>, deine Bewerbung auf ${interaction.guild.name} wurde **angenommen**.\nDu darfst jetzt in den Channel Werbung machen.`);
    if (config.embedThumbnail) embed.setThumbnail(config.embedThumbnail);
    if (config.embedImage) embed.setImage(config.embedImage);

    await targetUser.roles.add(config.mediarole);
    await interaction.reply({ content: 'Bewerbung angenommen & Rolle vergeben! Der Kanal wird in 5 Sekunden geschlossen.', ephemeral: true });

    await targetUser.send({ embeds: [embed] });

    const logChannel = await client.channels.fetch(config.logchannel);
    if (logChannel) {
      await logChannel.send({ content: `Bewerbung von <@${userId}> wurde **angenommen**.` });
    }
    setTimeout(() => {
      interaction.channel.delete().catch(() => {});
    }, 5000);
  } else if (customId.startsWith('bewerbung_decline:')) {
    const parts = customId.split(':');
    const userId = parts[1];
    const platform = parts[2];
    const username = parts.slice(3).join(':');

    const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
    const modal = new ModalBuilder()
      .setCustomId(`decline_modal:${userId}:${platform}:${username}`)
      .setTitle('Ablehnungsgrund')
      .addComponents(
        new ActionRowBuilder().addComponents(
          new TextInputBuilder()
            .setCustomId('reason')
            .setLabel('Grund (optional)')
            .setRequired(false)
            .setStyle(TextInputStyle.Paragraph)
        )
      );
    await interaction.showModal(modal);
  }
}

module.exports = {
  handleModal,
  handleAdminButtons
};