const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const User = require('../schemas/User');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Chek your account information')
    .addSubcommand(subcommand =>
        subcommand
        .setName('member')
        .setDescription('description').addMentionableOption(option => 
            option.setName('user')
            .setDescription('description')
            .setRequired(true)
        )
        
    ),
  async execute(interaction) {
    if(interaction.options.getSubcommand() === 'member'){
        const player = interaction.options.getUser('user');
    var role = ''

    User.findOne({ DiscordId: player.id }).then(user => {
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
                { name: 'Join Date', value: user.JoinDate.toDateString(),  },
                { name: 'Combat Hours', value: user.CombatHours.toString()  },
                { name: 'Combat Minutes', value: user.CombatMinutes.toString(), inline: true },
                { name: 'Good Combat Hours', value: user.GoodCombatHours.toString()  },
                { name: 'Good Combat Minutes', value: user.GoodCombatMinutes.toString(), inline: true },
                { name: 'Roles', value: role}
            )
            
        interaction.reply({ embeds: [embed] });
    })
}

  }
}