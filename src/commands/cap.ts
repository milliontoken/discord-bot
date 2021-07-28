import { SlashCommand } from 'slash-create';
import * as fetch from 'node-fetch';
import { formatLargeNumber } from '../utils';
import { cache } from '../cache';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'cap',
      description: 'Get current cap (as a millionaire).',
      guildIDs: [process.env.GUILD_ID],
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx) {
    const apiUrl =
      'https://api.coingecko.com/api/v3/coins/million?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false';
    const init = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    const cacheKey = 'cap';

    let commandResponse;

    try {
      if (cache.has(cacheKey)) {
        commandResponse = cache.get(cacheKey);
      } else {
        const response = await fetch(apiUrl, init);
        const responseBody = await response.json();
        const marketCapUsd = responseBody.market_data.market_cap.usd;

        commandResponse = `:billed_cap: Market cap is **$${formatLargeNumber(
          marketCapUsd,
        )}**.`;

        cache.set(cacheKey, commandResponse);
      }
    } catch {
      commandResponse = `Something is wrong - try again a bit later.`;
    }

    await ctx.send(commandResponse);
  }
};
