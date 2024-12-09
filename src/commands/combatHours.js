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
         .addNumberOption(option =>
          option.setName('minutes')
            .setDescription('description')
            .setRequired(true))
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
        .addNumberOption(option =>
          option.setName('minutes')
            .setDescription('description')
            .setRequired(true))
    ),
    host: true,
  async execute(interaction) {
    const subcommand = interaction.options.getSubcommand();
    const hours = interaction.options.getNumber('hours');
    const minutes = interaction.options.getNumber('minutes');
    const user = interaction.options.getMentionable('user');
    
    const userInDatabase = await User.findOne({ DiscordId: user.id });
    if (!userInDatabase) {
      return interaction.reply({ content: 'You are not in the database!'});
    }
    if (subcommand === 'add') {
      //the hours and minutes are in floting point, ex: 1.45  is 1 hour and 45 minutes

      // check is the minutes already in the data base + minsutes const are greater then 60
      if (userInDatabase.CombatMinutes + minutes >= 60) {
        userInDatabase.CombatHours += 1;
        userInDatabase.CombatMinutes = userInDatabase.CombatMinutes + minutes - 60;
      } else {
        userInDatabase.CombatMinutes += minutes;
      }



      

    } else if (subcommand === 'remove') {
      userInDatabase.CombatHours -= hours;
    }
    userInDatabase.save();
    return interaction.reply({ content: `Combat hours updated to ${userInDatabase.CombatHours}` });

  }
}