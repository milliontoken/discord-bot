import { CommandContext, SlashCommand, SlashCreator } from 'slash-create';
import * as fetch from 'node-fetch';

module.exports = class GweiCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'gwei',
      description: 'Gets current gwei prices',
      guildIDs: [process.env.GUILD_ID],
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx: CommandContext) {
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETH_GAS_KEY}`;
    const init = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };

    let commandResponse: string;

    try {
      const response = await fetch(apiUrl, init);
      const responseBody: EthGasResponseBody = await response.json();
      console.log(responseBody);

      const {
        result: { SafeGasPrice, FastGasPrice, ProposeGasPrice },
      } = responseBody;

      commandResponse =
        `:fuelpump: Current gwei prices:\n\n` +
        `Low - **${SafeGasPrice}**\n` +
        `Avg - **${ProposeGasPrice}**\n` +
        `High - **${FastGasPrice}**\n`;
    } catch {
      commandResponse = `Something is wrong - try again a bit later.`;
    }

    await ctx.send(commandResponse);
  }
};

interface EthGasResponseBody {
  result: {
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
  };
}
