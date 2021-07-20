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

    const apiUrl = `https://api.ethplorer.io/getAddressInfo/0x6b4c7a5e3f0b99fcd83e9c089bddd6c7fce5c611?apiKey=freekey`;
    const init = {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    };
    const response = await fetch(apiUrl, init);
    const responseBody = await response.json();
    await ctx.send(`<:pepeholdmm:861835461458657331> Current holders count is **${responseBody.tokenInfo.holdersCount}**.`);

  }
};
