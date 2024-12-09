const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const User = require('../schemas/User');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('dev-user-refesh')
    .setDescription('refreshed the userdata populating the database'),
    DevOnly: true,
  async execute(interaction) {
    //get all users in the guild that are not bots
    
    const users = await interaction.guild.members.fetch()
   

    //iterate over the users
    users.forEach(async user => {
      //check if the user is already in the database
      const userInDatabase = await User.findOne({ DiscordId: user.id });
        //if the user is not in the database, create a new user
        if (!userInDatabase) {
          User.create({
            Name: user.user.username,
            DiscordId: user.id,
            Rank: "Recruit",
            Mos: "None",
            JoinDate: new Date(),
            CombatHours: 0,
            IsInstructor: false,
            IsEnlisted: true,
            IsOfficer: false,
            IsNCO: false,
            IsRecruit: true,
            IsVeteran: false,
          });
        }

    });
    //reply to the interaction
   return interaction.reply({ content: `updated ${users.length}`,});


    
  }
}