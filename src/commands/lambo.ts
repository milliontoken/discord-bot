import { SlashCommand } from 'slash-create';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'lambo',
      description: 'When lambo? (as a millionaire).',
      guildIDs: [process.env.GUILD_ID],
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.send('Here is your lambo: ' +
      '<:lambo_0:867765265420779540>\n' +
      '<:lambo_1:867765267693436971>' +
      '<:lambo_2:867765277515841576>' +
      '<:lambo_3:867765277320413224>');

  }
};
