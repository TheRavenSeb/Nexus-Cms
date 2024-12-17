const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const User = require('../schemas/User');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('account')
    .setDescription('Chek your account information'),
  async execute(interaction) {
    
    var role = ''
    User.findOne({ DiscordId: interaction.user.id }).then(user => {
        if (!user) {
            return interaction.reply({ content: 'You are not in the database!'});
        }
        if(user.IsInstructor){
            role += 'Instructor\n'
        }
        if(user.IsEnlisted){
            role += 'Enlisted\n'
        }
        if(user.IsOfficer){
            role += 'Officer\n'
        }
        if(user.IsNCO){
            role += 'NCO\n'
        }
        if(user.IsRecruit){
            role += 'Recruit\n'
        }
        if(user.IsVeteran){
            role += 'Veteran\n'
        }
        

        const embed = new EmbedBuilder()
            .setTitle(`Account Information for ${user.Name}`)
            .setDescription('Here is your account information')
            .setColor('#0099ff')
            .setTimestamp()
            .setFields(
                { name: 'Rank', value: user.Rank, inline: true },
                { name: 'MOS', value: user.Mos, inline: true },
                { name: 'Join Date', value: user.JoinDate.toDateString(), inline: true },
                { name: 'Combat Hours', value: user.CombatHours.toString(), inline: true },
                { name: 'Combat Minutes', value: user.CombatMinutes.toString(), inline: true },
                { name: 'Good Combat Hours', value: user.GoodCombatHours.toString(), inline: true },
                { name: 'Good Combat Minutes', value: user.GoodCombatMinutes.toString(), inline: true },
                { name: 'Roles', value: role, inline: true }

            )
            
        interaction.reply({ embeds: [embed] });
    })

  }
}