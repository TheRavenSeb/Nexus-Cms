const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('a help command'),
  async execute(interaction) {
    
    const embed = new EmbedBuilder()
        .setTitle('Help')
        .setDescription('Here is a list of commands')
        .setColor('#0099ff')
        .setTimestamp()
        .setFields(
            { name: 'Account', value: 'Check your account information' },
            { name: 'After Action Report', value: 'Create an after action report' },
            { name: 'Dev User Refresh', value: 'Refresh the user data in the database' },
            { name: 'Combat Hours', value: 'Add or remove combat hours' }
        )
        
    interaction.reply({ embeds: [embed] });

  }
}