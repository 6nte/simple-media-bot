const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require('discord.js');

module.exports = async function createMediaChannel(guild, user, username, platform, config) {
  try {
    const channel = await guild.channels.create({
      name: `media-${username.replace(/[^a-zA-Z0-9]/g, '')}`,
      type: 0,  
      parent: config.kategory,
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: user.id,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        },
        {
          id: config.adminrole,
          allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages]
        }
      ]
    });

    const embed = new EmbedBuilder()
      .setColor('ffffff')
      .setTitle(`Media Team Bewerbung`)
      .setDescription(`Hallo <@${user.id}>, willkommen in deinem Media Team Bewerbungs Kanal! \n\nHier kannst du deine Bewerbung für das Media Team einreichen.\n\n**Plattform:** ${platform}\n**Username:** ${username}\n\nBitte beachte, dass du hier nur Inhalte posten solltest, die für das Media Team relevant sind. Bei Fragen wende dich an die Admins.`)
    if (config.embedThumbnail) embed.setThumbnail(config.embedThumbnail);
    if (config.embedImage) embed.setImage(config.embedImage);

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId(`bewerbung_accept:${user.id}:${platform}:${username}`)
        .setLabel('Annehmen')
        .setEmoji('<:check:1391185952403099756>')
        .setStyle(ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId(`bewerbung_decline:${user.id}:${platform}:${username}`)
        .setLabel('Ablehnen')
        .setEmoji('<:sperre:1391185953984479333')
        .setStyle(ButtonStyle.Danger)
    );

    await channel.send({ content: `<@${user.id}>`, embeds: [embed], components: [buttons] });
    return channel;
  } catch (err) {
    console.error(err);
    return null;
  }
};