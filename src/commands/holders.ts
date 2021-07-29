import { SlashCommand } from 'slash-create';
import * as fetch from 'node-fetch';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'holders',
      description: 'Get holder count (as a millionaire).',
      guildIDs: [process.env.GUILD_ID],
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx) {
    const ethExplorerUrl = `https://api.ethplorer.io/getAddressInfo/0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611?apiKey=freekey`;
    const covalentUrl = `https://api.covalenthq.com/v1/56/tokens/0xBF05279F9Bf1CE69bBFEd670813b7e431142Afa4/token_holders/?key=${process.env.COVALENT_API_KEY}&page-size=1`;
    const init = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };

    try {
      const [ethExplorerResp, covalentResp]: Response[] = await Promise.all([
        fetch(ethExplorerUrl, init),
        fetch(covalentUrl, init),
      ]);

      const [ethExplorerBody, covalentBody] = await Promise.all([
        ethExplorerResp.json(),
        covalentResp.json(),
      ]);

      const numFormatter = new Intl.NumberFormat('en-US');

      const holders = numFormatter.format(
        ethExplorerBody.tokenInfo.holdersCount +
          covalentBody.data.pagination.total_count,
      );

      await ctx.send(
        `<:pepeholdmm:861835461458657331> Current holders count is **${holders}**.`,
      );
    } catch (error) {
      console.log(error);
      await ctx.send(`Something went wrong - try again a bit later.`);
    }
  }
};
