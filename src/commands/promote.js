const {EmbedBuilder, SlashCommandBuilder} = require('discord.js');
const User = require('../schemas/User');
module.exports = {
  data: new SlashCommandBuilder()
    .setName('promote')
    .setDescription('promote a user to a new rank')
    .addMentionableOption(option =>
      option.setName('user')
        .setDescription('the user to promote')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('rank')
        .setDescription('the rank to promote the user to')
        .addChoices(
            //ranks and their paygrades army only  include warrent officers
            {name:'E-0 Recruit', value:'E-0 Recruit'},
            {name:'E-1 Private', value:'E-1 Private'},
            {name:'E-2 Private', value:'E-2 Private'},
            {name:'E-3 Private First Class', value:'E-3 Private First Class'},
            {name:'E-4 Specialist', value:'E-4 Specialist'},
            {name:'E-5 Corporal', value:'E-5 Corporal'},
            {name:'E-6 Sergeant', value:'E-6 Sergeant'},
            {name:'E-7 Staff Sergeant', value:'E-7 Staff Sergeant'},
            {name:'E-8 Master Sergeant', value:'E-8 Master Sergeant'},
            {name:'E-9 Sergeant Major', value:'E-9 Sergeant Major'},
            {name:'WO1 Warrant Officer 1', value:'WO1 Warrant Officer 1'},
            {name:'CW2 Chief Warrant Officer 2', value:'CW2 Chief Warrant Officer 2'},
            {name:'CW3 Chief Warrant Officer 3', value:'W-3 Warrant Officer 3'},
            {name:'CW4 Chief Warrent Officer 4', value:'CW4 Chief Warrent Officer 4'},
            {name:'CW5 Chief Warrant Officer 5', value:'CW5 Chief Warrant Officer 5'},
            {name:'O-1 Second Lieutenant', value:'O-1 Second Lieutenant'},
            {name:'O-2 First Lieutenant', value:'O-2 First Lieutenant'},
            {name:'O-3 Captain', value:'O-3 Captain'},
            {name:'O-4 Major', value:'O-4 Major'},
            {name:'O-5 Lieutenant Colonel', value:'O-5 Lieutenant Colonel'},
            {name:'O-6 Colonel', value:'O-6 Colonel'},
            {name:"Director", value:"Director"})
        .setRequired(true)
    ),
    OfficersOnly: true,
  async execute(interaction) {

    const user = interaction.options.getMentionable('user');
    const rank = interaction.options.getString('rank');
    const userInDatabase = await User.findOne({ DiscordId: user.id });
    if (!userInDatabase) {
      return interaction.reply({ content: 'You are not in the database!'});
    }
    userInDatabase.Rank = rank;
    userInDatabase.save();

    // update the user's roles
    const roles = interaction.guild.roles.cache;
    const role = roles.find(role => role.name === rank);
    const member = interaction.guild.members.cache.get(user.id);
    member.roles.add(role);

    //remove any old ranks 
    const oldRoles = roles.filter(role => role.name.startsWith('E-') || role.name.startsWith('W-') || role.name.startsWith('O-'));
    oldRoles.forEach(role => {
      if (member.roles.cache.has(role.id)) {
        member.roles.remove(role);
      }
    });
    //update the user's nickname to include their rank by usign their current nickname and replacing the first word with their rank 
    const nickname = member.displayName.split(' ');
    
    nickname[0] = rank.split(' ')[0];
    member.setNickname(nickname.join(' '));



    return interaction.reply({ content: `Promoted/Demoted ${user.user.username} to ${rank}` });



    
  }
}