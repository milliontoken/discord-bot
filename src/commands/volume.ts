import { SlashCommand } from 'slash-create';
import * as fetch from 'node-fetch';
import { formatLargeNumber, formatPercentageChange } from '../utils';
import { cache } from '../cache';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'volume',
      description: 'Get 24h volume (as a millionaire).',
      guildIDs: [process.env.GUILD_ID],
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx) {
    const apiUrl = `https://api.nomics.com/v1/currencies/ticker?key=${process.env.NOMICS_API_TOKEN}&ids=MM4`;
    const init = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    const cacheKey = 'volume';

    let commandResponse;

    try {
      if (await cache.has(cacheKey)) {
        commandResponse = await cache.get(cacheKey);
      } else {
        const response = await fetch(apiUrl, init);
        const responseBody = await response.json();
        const dailyData = responseBody[0]['1d'];
        const volume = dailyData.volume;
        const volumeChange = dailyData.volume_change_pct;

        commandResponse = `<:mmstonks:861835426738470953> 24h volume is **$${formatLargeNumber(
          volume,
        )}** (${formatPercentageChange(volumeChange)}%).`;

        await cache.set(cacheKey, commandResponse);
      }
    } catch (error) {
      commandResponse = `Something went wrong - try again a bit later.`;
    }

    await ctx.send(commandResponse);
  }
};
