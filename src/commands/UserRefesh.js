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
        else{
          const choices = [
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
            {name:'W-1 Warrant Officer 1', value:'W-1 Warrant Officer 1'},
            {name:'W-2 Warrant Officer 2', value:'W-2 Warrant Officer 2'},
            {name:'W-3 Warrant Officer 3', value:'W-3 Warrant Officer 3'},
            {name:'W-4 Warrant Officer 4', value:'W-4 Warrant Officer 4'},
            {name:'W-5 Warrant Officer 5', value:'W-5 Warrant Officer 5'},
            {name:'O-1 Second Lieutenant', value:'O-1 Second Lieutenant'},
            {name:'O-2 First Lieutenant', value:'O-2 First Lieutenant'},
            {name:'O-3 Captain', value:'O-3 Captain'},
            {name:'O-4 Major', value:'O-4 Major'},
            {name:'O-5 Lieutenant Colonel', value:'O-5 Lieutenant Colonel'},
            {name:'O-6 Colonel', value:'O-6 Colonel'}
          ]
        const marksmenID = "1315395996506783864"
        const SupportgunnerID = "1315396000191912961"
        const MedicID = "1315497017161678908"
        const BreacherID = "1315497376227790908"

         //using the rank role update the user's rank in data base 

          const roles = user.roles.cache;
          const role = roles.find(role => choices.some(choice => choice.name === role.name));
          if(role){
            userInDatabase.Rank = role.name;
            
          }
          if( roles.has(marksmenID)){
            userInDatabase.Mos = "Marksman";
          }
          if( roles.has(SupportgunnerID)){
            userInDatabase.Mos = "Support Gunner";
          }
          if( roles.has(MedicID)){
            userInDatabase.Mos = "Medic";
          }
          if( roles.has(BreacherID)){
            userInDatabase.Mos = "Breacher";
          }
          userInDatabase.save();
          

          





        }

    });
    //reply to the interaction
   return interaction.reply({ content: `updated ${users.length}`,});


    
  }
}