
const Users = require('./schemas/User.js');
const fs = require('fs');
const path = require('path');
const functionDir = path.join(__dirname, 'functions');
const functions = fs.readdirSync(functionDir).filter(file => file.endsWith(".js"));
const eventDir = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventDir).filter(file => file.endsWith(".js"));
const commandsDir = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(commandsDir).filter(file => file.endsWith(".js"));
require('dotenv').config();

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  Array.prototype.insert = function(index) {
	this.splice.apply(this, [index, 0].concat(
		Array.prototype.slice.call(arguments, 1)));
	return this;
	
};
//insert into an object with a key
Object.prototype.insert = function(key, value) {
  this[key] = value;
  return this;
  
}


const { GatewayIntentBits, EmbedBuilder,Collection } = require("discord.js");
const Discord = require("discord.js");
const User = require('./schemas/User');

const token = process.env.token;
const bot = new Discord.Client({ intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds ] });

bot.commands = new Collection();

for(const file of functions){
    require(`./functions/${file}`)(bot);
  }
  bot.handleCommands(commandFolders);
  bot.handleEvents(eventFiles);
  module.bot = bot;


  bot.on('guildMemberUpdate', async (oldMember, newMember) => {
    // Roles
    const removedRoles = oldMember.roles.cache
    const addedRoles = newMember.roles.cache;

    
    
    
    await User.findOne({ DiscordId: newMember.id }).then(user => {
        if (!user) return;
        if (addedRoles.has("1315399122869813429")) {
           User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsRecruit: true, IsEnlisted: false, IsNCO: false, IsOfficer: false}})
            
        } else if (removedRoles.has("1315399122869813429")) {
            User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsRecruit: false, IsEnlisted: true, IsNCO: false, IsOfficer: false}})
            
        }
        //becames enlisted
        if (addedRoles.has("1315397326352679023")) {
            User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsEnlisted: true, IsOfficer: false, IsNCO: false, IsRecruit: false}})
            .then(() => {
                console.log('became an Enlisted');
            }
            )
        } else if (removedRoles.has("1315397326352679023")) { //became a recruit
            User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsEnlisted: false, IsOfficer: false, IsNCO: false, IsRecruit: true}}).then
            (() => {
                console.log('became a Recruit');
            }
            )
        }
        
        if (addedRoles.has('1315397239522459781')) {
            User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsOfficer: true, IsNCO: false, IsEnlisted: false, IsRecruit: false}})
            .then(() => {
                console.log('became an Officer');
            })
            
        }
        else if (removedRoles.has('1315397239522459781')) {
            User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsOfficer: false, IsNCO: true, IsEnlisted: false, IsRecruit: false}}).then(() => {
                console.log('became an NCO');
            })

            
        }
        // nco id 1315397278999248946
        if (addedRoles.has('1315397278999248946')) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    IsNCO: true,
                    IsOfficer: false,
                    IsEnlisted: false,
                    IsRecruit: false
                }
            }).then(() => {
                console.log('became an NCO');
            })
        } else if (removedRoles.has('1315397278999248946')) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    IsNCO: false,
                    IsOfficer: false,
                    IsEnlisted: false,
                    IsRecruit: false
                }
            }).then(() => {
                console.log('became an Officer');
            })
        }

        if (addedRoles.has("1315395914361344121")) {
           User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsInstructor: true}}).then(() => {
            console.log('became a Drill');
        })
        } else if (removedRoles.has("1315395914361344121")) {
            User.findOneAndUpdate({ DiscordId: newMember.id }, {$set: {IsInstructor: false}})
            
            
        }

        // Mos updates
        const marksmenID = "1315395996506783864"
        const SupportgunnerID = "1315396000191912961"
        const MedicID = "1315497017161678908"
        const BreacherID = "1315497376227790908"

        if (addedRoles.has(marksmenID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'Marksman'
                }
            }).then(() => {
                console.log('Marksman added');
            })
        }if (removedRoles.has(marksmenID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'None'
                }
            }).then(() => {
                console.log('Marksman removed');
            })
        }
        if (addedRoles.has(SupportgunnerID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'Support Gunner'
                }
            }).then(() => {
                console.log('Support Gunner added');
            })
        }
        if (removedRoles.has(SupportgunnerID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'None'
                }
            }).then(() => {
                console.log('Support Gunner removed');
            })
        }
        if (addedRoles.has(MedicID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'Medic'
                }
            }).then(() => {
                console.log('Medic added');
            })
        }
        if (removedRoles.has(MedicID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'None'
                }
            }).then(() => {
                console.log('Medic removed');
            })
        }
        if (addedRoles.has(BreacherID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'Breacher'
                }
            }).then(() => {
                console.log('Breacher added');
            })
        }
        if (removedRoles.has(BreacherID)) {
            User.findOneAndUpdate({
                DiscordId: newMember.id
            }, {
                $set: {
                    Mos: 'None'
                }
            }).then(() => {
                console.log('Breacher removed');
            })
        }




       
    

        console.log('Roles updated');
    })
    .catch(err => {
        console.error(err);
    });
}
);

bot.on('guildMemberAdd', async member => {
    await Users.create({
        Name: member.user.username,
        DiscordId: member.id,
        Rank: 'Recruit',
        Mos: 'None',
        JoinDate: new Date(),
        CombatHours: 0,
        IsInstructor: false,
        IsEnlisted: false,
        IsOfficer: false,
        IsNCO: false,
        IsRecruit: true,
        IsVeteran: false,
    });
}
);


bot.login(token);