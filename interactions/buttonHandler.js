const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../config.json');

function BewerbungsEmbed() {
  const embed = new EmbedBuilder()
    .setColor('ffffff')
    .setTitle('<:info:1391183209286340660> Wir suchen dich als Content Creator! ')
    .setDescription('Du liebst es, kreative Inhalte zu erstellen, hast ein Gespür für Trends und möchtest deine Leidenschaft in ein wachsendes Projekt einbringen? Dann bewirb dich jetzt als Content Creator bei uns!\n \n **Was wir suchen:** \n - Wir suchen motivierte und kreative Köpfe, die mit uns gemeinsam Inhalte produzieren – ob für Social Media, YouTube, TikTok oder andere Plattformen. Du solltest Spaß daran haben, Content zu planen, aufzunehmen und zu veröffentlichen.\n \n **Voraussetzungen:**\n - Erfahrung im Bereich Content Creation (auch Hobby-Erfahrung zählt!) \n - Gute Kenntnisse in Bild- und/oder Videobearbeitung (z. B. mit Canva, Photoshop, Premiere Pro, CapCut o. ä.) \n - Sicherer Umgang mit Social Media Plattformen wie TikTok, Instagram, YouTube oder Twitch ß\n - Optional: Eigene Reichweite oder bestehende Community von Vorteil \n\n **Was dich erwartet:** \n - Ein motiviertes Team mit kreativen Ideen \n - Raum für deine eigenen Konzepte und Formate \n Unterstützung bei der Umsetzung (z. B. Grafik, Schnitt, Ideenentwicklung) \n - Möglichkeiten zur Weiterentwicklung\n \n > **Interessiert:** \n Dann Klicke unten auf den Button.');
  if (config.embedThumbnail) embed.setThumbnail(config.embedThumbnail);
  if (config.embedImage) embed.setImage(config.embedImage);
  return embed;
}

function BewerbenButton() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('bewerben')
      .setLabel('Bewerben')
      .setStyle(ButtonStyle.Primary)
  );
}

async function sendOrUpdateBewerbungsEmbed(channel) {
  const embedToSend = BewerbungsEmbed();
  const buttonRow = BewerbenButton();
  const messages = await channel.messages.fetch({ limit: 10 }); 
  const found = messages.find(msg =>
    msg.author.id === channel.client.user.id &&
    msg.embeds.length > 0 &&
    msg.embeds[0].title === embedToSend.data.title
  );

  if (found) {
    const currentEmbed = found.embeds[0];
    if (
      currentEmbed.description !== embedToSend.data.description ||
      currentEmbed.thumbnail?.url !== embedToSend.data.thumbnail?.url ||
      currentEmbed.image?.url !== embedToSend.data.image?.url
    ) {
      await found.edit({ embeds: [embedToSend], components: [buttonRow] });
    }
  } else {
    await channel.send({ embeds: [embedToSend], components: [buttonRow] });
  }
}

async function handleButton(interaction, client) {
  if (interaction.customId === 'bewerben') {
    const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
    const select = new StringSelectMenuBuilder()
      .setCustomId('platform_select')
      .setPlaceholder('Wähle eine Plattform...')
      .addOptions([
        { label: 'Tiktok', value: 'tiktok', emoji: '<:tiktok:1391185439779717291>' },
        { label: 'Twitch', value: 'twitch', emoji: '<:twitch:1391185613956583464>' }
      ]);
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setColor('ffffff')
          .setDescription('Wo möchtest du Videos hochladen?')
      ],
      components: [new ActionRowBuilder().addComponents(select)],
      flags: 64 
    });
  }

  if (interaction.customId.startsWith('bewerbung_accept:') || interaction.customId.startsWith('bewerbung_decline:')) {
    const { handleAdminButtons } = require('./modalHandler');
    await handleAdminButtons(interaction, client);
  }
}

module.exports = {
  BewerbungsEmbed,
  BewerbenButton,
  handleButton,
  sendOrUpdateBewerbungsEmbed
};