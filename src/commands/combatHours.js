const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const User = require('../schemas/User');
const { host } = require('./ARR');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('combat-hours')
    .setDescription('description')
    .addSubcommand(subcommand =>
      subcommand
        .setName('add')
        .setDescription('description').addMentionableOption(option =>
            option.setName('user')
            .setDescription('description')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('hours')
            .setDescription('description')
            .setRequired(true)
        )
    ).addSubcommand(subcommand =>
        subcommand
        .setName('remove')
        .setDescription('description').addMentionableOption(option => 
            option.setName('user')
            .setDescription('description')
            .setRequired(true)
        )
        .addNumberOption(option =>
          option.setName('hours')
            .setDescription('description')
            .setRequired(true)
        )
    ),
    host: true,
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const hours = interaction.options.getNumber('hours');
    const user = interaction.options.getMentionable('user');
    
    const userInDatabase = await User.findOne({ DiscordId: user.id });
    if (!userInDatabase) {
      return interaction.reply({ content: 'You are not in the database!'});
    }
    if (subcommand === 'add') {
      userInDatabase.CombatHours += hours;
    } else if (subcommand === 'remove') {
      userInDatabase.CombatHours -= hours;
    }
    userInDatabase.save();
    return interaction.reply({ content: `Combat hours updated to ${userInDatabase.CombatHours}` });

  }
}