import {
  CommandContext,
  SlashCommand,
  SlashCreator,
  MessageEmbedOptions,
} from 'slash-create';
import * as fetch from 'node-fetch';

module.exports = class GasCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    super(creator, {
      name: 'gas',
      description: 'Gets current gas prices',
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

    try {
      const response = await fetch(apiUrl, init);
      const responseBody: EthGasResponseBody = await response.json();
      console.log(responseBody);

      const {
        result: { SafeGasPrice, FastGasPrice, ProposeGasPrice },
      } = responseBody;

      const embed: MessageEmbedOptions = {
        title: ':fuelpump: Current gas prices:',
        color: 15509760,
        fields: [
          { name: 'Low', value: SafeGasPrice, inline: true },
          { name: 'Average', value: ProposeGasPrice, inline: true },
          { name: 'High', value: FastGasPrice, inline: true },
        ],
        footer: {
          text: 'Gas prices provided by etherscan.io',
        },
        timestamp: new Date(),
      };

      return await ctx.send({ embeds: [embed] });
    } catch {
      return await ctx.send(`Something is wrong - try again a bit later.`);
    }
  }
};

interface EthGasResponseBody {
  result: {
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
  };
}
