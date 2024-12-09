
//const mongoose = require("mongoose");
const ActivityType = require("discord.js");
//const { Logtail } = require("@logtail/node");
//const logtail = new Logtail("XiL5Vq7qxdBP3pYTnLzqkMCX");

const Users = require("../schemas/User.js");


module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		
		console.info(`[Discord bot]:Ready! Logged in as ${client.user.tag} on Node ${process.version}`);
		console.info(`[Discord bot]:Inside ${client.guilds.cache.size} servers!`);
		console.info(`[Discord bot]:Handling ${client.guilds.cache.reduce((acc, g) => acc + g.memberCount,0)} users`);
		console.info(`[Discord bot]:Handling ${client.commands.size} commands`);

		const activities = [
			`and watching over ${client.guilds.cache.size} servers!`,
			"over the Arcane Magica Community!",
			`Lemon is now a developer :D`,
			`beepu beepu I see you!`,
		];
    
		setInterval(() => {
			const status = activities[Math.floor(Math.random() * activities.length)];
			client.user.setActivity(status, { type: ActivityType.watching });
		}, 5000);
        
		//logtail.flush();
    
	},
};