const Discord = require("discord.js");

module.exports = {
	name: 'server',
	description: 'serverinfo',
	execute(message, args) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
	},
};