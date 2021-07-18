import { SlashCommand } from 'slash-create';

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'hello',
      description: 'Says hello to you.',
      guildIDs: [process.env.GUILD_ID],
      defaultPermission: true
    });

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx) {
    return ctx.send('hello');
  }
};
