const { sendOrUpdateBewerbungsEmbed } = require('../interactions/buttonHandler');
const config = require('../config.json');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`Bot online als ${client.user.tag}!`);
    try {
      const channel = await client.channels.fetch(config.embedchannel);
      if (channel) {
        await sendOrUpdateBewerbungsEmbed(channel);
      }
    } catch (err) {
      console.error('embed channel wurde nicht gefunden', err);
    }
  }
};